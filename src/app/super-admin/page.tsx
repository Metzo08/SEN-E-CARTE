"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  LogOut,
  LayoutDashboard,
  Bot,
  FileText,
  FileSignature,
  Compass,
  Send,
  MessageCircle,
  CheckCircle2,
  XCircle,
  Plus,
  Printer,
  RefreshCw,
  TrendingUp,
  Clock,
  AlertTriangle,
  ArrowRight,
  Trash2,
} from "lucide-react";
import { SITE_CONFIG, SOLUTIONS } from "@/data/senecarteData";
import SuperAdminAgentsConsole from "@/components/SuperAdminAgentsConsole";

type AdminTab = "dashboard" | "prospection" | "agents" | "factures" | "contrats" | "veille";

interface ProspectItem {
  id: string;
  companyName: string;
  contactRole: string;
  sector: string;
  city: string;
  score: number;
  emailTo: string;
  whatsappTo: string;
  emailSubject: string;
  emailDraft: string;
  whatsappDraft: string;
  status: "EN_ATTENTE" | "EMAIL_ENVOYE" | "WHATSAPP_ENVOYE" | "REJETE";
  lastNote?: string;
}

interface BillingDoc {
  id: string;
  ref: string;
  kind: "DEVIS" | "FACTURE";
  clientName: string;
  description: string;
  amountHt: number;
  applyTva: boolean;
  paymentMethod: "Wave" | "Orange Money" | "Virement bancaire";
  status: "Brouillon" | "Envoyé" | "Payé" | "En retard";
  date: string;
}

interface ClientContract {
  id: string;
  clientName: string;
  title: string;
  category: string;
  amountFcfa: number;
  billingCycle: "Mensuel" | "Annuel" | "Forfait";
  startDate: string;
  endDate: string;
  status: "Actif" | "À renouveler" | "En signature" | "Clôturé";
}

const DEFAULT_PIN = process.env.NEXT_PUBLIC_SUPER_ADMIN_PIN || "2026";

const INITIAL_PROSPECTS: ProspectItem[] = [
  {
    id: "pr-1",
    companyName: "Cabinet d'avocats Dakar Plateau",
    contactRole: "Associé gérant",
    sector: "LegalTech & justice",
    city: "Dakar",
    score: 94,
    emailTo: "ahmedtall08@gmail.com",
    whatsappTo: "221776026783",
    emailSubject: "Digitalisation OCR & agenda des audiences — Sen-E-Carte",
    emailDraft:
      "Bonjour Maître,\n\nSuite à notre déploiement réussi pour le Cabinet Maître Ibrahima Mbengue, Sen-E-Carte propose aux cabinets d'avocats du Sénégal une plateforme dédiée combinant numérisation OCR instantanée des dossiers et agenda numérique des audiences avec alertes anti-oubli.\n\nSeriez-vous disponible 15 minutes cette semaine pour une présentation rapide ?\n\nCordialement,\nAhmed Tall — Sen-E-Carte",
    whatsappDraft:
      "Bonjour Maître, c'est Ahmed Tall de Sen-E-Carte. Nous avons développé une plateforme OCR + agenda d'audiences anti-oubli pour les cabinets d'avocats au Sénégal (déjà déployée au Cabinet Maître Ibrahima Mbengue). Puis-je vous présenter la solution en 5 minutes ?",
    status: "EN_ATTENTE",
  },
  {
    id: "pr-2",
    companyName: "IPM Inter-Entreprises Almadies",
    contactRole: "Gérant d'IPM",
    sector: "Santé & IPM",
    city: "Dakar",
    score: 91,
    emailTo: "ahmedtall08@gmail.com",
    whatsappTo: "221776026783",
    emailSubject: "Cartes santé QR-NFC & portail anti-fraude pour votre IPM",
    emailDraft:
      "Bonjour,\n\nSen-E-Carte équipe les IPM et mutuelles de santé au Sénégal avec des cartes QR dynamiques & NFC permettant de vérifier les droits en 1 seconde, d'émettre des lettres de garantie en ligne et d'éliminer les doublons de prise en charge.\n\nNous serions ravis de vous faire une démonstration sur votre cas concret.\n\nBien cordialement,\nAhmed Tall — Sen-E-Carte",
    whatsappDraft:
      "Bonjour, c'est Ahmed Tall de Sen-E-Carte. Nous aidons les IPM et mutuelles au Sénégal à sécuriser leurs prises en charge (cartes QR/NFC + lettres de garantie instantanées). Souhaitez-vous voir notre portail IPM en direct ?",
    status: "EN_ATTENTE",
  },
];

const INITIAL_BILLING: BillingDoc[] = [
  {
    id: "doc-1",
    ref: "FAC-2026-041",
    kind: "FACTURE",
    clientName: "Cabinet Maître Ibrahima Mbengue",
    description: "Plateforme LegalTech OCR dossiers & agenda des audiences",
    amountHt: 1500000,
    applyTva: true,
    paymentMethod: "Virement bancaire",
    status: "Payé",
    date: "2026-11-10",
  },
  {
    id: "doc-2",
    ref: "DEV-2026-088",
    kind: "DEVIS",
    clientName: "IPM Tostan & partenaires santé",
    description: "Lot de 250 cartes santé hybrides QR + NFC & portail tiers-payant",
    amountHt: 2250000,
    applyTva: true,
    paymentMethod: "Wave",
    status: "Envoyé",
    date: "2026-11-18",
  },
  {
    id: "doc-3",
    ref: "FAC-2026-044",
    kind: "FACTURE",
    clientName: "Coopérative Mariama Sagna",
    description: "Cartes membres QR dynamique + automatisations WhatsApp",
    amountHt: 450000,
    applyTva: false,
    paymentMethod: "Orange Money",
    status: "Payé",
    date: "2026-11-15",
  },
];

