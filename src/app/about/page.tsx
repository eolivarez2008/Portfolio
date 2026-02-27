"use client";

import { motion } from "framer-motion";
import { Code2, Dumbbell, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TECH_STACK, ROADMAP_STEPS } from "@/data/aboutData";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-28 md:pt-40 pb-20 text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* SECTION 1 : BIOGRAPHIE & ROADMAP */}
      <section className="px-6 max-w-5xl mx-auto mb-20 md:mb-32">
        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter italic uppercase mb-10 md:mb-16">
          Sur moi<span className="text-zinc-700">_</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16">
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-zinc-400 text-base md:text-lg leading-relaxed">
            <p>
              Depuis que je suis gamin, j&apos;ai toujours été fasciné par la
              manière dont les choses fonctionnent. Ce qui a commencé par une
              simple curiosité devant l&apos;ordinateur familial s&apos;est
              transformé en une véritable passion en classe de 3ème. C&apos;est
              à ce moment-là que j&apos;ai réalisé que je ne voulais pas
              seulement utiliser des logiciels, mais les créer.
            </p>
            <p>
              Aujourd&apos;hui, à 17 ans, je suis en Terminale Bac Pro CIEL. Ma
              réalité quotidienne, c&apos;est de coder sur le{" "}
              <span className="text-white font-medium italic border-b border-white/10">
                PC Windows de la région
              </span>
              . Je n&apos;ai pas de setup dernier cri, mais j&apos;ai appris que
              la puissance de calcul ne remplace jamais la persévérance.
            </p>
            <p>
              Chaque ligne de code est un pas de plus vers mon objectif :
              devenir un développeur capable de maîtriser aussi bien
              l&apos;infrastructure réseau que l&apos;expérience utilisateur
              créative.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 bg-zinc-900/20 shadow-2xl">
              <h3 className="flex items-center gap-3 text-zinc-500 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] mb-8">
                <Target size={12} /> Prochaines Étapes
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

                {ROADMAP_STEPS.map((step, index) => (
                  <div
                    key={index}
                    className={`relative flex gap-5 items-start ${!step.active && !step.placeholder ? "opacity-70" : ""} ${step.placeholder ? "opacity-40" : ""}`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-4 border-black z-10 mt-1 ${step.active ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "bg-zinc-800"}`}
                    />
                    <div>
                      <p
                        className={`text-sm font-bold tracking-tight ${step.active ? "text-white" : "text-zinc-400"} ${step.placeholder ? "text-zinc-700 italic" : ""}`}
                      >
                        {step.title}
                      </p>
                      {step.date && (
                        <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase italic">
                          {step.date}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : STACK TECHNIQUE */}
      <section className="py-10 md:py-15 bg-zinc-950/40 border-y border-zinc-900 mb-24 md:mb-24 relative">
        <div className="max-w-5xl mx-auto px-6 mb-3">
          <h2 className="text-[15px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-bold mt-3">
            Stack Technique
          </h2>
        </div>

        <div className="relative w-full overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

          <div className="flex py-12">
            <motion.div
              className="flex gap-4 pr-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                <div
                  key={i}
                  className="group relative flex items-center justify-center min-w-[85px] md:min-w-[110px] h-[85px] md:h-[110px] glass-card rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-white/20 transition-all shrink-0 hover:-translate-y-2"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[9px] uppercase text-white tracking-widest">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3 : PROJETS & DISCIPLINE */}
      <section className="px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
        <div className="md:col-span-8 glass-card p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] relative overflow-hidden group border border-white/5 bg-zinc-900/10">
          <div className="relative z-10 h-full flex flex-col justify-between items-start">
            <div className="mb-8">
              <h3 className="text-2xl md:text-3xl font-bold italic uppercase mb-4 tracking-tighter">
                Créations & Réalisations
              </h3>
              <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-md">
                De l&apos;expérimentation 3D avec WebGL au développement de
                Dungeon Crawlers sur Unity. Chaque projet est une opportunité
                d&apos;apprendre une nouvelle technologie.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest group-hover:gap-6 transition-all text-white bg-white/5 px-6 py-3.5 rounded-full border border-white/10 hover:bg-white/10"
            >
              Explorer mes projets <ArrowRight size={14} />
            </Link>
          </div>
          <Code2
            size={160}
            className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity"
          />
        </div>

        <div className="md:col-span-4 glass-card p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-zinc-900/30 border border-white/5 flex flex-col justify-center">
          <Dumbbell size={28} className="text-zinc-700 mb-6" />
          <h3 className="text-lg font-bold italic uppercase mb-3 text-white">
            Discipline
          </h3>
          <p className="text-zinc-500 text-[12px] md:text-[13px] leading-relaxed italic">
            &rdquo;La musculation m&apos;a appris que la progression est une
            question de répétition. C&apos;est la même chose devant un écran :
            build, fail, repeat.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
