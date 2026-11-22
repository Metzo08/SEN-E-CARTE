import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, CreditCard, ArrowRight } from "lucide-react";
import { PRICING_PLANS, SITE_CONFIG } from "@/data/senecarteData";
import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata: Metadata = {
  title: "Tarifs FCFA & configurateur de devis instantané",
  description:
    "Découvrez nos tarifs transparents en FCFA pour les cartes NFC, cartes santé IPM, cartes scolaires CMU, logiciels métiers ASUFOR/SYSCOHADA et projets sen-e-carte.",
};

export default function TarifsPage() {
  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Aurora */}
      <section className="hero-grid text-white py-14 sm:py-20 border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold">
              Tarification transparente en FCFA
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Des offres adaptées aux{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Professionnels, écoles, IPM et entreprises
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Paiement flexible par Wave Sénégal, Orange Money, Free Money ou virement bancaire avec facture conforme SYSCOHADA et remises volume automatiques dès 20 cartes.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/commander"
                className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-brand-950 font-extrabold text-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>Commander en ligne (Wave / OM)</span>
              </Link>
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm"
              >
                <span>Explorer les 15 applications SaaS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-sky-400/35 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/illustrations/mobile-money.jpg"
                alt="Cartes intelligentes QR-NFC et paiement mobile Money Sen-E-Carte"
                className="w-full h-60 sm:h-68 object-cover"
              />
              <div className="laser-scan-line" />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all ${
                plan.highlight
                  ? "hero-grid text-white border-2 border-emerald-400 shadow-2xl scale-[1.01]"
                  : "bento-card text-slate-900"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-xl font-extrabold">{plan.name}</h2>
                  {plan.highlight && (
                    <span className="px-3 py-1 rounded-full bg-emerald-400 text-brand-950 text-[11px] font-extrabold">
                      Le plus choisi
                    </span>
                  )}
                </div>
                <p className={`text-xs ${plan.highlight ? "text-sky-300" : "text-slate-500"}`}>
                  {plan.subtitle}
                </p>
                <div className="pt-1">
                  <div className="text-3xl font-black tabular-nums">{plan.price}</div>
                  <div className={`text-xs mt-1 ${plan.highlight ? "text-slate-300" : "text-slate-500"}`}>
                    {plan.period}
                  </div>
                </div>
                <ul className="space-y-2.5 pt-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-xs sm:text-sm">
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          plan.highlight ? "text-emerald-400" : "text-emerald-600"
                        }`}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 space-y-2.5">
                <Link
                  href="/commander"
                  className={`w-full inline-flex items-center justify-center px-5 py-3.5 rounded-2xl font-extrabold text-sm ${
                    plan.highlight
                      ? "btn-glow-emerald text-brand-950"
                      : "btn-glow-navy text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                    `Bonjour Ahmed TALL (Sen-E-Carte), je souhaite commander : ${plan.name}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl font-bold text-xs ${
                    plan.highlight
                      ? "bg-white/10 hover:bg-white/20 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  Parler à un conseiller WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        <QuoteCalculator />
      </div>
    </div>
  );
}
