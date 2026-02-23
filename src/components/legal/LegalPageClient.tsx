"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Scale,
  ShieldCheck,
  FileText,
  AlertTriangle,
  Cookie,
} from "lucide-react";

interface LegalContent {
  lastUpdate: string;
  editor: { name: string; type: string; email: string };
  hosting: { type: string; details: string; proxy: string; location: string };
  privacy: {
    contact_form: string;
    analytics: string;
    logs: string;
    rights: string;
  };
  intellectual_property: string;
  security_warning: string;
  cookies: string;
}

export default function LegalPageClient() {
  const [content, setContent] = useState<LegalContent | null>(null);

  useEffect(() => {
    fetch("/api/admin/legal")
      .then((r) => r.json())
      .then(setContent)
      .catch(console.error);
  }, []);

  if (!content) {
    return (
      <main className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto text-white flex items-center justify-center">
        <p className="text-zinc-500 font-mono text-sm">Chargement...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto text-white selection:bg-white selection:text-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic uppercase mb-4">
          Legal<span className="text-zinc-700">_</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Dernière mise à jour : {content.lastUpdate}
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* 1. Mentions légales */}
        <section
          id="mentions"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3 mb-8">
            <Scale size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              1. Mentions Légales
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-zinc-400 leading-relaxed">
            <div>
              <h3 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">
                Éditeur du site
              </h3>
              <p className="font-medium">{content.editor.name}</p>
              <p>{content.editor.type}</p>
              <p className="mt-2 flex items-center gap-2">
                <span className="text-zinc-600 font-mono">Contact :</span>
                <span className="text-white">{content.editor.email}</span>
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">
                Hébergement
              </h3>
              <p className="font-medium">{content.hosting.type}</p>
              <p>{content.hosting.details}</p>
              <p>{content.hosting.proxy}</p>
              <p>Localisation : {content.hosting.location}</p>
            </div>
          </div>
        </section>

        {/* 2. Confidentialité */}
        <section
          id="privacy"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              2. Politique de confidentialité
            </h2>
          </div>
          <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Données personnelles
              </h3>
              <ul className="list-disc pl-5 space-y-4 marker:text-zinc-700">
                <li>
                  <strong className="text-zinc-200">
                    Formulaire de contact :{" "}
                  </strong>
                  {content.privacy.contact_form}
                </li>
                <li>
                  <strong className="text-zinc-200">Analytics : </strong>
                  {content.privacy.analytics}
                </li>
                <li>
                  <strong className="text-zinc-200">Logs techniques : </strong>
                  {content.privacy.logs}
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Vos droits (RGPD)
              </h3>
              <p>{content.privacy.rights}</p>
            </div>
          </div>
        </section>

        {/* 3. Propriété & Sécurité */}
        <section
          id="terms"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3 mb-8">
            <FileText size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              3. Propriété & Sécurité
            </h2>
          </div>
          <div className="space-y-8 text-sm text-zinc-400 leading-relaxed">
            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Propriété intellectuelle
              </h3>
              <p>{content.intellectual_property}</p>
            </div>
            <div className="relative p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
              <div className="flex items-start gap-4">
                <AlertTriangle
                  className="text-red-500 shrink-0 mt-1"
                  size={18}
                />
                <div className="space-y-2">
                  <h4 className="text-red-500 font-black uppercase text-[10px] tracking-widest">
                    Avertissement de sécurité
                  </h4>
                  <p className="text-[11px] text-red-200/60 font-mono leading-tight italic">
                    {content.security_warning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Cookies */}
        <section
          id="cookies"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 hover:border-white/10 transition-all"
        >
          <div className="flex items-center gap-3 mb-8">
            <Cookie size={20} className="text-zinc-500" />
            <h2 className="text-2xl font-bold italic uppercase tracking-tighter">
              4. Cookies
            </h2>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            {content.cookies}
          </p>
        </section>
      </div>
    </main>
  );
}
