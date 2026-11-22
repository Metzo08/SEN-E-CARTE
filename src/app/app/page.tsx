"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Plus,
  QrCode,
  ShieldCheck,
  ExternalLink,
  Power,
  Bot,
  CreditCard,
  Layers,
  CheckCircle2,
  Rocket,
  Send,
  ArrowRight,
  Building2,
  HeartPulse,
  GraduationCap,
  Cpu,
  Droplets,
  Store,
} from "lucide-react";
import { INITIAL_DEMO_CARDS, DemoSmartCard, SITE_CONFIG } from "@/data/senecarteData";
import PortfolioRealisationsShowcase from "@/components/PortfolioRealisationsShowcase";

type MaturityFilter = "ALL" | "REALISE" | "PRET" | "SUR_MESURE";
type SectorFilter =
  | "ALL"
  | "Santé & IPM"
  | "Éducation & ONG"
  | "IA & automatisation"
  | "Entreprises & ERP"
  | "Eau, BTP & immobilier"
  | "Commerce & événements";

interface SaaSApplication {
  id: string;
  name: string;
  sector: Exclude<SectorFilter, "ALL">;
  maturity: Exclude<MaturityFilter, "ALL">;
  maturityLabel: string;
  reference?: string;
  summary: string;
  highlights: string[];
  liveHref?: string;
  liveLabel?: string;
  openStudioTab?: boolean;
}

