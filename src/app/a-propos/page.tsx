import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, QrCode, Wifi, CheckCircle2, ArrowRight, Award, Globe2 } from "lucide-react";
import { SITE_CONFIG, FOUNDER_ACHIEVEMENTS, FOUNDER_CERTIFICATIONS } from "@/data/senecarteData";
import JicaShowcaseSection from "@/components/JicaShowcaseSection";
import PortfolioRealisationsShowcase from "@/components/PortfolioRealisationsShowcase";
import SenECarteVideoCinema from "@/components/SenECarteVideoCinema";

export const metadata: Metadata = {
  title: "À propos & équipe fondatrice — Sen-E-Carte Sénégal",
  description:
    "Découvrez la mission, l'équipe fondatrice (Ahmed Tall, Léonard Mandione, Awa Ndiongue, Sellé Thiam), les technologies QR dynamique & NFC et la conformité HIPAA / RGPD / CDP de sen-e-carte.",
};

const TEAM = [
  {
    name: "Ahmed Tall",
    title: "Fondateur de Sen-E-Carte",
    cell: "Directeur de la cellule développement web, conception de cartes numériques et digitalisation sanitaire",
    bio: "Développeur web et mobile, concepteur de carte de santé numérique, spécialiste en digitalisation des structures de santé et de protection sociale.",
    photo: "/images/team/ahmed-tall.webp",
    linkedin: SITE_CONFIG.founder.linkedin,
  },
  {
    name: "Léonard Mandione",
    title: "Co-fondateur de Sen-E-Carte",
    cell: "Directeur de la cellule infographies et impressions des cartes numériques",
    bio: "Administrateur de l'éducation et de la formation, directeur d'établissement scolaire « clef du savoir », directeur de l'entreprise immobilière et multiservices EXIM BE CENTER.",
    photo: "/images/team/leonard-mandione.webp",
  },
  {
    name: "Awa Ndiongue",
    title: "Collaboratrice de Sen-E-Carte",
    cell: "Responsable opérations numériques, développement solutions métiers & formation",
    bio: "Chargée des opérations numériques et administratives, développeuse solutions métiers, organisation du déploiement terrain et formation des institutions clientes.",
    photo: "/images/team/awa-ndiongue.png",
  },
  {
    name: "Sellé Thiam",
    title: "Co-fondateur de Sen-E-Carte",
    cell: "Directeur de la cellule marketing et stratégie de développement",
    bio: "Expert consultant en systèmes d'information, accompagnement stratégique et déploiement institutionnel.",
    photo: "/images/team/selle-thiam.webp",
  },
];

