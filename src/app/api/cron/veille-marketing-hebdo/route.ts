import { NextResponse } from "next/server";

interface TrendItem {
  topic: string;
  target: string;
  title: string;
  url: string;
  snippet: string;
  recommendedAction: string;
}

const VEILLE_QUERIES = [
  {
    topic: "Santé numérique & IPM Sénégal",
    target: "IPM, mutuelles & cliniques",
    query: "Sénégal santé numérique mutuelle IPM digitalisation 2025 2026",
    recommendedAction:
      "Proposer le pass santé QR-NFC anti-fraude et le portail lettres de garantie Sen-E-Carte.",
  },
  {
    topic: "LegalTech & cabinets d'avocats Dakar",
    target: "Avocats, notaires & huissiers",
    query: "cabinet avocat Dakar Sénégal transformation digitale justice",
    recommendedAction:
      "Mettre en avant le cas Cabinet Maître Ibrahima Mbengue (OCR dossiers + agenda audiences).",
  },
  {
    topic: "Appels d'offres ONG, PME & digitalisation Sénégal",
    target: "ONG, PME, écoles & GIE",
    query: "appel d'offres digitalisation plateforme web application Sénégal ONG PME",
    recommendedAction:
      "Préparer une offre technique clé en main avec paiement Wave/OM et conformité SYSCOHADA.",
  },
  {
    topic: "AgriTech, immobilier & gestion PME Sénégal",
    target: "Promoteurs, coopératives & PME",
    query: "Sénégal PME logiciel facturation gestion immobilière agritech Wave",
    recommendedAction:
      "Lancer une campagne LinkedIn/WhatsApp sur les nouvelles solutions sectorielles Sen-E-Carte.",
  },
];

async function searchBrave(query: string) {
  const key = process.env.BRAVE_SEARCH_API_KEY;
  if (!key) return [];
  try {
    const res = await fetch(
      `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(
        query
      )}&count=2&search_lang=fr`,
      {
        headers: { Accept: "application/json", "X-Subscription-Token": key },
        cache: "no-store",
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.web?.results || []).slice(0, 2);
  } catch {
    return [];
  }
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = req.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }

  const toEmail = process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com";
  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "Sen-E-Carte Veille & Marketing <onboarding@resend.dev>";

  const trends: TrendItem[] = [];
  for (const q of VEILLE_QUERIES) {
    const results = await searchBrave(q.query);
    if (results.length > 0) {
      for (const r of results) {
        trends.push({
          topic: q.topic,
          target: q.target,
          title: (r.title || q.topic).replace(/<[^>]+>/g, ""),
          url: r.url || "https://www.senecarte.com",
          snippet: (r.description || "").replace(/<[^>]+>/g, "").slice(0, 200),
          recommendedAction: q.recommendedAction,
        });
      }
    } else {
      trends.push({
        topic: q.topic,
        target: q.target,
        title: `Opportunité prioritaire : ${q.topic}`,
        url: "https://www.senecarte.com/solutions",
        snippet: q.recommendedAction,
        recommendedAction: q.recommendedAction,
      });
    }
  }

  const rowsHtml = trends
    .map(
      (t) => `
      <tr style="border-bottom:1px solid #e2e8f0;">
        <td style="padding:12px;font-size:13px;">
          <span style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:10px;padding:2px 8px;border-radius:99px;font-weight:700;margin-bottom:4px;">${t.topic}</span><br/>
          <strong>${t.title}</strong><br/>
          <span style="color:#475569;font-size:12px;">${t.snippet}</span><br/>
          <a href="${t.url}" style="font-size:11px;color:#0284c7;">${t.url}</a>
        </td>
        <td style="padding:12px;font-size:12px;color:#065f46;font-weight:600;">${t.recommendedAction}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:760px;margin:0 auto;padding:24px;background:#f8fafc;">
      <div style="background:#071a30;color:#ffffff;padding:22px 24px;border-radius:16px 16px 0 0;">
        <h2 style="margin:0;font-size:20px;">Sen-E-Carte · Rapport veille Agent-Reach &amp; marketing</h2>
        <p style="margin:6px 0 0;font-size:13px;color:#7dd3fc;">
          Destinataire : Ahmed Tall (${toEmail}) · ${trends.length} opportunités &amp; recommandations Sénégal / UEMOA
        </p>
      </div>
      <div style="background:#ffffff;padding:20px;border-radius:0 0 16px 16px;border:1px solid #e2e8f0;">
        <table style="width:100%;border-collapse:collapse;text-align:left;">
          <thead>
            <tr style="background:#f1f5f9;font-size:12px;color:#475569;">
              <th style="padding:10px;">Opportunité détectée (Agent-Reach)</th>
              <th style="padding:10px;">Action marketing &amp; offre recommandée</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
        <p style="margin-top:20px;font-size:12px;color:#64748b;">
          Envoyé automatiquement par l'équipe Veille &amp; Marketing Sen-E-Carte vers <strong>${toEmail}</strong>. Connectez-vous sur <strong>/super-admin</strong> pour approuver et lancer les campagnes.
        </p>
      </div>
    </div>
  `;

  let emailStatus: { sent: boolean; recipient: string; emailId?: string | null; note: string } = {
    sent: false,
    recipient: toEmail,
    note: "RESEND_API_KEY manquante.",
  };

  if (resendKey) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          subject: `[Sen-E-Carte] Rapport veille & marketing Sénégal — ${new Date().toLocaleDateString("fr-FR")}`,
          html,
        }),
      });
      if (res.ok) {
        const j = await res.json().catch(() => ({}));
        emailStatus = {
          sent: true,
          recipient: toEmail,
          emailId: j.id || null,
          note: `Rapport veille & marketing envoyé avec succès à ${toEmail}.`,
        };
      } else {
        const err = await res.text();
        emailStatus = {
          sent: false,
          recipient: toEmail,
          note: `Erreur Resend (${res.status}) : ${err.slice(0, 180)}`,
        };
      }
    } catch (e) {
      emailStatus = {
        sent: false,
        recipient: toEmail,
        note: e instanceof Error ? e.message : "Erreur réseau Resend.",
      };
    }
  }

  return NextResponse.json({
    ok: true,
    count: trends.length,
    recipient: toEmail,
    emailStatus,
    trends,
  });
}
