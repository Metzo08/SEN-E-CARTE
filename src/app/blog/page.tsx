import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, ArrowRight, Sparkles } from "lucide-react";
import { SEO_ARTICLES } from "@/data/senecarteData";
import JicaShowcaseSection from "@/components/JicaShowcaseSection";

export const metadata: Metadata = {
  title: "Ressources, guides SEO & actualités digitales Sénégal",
  description:
    "Guides pratiques Sen-E-Carte sur la digitalisation des IPM, les cartes scolaires CMU, la facturation d'eau des forages ASUFOR et les cartes de visite NFC au Sénégal.",
};

const ARTICLE_IMAGES = [
  "/images/illustrations/sante-ipm.jpg",
  "/images/illustrations/scolaire-cmu.jpg",
  "/images/illustrations/saas-erp-ia.jpg",
  "/images/illustrations/business-nfc.jpg",
];

export default function BlogPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <section className="hero-grid text-white py-14 sm:py-18 border-b border-sky-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/35 text-sky-300 text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" /> Hub éditorial &amp; ressources · Sen-E-Carte
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Guides pratiques de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
              Transformation digitale au Sénégal
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Analyses terrain sur la e-Santé (IPM/CMU), l&apos;éducation numérique, la gestion des forages ASUFOR et les cartes intelligentes QR/NFC.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Reportage à la une : Rencontre Sen-E-Carte × JICA à Dakar */}
        <JicaShowcaseSection />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SEO_ARTICLES.map((art, idx) => (
            <article
              key={art.slug}
              className="bento-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden bg-brand-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ARTICLE_IMAGES[idx % ARTICLE_IMAGES.length]}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs font-bold">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 shadow">
                      {art.category}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-brand-950/80 text-sky-300">
                      {art.date} · {art.readTime}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-950 leading-snug group-hover:text-sky-700 transition-colors">
                    {art.title}
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">{art.excerpt}</p>
                </div>
              </div>

              <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 hover:text-emerald-800"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Demander une démonstration sur ce sujet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
