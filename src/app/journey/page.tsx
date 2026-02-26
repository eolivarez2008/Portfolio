"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  FolderOpen,
  FileText,
  Download,
  ArrowUpRight,
} from "lucide-react";

const JOURNEY = [
  {
    date: "OCTOBRE 2025",
    title: "Stage développement web (Terminale Pro CIEL)",
    location: "Lycée Louis de Cormontaigne, Metz",
    description:
      "Conception d'expériences interactives WebGL (3D) avec A-Frame et Three.js. Présentation sur la cybersécurité.",
    icon: <Briefcase size={16} />,
    type: "work",
    skills: ["WebGL", "Three.js", "Cyber"],
  },
  {
    date: "MARS 2025",
    title: "Stage Maintenance & Vente (1ère Pro CIEL)",
    location: "ID Phone, Maizières-lès-Metz",
    description:
      "Diagnostic et réparation d'ordinateurs portables. Accueil et conseil client sur les solutions informatiques.",
    icon: <Briefcase size={16} />,
    type: "work",
    skills: ["Maintenance", "Hardware", "Vente"],
  },
  {
    date: "NOVEMBRE 2024",
    title: "Stage Maintenance & Vente (1ère Pro CIEL)",
    location: "ID Phone, Maizières-lès-Metz",
    description:
      "Diagnostic matériel et gestion des stocks. Suivi des commandes clients.",
    icon: <Briefcase size={16} />,
    type: "work",
    skills: ["Stock", "Diagnostic"],
  },
  {
    date: "JUIN 2024",
    title: "Stage Électrotechnicien (2e Pro FM TNE)",
    location: "Kappeler, Strasbourg",
    description:
      "Montage d'enseignes lumineuses LED. Câblage et soudure de précision.",
    icon: <Briefcase size={16} />,
    type: "work",
    skills: ["LED", "Soudure"],
  },
  {
    date: "JANVIER 2024",
    title: "Stage Plombier (2e Pro FM TNE)",
    location: "Sanifrance, Metz",
    description:
      "Installation de canalisations et découverte des outils techniques de chantier.",
    icon: <Briefcase size={16} />,
    type: "work",
    skills: ["Installation", "Chantier"],
  },
  {
    date: "2023 — 2026",
    title: "Bac Pro CIEL",
    location: "Lycée Louis de Cormontaigne, Metz",
    description: "Cybersécurité, Informatique, Electronique et Réseaux.",
    icon: <GraduationCap size={16} />,
    type: "edu",
  },
  {
    date: "2023",
    title: "Brevet des Collèges",
    location: "Collège Jean Rostand, Metz",
    description: "Série Générale - Mention Très Bien.",
    icon: <GraduationCap size={16} />,
    type: "edu",
  },
];

const ARCHIVES = [
  {
    category: "Collège",
    items: [
      {
        name: "Bulletin 3e trimestre 1",
        file: "/Bulletins/Bulletin 3e trimestre 1.pdf",
      },
      {
        name: "Bulletin 3e trimestre 2",
        file: "/Bulletins/Bulletin 3e trimestre 2.pdf",
      },
      {
        name: "Bulletin 3e trimestre 3",
        file: "/Bulletins/Bulletin 3e trimestre 3.pdf",
      },

      {
        name: "Bulletin 4e trimestre 1",
        file: "/Bulletins/Bulletin 4e trimestre 1.pdf",
      },
      {
        name: "Bulletin 4e trimestre 2",
        file: "/Bulletins/Bulletin 4e trimestre 2.pdf",
      },
      {
        name: "Bulletin 4e trimestre 3",
        file: "/Bulletins/Bulletin 4e trimestre 3.pdf",
      },

      {
        name: "Bulletin 5e trimestre 1",
        file: "/Bulletins/Bulletin 5e trimestre 1.pdf",
      },
      {
        name: "Bulletin 5e trimestre 2",
        file: "/Bulletins/Bulletin 5e trimestre 2.pdf",
      },
      {
        name: "Bulletin 5e trimestre 3",
        file: "/Bulletins/Bulletin 5e trimestre 3.pdf",
      },

      {
        name: "Bulletin 6e trimestre 1",
        file: "/Bulletins/Bulletin 6e trimestre 1.pdf",
      },
      {
        name: "Bulletin 6e trimestre 2",
        file: "/Bulletins/Bulletin 6e trimestre 2.pdf",
      },
      {
        name: "Bulletin 6e trimestre 3",
        file: "/Bulletins/Bulletin 6e trimestre 3.pdf",
      },
    ],
  },
  {
    category: "Lycée (Bac Pro CIEL)",
    items: [
      {
        name: "Bulletin Terminale semestre 1",
        file: "/Bulletins/Bulletin Terminale 1.pdf",
      },

      {
        name: "Bulletin 1ère semestre 1",
        file: "/Bulletins/Bulletin 1ere semestre 1.pdf",
      },
      {
        name: "Bulletin 1ère semestre 2",
        file: "/Bulletins/Bulletin 1ere semestre 2.pdf",
      },

      {
        name: "Bulletin 2nde semestre 1",
        file: "/Bulletins/Bulletin 2nde semestre 1.pdf",
      },
      {
        name: "Bulletin 2nde semestre 2",
        file: "/Bulletins/Bulletin 2nde semestre 2.pdf",
      },
    ],
  },
  {
    category: "Diplômes & Certifications",
    items: [
      {
        name: "Diplôme du Brevet",
        file: "/Diplôme National du Brevet .pdf",
      },
      { name: "Certification PIX", file: "/Certification PIX.pdf" },
    ],
  },
];

