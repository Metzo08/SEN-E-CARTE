"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HeartPulse,
  GraduationCap,
  Droplets,
  HardHat,
  Building2,
  Home,
  Globe2,
  UtensilsCrossed,
  Sprout,
  Bot,
  Scale,
  CheckCircle2,
  ArrowRight,
  Send,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

interface SectorSolution {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  solutions: string[];
  deliverableBadge: string;
  liveHref?: string;
  liveLabel?: string;
}

const SECTOR_SOLUTIONS: SectorSolution[] = [
  {
    id: "legaltech",
    label: "Avocats & justice",
    title: "Cabinets d'avocats, notaires, huissiers & directions juridiques",
    subtitle:
      "Numérisez vos dossiers papier par OCR intelligent, retrouvez n'importe quelle clause en 2 secondes et éliminez tout risque d'oubli d'audience ou de délai de procédure.",
    image: "/images/illustrations/legaltech-avocat.jpg",
    deliverableBadge: "Déjà déployé · Réf. cabinetmaitreibrahimambengue",
    solutions: [
      "Moteur OCR juridique hybride : transformation des PDF scannés et photos d'actes en dossiers recherchables",
      "Agenda numérique des audiences & procès à venir avec alertes anti-oubli (forclusion, appel, mise en état)",
      "Saisie instantanée des décisions d'audience rattachées automatiquement au dossier client",
      "Recherche profonde (Deep Search) & Assistant IA juridique analysant les conclusions adverses",
      "Sécurité maximale : double authentification 2FA par QR Code, rôles collaborateurs et journal d'audit",
    ],
    liveHref: "/app",
    liveLabel: "Tester la démo LegalTech",
  },
  {
    id: "sante",
    label: "Santé & IPM",
    title: "Santé, IPM, cliniques & pharmacies",
    subtitle:
      "Digitalisation complète du parcours de soins, contrôle anti-fraude tiers-payant et gestion sécurisée des dossiers patients.",
    image: "/images/illustrations/sante-ipm.jpg",
    deliverableBadge: "Déjà déployé · Conformité HIPAA / CDP",
    solutions: [
      "Portail IPM & mutuelles anti-fraude (scan NFC/QR en clinique & pharmacie)",
      "Émission en ligne de lettres de garantie & bons de commande pharmacie",
      "Dossier médical électronique (DME) & carte santé numérique",
      "Carnet de maternité numérique & suivi vaccinal pour cliniques et ONG",
      "Géolocalisation des pharmacies, mutuelles et structures partenaires",
    ],
    liveHref: "/portail-ipm",
    liveLabel: "Tester le portail IPM",
  },
  {
    id: "education",
    label: "Éducation",
    title: "Écoles, lycées, universités & centres de formation",
    subtitle:
      "Automatisez jusqu'à 80 % des tâches administratives scolaires tout en sécurisant l'identité et la couverture santé CMU des élèves.",
    image: "/images/illustrations/scolaire-cmu.jpg",
    deliverableBadge: "Mode hors-ligne · -65 % de délais admin",
    solutions: [
      "Plateforme de gestion scolaire tout-en-un (notes, bulletins, emplois du temps, finances)",
      "Carte scolaire intelligente QR/NFC avec preuve d'enrôlement CMU (≥ 16 ans)",
      "Pointage horodaté des présences & alertes parents en temps réel",
      "Paiement cashless cantine / bibliothèque par tap NFC",
      "Portail parents & classes virtuelles intégrées",
    ],
    liveHref: "/solutions/carte-scolaire-cmu",
    liveLabel: "Voir la solution éducation",
  },
  {
    id: "eau-asufor",
    label: "Eau & forages",
    title: "Forages ruraux (ASUFOR), eau & énergie",
    subtitle:
      "Fiabilisez vos recettes d'eau et éliminez les pertes grâce à la facturation numérique mobile et à l'encaissement Wave / Orange Money.",
    image: "/images/illustrations/eau-asufor.jpg",
    deliverableBadge: "SaaS prêt à déployer · Mobile terrain",
    solutions: [
      "Relevé d'index compteurs sur smartphone (fonctionne sans internet en zone rurale)",
      "Génération automatique des factures d'eau & suivi des impayés",
      "Encaissement Wave / Orange Money avec reçus SMS instantanés",
      "Tableau de bord de trésorerie, volumes pompés et alertes anomalies",
      "Gestion des abonnés, branchements et maintenance des forages",
    ],
    liveHref: "/solutions/logiciels-metiers-saas",
    liveLabel: "Voir les logiciels métiers",
  },
  {
    id: "btp",
    label: "BTP & labos",
    title: "BTP, génie civil & laboratoires géotechniques",
    subtitle:
      "Modernisez la gestion de vos chantiers, sécurisez vos certificats d'essais et automatisez vos devis techniques.",
    image: "/images/illustrations/btp-geotech.jpg",
    deliverableBadge: "Sur-mesure · Certificats QR anti-fraude",
    solutions: [
      "Rapports d'essais sols/béton authentifiés par QR code infalsifiable",
      "Estimateurs de travaux, métrés et chiffrage DQE / BPU en ligne",
      "Suivi d'avancement des chantiers (photos, vidéos, rapports HSE)",
      "Gestion du parc d'engins, approvisionnements et sous-traitants",
      "Portails corporate haute performance avec comparateur avant/après",
    ],
    liveHref: "/app",
    liveLabel: "Explorer l'espace SaaS",
  },
  {
    id: "erp-pme",
    label: "PME & ERP",
    title: "Entreprises, commerce & distribution (SYSCOHADA)",
    subtitle:
      "Pilotez vos ventes, vos stocks multi-entrepôts, votre comptabilité et vos équipes commerciales depuis une seule plateforme cloud.",
    image: "/images/illustrations/saas-erp-ia.jpg",
    deliverableBadge: "Conforme SYSCOHADA · Odoo & Cloud",
    solutions: [
      "Gestion commerciale, devis PDF & facturation SYSCOHADA (NINEA, TVA 18 %, BRS)",
      "Gestion multi-stocks, alertes ruptures et inventaires par scan QR",
      "Modules ERP & CRM Odoo personnalisés selon votre métier",
      "Logiciel RH : paie, congés, gestion de carrière et dossiers employés",
      "Cartes de visite NFC & tableaux de bord de performance commerciale",
    ],
    liveHref: "/app",
    liveLabel: "Voir le catalogue SaaS",
  },
  {
    id: "immobilier",
    label: "Immobilier",
    title: "Agences immobilières, promoteurs & syndics",
    subtitle:
      "Simplifiez la gestion locative, l'encaissement des loyers et la transparence vis-à-vis des propriétaires et locataires.",
    image: "/images/illustrations/mobile-money.jpg",
    deliverableBadge: "Encaissement Wave / Orange Money",
    solutions: [
      "Gestion des biens, baux, appels de loyers et états des lieux",
      "Génération automatique de quittances PDF & envoi WhatsApp / Email",
      "Paiement des loyers par Wave & Orange Money avec rapprochement auto",
      "Portail propriétaire (bilans mensuels) & portail locataire",
      "Suivi des tickets de maintenance, travaux et impayés",
    ],
    liveHref: "/commander",
    liveLabel: "Voir le module Mobile Money",
  },
  {
    id: "ong",
    label: "ONG & social",
    title: "ONG, fondations & programmes à impact public",
    subtitle:
      "Outils de terrain fiables pour recenser, cartographier et suivre vos bénéficiaires avec des indicateurs prêts pour vos bailleurs.",
    image: "/images/illustrations/scolaire-cmu.jpg",
    deliverableBadge: "Référence CNIVE · Fondation Nous Cims",
    solutions: [
      "Plateformes d'identification et de suivi individuel des bénéficiaires vulnérables",
      "Cartographie interactive des zones d'intervention et des acteurs terrain",
      "Collecte de données sensibles (santé, genre, nutrition, éducation)",
      "Tableaux de bord de pilotage et exports automatiques pour bailleurs",
      "Cartes bénéficiaires QR/NFC pour distribution d'aides sans doublon",
    ],
    liveHref: "/a-propos",
    liveLabel: "Voir nos références ONG",
  },
  {
    id: "hotellerie",
    label: "Hôtels & restos",
    title: "Hôtellerie, restauration, commerce & événementiel",
    subtitle:
      "Augmentez votre visibilité locale, fluidifiez l'accueil client et digitalisez vos points de vente sans application à télécharger.",
    image: "/images/illustrations/hotel-resto-nfc.jpg",
    deliverableBadge: "Déploiement rapide · 24 à 72h",
    solutions: [
      "Plaques NFC « Avis Google & Instagram » pour booster votre réputation locale",
      "Menus digitaux QR multilingues avec commande à table et paiement mobile",
      "Cartes de fidélité NFC/QR pour commerces, pharmacies et salons",
      "Badges événements, salons et conférences avec check-in QR ultra-rapide",
      "Sites vitrines & boutiques e-commerce connectés à Wave et Orange Money",
    ],
    liveHref: "/commander",
    liveLabel: "Commander en ligne",
  },
  {
    id: "agritech-gie",
    label: "GIE & agriculture",
    title: "GIE, coopératives agricoles & associations",
    subtitle:
      "Structurez vos membres, sécurisez les cotisations et apportez une traçabilité crédible auprès de vos partenaires financiers.",
    image: "/images/illustrations/agritech-gie.jpg",
    deliverableBadge: "Cartes membres vérifiables QR",
    solutions: [
      "Cartes membres PVC QR/NFC avec vérification publique instantanée d'adhésion",
      "Gestion des cotisations, prêts internes et assemblées générales",
      "Suivi parcellaire, intrants et traçabilité des récoltes agricoles",
      "Annuaire numérique des membres et mise en relation acheteurs",
      "Applications mobiles simples utilisables sur le terrain",
    ],
    liveHref: "/c/gie-niayes-mariama-sagna",
    liveLabel: "Voir une carte GIE live",
  },
  {
    id: "ia-chatbots",
    label: "IA & chatbots",
    title: "Intelligence artificielle, chatbots 24/7 & automatisation",
    subtitle:
      "Automatisez votre accueil client, vos rendez-vous et votre prospection commerciale jour et nuit sur le web, WhatsApp et le téléphone.",
    image: "/images/illustrations/prospection-ia.jpg",
    deliverableBadge: "Certifié AWS · +40 % de leads convertis",
    solutions: [
      "Chatbots IA 24/7 sur site web, WhatsApp et ligne téléphonique à voix naturelle",
      "Agent de prospection autonome réseaux sociaux (LinkedIn, Facebook, X, Web)",
      "Assistants IA métiers spécialisés (santé, juridique, support technique, formation)",
      "Automatisation de workflows (n8n, CRM, emails, factures, relances WhatsApp)",
      "Intégration d'IA générative sur vos documents internes (RAG sécurisé)",
    ],
    liveHref: "/app/prospection-ia",
    liveLabel: "Tester l'agent IA",
  },
];

