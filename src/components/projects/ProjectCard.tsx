"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, Code2, Github as GithubIcon } from "lucide-react";
import { GithubRepo } from "@/lib/github";
import { trackEvent } from "@/lib/analytics";

export function ProjectCard({ repo }: { repo: GithubRepo }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-full flex flex-col glass-card rounded-[2.5rem] p-6 md:p-8 border border-white/5 bg-zinc-900/20"
    >
      <div className="flex justify-between items-start mb-8">
        <div className="p-3 bg-white/10 rounded-2xl group-hover:bg-white/20 transition-colors">
          <Code2 size={22} className="text-white" />
        </div>
        <div className="flex gap-2">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            onClick={() =>
              trackEvent("project-github-click", { name: repo.name })
            }
          >
            <GithubIcon
              size={20}
              className="text-zinc-400 hover:text-white transition-all"
            />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Live Demo"
              onClick={() =>
                trackEvent("project-demo-click", { name: repo.name })
              }
            >
              <ExternalLink
                size={20}
                className="text-zinc-400 hover:text-white transition-all"
              />
            </a>
          )}
        </div>
      </div>

      <h3 className="text-2xl font-bold mb-3 uppercase italic tracking-tighter text-white group-hover:translate-x-1 transition-transform">
        {repo.name}
      </h3>

      <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow group-hover:text-zinc-300 transition-colors">
        {repo.description || "Aucune description fournie."}
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/10">
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
          {repo.language || "N/A"}
        </span>
        {repo.stargazers_count > 0 && (
          <div className="flex items-center gap-1 text-[10px] font-mono text-zinc-300">
            <Star size={10} className="fill-white text-white" />{" "}
            {repo.stargazers_count}
          </div>
        )}
      </div>
    </motion.div>
  );
}
