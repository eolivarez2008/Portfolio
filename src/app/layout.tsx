import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";

// Configuration des polices Google
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

// Définition des métadonnées pour le SEO et l'indexation
export const metadata: Metadata = {
  title: {
    default: "Emilien OLIVAREZ",
    template: "Emilien OLIVAREZ | %s ",
  },
  description: "Élève en Bac Pro CIEL - Portfolio de projets et réalisations",
  keywords: [
    "Emilien OLIVAREZ",
    "Bac Pro CIEL",
    "portfolio",
    "projets",
    "réalisations",
    "développement web",
    "programmation",
  ],
  authors: [{ name: "Emilien OLIVAREZ", url: "https://eolivarez.site" }],
  icons: {
    icon: "/favicon.ico",
  },
};

// Layout racine de l'application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-black min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
