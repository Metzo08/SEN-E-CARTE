import { NextResponse } from "next/server";
import { SOLUTIONS } from "@/data/senecarteData";

interface ProspectLead {
  id: string;
  companyName: string;
  sector: string;
  city: string;
  decisionMakerRole: string;
  score: number;
  painPoint: string;
  recommendedOffer: string;
  estimatedDealFCFA: string;
  whatsappScript: string;
  emailSubject: string;
  emailBody: string;
  linkedinScript: string;
  callPitch: string;
}

const PROSPECT_TEMPLATES: Record<
  string,
  Array<{
    companyPrefix: string;
    sector: string;
    role: string;
    score: number;
    pain: string;
    deal: string;
  }>
> = {
  "carte-sante-ipm-cmu": [
    {
      companyPrefix: "IPM inter-entreprises",
      sector: "Institution de prévoyance maladie (IPM)",
      role: "Gérant(e) d'IPM / directeur administratif",
      score: 95,
      pain: "Carnets papier faciles à falsifier, lenteur de délivrance des lettres de garantie et difficile suivi temps réel des bons pharmacies.",
      deal: "1 500 000 – 4 500 000 FCFA",
    },
    {
      companyPrefix: "Clinique médicale privée",
      sector: "Clinique & polyclinique",
      role: "Directeur médical / administrateur",
      score: 89,
      pain: "Files d'attente à l'accueil, vérification manuelle des droits IPM et suivi papier des carnets de maternité.",
      deal: "1 200 000 – 3 000 000 FCFA",
    },
    {
      companyPrefix: "Programme santé & ONG",
      sector: "ONG santé communautaire",
      role: "Coordinateur programme santé",
      score: 86,
      pain: "Besoin d'identifier rapidement les bénéficiaires et de suivre les carnets de maternité numériques sur le terrain.",
      deal: "2 000 000 – 6 000 000 FCFA",
    },
  ],
  "carte-scolaire-cmu": [
    {
      companyPrefix: "Groupe scolaire & lycée privé",
      sector: "Établissement secondaire",
      role: "Proviseur / directeur des études",
      score: 94,
      pain: "Cartes scolaires papier rapidement abîmées, absence de preuve numérique CMU pour les élèves ≥ 16 ans et contrôle d'accès manuel.",
      deal: "1 050 000 – 3 500 000 FCFA",
    },
    {
      companyPrefix: "Institut supérieur de formation",
      sector: "Enseignement supérieur",
      role: "Secrétaire général / directeur académique",
      score: 91,
      pain: "Besoin de badges NFC durables pour la bibliothèque, les examens et l'identification sécurisée des étudiants.",
      deal: "1 750 000 – 5 000 000 FCFA",
    },
    {
      companyPrefix: "Collège moderne d'excellence",
      sector: "Éducation privée",
      role: "Fondateur / directrice",
      score: 87,
      pain: "Souhaite moderniser son image auprès des parents d'élèves avec pointage présence et cantine sans contact.",
      deal: "750 000 – 2 200 000 FCFA",
    },
  ],
  "carte-visite-nfc": [
    {
      companyPrefix: "Cabinet d'ingénierie / conseil & BTP",
      sector: "Direction & force commerciale",
      role: "Directeur général / directeur commercial",
      score: 92,
      pain: "Réimpressions coûteuses de cartes papier à chaque changement de poste et perte de contacts après les salons.",
      deal: "250 000 – 900 000 FCFA",
    },
    {
      companyPrefix: "Union de GIE & coopérative agricole",
      sector: "GIE / coopérative",
      role: "Président(e) de GIE",
      score: 90,
      pain: "Besoin de cartes membres PVC vérifiables par QR code pour crédibiliser les dossiers auprès des banques et partenaires.",
      deal: "400 000 – 1 600 000 FCFA",
    },
    {
      companyPrefix: "Agence immobilière & promotion",
      sector: "Immobilier",
      role: "Gérant / responsable commercial",
      score: 85,
      pain: "Partage rapide du catalogue de biens et coordonnées WhatsApp en un seul geste lors des visites clients.",
      deal: "180 000 – 600 000 FCFA",
    },
  ],
  "logiciels-metiers-saas": [
    {
      companyPrefix: "ASUFOR & comité de gestion forage",
      sector: "Hydraulique rurale / forages",
      role: "Président ASUFOR / gestionnaire forage",
      score: 96,
      pain: "Facturation d'eau manuelle sur cahiers, écarts de caisse, impayés mal suivis et absence de paiement Wave / Orange Money.",
      deal: "300 000 – 1 200 000 FCFA / an",
    },
    {
      companyPrefix: "Quincaillerie & grossiste matériaux",
      sector: "Distribution & commerce",
      role: "Directeur / responsable stocks",
      score: 91,
      pain: "Ruptures de stock imprévues et besoin de facturation rapide conforme SYSCOHADA (NINEA, TVA 18%).",
      deal: "450 000 – 1 500 000 FCFA",
    },
    {
      companyPrefix: "PME industrielle & services",
      sector: "Gestion RH & carrière",
      role: "Drh / directeur administratif",
      score: 84,
      pain: "Suivi dispersé des congés, carrières et dossiers employés sur fichiers Excel non sécurisés.",
      deal: "600 000 – 1 800 000 FCFA",
    },
  ],
  "developpement-sur-mesure-ia": [
    {
      companyPrefix: "Entreprise BTP & infrastructures",
      sector: "BTP / génie civil",
      role: "Pdg / responsable communication",
      score: 94,
      pain: "Absence de vitrine professionnelle SEO pour remporter les appels d'offres et présenter ses réalisations.",
      deal: "650 000 – 2 500 000 FCFA",
    },
    {
      companyPrefix: "Commerce / boutique multi-points",
      sector: "E-commerce & retail",
      role: "Fondateur / gérant",
      score: 89,
      pain: "Commandes WhatsApp désorganisées, besoin d'un site e-commerce rapide avec paiement Wave & assistant IA 24/7.",
      deal: "450 000 – 1 800 000 FCFA",
    },
    {
      companyPrefix: "Clinique / cabinet spécialisé",
      sector: "Santé & services",
      role: "Directeur de cabinet",
      score: 86,
      pain: "Prise de rendez-vous manuelle au téléphone et faible visibilité sur Google Sénégal.",
      deal: "400 000 – 1 500 000 FCFA",
    },
  ],
  "impressions-equipements": [
    {
      companyPrefix: "Entreprise & institution publique",
      sector: "Administration & corporate",
      role: "Responsable achats / moyens généraux",
      score: 88,
      pain: "Besoin d'un prestataire fiable pour lots de badges PVC/NFC imprimés haute définition et supports de marque.",
      deal: "500 000 – 2 500 000 FCFA",
    },
    {
      companyPrefix: "Organisateur de salons & conférences",
      sector: "Événementiel",
      role: "Chef de projet événementiel",
      score: 85,
      pain: "Badges participants imprimés en urgence avec QR code d'accès et sérigraphie personnalisée.",
      deal: "350 000 – 1 500 000 FCFA",
    },
  ],
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const solutionSlug = String(body.solutionSlug || "carte-sante-ipm-cmu");
    const region = String(body.region || "Dakar");
    const customTarget = String(body.customTarget || "").trim();

    const solution = SOLUTIONS.find((s) => s.slug === solutionSlug) || SOLUTIONS[0];
    const templates = PROSPECT_TEMPLATES[solution.slug] || PROSPECT_TEMPLATES["carte-sante-ipm-cmu"];

    const leads: ProspectLead[] = templates.map((tpl, idx) => {
      const companyName = customTarget
        ? `${customTarget} (${tpl.sector} · ${region})`
        : `${tpl.companyPrefix} — ${region} #${idx + 1}`;

      const whatsappScript = `Bonjour, je suis Ahmed TALL, fondateur de Sen-E-Carte (www.senecarte.com). Nous accompagnons les structures de type ${tpl.sector} à ${region} avec notre solution « ${solution.shortTitle} » pour résoudre : ${tpl.pain.toLowerCase()} Puis-je vous envoyer une courte démo de 2 minutes sur WhatsApp ?`;

      const emailSubject = `[Sen-E-Carte] Solution ${solution.shortTitle} pour ${companyName}`;
      const emailBody = `Bonjour,\n\nJe me permets de vous contacter en tant que fondateur de Sen-E-Carte (https://www.senecarte.com), plateforme sénégalaise spécialisée dans les cartes intelligentes QR-NFC, les logiciels métiers et l'IA.\n\nDe nombreuses structures du secteur « ${tpl.sector} » à ${region} rencontrent aujourd'hui un défi clé : ${tpl.pain}\n\nNotre solution « ${solution.title} » (${solution.priceFrom}) permet d'y répondre concrètement en quelques jours, avec paiement local (Wave / Orange Money) et accompagnement dédié.\n\nSeriez-vous disponible 15 minutes cette semaine pour une démonstration en direct ?\n\nCordialement,\nAhmed TALL\nFondateur — Sen-E-Carte\nTél / WhatsApp : +221 77 602 67 83\nSite : https://www.senecarte.com`;

      const linkedinScript = `Bonjour, j'accompagne les dirigeants du secteur ${tpl.sector} à ${region} via Sen-E-Carte (${solution.shortTitle}). Ravi d'échanger avec vous sur la digitalisation de vos opérations !`;

      const callPitch = `Accroche (15s) : « Bonjour, Ahmed TALL de Sen-E-Carte à Dakar. Nous aidons les ${tpl.sector} à ${region} sur ${solution.shortTitle}. »\nQuestion de qualification : « Comment gérez-vous aujourd'hui ${tpl.pain.slice(0, 90).toLowerCase()}... ? »\nProposition : « Je vous propose une démo de 10 min ou l'envoi d'une carte test gratuite. »`;

      return {
        id: `${solution.slug}-${Date.now()}-${idx}`,
        companyName,
        sector: tpl.sector,
        city: region,
        decisionMakerRole: tpl.role,
        score: tpl.score,
        painPoint: tpl.pain,
        recommendedOffer: `${solution.shortTitle} (${solution.priceFrom})`,
        estimatedDealFCFA: tpl.deal,
        whatsappScript,
        emailSubject,
        emailBody,
        linkedinScript,
        callPitch,
      };
    });

    return NextResponse.json({
      solution: solution.title,
      region,
      generatedAt: new Date().toISOString(),
      leads,
    });
  } catch (err) {
    console.error("Prospection IA error:", err);
    return NextResponse.json(
      { error: "Impossible de générer les prospects pour le moment." },
      { status: 500 }
    );
  }
}
