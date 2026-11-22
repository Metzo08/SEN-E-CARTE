"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  Wifi,
  QrCode,
  Sparkles,
  Send,
  Loader2,
  Building2,
  Layers,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

type OrderTab = "CARTES" | "SOLUTIONS";
type PlanId = "basique" | "avance" | "premium";
type PayMethod = "wave" | "orange_money" | "free_money";

const PLANS: Array<{
  id: PlanId;
  name: string;
  price: number;
  tech: string;
  badge: string;
}> = [
  { id: "basique", name: "Basique", price: 5000, tech: "QR code dynamique", badge: "Économique" },
  { id: "avance", name: "Avancé", price: 10000, tech: "Puce NFC sans contact", badge: "Rapide" },
  {
    id: "premium",
    name: "Premium",
    price: 15000,
    tech: "Hybride QR dynamique + puce NFC",
    badge: "Recommandé",
  },
];

const CATEGORIES = [
  "Carte de visite intelligente pro (QR dynamique + puce NFC)",
  "Carte santé numérique (individuelle / IPM / mutuelle)",
  "Carte scolaire intelligente + CMU",
  "Carte membre GIE / coopérative / association",
  "Plaque avis Google & réseaux sociaux NFC",
  "Carnet de maternité numérique (ONG / clinique)",
];

const BUSINESS_SOLUTIONS = [
  {
    id: "legaltech-avocats",
    title: "LegalTech cabinets d'avocats, notaires & huissiers",
    desc: "Numérisation OCR des dossiers juridiques, recherche instantanée et agenda des audiences anti-oubli.",
    price: "À partir de 450 000 FCFA",
    delay: "7 jours",
  },
  {
    id: "sante-ipm",
    title: "Portail santé, IPM, cliniques & pharmacies",
    desc: "Tiers-payant anti-fraude QR/NFC, lettres de garantie en ligne, bons pharmacie et dossier médical.",
    price: "À partir de 650 000 FCFA",
    delay: "10 jours",
  },
  {
    id: "education-cmu",
    title: "Suite gestion scolaire & recouvrement Wave / OM",
    desc: "Inscriptions, notes, présences, alertes WhatsApp parents, cantine cashless et paiements scolarité.",
    price: "À partir de 400 000 FCFA",
    delay: "10 jours",
  },
  {
    id: "erp-pme-syscohada",
    title: "ERP PME, gestion de stocks & facturation SYSCOHADA",
    desc: "Factures conformes TVA 18 %, multi-boutiques, suivi caisse, devis PDF et encaissements Mobile Money.",
    price: "À partir de 350 000 FCFA",
    delay: "10 jours",
  },
  {
    id: "btp-genie-civil",
    title: "Plateforme BTP, génie civil & suivi de chantiers",
    desc: "Devis DQE/BPU, suivi des équipes, engins, matériaux et rapports d'avancement photo.",
    price: "À partir de 750 000 FCFA",
    delay: "14 jours",
  },
  {
    id: "immobilier-quittances",
    title: "Gestion immobilière & quittances WhatsApp automatiques",
    desc: "Encaissement des loyers par Wave/OM, relances impayés, baux et suivi des charges pour agences.",
    price: "À partir de 400 000 FCFA",
    delay: "10 jours",
  },
  {
    id: "tontine-gie-agri",
    title: "Tontine digitale, GIE & coopératives agricoles",
    desc: "Cotisations Wave/OM transparentes, cartes membres QR, traçabilité des récoltes et boutique circuit court.",
    price: "À partir de 300 000 FCFA",
    delay: "10 jours",
  },
  {
    id: "web-mobile-ia",
    title: "Site web pro, e-commerce, app mobile & chatbot IA FR/Wolof",
    desc: "Plateforme sur-mesure à fort SEO Google, paiement Mobile Money et assistant IA bilingue 24/7.",
    price: "À partir de 300 000 FCFA",
    delay: "7 à 14 jours",
  },
];

interface OrderResult {
  orderRef: string;
  methodLabel: string;
  merchantNumber: string;
  merchantName: string;
  planLabel: string;
  quantity: number;
  discountRate: number;
  totalAmount: number;
  emailNotified: boolean;
}

