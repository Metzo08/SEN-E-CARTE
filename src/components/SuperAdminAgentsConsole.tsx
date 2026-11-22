"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  Sparkles,
  Copy,
  CheckCircle2,
  Linkedin,
  Youtube,
  Compass,
  Video,
  Briefcase,
  Loader2,
  Mail,
  MessageCircle,
  Clock,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

interface AgentCard {
  id: string;
  name: string;
  role: string;
  channels: string;
  defaultInstruction: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

interface MissionLog {
  id: string;
  agentName: string;
  channel: string;
  sector: string;
  instruction: string;
  output: string;
  createdAt: string;
  emailSent: boolean;
}

const AGENTS: AgentCard[] = [
  {
    id: "sene-linkedin-growth",
    name: "Khadija Ndiaye",
    role: "Stratège LinkedIn B2B & prospection sectorielle",
    channels: "LinkedIn",
    defaultInstruction:
      "Rédige un post LinkedIn haute autorité + un message de prospection personnalisé pour attirer des décideurs de ce secteur au Sénégal.",
    icon: Linkedin,
    accent: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    id: "sene-social-motion-publisher",
    name: "Moustapha Sarr",
    role: "Producteur motion design & diffusion multi-réseaux",
    channels: "YouTube · Instagram · X · Facebook",
    defaultInstruction:
      "Crée un script vidéo motion design de 35 secondes (Reels / Shorts / YouTube) + légende Instagram/Facebook + thread X/Twitter de 3 tweets.",
    icon: Youtube,
    accent: "text-rose-700 bg-rose-50 border-rose-200",
  },
  {
    id: "sene-market-scout",
    name: "Cheikh Ahmadou Bamba Diagne",
    role: "Veilleur stratégique Agent-Reach Sénégal",
    channels: "Web · GitHub · Opportunités",
    defaultInstruction:
      "Analyse les besoins urgents des PME, ONG et citoyens dans ce secteur au Sénégal et propose une offre concrète Sen-E-Carte avec prix FCFA.",
    icon: Compass,
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: "sene-video-vision-analyst",
    name: "Aminata Ndiaye",
    role: "Analyste vidéo multimodale & tendances réseaux",
    channels: "YouTube · TikTok · Reels",
    defaultInstruction:
      "Propose les 3 meilleurs angles vidéo et hooks des 3 premières secondes qui convertissent le mieux au Sénégal pour ce secteur.",
    icon: Video,
    accent: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  {
    id: "sene-sales-tenders",
    name: "Ndèye Fatou Cissé",
    role: "Directrice appels d'offres & propositions B2B",
    channels: "Propositions · Closing B2B",
    defaultInstruction:
      "Rédige une proposition commerciale B2B structurée (périmètre, planning 10 jours, budget SYSCOHADA en FCFA) prête à envoyer à un client.",
    icon: Briefcase,
    accent: "text-amber-700 bg-amber-50 border-amber-200",
  },
];

const SECTORS = [
  "Cartes de visite intelligentes QR + NFC (Dirigeants & pros)",
  "LegalTech cabinets d'avocats & notaires (OCR & audiences)",
  "Santé, IPM, mutuelles & cliniques (tiers-payant anti-fraude)",
  "ERP PME, gestion de stocks & facturation SYSCOHADA",
  "Gestion immobilière & quittances WhatsApp automatiques",
  "BTP, génie civil & suivi de chantiers (DQE/BPU)",
  "Écoles privées, lycées & carte scolaire CMU (Wave/OM)",
  "Tontine digitale, GIE & coopératives agricoles",
];

export default function SuperAdminAgentsConsole() {
  const [selectedAgentId, setSelectedAgentId] = useState<string>(AGENTS[0].id);
  const [sector, setSector] = useState<string>(SECTORS[0]);
  const [instruction, setInstruction] = useState<string>(AGENTS[0].defaultInstruction);
  const [sendEmailCopy, setSendEmailCopy] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [logs, setLogs] = useState<MissionLog[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("senecarte_sa_agent_logs");
      if (saved) setLogs(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("senecarte_sa_agent_logs", JSON.stringify(logs));
    } catch {}
  }, [logs]);

  const activeAgent = AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];

  const handleSelectAgent = (ag: AgentCard) => {
    setSelectedAgentId(ag.id);
    setInstruction(ag.defaultInstruction);
    setError("");
  };

