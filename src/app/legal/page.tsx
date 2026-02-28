import React from "react";
import LegalPageClient from "@/components/legal/LegalPageClient";

export const metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales, politique de confidentialité RGPD et conditions de sécurité du portfolio d'Emilien Olivarez.",
};

export default function LegalPage() {
  return <LegalPageClient />;
}
