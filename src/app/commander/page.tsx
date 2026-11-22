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
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

type PlanId = "basique" | "avance" | "premium";
type PayMethod = "wave" | "orange_money" | "free_money";

const PLANS: Array<{
  id: PlanId;
  name: string;
  price: number;
  tech: string;
  badge: string;
}> = [
  { id: "basique", name: "Basique", price: 5000, tech: "QR Code Dynamique", badge: "Économique" },
  { id: "avance", name: "Avancé", price: 10000, tech: "Puce NFC Sans Contact", badge: "Rapide" },
  { id: "premium", name: "Premium", price: 15000, tech: "Hybride QR Dynamique + NFC", badge: "Recommandé" },
];

const CATEGORIES = [
  "Carte Santé Numérique (Individuelle / IPM)",
  "Carte de Visite Intelligente Pro (NFC/QR)",
  "Carte Scolaire Intelligente + CMU",
  "Carnet de Maternité Numérique (ONG / Clinique)",
  "Plaque Avis Google & Instagram NFC",
  "Carte Membre GIE / Coopérative / Association",
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

  const selectedPlan = PLANS.find((p) => p.id === planId) || PLANS[2];
  const discountRate = quantity >= 50 ? 20 : quantity >= 20 ? 10 : 0;
  const subtotal = selectedPlan.price * quantity;
  const totalAmount = Math.round(subtotal * (1 - discountRate / 100));

  const handleSubmit = async (e: React.FormEvent) => {
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
      setError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-brand-950 text-white pt-14 pb-16 border-b border-sky-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300 text-xs font-bold mb-4">
              <Smartphone className="w-4 h-4" />
              <span>Commande en ligne · Wave, Orange Money &amp; Free Money</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Commandez vos cartes{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Sen-E-Carte en 2 minutes
              </span>
            </h1>
            <p className="mt-3 text-slate-300 max-w-2xl text-base">
              Personnalisez votre carte en direct, profitez de remises automatiques jusqu&apos;à -20 % pour les lots
              entreprises/IPM/écoles et réglez par Wave ou Orange Money avec activation prioritaire.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden border-2 border-sky-400/35 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/illustrations/mobile-money.jpg"
                alt="Paiement mobile Money et carte intelligente NFC Sen-E-Carte"
                className="w-full h-56 sm:h-64 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {orderResult ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-xl border-2 border-emerald-400 p-8">
            <div className="flex items-center gap-3 text-emerald-600 mb-4">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <div className="text-xs font-extrabold tracking-wider">Commande enregistrée</div>
                <h2 className="text-2xl font-black text-brand-950">Référence {orderResult.orderRef}</h2>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-950 text-white p-5 space-y-2.5 my-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Formule choisie</span>
                <span className="font-bold">{orderResult.planLabel} × {orderResult.quantity}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-300">Moyen de paiement</span>
                <span className="font-bold text-sky-300">{orderResult.methodLabel}</span>
              </div>
              <div className="flex justify-between text-lg pt-2 border-t border-white/15">
                <span className="font-bold">Montant à régler</span>
                <span className="font-black text-emerald-400">
                  {orderResult.totalAmount.toLocaleString("fr-FR")} FCFA
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-sky-50 border border-sky-200 p-5 text-sm text-slate-800 space-y-2">
              <div className="font-extrabold text-brand-950">
                Finalisez votre règlement {orderResult.methodLabel} en 1 étape :
              </div>
              <p>
                Effectuez votre transfert de{" "}
                <strong>{orderResult.totalAmount.toLocaleString("fr-FR")} FCFA</strong> au numéro officiel{" "}
                <strong>{orderResult.merchantNumber}</strong> ({orderResult.merchantName}) en indiquant la référence{" "}
                <span className="font-mono font-bold bg-white px-2 py-0.5 rounded border">{orderResult.orderRef}</span>.
              </p>
              <p className="text-xs text-slate-600">
                {orderResult.emailNotified
                  ? "✅ L'équipe Sen-E-Carte (Ahmed TALL) vient d'être notifiée automatiquement par email."
                  : "Cliquez sur le bouton WhatsApp ci-dessous pour envoyer votre reçu et activer votre carte immédiatement."}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                  `Bonjour Ahmed TALL (Sen-E-Carte), je viens de passer la commande ${orderResult.orderRef} (${orderResult.planLabel} x${orderResult.quantity} — ${orderResult.totalAmount.toLocaleString("fr-FR")} FCFA via ${orderResult.methodLabel}). Voici ma confirmation de paiement.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-extrabold text-sm"
              >
                <Send className="w-4 h-4" />
                <span>Confirmer mon paiement sur WhatsApp</span>
              </a>
              <button
                type="button"
                onClick={() => setOrderResult(null)}
                className="px-5 py-3.5 rounded-2xl border border-slate-300 text-slate-700 font-bold text-sm hover:bg-slate-100"
              >
                Nouvelle commande
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-7 bg-white rounded-3xl shadow-sm border border-slate-200 p-6 sm:p-8 space-y-6"
            >
              <div>
                <h2 className="text-lg font-extrabold text-brand-950 mb-3">1. Choisissez votre technologie</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {PLANS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlanId(p.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all ${
                        planId === p.id
                          ? "border-sky-500 bg-sky-50/70 shadow-sm"
                          : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <span className="text-[10px] font-extrabold tracking-wider px-2 py-0.5 rounded-full bg-brand-950 text-sky-300">
                        {p.badge}
                      </span>
                      <div className="text-base font-black text-brand-950 mt-2">{p.name}</div>
                      <div className="text-xs text-slate-600">{p.tech}</div>
                      <div className="text-lg font-black text-emerald-600 mt-2">
                        {p.price.toLocaleString("fr-FR")} FCFA
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Catégorie de carte</label>
                  <select
                    value={cardCategory}
                    onChange={(e) => setCardCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Quantité (remise -10 % dès 20 · -20 % dès 50)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={5000}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-brand-950 mb-3">2. Vos informations &amp; gravure</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nom complet *</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Dr. Aminata Ndiaye"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Structure / IPM / école</label>
                    <input
                      type="text"
                      placeholder="Ex: clinique du cap ou particulier"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Téléphone WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+221 77 000 00 00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ville / région</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email (pour votre reçu)</label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <h2 className="text-lg font-extrabold text-brand-950 mb-3">3. Mode de paiement mobile Money</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: "wave" as PayMethod, label: "Wave Sénégal", logo: "/images/logos/logo-wave.png", color: "border-sky-500 bg-sky-50" },
                    { id: "orange_money" as PayMethod, label: "Orange Money", logo: "/images/logos/logo-orange-money.png", color: "border-orange-500 bg-orange-50" },
                    { id: "free_money" as PayMethod, label: "Free Money / yas", logo: "/images/logos/logo-free-money.svg", color: "border-red-500 bg-red-50" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 text-sm font-extrabold transition-all ${
                        paymentMethod === m.id ? m.color : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.logo}
                          alt={m.label}
                          className="w-full h-full object-contain"
                          style={{ outline: "none" }}
                        />
                      </div>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-brand-950 font-black text-base flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Génération de votre référence mobile Money...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Valider ma commande · {totalAmount.toLocaleString("fr-FR")} FCFA</span>
                  </>
                )}
              </button>
            </form>

            {/* Right: Live 3D Card Preview & Summary */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-brand-950 rounded-3xl p-6 text-white shadow-xl border border-sky-500/30 sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-extrabold tracking-widest text-sky-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> Aperçu en direct de votre carte
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400">{selectedPlan.name}</span>
                </div>

                {/* Live NFC Card Mockup */}
                <div className="rounded-2xl bg-gradient-to-br from-[#0f3d6e] via-[#071a30] to-[#042f2e] p-6 border border-sky-400/30 shadow-2xl card-shimmer relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/images/logo-sen-e-carte.png"
                        alt="Sen-E-Carte"
                        className="w-8 h-8 rounded-lg bg-white p-0.5 object-contain"
                      />
                      <div>
                        <div className="text-xs font-black tracking-tight">Sen-E-Carte</div>
                        <div className="text-[9px] text-sky-300 tracking-widest">
                          {selectedPlan.tech}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-sky-300">
                      {planId !== "basique" && <Wifi className="w-4 h-4 rotate-90" />}
                      {planId !== "avance" && <QrCode className="w-5 h-5" />}
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="text-[10px] tracking-wider text-emerald-300 font-bold">
                      {cardCategory.split("(")[0].trim()}
                    </div>
                    <div className="text-xl font-black tracking-tight mt-0.5 truncate">
                      {fullName || "Votre Nom Complet"}
                    </div>
                    <div className="text-xs text-slate-300 truncate">
                      {organization || "Votre Structure / IPM / École"} · {city || "Dakar"}
                    </div>
                  </div>

                  <div className="mt-6 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-300">
                    <span>www.senecarte.com</span>
                    <span className="text-emerald-400 font-bold">● chiffré HIPAA / CDP</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="mt-6 space-y-2.5 text-sm">
                  <div className="flex justify-between text-slate-300">
                    <span>Prix unitaire ({selectedPlan.name})</span>
                    <span className="font-bold text-white">
                      {selectedPlan.price.toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Quantité</span>
                    <span className="font-bold text-white">{quantity} carte(s)</span>
                  </div>
                  {discountRate > 0 && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Remise volume (-{discountRate} %)</span>
                      <span>-{(subtotal - totalAmount).toLocaleString("fr-FR")} FCFA</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-black pt-3 border-t border-white/15">
                    <span>Total net</span>
                    <span className="text-emerald-400">{totalAmount.toLocaleString("fr-FR")} FCFA</span>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-2.5 text-xs text-slate-300 bg-white/5 p-3.5 rounded-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Livraison express à Dakar/Thiès sous 24–48h et activation numérique immédiate dès confirmation
                    Wave ou Orange Money.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
