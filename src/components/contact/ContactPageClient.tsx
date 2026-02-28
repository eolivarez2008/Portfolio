"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  CheckCircle2,
  MessageSquare,
  Clock,
  XCircle,
  User,
  AtSign,
} from "lucide-react";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";
import { trackEvent } from "@/lib/analytics";

export default function ContactPageClient() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileInstance>(null);

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const MAX_CHARS = 1000;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      setErrorMsg("Vérification de sécurité requise.");
      setStatus("error");
      trackEvent("contact-error-captcha");
      return;
    }

    setStatus("loading");
    trackEvent("contact-submit-attempt");
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      captchaToken: token,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        trackEvent("contact-success");
        formRef.current?.reset();
        setCharCount(0);
        setToken(null);
        turnstileRef.current?.reset();
        setTimeout(() => setStatus("idle"), 6000);
      } else {
        setToken(null);
        turnstileRef.current?.reset();
        trackEvent("contact-error-api", { reason: result.error });
        throw new Error(result.error || "Erreur de transmission");
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Impossible de joindre le serveur.";
      setErrorMsg(errorMessage);
      trackEvent("contact-error-catch");
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto text-white selection:bg-white selection:text-black">
      <section className="text-center mb-16 space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter uppercase italic"
        >
          Contact<span className="text-zinc-800">_</span>
        </motion.h1>

        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/5 px-5 py-3 rounded-2xl">
            <Mail size={16} className="text-zinc-500" />
            <span className="text-xs font-medium italic text-zinc-300">
              eolivarez2008@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/5 px-5 py-3 rounded-2xl">
            <MapPin size={16} className="text-zinc-500" />
            <span className="text-xs font-medium italic text-zinc-300">
              Metz, France
            </span>
          </div>
        </div>
      </section>

      <section className="relative">
        <AnimatePresence mode="wait">
          {status === "success" && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-[2.5rem] border border-emerald-500/20"
            >
              <div className="text-center space-y-4 px-6">
                <CheckCircle2 size={50} className="text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold uppercase italic tracking-tight">
                  Message Transmis
                </h3>
                <p className="text-zinc-400 text-[10px] font-mono tracking-[0.3em]">
                  Vous serez recontacté dès que possible.
                </p>
              </div>
            </motion.div>
          )}

          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 rounded-[2.5rem] border border-red-500/20"
            >
              <div className="text-center space-y-6 px-6">
                <XCircle size={50} className="text-red-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold uppercase italic tracking-tight">
                    Erreur Système
                  </h3>
                  <p className="text-red-400/80 text-[11px] font-mono uppercase tracking-widest max-w-xs mx-auto">
                    {errorMsg}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setStatus("idle");
                    turnstileRef.current?.reset();
                  }}
                  className="px-8 py-3 bg-white text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-200 transition-all"
                >
                  Réessayer
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/5">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-black italic">
                  Identité
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors"
                    size={18}
                  />
                  <input
                    name="name"
                    required
                    maxLength={100}
                    type="text"
                    placeholder="Votre nom"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 ml-1 font-black italic">
                  Email
                </label>
                <div className="relative group">
                  <AtSign
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors"
                    size={18}
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="jean@exemple.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-14 pr-6 py-5 text-sm outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end px-1">
                <label className="text-[11px] uppercase tracking-[0.2em] text-zinc-400 font-black italic">
                  Message
                </label>
                <span
                  className={`text-[9px] font-mono ${charCount >= MAX_CHARS ? "text-red-500" : "text-zinc-600"}`}
                >
                  {charCount}/{MAX_CHARS}
                </span>
              </div>
              <div className="relative group">
                <MessageSquare
                  className="absolute left-5 top-6 text-zinc-600 group-focus-within:text-white transition-colors"
                  size={18}
                />
                <textarea
                  name="message"
                  required
                  maxLength={MAX_CHARS}
                  rows={5}
                  onChange={(e) => setCharCount(e.target.value.length)}
                  placeholder="Décrivez votre projet..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] pl-14 pr-6 py-6 text-sm outline-none focus:border-white/30 transition-all resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-8 pt-4">
              <Turnstile
                ref={turnstileRef}
                siteKey={siteKey || ""}
                onSuccess={(token) => setToken(token)}
                options={{ theme: "dark" }}
              />
              <button
                disabled={status === "loading" || status === "success"}
                className="group w-full md:w-auto md:min-w-[260px] bg-white text-black font-black uppercase tracking-[0.2em] py-5 px-12 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Clock size={18} className="animate-spin" /> Vérification
                  </>
                ) : (
                  <>
                    Envoyer <Send size={18} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
