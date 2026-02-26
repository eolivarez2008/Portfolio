"use client";

import React, { useState } from "react";
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
  const pathname = usePathname();

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
        {/* CONTAINER PRINCIPAL */}
        <div className="relative w-full lg:w-auto bg-black/40 backdrop-blur-xl border border-white/10 pointer-events-auto rounded-[2rem] px-6 py-3 lg:px-8 lg:py-4">
          {/* HEADER MOBILE */}
          <div className="flex items-center justify-between w-full lg:hidden">
            <span className="text-white font-bold tracking-tighter text-xs uppercase opacity-80">
              BAC PRO CIEL
            </span>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* LIENS NAVIGATION */}
          <div
            className={`
              flex flex-col lg:flex-row items-center gap-1
              overflow-hidden
              transition-[max-height,opacity] duration-300 ease-in-out
              ${
                isOpen
                  ? "max-h-[500px] mt-4 opacity-100"
                  : "max-h-0 opacity-0 lg:max-h-none lg:opacity-100"
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
                    px-5 py-3 lg:px-6 lg:py-2.5
                    rounded-full
                    text-[13px] font-bold tracking-tight
                    transition-all duration-300
                    w-full lg:w-auto
                    ${
                      isActive
                        ? "bg-white text-black"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }
                  `}
                >
                  {link.icon}
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
