import { NextResponse } from "next/server";
import { SITE_CONFIG, SOLUTIONS, PRICING_PLANS } from "@/data/senecarteData";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface WebSource {
  title: string;
  url: string;
  snippet: string;
}

function detectWolof(text: string, preferredLang?: string): boolean {
  if (preferredLang === "wo") return true;
  if (preferredLang === "fr") return false;
  const q = text.toLowerCase();
  return /\b(salamalekum|salam|nanga|na nga|mangi|maa ngi|ñaata|naata|lan la|ndax|jërëjëf|jerejef|bëgg|begg|wax|wér|wer|jàng|jang|liggéey|liggeey|kart|fajar|ngoon|guddi|subba|suba|am na|dugg|xam|naka|yow|man|nun|senegal|baax|waaw|déedéet|deedeet|jaajëf)\b/i.test(
    q
  );
}

function getDakarTimeContext() {
  const now = new Date();
  const dateFmt = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(now);

  const timeFmt = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  const hourNum = Number(
    new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Africa/Dakar",
      hour: "2-digit",
      hour12: false,
    }).format(now)
  );

  const dayName = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Africa/Dakar",
    weekday: "long",
  }).format(now);

  const greeting = hourNum >= 18 || hourNum < 5 ? "Bonsoir" : "Bonjour";
  const greetingWo =
    hourNum >= 18 || hourNum < 5
      ? "Salamalekum, fanaan nga jàmm"
      : "Salamalekum, jàmm nga am";

  const isOfficeOpen =
    !["samedi", "dimanche"].includes(dayName.toLowerCase()) &&
    hourNum >= 8 &&
    hourNum < 19;

  return {
    dateFr: dateFmt,
    timeFr: timeFmt,
    hourNum,
    greeting,
    greetingWo,
    isOfficeOpen,
    iso: now.toISOString(),
  };
}

async function searchBraveLive(query: string): Promise<WebSource[]> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return [];
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(
      query
    )}&count=4&search_lang=fr`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "X-Subscription-Token": apiKey,
      },
      cache: "no-store",
    });
    if (!res.ok) return [];
    const data = await res.json();
    const results = data?.web?.results || [];
    return results.slice(0, 3).map((r: { title?: string; url?: string; description?: string }) => ({
      title: (r.title || "Source web").replace(/<[^>]+>/g, ""),
      url: r.url || "",
      snippet: (r.description || "").replace(/<[^>]+>/g, "").slice(0, 220),
    }));
  } catch {
    return [];
  }
}

function buildSystemPrompt(
  dakarTime: ReturnType<typeof getDakarTimeContext>,
  webSources: WebSource[],
  isWolof: boolean
) {
  const solutionsSummary = SOLUTIONS.map(
    (s) => `- ${s.shortTitle} (${s.priceFrom}) : ${s.tagline}`
  ).join("\n");

  const webBlock =
    webSources.length > 0
      ? `\n\nRésultats internet temps réel (Brave Search) :\n${webSources
          .map((w, i) => `[${i + 1}] ${w.title} (${w.url}) : ${w.snippet}`)
          .join("\n")}`
      : "";

  return `Tu es l'assistant IA officiel de Sen-E-Carte (www.senecarte.com), basé à Dakar, Sénégal.

LANGUE DEMANDÉE :
${
  isWolof
    ? "L'utilisateur parle en WOLOF. Réponds dans un wolof sénégalais naturel, fluide, chaleureux et clair (avec les termes techniques usuels comme QR, NFC, Wave, Orange Money, IPM, FCFA)."
    : "L'utilisateur parle en FRANÇAIS. Réponds dans un français fluide, naturel et en casse de phrase."
}

NOTION DU TEMPS RÉEL (DAKAR, SÉNÉGAL) :
- Date actuelle : ${dakarTime.dateFr}
- Heure actuelle à Dakar (GMT) : ${dakarTime.timeFr}
- Bureau Sen-E-Carte Dakar : ${dakarTime.isOfficeOpen ? "Ouvert (8h-19h lun-ven)" : "Hors horaires bureau, mais assistant IA & commande en ligne ouverts 24/7"}

