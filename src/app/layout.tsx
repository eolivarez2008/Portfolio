import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "@/lib/validateEnv";
import "./globals.css";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://umami.eolivarez.site/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
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
