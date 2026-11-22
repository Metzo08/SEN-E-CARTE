export const SITE_CONFIG = {
  name: "Sen-E-Carte",
  tagline: "L'infrastructure numérique des cartes intelligentes, des logiciels métiers et de l'IA au Sénégal",
  domain: "https://www.senecarte.com",
  email: "contact@senecarte.com",
  phone: "+221 77 602 67 83",
  whatsapp: "221776026783",
  location: "Dakar, Sénégal",
  founder: {
    name: "Ahmed Tall",
    role: "Fondateur & directeur technique — Sen-E-Carte",
    linkedin: "https://www.linkedin.com/in/ahmed-tall-76959887/?locale=fr",
  },
  socials: {
    youtube: "https://www.youtube.com/channel/UC0L_9dd8c3NNP1ISq1avLFw",
    x: "https://x.com/SenECarte",
    linkedin: "https://www.linkedin.com/in/sen-e-carte-049472319/",
    founderLinkedin: "https://www.linkedin.com/in/ahmed-tall-76959887/?locale=fr",
    facebook: "https://www.facebook.com/profile.php?id=61562522274769",
    instagram: "https://www.instagram.com/ecartesene/",
  },
};

export interface SolutionPillar {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  tagline: string;
  isNew?: boolean;
  priceFrom: string;
  targetAudience: string[];
  features: string[];
  seoKeywords: string[];
  useCases: { title: string; desc: string }[];
}

