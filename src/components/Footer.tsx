import React from "react";
import Link from "next/link";
import { CreditCard, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG, SOLUTIONS } from "@/data/senecarteData";

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-slate-300 border-t border-emerald-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center shadow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-sen-e-carte.png"
                  alt="Logo Sen-E-Carte"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="text-lg font-extrabold text-white block">Sen-E-Carte</span>
                <span className="text-[10px] tracking-widest text-sky-400 font-bold">
                  www.senecarte.com
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Pionnier des cartes intelligentes QR dynamique + NFC, de la santé numérique (IPM/CMU), des logiciels métiers SaaS et de l&apos;intelligence artificielle au Sénégal.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {[
                { label: "LinkedIn", href: SITE_CONFIG.socials.linkedin },
                { label: "LinkedIn Ahmed Tall", href: SITE_CONFIG.socials.founderLinkedin },
                { label: "YouTube", href: SITE_CONFIG.socials.youtube },
                { label: "X (twitter)", href: SITE_CONFIG.socials.x },
                { label: "Facebook", href: SITE_CONFIG.socials.facebook },
                { label: "Instagram", href: SITE_CONFIG.socials.instagram },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-[11px] font-semibold text-slate-200 hover:text-emerald-300 transition-colors"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-extrabold tracking-wider text-emerald-400 mb-4">
              Nos solutions
            </h3>
            <ul className="space-y-2.5 text-xs">
              {SOLUTIONS.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solutions/${s.slug}`} className="hover:text-white transition-colors">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-extrabold tracking-wider text-emerald-400 mb-4">
              Plateforme SaaS &amp; IA
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li><Link href="/app" className="hover:text-white transition-colors">Studio cartes QR &amp; NFC</Link></li>
              <li><Link href="/app/prospection-ia" className="hover:text-amber-300 text-amber-300/90 font-semibold transition-colors">Agent IA prospection &amp; CRM</Link></li>
              <li><Link href="/c/ahmed-tall-senecarte" className="hover:text-white transition-colors">Démo carte digitale live</Link></li>
              <li><Link href="/a-propos" className="hover:text-white transition-colors">À propos &amp; équipe fondatrice</Link></li>
              <li><Link href="/solutions/developpement-sur-mesure-ia" className="hover:text-white transition-colors">Développement web, mobile &amp; IA</Link></li>
              <li><Link href="/tarifs" className="hover:text-white transition-colors">Tarifs FCFA &amp; configurateur</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog &amp; guides SEO</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h3 className="text-xs font-extrabold tracking-wider text-emerald-400 mb-4">
              Direction &amp; contact
            </h3>
            <p className="font-bold text-white">{SITE_CONFIG.founder.name}</p>
            <p className="text-slate-400">{SITE_CONFIG.founder.role}</p>
            <div className="space-y-2 pt-2">
              <a href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`} className="flex items-center gap-2 hover:text-emerald-400">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{SITE_CONFIG.phone}</span>
              </a>
              <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 hover:text-emerald-400">
                <Mail className="w-4 h-4 text-emerald-400" />
                <span>{SITE_CONFIG.email}</span>
              </a>
              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span>{SITE_CONFIG.location}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Sen-E-Carte · Tous droits réservés · www.senecarte.com</p>
          <p>Conformité loi CDP n° 2008-12 Sénégal · hébergement cloud sécurisé</p>
        </div>
      </div>
    </footer>
  );
}
