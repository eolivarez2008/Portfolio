import React from "react";
import HeroClient from "@/components/home/HeroClient";
import dynamic from "next/dynamic";
import { Metadata } from "next";

const ExpertiseGrid = dynamic(() => import("@/components/home/ExpertiseGrid"), {
  loading: () => (
    <div className="h-96 bg-zinc-900/50 animate-pulse rounded-2xl" />
  ),
});

export const metadata: Metadata = {
  description:
    "Portfolio d'Emilien Olivarez, élève en Bac Pro CIEL passionné par le développement web et les systèmes embarqués.",
};

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen w-full selection:bg-white selection:text-black">
      {/* Partie Hero (Client) */}
      <HeroClient />

      {/* Partie Expertise (Client) */}
      <ExpertiseGrid />
    </div>
  );
}
