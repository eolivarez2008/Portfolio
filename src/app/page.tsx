"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Gamepad2, Layers, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

export default function Hero() {
  // Liste des domaines d'expertise
  const services = [
    {
      title: "Web Dev",
      description:
        "Interfaces modernes avec Next.js, React et des animations fluides via Framer Motion.",
      icon: Code2,
    },
    {
      title: "Game Dev",
      description:
        "Conception d'expériences interactives et mécaniques sur Unity 6",
      icon: Gamepad2,
    },
    {
      title: "UI/UX Design",
      description:
        "Design minimaliste et efficace pour une expérience utilisateur optimale et agréable.",
      icon: Layers,
    },
    {
      title: "Systèmes CIEL",
      description:
        "Informatique réseaux et systèmes embarqués (Formaton Bac Pro CIEL).",
      icon: Cpu,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen w-full selection:bg-white selection:text-black">
      {/* Section d'introduction principale (Hero) */}
      <section className="pt-28 md:pt-40 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
          <div className="space-y-6 md:space-y-8 z-10">
            {/* Titre animé avec typo massive */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
            >
              Emilien <br />
              <span className="text-zinc-600 italic font-light uppercase">
                OLIVAREZ
              </span>
            </motion.h1>
            <motion.p className="text-base md:text-xl text-zinc-400 max-w-md md:max-w-xl leading-relaxed font-medium">
              Élève en Bac Pro CIEL. Je me forme au développement web et aux
              systèmes embarqués avec une passion pour le minimalisme.
            </motion.p>

            {/* Boutons d'action rapides */}
            <div className="flex flex-row gap-3 md:gap-4 pt-2">
              <Link
                href="/projects"
                className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:scale-105 transition-all text-[11px] md:text-sm uppercase tracking-widest flex items-center gap-2 group"
              >
                Projets{" "}
                <ArrowUpRight
                  size={16}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="bg-zinc-900/50 border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-[11px] md:text-sm uppercase tracking-widest"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* // Citations flottantes (Desktop uniquement) */}
          <div className="relative h-[250px] md:h-[320px] w-full hidden sm:block">
            <blockquote className="absolute top-0 left-0 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 rounded-2xl shadow-2xl w-72 md:w-80 rotate-[-4deg] backdrop-blur-md">
              “La parole ne coûte rien. Montrez-moi le code.”
              <footer className="text-right mt-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                – Linus Torvalds
              </footer>
            </blockquote>

            <blockquote className="absolute bottom-4 right-0 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 rounded-2xl shadow-2xl w-72 md:w-80 rotate-[4deg] backdrop-blur-md">
              “Le design est la façon dont ça fonctionne.”
              <footer className="text-right mt-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
                – Steve Jobs
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Grille des services et expertises */}
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-12 md:mb-20 text-left">
            <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-4">
              Expertise_
            </h2>
            <p className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase italic">
              Skills & Services
            </p>
          </div>

          {/* Affichage des cartes avec effet Tilt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {services.map((service, index) => (
              <TiltCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
