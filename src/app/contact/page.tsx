import type { Metadata } from "next";
import { Phone, Mail, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";
import ContactBookingClient from "@/components/ContactBookingClient";
import QuoteCalculator from "@/components/QuoteCalculator";

export const metadata: Metadata = {
  title: "Contact & prise de rendez-vous — Sen-E-Carte Dakar",
  description:
    "Discutez avec l'équipe Sen-E-Carte ou prenez rendez-vous en ligne (visio, WhatsApp, appel ou bureau à Dakar) pour vos cartes QR-NFC, plateformes SaaS et projets IA.",
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <section className="hero-grid text-white py-14 sm:py-18 border-b border-sky-500/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold">
              Contact direct &amp; rendez-vous · Dakar, Sénégal
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Discutez avec nous ou{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                prenez rendez-vous en ligne
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Choisissez un créneau en visio, par téléphone, sur WhatsApp ou à Dakar pour échanger sur vos cartes intelligentes QR-NFC, votre plateforme métier ou votre projet IA.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-sky-400/35 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/illustrations/business-nfc.jpg"
                alt="Échange et prise de rendez-vous Sen-E-Carte à Dakar"
                className="w-full h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Coordonnées directes */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="bento-card flex items-center gap-3.5 p-5 rounded-2xl"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">WhatsApp &amp; téléphone direct</div>
                <div className="font-extrabold text-slate-950">{SITE_CONFIG.phone}</div>
              </div>
            </a>

            <a
              href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
              className="bento-card flex items-center gap-3.5 p-5 rounded-2xl"
            >
              <div className="w-11 h-11 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Appel vocal direct</div>
                <div className="font-extrabold text-slate-950">{SITE_CONFIG.phone}</div>
              </div>
            </a>

            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="bento-card flex items-center gap-3.5 p-5 rounded-2xl"
            >
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Email officiel</div>
                <div className="font-extrabold text-slate-950">{SITE_CONFIG.email}</div>
              </div>
            </a>

            <div className="bento-card flex items-center gap-3.5 p-5 rounded-2xl">
              <div className="w-11 h-11 rounded-xl bg-slate-100 text-brand-950 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500">Implantation</div>
                <div className="font-extrabold text-slate-950">{SITE_CONFIG.location}</div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.founder.linkedin}
              target="_blank"
              rel="noreferrer"
              className="btn-glow-navy flex items-center justify-between p-5 rounded-2xl text-white"
            >
              <div>
                <div className="text-xs text-emerald-400 font-bold">Direction générale &amp; technique</div>
                <div className="font-extrabold mt-0.5">{SITE_CONFIG.founder.name} · LinkedIn</div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-emerald-400" />
            </a>
          </div>

          {/* Module Prise de rendez-vous & discussion */}
          <div className="lg:col-span-8">
            <ContactBookingClient />
          </div>
        </div>

        {/* Simulateur de devis rapide */}
        <div>
          <QuoteCalculator />
        </div>
      </div>
    </div>
  );
}
