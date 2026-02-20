"use client";

import { motion } from "framer-motion";
import { Code2, Dumbbell, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TECH_STACK = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Unity",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg",
  },
  {
    name: "C#",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Linux",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-32 text-white selection:bg-white selection:text-black">
      {/* SECTION 1 : BIOGRAPHIE ENRICHIE */}
      <section className="px-6 max-w-5xl mx-auto mb-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter italic uppercase mb-12">
          Sur moi<span className="text-zinc-700">_</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8 text-zinc-400 text-lg leading-relaxed">
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
              C&apos;est sur cette machine que j&apos;ai compilé mes premiers
              jeux Unity et rendu mes premières scènes WebGL.
            </p>
            <p>
              Chaque ligne de code est un pas de plus vers mon objectif :
              devenir un développeur capable de maîtriser aussi bien
              l&apos;infrastructure réseau que l&apos;expérience utilisateur
              créative.
            </p>
          </div>

          {/* ROADMAP VERCEL STYLE */}
          <div className="lg:col-span-5">
            <div className="glass-card p-8 rounded-3xl border border-white/5 bg-zinc-900/20 shadow-2xl">
              <h3 className="flex items-center gap-3 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em] mb-8">
                <Target size={12} /> Prochaines Étapes
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[7px] top-2 bottom-2 w-[1px] bg-white/10" />

                <div className="relative flex gap-5 items-start">
                  <div className="w-3.5 h-3.5 rounded-full bg-white border-4 border-black z-10 mt-1 shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div>
                    <p className="text-sm font-bold text-white tracking-tight">
                      BTS SIO Option SLAM
                    </p>
                    <p className="text-[11px] text-zinc-500 font-mono mt-1 uppercase">
                      2026 — 2028 • Robert Schuman, Metz
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-5 items-start">
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-800 border-4 border-black z-10 mt-1" />
                  <div>
                    <p className="text-sm font-bold text-zinc-400 tracking-tight">
                      L3 Informatique
                    </p>
                    <p className="text-[11px] text-zinc-600 font-mono mt-1 uppercase">
                      2028 — 2029 • Approfondissement
                    </p>
                  </div>
                </div>

                <div className="relative flex gap-5 items-start opacity-30">
                  <div className="w-3.5 h-3.5 rounded-full bg-zinc-900 border-4 border-black z-10 mt-1" />
                  <p className="text-sm font-bold text-zinc-700 italic">
                    Master en projet...
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 : STACK TECHNIQUE */}
      <section className="py-16 bg-zinc-950/40 border-y border-white/5 overflow-hidden mb-32 relative">
        <div className="max-w-5xl mx-auto px-6 mb-8">
          <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] font-bold">
            Stack Technique
          </h2>
        </div>

        <div className="flex w-full overflow-hidden group py-4 relative">
          <motion.div
            className="flex gap-4 pr-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
              <div
                key={i}
                className="group relative flex items-center justify-center min-w-[100px] h-[100px] glass-card rounded-2xl bg-zinc-900/30 hover:border-white/20 transition-all"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={40}
                  height={40}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] uppercase text-white tracking-tighter">
                    {tech.name}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Gradients de fondu */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent z-10" />
      </section>

      {/* SECTION 3 : PROJETS & DISCIPLINE */}
      <section className="px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 glass-card p-10 rounded-[2.5rem] relative overflow-hidden group border border-white/5">
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold italic uppercase mb-4 tracking-tighter">
                Créations & Réalisations
              </h3>
              <p className="text-zinc-500 leading-relaxed mb-10 max-w-md">
                De l&apos;expérimentation 3D avec WebGL au développement de
                Dungeon Crawlers sur Unity. Chaque projet est une opportunité
                d&apos;apprendre une nouvelle technologie.
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest group-hover:gap-6 transition-all text-white bg-white/5 w-fit px-6 py-3 rounded-full border border-white/10 hover:bg-white/10"
            >
              Explorer mes projets <ArrowRight size={14} />
            </Link>
          </div>
          <Code2
            size={160}
            className="absolute -bottom-10 -right-10 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity"
          />
        </div>

        <div className="md:col-span-4 glass-card p-10 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 flex flex-col justify-center">
          <Dumbbell size={32} className="text-zinc-700 mb-6" />
          <h3 className="text-lg font-bold italic uppercase mb-3 text-white">
            Discipline
          </h3>
          <p className="text-zinc-500 text-[13px] leading-relaxed italic">
            &rdquo;La musculation m&apos;a appris que la progression est une
            question de répétition. C&apos;est la même chose devant un écran :
            on build, on échoue, on recommence jusqu&apos;à ce que ça
            fonctionne.&rdquo;
          </p>
        </div>
      </section>
    </main>
  );
}
