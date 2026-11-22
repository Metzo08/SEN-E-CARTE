import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SenECarteChatbot from "@/components/SenECarteChatbot";
import { SITE_CONFIG } from "@/data/senecarteData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: "Sen-E-Carte | Cartes Intelligentes QR-NFC, SaaS Santé IPM, CMU & IA au Sénégal",
    template: "%s | Sen-E-Carte Sénégal",
  },
  description:
    "Plateforme SaaS leader au Sénégal : cartes de santé numériques IPM (QR/NFC), cartes scolaires CMU, cartes de visite NFC, cartes membres GIE, logiciels métiers (forages ASUFOR, stocks SYSCOHADA) et développement web, mobile & IA sur mesure.",
  keywords: [
    "Sen-E-Carte",
    "carte de santé numérique Sénégal",
    "digitalisation IPM Dakar",
    "carte scolaire intelligente CMU Sénégal",
    "carte de visite NFC Dakar",
    "carte membre GIE Sénégal",
    "logiciel facturation forage ASUFOR",
    "développement site web et IA Sénégal",
    "Ahmed TALL",
  ],
  authors: [{ name: "Ahmed Tall", url: SITE_CONFIG.founder.linkedin }],
  creator: "Sen-E-Carte",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: SITE_CONFIG.domain,
    siteName: "Sen-E-Carte",
    title: "Sen-E-Carte | cartes intelligentes QR-NFC, SaaS & IA au Sénégal",
    description:
      "Digitalisez vos IPM, écoles (CMU), GIE, entreprises et forages avec les cartes intelligentes QR/NFC, les logiciels métiers et les agents IA de sen-e-carte.",
    images: [
      {
        url: "/images/senecarte-hero-nfc.jpg",
        width: 1280,
        height: 720,
        alt: "Sen-E-Carte — Cartes intelligentes QR dynamique et NFC au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SenECarte",
    creator: "@SenECarte",
    title: "Sen-E-Carte | cartes intelligentes QR-NFC & SaaS au Sénégal",
    description:
      "Cartes de santé IPM, cartes scolaires CMU, cartes NFC pro, logiciels métiers et studio IA sen-e-carte.",
    images: ["/images/senecarte-hero-nfc.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Sen-E-Carte",
        url: SITE_CONFIG.domain,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        founder: {
          "@type": "Person",
          name: SITE_CONFIG.founder.name,
          sameAs: SITE_CONFIG.founder.linkedin,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Dakar",
          addressCountry: "SN",
        },
        sameAs: [
          SITE_CONFIG.socials.youtube,
          SITE_CONFIG.socials.x,
          SITE_CONFIG.socials.linkedin,
          SITE_CONFIG.socials.founderLinkedin,
          SITE_CONFIG.socials.facebook,
          SITE_CONFIG.socials.instagram,
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "Sen-E-Carte SaaS",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, PWA, Android, iOS",
        url: `${SITE_CONFIG.domain}/app`,
        offers: {
          "@type": "Offer",
          priceCurrency: "XOF",
          price: "4500",
        },
      },
    ],
  };

  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <SenECarteChatbot />
      </body>
    </html>
  );
}
