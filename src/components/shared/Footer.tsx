"use client";
import Link from "next/link";
import { Github, Mail, Phone, ArrowUp, Globe, MessageSquare } from "lucide-react";

const NAV_LINKS = [
  { name: "Accueil", href: "/" },
  { name: "Projets", href: "/projects" },
  { name: "Parcours", href: "/journey" },
  { name: "A propos de moi", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#050505] border-t border-white/5 pt-10 pb-5 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-black italic tracking-tighter uppercase text-white">
              Emilien <span className="text-blue-500">OLIVAREZ</span>
            </h2>
            <p className="text-zinc-500 text-sm max-w-sm leading-relaxed">
              Étudiant en Bac Pro CIEL. 
              Spécialisé dans la création d'interfaces interactives et la modélisation 3D.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/eolivarez2008" target="_blank" className="p-3 bg-white/[0.03] border border-white/5 rounded-full hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-zinc-400 hover:text-white">
                <Github size={20} />
              </a>
              <a href="https://discord.com/users/ems.lvrz" target="_blank" className="p-3 bg-white/[0.03] border border-white/5 rounded-full hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-zinc-400 hover:text-white">
                <MessageSquare size={20} />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Menu</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.3em]">Coordonnées</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-zinc-400">
                <Phone size={14} className="text-blue-500" /> 06 50 45 45 32
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 italic">
                <Mail size={14} className="text-blue-500" /> eolivarez2008@gmail.com
              </li>
              <li className="flex items-center gap-3 text-sm text-zinc-400 italic">
                <Globe size={14} className="text-blue-500" /> Metz, France
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-5 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              © 2026 — Emilien Olivarez
            </p>
            <div className="hidden md:flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[9px] font-mono text-zinc-700 uppercase">System Operational</span>
            </div>
          </div>

          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-mono text-zinc-400 uppercase tracking-widest hover:text-white transition-colors"
          >
            Back to top 
            <div className="p-2 rounded-lg bg-white/[0.03] border border-white/5 group-hover:border-blue-500 transition-colors">
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}