export const SOLUTIONS: SolutionPillar[] = [
  {
    slug: "carte-sante-ipm-cmu",
    badge: "Santé numérique & IPM",
    title: "Carte de santé numérique (QR dynamique + NFC) & portail IPM",
    shortTitle: "Santé & IPM",
    tagline: "Digitalisez les institutions de prévoyance maladie (IPM), cliniques et ONG avec des cartes sécurisées, lettres de garantie en ligne et IA santé.",
    priceFrom: "À partir de 5 000 FCFA / carte",
    targetAudience: ["IPM & Mutuelles de santé", "Cliniques & Hôpitaux privés", "Pharmacies partenaires", "ONG & Programmes Santé Maternelle"],
    features: [
      "QR code dynamique + puce NFC sans contact pour accès instantané aux droits et informations vitales",
      "Demande et validation en ligne des lettres de garantie et bons de commande pharmacie",
      "Carte interactive des structures de santé et pharmacies partenaires",
      "Carnet de maternité numérique & suivi prénatal centralisé",
      "Assistant IA santé pour orientation patient et prévention",
      "Activation / désactivation instantanée en cas de perte ou de fin de contrat"
    ],
    seoKeywords: ["carte de santé numérique Sénégal", "digitalisation IPM Dakar", "lettre de garantie en ligne Sénégal", "carnet de maternité numérique"],
    useCases: [
      { title: "IPM d'entreprise", desc: "Suppression des carnets papier, contrôle anti-fraude par scan QR en clinique et suivi temps réel des dépenses." },
      { title: "Santé maternelle & ONG", desc: "Suivi sécurisé des consultations prénatales et vaccinations même en zone périurbaine." }
    ]
  },
  {
    slug: "carte-scolaire-cmu",
    badge: "Éducation & CMU",
    title: "Carte scolaire intelligente QR-NFC avec intégration CMU",
    shortTitle: "Carte scolaire CMU",
    tagline: "La nouvelle génération d'identité scolaire au Sénégal : justificatif d'inscription, preuve d'enrôlement CMU (élèves ≥ 16 ans) et contrôle d'accès.",
    priceFrom: "À partir de 3 500 FCFA / élève",
    targetAudience: ["Lycées & Collèges privés et publics", "Universités & Instituts supérieurs", "Écoles de formation professionnelle", "Associations de parents d'élèves"],
    features: [
      "Double fonctionnalité académique et sanitaire (preuve d'enrôlement CMU pour élèves ≥ 16 ans)",
      "QR code dynamique donnant accès au profil élève, statut d'inscription et contacts d'urgence",
      "Puce NFC intégrée pour pointage de présence, accès portail, cantine et bibliothèque",
      "Portail direction pour générer des lots de 100 à 10 000 cartes en un clic",
      "Vérification anti-falsification instantanée par simple smartphone"
    ],
    seoKeywords: ["carte scolaire intelligente Sénégal", "carte scolaire CMU Sénégal", "badge NFC école Dakar", "digitalisation école Sénégal"],
    useCases: [
      { title: "Lycées & instituts supérieurs", desc: "Conformité inscription en ligne CMU + contrôle des entrées et sorties avec notification parents." },
      { title: "Gestion cantine & bibliothèque", desc: "Paiement et prêt sans contact par tap NFC sur la carte scolaire." }
    ]
  },
  {
    slug: "carte-visite-nfc",
    badge: "Business & networking",
    title: "Carte de visite intelligente QR + NFC & cartes membres GIE",
    shortTitle: "Cartes NFC & GIE",
    tagline: "Partagez vos coordonnées en un geste et équipez vos dirigeants, équipes commerciales, GIE, coopératives et associations de cartes vérifiables.",
    isNew: true,
    priceFrom: "À partir de 10 000 FCFA / carte",
    targetAudience: ["DG, Cadres & Commerciaux", "GIE & Coopératives agricoles", "Associations & Ordres professionnels", "Événements & Conférences"],
    features: [
      "Partage instantané sans contact (NFC) et par scan (QR dynamique) sans application à installer",
      "Téléchargement vcard 1-clic, liens WhatsApp, LinkedIn, site web et catalogue PDF",
      "Mise à jour illimitée de vos coordonnées en temps réel sans réimprimer la carte",
      "Nouveau : cartes membres GIE / coopératives / associations avec vérification publique d'adhésion",
      "Tableau de bord analytique du nombre de scans et clics générés"
    ],
    seoKeywords: ["carte de visite NFC Dakar", "carte de visite digitale Sénégal", "carte membre GIE Sénégal", "badge QR code événement Dakar"],
    useCases: [
      { title: "Équipes commerciales & dirigeants", desc: "Capture de contacts instantanée en salon professionnel avec statistiques par commercial." },
      { title: "GIE & coopératives", desc: "Enrôlement biométrique/photo des membres avec carte PVC QR vérifiable par les partenaires financiers." }
    ]
  },
  {
    slug: "logiciels-metiers-saas",
    badge: "Logiciels métiers & ERP",
    title: "Logiciels de gestion métiers (forages ASUFOR, stocks SYSCOHADA, RH)",
    shortTitle: "Logiciels métiers",
    tagline: "Des logiciels SaaS conçus pour les réalités opérationnelles du Sénégal : facturation d'eau pour forages, gestion de stocks, RH et immobilier.",
    isNew: true,
    priceFrom: "À partir de 25 000 FCFA / mois",
    targetAudience: ["ASUFOR & Exploitants de forages", "PME, Quincailleries & Grossistes", "Agences immobilières & Syndics", "Directions RH & Entreprises BTP"],
    features: [
      "Logiciel de facturation d'eau pour forages (ASUFOR) : relevé index compteurs, factures, impayés & encaissement Wave/OM",
      "Gestion commerciale, multi-stocks & facturation conforme SYSCOHADA (ninea, TVA 18%, BRS)",
      "Logiciel de gestion de carrière, paie, congés et dossiers employés",
      "Nouveau : gestion immobilière (loyers, quittances PDF automatiques, relances WhatsApp)",
      "Fonctionnement cloud sécurisé avec exports excel / PDF en un clic"
    ],
    seoKeywords: ["logiciel facturation forage Sénégal", "logiciel ASUFOR Sénégal", "logiciel gestion de stock SYSCOHADA Dakar", "logiciel gestion immobilière Sénégal"],
    useCases: [
      { title: "Forages ruraux & ASUFOR", desc: "Relevé des compteurs sur smartphone, édition instantanée des factures d'eau et suivi transparent des recettes." },
      { title: "PME & commerces", desc: "Maîtrise des stocks en temps réel, devis/factures SYSCOHADA et rapprochement caisse Wave/Orange Money." }
    ]
  },
  {
    slug: "developpement-sur-mesure-ia",
    badge: "Solutions digitales & IA",
    title: "Sites web SEO, applications mobiles, assistants IA & automatisations",
    shortTitle: "Web, mobile & IA",
    tagline: "Nous concevons sur mesure vos plateformes web haute performance, applications mobiles, chatbots WhatsApp IA et intégrations Wave / Orange Money.",
    isNew: true,
    priceFrom: "Sur devis (dès 250 000 FCFA)",
    targetAudience: ["Entreprises BTP, Industrie & Services", "Startups & E-commerçants", "Cliniques, Écoles & Institutions", "Cabinets de conseil & Experts"],
    features: [
      "Sites web ultra-rapides optimisés SEO (Next.js) pour apparaître en tête sur Google Sénégal & UEMOA",
      "Applications mobiles android/ios & pwa fonctionnant même en connexion faible",
      "Assistants IA métiers (support client WhatsApp 24/7, qualification de prospects, analyse documentaire)",
      "Automatisations de processus & intégration native Wave business / Orange Money",
      "Tableaux de bord décisionnels, espaces clients sécurisés et maintenance continue"
    ],
    seoKeywords: ["création site web professionnel Dakar", "développement application mobile Sénégal", "assistant IA entreprise Sénégal", "intégration Wave Orange Money API"],
    useCases: [
      { title: "Plateformes sectorielles clé en main", desc: "Écosystèmes web complets avec portail client, catalogue interactif, CRM et assistant IA." },
      { title: "Automatisation commerciale WhatsApp", desc: "Réponse instantanée aux clients 24/7 et génération de devis PDF automatiques." }
    ]
  },
  {
    slug: "impressions-equipements",
    badge: "EXIM BE CENTER",
    title: "Impression cartes PVC/NFC, sérigraphie & équipements informatiques",
    shortTitle: "Impression & matériel",
    tagline: "De la conception digitale à l'objet physique : impression haute définition de cartes PVC/NFC, supports de communication et matériel informatique.",
    priceFrom: "Sur devis volume",
    targetAudience: ["Entreprises & Administrations", "Écoles & Universités", "Événementiel & Agences", "PME en équipement informatique"],
    features: [
      "Impression recto/verso haute définition sur cartes PVC, puces NFC ntag215 et QR codes uniques",
      "Sérigraphie, reprographie et impression sur divers supports publicitaires",
      "Fourniture d'ordinateurs professionnels, lecteurs NFC/QR et imprimantes à cartes",
      "Livraison rapide à Dakar et expédition dans toutes les régions du Sénégal"
    ],
    seoKeywords: ["impression carte PVC Dakar", "carte NFC vierge et imprimée Sénégal", "sérigraphie reprographie Dakar"],
    useCases: [
      { title: "Production de lots de cartes", desc: "Impression et encodage NFC de 50 à 20 000 cartes prêtes à distribuer pour écoles, IPM et GIE." },
      { title: "Pack démarrage bureau", desc: "Postes informatiques, lecteurs de badges et supports de marque personnalisés." }
    ]
  },
];

