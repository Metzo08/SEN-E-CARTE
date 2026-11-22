"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Bot,
  Lock,
  Phone,
  ChevronDown,
  ShieldCheck,
  Scale,
  GraduationCap,
  CreditCard,
  Building2,
  Cpu,
  Globe2,
  Layers,
  BookOpen,
  QrCode,
  Calculator,
  ArrowRight,
  Users,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

type DropdownKey = "solutions" | "realisations" | "saas" | "tarifs" | null;

const SOLUTIONS_ITEMS = [
  {
    href: "/portail-ipm",
    title: "Santé, IPM & mutuelles",
    desc: "Tiers-payant NFC/QR anti-fraude, lettres de garantie & DME",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50",
    badge: "En ligne",
  },
  {
    href: "/realisations#legaltech",
    title: "Legaltech & cabinets d'avocats",
    desc: "OCR dossiers juridiques & agenda des audiences anti-oubli",
    icon: Scale,
    color: "text-amber-700 bg-amber-50",
    badge: "Nouveau",
  },
  {
    href: "/solutions/carte-scolaire-cmu",
    title: "Éducation & carte scolaire CMU",
    desc: "Gestion scolaire tout-en-un, présences & cantine cashless",
    icon: GraduationCap,
    color: "text-sky-600 bg-sky-50",
  },
  {
    href: "/solutions/carte-visite-nfc",
    title: "Cartes pro NFC & membres GIE",
    desc: "Partage sans contact, coopératives & plaques avis Google",
    icon: CreditCard,
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    href: "/solutions/logiciels-metiers-saas",
    title: "Logiciels métiers, ERP & forages",
    desc: "ASUFOR eau, stocks SYSCOHADA, BTP & gestion immobilière",
    icon: Building2,
    color: "text-cyan-700 bg-cyan-50",
  },
  {
    href: "/solutions/developpement-sur-mesure-ia",
    title: "Web, mobile & chatbots IA 24/7",
    desc: "Applications sur-mesure, assistants WhatsApp/voix & n8n",
    icon: Cpu,
    color: "text-rose-600 bg-rose-50",
  },
];

const REALISATIONS_ITEMS = [
  {
    href: "/realisations",
    title: "Portefeuille des 10 plateformes",
    desc: "Cabinet Mbengue, Dada studio, fermes des Niayes, INSPIR, SenMutuelles, Magatte Niang",
    icon: Layers,
    color: "text-sky-600 bg-sky-50",
  },
  {
    href: "/realisations#jica-dakar",
    title: "Coopération JICA à Dakar",
    desc: "Photos & bilan de la rencontre santé numérique inclusive & CSU",
    icon: Globe2,
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    href: "/realisations#legaltech",
    title: "Simulateur legaltech (OCR & audiences)",
    desc: "Découvrez la plateforme du cabinet maître Ibrahima Mbengue",
    icon: Scale,
    color: "text-amber-700 bg-amber-50",
  },
  {
    href: "/c/ahmed-tall-senecarte",
    title: "Tester une carte digitale en direct",
    desc: "Aperçu réel d'une carte NFC/QR dynamique Sen-E-Carte",
    icon: QrCode,
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    href: "/blog",
    title: "Guides métiers & actualités",
    desc: "Articles terrain sur les IPM, CMU, ASUFOR et transformation digitale",
    icon: BookOpen,
    color: "text-cyan-700 bg-cyan-50",
  },
];

const SAAS_ITEMS = [
  {
    href: "/app",
    title: "Hub des 15 applications SaaS",
    desc: "Catalogue complet par secteur + studio cartes QR/NFC interactif",
    icon: Layers,
    color: "text-sky-600 bg-sky-50",
    badge: "15 apps",
  },
  {
    href: "/portail-ipm",
    title: "Portail IPM anti-fraude (live)",
    desc: "Vérification droits NFC/QR & émission lettres de garantie",
    icon: ShieldCheck,
    color: "text-emerald-600 bg-emerald-50",
    badge: "Live",
  },
  {
    href: "/super-admin",
    title: "Super Admin & prospection IA",
    desc: "Espace directeur Ahmed Tall : prospection IA, factures, devis & contrats",
    icon: Lock,
    color: "text-amber-700 bg-amber-50",
    badge: "Privé",
  },
];