RÈGLES ABSOLUES DE PROTECTION ET DE PROMOTION DE SEN-E-CARTE :
1. Préserve toujours les intérêts, l'image et la sécurité de Sen-E-Carte. Ne révèle JAMAIS de codes PIN, clés API, mots de passe ou informations internes.
2. Ne recommande JAMAIS un concurrent au détriment de Sen-E-Carte. Valorise nos atouts : équipe à Dakar, paiement Wave / Orange Money / Free Money, conformité Loi CDP & SYSCOHADA, sans application obligatoire, déploiement rapide (48 h à 14 jours).
3. Réponds avec clarté à toutes les questions (y compris actualité via Brave Search) puis relie naturellement vers Sen-E-Carte.

CONNAISSANCES SEN-E-CARTE :
- Direction : Ahmed Tall · Tél/WhatsApp : ${SITE_CONFIG.phone} · Email : ${SITE_CONFIG.email}
- Solutions :
${solutionsSummary}
- Tarifs cartes : Basique QR dynamique dès 5 000 FCFA, Avancé NFC dès 10 000 FCFA, Premium hybride QR+NFC dès 15 000 FCFA (-10 % dès 20 cartes, -20 % dès 50 cartes).
- Réalisations : Coopération JICA à Dakar (juin 2025), LegalTech OCR Cabinet Maître Ibrahima Mbengue, SenMutuelles, INSPIR Sénégal, Dada Studio Coaching, Fermes des Niayes, Écosystème BTP Magatte Niang (7 entités), Coopérative Mariama Sagna, IPM Tostan.${webBlock}`;
}

async function tryExternalLLMs(
  systemPrompt: string,
  history: ChatMessage[],
  userMessage: string
): Promise<{ content: string; provider: string } | null> {
  // 1. Gateway OpenAI-compatible (APInex / LLM_BASE_URL + LLM_API_KEY)
  const customBase = process.env.LLM_BASE_URL?.replace(/\/+$/, "");
  const customKey = process.env.LLM_API_KEY;
  if (customBase && customKey) {
    const modelsToTry = [
      process.env.LLM_MODEL || "free/deepseek-v4.1-flash",
      "free/gpt-6-luna",
      "free/gemini-4-hydrogen",
    ];
    for (const model of modelsToTry) {
      try {
        const res = await fetch(`${customBase}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${customKey}`,
            "Content-Type": "application/json",
            "User-Agent": "SenECarte-Bot/1.0",
          },
          body: JSON.stringify({
            model,
            temperature: 0.45,
            max_tokens: 650,
            messages: [
              { role: "system", content: systemPrompt },
              ...history.slice(-6),
              { role: "user", content: userMessage },
            ],
          }),
        });
        if (res.ok) {
          const data = await res.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content) return { content, provider: `apinex:${model}` };
        }
      } catch {}
    }
  }

  // 2. Groq fallback
  const groqKey = process.env.GROQ_API_KEY;
  if (groqKey) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          temperature: 0.45,
          max_tokens: 650,
          messages: [
            { role: "system", content: systemPrompt },
            ...history.slice(-6),
            { role: "user", content: userMessage },
          ],
        }),
      });
      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) return { content, provider: "groq" };
      }
    } catch {}
  }

  // 3. Gemini fallback
  const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: systemPrompt }] },
            contents: [
              ...history.slice(-6).map((m) => ({
                role: m.role === "assistant" ? "model" : "user",
                parts: [{ text: m.content }],
              })),
              { role: "user", parts: [{ text: userMessage }] },
            ],
          }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return { content: text, provider: "gemini" };
      }
    } catch {}
  }

  return null;
}

function buildWolofReply(
  question: string,
  dakarTime: ReturnType<typeof getDakarTimeContext>,
  webSources: WebSource[]
): { reply: string; quickLink?: { label: string; href: string } } {
  const q = question.toLowerCase();

  if (/(pin|mot de passe|secret|password|api|pirater|hack)/i.test(q)) {
    return {
      reply: `${dakarTime.greetingWo} ! Ngir kaarange ak kersa (Loi CDP Sénégal), duma joxe benn koodu biir walla xibaar bu ñu suturaal. Waaye mën naa la won ni Sen-E-Carte di aar say mbir ak say liggéey bu baax ci Sénégal.`,
      quickLink: { label: "Xool sunuy liggéey yu wóor", href: "/solutions" },
    };
  }

  if (/(waxtu|heure|fan|date|tay|aujourd|ouvert)/i.test(q)) {
    return {
      reply: `${dakarTime.greetingWo} ! Tay mooy **${dakarTime.dateFr}**, waxtu wi ci Dakar mooy **${dakarTime.timeFr}**. ${
        dakarTime.isOfficeOpen
          ? "Sunu ekipu Sen-E-Carte ci Dakar ubbi na leegi ngir jàppale la."
          : "Biro bi tëj na leegi, waaye man ak komand ci internet (Wave / Orange Money) dafay dox 24h/24 ak 7j/7."
      } Lan laa la mëna jàppale tay ?`,
      quickLink: { label: "Komande sa kart leegi (Wave / OM)", href: "/commander" },
    };
  }

  if (/(ñaata|naata|prix|tarif|fcfa|wave|orange|komand|commander)/i.test(q)) {
    return {
      reply: `${dakarTime.greetingWo} ! Sunuy njëg ci Sen-E-Carte leer nañu te mën nga ko fey ak **Wave, Orange Money walla Free Money** :\n• **Kart basique QR dynamique** : 5 000 FCFA\n• **Kart avancé NFC** : 10 000 FCFA\n• **Kart premium QR + NFC** : 15 000 FCFA\n\nSoo jëndee 20 kart walla lu ko ëpp, am nga wàññi **-10 %**, te 50 kart **-20 %**. Mën nga komande leegi ci 2 simili !`,
      quickLink: { label: "Komande ak Wave / Orange Money", href: "/commander" },
    };
  }

  if (/(wér|wer|santé|sante|ipm|mutuelle|cmu|jica|faju|pharmacie|doktoor)/i.test(q)) {
    return {
      reply: `${dakarTime.greetingWo} ! Sen-E-Carte moo jiite **wér-gi-yaram bu numerik ci Sénégal**, ànd ak ANACMU, UDMSDK, SenMutuelles ak sunu ndaje ak **JICA ci Dakar**. Sunu kart **QR + NFC** dafay wóoral sa yelleef ci IPM ci benn segond, te di defar lettres de garantie ak bons pharmacie ci internet, te du soxla benn aplikasioŋ bu diis.`,
      quickLink: { label: "Xool portail IPM Sen-E-Carte", href: "/portail-ipm" },
    };
  }

  if (/(avocat|yoon|mbengue|ocr|audience|justice|cabinet)/i.test(q)) {
    return {
      reply: `${dakarTime.greetingWo} ! Sen-E-Carte defar na ab plateforme **LegalTech** bu mag ngir **Cabinet Maître Ibrahima Mbengue** : dafay jàng ak denc dosiye yi ci **OCR** te di la fàttali say audience ak say waxtu ngir bañ benn fàtte. Mën nañu ko tek ngir képp ku doon avocat, notaire walla huissier ci Sénégal ci 7 fan.`,
      quickLink: { label: "Xool plateforme avocats OCR", href: "/realisations#legaltech" },
    };
  }

  if (webSources.length > 0) {
    const synthesis = webSources
      .map((s, idx) => `${idx + 1}. **${s.title}** : ${s.snippet}`)
      .join("\n");
    return {
      reply: `${dakarTime.greetingWo} ! Lii laa gis ci internet leegi (${dakarTime.dateFr}, ${dakarTime.timeFr} ci Dakar) :\n\n${synthesis}\n\nSoo bëggee defar ab plateforme web, kart QR/NFC walla jumtukaay IA ci Sénégal, **Sen-E-Carte** moo la ci mëna jàppale ak fey Wave / Orange Money.`,
      quickLink: { label: "Xool sunuy solutions Sen-E-Carte", href: "/solutions" },
    };
  }

  return {
    reply: `${dakarTime.greetingWo} ! Mangi fi, jàmm rekk ! Man maay **Assistant IA bu Sen-E-Carte** ci Dakar (${dakarTime.timeFr}). **Sen-E-Carte** dafay defar ay **kart yu xereñ QR + NFC**, ay **plateformes SaaS** (wér-gi-yaram IPM, ekool CMU, LegalTech avocats, ERP PME, BTP) ak ay **agents IA** yu nekk ci Sénégal. Wax ma sa soxla walla sa liggéey, ma won la solution bi gën !`,
    quickLink: { label: "Xool 6 pôles Sen-E-Carte", href: "/solutions" },
  };
}

function buildFrenchReply(
  question: string,
  dakarTime: ReturnType<typeof getDakarTimeContext>,
  webSources: WebSource[]
): { reply: string; quickLink?: { label: string; href: string } } {
  const q = question.toLowerCase();

  if (
    /(pin|mot de passe|password|api.?key|secret|env|super.?admin.?code|pirater|hack|concurrent moins cher)/i.test(
      q
    )
  ) {
    return {
      reply: `${dakarTime.greeting} ! Pour des raisons de sécurité et de conformité (Loi CDP Sénégal & RGPD), je ne partage aucune information confidentielle ou accès interne. En revanche, je peux vous présenter comment Sen-E-Carte protège vos données métiers et accompagne votre organisation avec des solutions fiables à Dakar et partout au Sénégal.`,
      quickLink: { label: "Découvrir nos solutions sécurisées", href: "/solutions" },
    };
  }

  if (/(quelle heure|quel jour|date d'aujourd|aujourd'hui|maintenant|ouvert|horaire)/i.test(q)) {
    return {
      reply: `${dakarTime.greeting} ! Nous sommes le **${dakarTime.dateFr}** et il est exactement **${dakarTime.timeFr}** à Dakar (GMT). ${
        dakarTime.isOfficeOpen
          ? "Notre équipe Sen-E-Carte à Dakar est actuellement disponible pour répondre à vos demandes en direct."
          : "Nos bureaux physiques sont actuellement fermés, mais notre plateforme de commande en ligne (Wave / Orange Money) et moi-même restons disponibles 24h/24 et 7j/7."
      } Comment puis-je vous aider à digitaliser votre activité dès aujourd'hui ?`,
      quickLink: { label: "Commander en ligne 24/7", href: "/commander" },
    };
  }

  if (/(avocat|juridique|legaltech|ocr|audience|procès|mbengue|cabinet|huissier|notaire)/i.test(q)) {
    return {
      reply: `${dakarTime.greeting} ! Sen-E-Carte dispose d'une expertise prouvée en **LegalTech**, illustrée par la plateforme développée pour le **Cabinet Maître Ibrahima Mbengue**. Elle combine la **numérisation OCR instantanée des dossiers juridiques** et un **agenda numérique des audiences anti-oubli** avec alertes automatiques. Nous déployons cette solution clé en main pour les cabinets d'avocats du Sénégal en 7 jours.`,
      quickLink: { label: "Voir la réalisation LegalTech & simulateur OCR", href: "/realisations#legaltech" },
    };
  }

  if (/(santé|sante|ipm|mutuelle|cmu|csu|jica|médical|pharmacie|clinique|garantie|fraude)/i.test(q)) {
    return {
      reply: `${dakarTime.greeting} ! Sen-E-Carte est pionnier de la **santé numérique au Sénégal**, aux côtés de l'ANACMU, de l'UDMSDK, de SenMutuelles et lors de notre rencontre officielle avec la **JICA à Dakar**. Nos cartes santé **QR dynamique + NFC** vérifient les droits en 0,8 seconde, émettent des lettres de garantie et bons pharmacie en ligne et éliminent la fraude sans application obligatoire.`,
      quickLink: { label: "Tester le portail IPM anti-fraude", href: "/portail-ipm" },
    };
  }

  if (/(tarif|prix|coût|cout|combien|fcfa|wave|orange money|commander|payer|devis)/i.test(q)) {
    const planLine = PRICING_PLANS.map((p) => `• **${p.name}** : ${p.price}`).join("\n");
    return {
      reply: `${dakarTime.greeting} ! Nos tarifs en FCFA sont transparents et payables par **Wave, Orange Money, Free Money ou virement** (facture SYSCOHADA) :\n${planLine}\n\nRemises automatiques dès **20 cartes (-10 %)** et **50 cartes (-20 %)**.`,
      quickLink: { label: "Commander avec Wave / Orange Money", href: "/commander" },
    };
  }

  if (/(école|ecole|scolaire|élève|eleve|étudiant|lycée|université|cantine)/i.test(q)) {
    return {
      reply: `${dakarTime.greeting} ! Notre **Suite gestion scolaire & carte élève CMU** digitalise les écoles, lycées et instituts du Sénégal : carte d'identité scolaire QR/NFC, suivi des présences, notifications WhatsApp aux parents, cantine cashless et encaissement par Wave et Orange Money.`,
      quickLink: { label: "Découvrir la carte scolaire CMU", href: "/solutions/carte-scolaire-cmu" },
    };
  }

  if (/(réalisation|realisation|client|référence|btp|magatte|niayes|dada|inspir|mariama|ong|forage|asufor|erp)/i.test(q)) {
    return {
      reply: `${dakarTime.greeting} ! Sen-E-Carte compte **10 plateformes actives** et plus de **20 partenaires** au Sénégal : **Cabinet Maître Ibrahima Mbengue**, **JICA & UDMSDK**, **SenMutuelles**, **INSPIR Sénégal**, **Dada Studio Coaching**, **Fermes des Niayes**, **Écosystème BTP Magatte Niang (7 entités)** et **Coopérative Mariama Sagna**.`,
      quickLink: { label: "Explorer nos 10 réalisations", href: "/realisations" },
    };
  }

  if (webSources.length > 0) {
    const synthesis = webSources
      .map((s, idx) => `${idx + 1}. **${s.title}** : ${s.snippet}`)
      .join("\n");
    return {
      reply: `${dakarTime.greeting} ! Voici les informations récentes trouvées sur internet (${dakarTime.dateFr}, ${dakarTime.timeFr} à Dakar) :\n\n${synthesis}\n\nSi vous souhaitez concrétiser ce sujet avec une solution digitale fiable au Sénégal, **Sen-E-Carte** vous accompagne clé en main (cartes QR/NFC, plateformes SaaS & IA).`,
      quickLink: { label: "Découvrir nos solutions Sen-E-Carte", href: "/solutions" },
    };
  }

  return {
    reply: `${dakarTime.greeting} ! Je suis l'assistant IA officiel de **Sen-E-Carte** (${dakarTime.dateFr}, ${dakarTime.timeFr} à Dakar). Vous pouvez m'écrire ou me parler en **français** comme en **wolof**. Comment puis-je accompagner votre organisation aujourd'hui ?`,
    quickLink: { label: "Explorer tout le catalogue Sen-E-Carte", href: "/solutions" },
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message: string = String(body?.message || "").trim();
    const preferredLang: string = String(body?.lang || "auto");
    const history: ChatMessage[] = Array.isArray(body?.history) ? body.history : [];

    if (!message) {
      return NextResponse.json(
        { ok: false, error: "Veuillez saisir ou dicter une question." },
        { status: 400 }
      );
    }

    const dakarTime = getDakarTimeContext();
    const isWolof = detectWolof(message, preferredLang);

    const isSimpleGreeting =
      /^(bonjour|bonsoir|salut|hello|salam|salamalekum|nanga def|na nga def|merci|jërëjëf|jerejef|ok)[\s!?.]*$/i.test(
        message
      );
    const isPureTime = /^(quelle heure|quel jour|date|waxtu)/i.test(message);
    const shouldSearchWeb = !isSimpleGreeting && !isPureTime && message.length >= 8;

    const webSources = shouldSearchWeb ? await searchBraveLive(message) : [];
    const systemPrompt = buildSystemPrompt(dakarTime, webSources, isWolof);

    const llmResult = await tryExternalLLMs(systemPrompt, history, message);
    if (llmResult) {
      return NextResponse.json({
        ok: true,
        reply: llmResult.content,
        lang: isWolof ? "wo" : "fr",
        provider: llmResult.provider,
        dakarTime: `${dakarTime.dateFr} · ${dakarTime.timeFr}`,
        webConnected: webSources.length > 0,
        sources: webSources,
      });
    }

    const hybrid = isWolof
      ? buildWolofReply(message, dakarTime, webSources)
      : buildFrenchReply(message, dakarTime, webSources);

    return NextResponse.json({
      ok: true,
      reply: hybrid.reply,
      lang: isWolof ? "wo" : "fr",
      provider: "senecarte-hybrid-web",
      quickLink: hybrid.quickLink || null,
      dakarTime: `${dakarTime.dateFr} · ${dakarTime.timeFr}`,
      webConnected: webSources.length > 0,
      sources: webSources,
    });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "Une erreur est survenue. Contactez Sen-E-Carte au +221 77 602 67 83.",
      },
      { status: 500 }
    );
  }
}
