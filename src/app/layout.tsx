import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import "./globals.css"; // Assure-toi que c'est bien importé

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* Les divs pour l'effet d'arrière-plan */}
        <div className="gradient-background">
          <div className="gradient-blob blob-1" />
          <div className="gradient-blob blob-2" />
          <div className="gradient-blob blob-3" />
        </div>
        <div className="grain-overlay" /> {/* Garde le grain pour la texture */}

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}