"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Code2, Gamepad2, Layers, Cpu } from "lucide-react";
import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";

export default function Hero() {
  const services = [
    {
      title: "Web Dev",
      description:
        "Interfaces modernes avec Next.js, React et des animations fluides.",
      icon: Code2,
    },
    {
      title: "Game Dev",
      description:
        "Conception d'expériences interactives et mécaniques sur Unity & C#.",
      icon: Gamepad2,
    },
    {
      title: "UI/UX Design",
      description:
        "Design minimaliste et efficace pour une expérience utilisateur optimale.",
      icon: Layers,
    },
    {
      title: "Systèmes CIEL",
      description:
        "Informatique réseaux et systèmes embarqués (Formation Bac Pro CIEL).",
      icon: Cpu,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen w-full selection:bg-white selection:text-black">
      {/* ===== HERO SECTION ===== */}
      <section className="pt-32 md:pt-48 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
            >
              Emilien <br />
              <span className="text-zinc-500 italic font-light">OLIVAREZ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-400 max-w-xl leading-relaxed font-medium"
            >
              Élève en Bac Pro CIEL. Je me forme au développement web et aux
              systèmes embarqués avec une passion pour les interfaces
              minimalistes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/projects"
                className="bg-white text-black px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center gap-2 group"
              >
                Projets{" "}
                <ArrowUpRight
                  size={18}
                  className="group-hover:rotate-45 transition-transform"
                />
              </Link>
              <Link
                href="/contact"
                className="bg-zinc-900/50 border border-white/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-sm uppercase tracking-widest"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* ===== FLOATING TESTIMONIALS ===== */}
          <div className="relative h-[280px] md:h-[300px] lg:h-[320px] w-full hidden sm:block">
            <blockquote
              className="absolute top-3 left-0 bg-gradient-to-br from-white/5 to-white/10 
                         border border-white/10 text-base text-white p-6 rounded-2xl 
                         shadow-2xl w-80 rotate-[-4deg] backdrop-blur-md"
            >
              “La parole ne coûte rien. Montrez-moi le code.”
              <footer className="text-right mt-4 text-sm text-gray-400 font-mono">
                – Linus Torvalds
              </footer>
            </blockquote>

            <blockquote
              className="absolute bottom-6 right-0 bg-gradient-to-br from-white/5 to-white/10 
                         border border-white/10 text-base text-white p-6 rounded-2xl 
                         shadow-2xl w-80 rotate-[4deg] backdrop-blur-md"
            >
              “Le design est la façon dont ça fonctionne.”
              <footer className="text-right mt-4 text-sm text-gray-400 font-mono">
                – Steve Jobs
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col mb-20">
            <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-4">
              Expertise_
            </h2>
            <p className="text-5xl md:text-6xl font-extrabold tracking-tighter uppercase italic">
              Skills & Services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <TiltCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
