import React from "react";
import ProjectsClient from "@/components/projects/ProjectsClient";

export const metadata = {
  title: "Projects",
  description:
    "Découvrez mon infrastructure auto-hébergée et mes derniers dépôts GitHub.",
};

export default function ProjectsPage() {
  return <ProjectsClient />;
}
