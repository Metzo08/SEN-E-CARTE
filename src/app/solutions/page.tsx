import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  CreditCard,
  Headphones,
  Layers,
} from "lucide-react";
import { SOLUTIONS, SOLUTION_IMAGES } from "@/data/senecarteData";
import SectorSolutionsShowcase from "@/components/SectorSolutionsShowcase";
import InteractiveSolutionFinder from "@/components/InteractiveSolutionFinder";

export const metadata: Metadata = {
  title: "Solutions digitales, cartes QR-NFC & logiciels métiers — Sen-E-Carte",
  description:
    "Découvrez toutes les solutions Sen-E-Carte au Sénégal : cartes de santé IPM, LegalTech avocats, cartes scolaires CMU, cartes NFC pro, logiciels forages ASUFOR, ERP SYSCOHADA et studio IA.",
};

const VALUE_PILLARS = [
  {
    icon: Zap,
    title: "Déploiement rapide (48 h à 14 jours)",
    desc: "De la conception graphique à la mise en ligne, sans lourdeur technique ni application obligatoire à installer.",
    color: "text-amber-600 bg-amber-50",
  },
  {
    icon: CreditCard,
    title: "Paiement local Wave & Orange Money",
    desc: "Facturation transparente en FCFA conforme SYSCOHADA, adaptée aux PME, ONG, écoles, IPM et particuliers.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & conformité CDP Sénégal",
    desc: "Protection des données conforme à la Loi 2008-12, au RGPD et aux standards médicaux HIPAA.",
    color: "text-sky-600 bg-sky-50",
  },
  {
    icon: Headphones,
    title: "Équipe technique basée à Dakar",
    desc: "Formation sur site, assistance WhatsApp réactive et évolution continue selon vos besoins métiers.",
    color: "text-indigo-600 bg-indigo-50",
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Cinématique Solutions */}
      <section className="hero-grid text-white py-14 sm:py-20 border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Catalogue organisé par métier · Sénégal &amp; UEMOA</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Des solutions digitales{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
                concrètes, rentables et prêtes à déployer
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Cartes intelligentes QR dynamique + NFC, plateformes SaaS métiers, LegalTech OCR, ERP SYSCOHADA et agents IA : chaque solution est pensée pour faire gagner du temps, sécuriser vos opérations et accélérer votre croissance.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href="/commander"
              className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-brand-950 font-extrabold text-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Commander en ligne</span>
            </Link>
            <a
              href="#poles-solutions"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm transition-colors"
            >
              <Layers className="w-4 h-4 text-sky-300" />
              <span>Voir les 6 pôles technologiques</span>
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 4 garanties d'attractivité Sen-E-Carte */}
        <section className="-mt-8 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUE_PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="bento-card rounded-2xl p-5 space-y-2.5 bg-white"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${pillar.color}`}
              >
                <pillar.icon className="w-5 h-5" />
              </div>
              <h2 className="text-sm font-extrabold text-slate-950 leading-snug">
                {pillar.title}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </section>

        {/* 1. Explorer par secteur métier (11 secteurs) */}
        <section>
          <SectorSolutionsShowcase />
        </section>

        {/* 2. Sélecteur interactif par besoin prioritaire */}
        <section>
          <InteractiveSolutionFinder />
        </section>

        {/* 3. Nos 6 pôles technologiques détaillés */}
        <section id="poles-solutions" className="scroll-mt-24 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Offre structurée · 6 pôles d&apos;expertise
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Nos 6 pôles technologiques détaillés
              </h2>
            </div>
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-sky-700 hover:text-sky-900"
            >
              <span>Simuler mon budget en FCFA</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLUTIONS.map((sol) => (
              <div
                key={sol.slug}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-brand-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={SOLUTION_IMAGES[sol.slug] || "/images/illustrations/saas-erp-ia.jpg"}
                      alt={sol.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950/75 via-brand-950/10 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-brand-950 text-xs font-bold shadow">
                        {sol.badge}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-500 text-brand-950 text-xs font-extrabold shadow">
                        {sol.priceFrom}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                      {sol.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{sol.tagline}</p>

                    <ul className="space-y-2 pt-1">
                      {sol.features.map((f) => (
                        <li
                          key={f}
                          className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="px-6 sm:px-7 pb-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-950 hover:bg-emerald-900 text-white text-xs sm:text-sm font-bold transition-colors"
                  >
                    <span>Voir la fiche complète</span>
                    <ArrowRight className="w-4 h-4 text-emerald-400" />
                  </Link>
                  <Link
                    href="/commander"
                    className="text-xs font-extrabold text-emerald-700 hover:underline"
                  >
                    Commander cette solution →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Nouvelles solutions innovantes prêtes à développer pour le Sénégal */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5 max-w-3xl">
              <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold">
                Laboratoire d&apos;innovation · Besoins détectés au Sénégal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
                Nouvelles solutions que Sen-E-Carte déploie sur-mesure
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Conçues pour répondre aux défis concrets des PME, GIE, ONG, agences immobilières, transporteurs et structures de santé au Sénégal.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-900 shrink-0"
            >
              <span>Lancer un projet sur-mesure</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                badge: "GIE & associations",
                title: "Tontine digitale & mutuelle d'épargne (Wave / OM)",
                desc: "Suivi transparent des cotisations, tours de tirage automatisés, reçus WhatsApp et historique infalsifiable pour GIE, dahiras et entreprises.",
                delay: "Déploiement : 10 jours",
              },
              {
                badge: "Immobilier & syndics",
                title: "Gestion locative & quittances WhatsApp automatiques",
                desc: "Encaissement des loyers par Wave/Orange Money, relances automatiques des impayés, états des lieux photo et suivi des charges.",
                delay: "Déploiement : 10 jours",
              },
              {
                badge: "Transport & logistique",
                title: "Pass transport NFC, flotte GPS & suivi carburant",
                desc: "Cartes abonnés sans contact, contrôle des recettes chauffeurs, suivi des trajets GPS et alertes d'entretien véhicule.",
                delay: "Déploiement : 14 jours",
              },
              {
                badge: "Événementiel & conférences",
                title: "Billetterie QR anti-contrefaçon & badges VIP",
                desc: "Vente de billets en ligne par Mobile Money, contrôle d'accès ultra-rapide hors-ligne et bracelets/cartes cashless.",
                delay: "Déploiement : 5 jours",
              },
              {
                badge: "AgriTech & coopératives",
                title: "Traçabilité des récoltes & vente directe circuit court",
                desc: "Suivi parcellaire, fiches producteurs par QR code, gestion des intrants et boutique en ligne pour fermes et coopératives.",
                delay: "Déploiement : 12 jours",
              },
              {
                badge: "Santé & IA vocale",
                title: "Téléconsultation, carnet maternel & assistant FR/Wolof",
                desc: "Prise de rendez-vous en ligne, rappels de vaccination et suivi prénatal accessibles par la voix en français et en wolof.",
                delay: "Déploiement : 14 jours",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bento-card rounded-3xl p-6 flex flex-col justify-between space-y-4 bg-white"
              >
                <div className="space-y-2.5">
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-extrabold">
                    {item.badge}
                  </span>
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-950 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                  <span className="text-sky-700">{item.delay}</span>
                  <Link href="/contact" className="text-emerald-700 hover:underline">
                    Discuter du projet →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
