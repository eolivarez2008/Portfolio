"use client";

import { motion } from "framer-motion";
import { Scale, ShieldCheck, FileText, AlertTriangle } from "lucide-react";

export default function LegalPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 px-6 max-w-4xl mx-auto text-white selection:bg-white selection:text-black">
      {/* HEADER SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic uppercase mb-4">
          Legal<span className="text-zinc-700">_</span>
        </h1>
        <p className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          Dernière mise à jour : 27 Février 2026
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* SECTION 1 : MENTIONS LÉGALES */}
        <section
          id="mentions"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 transition-all hover:border-white/10"
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
              <p className="font-medium">Emilien Olivarez</p>
              <p>Projet personnel de portfolio (Étudiant BTS SIO / CIEL).</p>
              <p className="mt-2 flex items-center gap-2">
                <span className="text-zinc-600 font-mono">Contact:</span>
                <span className="text-white">eolivarez2008@gmail.com</span>
              </p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 uppercase text-[10px] tracking-widest">
                Hébergement
              </h3>
              <p className="font-medium">Infrastructure Privée</p>
              <p>Linux Dedicated Server / Docker Containers</p>
              <p>Reverse Proxy: Dockge & Nginx</p>
              <p>Localisation : France</p>
            </div>
          </div>
        </section>

        {/* SECTION 2 : CONFIDENTIALITÉ & RGPD */}
        <section
          id="privacy"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 transition-all hover:border-white/10"
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
                Gestion des données personnelles
              </h3>
              <ul className="list-disc pl-5 space-y-3 marker:text-zinc-800">
                <li>
                  <strong className="text-zinc-200">
                    Formulaire de contact :
                  </strong>{" "}
                  Les données (Nom, Email, Message) sont transmises via Webhook
                  chiffré vers un serveur Discord privé.
                  <p className="mt-2 text-xs text-zinc-500 italic p-3 bg-white/[0.02] rounded-lg border border-white/5">
                    Note : Ce formulaire est protégé par Cloudflare Turnstile.
                    Ce service analyse les données techniques (IP, navigateur)
                    pour bloquer les bots, conformément à la politique de
                    confidentialité de Cloudflare.
                  </p>
                </li>
                <li>
                  <strong className="text-zinc-200">Analyses :</strong>{" "}
                  Utilisation d&apos;Umami Analytics (auto-hébergé). Aucune
                  donnée personnelle n&apos;est stockée, aucun cookie de suivi
                  n&apos;est déposé.
                </li>
                <li>
                  <strong className="text-zinc-200">Logs Techniques :</strong>{" "}
                  Les adresses IP sont enregistrées temporairement par le
                  serveur à des fins de sécurité (protection DDoS/Intrusions).
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-bold uppercase text-[10px] tracking-widest">
                Droits d&apos;accès
              </h3>
              <p>
                Conformément au RGPD, vous disposez d&apos;un droit
                d&apos;accès, de modification et de suppression de vos données
                en envoyant un e-mail à l&apos;adresse de contact mentionnée
                plus haut.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 : PROPRIÉTÉ & SÉCURITÉ */}
        <section
          id="terms"
          className="glass-card p-8 md:p-12 rounded-[2.5rem] border border-white/5 bg-zinc-900/10 backdrop-blur-sm scroll-mt-32 transition-all hover:border-white/10"
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
                Propriété Intellectuelle
              </h3>
              <p>
                Le code source de ce site est{" "}
                <span className="text-white">Open Source</span> (Licence MIT).
                Cependant, les contenus (textes, images de projets, logos
                personnels) restent la propriété de l&apos;éditeur.
              </p>
            </div>

            <div className="relative overflow-hidden p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
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
                    Toute tentative d&apos;accès frauduleux, scan de
                    vulnérabilités ou attaque par déni de service (DDoS) est
                    enregistrée par le monitoring interne (Portainer/Uptime
                    Kuma). L&apos;éditeur se réserve le droit de bannir
                    définitivement toute IP suspecte.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
