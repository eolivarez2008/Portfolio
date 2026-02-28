import React from "react";
import HeroClient from "@/components/home/HeroClient";
import ExpertiseGrid from "@/components/home/ExpertiseGrid";

// Metadata gérées côté serveur
export const metadata = {
  title: "Emilien OLIVAREZ | Accueil",
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
