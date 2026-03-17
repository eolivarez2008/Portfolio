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
  const [services, setServices] = useState<ExpertiseItem[]>([
    {
      title: "Web Dev",
      description:
        "Interfaces modernes avec Next.js, React et des animations fluides.",
      icon: "Code2",
    },
    {
      title: "Game Dev",
      description: "Conception d'expériences interactives sur Unity 6.",
      icon: "Gamepad2",
    },
    {
      title: "UI/UX Design",
      description:
        "Design minimaliste et efficace pour une expérience optimale.",
      icon: "Layers",
    },
    {
      title: "Systèmes CIEL",
      description: "Informatique réseaux et systèmes embarqués.",
      icon: "Cpu",
    },
  ]);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((d) => {
        if (d.expertise) setServices(d.expertise);
      })
      .catch(() => {});
  }, []);

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
