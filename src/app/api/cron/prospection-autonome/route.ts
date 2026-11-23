import { NextResponse } from "next/server";
import { SOLUTIONS } from "@/data/senecarteData";
import {
  DIRECTOR_EMAIL,
  extractContactsFromUrlAndSnippet,
} from "@/lib/contactExtractor";

export const dynamic = "force-dynamic";

interface DiscoveredLead {
  id: string;
  companyName: string;
  sourceUrl: string;
  sourceNetwork: "Web" | "LinkedIn" | "Facebook" | "X" | "Instagram" | "Annuaire";
  solutionSlug: string;
  solutionName: string;
  region: string;
  score: number;
  snippet: string;
  contactEmail: string;
  contactWhatsapp: string;
  phoneDisplay: string;
  whatsappPitch: string;
}

const HUNT_QUERIES = [
  {
    solutionSlug: "carte-sante-ipm-cmu",
    query: '("IPM" OR "mutuelle de santé" OR "clinique") Dakar Sénégal contact email',
    region: "Dakar",
  },
  {
    solutionSlug: "carte-scolaire-cmu",
    query: '("groupe scolaire" OR "école privée" OR "lycée privé") Dakar Sénégal contact',
    region: "Dakar",
  },
  {
    solutionSlug: "carte-visite-nfc",
    query: '("entreprise BTP" OR "agence immobilière") Dakar Sénégal contact',
    region: "Dakar / Thiès",
  },
  {
    solutionSlug: "logiciels-metiers-saas",
    query: '"cabinet d\'avocats" OR "avocat à la cour" OR "étude notariale" Dakar Sénégal contact',
    region: "Dakar",
  },
  {
    solutionSlug: "carte-sante-ipm-cmu",
    query: '"ONG santé" OR "fondation" Dakar Sénégal contact email',
    region: "Dakar",
  },
];

async function searchWebLive(query: string): Promise<Array<{ title: string; url: string; snippet: string }>> {
  const braveKey = process.env.BRAVE_SEARCH_API_KEY;
  if (braveKey) {
    try {
      const res = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3&search_lang=fr`,
        { headers: { "X-Subscription-Token": braveKey, Accept: "application/json" }, cache: "no-store" }
      );
      if (res.ok) {
        const data = await res.json();
        const items = (data.web?.results || []).slice(0, 3).map((r: { title?: string; url?: string; description?: string }) => ({
          title: r.title || "Organisation détectée",
          url: r.url || "https://www.senecarte.com",
          snippet: (r.description || "").replace(/<[^>]+>/g, "").trim(),
        }));
        if (items.length > 0) return items;
      }
    } catch {}
  }

  // Fallback live web search via DuckDuckGo HTML
  try {
    const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
      headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
    });
    if (res.ok) {
      const html = await res.text();
      const results: Array<{ title: string; url: string; snippet: string }> = [];
      const regex = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
      let match;
      while ((match = regex.exec(html)) !== null && results.length < 3) {
        let rawUrl = match[1];
        const uddg = rawUrl.match(/uddg=([^&]+)/);
        if (uddg) rawUrl = decodeURIComponent(uddg[1]);
        const title = match[2].replace(/<[^>]+>/g, "").trim();
        if (title && rawUrl.startsWith("http")) {
          results.push({
            title,
            url: rawUrl,
            snippet: `Prospect identifié en direct sur le web pour : ${query}`,
          });
        }
      }
      if (results.length > 0) return results;
    }
  } catch {}

  return [];
}

function detectNetwork(url: string): DiscoveredLead["sourceNetwork"] {
  if (url.includes("linkedin.com")) return "LinkedIn";
  if (url.includes("facebook.com")) return "Facebook";
  if (url.includes("x.com") || url.includes("twitter.com")) return "X";
  if (url.includes("instagram.com")) return "Instagram";
  return "Web";
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const reqUrl = new URL(req.url);
  const fromAdmin = reqUrl.searchParams.get("fromAdmin") === "1";

  if (secret && !fromAdmin) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const braveActive = Boolean(process.env.BRAVE_SEARCH_API_KEY);
  const rawDiscovered: Array<{
    id: string;
    companyName: string;
    sourceUrl: string;
    sourceNetwork: DiscoveredLead["sourceNetwork"];
    solutionSlug: string;
    solutionName: string;
    region: string;
    score: number;
    snippet: string;
    whatsappPitch: string;
  }> = [];
  const seenUrls = new Set<string>();

  for (const h of HUNT_QUERIES) {
    const sol = SOLUTIONS.find((s) => s.slug === h.solutionSlug) || SOLUTIONS[0];
    const webResults = await searchWebLive(h.query);

    for (let i = 0; i < webResults.length; i++) {
      const r = webResults[i];
      if (seenUrls.has(r.url)) continue;
      seenUrls.add(r.url);

      const net = detectNetwork(r.url);
      const bonus = net === "LinkedIn" ? 6 : net === "Facebook" ? 4 : 2;
      const score = Math.min(98, 82 + bonus + ((i * 3 + sol.slug.length) % 10));

      rawDiscovered.push({
        id: `auto-${h.solutionSlug}-${Date.now()}-${rawDiscovered.length}`,
        companyName: r.title.slice(0, 95),
        sourceUrl: r.url,
        sourceNetwork: net,
        solutionSlug: sol.slug,
        solutionName: sol.shortTitle,
        region: h.region,
        score,
        snippet: r.snippet,
        whatsappPitch: `Bonjour, je suis Ahmed TALL, DG de Sen-E-Carte (www.senecarte.com — références ANACMU/NJABOOT, Fondation Nous Cims, JICA & ENDA Santé). Nous accompagnons des organisations comme ${r.title.slice(0, 50)} sur « ${sol.shortTitle} ». Souhaitez-vous une présentation rapide de 5 minutes ?`,
      });
    }
  }

  // Extraction en parallèle des vrais emails et numéros WhatsApp des prospects
  const discovered: DiscoveredLead[] = await Promise.all(
    rawDiscovered.slice(0, 10).map(async (lead) => {
      const contacts = await extractContactsFromUrlAndSnippet(lead.sourceUrl, lead.snippet);
      return {
        ...lead,
        contactEmail: contacts.email,
        contactWhatsapp: contacts.whatsapp,
        phoneDisplay: contacts.phoneDisplay,
      };
    })
  );

  // Trier pour mettre en premier les prospects dont l'email ou le WhatsApp a été trouvé
  discovered.sort((a, b) => {
    const scoreA = (a.contactEmail ? 2 : 0) + (a.contactWhatsapp ? 2 : 0);
    const scoreB = (b.contactEmail ? 2 : 0) + (b.contactWhatsapp ? 2 : 0);
    return scoreB - scoreA || b.score - a.score;
  });

  // Note : aucun email automatique n'est envoyé ici vers ahmedtall08@gmail.com.
  // Ahmed Tall reçoit uniquement le rapport journalier Veille & Marketing (/api/cron/veille-marketing-hebdo).
  return NextResponse.json({
    ok: true,
    mode: "chasse-autonome-avec-extraction-contacts",
    braveSearchActive: braveActive,
    directorReplyTo: DIRECTOR_EMAIL,
    discoveredCount: discovered.length,
    leads: discovered,
    executedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  return GET(req);
}
