"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Scale,
  FileSearch,
  CalendarClock,
  Sparkles,
  CheckCircle2,
  ExternalLink,
  BellRing,
  Gavel,
  ShieldCheck,
  Send,
  Layers,
  ArrowRight,
  FileText,
  Search,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

type PortfolioCategory =
  | "ALL"
  | "Juridique & legaltech"
  | "Santé, IPM & mutuelles"
  | "Agriculture & coaching"
  | "Plaidoyer, ONG & éducation"
  | "BTP, industrie & commerce";

interface PortfolioPlatform {
  id: string;
  title: string;
  clientOrDomain: string;
  url?: string;
  category: Exclude<PortfolioCategory, "ALL">;
  badge: string;
  image: string;
  description: string;
  features: string[];
  internalDemoHref?: string;
}

const PORTFOLIO_PLATFORMS: PortfolioPlatform[] = [
  {
    id: "cabinet-maitre-ibrahima-mbengue",
    title: "Plateforme legaltech — cabinet maître Ibrahima Mbengue",
    clientOrDomain: "cabinetmaitreibrahimambengue",
    category: "Juridique & legaltech",
    badge: "OCR juridique & agenda audiences",
    image: "/images/illustrations/legaltech-avocat.jpg",
    description:
      "Solution complète de digitalisation pour cabinet d'avocats : numérisation OCR haute vitesse des dossiers papier, recherche plein texte (deep search), assistant IA sur les pièces du dossier et agenda numérique intelligent des audiences et procès à venir.",
    features: [
      "Moteur OCR hybride (PDF scannés & photos d'actes convertis en dossiers numériques recherchables)",
      "Agenda numérique des audiences & procès avec alertes anti-oubli (délais d'appel et forclusion)",
      "Bouton « saisir la décision » après chaque audience, rattachant automatiquement le jugement au dossier",
      "Assistant IA juridique analysant les conclusions adverses + sécurité 2fa QR code & journal d'audit",
    ],
  },
  {
    id: "dadastudio-coaching",
    title: "Dada studio coaching — conseil en image, coaching & réservation",
    clientOrDomain: "dadastudio-coaching.com",
    url: "https://dadastudio-coaching.com/",
    category: "Agriculture & coaching",
    badge: "En ligne · coaching & image",
    image: "/images/illustrations/dadastudio-hero.png",
    description:
      "Plateforme web moderne dédiée au conseil en image, colorimétrie, tri de dressing et ateliers d'entreprise : présentation interactive des prestations et réservation de séances en ligne.",
    features: [
      "Parcours de réservation fluide sur mobile et ordinateur (bilan d'image, colorimétrie, ateliers B2B)",
      "Présentation des programmes de coaching & accompagnement personnalisé",
      "Architecture Next.js / typescript haute performance optimisée SEO",
    ],
  },
  {
    id: "fermes-des-niayes",
    title: "Ferme agroécologique des Niayes — agritech & terroir",
    clientOrDomain: "fermesdesniayes.com",
    url: "https://fermesdesniayes.com/",
    category: "Agriculture & coaching",
    badge: "En ligne · agritech & circuit court",
    image: "/images/illustrations/agritech-gie.jpg",
    description:
      "Plateforme digitale et e-commerce valorisant la production maraîchère, avicole et agroécologique de la zone des Niayes : catalogue en temps réel, traçabilité des récoltes et commande directe.",
    features: [
      "Catalogue dynamique des produits frais de la ferme & paniers hebdomadaires",
      "Commande en ligne simple avec paiement mobile Money (Wave / Orange Money)",
      "Base de données dédiée pour le suivi des stocks agricoles et des livraisons",
    ],
  },
  {
    id: "inspir-senegal",
    title: "INSPIR Sénégal — portail national de plaidoyer & protection sociale",
    clientOrDomain: "Réseau INSPIR Sénégal (47 organisations membres)",
    category: "Plaidoyer, ONG & éducation",
    badge: "Plaidoyer · 3 842+ signatures",
    image: "/images/illustrations/scolaire-cmu.jpg",
    description:
      "Plateforme institutionnelle fédérant 47 organisations membres autour du droit à la protection sociale au Sénégal : gestion des membres, pétitions citoyennes en ligne, médiathèque et publications.",
    features: [
      "Portail public 10 pages : accueil, mot du président, activités, membres, médias, ressources, pétitions, dons",
      "Module de pétitions citoyennes (12 campagnes actives, plus de 3 842 signatures vérifiées)",
      "Back-office d'administration complet des organisations partenaires (/API/organizations)",
    ],
  },
  {
    id: "senmutuelles-mutualis",
    title: "SenMutuelles (mutualis Dakar) — plateforme CSU & mutuelles",
    clientOrDomain: "senmutuelles.sn · Mutuelles de santé communautaires",
    category: "Santé, IPM & mutuelles",
    badge: "IA wolof/FR · sentinelle 24/7",
    image: "/images/illustrations/sante-ipm.jpg",
    description:
      "Infrastructure numérique de gestion des mutuelles de santé communautaires et de la couverture sanitaire universelle : enrôlement des familles, suivi des cotisations, assistant vocal/texte zahara et cyber-défense autonome.",
    features: [
      "Chatbot IA zahara répondant dynamiquement en temps réel en français et en wolof",
      "Sentinelle 24/7 intégrée : détection d'intrusions, quarantaine ip chirurgicale et alertes temps réel",
      "Architecture haute disponibilité (postgresql 17, pgbouncer, redis, minio, coturn webrtc)",
    ],
    internalDemoHref: "/portail-ipm",
  },
  {
    id: "ipm-tostan-cms-loliforce",
    title: "Portails IPM-Tostan, IPM-CMS & IPM-Loliforce",
    clientOrDomain: "Institutions de Prévoyance Maladie (Tostan, CMS, Loliforce)",
    category: "Santé, IPM & mutuelles",
    badge: "Tiers-payant & cartes santé IPM",
    image: "/images/illustrations/sante-ipm.jpg",
    description:
      "Applications dédiées à la gestion opérationnelle des IPM d'entreprises et d'ONG : fichiers bénéficiaires, réseau de prestataires médicaux conventionnés, facturation et contrôle des prises en charge.",
    features: [
      "Cartes de santé numériques QR dynamique + puce NFC reliées aux droits des assurés",
      "Délivrance et vérification des lettres de garantie et bons de commande pharmacie",
      "Suivi des factures prestataires, plafonds familiaux et états de rapprochement",
    ],
    internalDemoHref: "/portail-ipm",
  },
  {
    id: "cnive-nous-cims",
    title: "Plateforme CNIVE — suivi des élèves vulnérables à Pikine",
    clientOrDomain: "Fondation Nous Cims (Barcelone) · Écoles ECOPN, EDEN & Écoles Pies",
    category: "Plaidoyer, ONG & éducation",
    badge: "Impact social & cartographie",
    image: "/images/illustrations/scolaire-cmu.jpg",
    description:
      "Plateforme numérique intégrée soutenant l'action éducative et sociale à Pikine : identification des élèves vulnérables, cartographie des interventions et coordination entre acteurs éducatifs.",
    features: [
      "Dossiers individuels sécurisés de suivi scolaire, nutritionnel et social",
      "Cartographie interactive des bénéficiaires et des écoles pilotes",
      "Tableaux de bord de coordination pour le groupe thématique éducation de Pikine",
    ],
  },
  {
    id: "njaboot-anagmusc",
    title: "Carte santé « NJABOOT » (ANACMU) & portail ANAGMUSC.com",
    clientOrDomain: "ANACMU / Ministère de la Femme (PAREM) & UNAMUSC",
    category: "Santé, IPM & mutuelles",
    badge: "Référence nationale CMU",
    image: "/images/illustrations/sante-ipm.jpg",
    description:
      "Conception de la carte de santé électronique NJABOOT (pacte « un million de femmes dans la CMU ») et du portail national anagmusc.com géolocalisant les mutuelles de santé et pharmacies du Sénégal.",
    features: [
      "Dossier médical électronique conforme HIPAA / RGPD / loi CDP Sénégal",
      "Carte interactive nationale des mutuelles, structures sanitaires et pharmacies",
      "Dépôt d'ordonnances en ligne et carnets de maternité numériques",
    ],
  },
  {
    id: "ecosysteme-btp-sbs-serma",
    title: "Écosystème BTP & industriel Magatte Niang (7 entités connectées)",
    clientOrDomain: "magatteniang-expert.sn/entites",
    url: "https://www.magatteniang-expert.sn/entites",
    category: "BTP, industrie & commerce",
    badge: "7 plateformes & ERP connectés",
    image: "/images/illustrations/btp-geotech.jpg",
    description:
      "Développement d'un écosystème complet pour le génie civil et l'industrie : bureau d'études & bim 3D (SERMA BTP), grands travaux (sb-s group), laboratoire géotechnique certifié LNR-BTP C2/A3 (sb-s labo), ERP usine d'agglos/bpe (sb-s industrie), location de 71+ engins (sb-s logistik), showroom (P2M) et négoce (PGT).",
    features: [
      "ERP industriel complet : calcul de prix de revient, seuils de rentabilité et gestion de stocks bpe/agglos",
      "Workflow location d'engins : expression de besoin → devis → facture → paiement Wave / Orange Money",
      "Certificats géotechniques officiels, comparateur avant/après réhabilitation et assistant IA multi-filiales",
    ],
  },
  {
    id: "serigne-samsung-gie-n8n",
    title: "Cartes GIE Mariama Sagna & automatisations n8n",
    clientOrDomain: "Coopérative d'habitat social Mariama Sagna & workflows n8n",
    category: "BTP, industrie & commerce",
    badge: "Cartes GIE & n8n 24/7",
    image: "/images/illustrations/agritech-gie.jpg",
    description:
      "Système d'enrôlement et cartes membres PVC QR/NFC vérifiables pour la coopérative d'habitat social Mariama Sagna, GIE et coopératives partenaires, couplé à notre serveur d'automatisation n8n.",
    features: [
      "Cartes membres GIE & coopérative d'habitat infalsifiables avec vérification publique par scan QR",
      "Gestion des adhérents, cotisations et contrôle d'authenticité en temps réel",
      "Flux n8n automatisés : alertes prospects, webhooks paiements et synchronisation CRM",
    ],
    internalDemoHref: "/c/gie-niayes-mariama-sagna",
  },
];