  const handleRunMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;
    setRunning(true);
    setError("");
    try {
      const res = await fetch("/api/super-admin/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          sector,
          instruction,
          sendEmailCopy,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Impossible d'exécuter la mission.");
      } else {
        const entry: MissionLog = {
          id: `mission-${Date.now()}`,
          agentName: data.agentName,
          channel: data.channel,
          sector,
          instruction,
          output: data.output,
          createdAt: new Date().toLocaleString("fr-FR"),
          emailSent: Boolean(data.emailSent),
        };
        setLogs((prev) => [entry, ...prev]);
      }
    } catch {
      setError("Erreur réseau lors de l'exécution de la mission.");
    } finally {
      setRunning(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="rounded-3xl bg-[#071A30] text-white p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>5 agents configurés · En veille · Prêts sur vos instructions</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Équipe agents réseaux sociaux, LinkedIn B2B &amp; marketing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Sélectionnez un agent, choisissez le secteur cible et donnez votre instruction : l&apos;agent exécute avec méthode, minutie et rigueur et vous remet un livrable prêt à publier ou envoyer.
          </p>
        </div>
      </div>

      {/* Grille des 5 agents prêts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {AGENTS.map((ag) => {
          const selected = ag.id === selectedAgentId;
          return (
            <button
              key={ag.id}
              type="button"
              onClick={() => handleSelectAgent(ag)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                selected
                  ? "bg-[#071A30] text-white border-sky-400 shadow-xl ring-2 ring-sky-400/40"
                  : "bg-white text-slate-900 border-slate-200 hover:border-sky-400"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center ${
                      selected ? "bg-sky-500/20 border-sky-400/40 text-emerald-300" : ag.accent
                    }`}
                  >
                    <ag.icon className="w-4 h-4" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Prêt
                  </span>
                </div>
                <div className="text-xs font-extrabold leading-snug">{ag.name}</div>
                <div
                  className={`text-[11px] leading-snug ${
                    selected ? "text-slate-300" : "text-slate-500"
                  }`}
                >
                  {ag.role}
                </div>
              </div>
              <div
                className={`text-[10px] font-bold pt-1 border-t ${
                  selected ? "border-white/10 text-sky-300" : "border-slate-100 text-sky-700"
                }`}
              >
                {ag.channels}
              </div>
            </button>
          );
        })}
      </div>

      {/* Console d'instruction directeur */}
      <form
        onSubmit={handleRunMission}
        className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-extrabold text-sky-700">
              Agent sélectionné : {activeAgent.name} ({activeAgent.channels})
            </div>
            <h3 className="text-lg font-extrabold text-slate-950">
              Donner une instruction précise à l&apos;agent
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5">
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              Secteur cible Sen-E-Carte
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
            >
              {SECTORS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="lg:col-span-7">
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              Votre instruction pour {activeAgent.name}
            </label>
            <textarea
              rows={3}
              required
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Décrivez précisément le post, le script vidéo, la prospection ou la proposition attendue..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={sendEmailCopy}
              onChange={(e) => setSendEmailCopy(e.target.checked)}
            />
            <Mail className="w-3.5 h-3.5 text-sky-600" />
            <span>Envoyer aussi le livrable par email à ahmedtall08@gmail.com</span>
          </label>

          <button
            type="submit"
            disabled={running}
            className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span>{running ? "Exécution en cours..." : "Exécuter la mission maintenant"}</span>
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            {error}
          </div>
        )}
      </form>

      {/* Journal des livrables générés */}
      {logs.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-extrabold text-slate-950">
            Livrables générés par vos agents ({logs.length})
          </h3>
          {logs.map((log) => (
            <div
              key={log.id}
              className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#071A30] text-emerald-300 text-xs font-extrabold">
                    {log.agentName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                    {log.channel}
                  </span>
                  {log.emailSent && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                      Copie envoyée à ahmedtall08@gmail.com
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-slate-400 inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {log.createdAt}
                </span>
              </div>

              <div className="text-xs font-bold text-slate-600">
                Secteur : {log.sector}
              </div>

              <pre className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap font-sans leading-relaxed">
                {log.output}
              </pre>

              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopy(log.id, log.output)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold cursor-pointer"
                >
                  {copiedId === log.id ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === log.id ? "Copié !" : "Copier le texte"}</span>
                </button>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    log.output.slice(0, 1200)
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-extrabold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Partager sur WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
