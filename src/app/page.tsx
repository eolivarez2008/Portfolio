"use client";
import { motion, Variants } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Code2, Box, Cpu, Terminal, Smartphone, Laptop } from "lucide-react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

const staggerContainer: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white">
      
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] opacity-50" />
        <div className="absolute top-[30%] left-[20%] w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20">
        
        <section className="mb-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.span 
              variants={fadeInUp}
              className="inline-block px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 text-blue-400 text-xs font-mono mb-6"
            >
              Apprenti Développeur & Designer 3D
            </motion.span>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent"
            >
              Emilien <br /> OLIVAREZ.
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="max-w-2xl text-zinc-400 text-xl leading-relaxed"
            >
              Élève en <span className="text-white font-medium">Bac Pro CIEL</span> de 17 ans. 
              Je me forme en autodidacte au développement web, développement de jeux vidéos et à la modélisation 3D, avec une passion pour les expériences interactives et visuellement marquantes.
            </motion.p>
          </motion.div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
          {[
            { icon: Cpu, label: "Formation", val: "Bac Pro CIEL" },
            { icon: Code2, label: "Spécialité", val: "Front-end Dev" },
            { icon: Box, label: "Design", val: "3D Modeling" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card className="group border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                <item.icon className="text-blue-500 mb-4 transition-transform group-hover:scale-110" size={24} />
                <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">{item.label}</p>
                <p className="text-xl font-semibold mt-1">{item.val}</p>
              </Card>
            </motion.div>
          ))}
        </section>

      </div>
    </main>
  );
}