const CATEGORIES: PortfolioCategory[] = [
  "ALL",
  "Juridique & legaltech",
  "Santé, IPM & mutuelles",
  "Agriculture & coaching",
  "Plaidoyer, ONG & éducation",
  "BTP, industrie & commerce",
];

const PLATFORM_LOGOS: Record<string, string> = {
  "cabinet-maitre-ibrahima-mbengue": "/images/logos/logo-legaldoc-mbengue.png",
  "dadastudio-coaching": "/images/logos/logo-dadastudio.png",
  "fermes-des-niayes": "/images/logos/logo-ferme-niayes.jpeg",
  "inspir-senegal": "/images/logos/logo-inspir-senegal.jpg",
  "senmutuelles-mutualis": "/images/logos/logo-senmutuelles.png",
  "ipm-tostan-cms-loliforce": "/images/logos/logo-ipm-tostan.png",
  "cnive-nous-cims": "/images/logos/logo-nous-cims.png",
  "njaboot-anagmusc": "/images/logos/logo-anacmu-sencsu.png",
  "ecosysteme-btp-sbs-serma": "/images/logos/logo-sbs-group.jpg",
  "serigne-samsung-gie-n8n": "/images/logos/logo-gie-mariama-sagna.png",
};

const MAGATTE_NIANG_ENTITY_LOGOS = [
  { name: "SERMA BTP", logo: "/images/logos/logo-serma-btp.jpg" },
  { name: "SB-S group", logo: "/images/logos/logo-sbs-group.jpg" },
  { name: "SB-S labo", logo: "/images/logos/logo-sbs-labo.png" },
  { name: "SB-S industrie", logo: "/images/logos/logo-sbs-industries.png" },
  { name: "SB-S logistik", logo: "/images/logos/logo-sbs-logistik.png" },
  { name: "P2M", logo: "/images/logos/logo-p2m.jpg" },
  { name: "PGT", logo: "/images/logos/logo-pgt.jpg" },
];

