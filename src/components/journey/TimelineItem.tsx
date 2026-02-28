"use client";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, MapPin, ArrowUpRight } from "lucide-react";
import { JourneyItem } from "@/data/journeyData";

export function TimelineItem({
  item,
  index,
}: {
  item: JourneyItem;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`relative flex flex-col md:flex-row items-start md:items-center w-full ${
        index % 2 === 0 ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Icône centrale */}
      <div className="absolute left-[31px] md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-xl bg-white flex items-center justify-center z-20 shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        <div className="text-black">
          {item.type === "work" ? (
            <Briefcase size={18} />
          ) : (
            <GraduationCap size={18} />
          )}
        </div>
      </div>

      {/* Carte */}
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
              {item.skills?.map((s: string) => (
                <span
                  key={s}
                  className="text-[9px] font-black text-white bg-white/10 px-2.5 py-1 rounded-md uppercase"
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
  );
}
