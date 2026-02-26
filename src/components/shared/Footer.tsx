"use client";

import Link from "next/link";
import { Command, ArrowRight, Layout, Scale, Copyright } from "lucide-react";

const FOOTER_LINKS = {
  navigation: [
    { name: "Accueil", href: "/" },
    { name: "Projets", href: "/projects" },
    { name: "Parcours", href: "/journey" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ],
  legal: [
    { name: "Mentions Légales", href: "/legal#mentions" },
    { name: "Confidentialité", href: "/legal#privacy" },
    { name: "CGU", href: "/legal#terms" },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t border-zinc-900 pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* COLONNE GAUCHE : BRAND & INFO */}
          <div className="md:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  <Command size={20} className="text-black" />
                </div>
                <span className="text-white font-black tracking-tighter text-xl uppercase italic">
                  Emilien OLIVAREZ
                </span>
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed max-w-sm">
                {
                  "Développeur & Designer. Spécialisé dans la création d'interfaces minimalistes et la gestion d'infrastructures cloud."
                }
              </p>
            </div>

            {/* COPYRIGHT CARD AVEC ICONE LUCIDE */}
            <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-zinc-950 border border-zinc-900 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Copyright size={14} className="text-zinc-500" />
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
                  {currentYear} — eolivarez.site
                </span>
              </div>
              <div className="h-4 w-[1px] bg-zinc-800" />
              <span className="text-[9px] font-mono text-zinc-600 uppercase">
                v1.2.4
              </span>
            </div>
          </div>

          {/* COLONNE EXPLORER */}
          <div className="md:col-span-3 md:col-start-8 space-y-6">
            <div className="flex items-center gap-2 border-l-2 border-white pl-3">
              <Layout size={14} className="text-white" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                Explorer
              </h4>
            </div>
            <ul className="space-y-3">
              {FOOTER_LINKS.navigation.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[12px] text-zinc-500 hover:text-white transition-all"
                  >
                    <ArrowRight
                      size={10}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLONNE LÉGAL */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-2 border-l-2 border-white pl-3">
              <Scale size={14} className="text-zinc-400" />
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                Légal
              </h4>
            </div>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-[12px] text-zinc-500 hover:text-white transition-all"
                  >
                    <ArrowRight
                      size={10}
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
