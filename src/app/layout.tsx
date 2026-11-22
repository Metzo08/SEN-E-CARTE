import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SenECarteChatbot from "@/components/SenECarteChatbot";
import { SITE_CONFIG } from "@/data/senecarteData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default:
      "Sen-E-Carte | Cartes de visite NFC & QR dynamique, logiciels métiers, LegalTech & IA au Sénégal",
    template: "%s | Sen-E-Carte Sénégal",
  },
  description:
    "Sen-E-Carte conçoit des cartes de visite intelligentes QR dynamique + NFC, des cartes santé IPM & scolaires CMU, et des solutions métiers sur-mesure pour entreprises, cabinets d'avocats, PME, BTP, immobilier et ONG au Sénégal.",
  keywords: [
    "Sen-E-Carte",
    "carte de visite intelligente NFC Sénégal",
    "carte de visite QR code dynamique Dakar",
    "carte de santé numérique IPM Sénégal",
    "logiciel cabinet avocat OCR Sénégal",
    "ERP PME SYSCOHADA Dakar",
    "gestion immobilière quittances WhatsApp Sénégal",
    "carte scolaire intelligente CMU Sénégal",
    "logiciel gestion forage ASUFOR",
    "logiciel BTP devis DQE Sénégal",
    "tontine digitale Wave Orange Money",
    "chatbot IA français wolof Sénégal",
    "développement application web mobile Dakar",
    "Ahmed Tall Sen-E-Carte",
  ],
  authors: [{ name: "Ahmed Tall", url: SITE_CONFIG.founder.linkedin }],
  creator: "Sen-E-Carte",
  publisher: "Sen-E-Carte",
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: SITE_CONFIG.domain,
    siteName: "Sen-E-Carte",
    title: "Sen-E-Carte | Cartes de visite NFC/QR & solutions métiers pour entreprises au Sénégal",
    description:
      "Cartes de visite intelligentes QR dynamique + NFC, portails santé IPM, LegalTech avocats OCR, ERP SYSCOHADA, gestion scolaire, BTP, immobilier et agents IA FR/Wolof à Dakar.",
    images: [
      {
        url: "/images/illustrations/hero-wow.jpg",
        width: 1280,
        height: 720,
        alt: "Sen-E-Carte — Cartes intelligentes QR dynamique + NFC et solutions métiers au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@SenECarte",
    creator: "@SenECarte",
    title: "Sen-E-Carte | Cartes NFC/QR & solutions métiers au Sénégal",
    description:
      "Cartes de visite intelligentes QR+NFC, santé IPM, LegalTech avocats, ERP PME SYSCOHADA et IA FR/Wolof au Sénégal.",
    images: ["/images/illustrations/hero-wow.jpg"],
  },
  alternates: {
    canonical: SITE_CONFIG.domain,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "LocalBusiness"],
        name: "Sen-E-Carte",
        url: SITE_CONFIG.domain,
        logo: `${SITE_CONFIG.domain}/images/logo-sen-e-carte.png`,
        image: `${SITE_CONFIG.domain}/images/illustrations/hero-wow.jpg`,
        telephone: SITE_CONFIG.phone,
        email: SITE_CONFIG.email,
        priceRange: "5 000 FCFA - Sur devis",
        areaServed: ["Sénégal", "UEMOA", "Afrique de l'Ouest"],
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
        name: "Sen-E-Carte SaaS & Cartes Intelligentes QR-NFC",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web, PWA, Android, iOS",
        url: `${SITE_CONFIG.domain}/solutions`,
        offers: {
          "@type": "Offer",
          priceCurrency: "XOF",
          price: "5000",
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
