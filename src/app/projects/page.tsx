"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { X, ExternalLink, Github, Star, GitFork, Layers, Loader2 } from "lucide-react";

// Tes données "Design" manuelles
const PROJECTS_METADATA = [
  {
    id: 1,
    repo: "TonPseudo/EcoSphere3D", // Chemin GitHub
    title: "EcoSphere 3D",
    category: "Modeling / Web",
    longDesc: "Exploration de la fusion entre Next.js et la richesse visuelle de la 3D modélisée sous Blender.",
    color: "from-blue-500/20",
  },
  {
    id: 2,
    repo: "TonPseudo/CIEL-Dashboard",
    title: "CIEL Dashboard",
    category: "Ingénierie Système",
    longDesc: "Interface de monitoring réseau développée pour visualiser les flux de sécurité du Bac Pro CIEL.",
    color: "from-emerald-500/20",
  }
];

export default function ProjectsPage() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [projectsData, setProjectsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAll() {
      const data = await Promise.all(
        PROJECTS_METADATA.map(async (p) => {
          const res = await fetch(`https://api.github.com/repos/${p.repo}`);
          const githubInfo = await res.json();
          return { ...p, github: githubInfo };
        })
      );
      setProjectsData(data);
      setLoading(false);
    }
    fetchAll();
  }, []);

  const selectedProject = projectsData.find(p => p.id === selectedId);

  if (loading) return (
    <div className="h-screen flex items-center justify-center text-accent">
      <Loader2 className="animate-spin" size={40} />
    </div>
  );

  return (
    <main className="min-h-screen pt-32 px-6 lg:px-24 max-w-7xl mx-auto pb-20">
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-4">Labs & Travaux</h1>
        <p className="text-zinc-500 max-w-lg">Flux dynamique mixant métadonnées locales et API GitHub.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <motion.div key={project.id} layoutId={`card-${project.id}`} onClick={() => setSelectedId(project.id)}>
            <Card className="group cursor-pointer p-0 overflow-hidden bg-[#0D0E10] border-white/5 hover:border-accent/40 transition-all duration-500">
              <div className={`h-64 bg-gradient-to-br ${project.color} to-transparent relative flex items-center justify-center`}>
                <Layers className="text-white/5 w-24 h-24 group-hover:scale-110 transition-transform duration-700" />
                
                {/* Badge GitHub Flottant */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <div className="px-2 py-1 bg-black/40 backdrop-blur-md rounded-md text-[10px] flex items-center gap-1 border border-white/10">
                    <Star size={10} className="text-yellow-500" /> {project.github.stargazers_count || 0}
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start">
                  <span className="text-accent text-[10px] font-mono uppercase tracking-[0.2em]">{project.category}</span>
                  <span className="text-zinc-600 text-[10px] font-mono italic">{project.github.language || "Mix"}</span>
                </div>
                <h3 className="text-2xl font-bold mt-2">{project.title}</h3>
                <p className="text-zinc-500 text-sm mt-4 line-clamp-2">{project.github.description || project.longDesc}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* MODAL (Identique à la précédente, mais utilisant project.github.html_url) */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedId(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div layoutId={`card-${selectedId}`} className="relative w-full max-w-4xl bg-[#0D0E10] border border-white/10 rounded-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
               <div className={`h-64 md:h-auto bg-gradient-to-br ${selectedProject.color} to-black flex items-center justify-center`}>
                  <Layers className="text-white/10 w-32 h-32" />
               </div>
               <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
                  <p className="text-zinc-400 mb-8">{selectedProject.longDesc}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8 text-xs font-mono">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <p className="text-zinc-500 mb-1 uppercase">Stars</p>
                      <p className="text-white">{selectedProject.github.stargazers_count}</p>
                    </div>
                    <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                      <p className="text-zinc-500 mb-1 uppercase">Forks</p>
                      <p className="text-white">{selectedProject.github.forks_count}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a href={selectedProject.github.html_url} target="_blank" className="flex-1 bg-white text-black text-center font-bold py-3 rounded-xl hover:bg-accent hover:text-white transition-all">
                      Code Source
                    </a>
                  </div>
               </div>
               <button onClick={() => setSelectedId(null)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"><X /></button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}