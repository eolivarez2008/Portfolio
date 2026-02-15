"use client";
import { Card } from "@/components/ui/Card";
import { GraduationCap, Briefcase, FileText, Download } from "lucide-react";

const STEPS = [
  {
    date: "2024 - Présent",
    title: "Apprenti Développeur Frontend & 3D",
    company: "Nom de ton entreprise",
    type: "Pro",
    desc: "Développement d'interfaces et intégration de workflows 3D."
  },
  {
    date: "2023 - Présent",
    title: "Bac Pro CIEL",
    company: "Ton Lycée",
    type: "Edu",
    desc: "Cybersécurité, Informatique embarquée et réseaux."
  }
];

export default function JourneyPage() {
  return (
    <main className="min-h-screen pt-32 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-12">Mon Parcours</h1>

      <div className="relative border-l border-white/10 ml-4 pl-8 space-y-12">
        {STEPS.map((step, i) => (
          <div key={i} className="relative">
            {/* Le point sur la ligne */}
            <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background bg-accent" />
            
            <div className="flex flex-col gap-1 mb-4">
              <span className="text-accent font-mono text-sm uppercase tracking-wider">{step.date}</span>
              <h3 className="text-2xl font-bold">{step.title}</h3>
              <p className="text-zinc-400">{step.company}</p>
            </div>

            <Card className="max-w-xl">
              <p className="text-zinc-500 text-sm leading-relaxed mb-4">{step.desc}</p>
              {step.type === "Edu" && (
                <button className="flex items-center gap-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-lg transition-all">
                  <Download size={14} /> Télécharger Bulletin / Diplôme
                </button>
              )}
            </Card>
          </div>
        ))}
      </div>
    </main>
  );
}