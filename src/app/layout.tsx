import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css";
import Script from "next/script";

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
  metadataBase: new URL("https://eolivarez.site"),
  title: {
    default: "Emilien OLIVAREZ",
    template: "%s | Emilien OLIVAREZ",
  },
  description: "Élève en Bac Pro CIEL - Portfolio de projets et réalisations",
  keywords: [
    "Emilien OLIVAREZ",
    "Bac Pro CIEL",
    "portfolio",
    "développement web",
  ],
  authors: [{ name: "Emilien OLIVAREZ" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://eolivarez.site",
    siteName: "Emilien OLIVAREZ",
    images: [
      {
        url: "/og-portfolio.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-portfolio.png"],
  },
};

// Layout racine de l'application
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Requis pour next-themes pour empecher les problèmes d'hydratation
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://umami.realbus.fr/script.js"
          data-website-id="882c953e-0838-4d1e-b05e-f2daced2d64f"
          strategy="afterInteractive"
        />
      </head>
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
