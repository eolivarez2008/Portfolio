"use client";

import Link from "next/link";
import { Command, ArrowRight, Layout, Scale, Copyright } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

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
    <footer className="w-full bg-black/40 backdrop-blur-xl border-t border-zinc-800 pt-16 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-center md:text-left">
          {/* COLONNE GAUCHE */}
          <div className="md:col-span-5 flex flex-col items-center md:items-start space-y-6">
            <div className="space-y-4 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] shrink-0">
                  <Command size={20} className="text-black" />
                </div>
                <span className="text-white font-black tracking-tighter text-xl uppercase italic">
                  Emilien OLIVAREZ
                </span>
              </div>
              <p className="text-zinc-500 text-[13px] leading-relaxed max-w-sm">
                Spécialisé en Cybersécurité, Informatique et Réseaux. Création
                d&apos;interfaces minimalistes et gestion
                d&apos;infrastructures.
              </p>
            </div>

            <div className="flex items-center gap-2 text-zinc-500 pt-2">
              <Copyright size={14} />
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">
                {currentYear} — eolivarez.site
              </span>
            </div>
          </div>

          {/* COLONNE EXPLORER */}
          <div className="md:col-span-3 md:col-start-7 flex flex-col items-center md:items-start space-y-6">
            <div className="flex items-center gap-4 w-full justify-center md:justify-start">
              <div className="w-10 h-10 bg-zinc-900/50 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Layout size={18} className="text-white/70" />
              </div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                Explorer
              </h4>
            </div>

            <nav aria-label="Navigation de pied de page">
              <ul className="space-y-3 flex flex-col items-center md:items-start w-full">
                {FOOTER_LINKS.navigation.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        trackEvent("footer-nav-click", {
                          target: link.name.toLowerCase(),
                        })
                      }
                      aria-label={`Aller sur la page ${link.name}`}
                      className="group flex items-center gap-2 text-[12px] text-zinc-500 hover:text-white transition-all w-fit"
                    >
                      <ArrowRight
                        size={10}
                        className="hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* COLONNE LÉGAL */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start space-y-6">
            <div className="flex items-center gap-4 w-full justify-center md:justify-start">
              <div className="w-10 h-10 bg-zinc-900/50 border border-white/10 rounded-xl flex items-center justify-center shrink-0">
                <Scale size={18} className="text-zinc-400" />
              </div>
              <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                Légal
              </h4>
            </div>

            <nav aria-label="Liens légaux">
              <ul className="space-y-3 flex flex-col items-center md:items-start w-full">
                {FOOTER_LINKS.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() =>
                        trackEvent("footer-legal-click", {
                          target: link.name.toLowerCase(),
                        })
                      }
                      aria-label={`Aller sur la page ${link.name}`}
                      className="group flex items-center gap-2 text-[12px] text-zinc-500 hover:text-white transition-all w-fit"
                    >
                      <ArrowRight
                        size={10}
                        className="hidden md:block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white"
                      />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
