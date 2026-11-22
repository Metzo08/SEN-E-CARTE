"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  X,
  Send,
  Globe,
  Clock,
  Sparkles,
  ExternalLink,
  ArrowRight,
  MessageCircle,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
} from "lucide-react";
import { SITE_CONFIG } from "@/data/senecarteData";

interface SourceItem {
  title: string;
  url: string;
  snippet: string;
}

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: SourceItem[];
  quickLink?: { label: string; href: string } | null;
  timestamp: string;
}

const SUGGESTIONS_FR = [
  "Quelle heure est-il à Dakar ?",
  "Quels sont vos tarifs cartes NFC/QR ?",
  "Plateforme avocats OCR & audiences",
  "Portail santé IPM anti-fraude",
];

const SUGGESTIONS_WO = [
  "Salamalekum ! Lan la Sen-E-Carte ?",
  "Ñaata la kart NFC/QR ?",
  "Ban waxtu la ci Dakar leegi ?",
  "Naka la kart wér-gi-yaram di doxee ?",
];

function getDakarClockShort(): string {
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      timeZone: "Africa/Dakar",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return "";
  }
}

export default function SenECarteChatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"fr" | "wo">("fr");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [clock, setClock] = useState("");
  const [messages, setMessages] = useState<UiMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Salamalekum ! Je suis l'assistant IA de Sen-E-Carte, connecté à internet en temps réel. Écrivez-moi ou parlez-moi en français ou en wolof !",
      quickLink: { label: "Explorer nos solutions", href: "/solutions" },
      timestamp: "",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setClock(getDakarClockShort());
    const id = setInterval(() => setClock(getDakarClockShort()), 30000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  const speakText = (rawText: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;
    try {
      window.speechSynthesis.cancel();
      const clean = rawText.replace(/\*\*/g, "").replace(/[•#]/g, "").slice(0, 420);
      const utter = new SpeechSynthesisUtterance(clean);
      utter.lang = "fr-FR";
      utter.rate = 1.02;
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  const toggleMicrophone = () => {
    if (typeof window === "undefined") return;
    if (listening && recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setListening(false);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      setMessages((prev) => [
        ...prev,
        {
          id: `mic-err-${Date.now()}`,
          role: "assistant",
          content:
            "La dictée vocale n'est pas prise en charge par ce navigateur. Utilisez Chrome ou Edge, ou saisissez votre question ci-dessous.",
          timestamp: getDakarClockShort(),
        },
      ]);
      return;
    }

    try {
      const rec = new SpeechRec();
      rec.lang = lang === "wo" ? "fr-SN" : "fr-FR";
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec.onresult = (event: any) => {
        const transcript = event?.results?.[0]?.[0]?.transcript || "";
        if (transcript) {
          setInput(transcript);
          sendMessage(transcript);
        }
        setListening(false);
      };
      rec.onerror = () => setListening(false);
      rec.onend = () => setListening(false);
      recognitionRef.current = rec;
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
    }
  };

  const sendMessage = async (textOverride?: string) => {
    const text = (textOverride ?? input).trim();
    if (!text || loading) return;

    const nowLabel = getDakarClockShort();
    const userMsg: UiMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: nowLabel,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textOverride) setInput("");
    setLoading(true);

    try {
      const historyPayload = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          lang,
          history: historyPayload,
        }),
      });
      const data = await res.json();

      const replyText =
        data.reply ||
        data.error ||
        "Je reste à votre disposition pour toute question sur Sen-E-Carte.";

      const botMsg: UiMessage = {
        id: `a-${Date.now()}`,
        role: "assistant",
        content: replyText,
        sources: Array.isArray(data.sources) ? data.sources : [],
        quickLink: data.quickLink || null,
        timestamp: getDakarClockShort(),
      };
      setMessages((prev) => [...prev, botMsg]);
      speakText(replyText);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `e-${Date.now()}`,
          role: "assistant",
          content:
            "Connexion momentanément ralentie. Vous pouvez aussi joindre directement notre équipe Sen-E-Carte sur WhatsApp au +221 77 602 67 83.",
          timestamp: getDakarClockShort(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = lang === "wo" ? SUGGESTIONS_WO : SUGGESTIONS_FR;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Fenêtre de chat */}
      {open && (
        <div className="mb-3 w-[calc(100vw-2.2rem)] sm:w-[410px] max-h-[80vh] rounded-3xl bg-white border border-slate-200 shadow-2xl overflow-hidden flex flex-col">
          {/* En-tête avec logo Sen-E-Carte + sélecteur Français / Wolof + audio */}
          <div
            style={{ backgroundColor: "#071A30" }}
            className="bg-[#071A30] text-white px-4 py-3.5 flex items-center justify-between gap-2 border-b border-sky-400/25"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-sky-500/15 border border-sky-400/35 p-1 flex items-center justify-center shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/chatbot-logo-senecarte.png"
                  alt="Logo Sen-E-Carte"
                  className="w-full h-full object-contain"
                  style={{ outline: "none" }}
                />
              </div>
              <div className="leading-tight">
                <div className="text-sm font-extrabold flex items-center gap-1.5">
                  <span>Sen-E-Carte IA</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[10px] text-sky-300 flex items-center gap-2 mt-0.5">
                  <span className="inline-flex items-center gap-1">
                    <Globe className="w-3 h-3" /> Web live
                  </span>
                  {clock && (
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Dakar {clock}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Toggle Français / Wolof */}
              <div className="inline-flex rounded-full bg-white/10 p-0.5 border border-white/15 text-[10px] font-extrabold">
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                    lang === "fr" ? "bg-emerald-400 text-brand-950" : "text-slate-200"
                  }`}
                >
                  FR
                </button>
                <button
                  type="button"
                  onClick={() => setLang("wo")}
                  className={`px-2 py-1 rounded-full cursor-pointer transition-colors ${
                    lang === "wo" ? "bg-emerald-400 text-brand-950" : "text-slate-200"
                  }`}
                >
                  Wolof
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (voiceEnabled && typeof window !== "undefined" && "speechSynthesis" in window) {
                    window.speechSynthesis.cancel();
                  }
                  setVoiceEnabled((v) => !v);
                }}
                title={voiceEnabled ? "Couper la voix" : "Activer la voix"}
                aria-label="Activer ou couper la lecture vocale"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sky-200 cursor-pointer"
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer l'assistant IA"
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-2xl px-4 py-3 text-xs leading-relaxed whitespace-pre-line shadow-xs ${
                    m.role === "user"
                      ? "bg-[#071A30] text-white rounded-br-sm"
                      : "bg-white border border-slate-200 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {m.content}

                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 space-y-1">
                      <div className="text-[10px] font-extrabold text-sky-700 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Sources web vérifiées :
                      </div>
                      {m.sources.map((s) => (
                        <a
                          key={s.url}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-[11px] font-semibold text-sky-700 hover:underline truncate"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{s.title}</span>
                        </a>
                      ))}
                    </div>
                  )}

                  {m.quickLink && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <Link
                        href={m.quickLink.href}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-700 hover:text-emerald-900"
                      >
                        <span>{m.quickLink.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
                {m.timestamp && (
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.timestamp}</span>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-slate-500 px-2">
                <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin" />
                <span>{lang === "wo" ? "Maa ngi seet tontu bi..." : "Recherche & rédaction en cours..."}</span>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions rapides (FR ou Wolof) */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-white border-t border-slate-100 flex flex-wrap gap-1.5">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => sendMessage(s)}
                  className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-sky-100 text-[11px] font-semibold text-slate-700 hover:text-sky-900 transition-colors cursor-pointer"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Zone de saisie + Micro vocal FR/Wolof */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={toggleMicrophone}
              aria-label={listening ? "Arrêter le micro" : "Parler en français ou en wolof"}
              title={listening ? "Écoute en cours..." : "Parler (Français / Wolof)"}
              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                listening
                  ? "bg-rose-500 text-white animate-pulse"
                  : "bg-slate-100 hover:bg-sky-100 text-slate-700"
              }`}
            >
              {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === "wo"
                  ? "Bindal walla waxal sa laaj (Wolof / FR)..."
                  : "Écrivez ou parlez en français ou en wolof..."
              }
              className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-sky-500 focus:outline-none text-xs"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Envoyer le message"
              className="w-10 h-10 rounded-xl bg-[#071A30] hover:bg-sky-900 text-emerald-300 flex items-center justify-center disabled:opacity-40 cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Pied rapide WhatsApp */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
            <span>Sen-E-Carte IA · Français &amp; Wolof</span>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:underline"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp direct</span>
            </a>
          </div>
        </div>
      )}

      {/* Logo 3D Sen-E-Carte flottant avec halo lumineux */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative flex flex-col items-center cursor-pointer focus:outline-none"
        aria-label="Ouvrir l'assistant IA Sen-E-Carte (Français & Wolof)"
      >
        {/* Halo lumineux doux sous le logo flottant */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full bg-sky-400/25 blur-xl group-hover:bg-emerald-400/35 transition-all"
          aria-hidden="true"
        />
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 animate-float-slow drop-shadow-[0_14px_22px_rgba(7,26,48,0.45)] group-hover:scale-110 transition-transform">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/chatbot-logo-senecarte.png"
            alt="Assistant IA Sen-E-Carte"
            className="w-full h-full object-contain"
            style={{ outline: "none" }}
          />
          <span className="absolute top-1.5 right-2 w-3.5 h-3.5 rounded-full bg-emerald-400 ring-2 ring-white shadow-md animate-pulse" />
        </div>
        <span
          style={{ backgroundColor: "#071A30" }}
          className="-mt-2 relative px-3 py-1 rounded-full bg-[#071A30] text-white border border-sky-400/50 text-[11px] font-extrabold shadow-lg whitespace-nowrap"
        >
          IA · FR / Wolof
        </span>
      </button>
    </div>
  );
}
