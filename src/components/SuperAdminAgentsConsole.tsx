"use client";

import React, { useEffect, useState } from "react";
import {
  Send,
  Copy,
  CheckCircle2,
  Linkedin,
  Youtube,
  Compass,
  Video,
  Briefcase,
  Loader2,
  Clock,
  ExternalLink,
  Share2,
  Globe,
} from "lucide-react";

interface AgentCard {
  id: string;
  name: string;
  role: string;
  channels: string;
  defaultTargets: SocialChannelKey[];
  defaultInstruction: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
}

type SocialChannelKey =
  | "linkedin_ahmed"
  | "linkedin_senecarte"
  | "x_senecarte"
  | "facebook_senecarte"
  | "instagram_senecarte"
  | "youtube_senecarte";

interface SocialDestination {
  key: SocialChannelKey;
  label: string;
  shortLabel: string;
  profileUrl: string;
  colorClass: string;
  buildPublishUrl: (text: string) => string;
}

const SOCIAL_DESTINATIONS: SocialDestination[] = [
  {
    key: "linkedin_ahmed",
    label: "LinkedIn Ahmed Tall (DG)",
    shortLabel: "LinkedIn Ahmed Tall",
    profileUrl: "https://www.linkedin.com/in/ahmed-tall-76959887/?locale=fr",
    colorClass:
      "bg-sky-700 hover:bg-sky-800 text-white border-sky-700",
    buildPublishUrl: (text) =>
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
        text.slice(0, 2600)
      )}`,
  },
  {
    key: "linkedin_senecarte",
    label: "LinkedIn Sen-E-Carte",
    shortLabel: "LinkedIn Sen-E-Carte",
    profileUrl: "https://www.linkedin.com/in/sen-e-carte-049472319/",
    colorClass:
      "bg-sky-600 hover:bg-sky-700 text-white border-sky-600",
    buildPublishUrl: (text) =>
      `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(
        text.slice(0, 2600)
      )}`,
  },
  {
    key: "x_senecarte",
    label: "X (Twitter) @SenECarte",
    shortLabel: "X @SenECarte",
    profileUrl: "https://x.com/SenECarte",
    colorClass:
      "bg-slate-900 hover:bg-black text-white border-slate-900",
    buildPublishUrl: (text) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(
        text.slice(0, 270)
      )}`,
  },
  {
    key: "facebook_senecarte",
    label: "Facebook Sen-E-Carte",
    shortLabel: "Facebook Sen-E-Carte",
    profileUrl: "https://www.facebook.com/profile.php?id=61562522274769",
    colorClass:
      "bg-blue-600 hover:bg-blue-700 text-white border-blue-600",
    buildPublishUrl: () =>
      "https://www.facebook.com/profile.php?id=61562522274769",
  },
  {
    key: "instagram_senecarte",
    label: "Instagram @ecartesene",
    shortLabel: "Instagram @ecartesene",
    profileUrl: "https://www.instagram.com/ecartesene/",
    colorClass:
      "bg-pink-600 hover:bg-pink-700 text-white border-pink-600",
    buildPublishUrl: () => "https://www.instagram.com/ecartesene/",
  },
  {
    key: "youtube_senecarte",
    label: "YouTube Sen-E-Carte",
    shortLabel: "YouTube Sen-E-Carte",
    profileUrl: "https://www.youtube.com/channel/UC0L_9dd8c3NNP1ISq1avLFw",
    colorClass:
      "bg-rose-600 hover:bg-rose-700 text-white border-rose-600",
    buildPublishUrl: () =>
      "https://www.youtube.com/channel/UC0L_9dd8c3NNP1ISq1avLFw",
  },
];

interface MissionLog {
  id: string;
  agentName: string;
  channel: string;
  sector: string;
  instruction: string;
  output: string;
  createdAt: string;
  targetChannels?: SocialChannelKey[];
  publishedChannels?: SocialChannelKey[];
}

