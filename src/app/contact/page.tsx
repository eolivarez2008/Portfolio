"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Mail,
  Github,
  Linkedin,
  Disc as Discord,
  ArrowUpRight,
  Clock,
} from "lucide-react";

export default function ContactPage() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // --- CONFIGURATION DISCORD ---
    const DISCORD_WEBHOOK_URL =
      "https://discordapp.com/api/webhooks/1476575489119359101/CZSmMVr9kse0ewf3lQQo-1SakIrUNZqpQEQI19krJfVwL1yJE0DcX36JkypDtHElfHrw";

    const discordPayload = {
      username: "Portfolio Bot",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/10061/10061835.png",
      embeds: [
        {
          title: "📬 Nouveau message de contact",
          color: 0xffffff,
          fields: [
            { name: "👤 Nom", value: name, inline: true },
            { name: "📧 Email", value: email, inline: true },
            { name: "💬 Message", value: message },
          ],
          footer: { text: "Envoyé depuis eolivarez.site" },
          timestamp: new Date().toISOString(),
        },
      ],
    };

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(discordPayload),
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error("Discord API error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-5xl mx-auto text-white relative selection:bg-white selection:text-black">
      {/* NOTIFICATION FLOTTANTE */}
      <AnimatePresence>
        {status !== "idle" && status !== "loading" && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.95, x: "-50%" }}
            className={`fixed bottom-10 left-1/2 z-[100] flex items-center gap-4 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl min-w-[320px] ${
              status === "success"
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}
          >
            {status === "success" ? (
              <CheckCircle2 size={22} />
            ) : (
              <XCircle size={22} />
            )}
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] opacity-50">
                System Status
              </span>
              <span className="font-bold text-sm tracking-tight uppercase italic">
                {status === "success" ? "Message transmis" : "Échec de l'envoi"}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <div className="mb-20">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter italic uppercase leading-none">
          Contact<span className="text-zinc-700">_</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* FORMULAIRE */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold italic uppercase mb-8 flex items-center gap-3 tracking-tighter">
              <MessageSquare size={20} className="text-zinc-500" /> Envoyer un
              message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-4">
                    Nom
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    placeholder="Ton nom"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-800"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-4">
                    Email
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="ton@email.com"
                    className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 ml-4">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Décris ton projet..."
                  className="w-full bg-white/[0.03] border border-white/5 rounded-3xl px-6 py-4 text-sm focus:outline-none focus:border-white/20 transition-colors placeholder:text-zinc-800 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group w-full bg-white text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2 italic">
                    <Clock size={16} className="animate-spin" /> Transmission...
                  </span>
                ) : (
                  <>
                    Envoyer{" "}
                    <Send
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* SIDEBAR RÉSEAUX */}
        <div className="lg:col-span-5 space-y-6">
          <a
            href="mailto:eolivarez2008@gmail.com"
            className="block glass-card p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.05] transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/5 rounded-xl text-zinc-400 group-hover:text-white transition-colors">
                <Mail size={24} />
              </div>
              <ArrowUpRight
                size={20}
                className="text-zinc-800 group-hover:text-white transition-all"
              />
            </div>
            <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">
              Direct Contact
            </p>
            <p className="text-lg font-bold">eolivarez2008@gmail.com</p>
          </a>

          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://github.com/eolivarez2008"
              target="_blank"
              className="glass-card p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.05] transition-all group text-zinc-500 hover:text-white"
            >
              <Github size={28} />
              <span className="text-[10px] font-mono uppercase tracking-widest">
                GitHub
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/emilien-olivarez-aa9720397"
              target="_blank"
              className="glass-card p-6 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.05] transition-all group text-zinc-500 hover:text-white"
            >
              <Linkedin size={28} />
              <span className="text-[10px] font-mono  uppercase tracking-widest">
                LinkedIn
              </span>
            </a>
          </div>

          <div className="glass-card p-8 rounded-[2rem] border border-white/5 bg-gradient-to-br from-indigo-500/5 to-transparent relative overflow-hidden group">
            <div className="flex items-center gap-4 mb-4 text-indigo-400">
              <Discord size={24} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                Discord Community
              </span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Pour une réponse instantanée ou discuter dev & muscu.
              <span className="text-white font-bold mt-2 block font-mono">
                @ems.lvrz
              </span>
            </p>
            <Discord
              size={80}
              className="absolute -bottom-4 -right-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