export const PRICING_PLANS = [
  {
    name: "Plan basique · QR dynamique",
    subtitle: "Cartes de santé numériques, scolaires CMU & GIE",
    price: "5 000 FCFA",
    period: "/ carte QR dynamique · configuration instantanée",
    highlight: false,
    features: [
      "Carte numérique avec QR code dynamique modifiable à vie",
      "Accès au carnet virtuel sécurisé (lecture bénéficiaire / écriture pro)",
      "Lettres de garantie & bons de commande en ligne (photo d'ordonnance)",
      "Géolocalisation des structures de santé & pharmacies partenaires",
      "Support client réactif & satisfait ou remboursé"
    ],
    cta: "Commander le plan basique",
  },
  {
    name: "Plan avancé · carte NFC",
    subtitle: "IPM, ONG, écoles & carnets de maternité",
    price: "10 000 FCFA",
    period: "/ carte NFC · tarif dégressif volume",
    highlight: true,
    features: [
      "Toutes les fonctionnalités du plan basique + puce NFC sans contact",
      "Carnets de maternité numériques pour femmes enceintes (ONG / cliniques)",
      "Gestion centralisée des dossiers & mise à jour en temps réel",
      "Formation initiale du personnel médical / administratif incluse",
      "Support prioritaire par téléphone & WhatsApp"
    ],
    cta: "Choisir le plan avancé NFC",
  },
  {
    name: "Plan premium · hybride QR + NFC & SaaS",
    subtitle: "Institutions, emr/hms, analytics",
    price: "15 000 FCFA",
    period: "/ carte hybride QR + NFC (ou forfait SaaS sur mesure)",
    highlight: false,
    features: [
      "Personnalisation avancée selon sexe, pathologie & accès urgence",
      "Intégration emr, hms, télémédecine & systèmes existants",
      "Rapports analytiques détaillés des scans & double authentification HIPAA/CDP",
      "Gestionnaire de compte vip & webinaires mensuels de formation",
      "Accès aux solutions sur mesure Sen-E-Carte (forages ASUFOR, ERP, sites web & IA)"
    ],
    cta: "Contacter la direction technique",
  },
];

