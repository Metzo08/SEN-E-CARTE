"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  Play,
  Film,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
  Volume2,
  Layers,
  Globe2,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

interface StudioVideo {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  duration: string;
  voice: string;
  src: string;
  poster: string;
  highlights: string[];
  chapters: { label: string; time: number }[];
}

const STUDIO_VIDEOS: StudioVideo[] = [
  {
    id: "ecosysteme-2026",
    badge: "Film officiel 01 · écosystème 2026",
    title: "Une carte intelligente. Onze secteurs digitalisés.",
    subtitle:
      "Cartes NFC & QR dynamiques, portail santé & IPM anti-fraude, legaltech OCR pour cabinets d'avocats, ERP métiers, paiements Wave / Orange Money et agent IA 24/7.",
    duration: "0:53",
    voice: "Voix studio FR · HD 720p",
    src: "/videos/sen-e-carte-ecosysteme-2026.mp4",
    poster: "/videos/poster-ecosysteme.jpg",
    highlights: [
      "Vérification instantanée des droits IPM, lettres de garantie & bons pharmacie",
      "OCR juridique & agenda d'audiences anti-oubli (cabinet maître Ibrahima Mbengue)",
      "11 secteurs : santé, éducation, BTP, eau ASUFOR, hôtellerie, agritech & ERP",
    ],
    chapters: [
      { label: "01 · cartes NFC & QR", time: 0 },
      { label: "02 · santé & IPM", time: 9 },
      { label: "03 · legaltech avocats", time: 19 },
      { label: "04 · 11 secteurs", time: 28 },
      { label: "05 · mobile Money & IA", time: 37 },
    ],
  },
  {
    id: "impact-jica-realisations",
    badge: "Film officiel 02 · impact & réalisations",
    title: "De la rencontre JICA à Dakar aux plateformes en production",
    subtitle:
      "Plongez au cœur de notre rencontre officielle avec la JICA autour de la couverture sanitaire universelle et découvrez nos 10 plateformes actives au Sénégal.",
    duration: "0:39",
    voice: "Voix studio FR · HD 720p",
    src: "/videos/sen-e-carte-impact-jica-realisations.mp4",
    poster: "/videos/poster-impact.jpg",
    highlights: [
      "Rencontre JICA Dakar & UDMSDK : santé numérique inclusive, genre & CSU",
      "Plateformes actives : SenMutuelles, INSPIR Sénégal, Dada studio, fermes des Niayes",
      "Écosystème BTP Magatte Niang (7 entités) & coopérative Mariama Sagna",
    ],
    chapters: [
      { label: "01 · JICA à Dakar", time: 0 },
      { label: "02 · CSU & IA wolof", time: 9 },
      { label: "03 · 10 plateformes", time: 17 },
      { label: "04 · rejoindre Sen-E-Carte", time: 28 },
    ],
  },
];

interface Props {
  compact?: boolean;
}

export default function SenECarteVideoCinema({ compact = false }: Props) {
  const [activeId, setActiveId] = useState<string>(STUDIO_VIDEOS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideo =
    STUDIO_VIDEOS.find((v) => v.id === activeId) ?? STUDIO_VIDEOS[0];

  const handleSelectVideo = (id: string) => {
    if (id === activeId) return;
    setActiveId(id);
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handlePlayNow = () => {
    if (!videoRef.current) return;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  const handleSeek = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = seconds;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <div
      id="videos-studio"
      className="relative rounded-3xl bg-brand-950 text-white border border-sky-500/30 shadow-2xl overflow-hidden scroll-mt-24"
    >
      {/* Effets lumineux Aurora en arrière-plan */}
      <div
        className="pointer-events-none absolute -top-32 -left-24 w-80 h-80 rounded-full bg-sky-500/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 w-96 h-96 rounded-full bg-emerald-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative p-6 sm:p-8 lg:p-10 space-y-6">
        {/* En-tête + sélecteur de films */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>Studio motion design · Sen-E-Carte 2026</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Découvrez nos solutions &amp; réalisations en vidéo
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Deux films originaux en motion design avec voix studio pour explorer en moins d&apos;une minute nos cartes NFC/QR, notre legaltech OCR, la rencontre JICA à Dakar et nos plateformes en production.
            </p>
          </div>

          {/* Boutons de bascule entre les 2 films */}
          <div className="flex flex-wrap gap-2.5">
            {STUDIO_VIDEOS.map((vid, idx) => {
              const selected = vid.id === activeVideo.id;
              return (
                <button
                  key={vid.id}
                  type="button"
                  onClick={() => handleSelectVideo(vid.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selected
                      ? "bg-gradient-to-r from-sky-500/25 to-emerald-500/20 border-sky-400 text-white shadow-lg shadow-sky-500/15"
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/25"
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                      selected
                        ? "bg-sky-400 text-brand-950"
                        : "bg-white/10 text-slate-200"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <div className="leading-tight">
                    <div className="text-xs font-extrabold">
                      {idx === 0 ? "Écosystème 2026" : "Impact JICA & clients"}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <span>{vid.duration}</span>
                      <span>·</span>
                      <span>Audio FR</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Grille principale : Lecteur cinéma + Fiche interactive */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-center">
          {/* Lecteur vidéo 16:9 sans bandes noires */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-sky-400/40 bg-brand-950 shadow-2xl group">
              <video
                key={activeVideo.src}
                ref={videoRef}
                src={activeVideo.src}
                poster={activeVideo.poster}
                controls
                playsInline
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                className="w-full h-full object-cover"
              />

              {/* Bouton Play Cinéma centré avant lancement */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlayNow}
                  aria-label={`Lancer la vidéo : ${activeVideo.title}`}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-brand-950/35 hover:bg-brand-950/20 transition-all cursor-pointer"
                >
                  <span className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-emerald-400 text-brand-950 shadow-2xl shadow-sky-400/40 group-hover:scale-110 transition-transform">
                    <Play className="w-9 h-9 fill-brand-950 ml-1" />
                  </span>
                  <span className="mt-3 px-4 py-1.5 rounded-full bg-brand-950/85 border border-sky-400/40 text-xs font-bold text-white backdrop-blur-md flex items-center gap-2">
                    <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Lancer le film ({activeVideo.duration})</span>
                  </span>
                </button>
              )}
            </div>

            {/* Chapitres cliquables */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 mr-1">
                Chapitres :
              </span>
              {activeVideo.chapters.map((ch) => (
                <button
                  key={ch.label}
                  type="button"
                  onClick={() => handleSeek(ch.time)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-400/50 text-[11px] font-semibold text-slate-200 transition-colors cursor-pointer"
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>

          {/* Colonne éditoriale & appels à l'action */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
              <span>{activeVideo.badge}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
              {activeVideo.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeVideo.subtitle}
            </p>

            <div className="space-y-2.5 pt-1">
              {activeVideo.highlights.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-2.5 text-xs text-slate-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {!compact && (
              <div className="pt-3 flex flex-wrap gap-3">
                <Link
                  href="/commander"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-brand-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/25 transition-all"
                >
                  <span>Commander vos cartes</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    "Bonjour Sen-E-Carte, je viens de regarder votre vidéo de présentation et je souhaite une démonstration personnalisée."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Échanger sur WhatsApp</span>
                </a>
              </div>
            )}

            <div className="pt-2 border-t border-white/10 flex flex-wrap items-center gap-4 text-[11px] text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sky-400" />
                <span>{activeVideo.voice}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>www.senecarte.com</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