const DEMO_HEARINGS = [
  {
    id: "AUD-2026-104",
    date: "Mardi 24 nov. · 09:00",
    court: "Tribunal du Commerce Hors Classe de Dakar · Salle 2",
    caseRef: "Dossier n° 2026/COM/418 — Sté Atlantique Logistique c/ Transit Express",
    type: "Plaidoirie au fond",
    alertStatus: "Rappel automatique envoyé (J-2 WhatsApp & Email)",
    decisionStatus: "En attente d'audience",
  },
  {
    id: "AUD-2026-098",
    date: "Jeudi 26 nov. · 10:30",
    court: "Cour d'Appel de Dakar · 1re Chambre Civile",
    caseRef: "Dossier n° 2026/CIV/209 — Succession Famille Ndiaye",
    type: "Mise en état & dépôt de conclusions",
    alertStatus: "Échéance forclusion vérifiée · Alerte H-24 active",
    decisionStatus: "Conclusions OCR indexées",
  },
  {
    id: "AUD-2026-089",
    date: "Vendredi 27 nov. · 08:30",
    court: "Tribunal du Travail de Dakar",
    caseRef: "Dossier n° 2026/SOC/112 — M. Abdoulaye Fall c/ BTP Horizon",
    type: "Délibéré & saisie de décision",
    alertStatus: "Notification greffe activée",
    decisionStatus: "Prêt pour saisie du délibéré",
  },
];

