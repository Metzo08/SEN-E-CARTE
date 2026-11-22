import { NextResponse } from "next/server";
import { SOLUTIONS } from "@/data/senecarteData";

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
  whatsappPitch: string;
}

const HUNT_QUERIES = [
  {
    solutionSlug: "carte-sante-ipm-cmu",
    query: 'site:linkedin.com ("IPM" OR "mutuelle de santé" OR "clinique") Dakar Sénégal',
    region: "Dakar",
  },
  {
    solutionSlug: "carte-scolaire-cmu",
    query: 'site:facebook.com ("groupe scolaire" OR "école privée" OR "lycée privé") Dakar Sénégal',
    region: "Dakar",
  },
  {
    solutionSlug: "carte-visite-nfc",
    query: 'site:linkedin.com/company ("directeur" OR "entreprise" OR "BTP" OR "immobilier") Sénégal',
    region: "Dakar / Thiès",
  },
  {
    solutionSlug: "developpement-sur-mesure-ia",
    query: 'site:x.com OR site:instagram.com ("clinique" OR "pharmacie" OR "restaurant" OR "ONG") Dakar Sénégal',
    region: "Sénégal",
  },
  {
    solutionSlug: "logiciels-metiers-saas",
    query: 'ASUFOR forage eau OR "mutuelle de santé communautaire" Sénégal',
    region: "Sénégal",
  },
  {
    solutionSlug: "carte-sante-ipm-cmu",
    query: '"ONG santé" OR "santé maternelle" OR "fondation éducation" Dakar Sénégal',
    region: "Dakar",
  },
  {
    solutionSlug: "logiciels-metiers-saas",
    query: '"cabinet d\'avocats" OR "avocat à la cour" OR "étude notariale" Dakar Sénégal',
    region: "Dakar",
  },
];

async function searchWebLive(query: string): Promise<Array<{ title: string; url: string; snippet: string }>> {
  const braveKey = process.env.BRAVE_SEARCH_API_KEY;
  if (braveKey) {
    try {
      const res = await fetch(
        `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=4&search_lang=fr`,
        { headers: { "X-Subscription-Token": braveKey, Accept: "application/json" } }
      );
      if (res.ok) {
        const data = await res.json();
        const items = (data.web?.results || []).slice(0, 4).map((r: { title?: string; url?: string; description?: string }) => ({
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

async function sendAlertEmail(leads: DiscoveredLead[], braveActive: boolean) {
  const toEmail = process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "Sen-E-Carte Prospection <onboarding@resend.dev>";

  const rowsHtml = leads
    .map(
      (l) => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px;font-weight:700;color:#071a30;">
          <span style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:10px;padding:2px 6px;border-radius:6px;margin-bottom:4px;">${l.sourceNetwork}</span><br/>
          ${l.companyName}<br/>
          <a href="${l.sourceUrl}" style="font-size:11px;color:#0284c7;word-break:break-all;">${l.sourceUrl}</a>
        </td>
        <td style="padding:12px;font-size:13px;">${l.solutionName}</td>
        <td style="padding:12px;font-weight:700;color:#059669;">${l.score}/100</td>
        <td style="padding:12px;"><a href="https://wa.me/?text=${encodeURIComponent(l.whatsappPitch)}" style="background:#10b981;color:#fff;padding:7px 12px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:700;display:inline-block;">WhatsApp</a></td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:24px;background:#f8fafc;">
      <div style="background:#071a30;color:#fff;padding:22px 24px;border-radius:16px 16px 0 0;">
        <h2 style="margin:0;font-size:20px;">Sen-E-Carte · chasse autonome réseaux sociaux & web</h2>
        <p style="margin:6px 0 0;font-size:13px;color:#7dd3fc;">
          ${leads.length} prospects qualifiés détectés sur LinkedIn, Facebook, X, Instagram & Web · Moteur : ${braveActive ? "Brave Search API (Actif)" : "Web Fallback"}
        </p>
      </div>
      <div style="background:#fff;padding:20px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;font-size:12px;color:#475569;">
              <th style="padding:10px;">Prospect & réseau social</th>
              <th style="padding:10px;">Solution Sen-E-Carte</th>
              <th style="padding:10px;">Score</th>
              <th style="padding:10px;">Action 1-clic</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">
          Envoyé automatiquement par l'agent prospection autonome de <strong>www.senecarte.com</strong> vers ${toEmail}.
        </p>
      </div>
    </div>
  `;

  if (!resendKey) {
    return {
      sent: false,
      recipient: toEmail,
      note: "RESEND_API_KEY manquante — ajoutez votre clé Resend dans .env.local.",
    };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Sen-E-Carte] ${leads.length} nouveaux prospects (LinkedIn/Facebook/Web) — ${new Date().toLocaleDateString("fr-FR")}`,
      html,
    }),
  });

  if (!res.ok) {
    const errTxt = await res.text();
    return { sent: false, recipient: toEmail, note: `Erreur Resend: ${errTxt.slice(0, 220)}` };
  }

  const resJson = await res.json().catch(() => ({}));
  return {
    sent: true,
    recipient: toEmail,
    emailId: resJson.id || null,
    note: "Rapport envoyé par email avec succès via Resend.",
  };
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const braveActive = Boolean(process.env.BRAVE_SEARCH_API_KEY);
  const discovered: DiscoveredLead[] = [];
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

      discovered.push({
        id: `auto-${h.solutionSlug}-${Date.now()}-${discovered.length}`,
        companyName: r.title.slice(0, 95),
        sourceUrl: r.url,
        sourceNetwork: net,
        solutionSlug: sol.slug,
        solutionName: sol.shortTitle,
        region: h.region,
        score,
        snippet: r.snippet,
        whatsappPitch: `Bonjour, je suis Ahmed TALL, DG de Sen-E-Carte (www.senecarte.com — références ANACMU/NJABOOT, Fondation Nous Cims, JICA & ENDA Santé). Nous accompagnons des organisations comme ${r.title.slice(0, 50)} sur « ${sol.shortTitle} ». Souhaitez-vous une démo rapide de 2 min sur WhatsApp ?`,
      });
    }
  }

  const emailStatus = await sendAlertEmail(discovered, braveActive);

  return NextResponse.json({
    ok: true,
    mode: "chasse-autonome-reseaux-sociaux-24-7",
    braveSearchActive: braveActive,
    alertEmail: process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com",
    discoveredCount: discovered.length,
    emailStatus,
    leads: discovered,
    executedAt: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  return GET(req);
}
