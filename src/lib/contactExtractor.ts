// Utilitaire d'extraction des coordonnées réelles (email & WhatsApp / téléphone)
// des structures, ONG, IPM, cabinets et PME détectées par Agent-Reach & Brave Search.

export interface ExtractedContacts {
  email: string;
  whatsapp: string; // format international chiffres uniquement (ex: 221771234567)
  phoneDisplay: string; // format lisible (ex: +221 77 123 45 67)
}

export const DIRECTOR_EMAIL = "ahmedtall08@gmail.com";
export const DIRECTOR_WHATSAPP = "221776026783";

const BLOCKED_EMAIL_DOMAINS = [
  "example.com",
  "example.org",
  "sentry.io",
  "wixpress.com",
  "resend.dev",
  "resend.com",
  "w3.org",
  "schema.org",
  "cloudflare.com",
  "googleapis.com",
  "gstatic.com",
  "facebook.com",
  "twitter.com",
  "linkedin.com",
  "instagram.com",
  "youtube.com",
  "senecarte.com",
];

const BLOCKED_EMAIL_PREFIXES = [
  "noreply",
  "no-reply",
  "donotreply",
  "mailer-daemon",
  "postmaster",
  "privacy",
  "abuse",
];

export function isDirectorEmail(email: string): boolean {
  return email.trim().toLowerCase() === DIRECTOR_EMAIL;
}

export function isDirectorWhatsapp(phone: string): boolean {
  const digits = phone.replace(/[^0-9]/g, "");
  return (
    digits === DIRECTOR_WHATSAPP ||
    digits === "776026783" ||
    digits === "00221776026783"
  );
}

export function normalizeSenegalPhone(raw: string): {
  digits: string;
  display: string;
} | null {
  const digits = raw.replace(/[^0-9]/g, "");
  let normalized = "";

  if (digits.startsWith("00221") && digits.length === 14) {
    normalized = digits.slice(2);
  } else if (digits.startsWith("221") && digits.length === 12) {
    normalized = digits;
  } else if (
    digits.length === 9 &&
    /^(77|78|76|70|75|33)/.test(digits)
  ) {
    normalized = `221${digits}`;
  } else {
    return null;
  }

  if (isDirectorWhatsapp(normalized)) return null;

  const local = normalized.slice(3); // 9 chiffres
  const display = `+221 ${local.slice(0, 2)} ${local.slice(2, 5)} ${local.slice(5, 7)} ${local.slice(7, 9)}`;
  return { digits: normalized, display };
}

export function extractContactsFromText(text: string): ExtractedContacts {
  let email = "";
  let whatsapp = "";
  let phoneDisplay = "";

  if (!text) return { email, whatsapp, phoneDisplay };

  // 1. Extraction des emails valides
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}/g;
  const rawEmails = text.match(emailRegex) || [];
  for (const candidate of rawEmails) {
    const clean = candidate.trim().toLowerCase().replace(/\.+$/, "");
    if (isDirectorEmail(clean)) continue;
    const [localPart, domain] = clean.split("@");
    if (!localPart || !domain) continue;
    if (
      /\.(png|jpg|jpeg|gif|svg|webp|css|js|ico|woff|ttf)$/i.test(domain)
    ) {
      continue;
    }
    if (BLOCKED_EMAIL_DOMAINS.some((b) => domain === b || domain.endsWith(`.${b}`))) {
      continue;
    }
    if (BLOCKED_EMAIL_PREFIXES.some((p) => localPart.startsWith(p))) {
      continue;
    }
    email = clean;
    break;
  }

  // 2. Extraction prioritaire de liens wa.me/ ou api.whatsapp.com
  const waLinkMatch = text.match(/(?:wa\.me\/|whatsapp\.com\/send\?phone=)\+?([0-9]{9,15})/i);
  if (waLinkMatch) {
    const norm = normalizeSenegalPhone(waLinkMatch[1]);
    if (norm) {
      whatsapp = norm.digits;
      phoneDisplay = norm.display;
    }
  }

  // 3. Extraction des numéros sénégalais (+221 77/78/76/70/75/33 ...)
  if (!whatsapp) {
    const phoneRegex =
      /(?:\+221|00221|\(\+221\))[\s.\-()]*[37][0-9](?:[\s.\-]*[0-9]){7}\b|\b(?:77|78|76|70|75|33)[\s.\-]?[0-9]{3}[\s.\-]?[0-9]{2}[\s.\-]?[0-9]{2}\b/g;
    const phoneMatches = text.match(phoneRegex) || [];
    // Préférer un mobile (77/78/76/70/75) pour WhatsApp, sinon fixe (33)
    const normalizedPhones = phoneMatches
      .map((m) => normalizeSenegalPhone(m))
      .filter((x): x is { digits: string; display: string } => Boolean(x));

    const mobile = normalizedPhones.find((p) => /^2217/.test(p.digits));
    const chosen = mobile || normalizedPhones[0];
    if (chosen) {
      whatsapp = chosen.digits;
      phoneDisplay = chosen.display;
    }
  }

  return { email, whatsapp, phoneDisplay };
}

export async function extractContactsFromUrlAndSnippet(
  url: string,
  snippet: string
): Promise<ExtractedContacts> {
  const fromSnippet = extractContactsFromText(snippet);
  if (fromSnippet.email && fromSnippet.whatsapp) {
    return fromSnippet;
  }

  // Ne pas tenter de scraper les PDF ou les réseaux sociaux bloqués
  if (
    !url ||
    !url.startsWith("http") ||
    /\.pdf(\?|$)/i.test(url) ||
    /(linkedin\.com|facebook\.com|instagram\.com|x\.com|twitter\.com|youtube\.com|allafrica\.com)/i.test(
      url
    )
  ) {
    return fromSnippet;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 3200);
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SenECarteAgentReach/1.0; +https://www.senecarte.com)",
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });
    clearTimeout(timer);

    if (!res.ok) return fromSnippet;
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html")) return fromSnippet;

    const html = (await res.text()).slice(0, 160000);
    // Privilégier d'abord les mailto: explicites
    const mailtoMatches = Array.from(html.matchAll(/mailto:([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10})/gi))
      .map((m) => m[1])
      .join(" ");

    const fromPage = extractContactsFromText(`${mailtoMatches}\n${html}`);

    return {
      email: fromSnippet.email || fromPage.email,
      whatsapp: fromSnippet.whatsapp || fromPage.whatsapp,
      phoneDisplay: fromSnippet.phoneDisplay || fromPage.phoneDisplay,
    };
  } catch {
    return fromSnippet;
  }
}
