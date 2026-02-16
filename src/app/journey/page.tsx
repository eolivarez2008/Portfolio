"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Briefcase, Zap, MapPin, CheckCircle2, FolderOpen, FileText, Download } from "lucide-react";

const JOURNEY = [
	{
		date: "OCTOBRE 2025",
		title: "Stage développement web (Terminale Pro CIEL)",
		location: "Lycée Louis de Cormontaigne, Metz",
		description: "Conception d'expériences interactives WebGL (3D) avec A-Frame et Three.js. Présentation d'une expérience sur la cybersécurité à des élèves de seconde dans le cadre du Mois de la Cybersécurité.",
		icon: <Briefcase size={14} />,
		type: "work",
		skills: ["WebGL", "A-Frame", "Three.js", "Cybersécurité"]
	},
	{
		date: "MARS 2025",
		title: "Stage Maintenance & Vente (1ère Pro CIEL)",
		location: "ID Phone, Maizières-lès-Metz",
		description: "Diagnostic et réparation d'ordinateurs portables. Accueil, vente et conseil client sur les solutions informatiques.",
		icon: <Briefcase size={14} />,
		type: "work",
		skills: ["Maintenance PC", "Support client", "Diagnostic matériel"]
	},
	{
		date: "NOVEMBRE 2024",
		title: "Stage Maintenance & Vente (1ère Pro CIEL)",
		location: "ID Phone, Maizières-lès-Metz",
		description: "Diagnostic et réparation d'ordinateurs portables. Gestion des stocks et suivi des commandes. Accueil et conseil client sur les solutions informatiques.",
		icon: <Briefcase size={14} />,
		type: "work",
		skills: ["Maintenance PC", "Gestion stock", "Support client"]
	},
	{
		date: "JUIN 2024",
		title: "Stage Électrotechnicien (2e Pro FM TNE)",
		location: "Kappeler, Strasbourg",
		description: "Montage et installation d'enseignes lumineuses (LEDs). Câblage et soudure de systèmes électriques.",
		icon: <Briefcase size={14} />,
		type: "work",
		skills: ["Câblage", "Soudure", "Installation LED"]
	},
	{
		date: "JANVIER 2024",
		title: "Stage Plombier (2e Pro FM TNE)",
		location: "Sanifrance, Metz",
		description: "Participation à l'installation de canalisations et systèmes d'évacuation. Découverte des outils techniques liés aux installations.",
		icon: <Briefcase size={14} />,
		type: "work",
		skills: ["Installation", "Plomberie", "Outillage technique"]
	},
  {
    date: "2023 — 2026",
    title: "Bac Pro CIEL",
    location: "Lycée Louis de Cormontaigne, Metz",
    description: "Cybersécurité, Informatique, Electronique et Réseaux.",
    icon: <GraduationCap size={14} />,
    type: "edu",
    details: "En cours"
  },
  {
    date: "2023",
    title: "Brevet des Collèges",
    location: "Collège Jean Rostand, Metz",
    description: "Série Générale - Mention Très Bien.",
    icon: <GraduationCap size={14} />,
    type: "edu",
    details: "Obtenu"
  }
];