const INITIAL_CONTRACTS: ClientContract[] = [
  {
    id: "ctr-1",
    clientName: "Cabinet Maître Ibrahima Mbengue",
    title: "Hébergement sécurisé, OCR & support LegalTech",
    category: "LegalTech SaaS",
    amountFcfa: 150000,
    billingCycle: "Mensuel",
    startDate: "2026-01-15",
    endDate: "2027-01-15",
    status: "Actif",
  },
  {
    id: "ctr-2",
    clientName: "Écosystème Magatte Niang (7 entités BTP)",
    title: "Maintenance portails web, ERP & support technique",
    category: "BTP & industrie",
    amountFcfa: 1800000,
    billingCycle: "Annuel",
    startDate: "2025-12-01",
    endDate: "2026-12-01",
    status: "À renouveler",
  },
  {
    id: "ctr-3",
    clientName: "SenMutuelles / UDMSDK",
    title: "Déploiement cartes santé numériques & suivi CSU",
    category: "Santé & mutuelles",
    amountFcfa: 2400000,
    billingCycle: "Annuel",
    startDate: "2026-06-01",
    endDate: "2027-06-01",
    status: "Actif",
  },
  {
    id: "ctr-4",
    clientName: "Fermes agroécologiques des Niayes",
    title: "Plateforme web, vitrine produits & accompagnement digital",
    category: "AgriTech",
    amountFcfa: 600000,
    billingCycle: "Annuel",
    startDate: "2026-03-01",
    endDate: "2027-03-01",
    status: "Actif",
  },
];

const AGENT_REACH_OPPORTUNITIES = [
  {
    title: "Pack LegalTech avocats & huissiers du Sénégal",
    segment: "600+ cabinets d'avocats et études notariales",
    solutionSlug: "developpement-sur-mesure-ia",
    potential: "1 500 000 FCFA / déploiement + maintenance",
    insight:
      "Forte demande pour la numérisation OCR des dossiers papier et les alertes d'audiences anti-forclusion.",
  },
  {
    title: "Pass santé IPM & mutuelles communautaires",
    segment: "IPM d'entreprises, cliniques privées & pharmacies",
    solutionSlug: "carte-sante-ipm-cmu",
    potential: "10 000 FCFA / carte + abonnement portail",
    insight:
      "Les IPM recherchent activement des solutions anti-fraude instantanées sans application lourde à installer.",
  },
  {
    title: "Gestion scolaire tout-en-un + recouvrement Wave/OM",
    segment: "Écoles privées, lycées & instituts supérieurs",
    solutionSlug: "carte-scolaire-cmu",
    potential: "5 000 FCFA / élève + module gestion",
    insight:
      "Réduction des impayés de scolarité grâce aux rappels WhatsApp automatisés et au paiement Mobile Money.",
  },
  {
    title: "ERP stocks & facturation SYSCOHADA pour PME",
    segment: "Quincailleries, distributeurs, PME & groupes BTP",
    solutionSlug: "logiciels-metiers-saas",
    potential: "85 000 FCFA / mois",
    insight:
      "Besoin urgent d'outils simples en FCFA avec TVA 18 %, BRS 5 % et suivi de caisse multi-boutiques.",
  },
];

function formatFcfa(val: number): string {
  return `${Math.round(val).toLocaleString("fr-FR")} FCFA`;
}

