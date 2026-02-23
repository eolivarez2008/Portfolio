"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";
import {
  GraduationCap,
  Briefcase,
  MapPin,
  FolderOpen,
  Download,
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  X,
  Maximize2,
  FileText,
} from "lucide-react";

interface JourneyItem {
  date: string;
  title: string;
  location: string;
  description: string;
  icon: string;
  type: "work" | "edu";
  skills: string[];
}
interface ArchiveDoc {
  name: string;
  file: string;
}
interface ArchiveFolder {
  category: string;
  items: ArchiveDoc[];
}

export default function JourneyPageClient() {
  const [filter, setFilter] = useState<"work" | "edu">("work");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [globalShowAll, setGlobalShowAll] = useState(false);
  const [localShowAll, setLocalShowAll] = useState<{ [key: number]: boolean }>(
    {},
  );
  const [journey, setJourney] = useState<JourneyItem[]>([]);
  const [archives, setArchives] = useState<ArchiveFolder[]>([]);

  useEffect(() => {
    fetch("/api/admin/journey")
      .then((r) => r.json())
      .then((d) => {
        setJourney(d.journey ?? []);
        setArchives(d.archives ?? []);
      })
      .catch(console.error);
  }, []);

  const filteredJourney = journey.filter((item) => item.type === filter);

  const handleOpenDoc = (file: string, name: string) => {
    trackEvent("archive-view", { doc_name: name });
    if (window.innerWidth < 768) {
      window.open(file, "_blank", "noopener,noreferrer");
    } else {
      setSelectedDoc(file);
    }
  };
  return (
    <main className="min-h-screen pt-28 md:pt-40 px-4 md:px-6 max-w-6xl mx-auto pb-32 text-white selection:bg-white selection:text-black">
      <div className="mb-12 text-left md:text-center">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter italic uppercase mb-8 leading-none"
        >
          Mon Parcours<span className="text-white/20">_</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
            Après mes premières années au collège{" "}
            <span className="text-white">Julie Daubié (Rombas)</span>,
            c&apos;est à <span className="text-white">Metz</span> que ma passion
            pour l&apos;informatique s&apos;est concretisée.
          </p>
          <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-medium">
            Actuellement étudiant en{" "}
            <span className="text-white">Bac Pro CIEL</span> au lycée{" "}
            <span className="text-white">Louis de Cormontaigne (Metz)</span>, je
            transforme cette passion en compétences technique entre
            développement web et création de jeux vidéo.
          </p>
        </motion.div>
        <div className="h-[1px] w-12 bg-zinc-800 mx-0 md:mx-auto mt-8" />
      </div>

      {/* Toggle work/edu */}
      <div className="flex justify-center mb-20">
        <div className="flex p-1.5 bg-zinc-900/80 border border-white/10 rounded-full w-full max-w-[320px] relative backdrop-blur-xl">
          {(["work", "edu"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
                trackEvent("journey-filter-change", { type: tab });
              }}
              className={`relative flex-1 py-3 text-[10px] font-bold uppercase tracking-widest transition-all z-10 ${filter === tab ? "text-black" : "text-zinc-400 hover:text-white"}`}
            >
              {filter === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-full bg-white -z-10"
                />
              )}
              {tab === "work" ? "Expériences" : "Formation"}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div className="relative mb-32 w-full">
        <div className="absolute left-[31px] md:left-1/2 top-0 bottom-0 w-[1px] bg-zinc-800 md:-translate-x-1/2" />
        <div className="space-y-10 md:space-y-0">
          <AnimatePresence>
            {filteredJourney.map((item, index) => (
              <motion.div
                key={`${filter}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-white flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)] shrink-0">
                  <div className="text-black">
                    {item.type === "work" ? (
                      <Briefcase size={18} />
                    ) : (
                      <GraduationCap size={18} />
                    )}
                  </div>
                </div>
                <div className="w-[calc(100%-4.5rem)] md:w-[42%] ml-16 md:ml-0 group">
                  <div className="glass-card p-6 md:p-8 rounded-[2rem] border border-white/10 bg-zinc-900/40 backdrop-blur-md hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-center mb-4 text-[9px] font-mono text-zinc-500 uppercase tracking-widest font-bold">
                      <span>{item.date}</span>
                      <ArrowUpRight
                        size={14}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-2 uppercase italic leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-medium">
                      {item.description}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-5">
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
                      <span className="text-[10px] font-bold text-zinc-500 flex items-center gap-1.5 uppercase">
                        <MapPin size={12} className="text-white/50" />{" "}
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

      {/* Archives */}
      <section className="pt-24 border-t border-zinc-900">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase italic flex items-center gap-4 mb-16">
          <FolderOpen size={28} /> Archives
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {archives.map((folder, i) => {
            const isExpanded = globalShowAll || localShowAll[i];
            const displayItems = isExpanded
              ? folder.items
              : folder.items.slice(0, 4);
            return (
              <div key={i} className="flex flex-col">
                <h3 className="text-[10px] font-black text-zinc-600 mb-6 uppercase tracking-[0.2em] border-l-2 border-white pl-4">
                  {folder.category}
                </h3>
                <div className="space-y-2">
                  <AnimatePresence initial={false}>
                    {displayItems.map((doc) => (
                      <motion.div
                        key={doc.name}
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        style={{ overflow: "hidden" }}
                      >
                        <button
                          onClick={() => handleOpenDoc(doc.file, doc.name)}
                          className="w-full flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all text-left group mb-1"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <FileText
                              size={16}
                              className="text-zinc-600 group-hover:text-white transition-colors"
                            />
                            <span className="text-xs text-zinc-400 group-hover:text-white font-medium truncate">
                              {doc.name}
                            </span>
                          </div>
                          <Maximize2
                            size={14}
                            className="text-zinc-700 group-hover:text-white"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {folder.items.length > 4 && (
                  <button
                    onClick={() => {
                      setLocalShowAll({
                        ...localShowAll,
                        [i]: !localShowAll[i],
                      });
                      if (!localShowAll[i])
                        trackEvent("archive-expand-local", {
                          folder: folder.category,
                        });
                    }}
                    className="lg:hidden w-full mt-4 py-3 text-[10px] font-bold text-zinc-500 hover:text-white flex items-center justify-center gap-2 uppercase border border-dashed border-white/10 rounded-xl"
                  >
                    {localShowAll[i] ? (
                      <>
                        <ChevronUp size={14} /> Réduire
                      </>
                    ) : (
                      <>
                        <ChevronDown size={14} /> Voir plus (
                        {folder.items.length - 4})
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <div className="hidden lg:flex justify-center mt-12">
          <button
            onClick={() => {
              setGlobalShowAll(!globalShowAll);
              if (!globalShowAll) trackEvent("archive-expand-all");
            }}
            className="px-10 py-4 bg-white text-black rounded-full font-bold text-[11px] uppercase tracking-widest hover:scale-105 transition-all"
          >
            {globalShowAll
              ? "Réduire toutes les archives"
              : "Déployer tout le tableau"}
          </button>
        </div>
      </section>

      {/* Modal visionneuse PDF */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="relative w-full h-full max-w-5xl bg-zinc-900 rounded-[2rem] border border-white/10 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                  Visionneuse
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={selectedDoc}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    onClick={() =>
                      trackEvent("archive-download", { file: selectedDoc })
                    }
                    className="text-white text-[10px] font-bold uppercase flex items-center gap-2"
                  >
                    <Download size={14} /> Download
                  </a>
                  <button
                    onClick={() => setSelectedDoc(null)}
                    className="text-white"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
              <iframe
                src={selectedDoc}
                className="w-full h-full bg-white"
                title="Visionneuse PDF"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
