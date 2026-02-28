import React from "react";
import AboutPageClient from "@/components/about/AboutPageClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez mon parcours, ma passion pour le code et ma discipline entre musculation et développement web.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
