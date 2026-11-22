"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe2,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const JICA_PHOTOS = [
  {
    src: "/images/jica/jica-dakar-1.jpg",
    title: "Rencontre officielle Sen-E-Carte × JICA à Dakar",
    caption:
      "Ahmed TALL, Mme Miki Matsuô (Responsable des technologies numériques à la JICA) et les dirigeants de l'Union Départementale des Mutuelles de Santé Communautaires de Dakar.",
  },
  {
    src: "/images/jica/jica-dakar-3.jpg",
    title: "Séance de démonstration technique & projection",
    caption:
      "Présentation en direct des cartes de santé numériques QR dynamique, cartes scolaires sanitaires et dispositifs CMU / CMUDAARA.",
  },
  {
    src: "/images/jica/jica-dakar-2.jpg",
    title: "Délégation conjointe santé numérique & mutuelles",
    caption:
      "Synergie entre l'expertise technologique privée de Sen-E-Carte, la coopération japonaise (JICA) et le réseau des mutuelles communautaires.",
  },
];

export default function JicaShowcaseSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentPhoto = JICA_PHOTOS[activeIdx] || JICA_PHOTOS[0];

  return (
    <div className="bento-card rounded-3xl overflow-hidden border border-sky-200/80">
      {/* Bandeau supérieur Aurora */}
      <div className="hero-grid text-white p-6 sm:p-10 border-b border-sky-500/25">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <Globe2 className="w-3.5 h-3.5" /> Coopération internationale · JICA × Sen-E-Carte
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-sky-200 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5" /> Juin 2025
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Dakar, Sénégal
            </span>
          </div>

          {/* Logos officiels Sen-E-Carte, JICA & UDMSDK */}
          <div className="flex items-center gap-2.5">
            {[
              { src: "/images/logo-sen-e-carte.png", alt: "Sen-E-Carte" },
              { src: "/images/logos/logo-jica.png", alt: "JICA" },
              { src: "/images/logos/logo-udmsdk.png", alt: "UDMSDK Mutuelles de Dakar" },
            ].map((lg) => (
              <div
                key={lg.alt}
                title={lg.alt}
                className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lg.src}
                  alt={lg.alt}
                  className="w-full h-full object-contain"
                  style={{ outline: "none" }}
                />
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Sen‑E‑Carte et JICA à Dakar :{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
            Vers une santé numérique inclusive et axée genre
          </span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed max-w-4xl">
          Mercredi 11 juin 2025, <strong>Sen‑E‑Carte</strong> a reçu à Dakar{" "}
          <strong>Mme Miki Matsuô</strong>, Responsable des technologies numériques à la{" "}
          <strong>JICA (agence japonaise de coopération internationale)</strong>, pour un entretien axé sur
          l&apos;enquête de collecte de données sur le genre et le vieillissement, dans le cadre de la{" "}
          <strong>Couverture sanitaire universelle (CSU) en Afrique</strong>.
        </p>
      </div>

      {/* Corps principal : Galerie Photos Interactives + Contenu Détaillé */}
      <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-white">
        {/* Colonne Gauche : Galerie Photos Réelles de la Rencontre */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-2xl overflow-hidden bg-brand-950 border-2 border-slate-200 shadow-xl aspect-[4/3]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentPhoto.src}
              alt={currentPhoto.title}
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-950/95 via-brand-950/60 to-transparent p-4 sm:p-5 text-white">
              <div className="text-xs font-extrabold text-emerald-300">{currentPhoto.title}</div>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{currentPhoto.caption}</p>
            </div>
          </div>

          {/* Miniatures cliquables */}
          <div className="grid grid-cols-3 gap-3">
            {JICA_PHOTOS.map((photo, idx) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`group relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all ${
                  activeIdx === idx
                    ? "border-sky-500 ring-2 ring-sky-400/40 scale-[1.02]"
                    : "border-slate-200 opacity-75 hover:opacity-100"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Colonne Droite : Innovations présentées, Échanges & Prochaines Étapes */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-start gap-3">
            <Users className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
              Aux côtés de l&apos;<strong>Union départementale des mutuelles de santé communautaires de Dakar</strong>,
              nous avons présenté nos deux innovations phares pour la couverture sanitaire universelle :
            </p>
          </div>

          {/* Les 2 innovations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-950">
                <QrCode className="w-4 h-4 text-emerald-600" />
                <span>Carte de santé numérique</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                QR code dynamique pour authentification sécurisée, traçabilité des soins et parfaite interopérabilité
                avec les systèmes de santé.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-brand-950">
                <ShieldCheck className="w-4 h-4 text-sky-600" />
                <span>Carte de santé scolaire</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                QR code dynamique associé à un carnet virtuel de couverture sanitaire de l&apos;élève, permettant un
                suivi continu, notamment pour les populations vulnérables.
              </p>
            </div>
          </div>

          {/* Synthèse des échanges */}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Les échanges ont porté sur l&apos;intégration de ces outils numériques à la{" "}
            <strong>Collecte de données sensibles (genre, vieillissement)</strong>, leur rôle de facilitateur pour
            atteindre la CSU, et l&apos;apport des structures privées innovantes au dispositif institutionnel en place.
          </p>

          {/* Prochaines étapes programmées */}
          <div className="rounded-2xl bg-brand-950 text-white p-5 space-y-3 border border-sky-500/25">
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
              <Sparkles className="w-4 h-4" />
              <span>Prochaines étapes programmées</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-200">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Tester les solutions sur le terrain avec les mutuelles et structures partenaires</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Évaluer leur contribution opérationnelle aux enquêtes JICA</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Renforcer les partenariats technologiques et communautaires autour de la santé numérique</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/portail-ipm"
              className="btn-glow-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm"
            >
              <span>Tester la carte santé &amp; le portail IPM</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/solutions/carte-scolaire-cmu"
              className="btn-glow-navy inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white font-bold text-xs sm:text-sm"
            >
              <span>Découvrir la carte de santé scolaire</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
