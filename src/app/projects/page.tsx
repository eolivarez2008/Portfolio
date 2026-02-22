import React from "react";
import ProjectsClient from "@/components/projects/ProjectsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Découvrez mon infrastructure auto-hébergée et mes derniers dépôts GitHub.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
