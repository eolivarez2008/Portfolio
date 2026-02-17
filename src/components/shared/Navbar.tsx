"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Home, 
  FolderLock, 
  Milestone, 
  User, 
  Send 
} from "lucide-react";

const LINKS = [
  { name: "Accueil", href: "/", icon: <Home size={16} /> },
  { name: "Projets", href: "/projects", icon: <FolderLock size={16} /> },
  { name: "Parcours", href: "/journey", icon: <Milestone size={16} /> },
  { name: "À propos", href: "/about", icon: <User size={16} /> },
  { name: "Contact", href: "/contact", icon: <Send size={16} /> },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
      <div className="flex items-center gap-2 px-4 py-3 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl shadow-blue-500/10">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300",
                isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              {/* L'icône */}
              <span className={cn(
                "transition-transform duration-300",
                isActive ? "text-blue-500 scale-110" : "group-hover:scale-110"
              )}>
                {link.icon}
              </span>

              {/* Le Nom */}
              <span className="hidden md:block">
                {link.name}
              </span>

              {/* Effet Pill (Indicateur actif) */}
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 z-[-1] rounded-xl bg-white/[0.08] border border-white/10"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};