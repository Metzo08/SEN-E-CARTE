import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  CreditCard,
  Bot,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Cpu,
  TrendingUp,
  Globe2,
  Scale,
  Layers,
  Calculator,
  BookOpen,
} from "lucide-react";
import {
  SITE_CONFIG,
  SOLUTIONS,
  INSTITUTIONAL_PARTNERS,
  SOLUTION_IMAGES,
} from "@/data/senecarteData";
import AnimatedCounter from "@/components/AnimatedCounter";
import SenECarteVideoCinema from "@/components/SenECarteVideoCinema";

export default function HomePage() {
  return (
    <div className="bg-slate-50">
      {/* 1. HERO CINÉMATIQUE « ÈRE NUMÉRIQUE » */}
      <section className="relative bg-brand-950 text-white overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/illustrations/hero-wow.jpg"
            alt="Carte intelligente Sen-E-Carte NFC et QR entourée de solutions santé, éducation, paiement et data"
            className="w-full h-full object-cover object-right animate-[heroZoom_22s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071a30] via-[#071a30]/85 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-50 via-[#071a30]/40 to-transparent" />
        </div>

        {/* Badges flottants en verre */}
        <div className="hidden lg:block absolute right-[6%] top-[18%] z-10 animate-float-slow">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
            <span className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-300" />
            </span>
            <div>
              <div className="text-[11px] text-slate-300">Scan NFC vérifié</div>
              <div className="text-sm font-extrabold">Droits IPM actifs · 0,8 s</div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block absolute right-[30%] bottom-[20%] z-10 animate-float-delayed">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
            <span className="w-9 h-9 rounded-xl bg-sky-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-sky-300" />
            </span>
            <div>
              <div className="text-[11px] text-slate-300">Paiement reçu</div>
              <div className="text-sm font-extrabold">Wave · 15 000 FCFA</div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block absolute right-[4%] bottom-[14%] z-10 animate-float-slow">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-2xl">
            <span className="w-9 h-9 rounded-xl bg-amber-400/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="text-[11px] text-slate-300">Assistant IA FR/Wolof</div>
              <div className="text-sm font-extrabold">Réponse en direct · 24/7</div>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="glass inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-bold text-emerald-200">
              <span className="live-dot" />
              <span>Plateforme SaaS · cartes QR-NFC · legaltech · IA au Sénégal</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.03]">
              Le numérique qui{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
                Transforme chaque métier
              </span>{" "}
              en un scan.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              <strong className="text-white">Sen-E-Carte</strong> Conçoit des cartes intelligentes NFC/QR, des plateformes SaaS métiers et des agents IA pour la santé, la justice, l&apos;éducation, les ONG, l&apos;eau, le BTP et les entreprises.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/solutions" className="btn-neon">
                <Sparkles className="w-4 h-4" />
                <span>Explorer nos solutions</span>
              </Link>
              <Link href="/commander" className="btn-ghost-glow">
                <CreditCard className="w-4 h-4 text-sky-300" />
                <span>Commander (Wave / OM)</span>
              </Link>
              <Link href="/portail-ipm" className="btn-ghost-glow">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                <span>Portail IPM</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Conformité HIPAA, RGPD &amp; CDP
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sans application à installer
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Support WhatsApp {SITE_CONFIG.phone}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CHIFFRES CLÉS ANIMÉS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        <div className="glass-light gradient-border rounded-[28px] shadow-2xl shadow-sky-900/10 p-3 sm:p-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { to: 11, suffix: " secteurs", label: "Santé, justice, éducation, BTP, eau, IA…" },
            { to: 15, suffix: " applications", label: "Plateformes actives ou sur-mesure" },
            { to: 20, suffix: "+ partenaires", label: "JICA, ANACMU, Transform Health, INSPIR…" },
            { to: 24, suffix: "/7", label: "Agent IA de prospection autonome" },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl bg-white/85 border border-white px-4 py-4 text-center"
            >
              <div className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-900 via-sky-600 to-emerald-600">
                <AnimatedCounter to={k.to} suffix={k.suffix} />
              </div>
              <div className="text-xs font-semibold text-slate-600 mt-1">{k.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BANDEAU PARTENAIRES OFFICIELS (1 LIGNE COMPACTE & FLUIDE) */}
      <section className="pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div className="text-xs sm:text-sm font-bold text-slate-600">
            Déployé aux côtés d&apos;institutions nationales, internationales &amp; entreprises leaders
          </div>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-sky-700 hover:text-sky-900 shrink-0"
          >
            <span>Voir toutes nos réalisations &amp; partenaires</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="marquee overflow-hidden py-1">
          <div className="marquee-track gap-3">
            {[...INSTITUTIONAL_PARTNERS, ...INSTITUTIONAL_PARTNERS].map((p, i) => (
              <Link
                key={`${p.name}-${i}`}
                href="/realisations"
                className="shrink-0 inline-flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-sky-400 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-slate-50 p-1 flex items-center justify-center shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="w-full h-full object-contain"
                    style={{ outline: "none" }}
                  />
                </div>
                <span className="text-xs font-extrabold text-slate-800 whitespace-nowrap">
                  {p.name.split("(")[0].split("·")[0].trim()}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FILMS STUDIO MOTION DESIGN SEN-E-CARTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <SenECarteVideoCinema />
      </section>

      {/* 5. TEMPS FORTS RÉALISATIONS (ACCÈS RAPIDE VERS /realisations) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-7">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-sky-100 text-sky-800 text-xs font-bold mb-2">
              Preuves terrain · Sénégal &amp; international
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              Nos réalisations phares en production
            </h2>
          </div>
          <Link
            href="/realisations"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Ouvrir le portefeuille complet (10 plateformes)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Carte 1 : JICA Dakar */}
          <Link
            href="/realisations#jica-dakar"
            className="group rounded-3xl bg-white border border-slate-200 hover:border-sky-500 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-brand-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/jica/jica-dakar-1.jpg"
                  alt="Rencontre officielle Sen-E-Carte et JICA à Dakar"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/85 text-emerald-300 text-[11px] font-bold backdrop-blur-md">
                  <Globe2 className="w-3.5 h-3.5" /> Coopération JICA · juin 2025
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-sky-700 transition-colors">
                  Sen-E-Carte &amp; JICA à Dakar
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Rencontre officielle avec Mme Miki Matsuô et l&apos;UDMSDK pour une santé numérique inclusive, axée genre et couverture sanitaire universelle.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-3 border-t border-slate-100 text-xs font-extrabold text-sky-700 inline-flex items-center gap-1.5">
              <span>Voir les photos &amp; le compte-rendu</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Carte 2 : LegalTech Avocats */}
          <Link
            href="/realisations#legaltech"
            className="group rounded-3xl bg-white border border-slate-200 hover:border-amber-500 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-brand-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/illustrations/legaltech-avocat.jpg"
                  alt="Plateforme legaltech OCR pour cabinet maître Ibrahima Mbengue"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/85 text-amber-300 text-[11px] font-bold backdrop-blur-md">
                  <Scale className="w-3.5 h-3.5" /> Legaltech avocats · OCR
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-amber-700 transition-colors">
                  Cabinet maître Ibrahima Mbengue
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Numérisation OCR instantanée des dossiers juridiques et agenda numérique des audiences avec rappels automatiques anti-oubli.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-3 border-t border-slate-100 text-xs font-extrabold text-amber-700 inline-flex items-center gap-1.5">
              <span>Tester le simulateur OCR &amp; agenda</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Carte 3 : 10 Plateformes actives */}
          <Link
            href="/realisations#realisations"
            className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-brand-950">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/illustrations/saas-erp-ia.jpg"
                  alt="10 plateformes réalisées par Sen-E-Carte au Sénégal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-950/85 text-sky-300 text-[11px] font-bold backdrop-blur-md">
                  <Layers className="w-3.5 h-3.5" /> 10 plateformes actives
                </span>
              </div>
              <div className="p-6 space-y-2">
                <h3 className="text-lg font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">
                  Santé, BTP, coaching &amp; agritech
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  SenMutuelles, INSPIR Sénégal, Dada studio, fermes des Niayes, écosystème Magatte Niang (7 entités) et coopérative Mariama Sagna.
                </p>
              </div>
            </div>
            <div className="px-6 pb-5 pt-3 border-t border-slate-100 text-xs font-extrabold text-emerald-700 inline-flex items-center gap-1.5">
              <span>Explorer les 10 réalisations</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 6. LES 6 PÔLES DE SOLUTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
              Écosystème complet Sen-E-Carte
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
              6 pôles technologiques pour digitaliser votre activité
            </h2>
          </div>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-emerald-700 hover:text-emerald-800"
          >
            <span>Explorer les 11 secteurs &amp; le sélecteur interactif</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol) => (
            <Link
              key={sol.slug}
              href={`/solutions/${sol.slug}`}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-emerald-500 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-40 w-full overflow-hidden bg-brand-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={SOLUTION_IMAGES[sol.slug] || "/images/illustrations/saas-erp-ia.jpg"}
                    alt={sol.shortTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-white/95 text-brand-950 text-[11px] font-bold shadow">
                      {sol.badge}
                    </span>
                    {sol.isNew && (
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-brand-950 text-[10px] font-extrabold shadow">
                        Nouveau
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-base sm:text-lg font-extrabold text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {sol.shortTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                    {sol.tagline}
                  </p>
                </div>
              </div>
              <div className="px-5 pb-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">{sol.priceFrom}</span>
                <span className="text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Détails <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 7. BANDEAU FINAL : AGENT IA 24/7, DEVIS & RESSOURCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20">
        <div className="rounded-3xl bg-brand-950 hero-grid text-white p-7 sm:p-11 border border-sky-500/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
              <Bot className="w-4 h-4" />
              Moteur IA 24/7 &amp; devis instantané
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Prêt à digitaliser votre organisation avec Sen-E-Carte ?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Estimez votre budget en 30 secondes sur notre configurateur, commandez vos cartes NFC/QR par Wave ou Orange Money, ou activez notre agent chasseur IA 24/7.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/commander"
                className="btn-glow-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-brand-950 font-extrabold text-sm"
              >
                <CreditCard className="w-4 h-4" />
                <span>Commander en ligne</span>
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-sm transition-colors"
              >
                <Calculator className="w-4 h-4 text-sky-300" />
                <span>Simulateur de devis</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href="/app"
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors space-y-1.5"
            >
              <Cpu className="w-5 h-5 text-sky-400" />
              <div className="font-bold text-white">Hub des 15 apps SaaS</div>
              <p className="text-slate-400 leading-relaxed">
                Testez notre studio cartes QR/NFC et nos outils métiers.
              </p>
            </Link>
            <Link
              href="/blog"
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors space-y-1.5"
            >
              <BookOpen className="w-5 h-5 text-emerald-400" />
              <div className="font-bold text-white">Guides &amp; actualités</div>
              <p className="text-slate-400 leading-relaxed">
                Articles pratiques sur les IPM, CMU, legaltech et ERP.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