export interface DemoSmartCard {
  slug: string;
  type: "sante-ipm" | "scolaire-cmu" | "business-nfc" | "membre-gie";
  fullName: string;
  role: string;
  organization: string;
  badgeLabel: string;
  status: "ACTIF" | "SUSPENDU";
  phone: string;
  email: string;
  city: string;
  idNumber: string;
  extraMeta: { label: string; value: string }[];
  scans: number;
}

export const INITIAL_DEMO_CARDS: DemoSmartCard[] = [
  {
    slug: "ahmed-tall-senecarte",
    type: "business-nfc",
    fullName: "Ahmed TALL",
    role: "Fondateur & directeur technique",
    organization: "Sen-E-Carte Sénégal",
    badgeLabel: "Carte Business QR + NFC",
    status: "ACTIF",
    phone: "+221 77 602 67 83",
    email: "contact@senecarte.com",
    city: "Dakar, Sénégal",
    idNumber: "SEC-PRO-0001",
    extraMeta: [
      { label: "Site web", value: "https://www.senecarte.com" },
      { label: "LinkedIn", value: "linkedin.com/in/ahmed-tall-76959887" },
      { label: "Expertise", value: "SaaS, Cartes NFC/QR, IA & Digitalisation" }
    ],
    scans: 184,
  },
  {
    slug: "ipm-dakar-fatou-ndiaye",
    type: "sante-ipm",
    fullName: "Fatou NDIAYE",
    role: "Adhérente principale · couverture 80%",
    organization: "IPM horizon santé Dakar",
    badgeLabel: "Carte Santé Numérique IPM",
    status: "ACTIF",
    phone: "+221 77 000 11 22",
    email: "adherents@ipm-horizon.sn",
    city: "Dakar Plateau, Sénégal",
    idNumber: "IPM-2026-0482",
    extraMeta: [
      { label: "Groupe sanguin", value: "O+" },
      { label: "Droits tiers-payant", value: "Valide · Lettres de garantie actives" },
      { label: "Contact urgence", value: "Mamadou NDIAYE (+221 77 000 33 44)" }
    ],
    scans: 42,
  },
  {
    slug: "lycee-dakar-ibrahima-diallo",
    type: "scolaire-cmu",
    fullName: "Ibrahima DIALLO",
    role: "Élève · terminale s1",
    organization: "Lycée moderne d'excellence Dakar",
    badgeLabel: "Carte Scolaire + CMU",
    status: "ACTIF",
    phone: "+221 76 000 55 66",
    email: "scolarite@lycee-excellence.sn",
    city: "Dakar, Sénégal",
    idNumber: "EDU-CMU-2026-119",
    extraMeta: [
      { label: "Statut CMU (≥ 16 ans)", value: "Enrôlé & Vérifié (Année 2026-2027)" },
      { label: "Accès campus NFC", value: "Autorisé · Cantine & Bibliothèque" },
      { label: "Tuteur légal", value: "Ousmane DIALLO (+221 77 000 77 88)" }
    ],
    scans: 67,
  },
  {
    slug: "gie-niayes-mariama-sagna",
    type: "membre-gie",
    fullName: "Mariama SAGNA",
    role: "Présidente de coopérative",
    organization: "GIE femmes agro-écologiques des Niayes",
    badgeLabel: "Carte Membre GIE Vérifiée",
    status: "ACTIF",
    phone: "+221 78 000 99 00",
    email: "contact@gie-niayes.sn",
    city: "Niayes, Sénégal",
    idNumber: "GIE-2026-0094",
    extraMeta: [
      { label: "Cotisation 2026", value: "À jour · Membre certifié" },
      { label: "Filière", value: "Maraîchage & Transformation locale" },
      { label: "Vérification", value: "QR Anti-Fraude Sen-E-Carte" }
    ],
    scans: 29,
  },
];