export default function SuperAdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");

  // Prospection state
  const [prospects, setProspects] = useState<ProspectItem[]>(INITIAL_PROSPECTS);
  const [selectedSolution, setSelectedSolution] = useState(SOLUTIONS[0].slug);
  const [selectedCity, setSelectedCity] = useState("Dakar");
  const [isSearching, setIsSearching] = useState(false);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Billing (Factures & Devis) state
  const [billingDocs, setBillingDocs] = useState<BillingDoc[]>(INITIAL_BILLING);
  const [billingFilter, setBillingFilter] = useState<"TOUS" | "DEVIS" | "FACTURE">("TOUS");
  const [newDocKind, setNewDocKind] = useState<"DEVIS" | "FACTURE">("DEVIS");
  const [newDocClient, setNewDocClient] = useState("");
  const [newDocDesc, setNewDocDesc] = useState("");
  const [newDocAmount, setNewDocAmount] = useState(250000);
  const [newDocTva, setNewDocTva] = useState(true);
  const [newDocPay, setNewDocPay] = useState<"Wave" | "Orange Money" | "Virement bancaire">("Wave");
  const [printDoc, setPrintDoc] = useState<BillingDoc | null>(null);

  // Contracts state
  const [contracts, setContracts] = useState<ClientContract[]>(INITIAL_CONTRACTS);
  const [newCtrClient, setNewCtrClient] = useState("");
  const [newCtrTitle, setNewCtrTitle] = useState("");
  const [newCtrCat, setNewCtrCat] = useState("SaaS & cartes NFC");
  const [newCtrAmount, setNewCtrAmount] = useState(600000);
  const [newCtrCycle, setNewCtrCycle] = useState<"Mensuel" | "Annuel" | "Forfait">("Annuel");
  const [newCtrStart, setNewCtrStart] = useState("2026-11-22");
  const [newCtrEnd, setNewCtrEnd] = useState("2027-11-22");

  // Restore session & persisted data
  useEffect(() => {
    try {
      if (sessionStorage.getItem("senecarte_super_admin_ok") === "1") {
        setAuthenticated(true);
      }
      const savedP = localStorage.getItem("senecarte_sa_prospects");
      if (savedP) setProspects(JSON.parse(savedP));
      const savedB = localStorage.getItem("senecarte_sa_billing");
      if (savedB) setBillingDocs(JSON.parse(savedB));
      const savedC = localStorage.getItem("senecarte_sa_contracts");
      if (savedC) setContracts(JSON.parse(savedC));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("senecarte_sa_prospects", JSON.stringify(prospects));
    } catch {}
  }, [prospects]);

  useEffect(() => {
    try {
      localStorage.setItem("senecarte_sa_billing", JSON.stringify(billingDocs));
    } catch {}
  }, [billingDocs]);

  useEffect(() => {
    try {
      localStorage.setItem("senecarte_sa_contracts", JSON.stringify(contracts));
    } catch {}
  }, [contracts]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_PIN) {
      setAuthenticated(true);
      setPinError("");
      try {
        sessionStorage.setItem("senecarte_super_admin_ok", "1");
      } catch {}
    } else {
      setPinError("Code PIN incorrect. Veuillez réessayer.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setPinInput("");
    try {
      sessionStorage.removeItem("senecarte_super_admin_ok");
    } catch {}
  };

  // KPI calculations
  const kpis = useMemo(() => {
    const totalPaid = billingDocs
      .filter((d) => d.status === "Payé")
      .reduce((acc, d) => acc + (d.applyTva ? d.amountHt * 1.18 : d.amountHt), 0);
    const totalPendingQuotes = billingDocs
      .filter((d) => d.kind === "DEVIS" && d.status !== "Payé")
      .reduce((acc, d) => acc + (d.applyTva ? d.amountHt * 1.18 : d.amountHt), 0);
    const activeContracts = contracts.filter(
      (c) => c.status === "Actif" || c.status === "À renouveler"
    ).length;
    const pendingApproval = prospects.filter((p) => p.status === "EN_ATTENTE").length;
    return { totalPaid, totalPendingQuotes, activeContracts, pendingApproval };
  }, [billingDocs, contracts, prospects]);

  // Run targeted AI prospecting (drafts only, awaiting director approval!)
  const handleRunTargetedProspection = async (overrideSlug?: string) => {
    const slug = overrideSlug || selectedSolution;
    setIsSearching(true);
    setFeedbackMsg("");
    try {
      const res = await fetch("/api/prospection-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solutionSlug: slug, region: selectedCity, count: 4 }),
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.leads)) {
        const mapped: ProspectItem[] = data.leads.map(
          (
            l: {
              id?: string;
              companyName?: string;
              contactRole?: string;
              sector?: string;
              city?: string;
              score?: number;
              emailPitch?: string;
              whatsappPitch?: string;
            },
            idx: number
          ) => ({
            id: `ai-${Date.now()}-${idx}`,
            companyName: l.companyName || "Entreprise cible Sénégal",
            contactRole: l.contactRole || "Direction générale",
            sector: l.sector || slug,
            city: l.city || selectedCity,
            score: l.score || 88,
            emailTo: "ahmedtall08@gmail.com",
            whatsappTo: "221776026783",
            emailSubject: `Proposition digitale Sen-E-Carte pour ${l.companyName || "votre structure"}`,
            emailDraft:
              l.emailPitch ||
              `Bonjour,\n\nSen-E-Carte accompagne les structures de votre secteur au Sénégal avec des solutions concrètes (cartes QR-NFC, plateformes SaaS et IA).\n\nCordialement,\nAhmed Tall`,
            whatsappDraft:
              l.whatsappPitch ||
              `Bonjour, c'est Ahmed Tall de Sen-E-Carte. Nous avons une solution digitale adaptée à ${l.companyName || "votre organisation"}. Puis-je vous la présenter ?`,
            status: "EN_ATTENTE",
          })
        );
        setProspects((prev) => [...mapped, ...prev]);
        setFeedbackMsg(
          `${mapped.length} nouveaux prospects générés et mis en attente de votre accord avant envoi.`
        );
      } else {
        setFeedbackMsg("Impossible de générer des prospects pour le moment.");
      }
    } catch {
      setFeedbackMsg("Erreur réseau lors de la prospection IA.");
    } finally {
      setIsSearching(false);
    }
  };

  // Run autonomous live social/web hunt
  const handleRunLiveHunt = async () => {
    setIsSearching(true);
    setFeedbackMsg("");
    try {
      const res = await fetch("/api/cron/prospection-autonome");
      const data = await res.json();
      if (res.ok && Array.isArray(data.leads)) {
        const topLeads: ProspectItem[] = data.leads.slice(0, 5).map(
          (
            l: {
              id?: string;
              companyName?: string;
              sourceNetwork?: string;
              solutionName?: string;
              score?: number;
              whatsappPitch?: string;
              sourceUrl?: string;
            },
            idx: number
          ) => ({
            id: `live-${Date.now()}-${idx}`,
            companyName: l.companyName || "Prospect Web & réseaux",
            contactRole: `Source : ${l.sourceNetwork || "Web"}`,
            sector: l.solutionName || "Solutions Sen-E-Carte",
            city: "Sénégal",
            score: l.score || 89,
            emailTo: "ahmedtall08@gmail.com",
            whatsappTo: "221776026783",
            emailSubject: `Partenariat digital Sen-E-Carte — ${l.companyName || "Sénégal"}`,
            emailDraft: `Bonjour,\n\nNous avons repéré votre activité (${l.sourceUrl || "en ligne"}) et souhaitons vous présenter notre solution « ${l.solutionName || "Sen-E-Carte"} » déjà déployée au Sénégal.\n\nDisponible pour un court échange cette semaine ?\n\nCordialement,\nAhmed Tall — Sen-E-Carte`,
            whatsappDraft:
              l.whatsappPitch ||
              `Bonjour, c'est Ahmed Tall de Sen-E-Carte. Nous proposons des solutions digitales sur-mesure pour votre secteur au Sénégal.`,
            status: "EN_ATTENTE",
          })
        );
        setProspects((prev) => [...topLeads, ...prev]);
        setFeedbackMsg(
          `Chasse autonome terminée : ${topLeads.length} prospects ajoutés en attente de validation directeur.`
        );
      }
    } catch {
      setFeedbackMsg("Erreur lors de la chasse autonome.");
    } finally {
      setIsSearching(false);
    }
  };

  // Approve & Send Email (requires explicit Director click)
  const handleApproveAndSendEmail = async (p: ProspectItem) => {
    setSendingId(p.id);
    setFeedbackMsg("");
    try {
      const res = await fetch("/api/super-admin/send-outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: p.emailTo,
          companyName: p.companyName,
          subject: p.emailSubject,
          messageBody: p.emailDraft,
          approvedByDirector: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setProspects((prev) =>
          prev.map((item) =>
            item.id === p.id
              ? { ...item, status: "EMAIL_ENVOYE", lastNote: data.note }
              : item
          )
        );
        setFeedbackMsg(data.note || "Email validé et envoyé avec succès.");
      } else {
        setFeedbackMsg(data.error || "Échec de l'envoi email.");
      }
    } catch {
      setFeedbackMsg("Erreur réseau lors de l'envoi email.");
    } finally {
      setSendingId(null);
    }
  };

  // Approve & Open WhatsApp
  const handleApproveAndSendWhatsApp = (p: ProspectItem) => {
    const cleanNum = p.whatsappTo.replace(/[^0-9]/g, "") || SITE_CONFIG.whatsapp;
    const url = `https://wa.me/${cleanNum}?text=${encodeURIComponent(p.whatsappDraft)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setProspects((prev) =>
      prev.map((item) =>
        item.id === p.id
          ? {
              ...item,
              status: "WHATSAPP_ENVOYE",
              lastNote: "Note validée par Ahmed Tall et ouverte dans WhatsApp.",
            }
          : item
      )
    );
  };

  const updateProspectField = (id: string, field: keyof ProspectItem, value: string) => {
    setProspects((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  // Create Billing Doc
  const handleCreateBillingDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocClient.trim() || !newDocDesc.trim()) return;
    const prefix = newDocKind === "DEVIS" ? "DEV" : "FAC";
    const num = String(billingDocs.length + 45).padStart(3, "0");
    const doc: BillingDoc = {
      id: `doc-${Date.now()}`,
      ref: `${prefix}-2026-${num}`,
      kind: newDocKind,
      clientName: newDocClient.trim(),
      description: newDocDesc.trim(),
      amountHt: Number(newDocAmount) || 0,
      applyTva: newDocTva,
      paymentMethod: newDocPay,
      status: "Envoyé",
      date: new Date().toISOString().slice(0, 10),
    };
    setBillingDocs((prev) => [doc, ...prev]);
    setNewDocClient("");
    setNewDocDesc("");
    setNewDocAmount(250000);
  };

  const handleConvertQuoteToInvoice = (doc: BillingDoc) => {
    const num = String(billingDocs.length + 50).padStart(3, "0");
    const inv: BillingDoc = {
      ...doc,
      id: `doc-${Date.now()}`,
      ref: `FAC-2026-${num}`,
      kind: "FACTURE",
      status: "Envoyé",
      date: new Date().toISOString().slice(0, 10),
    };
    setBillingDocs((prev) => [inv, ...prev]);
  };

  // Create Contract
  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCtrClient.trim() || !newCtrTitle.trim()) return;
    const ctr: ClientContract = {
      id: `ctr-${Date.now()}`,
      clientName: newCtrClient.trim(),
      title: newCtrTitle.trim(),
      category: newCtrCat,
      amountFcfa: Number(newCtrAmount) || 0,
      billingCycle: newCtrCycle,
      startDate: newCtrStart,
      endDate: newCtrEnd,
      status: "Actif",
    };
    setContracts((prev) => [ctr, ...prev]);
    setNewCtrClient("");
    setNewCtrTitle("");
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden">
          <div className="hero-grid text-white p-7 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center">
              <Lock className="w-7 h-7 text-emerald-300" />
            </div>
            <h1 className="text-2xl font-extrabold">Espace Super Admin</h1>
            <p className="text-xs text-slate-300 leading-relaxed">
              Poste de pilotage privé réservé au directeur <strong>Ahmed Tall</strong> — Prospection IA avec validation, factures SYSCOHADA, devis &amp; suivi des contrats.
            </p>
          </div>
          <form onSubmit={handleLogin} className="p-7 space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="admin-pin"
                className="block text-xs font-extrabold text-slate-700"
              >
                Code PIN directeur
              </label>
              <input
                id="admin-pin"
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Entrez votre code PIN"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-sm font-bold tracking-widest"
                autoFocus
              />
              <p className="text-[11px] text-slate-500">
                Code d&apos;accès par défaut en environnement local : <code className="font-mono font-bold text-slate-800">2026</code> (modifiable via <code className="font-mono">NEXT_PUBLIC_SUPER_ADMIN_PIN</code>).
              </p>
            </div>
            {pinError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                {pinError}
              </div>
            )}
            <button
              type="submit"
              className="btn-glow-emerald w-full py-3 rounded-xl text-brand-950 font-extrabold text-sm cursor-pointer"
            >
              Ouvrir le poste de pilotage
            </button>
            <div className="text-center pt-1">
              <Link href="/" className="text-xs font-bold text-slate-500 hover:text-sky-700">
                ← Retour au site Sen-E-Carte
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Printable Invoice / Quote modal overlay
  if (printDoc) {
    const tva = printDoc.applyTva ? Math.round(printDoc.amountHt * 0.18) : 0;
    const ttc = printDoc.amountHt + tva;
    return (
      <div className="min-h-screen bg-slate-100 py-10 px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex items-center justify-between gap-3 print:hidden">
            <button
              type="button"
              onClick={() => setPrintDoc(null)}
              className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
            >
              ← Retour aux factures &amp; devis
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-glow-navy inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-extrabold cursor-pointer"
            >
              <Printer className="w-4 h-4 text-emerald-300" />
              <span>Imprimer / enregistrer en PDF</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-xl space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-6 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-sen-e-carte.png"
                  alt="Logo Sen-E-Carte"
                  className="w-14 h-14 object-contain"
                  style={{ outline: "none" }}
                />
                <div>
                  <div className="text-xl font-black text-slate-950">Sen-E-Carte</div>
                  <div className="text-xs text-slate-600">
                    Cartes intelligentes QR-NFC, SaaS &amp; IA · Dakar, Sénégal
                  </div>
                  <div className="text-xs text-slate-500">
                    Tél / WhatsApp : {SITE_CONFIG.phone} · {SITE_CONFIG.email}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-extrabold">
                  {printDoc.kind === "FACTURE" ? "Facture client" : "Devis commercial"}
                </span>
                <div className="text-lg font-black text-slate-950 mt-1">{printDoc.ref}</div>
                <div className="text-xs text-slate-500">Date : {printDoc.date}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-500">Client facturé</div>
                <div className="text-base font-extrabold text-slate-950">
                  {printDoc.clientName}
                </div>
                <div className="text-slate-600">Sénégal / UEMOA</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="font-bold text-slate-500">Modalités de règlement</div>
                <div className="text-sm font-extrabold text-slate-950">
                  {printDoc.paymentMethod}
                </div>
                <div className="text-slate-600">Statut : {printDoc.status}</div>
              </div>
            </div>

            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-xs text-slate-500">
                  <th className="py-3">Désignation de la prestation</th>
                  <th className="py-3 text-right">Montant HT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100">
                  <td className="py-4 font-semibold text-slate-900">{printDoc.description}</td>
                  <td className="py-4 text-right font-bold tabular-nums">
                    {formatFcfa(printDoc.amountHt)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-full sm:w-72 space-y-2 text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Total HT</span>
                  <span className="font-bold tabular-nums">{formatFcfa(printDoc.amountHt)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>TVA (18 %)</span>
                  <span className="font-bold tabular-nums">{formatFcfa(tva)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 border-t border-slate-200 pt-2">
                  <span>Net à payer TTC</span>
                  <span className="tabular-nums text-emerald-700">{formatFcfa(ttc)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap justify-between gap-2">
              <span>Conforme aux normes SYSCOHADA · Direction technique : Ahmed Tall</span>
              <span>www.senecarte.com</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredBilling = billingDocs.filter(
    (d) => billingFilter === "TOUS" || d.kind === billingFilter
  );

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* En-tête Super Admin */}
      <section className="hero-grid text-white py-10 border-b border-sky-500/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Poste de pilotage Super Admin · Directeur Ahmed Tall</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Centre de commandes Sen-E-Carte
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Prospection IA avec validation avant envoi, factures &amp; devis SYSCOHADA, suivi des contrats clients et veille Agent-Reach.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white"
            >
              Voir le site public
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 text-rose-200 text-xs font-bold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Verrouiller</span>
            </button>
          </div>
        </div>
      </section>

      {/* Barre d'onglets Super Admin */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap gap-2">
          {[
            { id: "dashboard" as AdminTab, label: "Tableau de bord", icon: LayoutDashboard },
            {
              id: "prospection" as AdminTab,
              label: `Prospection IA (${kpis.pendingApproval} à valider)`,
              icon: Bot,
            },
            { id: "factures" as AdminTab, label: "Factures & devis", icon: FileText },
            { id: "contrats" as AdminTab, label: "Suivi des contrats", icon: FileSignature },
            { id: "agents" as AdminTab, label: "Agents réseaux & LinkedIn (5 prêts)", icon: Bot },
            { id: "veille" as AdminTab, label: "Veille Agent-Reach & marketing", icon: Compass },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  active
                    ? "bg-[#071A30] text-emerald-300 shadow-md"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* ONGLET 1 : TABLEAU DE BORD DIRECTEUR */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bento-card rounded-2xl p-5 space-y-1.5">
                <div className="text-xs font-bold text-slate-500">Chiffre d&apos;affaires encaissé</div>
                <div className="text-2xl font-black text-emerald-700 tabular-nums">
                  {formatFcfa(kpis.totalPaid)}
                </div>
                <div className="text-[11px] text-slate-500">Factures réglées (TTC)</div>
              </div>
              <div className="bento-card rounded-2xl p-5 space-y-1.5">
                <div className="text-xs font-bold text-slate-500">Devis en cours</div>
                <div className="text-2xl font-black text-sky-700 tabular-nums">
                  {formatFcfa(kpis.totalPendingQuotes)}
                </div>
                <div className="text-[11px] text-slate-500">En attente de validation client</div>
              </div>
              <div className="bento-card rounded-2xl p-5 space-y-1.5">
                <div className="text-xs font-bold text-slate-500">Contrats actifs</div>
                <div className="text-2xl font-black text-slate-950 tabular-nums">
                  {kpis.activeContracts} contrats
                </div>
                <div className="text-[11px] text-slate-500">Maintenance, SaaS &amp; cartes</div>
              </div>
              <div className="bento-card rounded-2xl p-5 space-y-1.5">
                <div className="text-xs font-bold text-slate-500">Notes IA à approuver</div>
                <div className="text-2xl font-black text-amber-600 tabular-nums">
                  {kpis.pendingApproval} prospects
                </div>
                <div className="text-[11px] text-slate-500">Validation Ahmed Tall requise</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
                <h2 className="text-lg font-extrabold text-slate-950">Actions rapides directeur</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab("prospection")}
                    className="p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-left space-y-1 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
                      <Bot className="w-4 h-4" />
                      <span>Valider la prospection IA</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Relire et envoyer les notes email / WhatsApp après votre accord.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("factures")}
                    className="p-4 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-left space-y-1 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-sky-800 font-extrabold text-sm">
                      <FileText className="w-4 h-4" />
                      <span>Créer un devis ou une facture</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Format SYSCOHADA avec TVA 18 % et export PDF immédiat.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("contrats")}
                    className="p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-left space-y-1 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
                      <FileSignature className="w-4 h-4" />
                      <span>Suivre les contrats clients</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Échéances, renouvellements annuels et relances rapides.
                    </p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("veille")}
                    className="p-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-left space-y-1 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 text-indigo-800 font-extrabold text-sm">
                      <Compass className="w-4 h-4" />
                      <span>Opportunités Agent-Reach</span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Idées de nouvelles solutions et segments chauds au Sénégal.
                    </p>
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-3xl bg-[#071A30] text-white p-6 space-y-4">
                <div className="flex items-center gap-2 text-amber-300 text-xs font-extrabold">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Alertes prioritaires de l&apos;agence</span>
                </div>
                <div className="space-y-3 text-xs">
                  {contracts
                    .filter((c) => c.status === "À renouveler")
                    .map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl bg-white/10 border border-amber-400/30 space-y-1"
                      >
                        <div className="font-extrabold text-amber-300">
                          Contrat à renouveler · {c.clientName}
                        </div>
                        <div className="text-slate-300">
                          Échéance : {c.endDate} · {formatFcfa(c.amountFcfa)}
                        </div>
                      </div>
                    ))}
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-sky-400/30 space-y-1">
                    <div className="font-extrabold text-sky-300">
                      {kpis.pendingApproval} note(s) de prospection en attente d&apos;accord
                    </div>
                    <div className="text-slate-300">
                      Aucun message n&apos;est envoyé sans votre validation explicite.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 2 : PROSPECTION IA AVEC VALIDATION DIRECTEUR */}
        {activeTab === "prospection" && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-950">
                    Agent de prospection IA · validation directeur obligatoire
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    L&apos;agent détecte les prospects et rédige les notes email et WhatsApp. Rien n&apos;est envoyé tant que vous ne cliquez pas sur « Approuver &amp; envoyer ».
                  </p>
                </div>
                <button
                  type="button"
                  disabled={isSearching}
                  onClick={handleRunLiveHunt}
                  className="btn-glow-navy inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-extrabold cursor-pointer disabled:opacity-50 shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 text-emerald-300 ${isSearching ? "animate-spin" : ""}`} />
                  <span>Chasse autonome Web &amp; réseaux (Live)</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-slate-100">
                <select
                  value={selectedSolution}
                  onChange={(e) => setSelectedSolution(e.target.value)}
                  className="md:col-span-5 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {SOLUTIONS.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.shortTitle}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="md:col-span-3 px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                >
                  {["Dakar", "Thiès", "Mbour / Saly", "Saint-Louis", "Touba", "Ziguinchor", "Abidjan / UEMOA"].map(
                    (c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    )
                  )}
                </select>
                <button
                  type="button"
                  disabled={isSearching}
                  onClick={() => handleRunTargetedProspection()}
                  className="md:col-span-4 btn-glow-emerald inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-brand-950 text-xs font-extrabold cursor-pointer disabled:opacity-50"
                >
                  <span>{isSearching ? "Recherche en cours..." : "Générer des prospects & notes"}</span>
                </button>
              </div>

              {feedbackMsg && (
                <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900">
                  {feedbackMsg}
                </div>
              )}
            </div>

            {/* Liste des prospects avec édition des notes & boutons d'approbation */}
            <div className="space-y-4">
              {prospects.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-950">
                          {p.companyName}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-extrabold">
                          Score {p.score}/100
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${
                            p.status === "EN_ATTENTE"
                              ? "bg-amber-100 text-amber-800"
                              : p.status === "REJETE"
                              ? "bg-slate-200 text-slate-600"
                              : "bg-sky-100 text-sky-800"
                          }`}
                        >
                          {p.status === "EN_ATTENTE"
                            ? "En attente d'accord directeur"
                            : p.status === "EMAIL_ENVOYE"
                            ? "Approuvé · email envoyé"
                            : p.status === "WHATSAPP_ENVOYE"
                            ? "Approuvé · WhatsApp ouvert"
                            : "Archivé / rejeté"}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {p.contactRole} · {p.sector} · {p.city}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setProspects((prev) =>
                          prev.map((x) => (x.id === p.id ? { ...x, status: "REJETE" } : x))
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-rose-600 cursor-pointer"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Rejeter</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Bloc Note Email */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="text-xs font-extrabold text-sky-800">
                        Note email rédigée par l&apos;agent (modifiable avant accord)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="email"
                          value={p.emailTo}
                          onChange={(e) => updateProspectField(p.id, "emailTo", e.target.value)}
                          placeholder="Email du prospect"
                          className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium"
                        />
                        <input
                          type="text"
                          value={p.emailSubject}
                          onChange={(e) => updateProspectField(p.id, "emailSubject", e.target.value)}
                          placeholder="Objet de l'email"
                          className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs font-medium"
                        />
                      </div>
                      <textarea
                        rows={4}
                        value={p.emailDraft}
                        onChange={(e) => updateProspectField(p.id, "emailDraft", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs leading-relaxed"
                      />
                      <button
                        type="button"
                        disabled={sendingId === p.id}
                        onClick={() => handleApproveAndSendEmail(p)}
                        className="btn-glow-navy w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-xs font-extrabold cursor-pointer disabled:opacity-50"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-300" />
                        <span>
                          {sendingId === p.id
                            ? "Envoi en cours..."
                            : "Approuver (Ahmed Tall) & envoyer par email"}
                        </span>
                      </button>
                    </div>

                    {/* Bloc Note WhatsApp */}
                    <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2.5">
                      <div className="text-xs font-extrabold text-emerald-800">
                        Note WhatsApp rédigée par l&apos;agent (modifiable avant accord)
                      </div>
                      <input
                        type="text"
                        value={p.whatsappTo}
                        onChange={(e) => updateProspectField(p.id, "whatsappTo", e.target.value)}
                        placeholder="Numéro WhatsApp (ex : 22177...)"
                        className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white text-xs font-medium"
                      />
                      <textarea
                        rows={4}
                        value={p.whatsappDraft}
                        onChange={(e) => updateProspectField(p.id, "whatsappDraft", e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-emerald-200 bg-white text-xs leading-relaxed"
                      />
                      <button
                        type="button"
                        onClick={() => handleApproveAndSendWhatsApp(p)}
                        className="btn-glow-emerald w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-brand-950 text-xs font-extrabold cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Approuver (Ahmed Tall) &amp; envoyer sur WhatsApp</span>
                      </button>
                    </div>
                  </div>

                  {p.lastNote && (
                    <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{p.lastNote}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ONGLET 3 : FACTURES CLIENTS & DEVIS SYSCOHADA */}
        {activeTab === "factures" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleCreateBillingDoc}
              className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-6 space-y-4 h-fit shadow-sm"
            >
              <h2 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Nouveau devis ou facture</span>
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {(["DEVIS", "FACTURE"] as const).map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setNewDocKind(k)}
                    className={`py-2 rounded-xl text-xs font-extrabold cursor-pointer border ${
                      newDocKind === k
                        ? "bg-[#071A30] text-emerald-300 border-[#071A30]"
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}
                  >
                    {k === "DEVIS" ? "Devis" : "Facture"}
                  </button>
                ))}
              </div>
              <input
                type="text"
                required
                value={newDocClient}
                onChange={(e) => setNewDocClient(e.target.value)}
                placeholder="Nom du client / entreprise"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
              />
              <textarea
                required
                rows={3}
                value={newDocDesc}
                onChange={(e) => setNewDocDesc(e.target.value)}
                placeholder="Objet (ex : 100 cartes NFC + portail IPM)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Montant HT (FCFA)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={newDocAmount}
                    onChange={(e) => setNewDocAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">
                    Paiement
                  </label>
                  <select
                    value={newDocPay}
                    onChange={(e) =>
                      setNewDocPay(
                        e.target.value as "Wave" | "Orange Money" | "Virement bancaire"
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                  >
                    <option value="Wave">Wave</option>
                    <option value="Orange Money">Orange Money</option>
                    <option value="Virement bancaire">Virement bancaire</option>
                  </select>
                </div>
              </div>
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={newDocTva}
                  onChange={(e) => setNewDocTva(e.target.checked)}
                />
                <span>Appliquer la TVA 18 % (SYSCOHADA)</span>
              </label>
              <button
                type="submit"
                className="btn-glow-emerald w-full py-3 rounded-xl text-brand-950 font-extrabold text-xs cursor-pointer"
              >
                Enregistrer le document
              </button>
            </form>

            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg font-extrabold text-slate-950">
                  Registre des factures &amp; devis ({filteredBilling.length})
                </h2>
                <div className="flex gap-1.5">
                  {(["TOUS", "DEVIS", "FACTURE"] as const).map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setBillingFilter(f)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                        billingFilter === f
                          ? "bg-[#071A30] text-white"
                          : "bg-white border border-slate-200 text-slate-600"
                      }`}
                    >
                      {f === "TOUS" ? "Tous" : f === "DEVIS" ? "Devis" : "Factures"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredBilling.map((doc) => {
                  const ttc = doc.applyTva ? Math.round(doc.amountHt * 1.18) : doc.amountHt;
                  return (
                    <div
                      key={doc.id}
                      className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-extrabold text-sky-700">
                            {doc.ref}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              doc.kind === "FACTURE"
                                ? "bg-indigo-100 text-indigo-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {doc.kind === "FACTURE" ? "Facture" : "Devis"}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              doc.status === "Payé"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                        <div className="text-sm font-extrabold text-slate-950">
                          {doc.clientName}
                        </div>
                        <div className="text-xs text-slate-600">{doc.description}</div>
                        <div className="text-[11px] text-slate-400">
                          {doc.date} · {doc.paymentMethod} · {doc.applyTva ? "TVA 18 %" : "Exonéré TVA"}
                        </div>
                      </div>

                      <div className="flex flex-col sm:items-end gap-2 shrink-0">
                        <div className="text-base font-black text-slate-950 tabular-nums">
                          {formatFcfa(ttc)}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPrintDoc(doc)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold cursor-pointer"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>PDF</span>
                          </button>
                          {doc.kind === "DEVIS" && (
                            <button
                              type="button"
                              onClick={() => handleConvertQuoteToInvoice(doc)}
                              className="px-3 py-1.5 rounded-lg bg-sky-100 hover:bg-sky-200 text-sky-900 text-[11px] font-bold cursor-pointer"
                            >
                              Convertir en facture
                            </button>
                          )}
                          {doc.status !== "Payé" && (
                            <button
                              type="button"
                              onClick={() =>
                                setBillingDocs((prev) =>
                                  prev.map((d) => (d.id === doc.id ? { ...d, status: "Payé" } : d))
                                )
                              }
                              className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-[11px] font-bold cursor-pointer"
                            >
                              Marquer payé
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() =>
                              setBillingDocs((prev) => prev.filter((d) => d.id !== doc.id))
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 cursor-pointer"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ONGLET 4 : SUIVI DES CONTRATS */}
        {activeTab === "contrats" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleCreateContract}
              className="lg:col-span-4 rounded-3xl bg-white border border-slate-200 p-6 space-y-3.5 h-fit shadow-sm"
            >
              <h2 className="text-lg font-extrabold text-slate-950 flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-600" />
                <span>Ajouter un contrat client</span>
              </h2>
              <input
                type="text"
                required
                value={newCtrClient}
                onChange={(e) => setNewCtrClient(e.target.value)}
                placeholder="Client / institution"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
              />
              <input
                type="text"
                required
                value={newCtrTitle}
                onChange={(e) => setNewCtrTitle(e.target.value)}
                placeholder="Objet du contrat"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-medium"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min={0}
                  value={newCtrAmount}
                  onChange={(e) => setNewCtrAmount(Number(e.target.value))}
                  placeholder="Montant FCFA"
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
                <select
                  value={newCtrCycle}
                  onChange={(e) =>
                    setNewCtrCycle(e.target.value as "Mensuel" | "Annuel" | "Forfait")
                  }
                  className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white"
                >
                  <option value="Mensuel">Mensuel</option>
                  <option value="Annuel">Annuel</option>
                  <option value="Forfait">Forfait</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Début</label>
                  <input
                    type="date"
                    value={newCtrStart}
                    onChange={(e) => setNewCtrStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 mb-1">Échéance</label>
                  <input
                    type="date"
                    value={newCtrEnd}
                    onChange={(e) => setNewCtrEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="btn-glow-emerald w-full py-3 rounded-xl text-brand-950 font-extrabold text-xs cursor-pointer"
              >
                Enregistrer le contrat
              </button>
            </form>

            <div className="lg:col-span-8 space-y-3">
              <h2 className="text-lg font-extrabold text-slate-950">
                Portefeuille des contrats ({contracts.length})
              </h2>
              {contracts.map((c) => (
                <div
                  key={c.id}
                  className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-950">{c.clientName}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          c.status === "Actif"
                            ? "bg-emerald-100 text-emerald-800"
                            : c.status === "À renouveler"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-700">{c.title}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-sky-600" />
                      <span>
                        Du {c.startDate} au {c.endDate} · {c.billingCycle}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:items-end gap-2 shrink-0">
                    <div className="text-base font-black text-slate-950 tabular-nums">
                      {formatFcfa(c.amountFcfa)}
                    </div>
                    <select
                      value={c.status}
                      onChange={(e) =>
                        setContracts((prev) =>
                          prev.map((x) =>
                            x.id === c.id
                              ? { ...x, status: e.target.value as ClientContract["status"] }
                              : x
                          )
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-slate-50"
                    >
                      <option value="Actif">Actif</option>
                      <option value="À renouveler">À renouveler</option>
                      <option value="En signature">En signature</option>
                      <option value="Clôturé">Clôturé</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ONGLET 6 : ÉQUIPE AGENTS RÉSEAUX SOCIAUX, LINKEDIN & MARKETING */}
        {activeTab === "agents" && <SuperAdminAgentsConsole />}

        {/* ONGLET 5 : VEILLE AGENT-REACH & MARKETING SÉNÉGAL */}
        {activeTab === "veille" && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-[#071A30] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300">
                  <TrendingUp className="w-4 h-4" />
                  <span>Veille Agent-Reach · Sénégal &amp; UEMOA</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold">
                  Opportunités détectées pour PME, ONG, IPM &amp; citoyens sénégalais
                </h2>
                <p className="text-xs sm:text-sm text-slate-300">
                  Cliquez sur une opportunité pour lancer immédiatement une campagne de prospection ciblée (en attente de votre validation avant envoi), ou recevez le briefing complet par email.
                </p>
              </div>
              <button
                type="button"
                disabled={isSearching}
                onClick={async () => {
                  setIsSearching(true);
                  setFeedbackMsg("");
                  try {
                    const res = await fetch("/api/cron/veille-marketing-hebdo");
                    const data = await res.json();
                    setFeedbackMsg(
                      data?.emailStatus?.note ||
                        "Rapport veille & marketing envoyé vers ahmedtall08@gmail.com."
                    );
                  } catch {
                    setFeedbackMsg("Erreur lors de l'envoi du rapport veille & marketing.");
                  } finally {
                    setIsSearching(false);
                  }
                }}
                className="btn-glow-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-brand-950 text-xs font-extrabold cursor-pointer disabled:opacity-50 shrink-0"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer rapport à ahmedtall08@gmail.com</span>
              </button>
            </div>
            {feedbackMsg && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                {feedbackMsg}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {AGENT_REACH_OPPORTUNITIES.map((opp) => (
                <div
                  key={opp.title}
                  className="bento-card rounded-3xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold">
                      {opp.segment}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-950">{opp.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {opp.insight}
                    </p>
                    <div className="text-xs font-extrabold text-emerald-700 pt-1">
                      Potentiel : {opp.potential}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSolution(opp.solutionSlug);
                      setActiveTab("prospection");
                      handleRunTargetedProspection(opp.solutionSlug);
                    }}
                    className="btn-glow-navy inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-white text-xs font-extrabold cursor-pointer"
                  >
                    <span>Prospecter ce segment (avec accord)</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
