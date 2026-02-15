"use client";
import { Card } from "@/components/ui/Card"; // L'import manquant
import { Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-4">Contact</h1>
      <p className="text-zinc-500 mb-12">Un projet sérieux ou une question ? Parlons-en.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* Colonne Gauche : Formulaire */}
        <Card className="md:col-span-3 p-8">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-zinc-500">Nom</label>
                <input 
                  type="text" 
                  placeholder="Jean Dupont"
                  className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono uppercase text-zinc-500">Email</label>
                <input 
                  type="email" 
                  placeholder="jean@exemple.com"
                  className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono uppercase text-zinc-500">Message</label>
              <textarea 
                rows={5}
                placeholder="Votre message..."
                className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-white text-black font-bold py-3 rounded-lg hover:bg-accent hover:text-white transition-all duration-300">
              Envoyer <Send size={16} />
            </button>
          </form>
        </Card>

        {/* Colonne Droite : Infos directes */}
        <div className="md:col-span-2 space-y-4">
          <Card className="flex flex-col gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase">Email direct</span>
            <a href="mailto:ton@email.com" className="text-sm font-medium hover:text-accent transition-colors">
              ton@email.com
            </a>
          </Card>
          <Card className="flex flex-col gap-2">
            <span className="text-xs font-mono text-zinc-500 uppercase">Localisation</span>
            <p className="text-sm font-medium">France, [Ta Ville]</p>
          </Card>
          <Card className="flex flex-col gap-2 border-dashed border-accent/20">
            <span className="text-xs font-mono text-accent uppercase underline">Statut actuel</span>
            <p className="text-sm font-medium italic text-zinc-300 italic">Ouvert aux opportunités d'alternance 2026.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}