export const SEO_ARTICLES = [
  {
    slug: "digitalisation-ipm-senegal-carte-sante-qr-nfc",
    category: "Santé numérique",
    readTime: "4 min",
    date: "Novembre 2026",
    title: "Digitalisation des IPM au Sénégal : comment la carte santé QR + NFC élimine la fraude et accélère les lettres de garantie",
    excerpt: "Découvrez comment les institutions de prévoyance maladie réduisent de 60 % leurs délais de prise en charge grâce aux cartes dynamiques sen-e-carte.",
  },
  {
    slug: "carte-scolaire-intelligente-integration-cmu-senegal",
    category: "Éducation & CMU",
    readTime: "3 min",
    date: "Novembre 2026",
    title: "Carte scolaire intelligente avec intégration CMU : répondre aux exigences d'inscription des élèves de 16 ans et plus",
    excerpt: "Un seul badge PVC sécurisé pour l'identification scolaire, le contrôle d'accès NFC et la preuve d'enrôlement à la couverture maladie universelle.",
  },
  {
    slug: "logiciel-facturation-eau-forage-asufor-senegal",
    category: "Logiciels métiers",
    readTime: "4 min",
    date: "Novembre 2026",
    title: "Gestion des forages ruraux (ASUFOR) : automatiser le relevé de compteurs et la facturation d'eau par Wave & Orange Money",
    excerpt: "Fini les cahiers papier et les pertes de recettes : comment un logiciel SaaS dédié fiabilise la trésorerie des gestionnaires d'eau au Sénégal.",
  },
  {
    slug: "carte-de-visite-nfc-dakar-networking-entreprises",
    category: "Business & IA",
    readTime: "3 min",
    date: "Novembre 2026",
    title: "Carte de visite NFC à Dakar : pourquoi les dirigeants et commerciaux abandonnent le papier au profit du QR dynamique",
    excerpt: "Partage de contact en 1 seconde, mise à jour en temps réel et suivi ROI des rencontres professionnelles pour vos équipes.",
  },
];


