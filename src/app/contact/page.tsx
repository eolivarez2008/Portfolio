"use client";
import { motion } from "framer-motion";
import { Github, MessageSquare, Mail, Phone, Send, ArrowDownRight } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-32 px-6 lg:px-24 max-w-5xl mx-auto pb-20 text-white">
      
      <section className="mb-20">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter italic uppercase mb-6 leading-none">
          Contact <br /> <span className="text-accent">Direct.</span>
        </h1>
        <div className="flex flex-wrap gap-8 text-zinc-500 font-mono text-[10px] uppercase tracking-[0.3em]">
          <span className="flex items-center gap-2 text-white"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> Status: Available</span>
          <span>Location: Metz - France</span>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
        
        <div className="lg:col-span-2 space-y-12">
          
          <div className="space-y-6">
            <div className="group">
              <h3 className="text-[10px] font-mono text-zinc-600 uppercase mb-2">E-mail</h3>
              <a href="mailto:eolivarez2008@gmail.com" className="text-xl font-bold hover:text-accent transition-colors block italic">
                eolivarez2008@gmail.com
              </a>
            </div>
            <div className="group">
              <h3 className="text-[10px] font-mono text-zinc-600 uppercase mb-2">Téléphone</h3>
              <a href="tel:+33650454532" className="text-xl font-bold hover:text-accent transition-colors block italic">
                06 50 45 45 32
              </a>
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-white/5">
            <a href="https://github.com/eolivarez2008" className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/10 hover:border-accent transition-all group" target="_blank">
              <Github size={24} className="group-hover:text-accent" />
            </a>
            <a href="https://discord.com/users/ems.lvrz" className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400 transition-all group flex items-center gap-3" target="_blank">
              <MessageSquare size={24} className="group-hover:text-blue-400" />
              <span className="text-xs font-bold font-mono">DISCORD</span>
            </a>
          </div>
        </div>

        <div className="lg:col-span-3">
          <CardContainer>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputField label="Nom complet" placeholder="Jean Dupont" type="text" />
                <InputField label="Sujet" placeholder="Demande d'information" type="text" />
              </div>
              <InputField label="Votre Email" placeholder="jean@example.com" type="email" />
              
              <div className="relative group">
                <label className="text-[10px] font-mono text-zinc-600 uppercase block mb-4">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Décrivez votre besoin..."
                  className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-accent transition-colors resize-none text-sm"
                />
              </div>

              <button className="flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-accent hover:text-white transition-all group">
                Envoyer le signal <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </CardContainer>
        </div>
      </div>
    </main>
  );
}

function InputField({ label, placeholder, type }: { label: string, placeholder: string, type: string }) {
  return (
    <div className="relative group w-full">
      <label className="text-[10px] font-mono text-zinc-600 uppercase block mb-2">{label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent border-b border-white/10 py-2 focus:outline-none focus:border-accent transition-colors text-sm"
      />
    </div>
  );
}

function CardContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-8 md:p-12 bg-white/[0.01] border border-white/5 rounded-[2rem] relative">
      <div className="absolute top-0 right-0 p-8 opacity-10">
        <ArrowDownRight size={40} />
      </div>
      {children}
    </div>
  );
}