"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  Video,
  Phone,
  Building2,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

const TIME_SLOTS = ["09:00", "10:30", "12:00", "15:00", "16:30", "18:00"];

const CHANNELS = [
  { id: "Visio Google Meet", label: "Visio Google Meet", icon: Video },
  { id: "Appel téléphonique", label: "Appel téléphonique", icon: Phone },
  { id: "WhatsApp vidéo", label: "WhatsApp vidéo", icon: MessageCircle },
  { id: "Rendez-vous à Dakar", label: "Bureau à Dakar", icon: Building2 },
];

const SUBJECTS = [
  "Cartes intelligentes QR-NFC (Santé, IPM, Pro, GIE)",
  "Plateforme LegalTech pour cabinet d'avocats (OCR & audiences)",
  "Suite gestion scolaire & carte élève CMU",
  "Logiciel métier, ERP SYSCOHADA ou forage ASUFOR",
  "Développement site web, application mobile ou agent IA",
  "Autre projet ou partenariat institutionnel",
];

export default function ContactBookingClient() {
  const [mode, setMode] = useState<"RDV" | "MESSAGE">("RDV");
  const [fullName, setFullName] = useState("");
  const [organization, setOrganization] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [date, setDate] = useState(() => {
    const d = new Date(Date.now() + 86400000);
    return d.toISOString().slice(0, 10);
  });
  const [timeSlot, setTimeSlot] = useState("10:30");
  const [channel, setChannel] = useState(CHANNELS[0].id);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{ ref: string; note: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact-rdv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: mode,
          fullName,
          organization,
          phone,
          email,
          subject,
          date,
          timeSlot,
          channel,
          message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Impossible d'envoyer votre demande.");
      } else {
        setConfirmation({ ref: data.ref, note: data.note });
      }
    } catch {
      setError("Erreur de connexion. Vous pouvez nous joindre directement sur WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappSummary =
    mode === "RDV"
      ? `Bonjour Sen-E-Carte, je viens de réserver un rendez-vous (${confirmation?.ref || ""}) le ${date} à ${timeSlot} (${channel}) au sujet de : ${subject}. Nom : ${fullName} (${organization || "Particulier"}).`
      : `Bonjour Sen-E-Carte, je vous écris au sujet de : ${subject}. Nom : ${fullName}. Message : ${message}`;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-lg overflow-hidden">
      {/* Onglets Prise de rendez-vous / Discuter */}
      <div
        style={{ backgroundColor: "#071A30" }}
        className="bg-[#071A30] text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setMode("RDV");
              setConfirmation(null);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === "RDV"
                ? "bg-emerald-400 text-brand-950 shadow-md"
                : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Prendre un rendez-vous</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode("MESSAGE");
              setConfirmation(null);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${
              mode === "MESSAGE"
                ? "bg-sky-400 text-brand-950 shadow-md"
                : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Discuter / envoyer un message</span>
          </button>
        </div>
        <span className="text-[11px] font-semibold text-sky-300">
          Réponse rapide · Heure de Dakar (GMT)
        </span>
      </div>

      {confirmation ? (
        <div className="p-7 sm:p-9 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-extrabold text-slate-950">
            {mode === "RDV" ? "Rendez-vous confirmé !" : "Message bien reçu !"}
          </h3>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            {confirmation.note}
            {mode === "RDV" && (
              <>
                {" "}
                Créneau retenu : <strong>{date}</strong> à <strong>{timeSlot}</strong> ({channel}).
              </>
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(whatsappSummary)}`}
              target="_blank"
              rel="noreferrer"
              className="btn-glow-emerald inline-flex items-center gap-2 px-5 py-3 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Confirmer sur WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setConfirmation(null)}
              className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm cursor-pointer"
            >
              Nouvelle demande
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {mode === "RDV" && (
            <div className="space-y-4 pb-4 border-b border-slate-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                    Date souhaitée
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    <span>Créneau horaire (Dakar GMT)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`py-2 rounded-lg text-xs font-extrabold border cursor-pointer transition-colors ${
                          timeSlot === slot
                            ? "bg-[#071A30] text-emerald-300 border-[#071A30]"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:border-sky-400"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  Format du rendez-vous
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {CHANNELS.map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 cursor-pointer transition-all ${
                        channel === ch.id
                          ? "bg-sky-50 border-sky-500 text-sky-900"
                          : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                      }`}
                    >
                      <ch.icon className="w-4 h-4 text-sky-600" />
                      <span className="text-[11px] text-center leading-tight">{ch.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ex : Moussa Diop"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Entreprise / structure
              </label>
              <input
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="Ex : IPM, cabinet, PME, ONG..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Téléphone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Ex : +221 77 000 00 00"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-extrabold text-slate-700 mb-1">
                Adresse email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex : contact@entreprise.sn"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Sujet de l&apos;échange
            </label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
            >
              {SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-1">
              Détails de votre besoin
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Décrivez brièvement votre projet ou vos questions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs leading-relaxed"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
              {error}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={submitting}
              className="btn-glow-emerald flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-brand-950 font-extrabold text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>
                {submitting
                  ? "Envoi en cours..."
                  : mode === "RDV"
                  ? "Confirmer mon rendez-vous"
                  : "Envoyer mon message"}
              </span>
            </button>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(
                "Bonjour Sen-E-Carte, je souhaite discuter avec votre équipe."
              )}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 font-extrabold text-xs sm:text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-600" />
              <span>Discuter sur WhatsApp</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
