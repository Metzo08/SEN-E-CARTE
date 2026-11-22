import { NextResponse } from "next/server";

interface RunAgentPayload {
  agentId?: string;
  sector?: string;
  instruction?: string;
  sendEmailCopy?: boolean;
}

const AGENT_PROFILES: Record<
  string,
  { name: string; role: string; channel: string; systemTone: string }
> = {
  "sene-linkedin-growth": {
    name: "Khadija Ndiaye",
    role: "Stratège LinkedIn B2B & prospection sectorielle",
    channel: "LinkedIn",
    systemTone:
      "Rédige des posts LinkedIn d'autorité de très haut niveau (accroche percutante, structure aérée, chiffres concrets FCFA, preuve terrain Sen-E-Carte, appel à l'action vers www.senecarte.com) ET un message d'approche LinkedIn personnalisé pour les décideurs du secteur.",
  },
  "sene-social-motion-publisher": {
    name: "Moustapha Sarr",
    role: "Producteur motion design YouTube, Instagram, X & Facebook",
    channel: "YouTube · Instagram Reels · X/Twitter · Facebook",
    systemTone:
      "Produis un script motion design minuté (0-3s hook, 3-20s démonstration visuelle, 20-35s appel à l'action Wave/OM) + légende Instagram/Facebook + thread X/Twitter de 3 tweets prêts à publier.",
  },
  "sene-market-scout": {
    name: "Cheikh Ahmadou Bamba Diagne",
    role: "Veilleur stratégique Agent-Reach Sénégal & UEMOA",
    channel: "Veille Web & opportunités",
    systemTone:
      "Analyse méthodiquement les besoins actuels au Sénégal/UEMOA, propose une solution concrète Sen-E-Carte avec positionnement prix FCFA, cible prioritaire et plan de déploiement rapide.",
  },
  "sene-video-vision-analyst": {
    name: "Aminata Ndiaye",
    role: "Analyste vidéo multimodale & tendances réseaux",
    channel: "YouTube · TikTok · Reels",
    systemTone:
      "Fournis une grille d'analyse vidéo rigoureuse (hooks viraux qui marchent au Sénégal, angles visuels, sous-titres FR/Wolof, durée optimale et recommandations concrètes pour Sen-E-Carte).",
  },
  "sene-sales-tenders": {
    name: "Ndèye Fatou Cissé",
    role: "Directrice appels d'offres & propositions B2B",
    channel: "Propositions & closing B2B",
    systemTone:
      "Rédige une proposition commerciale structurée (contexte client, solution Sen-E-Carte, planning 7-14 jours, estimation budget FCFA SYSCOHADA, garanties CDP & support Dakar).",
  },
};

