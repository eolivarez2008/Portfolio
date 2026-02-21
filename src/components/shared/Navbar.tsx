"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  GraduationCap,
  User,
  FolderOpen,
  MessagesSquare,
  Menu,
  X,
} from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // On supprime le state "mounted" qui bloque le rendu serveur
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "ACCUEIL", href: "/", icon: <Home size={18} /> },
    { name: "PROJETS", href: "/projects", icon: <FolderOpen size={18} /> },
    { name: "PARCOURS", href: "/journey", icon: <GraduationCap size={18} /> },
    { name: "A PROPOS", href: "/about", icon: <User size={18} /> },
    { name: "CONTACT", href: "/contact", icon: <MessagesSquare size={18} /> },
  ];

  return (
    <nav className="fixed top-7 left-1/2 -translate-x-1/2 z-[1000] w-[90%] max-w-[1200px] pointer-events-none font-sans">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="relative w-full lg:w-auto bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto rounded-[2rem] px-4 py-2 lg:px-2 lg:py-2">
          {/* HEADER MOBILE */}
          <div className="flex items-center justify-between w-full lg:hidden h-10 px-4">
            <span className="text-white font-bold tracking-tighter text-[10px] uppercase opacity-80">
              BAC PRO CIEL
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu" // ajout accessibilité pour PageSpeed
              className="text-white p-2 hover:bg-white/5 rounded-full transition-colors active:scale-95"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* LIENS NAVIGATION */}
          <div
            className={`
              flex flex-col lg:flex-row items-center gap-1
              overflow-hidden transition-all duration-500 ease-in-out
              ${
                isOpen
                  ? "max-h-[500px] opacity-100 pt-2 pb-2"
                  : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100 lg:visible"
                // on retire le invisible pour que le serveur l'affiche en desktop
              }
            `}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3
                    px-5 py-2.5 lg:px-6 lg:py-3
                    rounded-full
                    text-[13px] font-bold tracking-tight
                    transition-all duration-300
                    w-full lg:w-auto
                    whitespace-nowrap
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  <span className="shrink-0">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