export default function JourneyPage() {
  const [filter, setFilter] = useState<"work" | "edu">("work");
  const filteredJourney = JOURNEY.filter((item) => item.type === filter);

  return (
    <main className="min-h-screen pt-32 px-6 max-w-5xl mx-auto pb-32 text-white selection:bg-white selection:text-black">
      {/* HEADER */}
      <div className="mb-20 text-center">
        <h1 className="text-3xl md:text-8xl font-bold tracking-tighter italic uppercase mb-4">
          Mon Parcours<span className="text-white/20">_</span>
        </h1>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-[0.4em]">
          Chronologie & Expériences
        </p>
      </div>

      {/* SWITCH CENTERED */}
      <div className="flex justify-center mb-24">
        <div className="flex p-1.5 bg-zinc-900/80 border border-white/10 rounded-full w-full max-w-[340px] relative backdrop-blur-xl">
          {(["work", "edu"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`relative flex-1 py-3 text-[11px] font-bold uppercase tracking-widest transition-all z-10 ${
                filter === tab ? "text-black" : "text-zinc-400 hover:text-white"
              }`}
            >
              {filter === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-white -z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              {tab === "work" ? "Expériences" : "Formation"}
            </button>
          ))}
        </div>
      </div>

      {/* TIMELINE */}
      <div className="relative mb-40">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/20 md:-translate-x-1/2" />

        <div className="space-y-10">
          <AnimatePresence mode="wait">
            {filteredJourney.map((item, index) => (
              <motion.div
                key={`${filter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl glass-card flex items-center justify-center z-20 shadow-2xl transition-transform hover:scale-110">
                  <div className="text-white">
                    {item.type === "work" ? (
                      <Briefcase size={18} />
                    ) : (
                      <GraduationCap size={18} />
                    )}
                  </div>
                </div>

                <div className="w-full md:w-[44%] ml-14 md:ml-0 group">
                  <div className="glass-card p-8 rounded-[2.5rem]">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                        {item.date}
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-white/20 group-hover:text-white transition-colors"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 leading-tight tracking-tight group-hover:text-zinc-200 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5">
                      <div className="flex flex-wrap gap-2">
                        {item.skills?.map((s) => (
                          <span
                            key={s}
                            className="text-[9px] font-black text-white bg-white/10 px-2.5 py-1 rounded-md uppercase tracking-tighter"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1.5 uppercase">
                        <MapPin size={12} className="text-white" />{" "}
                        {item.location.split(",")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ARCHIVES */}
      <section className="pt-24 border-t border-white/20">
        <h2 className="text-4xl font-bold tracking-tighter uppercase italic flex items-center gap-4 mb-16">
          <FolderOpen size={32} className="text-white" /> Archives
          <span className="text-white/20">_</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {ARCHIVES.map((folder, i) => (
            <div key={i} className="flex flex-col">
              <h3 className="text-xs font-bold text-white mb-8 uppercase tracking-[0.2em] border-l-2 border-white pl-4">
                {folder.category}
              </h3>
              <div className="space-y-2">
                {folder.items.map((doc, di) => (
                  <a
                    href={doc.file}
                    key={di}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/20 hover:bg-white/[0.08] group transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <FileText
                        size={18}
                        className="text-zinc-500 group-hover:text-white transition-colors"
                      />
                      <span className="text-sm text-zinc-400 group-hover:text-white font-medium transition-colors">
                        {doc.name}
                      </span>
                    </div>
                    <Download
                      size={16}
                      className="text-zinc-700 group-hover:text-white"
                    />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
