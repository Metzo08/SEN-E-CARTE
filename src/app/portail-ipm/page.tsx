"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  ShieldAlert,
  ScanLine,
  FileCheck2,
  Building2,
  Pill,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Printer,
  Send,
  Lock,
  Activity,
  Search,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

interface IpmMember {
  cardId: string;
  fullName: string;
  company: string;
  ipmName: string;
  coverageRate: number;
  annualCeiling: number;
  annualUsed: number;
  status: "ACTIF" | "ALERTE_FRAUDE" | "SUSPENDU";
  bloodGroup: string;
  allergies: string;
  lastScan: string;
  fraudReason?: string;
}

const DEMO_MEMBERS: IpmMember[] = [
  {
    cardId: "IPM-2026-0482",
    fullName: "Fatou NDIAYE",
    company: "Groupe Portuaire Dakar",
    ipmName: "IPM Horizon Santé",
    coverageRate: 80,
    annualCeiling: 1500000,
    annualUsed: 320000,
    status: "ACTIF",
    bloodGroup: "O+",
    allergies: "Pénicilline",
    lastScan: "Aujourd'hui · Clinique du Cap (conforme)",
  },
  {
    cardId: "IPM-2026-0915",
    fullName: "Mamadou SOW",
    company: "BTP Atlantique SA",
    ipmName: "IPM Solidarité Entreprises",
    coverageRate: 80,
    annualCeiling: 1200000,
    annualUsed: 1185000,
    status: "ALERTE_FRAUDE",
    bloodGroup: "A+",
    allergies: "Aucune connue",
    lastScan: "Il y a 4 min · Pharmacie Plateau & Pharmacie Almadies simultanément",
    fraudReason:
      "Double scan détecté en moins de 5 minutes dans 2 pharmacies distantes de 11 km + plafond annuel presque atteint (98,7 %).",
  },
  {
    cardId: "IPM-2026-0301",
    fullName: "Aminata DIALLO",
    company: "Société Logistique Thiès",
    ipmName: "Mutuelle Communautaire Thiès",
    coverageRate: 70,
    annualCeiling: 800000,
    annualUsed: 150000,
    status: "SUSPENDU",
    bloodGroup: "B+",
    allergies: "Aspirine",
    lastScan: "Il y a 18 jours · Cotisation mensuelle non renouvelée",
    fraudReason: "Carte temporairement suspendue par le gestionnaire IPM (cotisation en attente).",
  },
];

interface IssuedDoc {
  ref: string;
  type: string;
  memberName: string;
  cardId: string;
  facility: string;
  totalAmount: number;
  ipmShare: number;
  patientShare: number;
  createdAt: string;
}

