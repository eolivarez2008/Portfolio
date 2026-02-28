import React from "react";
import JourneyClient from "@/components/journey/JourneyClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours",
  description:
    "Expériences professionnelles en Bac Pro CIEL et archives académiques d'Emilien Olivarez.",
};

export default function JourneyPage() {
  return <JourneyClient />;
}
