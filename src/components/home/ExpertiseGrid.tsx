"use client";

import React from "react";
import { Code2, Gamepad2, Layers, Cpu } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { trackEvent } from "@/lib/analytics";

export default function ExpertiseGrid() {
  const services = [
    {
      title: "Web Dev",
      description:
        "Interfaces modernes avec Next.js, React et des animations fluides.",
      icon: Code2,
    },
    {
      title: "Game Dev",
      description: "Conception d'expériences interactives sur Unity 6.",
      icon: Gamepad2,
    },
    {
      title: "UI/UX Design",
      description:
        "Design minimaliste et efficace pour une expérience optimale.",
      icon: Layers,
    },
    {
      title: "Systèmes CIEL",
      description: "Informatique réseaux et systèmes embarqués.",
      icon: Cpu,
    },
  ];

  return (
    <section className="py-20 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label="Expertise" title="Skills & Services" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() =>
                trackEvent("expertise-click", { skill: service.title })
              }
              className="cursor-pointer"
            >
              <TiltCard {...service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