const SAAS_APPLICATIONS: SaaSApplication[] = [
  // 1. DÉJÀ RÉALISÉES & DÉPLOYÉES
  {
    id: "njaboot-dme",
    name: "Carte santé « NJABOOT » & dossier médical électronique",
    sector: "Santé & IPM",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "ANACMU / CMU & ministère de la femme (parem)",
    summary:
      "Carte de santé numérique QR/NFC et dossier médical sécurisé conforme HIPAA/RGPD/CDP : antécédents, allergies, ordonnances et prise en charge rapide.",
    highlights: [
      "Pacte « un million de femmes dans la CMU »",
      "Lettres de garantie & dépôt d'ordonnances en ligne",
      "Accès urgence instantané + contrôle d'accès patient",
    ],
    liveHref: "/portail-ipm",
    liveLabel: "Tester le Portail IPM",
  },
  {
    id: "cnive-nous-cims",
    name: "Plateforme CNIVE — suivi éducatif & impact social",
    sector: "Éducation & ONG",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Fondation Nous Cims (barcelone) · Pikine",
    summary:
      "Plateforme numérique intégrée d'identification des élèves vulnérables, cartographie des bénéficiaires et coordination multi-acteurs terrain.",
    highlights: [
      "Déployée avec ECOPN, EDEN & écoles pies",
      "Cartographie interactive des interventions sociales",
      "Reporting bailleurs & suivi individuel sécurisé",
    ],
  },
  {
    id: "anagmusc-sig",
    name: "Portail ANAGMUSC.com — SIG mutuelles & pharmacies",
    sector: "Santé & IPM",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Union régionale mutuelles Dakar & UNAMUSC",
    summary:
      "Plateforme nationale de géolocalisation des mutuelles de santé communautaires, structures sanitaires et pharmacies partenaires du Sénégal.",
    highlights: [
      "Carte interactive avec filtres par spécialité & itinéraire",
      "Mise en relation directe gérants, pharmacies & assurés",
      "2 applications internes métiers + QR codes dynamiques",
    ],
  },
  {
    id: "portail-ipm-antifraude",
    name: "Portail IPM & tiers-payant anti-fraude NFC/QR",
    sector: "Santé & IPM",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Module live Sen-E-Carte SaaS",
    summary:
      "Vérification des droits assurés en moins de 2 secondes en pharmacie et clinique, détection automatique des doubles scans et émission de lettres de garantie.",
    highlights: [
      "Blocage fraude double-scan & dépassement plafond",
      "Calcul automatique part IPM vs ticket modérateur",
      "Journal temps réel & export PDF certifié QR",
    ],
    liveHref: "/portail-ipm",
    liveLabel: "Ouvrir le portail IPM",
  },
  {
    id: "gestion-scolaire-cmu",
    name: "Suite gestion scolaire tout-en-un & carte CMU",
    sector: "Éducation & ONG",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Présenté à la JICA & établissements pilotes",
    summary:
      "Plateforme complète de la maternelle au lycée (notes, bulletins, présences, finances, classes virtuelles) couplée à la carte scolaire QR/NFC + CMU.",
    highlights: [
      "-65 % de délais administratifs · 80 % tâches automatisées",
      "Double usage : identité scolaire + preuve CMU (≥ 16 ans)",
      "Fonctionne même hors connexion + cantine cashless NFC",
    ],
  },
  {
    id: "sen-assistant-ia-chatbot",
    name: "Sen-assistant-IA-santé & chatbots vocaux 24/7",
    sector: "IA & automatisation",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Certifié AWS language models & prompt engineering",
    summary:
      "Assistants IA intelligents connectés à votre site web, votre WhatsApp et votre ligne téléphonique (voix naturelle) pour qualifier vos clients 24h/24.",
    highlights: [
      "+40 % de leads convertis · -30 % charge support",
      "Prise de rendez-vous & réponses faqs automatiques",
      "Orientation pharmacies, spécialistes & SEN-CSU",
    ],
  },
  {
    id: "agent-prospection-ia",
    name: "Agent prospection IA autonome réseaux sociaux 24/7",
    sector: "IA & automatisation",
    maturity: "REALISE",
    maturityLabel: "Déjà réalisé & déployé",
    reference: "Actif en direct (Brave search + Resend)",
    summary:
      "Moteur autonome qui scanne LinkedIn, Facebook, X, Instagram et le web chaque jour, score les prospects et envoie les opportunités qualifiées par email.",
    highlights: [
      "Veille multi-réseaux automatisée sans intervention",
      "Scoring IA 0–100 & pitch WhatsApp 1-clic généré",
      "Alertes quotidiennes par email vers la direction",
    ],
    liveHref: "/contact",
    liveLabel: "Lancer l'Agent IA",
  },

  // 2. PRÊTES À LANCER (SAAS CLÉ EN MAIN)
  {
    id: "checkout-mobile-money",
    name: "Tunnel commande & paiement Wave / Orange Money",
    sector: "Commerce & événements",
    maturity: "PRET",
    maturityLabel: "Prêt à lancer (SaaS)",
    summary:
      "Module e-commerce complet avec personnalisation de carte en direct, remises volume automatiques (-10 % / -20 %) et encaissement mobile Money.",
    highlights: [
      "Wave Sénégal, Orange Money & Free Money intégrés",
      "Génération de référence & notification email instantanée",
      "Adaptable à toute boutique, école ou mutuelle",
    ],
    liveHref: "/commander",
    liveLabel: "Tester le tunnel Wave/OM",
  },
  {
    id: "asufor-forages",
    name: "Logiciel de gestion & facturation forages (ASUFOR)",
    sector: "Eau, BTP & immobilier",
    maturity: "PRET",
    maturityLabel: "Prêt à lancer (SaaS)",
    summary:
      "Digitalisation complète des forages ruraux et réseaux d'eau : relevé des index compteurs, facturation automatique, suivi des impayés et trésorerie.",
    highlights: [
      "Relevé terrain sur smartphone (mode hors-ligne)",
      "Encaissement Wave / Orange Money & reçus SMS",
      "Tableaux de bord recettes & alertes fuites/impayés",
    ],
  },
  {
    id: "carnet-maternite-ong",
    name: "Carnet de maternité & vaccination numérique (ONG)",
    sector: "Santé & IPM",
    maturity: "PRET",
    maturityLabel: "Prêt à lancer (SaaS)",
    summary:
      "Suivi prénatal, postnatal et calendrier vaccinal centralisé pour ONG, programmes de santé maternelle et cliniques privées.",
    highlights: [
      "Rappels automatiques de consultations cpn/cpon",
      "Supervision sécurisée multi-sites par l'ONG",
      "Statistiques anonymisées pour reporting bailleurs",
    ],
  },
  {
    id: "erp-stocks-syscohada",
    name: "ERP commercial, multi-stocks & facturation SYSCOHADA",
    sector: "Entreprises & ERP",
    maturity: "PRET",
    maturityLabel: "Prêt à lancer (SaaS)",
    summary:
      "Gestion des ventes, achats, stocks multi-entrepôts, devis PDF, factures conformes SYSCOHADA (ninea, TVA 18 %, BRS) et modules Odoo sur-mesure.",
    highlights: [
      "Alertes ruptures de stock & inventaires par QR",
      "Comptabilité conforme UEMOA / Sénégal",
      "Gestion RH : paie, congés & dossiers employés",
    ],
  },
  {
    id: "studio-cartes-nfc-gie",
    name: "Studio cartes pro NFC, membres GIE & plaques avis Google",
    sector: "Commerce & événements",
    maturity: "PRET",
    maturityLabel: "Prêt à lancer (SaaS)",
    summary:
      "Créez et gérez en autonomie des cartes de visite NFC, badges membres GIE/coopératives vérifiables et plaques NFC avis Google pour commerces.",
    highlights: [
      "Mise à jour illimitée sans réimprimer la carte",
      "Statistiques de scans en temps réel par collaborateur",
      "Activation / suspension en 1 clic depuis le cloud",
    ],
    openStudioTab: true,
    liveLabel: "Ouvrir le Studio Cartes",
  },

  // 3. SUR-MESURE PAR SECTEUR (CE QUE NOUS POUVONS DÉVELOPPER)
  {
    id: "btp-labo-geotech",
    name: "Plateformes BTP, génie civil & laboratoires sols/béton",
    sector: "Eau, BTP & immobilier",
    maturity: "SUR_MESURE",
    maturityLabel: "Sur-mesure par secteur",
    summary:
      "Portails institutionnels, gestion de chantiers, certificats d'essais géotechniques vérifiables par QR code, estimateurs dqe/bpu et suivi d'engins.",
    highlights: [
      "Rapports d'essais labo anti-falsification (QR)",
      "Estimateur de travaux & comparateur avant/après",
      "Suivi avancement chantiers photos/vidéos & hse",
    ],
  },
  {
    id: "immobilier-syndics",
    name: "SaaS gestion immobilière, loyers & syndics",
    sector: "Eau, BTP & immobilier",
    maturity: "SUR_MESURE",
    maturityLabel: "Sur-mesure par secteur",
    summary:
      "Gestion complète des biens, baux, appels de loyers, quittances PDF automatiques, relances WhatsApp et suivi des travaux de maintenance.",
    highlights: [
      "Paiement loyers par Wave / Orange Money",
      "Espace propriétaire & espace locataire dédiés",
      "Suivi des impayés & bilans mensuels automatisés",
    ],
  },
  {
    id: "mairies-commerce-transport",
    name: "Solutions collectivités, hôtellerie, restauration & logistique",
    sector: "Commerce & événements",
    maturity: "SUR_MESURE",
    maturityLabel: "Sur-mesure par secteur",
    summary:
      "Menus digitaux QR multilingues, billetterie NFC d'événements, suivi de flotte GPS, portails citoyens pour mairies et applications mobiles android/ios.",
    highlights: [
      "Menus QR & fidélité NFC pour hôtels/restaurants",
      "Check-in rapide & badges salons/conférences",
      "Applications mobiles offline-first flutter / react native",
    ],
  },
];

