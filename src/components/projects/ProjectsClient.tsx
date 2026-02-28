"use client";

import React, { useEffect, useState } from "react";
import { Server, Shield } from "lucide-react";
import { GithubRepo } from "@/lib/github";
import { ProjectCard } from "./ProjectCard";
import { trackEvent } from "@/lib/analytics";

interface ServiceStatus {
  name: string;
  status: number;
}

export default function ProjectsClient() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [services, setServices] = useState<ServiceStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [repoRes, statusRes] = await Promise.all([
          fetch("/api/github"),
          fetch("/api/status"),
        ]);
        const repoData = await repoRes.json();
        const statusData = await statusRes.json();
        setRepos(repoData);
        setServices(statusData.services || []);
        trackEvent("projects-data-loaded", { repoCount: repoData.length });
      } catch (err) {
        console.error("Data fetch error:", err);
        trackEvent("projects-api-error", { error: "fetch_failed" });
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen pt-28 md:pt-40 pb-20 px-6 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        {/* --- INFRA CARD --- */}
        <section className="relative overflow-hidden glass-card rounded-[2.5rem] p-6 md:p-14 mb-16 md:mb-24 border border-white/5 bg-zinc-900/20 backdrop-blur-sm">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12 items-center">
            <div className="lg:col-span-3 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-zinc-300 text-[10px] font-mono tracking-widest uppercase">
                <Server size={12} /> System Administrator
              </div>
              <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-tight md:leading-none">
                Infrastructure <br />
                <span className="text-zinc-400 italic font-light tracking-normal">
                  Self-Hosted.
                </span>
              </h1>
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl">
                Gestion d&apos;un cloud privé sous Linux. De
                l&apos;orchestration Docker aux tunnels Cloudflare.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {["Linux", "Docker", "Nginx", "Cloudflare"].map((tech) => (
                  <span
                    key={tech}
                    onClick={() => trackEvent("infra-tech-click", { tech })}
                    className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-mono text-zinc-400 border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-black/60 border border-white/10 rounded-[2rem] p-6 shadow-2xl">
                <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                  <Shield size={10} className="text-white" /> Active_Monitoring
                </h3>
                <div className="relative h-[160px] md:h-[200px] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
                  <div className="flex flex-col gap-2 animate-marquee-vertical">
                    {[...services, ...services].map((s, i) => (
                      <div
                        key={i}
                        onClick={() =>
                          trackEvent("status-check", { service: s.name })
                        }
                        className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl"
                      >
                        <span className="text-xs font-semibold text-zinc-200">
                          {s.name}
                        </span>
                        <div
                          className={`h-2 w-2 rounded-full ${s.status === 1 ? "bg-green-500 shadow-[0_0_10px_white] animate-pulse" : "bg-red-700"}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- GRID PROJETS --- */}
        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter italic uppercase text-white">
            Projets_
          </h2>
          <span className="text-zinc-400 text-[10px] font-mono tracking-widest uppercase">
            {repos.length} Repositories GitHub
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-72 bg-zinc-900/50 animate-pulse rounded-[2rem] border border-white/10"
                  />
                ))
            : repos.map((repo) => <ProjectCard key={repo.id} repo={repo} />)}
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee-vertical {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-50%);
          }
        }
        .animate-marquee-vertical {
          animation: marquee-vertical 30s linear infinite;
        }
      `}</style>
    </div>
  );
}
