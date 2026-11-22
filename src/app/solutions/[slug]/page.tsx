import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowLeft, Phone, Bot, Users } from "lucide-react";
import { SOLUTIONS, SITE_CONFIG, SOLUTION_IMAGES } from "@/data/senecarteData";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sol = SOLUTIONS.find((s) => s.slug === slug);
  if (!sol) return { title: "Solution introuvable" };

  return {
    title: sol.title,
    description: sol.tagline,
    keywords: sol.seoKeywords,
    alternates: { canonical: `${SITE_CONFIG.domain}/solutions/${sol.slug}` },
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sol = SOLUTIONS.find((s) => s.slug === slug);
  if (!sol) notFound();

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: sol.title,
    description: sol.tagline,
    provider: {
      "@type": "Organization",
      name: "Sen-E-Carte",
      url: SITE_CONFIG.domain,
    },
    areaServed: "SN",
  };

  return (
    <div className="bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <section className="bg-brand-950 hero-grid text-white py-14 sm:py-20 border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour aux 6 pôles de solutions</span>
            </Link>
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold mb-3">
                {sol.badge} · {sol.priceFrom}
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {sol.title}
              </h1>
            </div>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {sol.tagline}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  `Bonjour Ahmed TALL (Sen-E-Carte), je suis intéressé par votre solution : ${sol.title}.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-sm transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Échanger sur WhatsApp</span>
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-sky-400/35 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={SOLUTION_IMAGES[sol.slug] || "/images/illustrations/saas-erp-ia.jpg"}
                alt={sol.title}
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-xl font-extrabold text-slate-950">
              Fonctionnalités clés &amp; garanties
            </h2>
            <ul className="space-y-3">
              {sol.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-slate-950">
                <Users className="w-4 h-4 text-emerald-600" />
                <span>Pour qui est conçue cette solution ?</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sol.targetAudience.map((aud) => (
                  <span
                    key={aud}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold"
                  >
                    {aud}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-emerald-50 border border-emerald-200 p-6 space-y-3">
              <h3 className="text-sm font-extrabold text-emerald-950">Cas d&apos;usage concrets</h3>
              {sol.useCases.map((uc) => (
                <div key={uc.title} className="p-3.5 rounded-2xl bg-white border border-emerald-100">
                  <div className="text-xs font-extrabold text-emerald-800">{uc.title}</div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{uc.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
