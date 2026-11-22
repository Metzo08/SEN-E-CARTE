"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { SOLUTIONS, SITE_CONFIG, SOLUTION_IMAGES } from "@/data/senecarteData";

export default function InteractiveSolutionFinder() {
  const [activeSlug, setActiveSlug] = useState(SOLUTIONS[0].slug);
  const current = SOLUTIONS.find((s) => s.slug === activeSlug) || SOLUTIONS[0];

  return (
    <div className="bento-card rounded-3xl overflow-hidden">
      <div className="hero-grid text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-500/20">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold mb-2">
            Trouvez votre solution Sen-E-Carte en 1 clic
          </span>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Quel est votre secteur ou votre besoin prioritaire ?
          </h2>
        </div>
        <span className="text-xs font-bold text-emerald-400">
          Sélectionnez un onglet ci-dessous
        </span>
      </div>

      {/* Onglets secteurs */}
      <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-wrap gap-2">
        {SOLUTIONS.map((sol) => (
          <button
            key={sol.slug}
            type="button"
            onClick={() => setActiveSlug(sol.slug)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-colors ${
              activeSlug === sol.slug
                ? "btn-glow-navy text-sky-300 shadow-md"
                : "bg-white text-slate-700 border border-slate-200 hover:border-sky-400 hover:text-sky-700"
            }`}
          >
            {sol.shortTitle}
          </button>
        ))}
      </div>

      {/* Panneau de réponse dynamique */}
      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-extrabold">
              {current.badge}
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold">
              {current.priceFrom}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
            {current.title}
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">{current.tagline}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {current.features.slice(0, 4).map((f) => (
              <div
                key={f}
                className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl hero-grid text-white overflow-hidden border border-sky-400/30 shadow-xl">
          <div className="relative h-40 w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={SOLUTION_IMAGES[current.slug] || "/images/illustrations/saas-erp-ia.jpg"}
              alt={current.title}
              className="w-full h-full object-cover"
            />
            <div className="laser-scan-line" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/20 to-transparent" />
          </div>
          <div className="p-6 space-y-4">
            <div className="text-xs font-extrabold tracking-wider text-sky-300">
              Cas concrets déployables
            </div>
            <div className="space-y-2.5">
              {current.useCases.map((uc) => (
                <div key={uc.title} className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-xs font-extrabold text-white">{uc.title}</div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <Link
                href={`/solutions/${current.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-brand-950 font-extrabold text-xs hover:bg-sky-50 transition-colors"
              >
                <span>Voir la fiche</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  `Bonjour Ahmed TALL (Sen-E-Carte), je souhaite en savoir plus sur : ${current.title}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn-glow-emerald flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-brand-950 font-extrabold text-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Devis WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
