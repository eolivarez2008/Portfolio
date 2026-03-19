"use client";
import React, { useState, useEffect } from "react";
import { Code2, Gamepad2, Layers, Cpu, LucideIcon } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";

const ICON_MAP: Record<string, LucideIcon> = { Code2, Gamepad2, Layers, Cpu };

interface ExpertiseItem {
  title: string;
  description: string;
  icon: string;
}

export default function ExpertiseGrid() {
  const [services, setServices] = useState<ExpertiseItem[] | null>(null);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((d) => setServices(d.expertise ?? []))
      .catch(() => setServices([]));
  }, []);

  if (services === null) {
    return (
      <section className="py-20 md:py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label="Expertise" title="Skills & Services" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-zinc-900/50 animate-pulse rounded-[2rem] border border-white/5"
                />
              ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Expertise" title="Skills & Services" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => {
            const Icon = ICON_MAP[service.icon] ?? Code2;
            return (
              <div
                key={index}
                onClick={() =>
                  trackEvent("expertise-click", { skill: service.title })
                }
                className="cursor-pointer"
              >
                <TiltCard
                  title={service.title}
                  description={service.description}
                  icon={Icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