async function tryLLM(systemPrompt: string, userPrompt: string): Promise<string | null> {
  const base = process.env.LLM_BASE_URL?.replace(/\/+$/, "");
  const key = process.env.LLM_API_KEY;
  if (base && key) {
    for (const model of [
      process.env.LLM_MODEL || "free/deepseek-v4.1-flash",
      "free/gpt-6-luna",
    ]) {
      try {
        const res = await fetch(`${base}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            temperature: 0.5,
            max_tokens: 900,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
          }),
        });
        if (res.ok) {
          const j = await res.json();
          const txt = j?.choices?.[0]?.message?.content;
          if (txt) return txt;
        }
      } catch {}
    }
  }
  return null;
}

function buildStructuredDeliverable(
  agentId: string,
  sector: string,
  instruction: string
): string {
  const dateStr = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  if (agentId === "sene-linkedin-growth") {
    return `=== POST LINKEDIN PRÊT À PUBLIER (${dateStr}) ===
Secteur ciblé : ${sector}
Consigne directeur : ${instruction}

[ACCROCHE]
Au Sénégal, les structures du secteur « ${sector} » perdent encore des heures chaque semaine à cause des process papier, des erreurs de suivi et des relances manuelles.

[CORPS DU POST]
Chez Sen-E-Carte (Dakar), nous concevons des solutions digitales concrètes qui transforment le quotidien des dirigeants :
• Cartes intelligentes QR dynamique + puce NFC (dès 5 000 FCFA) — mise à jour à distance à vie, sans application.
• Logiciels métiers sur-mesure (${sector}) — facturation SYSCOHADA, paiements Wave & Orange Money, alertes WhatsApp automatisées et conformité Loi CDP Sénégal.
• Déploiement rapide en 7 à 14 jours avec formation de vos équipes à Dakar et partout au Sénégal.

Nos réalisations parlent d'elles-mêmes : Cabinet Maître Ibrahima Mbengue (LegalTech OCR), coopération JICA à Dakar (santé numérique), SenMutuelles, Écosystème BTP Magatte Niang, Fermes des Niayes.

[APPEL À L'ACTION]
Vous souhaitez moderniser votre organisation dans le secteur « ${sector} » ?
Commandez ou prenez rendez-vous en 2 minutes : https://www.senecarte.com/commander

#Senegal #Dakar #TransformationDigitale #SenECarte #Innovation #PME

=== MESSAGE DE PROSPECTION LINKEDIN B2B (À VALIDER AVANT ENVOI) ===
« Bonjour [Prénom], je vois que vous pilotez une structure dans le secteur ${sector} au Sénégal. Chez Sen-E-Carte, nous équipons les entreprises et cabinets à Dakar en logiciels métiers sur-mesure (paiement Wave/OM, conformité SYSCOHADA) et cartes intelligentes QR+NFC. Seriez-vous ouvert(e) à un échange de 10 minutes cette semaine ? — Ahmed Tall, Sen-E-Carte »`;
  }

  if (agentId === "sene-social-motion-publisher") {
    return `=== PACK MOTION DESIGN MULTI-RÉSEAUX (${dateStr}) ===
Secteur : ${sector} | Consigne : ${instruction}

1. SCRIPT VIDÉO MOTION DESIGN (35 secondes — YouTube Shorts / Instagram Reels / TikTok)
• [00:00 - 00:04] HOOK VISUEL : Texte cinétique blanc sur bleu nuit #071A30 — « ${sector} au Sénégal : passez au niveau supérieur en un scan ! »
• [00:04 - 00:15] PROBLÈME → SOLUTION : Animation carte NFC/QR + écran logiciel métier Sen-E-Carte (tableaux de bord temps réel, reçus Wave/Orange Money, zéro papier).
• [00:15 - 00:27] PREUVE TERRAIN : Logos partenaires (JICA, Cabinet Mbengue, SenMutuelles, Magatte Niang) + déploiement en 7 à 14 jours à Dakar.
• [00:27 - 00:35] CALL-TO-ACTION : « Commandez sur www.senecarte.com ou WhatsApp +221 77 602 67 83 ».

2. LÉGENDE INSTAGRAM & FACEBOOK
Digitalisez votre activité (${sector}) avec Sen-E-Carte ! Cartes de visite NFC/QR dès 5 000 FCFA & logiciels métiers sur-mesure payables par Wave / Orange Money.
Lien direct : https://www.senecarte.com/commander

3. THREAD X / TWITTER (3 TWEETS)
• Tweet 1 : Comment Sen-E-Carte modernise le secteur « ${sector} » au Sénégal grâce aux cartes QR+NFC et aux logiciels métiers sur-mesure 👇
• Tweet 2 : Zéro application lourde, paiement Wave & Orange Money intégré, conformité CDP & SYSCOHADA, déploiement en 7 à 14 jours à Dakar.
• Tweet 3 : Découvrez nos réalisations et lancez votre projet ici : https://www.senecarte.com/commander #Dakar #Senegal #Tech`;
  }

  if (agentId === "sene-sales-tenders") {
    return `=== PROPOSITION COMMERCIALE B2B PRÊTE À ENVOYER (${dateStr}) ===
Objet : Déploiement d'une solution digitale métier — ${sector}
Consigne : ${instruction}

1. COMPRÉHENSION DU BESOIN
Modernisation opérationnelle, traçabilité sécurisée et réduction des coûts administratifs pour votre structure (${sector}) au Sénégal.

2. SOLUTION PROPOSÉE PAR SEN-E-CARTE
• Architecture web/mobile responsive + cartes intelligentes QR/NFC si requis.
• Facturation SYSCOHADA (TVA 18 %), encaissement Wave / Orange Money / Free Money et notifications WhatsApp automatisées.
• Hébergement haute disponibilité HTTPS + conformité Loi CDP 2008-12 Sénégal.

3. PLANNING & BUDGET INDICATIF
• J1–J3 : Cadrage & maquettes validées avec votre direction.
• J4–J10 : Développement, tests & mise en préproduction.
• J11–J14 : Formation de votre équipe à Dakar & mise en ligne.
• Budget : à partir de 350 000 à 1 500 000 FCFA HT selon périmètre (maintenance annuelle optionnelle).

Contact direct direction : Ahmed Tall — +221 77 602 67 83 — www.senecarte.com`;
  }

  return `=== RAPPORT MÉTHODIQUE AGENT (${dateStr}) ===
Agent : ${AGENT_PROFILES[agentId]?.name || agentId}
Secteur : ${sector}
Instruction reçue : ${instruction}

1. DIAGNOSTIC & OPPORTUNITÉ SÉNÉGAL / UEMOA
Forte demande identifiée dans le secteur « ${sector} » pour des outils simples, accessibles sur mobile, compatibles Wave / Orange Money et déployés par une équipe locale réactive à Dakar.

2. RECOMMANDATION CONCRÈTE SEN-E-CARTE
• Produit d'appel : Pack cartes de visite intelligentes QR+NFC (5 000 à 15 000 FCFA) pour ouvrir la porte chez les décideurs.
• Montée en gamme : Logiciel métier dédié (${sector}) avec facturation SYSCOHADA, suivi temps réel et assistant IA FR/Wolof.

3. PROCHAINES ACTIONS IMMÉDIATES
• Publier le post d'autorité LinkedIn + capsule vidéo 35 s ciblant « ${sector} ».
• Lancer une séquence de 10 prospects qualifiés dans l'onglet Prospection IA (après accord d'Ahmed Tall).`;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RunAgentPayload;
    const agentId = body.agentId || "sene-linkedin-growth";
    const sector = (body.sector || "PME & entreprises au Sénégal").trim();
    const instruction = (body.instruction || "").trim();

    if (!instruction) {
      return NextResponse.json(
        { ok: false, error: "Veuillez saisir une instruction précise pour l'agent." },
        { status: 400 }
      );
    }

    const profile = AGENT_PROFILES[agentId] || AGENT_PROFILES["sene-linkedin-growth"];
    const systemPrompt = `Tu es ${profile.name}, ${profile.role} chez Sen-E-Carte (Dakar, Sénégal, www.senecarte.com, dirigé par Ahmed Tall, +221 77 602 67 83).
Exécute la consigne du directeur avec méthode, minutie, rigueur et intelligence. ${profile.systemTone}
Respecte la casse de phrase française et mets en valeur les réalisations réelles de Sen-E-Carte (Cabinet Maître Mbengue, JICA Dakar, SenMutuelles, Magatte Niang, Fermes des Niayes, Dada Studio).`;

    const llmOut = await tryLLM(
      systemPrompt,
      `Secteur cible : ${sector}\nInstruction du directeur Ahmed Tall : ${instruction}`
    );

    const output = llmOut || buildStructuredDeliverable(agentId, sector, instruction);

    let emailSent = false;
    if (body.sendEmailCopy && process.env.RESEND_API_KEY) {
      const toEmail = process.env.PROSPECTION_ALERT_EMAIL || "ahmedtall08@gmail.com";
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Sen-E-Carte Agents <onboarding@resend.dev>";
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [toEmail],
            subject: `[Sen-E-Carte · ${profile.name}] Livrable prêt — ${sector}`,
            html: `<div style="font-family:Arial,sans-serif;max-width:720px;margin:0 auto;padding:24px;background:#f8fafc;">
              <div style="background:#071a30;color:#fff;padding:18px 22px;border-radius:14px 14px 0 0;">
                <h2 style="margin:0;font-size:17px;">${profile.name} (${profile.channel})</h2>
                <p style="margin:4px 0 0;font-size:12px;color:#7dd3fc;">Secteur : ${sector}</p>
              </div>
              <div style="background:#fff;padding:20px;border-radius:0 0 14px 14px;border:1px solid #e2e8f0;white-space:pre-wrap;font-size:13px;line-height:1.6;color:#1e293b;">${output
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")}</div>
            </div>`,
          }),
        });
        emailSent = res.ok;
      } catch {}
    }

    return NextResponse.json({
      ok: true,
      agentName: profile.name,
      agentRole: profile.role,
      channel: profile.channel,
      output,
      emailSent,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Erreur lors de l'exécution de la mission agent." },
      { status: 500 }
    );
  }
}