export default function AProposPage() {
  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Identitaire */}
      <section className="bg-brand-950 hero-grid text-white py-14 sm:py-20 border-b border-sky-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-bold">
              Pionnier de la santé numérique &amp; cartes intelligentes au Sénégal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              À propos de Sen-E-Carte
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Chez <strong>Sen-E-Carte</strong>, nous nous consacrons à améliorer l&apos;accès aux soins de santé et à optimiser la gestion des informations médicales, scolaires et professionnelles grâce aux <strong>QR codes dynamiques</strong>, aux <strong>Puces NFC</strong> Et à l&apos;<strong>Intelligence artificielle</strong>. Nous digitalisons les <strong>IPM</strong>, les mutuelles de santé, les ONG, les établissements scolaires (<strong>CMU-élèves</strong>) Et les entreprises.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-center">
            <div className="w-44 h-44 rounded-3xl bg-white/95 p-4 shadow-2xl border-2 border-sky-400/50 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-sen-e-carte.png"
                alt="Logo officiel Sen-E-Carte"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
        {/* Équipe réelle de Sen-E-Carte */}
        <section className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-wider text-sky-700">
              Gouvernance &amp; expertise
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mt-1">
              L&apos;équipe de Sen-E-Carte
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Une équipe pluridisciplinaire réunissant ingénierie logicielle, éducation, infographie/impression PVC et stratégie des systèmes d&apos;information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-xl hover:border-sky-400 transition-all flex flex-col sm:flex-row gap-5 items-start"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border-2 border-sky-200 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-1.5">
                  <div className="text-xs font-extrabold text-sky-700 tracking-wide">
                    {m.title}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-950">{m.name}</h3>
                  <p className="text-xs font-bold text-emerald-700">{m.cell}</p>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{m.bio}</p>
                  {m.linkedin && (
                    <a
                      href={m.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:underline pt-1"
                    >
                      Voir le profil LinkedIn <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Réalisations & Partenariats Institutionnels d'Ahmed TALL */}
        <section className="space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              <Globe2 className="w-3.5 h-3.5" /> Preuves terrain &amp; partenariats institutionnels
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 mt-3">
              Réalisations clés portées par Ahmed Tall &amp; Sen-E-Carte
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              De la couverture maladie universelle (ANACMU / carte NJABOOT) aux collaborations internationales avec la fondation Nous Cims (barcelone), la JICA et la coalition Transform Health via ENDA santé.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FOUNDER_ACHIEVEMENTS.map((item) => (
              <div
                key={item.title}
                className="bento-card rounded-3xl p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.logo}
                          alt={item.partner}
                          className="w-full h-full object-contain"
                          style={{ outline: "none" }}
                        />
                      </div>
                      <span className="text-[11px] font-extrabold text-sky-700">{item.period}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      {item.tag}
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-500">{item.partner}</div>
                  <h3 className="text-base font-extrabold text-slate-950 leading-snug">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications AWS & Université TÉLUQ */}
          <div className="rounded-3xl bg-brand-950 text-white p-6 sm:p-8 border border-sky-500/30">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-extrabold tracking-wider mb-4">
              <Award className="w-4 h-4" /> Certifications internationales &amp; formation continue (Ahmed Tall)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {FOUNDER_CERTIFICATIONS.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white/5 border border-white/10 p-4 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={c.logo}
                        alt={c.issuer}
                        className="w-full h-full object-contain"
                        style={{ outline: "none" }}
                      />
                    </div>
                    <div className="text-[11px] font-bold text-emerald-400 leading-tight">{c.issuer}</div>
                  </div>
                  <div className="text-sm font-extrabold text-white leading-snug">{c.title}</div>
                  <div className="text-[11px] text-slate-400">
                    {c.date} · <span className="font-mono text-sky-300">{c.credentialId}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus Rencontre Officielle Sen-E-Carte × JICA à Dakar (avec photos réelles) */}
        <section>
          <JicaShowcaseSection />
        </section>

        {/* Portefeuille complet des plateformes développées par Sen-E-Carte */}
        <section>
          <PortfolioRealisationsShowcase />
        </section>

        {/* Films Studio Motion Design Sen-E-Carte */}
        <section>
          <SenECarteVideoCinema />
        </section>

        {/* Comparatif QR Code Dynamique vs Puce NFC */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-7 space-y-3 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">QR code dynamique</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Compatible avec 100 % des smartphones, tablettes et webcams. Modifiez vos informations médicales, scolaires ou professionnelles à distance sans jamais réimprimer la carte.
            </p>
          </div>
          <div className="rounded-3xl bg-white border border-slate-200 p-7 space-y-3 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-950">Puce NFC sans contact</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Transfert instantané par simple rapprochement du téléphone, sans ouvrir l&apos;appareil photo. Idéal pour le contrôle d&apos;accès campus, la cantine scolaire et les urgences médicales.
            </p>
          </div>
        </section>

        {/* Conformité & Sécurité */}
        <div className="rounded-3xl bg-sky-50 border border-sky-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
              <ShieldCheck className="w-5 h-5 text-sky-700" />
              <span>Engagement sécurité : HIPAA, RGPD &amp; CDP Sénégal (loi 2008-12)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700">
              Double authentification, chiffrement avancé des données sensibles, gestion fine des droits (lecture bénéficiaire / écriture professionnel de santé).
            </p>
          </div>
          <Link
            href="/tarifs"
            className="shrink-0 px-5 py-3 rounded-xl bg-brand-950 text-white font-bold text-xs sm:text-sm hover:bg-sky-900"
          >
            Voir nos plans (5 000 – 15 000 FCFA) →
          </Link>
        </div>
      </div>
    </div>
  );
}
