import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle2, ArrowLeft, QrCode } from "lucide-react";
import { INITIAL_DEMO_CARDS } from "@/data/senecarteData";

export function generateStaticParams() {
  return INITIAL_DEMO_CARDS.map((c) => ({ slug: c.slug }));
}

export default async function PublicSmartCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = INITIAL_DEMO_CARDS.find((c) => c.slug === slug);
  if (!card) notFound();

  const vcardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${card.fullName}\nORG:${card.organization}\nTITLE:${card.role}\nTEL:${card.phone}\nEMAIL:${card.email}\nEND:VCARD`;
  const vcardHref = `data:text/vcard;charset=utf-8,${encodeURIComponent(vcardData)}`;

  return (
    <div className="min-h-screen bg-brand-950 hero-grid py-12 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-5">
        <Link
          href="/app"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au studio SaaS Sen-E-Carte</span>
        </Link>

        <div className="rounded-3xl bg-white shadow-2xl overflow-hidden border border-emerald-400/40">
          <div className="bg-gradient-to-br from-emerald-900 via-brand-950 to-slate-950 p-6 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold">
                {card.badgeLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500 text-brand-950 text-[11px] font-extrabold">
                <CheckCircle2 className="w-3.5 h-3.5" /> {card.status === "ACTIF" ? "Actif" : "Suspendu"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold">{card.fullName}</h1>
              <p className="text-xs text-emerald-300 font-semibold mt-0.5">{card.role}</p>
              <p className="text-xs text-slate-300 mt-0.5">{card.organization}</p>
            </div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between pt-2 border-t border-white/10">
              <span>N° Carte : {card.idNumber}</span>
              <span className="inline-flex items-center gap-1 text-amber-300">
                <QrCode className="w-3.5 h-3.5" /> QR vérifié
              </span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="space-y-2.5 text-xs text-slate-700">
              <a href={`tel:${card.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span className="font-bold">{card.phone}</span>
              </a>
              <a href={`mailto:${card.email}`} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-400">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">{card.email}</span>
              </a>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>{card.city}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              {card.extraMeta.map((m) => (
                <div key={m.label} className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                  <div className="text-[10px] font-extrabold tracking-wider text-emerald-800">
                    {m.label}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{m.value}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <a
                href={vcardHref}
                download={`${card.slug}.vcf`}
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-brand-950 hover:bg-emerald-900 text-white font-bold text-xs text-center"
              >
                Enregistrer contact
              </a>
              <a
                href={`https://wa.me/${card.phone.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-xs text-center"
              >
                Écrire sur WhatsApp
              </a>
            </div>

            <div className="pt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Identité dynamique certifiée par Sen-E-Carte · www.senecarte.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
