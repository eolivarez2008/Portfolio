import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Emilien OLIVAREZ Portfolio",
    short_name: "EO Portfolio",
    description:
      "Site web portfolio qui présente mes projets, mon parcours et mes compétences en développement web et systèmes embarqués.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
