import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe2, Scale, Layers, Sparkles, CreditCard } from "lucide-react";
import { INSTITUTIONAL_PARTNERS } from "@/data/senecarteData";
import JicaShowcaseSection from "@/components/JicaShowcaseSection";
import PortfolioRealisationsShowcase from "@/components/PortfolioRealisationsShowcase";

export const metadata: Metadata = {
  title: "Réalisations, legaltech & coopération JICA — Sen-E-Carte",
  description:
    "Découvrez les plateformes réalisées par Sen-E-Carte au Sénégal : coopération JICA à Dakar, legaltech OCR cabinet maître Ibrahima Mbengue, SenMutuelles, INSPIR Sénégal, Dada studio, fermes des Niayes, Magatte Niang et GIE Mariama Sagna.",
};

export default function RealisationsPage() {
  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Cinématique Réalisations */}
      <section className="hero-grid text-white py-14 sm:py-20 border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Impact terrain &amp; plateformes en production · Sénégal &amp; UEMOA</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Nos réalisations,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
                Legaltech &amp; coopération internationale
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              De la rencontre officielle avec la JICA à Dakar aux plateformes métiers en production pour les cabinets d&apos;avocats, mutuelles de santé, groupes BTP, ONG, coaching et agroécologie.
            </p>
          </div>

          {/* Navigation rapide par ancres */}
          <div className="flex flex-wrap gap-2.5 pt-1">
            <a
              href="#jica-dakar"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-sky-500/25 border border-white/15 text-xs font-bold text-white transition-colors"
            >
              <Globe2 className="w-3.5 h-3.5 text-emerald-300" />
              <span>Rencontre JICA à Dakar</span>
            </a>
            <a
              href="#legaltech"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-amber-500/25 border border-white/15 text-xs font-bold text-white transition-colors"
            >
              <Scale className="w-3.5 h-3.5 text-amber-300" />
              <span>Legaltech avocats (OCR &amp; audiences)</span>
            </a>
            <a
              href="#realisations"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-emerald-500/25 border border-white/15 text-xs font-bold text-white transition-colors"
            >
              <Layers className="w-3.5 h-3.5 text-sky-300" />
              <span>10 plateformes en production</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* 1. Rencontre JICA à Dakar */}
        <section id="jica-dakar" className="scroll-mt-24">
          <JicaShowcaseSection />
        </section>

        {/* 2. LegalTech + Portefeuille complet des 10 plateformes */}
        <section id="realisations" className="scroll-mt-24">
          <PortfolioRealisationsShowcase />
        </section>

        {/* 3. Mur officiel des institutions & structures partenaires */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-sky-700">
                Écosystème institutionnel &amp; partenaires
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                Déployé aux côtés d&apos;institutions nationales &amp; internationales
              </h2>
            </div>
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800 shrink-0"
            >
              <span>Voir l&apos;équipe &amp; certifications</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {INSTITUTIONAL_PARTNERS.map((p) => (
              <div
                key={p.name}
                title={`${p.name} — ${p.scope}`}
                className="bento-card rounded-2xl p-4 flex flex-col items-center justify-center gap-2.5 text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center p-1.5 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-full h-full object-contain"
                    style={{ outline: "none" }}
                  />
                </div>
                <span className="text-xs font-extrabold text-slate-800 line-clamp-1">
                  {p.name.split("(")[0].split("·")[0].trim()}
                </span>
                <span className="text-[11px] text-slate-500 line-clamp-1">
                  {p.scope}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CTA final */}
        <section className="rounded-3xl bg-brand-950 hero-grid text-white p-7 sm:p-10 border border-sky-500/30 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Vous avez un projet digital, legaltech, santé ou carte NFC/QR ?
            </h2>
            <p className="text-sm text-slate-300">
              Notre équipe à Dakar vous accompagne du cahier des charges jusqu&apos;au déploiement terrain avec paiement Wave / Orange Money et support continu.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/commander"
              className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-brand-950 font-extrabold text-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Commander en ligne</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm transition-colors"
            >
              <span>Nous contacter</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
