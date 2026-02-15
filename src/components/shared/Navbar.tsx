"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "Projets", href: "/projects" },
  { name: "Parcours", href: "/journey" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
      <div className="flex items-center gap-1 px-3 py-2 rounded-full border border-white/10 bg-black/50 backdrop-blur-md">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "relative px-4 py-1.5 text-sm font-medium transition-colors hover:text-white",
              pathname === link.href ? "text-white" : "text-zinc-500"
            )}
          >
            {pathname === link.href && (
              <motion.span
                layoutId="nav-pill"
                className="absolute inset-0 z-[-1] rounded-full bg-white/10"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};