function getSectorIcon(id: string) {
  switch (id) {
    case "legaltech":
      return <Scale className="w-4 h-4" />;
    case "sante":
      return <HeartPulse className="w-4 h-4" />;
    case "education":
      return <GraduationCap className="w-4 h-4" />;
    case "eau-asufor":
      return <Droplets className="w-4 h-4" />;
    case "btp":
      return <HardHat className="w-4 h-4" />;
    case "erp-pme":
      return <Building2 className="w-4 h-4" />;
    case "immobilier":
      return <Home className="w-4 h-4" />;
    case "ong":
      return <Globe2 className="w-4 h-4" />;
    case "hotellerie":
      return <UtensilsCrossed className="w-4 h-4" />;
    case "agritech-gie":
      return <Sprout className="w-4 h-4" />;
    default:
      return <Bot className="w-4 h-4" />;
  }
}

export default function SectorSolutionsShowcase() {
  const [selectedId, setSelectedId] = useState<string>("sante");
  const active = SECTOR_SOLUTIONS.find((s) => s.id === selectedId) || SECTOR_SOLUTIONS[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-3xl space-y-2">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
            Solutions métiers par secteur d&apos;activité
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Une solution digitale sur-mesure pour chaque métier au Sénégal
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Sélectionnez votre secteur ci-dessous pour découvrir les logiciels, plateformes SaaS, cartes intelligentes
            et automatisations IA que <strong>Sen-E-Carte</strong> Déploie pour votre activité.
          </p>
        </div>
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900 shrink-0"
        >
          <span>Voir les 15 applications SaaS</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Onglets des 10 secteurs métiers */}
      <div className="flex flex-wrap gap-2">
        {SECTOR_SOLUTIONS.map((sec) => {
          const isSelected = sec.id === active.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setSelectedId(sec.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold border transition-all ${
                isSelected
                  ? "bg-brand-950 text-white border-brand-950 shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-sky-400 hover:text-brand-950"
              }`}
            >
              <span className={isSelected ? "text-emerald-400" : "text-sky-600"}>
                {getSectorIcon(sec.id)}
              </span>
              <span>{sec.label}</span>
            </button>
          );
        })}
      </div>

      {/* Panneau détaillé du secteur sélectionné */}
      <div className="bento-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Illustration HD du secteur */}
        <div className="lg:col-span-5 relative min-h-[280px] bg-brand-950 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={active.image}
            alt={active.title}
            className="w-full h-full object-cover"
          />
          <div className="laser-scan-line" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/25 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 space-y-2 text-white">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-brand-950 text-xs font-extrabold shadow">
              {active.deliverableBadge}
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold leading-snug">{active.title}</h3>
          </div>
        </div>

        {/* Liste des solutions métiers livrables */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{active.subtitle}</p>
            <div className="text-xs font-extrabold text-brand-950">
              Exemples de solutions que nous développons pour ce secteur :
            </div>
            <ul className="space-y-2.5">
              {active.solutions.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            {active.liveHref && (
              <Link
                href={active.liveHref}
                className="btn-glow-navy inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-xs sm:text-sm font-extrabold"
              >
                <span>{active.liveLabel}</span>
                <ArrowRight className="w-4 h-4 text-emerald-400" />
              </Link>
            )}
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                `Bonjour Ahmed TALL (Sen-E-Carte), mon organisation évolue dans le secteur « ${active.title} » et souhaite échanger sur vos solutions métiers.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="btn-glow-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-brand-950 text-xs sm:text-sm font-extrabold"
            >
              <Send className="w-4 h-4" />
              <span>Demander une démo pour mon secteur</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