export default function PortfolioRealisationsShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>("ALL");
  const [legalTab, setLegalTab] = useState<"OCR" | "AGENDA">("OCR");
  const [ocrSearch, setOcrSearch] = useState("clause pénale et délai d'appel");
  const [decisionSavedId, setDecisionSavedId] = useState<string | null>(null);

  const filteredPlatforms = PORTFOLIO_PLATFORMS.filter(
    (p) => selectedCategory === "ALL" || p.category === selectedCategory
  );

  return (
    <div className="space-y-12">
      {/* 1. FOCUS SPÉCIAL LEGALTECH : CABINET MAÎTRE IBRAHIMA MBENGUE (POUR LES AVOCATS DU SÉNÉGAL) */}
      <div id="legaltech" className="scroll-mt-24 bento-card rounded-3xl overflow-hidden border-2 border-sky-400/40">
        <div className="hero-grid text-white p-6 sm:p-10 border-b border-sky-500/25">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/logos/logo-legaldoc-mbengue.png"
                    alt="Logo cabinet maître Ibrahima Mbengue"
                    className="w-full h-full object-contain"
                    style={{ outline: "none" }}
                  />
                </div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-bold">
                  <Scale className="w-3.5 h-3.5" /> Innovation legaltech Sénégal · référence cabinet maître Ibrahima Mbengue
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold">
                  Cabinetmaitreibrahimambengue
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                Avocats, notaires &amp; juristes :{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-sky-300 to-emerald-300">
                  Numérisez vos dossiers par OCR et ne manquez plus aucune audience
                </span>
              </h2>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                Développée par <strong>Sen‑E‑Carte</strong> pour le{" "}
                <strong>Cabinet maître Ibrahima Mbengue</strong> (<code>Cabinetmaitreibrahimambengue</code>), notre
                suite legaltech combine un <strong>Moteur OCR juridique intelligent</strong> qui transforme vos
                dossiers papier en textes recherchables en quelques secondes et un{" "}
                <strong>Agenda numérique des audiences &amp; procès</strong> Avec alertes anti-oubli.
              </p>

              <div className="flex flex-wrap gap-3 pt-1">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    "Bonjour Ahmed Tall (Sen-E-Carte), je suis avocat / juriste et je souhaite une démonstration de votre plateforme LegalTech (OCR dossiers + Agenda numérique des audiences comme cabinetmaitreibrahimambengue)."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-brand-950 font-extrabold text-xs sm:text-sm"
                >
                  <Gavel className="w-4 h-4" />
                  <span>Demander une démo pour mon cabinet d&apos;avocats</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-sky-400/35 shadow-2xl aspect-[16/10] bg-brand-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/illustrations/legaltech-avocat.jpg"
                  alt="Plateforme legaltech Sen-E-Carte — OCR dossiers juridiques et agenda des audiences"
                  className="w-full h-full object-cover"
                />
                <div className="laser-scan-line" />
                <div className="absolute bottom-3 left-3 right-3 glass rounded-xl p-3 text-xs text-white flex items-center justify-between">
                  <span className="font-bold">OCR juridique + agenda audiences 24/7</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-400 text-brand-950 font-extrabold text-[11px]">
                    Sécurité 2fa &amp; audit log
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Simulateur interactif LegalTech (OCR Dossiers vs Agenda Audiences) */}
        <div className="p-6 sm:p-8 bg-white space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setLegalTab("OCR")}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  legalTab === "OCR"
                    ? "btn-glow-navy text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <FileSearch className="w-4 h-4 text-sky-400" />
                <span>1. Démo OCR &amp; numérisation instantanée des dossiers</span>
              </button>
              <button
                type="button"
                onClick={() => setLegalTab("AGENDA")}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                  legalTab === "AGENDA"
                    ? "btn-glow-navy text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <CalendarClock className="w-4 h-4 text-emerald-400" />
                <span>2. Démo agenda numérique des audiences &amp; anti-oubli</span>
              </button>
            </div>
            <span className="text-xs font-bold text-slate-500">
              Testez l&apos;outil ci-dessous comme dans le cabinet maître Ibrahima Mbengue
            </span>
          </div>

          {legalTab === "OCR" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 rounded-2xl bg-slate-50 border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-950">
                    <FileText className="w-4 h-4 text-sky-600" />
                    Pièce scannée : Conclusions_Adverse_TGI_Dakar.pdf (48 pages)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                    OCR terminé en 1,4 s
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2 font-mono leading-relaxed">
                  <div className="text-sky-700 font-bold">
                    [Extraction OCR automatique · ordre logique de lecture]
                  </div>
                  <p>
                    « Attendu que par exploit d&apos;huissier en date du 14 octobre 2026, la société demanderesse
                    sollicite l&apos;application de la <mark className="bg-amber-200 px-1 rounded">Clause pénale</mark>{" "}
                    stipulée à l&apos;article 12 du contrat commercial ; que le{" "}
                    <mark className="bg-emerald-200 px-1 rounded">Délai d&apos;appel</mark> De quinze (15) jours court à
                    compter de la signification... »
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="font-black text-brand-950">PDF + images</div>
                    <div className="text-[11px] text-slate-500">Scan smartphone ou copieur</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="font-black text-emerald-700">100 % indexé</div>
                    <div className="text-[11px] text-slate-500">Recherche dans le texte</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="font-black text-sky-700">Versionné</div>
                    <div className="text-[11px] text-slate-500">Historique complet</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-2xl bg-brand-950 text-white p-5 space-y-4 border border-sky-500/30">
                <div className="text-xs font-extrabold text-sky-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Recherche profonde (deep search) &amp; assistant IA juridique du dossier</span>
                </div>

                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={ocrSearch}
                    onChange={(e) => setOcrSearch(e.target.value)}
                    placeholder="Rechercher une clause, un article, une date dans tous les dossiers..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-xs">
                  <div className="font-bold text-emerald-400">
                    Synthèse instantanée de l&apos;Assistant IA sur « {ocrSearch || "le dossier"} » :
                  </div>
                  <p className="text-slate-200 leading-relaxed">
                    • <strong>3 occurrences trouvées</strong> Dans <em>Conclusions_Adverse_TGI_Dakar.pdf</em> (Pages
                    4, 12 et 19) et <em>Contrat_Cadre_2025.pdf</em>.<br />• <strong>Point de vigilance détecté</strong>{" "}
                    : la partie adverse invoque l&apos;article 12, mais l&apos;avenant signé en page 19 plafonne
                    l&apos;indemnité à 10 %.<br />• <strong>Échéance critique</strong> : Dépôt des conclusions en
                    réplique avant le <strong>26 novembre à 10h30</strong>.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {DEMO_HEARINGS.map((h) => (
                  <div
                    key={h.id}
                    className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-brand-950 text-sky-300 text-xs font-extrabold">
                          {h.date}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          <BellRing className="w-3 h-3" /> Anti-oubli actif
                        </span>
                      </div>
                      <div className="text-xs font-extrabold text-sky-800">{h.court}</div>
                      <div className="text-sm font-extrabold text-slate-950 leading-snug">{h.caseRef}</div>
                      <div className="text-xs text-slate-600">{h.type}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {h.alertStatus}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-500">
                        {decisionSavedId === h.id ? "Décision rattachée au dossier ✓" : h.decisionStatus}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDecisionSavedId(h.id)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                      >
                        {decisionSavedId === h.id ? "Décision enregistrée" : "Saisir la décision"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. PORTEFEUILLE COMPLET DES PLATEFORMES DÉVELOPPÉES PAR SEN-E-CARTE */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Layers className="w-3.5 h-3.5" /> Portefeuille de réalisations vérifiées · Sen-E-Carte
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
              Les plateformes, sites web et logiciels développés par notre équipe
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Du cabinet d&apos;avocats <strong>Maître Ibrahima Mbengue</strong> à{" "}
              <strong>Dada studio coaching</strong>, <strong>Fermes des Niayes</strong>,{" "}
              <strong>INSPIR Sénégal</strong>, <strong>SenMutuelles</strong>, <strong>IPM-Tostan</strong>,{" "}
              <strong>CNIVE</strong> Et l&apos;écosystème <strong>BTP SB-S / SERMA</strong> : Découvrez nos
              réalisations concrètes.
            </p>
          </div>
        </div>

        {/* Filtres par domaine */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                selectedCategory === cat
                  ? "btn-glow-navy text-white border-brand-950"
                  : "bg-white text-slate-700 border-slate-200 hover:border-sky-400"
              }`}
            >
              {cat === "ALL" ? `Toutes nos réalisations (${PORTFOLIO_PLATFORMS.length})` : cat}
            </button>
          ))}
        </div>

        {/* Grille des 10 plateformes & écosystèmes réalisés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlatforms.map((item) => (
            <div
              key={item.id}
              className="group bento-card rounded-3xl overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 w-full overflow-hidden bg-brand-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/80 via-transparent to-transparent" />
                  {/* Badge logo officiel en haut à droite de l'image */}
                  <div className="absolute top-3 right-3 w-14 h-11 rounded-xl bg-white/95 p-1.5 shadow-lg flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={PLATFORM_LOGOS[item.id] || "/images/logo-sen-e-carte.png"}
                      alt={item.clientOrDomain}
                      className="w-full h-full object-contain"
                      style={{ outline: "none" }}
                    />
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-brand-950 text-[11px] font-bold shadow">
                      {item.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-400 text-brand-950 text-[10px] font-extrabold shadow">
                      {item.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center shrink-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={PLATFORM_LOGOS[item.id] || "/images/logo-sen-e-carte.png"}
                        alt={item.clientOrDomain}
                        className="w-full h-full object-contain"
                        style={{ outline: "none" }}
                      />
                    </div>
                    <div className="text-xs font-extrabold text-sky-700 leading-tight">{item.clientOrDomain}</div>
                  </div>
                  {item.id === "ecosysteme-btp-sbs-serma" && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      {MAGATTE_NIANG_ENTITY_LOGOS.map((ent) => (
                        <div
                          key={ent.name}
                          title={ent.name}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 border border-slate-200"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={ent.logo}
                            alt={ent.name}
                            className="w-5 h-5 object-contain rounded-xs"
                            style={{ outline: "none" }}
                          />
                          <span className="text-[10px] font-bold text-slate-700">{ent.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <h3 className="text-lg font-extrabold text-slate-950 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>

                  <ul className="space-y-1.5 pt-1">
                    {item.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {item.url ? (
                <div className="px-6 pb-6 pt-4 border-t border-slate-100">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glow-navy w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-white font-bold text-xs"
                  >
                    <span>Visiter le site</span>
                    <ExternalLink className="w-3.5 h-3.5 text-sky-300" />
                  </a>
                </div>
              ) : (
                <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                  <span className="inline-flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Solution déployée sur le terrain</span>
                  </span>
                  <span>Sen-E-Carte</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
