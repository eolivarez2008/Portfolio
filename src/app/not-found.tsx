"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 bg-black text-white selection:bg-white selection:text-black pt-32 pb-16">
      <div className="text-center w-full max-w-4xl mx-auto space-y-12 md:space-y-16">
        {/* GROS 404 - Opacité réduite pour le style minimaliste */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[8rem] sm:text-[14rem] md:text-[17rem] font-bold tracking-tighter leading-none italic select-none"
        >
          404
        </motion.h1>

        {/* COMPOSANT TERMINAL */}
        <div className="flex justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md shadow-2xl"
          >
            <Terminal size={20} className="text-zinc-500" />
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] font-bold">
              Page_Not_Found
            </span>
          </motion.div>
        </div>

        {/* MESSAGE */}
        <div className="space-y-4 md:space-y-6 pt-6">
          <h2 className="text-xl md:text-3xl font-bold uppercase italic tracking-tight">
            Le chemin spécifié est introuvable.
          </h2>
          <p className="text-zinc-500 text-sm md:text-base max-w-md mx-auto leading-relaxed font-medium">
            La ressource que vous tentez de consulter a été déplacée, supprimée
            ou n&apos;existe pas dans ce terminal.
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
          <Link
            href="/"
            className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-zinc-200 transition-all active:scale-95 text-xs"
          >
            <Home size={16} />
            Retour à l&apos;accueil
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-3 text-zinc-500 hover:text-white transition-colors uppercase font-bold tracking-widest text-[10px]"
          >
            <ArrowLeft size={14} />
            Revenir en arrière
          </button>
        </div>
      </div>
    </main>
  );
}