const ARCHIVES = [
	{
			category: "Collège",
			items: [
			{ name: "Bulletin 3e trimestre 1", file: "/documents/Bulletins/Bulletin 3e trimestre 1.pdf" },
			{ name: "Bulletin 3e trimestre 2", file: "/documents/Bulletins/Bulletin 3e trimestre 2.pdf" },
			{ name: "Bulletin 3e trimestre 3", file: "/documents/Bulletins/Bulletin 3e trimestre 3.pdf" },

			{ name: "Bulletin 4e trimestre 1", file: "/documents/Bulletins/Bulletin 4e trimestre 1.pdf" },
			{ name: "Bulletin 4e trimestre 2", file: "/documents/Bulletins/Bulletin 4e trimestre 2.pdf" },
			{ name: "Bulletin 4e trimestre 3", file: "/documents/Bulletins/Bulletin 4e trimestre 3.pdf" },

			{ name: "Bulletin 5e trimestre 1", file: "/documents/Bulletins/Bulletin 5e trimestre 1.pdf" },
			{ name: "Bulletin 5e trimestre 2", file: "/documents/Bulletins/Bulletin 5e trimestre 2.pdf" },
			{ name: "Bulletin 5e trimestre 3", file: "/documents/Bulletins/Bulletin 5e trimestre 3.pdf" },

			{ name: "Bulletin 6e trimestre 1", file: "/documents/Bulletins/Bulletin 6e trimestre 1.pdf" },
			{ name: "Bulletin 6e trimestre 2", file: "/documents/Bulletins/Bulletin 6e trimestre 2.pdf" },
			{ name: "Bulletin 6e trimestre 3", file: "/documents/Bulletins/Bulletin 6e trimestre 3.pdf" },
			]
	},
  {
    category: "Lycée (Bac Pro CIEL)",
    items: [
    { name: "Bulletin Terminale semestre 1", file: "/documents/Bulletins/Bulletin Terminale 1.pdf" },

    { name: "Bulletin 1ère semestre 1", file: "/documents/Bulletins/Bulletin 1ere semestre 1.pdf" },
    { name: "Bulletin 1ère semestre 2", file: "/documents/Bulletins/Bulletin 1ere semestre 2.pdf" },

    { name: "Bulletin 2nde semestre 1", file: "/documents/Bulletins/Bulletin 2nde semestre 1.pdf" },
    { name: "Bulletin 2nde semestre 2", file: "/documents/Bulletins/Bulletin 2nde semestre 2.pdf" },
    ]
  },
  {
    category: "Diplômes & Certifications",
    items: [
    { name: "Diplôme du Brevet", file: "/documents/Diplôme National du Brevet .pdf" },
    { name: "Certification PIX", file: "/documents/Certification PIX.pdf" },
    ]
  }
];

export default function JourneyPage() {
  const [filter, setFilter] = useState<"work" | "edu">("work");
  const filteredJourney = JOURNEY.filter(item => item.type === filter);

  return (
    <main className="min-h-screen pt-24 px-6 lg:px-26 max-w-5xl mx-auto pb-20 text-white">
      
      <div className="mb-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold tracking-tighter italic uppercase">Mon Parcours</h1>
        <div className="h-1 w-12 bg-accent mt-2 rounded-full" />
      </div>

      <div className="flex p-1 bg-white/[0.03] border border-white/10 rounded-xl w-full max-w-xs mx-auto mb-16 relative">
        {(["work", "edu"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`relative flex-1 py-2 text-[10px] font-bold uppercase tracking-widest transition-colors z-10 ${
              filter === tab ? "text-white" : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {filter === tab && (
              <motion.div
                layoutId="activeTab"
                className={`absolute inset-0 rounded-lg -z-10 ${filter === 'work' ? 'bg-blue-600' : 'bg-purple-600'}`}
                transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
              />
            )}
            {tab === "work" ? "Expériences" : "Formation"}
          </button>
        ))}
      </div>

      <div className="relative mb-24">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent md:-translate-x-1/2" />

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {filteredJourney.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-lg bg-[#050505] border border-white/10 flex items-center justify-center z-10 shadow-xl ${filter === 'work' ? 'text-blue-400' : 'text-purple-400'}`}>
                  {item.icon}
                </div>

                <div className="w-full md:w-[45%] ml-12 md:ml-0">
                  <Card className="p-4 bg-white/[0.02] border-white/5 hover:border-white/10 transition-all">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className="text-sm font-bold text-zinc-100">{item.title}</h3>
                      <span className="text-[8px] font-mono text-zinc-600">{item.date}</span>
                    </div>
                    
                    <p className="text-zinc-400 text-[11px] leading-snug mb-2">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {item.skills?.map(s => (
                          <span key={s} className="text-[7px] font-bold text-zinc-500 border border-white/5 px-1 py-0.5 rounded uppercase">{s}</span>
                        ))}
                      </div>
                      <span className="text-[9px] italic text-zinc-600 flex items-center gap-1">
                        <MapPin size={8} /> {item.location}
                      </span>
                    </div>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <section className="pt-20 border-t border-white/5">
        <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 italic">
          <FolderOpen className="text-accent" /> CENTRE D'ARCHIVES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ARCHIVES.map((folder, i) => (
            <Card key={i} className="bg-white/[0.01] border-white/5 p-6">
              <h3 className="text-xs font-mono text-accent mb-6 flex items-center gap-2 uppercase tracking-widest">
                 {folder.category}
              </h3>
              <div className="space-y-2">
                {folder.items.map((doc, di) => (
                  <a href={doc.file} key={di} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-transparent hover:border-white/10 hover:bg-white/[0.08] transition-all group">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-zinc-600 group-hover:text-accent" />
                      <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">{doc.name}</span>
                    </div>
                    <Download size={14} className="text-zinc-700 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
        </section>
    </main>
  );
}