export default function CommanderPage() {
  const [orderTab, setOrderTab] = useState<OrderTab>("CARTES");

  // Track 1: Cartes intelligentes QR/NFC
  const [planId, setPlanId] = useState<PlanId>("premium");
  const [cardCategory, setCardCategory] = useState(CATEGORIES[0]);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PayMethod>("wave");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Dakar");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  // Track 2: Solutions métiers entreprises & PME
  const [selectedBizId, setSelectedBizId] = useState(BUSINESS_SOLUTIONS[0].id);
  const [bizPack, setBizPack] = useState<"Essentiel" | "Croissance PME" | "Entreprise sur-mesure">(
    "Croissance PME"
  );
  const [bizDetails, setBizDetails] = useState("");
  const [bizResult, setBizResult] = useState<{ ref: string; note: string } | null>(null);

  const selectedPlan = PLANS.find((p) => p.id === planId) || PLANS[2];
  const discountRate = quantity >= 50 ? 20 : quantity >= 20 ? 10 : 0;
  const subtotal = selectedPlan.price * quantity;
  const totalAmount = Math.round(subtotal * (1 - discountRate / 100));

  const selectedBiz =
    BUSINESS_SOLUTIONS.find((b) => b.id === selectedBizId) || BUSINESS_SOLUTIONS[0];

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/paiement/mobile-money", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          organization,
          phone,
          email,
          city,
          cardCategory,
          planId,
          quantity,
          paymentMethod,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Impossible de valider la commande.");
      } else {
        setOrderResult(data);
      }
    } catch {
      setError("Erreur réseau. Contactez Sen-E-Carte sur WhatsApp au +221 77 602 67 83.");
    } finally {
      setLoading(false);
    }
  };

  const handleSolutionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact-rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "MESSAGE",
          fullName,
          organization,
          phone,
          email,
          subject: `Commande solution métier : ${selectedBiz.title} (${bizPack})`,
          message: `Ville : ${city}\nSolution : ${selectedBiz.title} (${selectedBiz.price})\nPack : ${bizPack}\nBesoins : ${bizDetails || "À préciser lors de l'échange"}`,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Impossible d'enregistrer votre commande de solution.");
      } else {
        setBizResult({ ref: data.ref, note: data.note });
      }
    } catch {
      setError("Erreur réseau. Contactez Sen-E-Carte sur WhatsApp au +221 77 602 67 83.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 pb-20">
      {/* Hero Commande Double Voie */}
      <section className="hero-grid text-white py-12 sm:py-16 border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Commande express · Cartes QR-NFC &amp; solutions métiers entreprises</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Commandez vos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-emerald-300 to-amber-200">
                cartes intelligentes ou votre solution métier
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Cartes de visite intelligentes QR dynamique + NFC, cartes santé IPM/scolaires, ou déploiement d&apos;une plateforme métier complète pour votre entreprise, PME, cabinet ou ONG au Sénégal.
            </p>
          </div>

          {/* Sélecteur 2 onglets : Cartes QR/NFC vs Solutions Métiers */}
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white/10 border border-white/15">
            <button
              type="button"
              onClick={() => {
                setOrderTab("CARTES");
                setError("");
              }}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                orderTab === "CARTES"
                  ? "bg-emerald-400 text-brand-950 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Cartes intelligentes (QR + NFC)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setOrderTab("SOLUTIONS");
                setError("");
              }}
              className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
                orderTab === "SOLUTIONS"
                  ? "bg-sky-400 text-brand-950 shadow-lg"
                  : "text-white hover:bg-white/10"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Solutions métiers &amp; logiciels PME</span>
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* ONGLET 1 : COMMANDER DES CARTES INTELLIGENTES QR + NFC */}
        {orderTab === "CARTES" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Aperçu 3D carte en direct */}
            <div className="lg:col-span-5 space-y-5">
              <div className="rounded-3xl bg-[#071A30] text-white p-7 border border-sky-400/35 shadow-2xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-white p-1 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/logo-sen-e-carte.png"
                        alt="Sen-E-Carte"
                        className="w-full h-full object-contain"
                        style={{ outline: "none" }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold">Sen-E-Carte</div>
                      <div className="text-[10px] text-sky-300">{selectedPlan.tech}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-300">
                    {planId !== "basique" && <Wifi className="w-5 h-5" />}
                    {planId !== "avance" && <QrCode className="w-5 h-5" />}
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="text-[11px] text-sky-300 font-semibold">{cardCategory}</div>
                  <div className="text-xl font-black tracking-tight">
                    {fullName || "Votre nom complet"}
                  </div>
                  <div className="text-xs text-slate-300">
                    {organization || "Votre entreprise, cabinet ou structure"} · {city}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-emerald-300 font-bold">
                    Formule {selectedPlan.name} · ×{quantity}
                  </span>
                  <span className="text-lg font-black tabular-nums">
                    {totalAmount.toLocaleString("fr-FR")} FCFA
                  </span>
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2 font-extrabold text-slate-950">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Avantages cartes intelligentes Sen-E-Carte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Mise à jour à distance à vie sans réimprimer la carte</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Compatible 100 % iPhone &amp; Android, sans application</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Remises automatiques : -10 % dès 20 cartes, -20 % dès 50 cartes</span>
                </div>
              </div>
            </div>

            {/* Formulaire commande cartes */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-sm">
              {orderResult ? (
                <div className="space-y-5 text-center py-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-950">
                    Commande enregistrée ({orderResult.orderRef})
                  </h2>
                  <p className="text-sm text-slate-600">
                    Montant total :{" "}
                    <strong className="text-emerald-700">
                      {orderResult.totalAmount.toLocaleString("fr-FR")} FCFA
                    </strong>{" "}
                    via <strong>{orderResult.methodLabel}</strong> ({orderResult.merchantNumber}).
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                        `Bonjour Sen-E-Carte, je confirme ma commande ${orderResult.orderRef} (${orderResult.planLabel} × ${orderResult.quantity} = ${orderResult.totalAmount.toLocaleString("fr-FR")} FCFA via ${orderResult.methodLabel}).`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3 rounded-xl text-brand-950 font-extrabold text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Valider sur WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setOrderResult(null)}
                      className="px-5 py-3 rounded-xl bg-slate-100 text-slate-800 font-bold text-sm cursor-pointer"
                    >
                      Nouvelle commande
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCardSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">
                      1. Type de carte intelligente
                    </label>
                    <select
                      value={cardCategory}
                      onChange={(e) => setCardCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-2">
                      2. Choisissez votre technologie
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {PLANS.map((pl) => (
                        <button
                          key={pl.id}
                          type="button"
                          onClick={() => setPlanId(pl.id)}
                          className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                            planId === pl.id
                              ? "bg-[#071A30] text-white border-[#071A30] shadow-lg"
                              : "bg-slate-50 text-slate-900 border-slate-200 hover:border-sky-400"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-extrabold">{pl.name}</span>
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                planId === pl.id
                                  ? "bg-emerald-400 text-brand-950"
                                  : "bg-sky-100 text-sky-800"
                              }`}
                            >
                              {pl.badge}
                            </span>
                          </div>
                          <div className="text-lg font-black mt-1 tabular-nums">
                            {pl.price.toLocaleString("fr-FR")} FCFA
                          </div>
                          <div
                            className={`text-[11px] mt-0.5 ${
                              planId === pl.id ? "text-sky-300" : "text-slate-500"
                            }`}
                          >
                            {pl.tech}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Quantité de cartes
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5000}
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-extrabold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-extrabold text-slate-700 mb-1">
                        Mode de paiement Mobile Money
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {[
                          { id: "wave" as PayMethod, label: "Wave" },
                          { id: "orange_money" as PayMethod, label: "Orange Money" },
                          { id: "free_money" as PayMethod, label: "Free Money" },
                        ].map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => setPaymentMethod(m.id)}
                            className={`py-2.5 rounded-xl border text-[11px] font-extrabold cursor-pointer ${
                              paymentMethod === m.id
                                ? "bg-emerald-500 text-brand-950 border-emerald-500"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            {m.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Nom complet *"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="Entreprise / structure"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Téléphone / WhatsApp *"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow-emerald w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-brand-950 font-extrabold text-sm cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Smartphone className="w-4 h-4" />
                    )}
                    <span>
                      Valider ma commande ({totalAmount.toLocaleString("fr-FR")} FCFA)
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ONGLET 2 : COMMANDER UNE SOLUTION MÉTIER / LOGICIEL ENTREPRISE & PME */}
        {orderTab === "SOLUTIONS" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Catalogue des 8 solutions métiers à forte demande */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                  Choisissez la solution métier pour votre organisation
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Solutions conçues pour les secteurs à forte demande au Sénégal et en UEMOA, livrées clé en main avec formation à Dakar.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {BUSINESS_SOLUTIONS.map((biz) => {
                  const active = selectedBizId === biz.id;
                  return (
                    <button
                      key={biz.id}
                      type="button"
                      onClick={() => setSelectedBizId(biz.id)}
                      className={`p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2.5 ${
                        active
                          ? "bg-[#071A30] text-white border-sky-400 shadow-xl"
                          : "bg-white text-slate-900 border-slate-200 hover:border-sky-400"
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              active
                                ? "bg-emerald-400 text-brand-950"
                                : "bg-sky-100 text-sky-800"
                            }`}
                          >
                            Délai : {biz.delay}
                          </span>
                          <Layers
                            className={`w-4 h-4 ${active ? "text-sky-300" : "text-slate-400"}`}
                          />
                        </div>
                        <div className="text-sm font-extrabold leading-snug">{biz.title}</div>
                        <p
                          className={`text-xs leading-relaxed ${
                            active ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {biz.desc}
                        </p>
                      </div>
                      <div
                        className={`text-xs font-extrabold pt-1 ${
                          active ? "text-emerald-300" : "text-emerald-700"
                        }`}
                      >
                        {biz.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Formulaire commande solution métier */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 shadow-sm space-y-5">
              {bizResult ? (
                <div className="text-center space-y-4 py-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-950">
                    Demande enregistrée ({bizResult.ref})
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Notre équipe technique vous contacte sous 2 heures pour votre solution{" "}
                    <strong>{selectedBiz.title}</strong> ({bizPack}).
                  </p>
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                      `Bonjour Sen-E-Carte, je viens de commander la solution métier « ${selectedBiz.title} » (${bizPack}, réf. ${bizResult.ref}) pour ${organization || fullName}.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-glow-emerald inline-flex items-center gap-2 px-6 py-3 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Finaliser sur WhatsApp</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSolutionSubmit} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 space-y-1">
                    <div className="text-[11px] font-bold text-sky-700">Solution sélectionnée</div>
                    <div className="text-sm font-extrabold text-slate-950">{selectedBiz.title}</div>
                    <div className="text-xs font-bold text-emerald-700">
                      {selectedBiz.price} · Livraison {selectedBiz.delay}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                      Niveau d&apos;accompagnement
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {(["Essentiel", "Croissance PME", "Entreprise sur-mesure"] as const).map(
                        (pk) => (
                          <button
                            key={pk}
                            type="button"
                            onClick={() => setBizPack(pk)}
                            className={`py-2 px-2 rounded-xl border text-[11px] font-extrabold cursor-pointer ${
                              bizPack === pk
                                ? "bg-[#071A30] text-emerald-300 border-[#071A30]"
                                : "bg-slate-50 text-slate-700 border-slate-200"
                            }`}
                          >
                            {pk}
                          </button>
                        )
                      )}
                    </div>
                  </div>

                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet *"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Nom de l'entreprise, cabinet, école ou ONG *"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                  <div className="grid grid-cols-2 gap-2.5">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Téléphone / WhatsApp *"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email professionnel"
                      className="px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                    />
                  </div>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ville (ex : Dakar, Thiès, Mbour...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs"
                  />
                  <textarea
                    rows={3}
                    value={bizDetails}
                    onChange={(e) => setBizDetails(e.target.value)}
                    placeholder="Décrivez brièvement vos besoins (nombre d'utilisateurs, fonctionnalités souhaitées...)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs leading-relaxed"
                  />

                  {error && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-glow-emerald w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl text-brand-950 font-extrabold text-sm cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>Commander cette solution métier</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
