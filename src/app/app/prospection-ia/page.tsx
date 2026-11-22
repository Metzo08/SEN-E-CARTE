"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Bot,
  Sparkles,
  Send,
  Copy,
  Check,
  Target,
  MapPin,
  TrendingUp,
  Briefcase,
  MessageSquare,
  Mail,
  Linkedin,
  PhoneCall,
} from "lucide-react";
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
  stage?: "Nouveau" | "Contacté" | "RDV / Démo" | "Devis envoyé" | "Signé";
}

const REGIONS = [
  "Dakar",
  "Thiès",
  "Mbour / Saly",
  "Saint-Louis",
  "Touba / Diourbel",
  "Ziguinchor",
  "Kaolack",
  "Abidjan / UEMOA",
];

const STAGES: Array<NonNullable<ProspectLead["stage"]>> = [
  "Nouveau",
  "Contacté",
  "RDV / Démo",
  "Devis envoyé",
  "Signé",
];

function ProspectionIAInner() {
  const searchParams = useSearchParams();
  const initialSol = searchParams.get("solution") || SOLUTIONS[0].slug;

  const [solutionSlug, setSolutionSlug] = useState(initialSol);
  const [region, setRegion] = useState("Dakar");
  const [customTarget, setCustomTarget] = useState("");
  const [loading, setLoading] = useState(false);
  const [huntingLive, setHuntingLive] = useState(false);
  const [huntReport, setHuntReport] = useState<{
    discoveredCount: number;
    alertEmail: string;
    emailStatus?: { sent: boolean; note: string };
    leads: Array<{
      id: string;
      companyName: string;
      sourceUrl: string;
      sourceNetwork: string;
      solutionName: string;
      score: number;
      whatsappPitch: string;
    }>;
  } | null>(null);
  const [leads, setLeads] = useState<ProspectLead[]>([]);
  const [activeChannel, setActiveChannel] = useState<Record<string, "wa" | "email" | "li" | "call">>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("senecarte_crm_leads");
      if (saved) setLeads(JSON.parse(saved));
    } catch {}
  }, []);

  const persistLeads = (next: ProspectLead[]) => {
    setLeads(next);
    try {
      localStorage.setItem("senecarte_crm_leads", JSON.stringify(next));
    } catch {}
  };

  const runAgent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/prospection-ia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solutionSlug, region, customTarget }),
      });
      const data = await res.json();
      if (Array.isArray(data.leads)) {
        const stamped: ProspectLead[] = data.leads.map((l: ProspectLead) => ({
          ...l,
          stage: "Nouveau",
        }));
        persistLeads([...stamped, ...leads]);
      }
    } finally {
      setLoading(false);
    }
  };

  const runLiveWebHunt = async () => {
    setHuntingLive(true);
    try {
      const res = await fetch("/api/cron/prospection-autonome", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setHuntReport(data);
      }
    } finally {
      setHuntingLive(false);
    }
  };

  const updateStage = (id: string, stage: NonNullable<ProspectLead["stage"]>) => {
    persistLeads(leads.map((l) => (l.id === id ? { ...l, stage } : l)));
  };

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 1800);
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="rounded-3xl bg-brand-950 hero-grid text-white p-6 sm:p-10 border border-emerald-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                <Bot className="w-4 h-4" />
                Agent IA prospection autonome 24/7 · alerte email : ahmedtall08@gmail.com
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Trouvez et convertissez des clients qualifiés pour chacune de vos solutions
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                Choisissez une solution du catalogue et une zone cible : l&apos;agent IA identifie les segments à fort potentiel, calcule un score d&apos;opportunité et génère vos messages personnalisés <strong>WhatsApp</strong>, <strong>Email B2B</strong>, <strong>LinkedIn</strong> et <strong>Script d&apos;appel</strong>.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0">
              <div className="w-56 h-32 rounded-2xl overflow-hidden border border-sky-400/35 shadow-lg hidden sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/illustrations/prospection-ia.jpg"
                  alt="Radar IA de prospection réseaux sociaux Sen-E-Carte"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-3 text-center w-full">
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-extrabold text-emerald-400">{leads.length}</div>
                  <div className="text-[11px] text-slate-300">Prospects CRM</div>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-2xl font-extrabold text-amber-300">
                    {leads.filter((l) => l.stage === "Signé" || l.stage === "Devis envoyé").length}
                  </div>
                  <div className="text-[11px] text-slate-300">Devis / signés</div>
                </div>
              </div>
            </div>
          </div>

          {/* Formulaire de campagne IA */}
          <form onSubmit={runAgent} className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="md:col-span-4">
              <label className="block text-[11px] font-bold text-emerald-300 mb-1">
                Solution à vendre
              </label>
              <select
                value={solutionSlug}
                onChange={(e) => setSolutionSlug(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm font-semibold text-white"
              >
                {SOLUTIONS.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.shortTitle} — {s.badge}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold text-emerald-300 mb-1">
                Zone géographique
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm font-semibold text-white"
              >
                {REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-3">
              <label className="block text-[11px] font-bold text-emerald-300 mb-1">
                Nom d&apos;entreprise / cible (optionnel)
              </label>
              <input
                type="text"
                value={customTarget}
                onChange={(e) => setCustomTarget(e.target.value)}
                placeholder="Ex : IPM SONATEL, lycée Seydina..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-xs sm:text-sm text-white placeholder:text-slate-500"
              />
            </div>

            <div className="md:col-span-2 flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-950 font-extrabold text-xs sm:text-sm transition-colors shadow-lg disabled:opacity-60"
              >
                <Sparkles className="w-4 h-4" />
                <span>{loading ? "Analyse..." : "Trouver clients"}</span>
              </button>
            </div>
          </form>

          {/* Panneau Chasse Autonome Web & Réseaux Sociaux 24/7 */}
          <div className="mt-4 p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-200 space-y-1">
              <div className="font-extrabold text-sky-300">
                Mode chasse autonome 24/7 (cron quotidien 09h00 gmt → ahmedtall08@gmail.com)
              </div>
              <p className="text-slate-300">
                L&apos;agent parcourt le web, LinkedIn et Facebook pour détecter des prospects réels (IPM, écoles, forages ASUFOR, PME/BTP) et envoie automatiquement un rapport par email à Ahmed Tall sans connexion manuelle.
              </p>
            </div>
            <button
              type="button"
              onClick={runLiveWebHunt}
              disabled={huntingLive}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-xs transition-colors disabled:opacity-60"
            >
              <Sparkles className="w-4 h-4" />
              <span>{huntingLive ? "Recherche Web & Réseaux en cours..." : "Lancer une chasse Web & Réseaux maintenant"}</span>
            </button>
          </div>
        </div>

        {/* Résultats de la chasse Web & Réseaux Sociaux en direct */}
        {huntReport && (
          <div className="rounded-3xl bg-white border-2 border-emerald-400/60 p-6 shadow-lg space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-extrabold text-slate-950">
                  Chasse Web &amp; Réseaux Sociaux terminée : {huntReport.discoveredCount} prospects réels trouvés
                </h2>
                <p className="text-xs text-slate-600">
                  Destinataire alerte automatique : <strong>{huntReport.alertEmail}</strong> · {huntReport.emailStatus?.note}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {huntReport.leads.map((hl) => (
                <div key={hl.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800">{hl.sourceNetwork} · {hl.solutionName}</span>
                      <span className="text-emerald-700">Score {hl.score}/100</span>
                    </div>
                    <div className="text-sm font-extrabold text-slate-950 line-clamp-1">{hl.companyName}</div>
                    <a href={hl.sourceUrl} target="_blank" rel="noreferrer" className="text-[11px] text-sky-700 hover:underline break-all">
                      {hl.sourceUrl}
                    </a>
                  </div>
                  <div className="pt-2">
                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(hl.whatsappPitch)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                    >
                      <Send className="w-3.5 h-3.5" /> Contacter sur WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Liste des prospects générés + CRM Pipeline */}
        {leads.length === 0 ? (
          <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center space-y-3">
            <Target className="w-10 h-10 text-emerald-600 mx-auto" />
            <h2 className="text-lg font-extrabold text-slate-900">
              Prêt à lancer votre première campagne de prospection IA
            </h2>
            <p className="text-sm text-slate-600 max-w-xl mx-auto">
              Sélectionnez une offre ci-dessus (ex : <strong>Santé &amp; IPM</strong>, <strong>Carte scolaire CMU</strong> ou <strong>Forages ASUFOR</strong>) Et cliquez sur <strong>« Trouver clients »</strong> Pour générer instantanément vos prospects scorés et scripts d&apos;approche.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-950 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Pipeline CRM &amp; Prospects qualifiés ({leads.length})</span>
              </h2>
              <button
                type="button"
                onClick={() => persistLeads([])}
                className="text-xs font-bold text-slate-500 hover:text-red-600"
              >
                Réinitialiser le pipeline
              </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {leads.map((lead) => {
                const ch = activeChannel[lead.id] || "wa";
                const activeText =
                  ch === "wa"
                    ? lead.whatsappScript
                    : ch === "email"
                    ? `Objet : ${lead.emailSubject}\n\n${lead.emailBody}`
                    : ch === "li"
                    ? lead.linkedinScript
                    : lead.callPitch;

                return (
                  <div
                    key={lead.id}
                    className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                            Score IA : {lead.score}/100
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {lead.city}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
                            <Briefcase className="w-3.5 h-3.5 text-amber-600" /> {lead.decisionMakerRole}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold text-slate-950">{lead.companyName}</h3>
                        <p className="text-xs text-slate-600">
                          <strong>Besoin détecté :</strong> {lead.painPoint}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 shrink-0">
                        <div className="text-right">
                          <div className="text-[10px] font-bold text-slate-400">Potentiel estimé</div>
                          <div className="text-sm font-extrabold text-emerald-700">{lead.estimatedDealFCFA}</div>
                        </div>
                        <select
                          value={lead.stage || "Nouveau"}
                          onChange={(e) =>
                            updateStage(lead.id, e.target.value as NonNullable<ProspectLead["stage"]>)
                          }
                          className="px-3 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-900"
                        >
                          {STAGES.map((st) => (
                            <option key={st} value={st}>
                              Statut : {st}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Sélecteur de canal d'approche */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { id: "wa", label: "WhatsApp", icon: MessageSquare },
                            { id: "email", label: "Email B2B", icon: Mail },
                            { id: "li", label: "LinkedIn", icon: Linkedin },
                            { id: "call", label: "Script appel", icon: PhoneCall },
                          ].map((btn) => (
                            <button
                              key={btn.id}
                              type="button"
                              onClick={() =>
                                setActiveChannel((prev) => ({
                                  ...prev,
                                  [lead.id]: btn.id as "wa" | "email" | "li" | "call",
                                }))
                              }
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                                ch === btn.id
                                  ? "bg-brand-950 text-emerald-400"
                                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                              }`}
                            >
                              <btn.icon className="w-3.5 h-3.5" />
                              <span>{btn.label}</span>
                            </button>
                          ))}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyText(`${lead.id}-${ch}`, activeText)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-800"
                          >
                            {copiedId === `${lead.id}-${ch}` ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" /> Copié
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Copier
                              </>
                            )}
                          </button>
                          <a
                            href={`https://wa.me/?text=${encodeURIComponent(lead.whatsappScript)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Ouvrir WhatsApp</span>
                          </a>
                        </div>
                      </div>

                      <pre className="whitespace-pre-wrap font-sans text-xs sm:text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-2xl p-4 leading-relaxed">
                        {activeText}
                      </pre>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProspectionIAPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm text-slate-500">Chargement de l&apos;agent prospection IA...</div>}>
      <ProspectionIAInner />
    </Suspense>
  );
}