const AGENTS: AgentCard[] = [
  {
    id: "sene-linkedin-growth",
    name: "Khadija Ndiaye",
    role: "Stratège LinkedIn B2B & prospection sectorielle",
    channels: "LinkedIn Ahmed Tall · LinkedIn Sen-E-Carte",
    defaultTargets: ["linkedin_ahmed", "linkedin_senecarte"],
    defaultInstruction:
      "Rédige un post LinkedIn haute autorité prêt à publier sur le profil d'Ahmed Tall et la page Sen-E-Carte + un message de prospection personnalisé pour attirer des décideurs de ce secteur au Sénégal.",
    icon: Linkedin,
    accent: "text-sky-700 bg-sky-50 border-sky-200",
  },
  {
    id: "sene-social-motion-publisher",
    name: "Moustapha Sarr",
    role: "Producteur motion design & diffusion multi-réseaux",
    channels: "YouTube · Instagram · X · Facebook",
    defaultTargets: [
      "youtube_senecarte",
      "instagram_senecarte",
      "x_senecarte",
      "facebook_senecarte",
    ],
    defaultInstruction:
      "Crée un script vidéo motion design de 35 secondes (YouTube Shorts / Instagram Reels) + légende Facebook/Instagram + thread X/Twitter @SenECarte de 3 tweets.",
    icon: Youtube,
    accent: "text-rose-700 bg-rose-50 border-rose-200",
  },
  {
    id: "sene-market-scout",
    name: "Cheikh Ahmadou Bamba Diagne",
    role: "Veilleur stratégique Agent-Reach Sénégal",
    channels: "Web · GitHub · Opportunités",
    defaultTargets: ["linkedin_ahmed", "linkedin_senecarte", "x_senecarte"],
    defaultInstruction:
      "Analyse les besoins urgents des PME, ONG et citoyens dans ce secteur au Sénégal et propose une offre concrète Sen-E-Carte avec prix FCFA et angle de publication LinkedIn.",
    icon: Compass,
    accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  {
    id: "sene-video-vision-analyst",
    name: "Aminata Ndiaye",
    role: "Analyste vidéo multimodale & tendances réseaux",
    channels: "YouTube · TikTok · Reels",
    defaultTargets: [
      "youtube_senecarte",
      "instagram_senecarte",
      "facebook_senecarte",
    ],
    defaultInstruction:
      "Propose les 3 meilleurs angles vidéo et hooks des 3 premières secondes qui convertissent le mieux au Sénégal pour ce secteur sur YouTube, Instagram Reels et Facebook.",
    icon: Video,
    accent: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
  {
    id: "sene-sales-tenders",
    name: "Ndèye Fatou Cissé",
    role: "Directrice appels d'offres & propositions B2B",
    channels: "Propositions · Closing B2B",
    defaultTargets: ["linkedin_ahmed", "linkedin_senecarte"],
    defaultInstruction:
      "Rédige une proposition commerciale B2B structurée (périmètre, planning 10 jours, budget SYSCOHADA en FCFA) + un post LinkedIn d'autorité pour Ahmed Tall.",
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
  const [instruction, setInstruction] = useState<string>(
    AGENTS[0].defaultInstruction
  );
  const [selectedTargets, setSelectedTargets] = useState<SocialChannelKey[]>(
    AGENTS[0].defaultTargets
  );
  const [running, setRunning] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [toastMsg, setToastMsg] = useState<string>("");
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

  const activeAgent =
    AGENTS.find((a) => a.id === selectedAgentId) || AGENTS[0];

  const handleSelectAgent = (ag: AgentCard) => {
    setSelectedAgentId(ag.id);
    setInstruction(ag.defaultInstruction);
    setSelectedTargets(ag.defaultTargets);
    setError("");
  };

  const toggleTarget = (key: SocialChannelKey) => {
    setSelectedTargets((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleRunMission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;
    setRunning(true);
    setError("");
    try {
      const targetLabels = SOCIAL_DESTINATIONS.filter((d) =>
        selectedTargets.includes(d.key)
      )
        .map((d) => d.label)
        .join(", ");

      const enrichedInstruction = targetLabels
        ? `${instruction}\n\nRéseaux cibles pour publication : ${targetLabels}.`
        : instruction;

      const res = await fetch("/api/super-admin/run-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentId: selectedAgentId,
          sector,
          instruction: enrichedInstruction,
          sendEmailCopy: false,
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
          targetChannels:
            selectedTargets.length > 0
              ? [...selectedTargets]
              : activeAgent.defaultTargets,
          publishedChannels: [],
        };
        setLogs((prev) => [entry, ...prev]);
        setToastMsg(
          `Livrable prêt ! Cliquez ci-dessous pour publier directement sur les réseaux Sen-E-Carte et le LinkedIn d'Ahmed Tall.`
        );
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

  const handlePublishToChannel = (
    log: MissionLog,
    dest: SocialDestination
  ) => {
    navigator.clipboard?.writeText(log.output).catch(() => {});
    const publishUrl = dest.buildPublishUrl(log.output);
    window.open(publishUrl, "_blank", "noopener,noreferrer");

    setLogs((prev) =>
      prev.map((item) => {
        if (item.id !== log.id) return item;
        const already = item.publishedChannels || [];
        return {
          ...item,
          publishedChannels: already.includes(dest.key)
            ? already
            : [...already, dest.key],
        };
      })
    );

    setToastMsg(
      `Texte copié dans le presse-papiers et ouverture de ${dest.label}. Collez ou validez directement votre publication !`
    );
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="rounded-3xl bg-[#071A30] text-white p-6 sm:p-8 space-y-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
            <span>5 agents configurés · En veille · Diffusion directe réseaux Sen-E-Carte &amp; LinkedIn Ahmed Tall</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold">
            Équipe agents réseaux sociaux, LinkedIn B2B &amp; marketing
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Sélectionnez un agent, cochez les comptes officiels cibles et donnez votre instruction : l&apos;agent prépare le contenu et vous propose de le publier en 1 clic sur les réseaux sociaux de Sen-E-Carte et le LinkedIn d&apos;Ahmed Tall.
          </p>
        </div>

        {/* Accès direct aux 6 comptes officiels connectés */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          <span className="text-[11px] font-bold text-sky-300 inline-flex items-center gap-1.5 mr-1">
            <Globe className="w-3.5 h-3.5" />
            Comptes officiels reliés :
          </span>
          {SOCIAL_DESTINATIONS.map((dest) => (
            <a
              key={dest.key}
              href={dest.profileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] font-bold text-white transition-colors"
            >
              <span>{dest.shortLabel}</span>
              <ExternalLink className="w-3 h-3 text-emerald-300" />
            </a>
          ))}
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
                      selected
                        ? "bg-sky-500/20 border-sky-400/40 text-emerald-300"
                        : ag.accent
                    }`}
                  >
                    <ag.icon className="w-4 h-4" />
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Prêt
                  </span>
                </div>
                <div className="text-xs font-extrabold leading-snug">
                  {ag.name}
                </div>
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
                  selected
                    ? "border-white/10 text-sky-300"
                    : "border-slate-100 text-sky-700"
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
          <div className="lg:col-span-5 space-y-3">
            <div>
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

            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                Réseaux cibles proposés pour publication
              </label>
              <div className="flex flex-wrap gap-1.5">
                {SOCIAL_DESTINATIONS.map((dest) => {
                  const checked = selectedTargets.includes(dest.key);
                  return (
                    <button
                      key={dest.key}
                      type="button"
                      onClick={() => toggleTarget(dest.key)}
                      className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                        checked
                          ? "bg-[#071A30] text-emerald-300 border-[#071A30]"
                          : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {checked ? "✓ " : "+ "}
                      {dest.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
              Votre instruction pour {activeAgent.name}
            </label>
            <textarea
              rows={5}
              required
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Décrivez précisément le post, le script vidéo, la prospection ou la proposition attendue..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="text-[11px] font-medium text-slate-500">
            Le livrable s&apos;affiche ci-dessous avec les boutons d&apos;envoi direct vers les réseaux sociaux Sen-E-Carte et le LinkedIn d&apos;Ahmed Tall.
          </div>

          <button
            type="submit"
            disabled={running}
            className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
          >
            {running ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>
              {running
                ? "Exécution en cours..."
                : "Exécuter la mission maintenant"}
            </span>
          </button>
        </div>

        {toastMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
            {toastMsg}
          </div>
        )}

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
              className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#071A30] text-emerald-300 text-xs font-extrabold">
                    {log.agentName}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                    {log.channel}
                  </span>
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

              {/* Proposition directe d'envoi sur les réseaux sociaux Sen-E-Carte & LinkedIn Ahmed Tall */}
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
                    <Share2 className="w-3.5 h-3.5 text-sky-700" />
                    <span>
                      Publier ce livrable sur les réseaux sociaux Sen-E-Carte &amp; LinkedIn Ahmed Tall :
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(log.id, log.output)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-extrabold cursor-pointer"
                  >
                    {copiedId === log.id ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {copiedId === log.id ? "Copié !" : "Copier le texte"}
                    </span>
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {SOCIAL_DESTINATIONS.map((dest) => {
                    const isPublished = (log.publishedChannels || []).includes(
                      dest.key
                    );
                    const isRecommended = (log.targetChannels || []).includes(
                      dest.key
                    );
                    return (
                      <button
                        key={dest.key}
                        type="button"
                        onClick={() => handlePublishToChannel(log, dest)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                          isPublished
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : dest.colorClass
                        } ${isRecommended ? "ring-2 ring-offset-1 ring-amber-400" : "opacity-90 hover:opacity-100"}`}
                      >
                        {isPublished ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <ExternalLink className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {isPublished
                            ? `Ouvert · ${dest.shortLabel}`
                            : `Publier sur ${dest.shortLabel}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-slate-600">
                  Un clic copie automatiquement le texte dans votre presse-papiers et ouvre directement le compte officiel (LinkedIn Ahmed Tall, LinkedIn Sen-E-Carte, X, Facebook, Instagram ou YouTube).
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
