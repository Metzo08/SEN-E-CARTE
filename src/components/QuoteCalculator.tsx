"use client";

import React, { useState } from "react";
import { Calculator, Send, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

const PRODUCT_OPTIONS = [
  { id: "sante-ipm", label: "Cartes santé IPM (QR + portail)", unitPrice: 5000, minQty: 25 },
  { id: "scolaire-cmu", label: "Cartes scolaires intelligentes + CMU", unitPrice: 3500, minQty: 50 },
  { id: "business-nfc", label: "Cartes de visite pro (QR + NFC)", unitPrice: 12000, minQty: 1 },
  { id: "membre-gie", label: "Cartes membres GIE / coopératives", unitPrice: 4000, minQty: 30 },
  { id: "logiciel-forage", label: "Logiciel facturation forages (ASUFOR)", unitPrice: 25000, minQty: 1, isMonthly: true },
  { id: "site-web-ia", label: "Site web SEO, app mobile ou assistant IA", unitPrice: 350000, minQty: 1, isForfait: true },
];

export default function QuoteCalculator() {
  const [selectedId, setSelectedId] = useState("sante-ipm");
  const [qty, setQty] = useState(100);
  const [withNfc, setWithNfc] = useState(true);
  const [orgName, setOrgName] = useState("");

  const product = PRODUCT_OPTIONS.find((p) => p.id === selectedId) || PRODUCT_OPTIONS[0];
  const isCard = !product.isMonthly && !product.isForfait;
  const effectiveQty = Math.max(product.minQty, qty);
  const nfcExtra = isCard && withNfc && selectedId !== "business-nfc" ? 1500 : 0;
  const discount = isCard && effectiveQty >= 200 ? 0.85 : isCard && effectiveQty >= 100 ? 0.92 : 1;
  const total = Math.round((product.unitPrice + nfcExtra) * effectiveQty * discount);

  const waMessage = `Bonjour Ahmed TALL (Sen-E-Carte), je souhaite un devis officiel pour : ${product.label}${
    isCard ? ` (${effectiveQty} cartes${withNfc ? " avec puce NFC" : " QR dynamique"})` : ""
  }. Estimation en ligne : ${total.toLocaleString("fr-FR")} FCFA.${orgName ? ` Organisation : ${orgName}.` : ""}`;

  return (
    <div className="bento-card rounded-3xl p-6 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
          <Calculator className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-slate-950">
            Configurateur de devis instantané (FCFA)
          </h3>
          <p className="text-xs text-slate-500">
            Estimez votre budget en 10 secondes et recevez votre proforma officielle sur WhatsApp.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              1. Choisissez votre solution
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRODUCT_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setSelectedId(opt.id);
                    setQty(opt.minQty === 1 ? 1 : Math.max(opt.minQty, 100));
                  }}
                  className={`text-left p-3.5 rounded-xl border text-xs font-bold transition-colors ${
                    selectedId === opt.id
                      ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {isCard && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  2. Quantité de cartes (min. {product.minQty})
                </label>
                <input
                  type="number"
                  min={product.minQty}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value) || product.minQty)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 tabular-nums focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 w-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={withNfc}
                    onChange={(e) => setWithNfc(e.target.checked)}
                    className="w-4 h-4 accent-emerald-600"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Inclure puce NFC sans contact
                  </span>
                </label>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nom de votre structure / école / IPM / entreprise (optionnel)
            </label>
            <input
              type="text"
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
              placeholder="Ex : IPM Dakar, lycée excellence, GIE Niayes..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="lg:col-span-5 rounded-2xl hero-grid text-white p-6 space-y-4 border border-emerald-500/30 shadow-xl">
          <div className="text-xs font-bold tracking-wider text-emerald-400">
            Estimation indicative
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
            {total.toLocaleString("fr-FR")} <span className="text-lg text-emerald-400">FCFA</span>
          </div>
          <div className="text-xs text-slate-300 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{product.label}</span>
            </div>
            {isCard && discount < 1 && (
              <div className="flex items-center gap-1.5 text-amber-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Remise volume appliquée (-{Math.round((1 - discount) * 100)}%)</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Paiement Wave business, Orange Money ou virement</span>
            </div>
          </div>

          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(waMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="btn-glow-emerald w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-brand-950 font-extrabold text-sm"
          >
            <Send className="w-4 h-4" />
            <span>Recevoir ma proforma sur WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