const TARIFS_ITEMS = [
  {
    href: "/commander",
    title: "Commander en ligne (Wave / Orange Money)",
    desc: "Personnalisation 3D en direct, remises volume & paiement mobile",
    icon: CreditCard,
    color: "text-emerald-600 bg-emerald-50",
    badge: "Express",
  },
  {
    href: "/tarifs",
    title: "Grille tarifaire & simulateur de devis",
    desc: "Formules 5 000 à 15 000 FCFA & estimation instantanée",
    icon: Calculator,
    color: "text-sky-600 bg-sky-50",
  },
  {
    href: "/contact",
    title: "Demander un devis ou un contact",
    desc: "Échange direct avec Ahmed Tall et l'équipe technique à Dakar",
    icon: Users,
    color: "text-indigo-600 bg-indigo-50",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<DropdownKey>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickOutside);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleOpenHover = (key: DropdownKey) => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpenMenu(key);
  };

  const handleCloseHover = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpenMenu(null), 160);
  };

  const toggleMenu = (key: DropdownKey) => {
    setOpenMenu((prev) => (prev === key ? null : key));
  };

  const pillClass = (active: boolean) =>
    `inline-flex items-center gap-1 px-3.5 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
      active
        ? "bg-sky-500/25 text-emerald-300 ring-1 ring-sky-400/40"
        : "text-white hover:bg-white/15 hover:text-emerald-200"
    }`;

  return (
    <header
      ref={navRef}
      style={{ backgroundColor: "#071A30" }}
      className="sticky top-0 z-50 bg-[#071A30] backdrop-blur-xl border-b border-sky-400/30 text-white shadow-xl shadow-slate-950/40"
    >
      {/* Fine ligne lumineuse cyan-émeraude */}
      <div className="h-[2px] w-full bg-gradient-to-r from-sky-500 via-emerald-400 to-amber-300 opacity-85" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* 1. Logo Sen-E-Carte */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-white/95 p-1 flex items-center justify-center shadow-lg shadow-sky-500/25 ring-1 ring-white/40 group-hover:scale-105 transition-transform">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-sen-e-carte.png"
              alt="Logo officiel Sen-E-Carte"
              className="w-full h-full object-contain"
              style={{ outline: "none" }}
            />
          </div>
          <div className="leading-tight">
            <span className="text-base font-extrabold tracking-tight text-white block whitespace-nowrap">
              Sen-E-Carte
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-sky-300 block whitespace-nowrap">
              NFC · santé · legaltech · IA
            </span>
          </div>
        </Link>

        {/* 2. Barre de navigation centrée en pilule de verre (zéro retour à la ligne) */}
        <nav
          className="hidden lg:flex items-center gap-1 bg-white/10 border border-white/15 rounded-full p-1"
          aria-label="Navigation principale"
        >
          {/* Solutions */}
          <div
            className="relative"
            onMouseEnter={() => handleOpenHover("solutions")}
            onMouseLeave={handleCloseHover}
          >
            <button
              type="button"
              onClick={() => toggleMenu("solutions")}
              className={pillClass(
                openMenu === "solutions" || Boolean(pathname?.startsWith("/solutions"))
              )}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openMenu === "solutions" ? "rotate-180 text-emerald-400" : "text-slate-400"
                }`}
              />
            </button>

            {openMenu === "solutions" && (
              <div className="absolute left-0 top-full pt-3 w-[640px]">
                <div className="rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-5 grid grid-cols-2 gap-3">
                  {SOLUTIONS_ITEMS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-sky-200 transition-all"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-xs font-extrabold text-slate-950 group-hover:text-sky-700">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-2 pt-3 mt-1 border-t border-slate-100 flex items-center justify-between px-2">
                    <span className="text-xs text-slate-500 font-medium">
                      11 secteurs métiers &amp; sélecteur interactif de solution
                    </span>
                    <Link
                      href="/solutions"
                      onClick={() => setOpenMenu(null)}
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-700 hover:text-sky-900"
                    >
                      <span>Voir tout le catalogue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Réalisations */}
          <div
            className="relative"
            onMouseEnter={() => handleOpenHover("realisations")}
            onMouseLeave={handleCloseHover}
          >
            <button
              type="button"
              onClick={() => toggleMenu("realisations")}
              className={pillClass(
                openMenu === "realisations" ||
                  pathname === "/realisations" ||
                  pathname === "/blog"
              )}
            >
              <span>Réalisations</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openMenu === "realisations" ? "rotate-180 text-emerald-400" : "text-slate-400"
                }`}
              />
            </button>

            {openMenu === "realisations" && (
              <div className="absolute left-0 top-full pt-3 w-[410px]">
                <div className="rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-4 space-y-1.5">
                  {REALISATIONS_ITEMS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-sky-200 transition-all"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-extrabold text-slate-950 group-hover:text-sky-700">
                          {item.title}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SaaS & IA */}
          <div
            className="relative"
            onMouseEnter={() => handleOpenHover("saas")}
            onMouseLeave={handleCloseHover}
          >
            <button
              type="button"
              onClick={() => toggleMenu("saas")}
              className={pillClass(
                openMenu === "saas" ||
                  Boolean(pathname?.startsWith("/app")) ||
                  pathname === "/portail-ipm"
              )}
            >
              <span>SaaS &amp; IA</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openMenu === "saas" ? "rotate-180 text-emerald-400" : "text-slate-400"
                }`}
              />
            </button>

            {openMenu === "saas" && (
              <div className="absolute left-0 top-full pt-3 w-[380px]">
                <div className="rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-4 space-y-1.5">
                  {SAAS_ITEMS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-sky-200 transition-all"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-slate-950 group-hover:text-sky-700">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-extrabold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tarifs */}
          <div
            className="relative"
            onMouseEnter={() => handleOpenHover("tarifs")}
            onMouseLeave={handleCloseHover}
          >
            <button
              type="button"
              onClick={() => toggleMenu("tarifs")}
              className={pillClass(
                openMenu === "tarifs" ||
                  pathname === "/tarifs" ||
                  pathname === "/commander" ||
                  pathname === "/contact"
              )}
            >
              <span>Tarifs</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${
                  openMenu === "tarifs" ? "rotate-180 text-emerald-400" : "text-slate-400"
                }`}
              />
            </button>

            {openMenu === "tarifs" && (
              <div className="absolute right-0 top-full pt-3 w-[380px]">
                <div className="rounded-3xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-4 space-y-1.5">
                  {TARIFS_ITEMS.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      onClick={() => setOpenMenu(null)}
                      className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-sky-200 transition-all"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}
                      >
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-extrabold text-slate-950 group-hover:text-sky-700">
                            {item.title}
                          </span>
                          {item.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* À propos */}
          <Link href="/a-propos" className={pillClass(pathname === "/a-propos")}>
            À propos
          </Link>
          <Link href="/contact" className={pillClass(pathname === "/contact")}>
            Contact
          </Link>
        </nav>

        {/* 3. Actions Droite Desktop (aérées & jamais coupées) */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <Link
            href="/super-admin"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 text-xs font-bold whitespace-nowrap transition-colors"
            title="Espace Super Admin — Directeur Ahmed Tall"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Super Admin</span>
          </Link>
          <Link
            href="/commander"
            className="btn-glow-emerald inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-brand-950 text-xs font-extrabold whitespace-nowrap"
          >
            <span>Commander</span>
          </Link>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
              "Bonjour Ahmed TALL (Sen-E-Carte), je souhaite échanger sur vos solutions digitales."
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500/25 border border-white/15 hover:border-emerald-400/50 text-emerald-400 flex items-center justify-center transition-colors shrink-0"
            title={`WhatsApp direct Sen-E-Carte : ${SITE_CONFIG.phone}`}
            aria-label={`Contacter Sen-E-Carte sur WhatsApp (${SITE_CONFIG.phone})`}
          >
            <Phone className="w-4 h-4" />
          </a>
        </div>

        {/* Bouton Menu Mobile */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          aria-label="Ouvrir le menu de navigation"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Menu Mobile Structuré par Catégories */}
      {mobileOpen && (
        <div
          style={{ backgroundColor: "#071A30" }}
          className="lg:hidden bg-[#071A30] border-t border-white/15 px-4 py-5 space-y-5 max-h-[82vh] overflow-y-auto"
        >
          <div className="space-y-1.5">
            <div className="px-3 text-[11px] font-extrabold text-sky-400">Solutions métiers</div>
            {SOLUTIONS_ITEMS.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
              >
                <span>{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="space-y-1.5 pt-2 border-t border-white/10">
            <div className="px-3 text-[11px] font-extrabold text-emerald-400">
              Réalisations &amp; espace SaaS
            </div>
            <Link
              href="/realisations"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Nos 10 réalisations &amp; JICA Dakar
            </Link>
            <Link
              href="/app"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Hub des 15 applications SaaS
            </Link>
            <Link
              href="/tarifs"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Tarifs &amp; simulateur de devis
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Guides métiers &amp; blog
            </Link>
            <Link
              href="/a-propos"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              À propos &amp; équipe fondatrice
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-white/10"
            >
              Contact &amp; devis
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
            <Link
              href="/commander"
              onClick={() => setMobileOpen(false)}
              className="btn-glow-emerald flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-brand-950 font-extrabold text-xs"
            >
              <span>Commander</span>
            </Link>
            <Link
              href="/super-admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-amber-400 text-brand-950 font-extrabold text-xs"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Super Admin</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