const SECTORS: SectorFilter[] = [
  "ALL",
  "Santé & IPM",
  "Éducation & ONG",
  "IA & automatisation",
  "Entreprises & ERP",
  "Eau, BTP & immobilier",
  "Commerce & événements",
];

const APP_CUSTOM_IMAGES: Record<string, string> = {
  "asufor-forages": "/images/illustrations/eau-asufor.jpg",
  "btp-labo-geotech": "/images/illustrations/btp-geotech.jpg",
  "immobilier-syndics": "/images/illustrations/mobile-money.jpg",
  "mairies-commerce-transport": "/images/illustrations/hotel-resto-nfc.jpg",
  "studio-cartes-nfc-gie": "/images/illustrations/agritech-gie.jpg",
  "erp-stocks-syscohada": "/images/illustrations/saas-erp-ia.jpg",
  "checkout-mobile-money": "/images/illustrations/mobile-money.jpg",
};

const SECTOR_IMAGES: Record<Exclude<SectorFilter, "ALL">, string> = {
  "Santé & IPM": "/images/illustrations/sante-ipm.jpg",
  "Éducation & ONG": "/images/illustrations/scolaire-cmu.jpg",
  "IA & automatisation": "/images/illustrations/prospection-ia.jpg",
  "Entreprises & ERP": "/images/illustrations/saas-erp-ia.jpg",
  "Eau, BTP & immobilier": "/images/illustrations/eau-asufor.jpg",
  "Commerce & événements": "/images/illustrations/hotel-resto-nfc.jpg",
};