export const INSTITUTIONAL_PARTNERS = [
  {
    name: "Fondation Nous Cims (barcelone)",
    logo: "/images/logos/logo-nous-cims.png",
    scope: "Plateforme CNIVE · éducation & impact social à Pikine",
    detail: "Écoles pilotes ECOPN, EDEN & écoles pies avec le groupe thématique éducation de Pikine",
  },
  {
    name: "JICA (coopération japonaise)",
    logo: "/images/logos/logo-jica.png",
    scope: "CSU Afrique · rencontre Dakar (11 juin 2025)",
    detail: "Présentation carte santé QR dynamique & carte scolaire sanitaire auprès de Mme Miki Matsuô",
  },
  {
    name: "Transform Health & ENDA santé",
    logo: "/images/logos/logo-transform-health.svg",
    scope: "Plaidoyer loi sur la santé numérique au Sénégal",
    detail: "Consultant stratégique pour la cartographie des parties prenantes et le guide d'adoption législative",
  },
  {
    name: "ANACMU / SEN-CSU",
    logo: "/images/logos/logo-anacmu-sencsu.png",
    scope: "Carte de santé numérique « NJABOOT »",
    detail: "Couverture maladie universelle : dossiers médicaux, lettres de garantie & ordonnances en ligne",
  },
  {
    name: "Ministère de la femme (parem)",
    logo: "/images/logos/logo-ministere-femme.png",
    scope: "Pacte « un million de femmes dans la CMU »",
    detail: "Déploiement de la carte santé numérique NJABOOT auprès des femmes et ménages bénéficiaires",
  },
  {
    name: "UNAMUSC Sénégal",
    logo: "/images/logos/logo-unamusc.png",
    scope: "Plateforme ANAGMUSC.com & mutuelles",
    detail: "Union nationale des mutuelles de santé communautaires : géolocalisation nationale des mutuelles",
  },
  {
    name: "UDMSDK · mutuelles de Dakar",
    logo: "/images/logos/logo-udmsdk.png",
    scope: "Union départementale des mutuelles de Dakar",
    detail: "Digitalisation des mutuelles de santé communautaires de Dakar et co-présentation JICA",
  },
  {
    name: "INSPIR Sénégal",
    logo: "/images/logos/logo-inspir-senegal.jpg",
    scope: "Réseau national protection sociale (47 membres)",
    detail: "Plateforme institutionnelle, pétitions citoyennes (3 842+ signatures) et portail des organisations",
  },
  {
    name: "Ferme agroécologique des Niayes",
    logo: "/images/logos/logo-ferme-niayes.jpeg",
    scope: "Plateforme agritech & terroir (fermesdesniayes.com)",
    detail: "Valorisation, traçabilité des récoltes et commande en ligne des productions agroécologiques",
  },
  {
    name: "Dada studio coaching",
    logo: "/images/logos/logo-dadastudio.png",
    scope: "Conseil en image & coaching (dadastudio-coaching.com)",
    detail: "Plateforme digitale de coaching en image, colorimétrie, ateliers entreprises et réservation en ligne",
  },
  {
    name: "Cabinet maître Ibrahima Mbengue",
    logo: "/images/logos/logo-legaldoc-mbengue.png",
    scope: "Legaltech · OCR dossiers & agenda des audiences",
    detail: "Numérisation OCR des dossiers juridiques, recherche profonde IA et calendrier anti-oubli des procès",
  },
  {
    name: "Coopérative & GIE Mariama Sagna",
    logo: "/images/logos/logo-gie-mariama-sagna.png",
    scope: "Cartes membres GIE & habitat social",
    detail: "Enrôlement numérique et cartes PVC QR/NFC infalsifiables pour la coopérative d'habitat social Mariama Sagna",
  },
  {
    name: "IPM Tostan & réseau IPM",
    logo: "/images/logos/logo-ipm-tostan.png",
    scope: "Digitalisation des institutions de prévoyance maladie",
    detail: "Gestion des bénéficiaires, prestataires conventionnés, lettres de garantie et tiers-payant",
  },
  {
    name: "SB-S group (stein bauer Sénégal)",
    logo: "/images/logos/logo-sbs-group.jpg",
    scope: "Contractant général & grands travaux",
    detail: "Plateforme institutionnelle BTP, génie civil minier, silos, ports et bâtiments R+7",
  },
  {
    name: "SERMA BTP · bureau d'études",
    logo: "/images/logos/logo-serma-btp.jpg",
    scope: "Ingénierie, bim 3D & maîtrise d'Œuvre",
    detail: "Plateforme d'études techniques, modélisation bim 3D, comparateur réhabilitation et devis",
  },
  {
    name: "SB-S labo (agréé LNR-BTP C2/A3)",
    logo: "/images/logos/logo-sbs-labo.png",
    scope: "Laboratoire géotechnique sols & béton",
    detail: "Digitalisation des essais géotechniques, certificats officiels et présentation vidéo en wolof",
  },
  {
    name: "SB-S industrie · préfabrication & bpe",
    logo: "/images/logos/logo-sbs-industries.png",
    scope: "ERP usine agglos, pavés & béton prêt à l'emploi",
    detail: "ERP web connecté : calcul de prix de revient, seuils de rentabilité et catalogue public",
  },
  {
    name: "SB-S logistik · parc 71+ engins",
    logo: "/images/logos/logo-sbs-logistik.png",
    scope: "Location d'engins BTP & paiement en ligne",
    detail: "Workflow complet : expression de besoin, devis, facture, suivi sav et paiement Wave / OM",
  },
  {
    name: "P2M showroom & PGT international",
    logo: "/images/logos/logo-p2m.jpg",
    scope: "Carrelage, sanitaire & sourcing international",
    detail: "Showroom digital organisé par blocs métiers, calculateur de surfaces et négoce international",
  },
];

