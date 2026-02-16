"use client";
import { motion } from "framer-motion";
import { Gamepad2, Layers, Code2, Globe, Terminal, Cpu } from "lucide-react";

const TECH_LOGOS = [
  { name: "React", color: "#61DAFB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg" },
  { name: "TypeScript", color: "#3178C6", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Tailwind", color: "#06B6D4", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Three.js", color: "#ffffff", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
  { name: "Blender", color: "#F5792A", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
  { name: "Git", color: "#F05032", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", color: "#FCC624", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Figma", color: "#F24E1E", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 text-white">
      <div className="px-6 lg:px-24 max-w-5xl mx-auto">
        
        <section className="mb-20">
          <h1 className="text-5xl font-black tracking-tighter mb-8 italic uppercase leading-none">
            À PROPOS <br />
            <span className="text-accent text-3xl md:text-5xl opacity-80 underline decoration-1 underline-offset-8 italic">DE MOI</span>
          </h1>
          
          <div className="max-w-3xl space-y-6">
            <p className="text-zinc-300 text-lg leading-relaxed">
              Actuellement en <span className="text-white font-bold">Bac Pro CIEL</span>, je me spécialise dans la cybersécurité et les réseaux, tout en développant des compétences en autodidacte dans le développement de jeux vidéos et de sites web, et la modélisation 3D.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              Je passe mon temps sur <span className="text-white underline underline-offset-4 decoration-accent">Blender</span> pour la modélisation et sur <span className="text-white underline underline-offset-4 decoration-blue-500">VS Code</span> pour donner vie à mes idées, que ce soit pour des sites web ou des concepts de jeux.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-24">
          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden group hover:border-blue-500/30 transition-colors">
            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
              <Gamepad2 size={160} />
            </div>
            <h3 className="flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] mb-4 text-blue-400">
              <Code2 size={18} /> Dev & Gaming
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Passionné par le développement de jeux et d'interfaces web interactives. J'aime créer des expériences fluides et visuellement marquantes.
            </p>
          </div>

          <div className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
            <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
              <Layers size={160} />
            </div>
            <h3 className="flex items-center gap-3 font-bold uppercase text-xs tracking-[0.2em] mb-4 text-emerald-400">
              <Globe size={18} /> 3D & Design
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              La modélisation 3D sera au cœur de mes projets. J'apprends Blender que je compte ensuite utliser pour créer des assets que j'intègrerai dans mes jeux.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-20 py-10 border-y border-white/5 bg-white/[0.01] overflow-hidden relative">
        <div className="mb-8 px-6 lg:px-24 max-w-5xl mx-auto">
           <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] flex items-center gap-2">
             <Terminal size={12} /> Tech Stack & Tools
           </h2>
        </div>

        <div className="flex overflow-hidden">
          <motion.div 
            className="flex gap-12 items-center whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...TECH_LOGOS, ...TECH_LOGOS].map((tech, i) => (
              <div key={i} className="flex items-center gap-4 group">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-8 h-8 md:w-10 md:h-10 grayscale group-hover:grayscale-0 transition-all duration-500" 
                />
                <span className="text-xl md:text-2xl font-black text-zinc-800 group-hover:text-white transition-colors tracking-tighter uppercase italic">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
        
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
      </section>
    </main>
  );
}