export default function PortailIpmPage() {
  const [queryId, setQueryId] = useState("IPM-2026-0482");
  const [selectedMember, setSelectedMember] = useState<IpmMember>(DEMO_MEMBERS[0]);
  const [docType, setDocType] = useState("Lettre de garantie clinique");
  const [facility, setFacility] = useState("Clinique madeleine · Dakar Plateau");
  const [amount, setAmount] = useState(65000);
  const [prescriptionNote, setPrescriptionNote] = useState("Consultation cardiologie + bilan biologique standard");
  const [issuedDocs, setIssuedDocs] = useState<IssuedDoc[]>([
    {
      ref: "LG-2026-8841",
      type: "Lettre de Garantie Clinique",
      memberName: "Fatou NDIAYE",
      cardId: "IPM-2026-0482",
      facility: "Clinique du Cap · Dakar",
      totalAmount: 45000,
      ipmShare: 36000,
      patientShare: 9000,
      createdAt: "Aujourd'hui · 09:14",
    },
  ]);

  const handleScanSearch = (idToFind?: string) => {
    const target = (idToFind || queryId).trim().toUpperCase();
    const found =
      DEMO_MEMBERS.find((m) => m.cardId.toUpperCase() === target) ||
      DEMO_MEMBERS.find((m) => m.fullName.toUpperCase().includes(target)) ||
      DEMO_MEMBERS[0];
    setQueryId(found.cardId);
    setSelectedMember(found);
  };

  const remainingCeiling = Math.max(0, selectedMember.annualCeiling - selectedMember.annualUsed);
  const ipmShare = Math.round((amount * selectedMember.coverageRate) / 100);
  const patientShare = Math.max(0, amount - ipmShare);

  const handleIssueDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMember.status !== "ACTIF") return;
    const prefix = docType.includes("Garantie") ? "LG" : docType.includes("Commande") ? "BC" : "ORD";
    const ref = `${prefix}-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newDoc: IssuedDoc = {
      ref,
      type: docType,
      memberName: selectedMember.fullName,
      cardId: selectedMember.cardId,
      facility,
      totalAmount: amount,
      ipmShare,
      patientShare,
      createdAt: "À l'instant · Vérifié NFC/QR",
    };
    setIssuedDocs((prev) => [newDoc, ...prev]);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-brand-950 text-white pt-14 pb-16 border-b border-emerald-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.18),transparent_45%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Nouvelle solution SaaS · tiers-payant anti-fraude NFC &amp; QR</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                Portail IPM &amp; mutuelles{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                  Anti-fraude en temps réel
                </span>
              </h1>
              <p className="mt-4 text-slate-300 text-base sm:text-lg leading-relaxed">
                Inspiré par nos déploiements avec l&apos;ANACMU (carte NJABOOT), l&apos;UNAMUSC et les mutuelles de
                Dakar : vérifiez les droits d&apos;un assuré en 1 scan NFC/QR, bloquez les fraudes en pharmacie et
                émettez vos lettres de garantie &amp; bons de commande en ligne.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/commander?solution=carte-sante-ipm-cmu"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-sm shadow-lg"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Équiper mon IPM / mutuelle</span>
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    "Bonjour Ahmed TALL (Sen-E-Carte), je souhaite une démonstration du Portail IPM Anti-Fraude et des cartes santé NFC/QR."
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Démo institutionnelle WhatsApp</span>
                </a>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-3xl overflow-hidden border-2 border-emerald-400/35 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/illustrations/sante-ipm.jpg"
                  alt="Scan carte santé NFC Sen-E-Carte en pharmacie à Dakar"
                  className="w-full h-64 sm:h-72 object-cover"
                />
              </div>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Contrôle droits NFC/QR", value: "< 2 sec", sub: "En pharmacie & clinique" },
              { label: "Détection double-scan", value: "100 %", sub: "Alerte fraude instantanée" },
              { label: "Réduction délais dossiers", value: "-65 %", sub: "Lettres de garantie en ligne" },
              { label: "Conformité données", value: "HIPAA / CDP", sub: "Chiffrement bout-en-bout" },
            ].map((k) => (
              <div key={k.label} className="rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-2xl font-black text-emerald-400">{k.value}</div>
                <div className="text-xs font-bold text-white mt-1">{k.label}</div>
                <div className="text-[11px] text-slate-400">{k.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Scanner & Verification */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-950 text-sky-400 flex items-center justify-center">
                    <ScanLine className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold text-brand-950">
                      1. Contrôle carte assuré (scan NFC / QR)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Testez les 3 scénarios réels ci-dessous (actif, alerte fraude, suspendu)
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Test Buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                {DEMO_MEMBERS.map((m) => (
                  <button
                    key={m.cardId}
                    type="button"
                    onClick={() => handleScanSearch(m.cardId)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      selectedMember.cardId === m.cardId
                        ? "bg-brand-950 text-white border-brand-950"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400"
                    }`}
                  >
                    {m.cardId} · {m.fullName.split(" ")[0]}{" "}
                    {m.status === "ACTIF" ? "✅" : m.status === "ALERTE_FRAUDE" ? "🚨" : "⏸️"}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={queryId}
                    onChange={(e) => setQueryId(e.target.value)}
                    placeholder="Numéro de carte IPM ou nom de l'assuré..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleScanSearch()}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-sm"
                >
                  Vérifier
                </button>
              </div>

              {/* Result Card */}
              <div
                className={`mt-6 rounded-2xl border-2 p-5 ${
                  selectedMember.status === "ACTIF"
                    ? "bg-emerald-50/60 border-emerald-400"
                    : selectedMember.status === "ALERTE_FRAUDE"
                    ? "bg-red-50/80 border-red-400"
                    : "bg-amber-50/80 border-amber-400"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-wider text-slate-500">
                      {selectedMember.ipmName} · {selectedMember.cardId}
                    </span>
                    <h3 className="text-xl font-black text-brand-950 mt-0.5">{selectedMember.fullName}</h3>
                    <p className="text-xs font-semibold text-slate-600">{selectedMember.company}</p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-extrabold ${
                      selectedMember.status === "ACTIF"
                        ? "bg-emerald-600 text-white"
                        : selectedMember.status === "ALERTE_FRAUDE"
                        ? "bg-red-600 text-white animate-pulse"
                        : "bg-amber-500 text-brand-950"
                    }`}
                  >
                    {selectedMember.status === "ACTIF" ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" /> Droits actifs · autorisé
                      </>
                    ) : selectedMember.status === "ALERTE_FRAUDE" ? (
                      <>
                        <ShieldAlert className="w-4 h-4" /> Alerte fraude bloquée
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" /> Cotisation suspendue
                      </>
                    )}
                  </div>
                </div>

                {selectedMember.fraudReason && (
                  <div className="mt-4 p-3.5 rounded-xl bg-white/90 border border-red-200 text-xs text-red-800 font-semibold flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{selectedMember.fraudReason}</span>
                  </div>
                )}

                <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-500">Prise en charge</div>
                    <div className="text-lg font-black text-brand-950">{selectedMember.coverageRate} %</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-500">Plafond restant</div>
                    <div className="text-sm font-black text-emerald-700">
                      {remainingCeiling.toLocaleString("fr-FR")} FCFA
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-500">Groupe sanguin</div>
                    <div className="text-lg font-black text-red-600">{selectedMember.bloodGroup}</div>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200/80">
                    <div className="text-[10px] font-bold text-slate-500">Allergies</div>
                    <div className="text-xs font-extrabold text-brand-950 mt-1">{selectedMember.allergies}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-600">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Dernier scan enregistré : {selectedMember.lastScan}</span>
                </div>
              </div>
            </div>

            {/* Issued Documents Journal */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-extrabold text-brand-950 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  Journal temps réel des lettres de garantie &amp; bons
                </h2>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                  {issuedDocs.length} émis
                </span>
              </div>
              <div className="space-y-3">
                {issuedDocs.map((doc) => (
                  <div
                    key={doc.ref}
                    className="rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-4 hover:border-sky-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-brand-950 text-sky-300 text-xs font-mono font-bold">
                          {doc.ref}
                        </span>
                        <span className="text-xs font-bold text-emerald-700">{doc.type}</span>
                      </div>
                      <div className="text-sm font-extrabold text-brand-950 mt-1">
                        {doc.memberName} ({doc.cardId}) · {doc.facility}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Total : {doc.totalAmount.toLocaleString("fr-FR")} FCFA ·{" "}
                        <strong className="text-emerald-700">
                          Part IPM : {doc.ipmShare.toLocaleString("fr-FR")} FCFA
                        </strong>{" "}
                        · Ticket modérateur : {doc.patientShare.toLocaleString("fr-FR")} FCFA
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Imprimer PDF
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Issue Letter of Guarantee / Order / Prescription */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleIssueDocument}
              className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sticky top-20"
            >
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold text-brand-950">
                    2. Émettre un document tiers-payant
                  </h2>
                  <p className="text-xs text-slate-500">
                    Lettre de garantie, bon pharmacie ou vérification d&apos;ordonnance
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Type de document</label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium bg-white"
                  >
                    <option>Lettre de garantie clinique</option>
                    <option>Bon de commande pharmacie</option>
                    <option>Dépôt d&apos;ordonnance pour vérification</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Structure sanitaire / pharmacie partenaire
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={facility}
                      onChange={(e) => setFacility(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Montant de la prestation / ordonnance (FCFA)
                  </label>
                  <input
                    type="number"
                    min={1000}
                    step={500}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Actes / détails ordonnance
                  </label>
                  <div className="relative">
                    <Pill className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <textarea
                      rows={2}
                      value={prescriptionNote}
                      onChange={(e) => setPrescriptionNote(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>

                {/* Live Calculation Box */}
                <div className="rounded-2xl bg-brand-950 text-white p-4 space-y-2">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Part prise en charge IPM ({selectedMember.coverageRate} %)</span>
                    <span className="font-extrabold text-emerald-400">
                      {ipmShare.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Reste à charge patient (ticket modérateur)</span>
                    <span className="font-bold text-white">{patientShare.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={selectedMember.status !== "ACTIF"}
                  className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all ${
                    selectedMember.status === "ACTIF"
                      ? "bg-emerald-500 hover:bg-emerald-400 text-brand-950 shadow-lg"
                      : "bg-slate-200 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {selectedMember.status === "ACTIF" ? (
                    <>
                      <FileCheck2 className="w-4 h-4" />
                      <span>Valider &amp; générer le document QR</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Émission bloquée (Statut : {selectedMember.status})</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