function SectorIcon({ sector }: { sector: Exclude<SectorFilter, "ALL"> }) {
  switch (sector) {
    case "Santé & IPM":
      return <HeartPulse className="w-4 h-4 text-emerald-600" />;
    case "Éducation & ONG":
      return <GraduationCap className="w-4 h-4 text-sky-600" />;
    case "IA & automatisation":
      return <Cpu className="w-4 h-4 text-amber-600" />;
    case "Entreprises & ERP":
      return <Building2 className="w-4 h-4 text-indigo-600" />;
    case "Eau, BTP & immobilier":
      return <Droplets className="w-4 h-4 text-cyan-600" />;
    default:
      return <Store className="w-4 h-4 text-rose-600" />;
  }
}

export default function SaaSStudioPage() {
  const [activeTab, setActiveTab] = useState<"CATALOGUE" | "STUDIO">("CATALOGUE");
  const [maturityFilter, setMaturityFilter] = useState<MaturityFilter>("ALL");
  const [sectorFilter, setSectorFilter] = useState<SectorFilter>("ALL");

  // studio cartes state
  const [cards, setCards] = useState<DemoSmartCard[]>(INITIAL_DEMO_CARDS);
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [phone] = useState("+221 77 ");
  const [cardType, setCardType] = useState<DemoSmartCard["type"]>("business-nfc");

  const filteredApps = SAAS_APPLICATIONS.filter((app) => {
    const matchMat = maturityFilter === "ALL" || app.maturity === maturityFilter;
    const matchSec = sectorFilter === "ALL" || app.sector === sectorFilter;
    return matchMat && matchSec;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !organization.trim()) return;
    const slug = `${fullName}-${organization}`
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const labels: Record<DemoSmartCard["type"], string> = {
      "sante-ipm": "Carte Santé Numérique IPM",
      "scolaire-cmu": "Carte Scolaire + CMU",
      "business-nfc": "Carte Business QR + NFC",
      "membre-gie": "Carte Membre GIE Vérifiée",
    };

    const newCard: DemoSmartCard = {
      slug,
      type: cardType,
      fullName: fullName.trim(),
      role: role.trim() || "Titulaire de carte",
      organization: organization.trim(),
      badgeLabel: labels[cardType],
      status: "ACTIF",
      phone: phone.trim(),
      email: "contact@senecarte.com",
      city: "Dakar, Sénégal",
      idNumber: `SEC-${Math.floor(1000 + Math.random() * 9000)}`,
      extraMeta: [{ label: "Statut", value: "Carte dynamique vérifiée Sen-E-Carte" }],
      scans: 1,
    };
    setCards([newCard, ...cards]);
    setFullName("");
    setOrganization("");
    setRole("");
  };

  const toggleStatus = (slug: string) => {
    setCards(
      cards.map((c) =>
        c.slug === slug ? { ...c, status: c.status === "ACTIF" ? "SUSPENDU" : "ACTIF" } : c
      )
    );
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero Hub SaaS Multi-Secteurs */}
      <section className="bg-brand-950 text-white pt-12 pb-14 border-b border-sky-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(14,165,233,0.22),transparent_45%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-xs font-bold">
                <Layers className="w-3.5 h-3.5" /> Espace SaaS multi-secteurs · Sen-E-Carte
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Toutes nos applications{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                  Réalisées, prêtes à lancer &amp; sur-mesure
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Au-delà des cartes intelligentes QR &amp; NFC, <strong>Sen-E-Carte</strong> Conçoit et déploie des
                plateformes SaaS complètes pour la santé, l&apos;éducation, les ONG, l&apos;eau (ASUFOR), le BTP,
                l&apos;immobilier, le commerce et l&apos;intelligence artificielle.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/portail-ipm"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-xs sm:text-sm"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Portail IPM live</span>
              </Link>
            </div>
          </div>

          {/* Switcher Principal : Catalogue Applications vs Studio Cartes */}
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={() => setActiveTab("CATALOGUE")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all ${
                activeTab === "CATALOGUE"
                  ? "bg-white text-brand-950 shadow-lg"
                  : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15"
              }`}
            >
              <Layers className="w-4 h-4 text-sky-600" />
              <span>Catalogue des Applications SaaS ({SAAS_APPLICATIONS.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("STUDIO")}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-extrabold transition-all ${
                activeTab === "STUDIO"
                  ? "bg-white text-brand-950 shadow-lg"
                  : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15"
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-500" />
              <span>Studio cartes QR + NFC (démo interactive)</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {activeTab === "CATALOGUE" ? (
          <>
            {/* Portefeuille des plateformes réelles & Démo LegalTech Cabinet Maître Ibrahima Mbengue */}
            <PortfolioRealisationsShowcase />

            {/* Filtres Maturité + Secteur */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold tracking-wider text-slate-500 mr-2">
                  Statut :
                </span>
                {[
                  { id: "ALL" as MaturityFilter, label: `Toutes (${SAAS_APPLICATIONS.length})` },
                  {
                    id: "REALISE" as MaturityFilter,
                    label: `Déjà réalisées (${SAAS_APPLICATIONS.filter((a) => a.maturity === "REALISE").length})`,
                  },
                  {
                    id: "PRET" as MaturityFilter,
                    label: `Prêtes à lancer (${SAAS_APPLICATIONS.filter((a) => a.maturity === "PRET").length})`,
                  },
                  {
                    id: "SUR_MESURE" as MaturityFilter,
                    label: `Sur-mesure par secteur (${SAAS_APPLICATIONS.filter((a) => a.maturity === "SUR_MESURE").length})`,
                  },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMaturityFilter(m.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all ${
                      maturityFilter === m.id
                        ? "bg-brand-950 text-white shadow-sm"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-extrabold tracking-wider text-slate-500 mr-2">
                  Secteur :
                </span>
                {SECTORS.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => setSectorFilter(sec)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      sectorFilter === sec
                        ? "bg-sky-50 border-sky-500 text-sky-800"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    {sec === "ALL" ? "Tous les secteurs" : sec}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille des Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="group bento-card rounded-3xl overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-brand-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={APP_CUSTOM_IMAGES[app.id] || SECTOR_IMAGES[app.sector]}
                        alt={app.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-800 bg-white/95 px-2.5 py-1 rounded-full shadow">
                          <SectorIcon sector={app.sector} />
                          {app.sector}
                        </span>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow ${
                            app.maturity === "REALISE"
                              ? "bg-emerald-500 text-brand-950"
                              : app.maturity === "PRET"
                              ? "bg-sky-400 text-brand-950"
                              : "bg-amber-400 text-brand-950"
                          }`}
                        >
                          {app.maturityLabel}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-3">
                      {app.reference && (
                        <div className="text-[11px] font-extrabold text-sky-700">{app.reference}</div>
                      )}

                      <h2 className="text-lg font-extrabold text-slate-950 leading-snug">{app.name}</h2>
                      <p className="text-xs text-slate-600 leading-relaxed">{app.summary}</p>

                      <ul className="space-y-1.5 pt-1">
                        {app.highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
                    {app.openStudioTab ? (
                      <button
                        type="button"
                        onClick={() => setActiveTab("STUDIO")}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-950 hover:bg-sky-900 text-white font-bold text-xs"
                      >
                        <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{app.liveLabel}</span>
                      </button>
                    ) : app.liveHref ? (
                      <Link
                        href={app.liveHref}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-950 hover:bg-sky-900 text-white font-bold text-xs"
                      >
                        <Rocket className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{app.liveLabel}</span>
                      </Link>
                    ) : null}

                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                        `Bonjour Ahmed TALL (Sen-E-Carte), je suis intéressé(e) par l'application SaaS « ${app.name} » (${app.sector}). Pouvons-nous planifier une démonstration ?`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className={`${
                        app.liveHref || app.openStudioTab
                          ? "px-3.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200"
                          : "flex-1 bg-emerald-500 hover:bg-emerald-400 text-brand-950"
                      } inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-extrabold text-xs transition-all`}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{app.liveHref || app.openStudioTab ? "Devis" : "Demander un devis"}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bandeau Projet Sur-Mesure */}
            <div className="rounded-3xl bg-brand-950 text-white p-8 sm:p-10 border border-emerald-500/30 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-emerald-400">
                  Développement SaaS, web, mobile &amp; IA sur-mesure
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  Votre secteur a un besoin spécifique ? Nous concevons votre application de a à z.
                </h2>
                <p className="text-sm text-slate-300">
                  De l&apos;étude du cahier des charges au déploiement cloud sécurisé avec paiements locaux (Wave,
                  Orange Money) et automatisations IA, l&apos;équipe Sen-E-Carte livre des plateformes clés en main.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    "Bonjour Ahmed TALL (Sen-E-Carte), j'ai un projet d'application SaaS / digitale sur-mesure pour mon organisation."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-sm shadow-lg"
                >
                  <span>Discuter de mon projet</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </>
        ) : (
          /* onglet 2 : studio cartes QR + NFC (conservé intact) */
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                  Studio gestionnaire de cartes intelligentes (QR dynamique + NFC)
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Testez la création instantanée, la suspension et la prévisualisation d&apos;une carte dynamique.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleCreate}
              className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-3"
            >
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Type de carte</label>
                <select
                  value={cardType}
                  onChange={(e) => setCardType(e.target.value as DemoSmartCard["type"])}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-bold"
                >
                  <option value="sante-ipm">Santé &amp; IPM</option>
                  <option value="scolaire-cmu">Scolaire + CMU</option>
                  <option value="business-nfc">Business pro NFC</option>
                  <option value="membre-gie">Membre GIE / association</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ex : Awa Diop"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Organisation</label>
                <input
                  type="text"
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Ex : IPM Dakar"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Fonction / classe</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Ex : directrice"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs"
                />
              </div>
              <div className="md:col-span-2 flex items-end">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Créer la carte</span>
                </button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cards.map((card) => (
                <div
                  key={card.slug}
                  className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-5"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-brand-950 via-emerald-950 to-slate-900 text-white p-5 space-y-3 border border-emerald-500/30">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-emerald-400 tracking-wider">{card.badgeLabel}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full ${
                          card.status === "ACTIF"
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-red-500/20 text-red-300"
                        }`}
                      >
                        {card.status === "ACTIF" ? "Actif" : "Suspendu"}
                      </span>
                    </div>
                    <div>
                      <div className="text-lg font-extrabold">{card.fullName}</div>
                      <div className="text-xs text-slate-300">
                        {card.role} · {card.organization}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[11px] text-slate-300">
                      <span>ID : {card.idNumber}</span>
                      <span className="inline-flex items-center gap-1 text-amber-300 font-bold">
                        <QrCode className="w-3.5 h-3.5" /> {card.scans} scans
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="inline-flex items-center gap-1.5 text-slate-600 font-semibold">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>senecarte.com/c/{card.slug}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => toggleStatus(card.slug)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                      >
                        <Power className="w-3.5 h-3.5" />
                        <span>{card.status === "ACTIF" ? "Suspendre" : "Réactiver"}</span>
                      </button>
                      <Link
                        href={`/c/${card.slug}`}
                        className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-brand-950 hover:bg-emerald-900 text-emerald-400 font-bold"
                      >
                        <span>Ouvrir</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