export const FOUNDER_ACHIEVEMENTS = [
  {
    period: "2026 · impact public & éducation",
    partner: "Fondation Nous Cims (Barcelone)",
    logo: "/images/logos/logo-nous-cims.png",
    title: "Conception & déploiement de la plateforme CNIVE à Pikine",
    description:
      "Identification des élèves vulnérables, cartographie des bénéficiaires et coordination entre les écoles pilotes (ECOPN, EDEN, écoles pies) et le groupe thématique éducation de Pikine.",
    tag: "EdTech & Impact Social",
  },
  {
    period: "Juin 2025 · coopération internationale",
    partner: "JICA & Union Départementale des Mutuelles de Dakar",
    logo: "/images/logos/logo-jica.png",
    title: "Présentation CSU Afrique à earth & human corporation (JICA)",
    description:
      "Présentation de la carte de santé numérique QR dynamique et de la carte scolaire sanitaire pour la collecte de données sensibles (genre, vieillissement) dans le cadre de la CSU en Afrique.",
    tag: "CSU & Santé Publique",
  },
  {
    period: "2025 · plaidoyer & stratégie nationale",
    partner: "Coalition Transform Health via ENDA Santé",
    logo: "/images/logos/logo-transform-health.svg",
    title: "Consultant plaidoyer — loi sur la santé numérique au Sénégal",
    description:
      "Élaboration d'arguments de plaidoyer, cartographie des parties prenantes clés et guide stratégique pour l'adoption et la mise en œuvre rapides de la loi sur la santé numérique.",
    tag: "Politique e-Santé",
  },
  {
    period: "2023 – 2024 · santé numérique & CMU",
    partner: "ANACMU & Ministère de la Femme (Programme PAREM)",
    logo: "/images/logos/logo-anacmu-sencsu.png",
    title: "Créateur de la carte de santé numérique « NJABOOT »",
    description:
      "Conception de la carte santé électronique NJABOOT (pacte « un million de femmes dans la CMU »), lettres de garantie en ligne, bons de commande et dépôt d'ordonnances pour vérification.",
    tag: "HealthTech · HIPAA/RGPD",
  },
  {
    period: "2022 – 2023 · mutuelles communautaires",
    partner: "Union Régionale des Mutuelles de Dakar & UNAMUSC",
    logo: "/images/logos/logo-unamusc.png",
    title: "Responsable digitalisation & plateforme ANAGMUSC.com",
    description:
      "Mise en ligne d'anagmusc.com pour géolocaliser toutes les mutuelles de santé, structures sanitaires et pharmacies du Sénégal, accompagnée de deux applications internes et de QR codes dynamiques.",
    tag: "Mutuelles & SIG Santé",
  },
  {
    period: "2024 – 2026 · intelligence artificielle & SaaS",
    partner: "Sen-E-Carte · Innovation IA",
    logo: "/images/logo-sen-e-carte.png",
    title: "Sen-assistant-IA-santé, chatbots vocaux 24/7 & gestion scolaire",
    description:
      "Déploiement d'assistants IA (web, WhatsApp, ligne téléphonique vocale : +40 % de leads convertis, -30 % de charge support) et d'une suite de gestion scolaire tout-en-un (-65 % de délais administratifs, mode hors-ligne).",
    tag: "IA Générative & SaaS",
  },
];

export const FOUNDER_CERTIFICATIONS = [
  {
    title: "Building language models on AWS",
    issuer: "Amazon web services (AWS)",
    logo: "/images/logos/logo-aws.svg",
    date: "Déc. 2024",
    credentialId: "ID: E-VP58DQ",
  },
  {
    title: "Foundations of prompt engineering (français)",
    issuer: "Amazon web services (AWS)",
    logo: "/images/logos/logo-aws.svg",
    date: "Déc. 2024",
    credentialId: "ID: E-VD45E9",
  },
  {
    title: "Initiation au vocabulaire de l'intelligence artificielle",
    issuer: "Université TÉLUQ (canada)",
    logo: "/images/logos/logo-teluq.svg",
    date: "2024",
    credentialId: "Attestation officielle",
  },
  {
    title: "Odoo, gestion de projet agile, SEO & modélisation 3D revit",
    issuer: "Certifications professionnelles (18 licences)",
    logo: "/images/logo-sen-e-carte.png",
    date: "2020 – 2024",
    credentialId: "Full-Stack & ERP",
  },
];


export const SOLUTION_IMAGES: Record<string, string> = {
  "carte-sante-ipm-cmu": "/images/illustrations/sante-ipm.jpg",
  "carte-scolaire-cmu": "/images/illustrations/scolaire-cmu.jpg",
  "carte-visite-nfc": "/images/illustrations/business-nfc.jpg",
  "logiciels-metiers-saas": "/images/illustrations/saas-erp-ia.jpg",
  "developpement-sur-mesure-ia": "/images/illustrations/prospection-ia.jpg",
  "impression-materiel-nfc": "/images/illustrations/mobile-money.jpg",
};
