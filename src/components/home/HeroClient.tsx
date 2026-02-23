"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { trackEvent } from "@/lib/analytics";

interface SiteHero {
  name: string;
  lastname: string;
  subtitle: string;
}
interface SiteQuote {
  text: string;
  author: string;
  rotation: string;
}

export default function HeroClient() {
  const [hero, setHero] = useState<SiteHero>({
    name: "Emilien",
    lastname: "OLIVAREZ",
    subtitle:
      "Élève en Bac Pro CIEL, je me forme au développement web et à la création de jeux vidéo en autodidacte.",
  });
  const [quotes, setQuotes] = useState<SiteQuote[]>([
    {
      text: "Le code est comme l'humour. Quand on doit l'expliquer, c'est qu'il est mauvais.",
      author: "Cory House",
      rotation: "-4deg",
    },
    {
      text: "La meilleure façon d'apprendre à programmer est de programmer.",
      author: "Nicholas Wirth",
      rotation: "4deg",
    },
  ]);

  useEffect(() => {
    fetch("/api/admin/site-content")
      .then((r) => r.json())
      .then((d) => {
        if (d.hero) setHero(d.hero);
        if (d.quotes) setQuotes(d.quotes);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="pt-28 md:pt-40 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
        <div className="space-y-6 md:space-y-8 z-10">
          <motion.h1
            initial={{ opacity: 0.8, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9]"
          >
            {hero.name} <br />
            <span className="text-zinc-600 italic font-light uppercase">
              {hero.lastname}
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-zinc-400 max-w-md md:max-w-xl leading-relaxed font-medium"
          >
            {hero.subtitle}
          </motion.p>
          <div className="flex flex-row gap-3 md:gap-4 pt-2">
            <Link
              href="/projects"
              onClick={() => trackEvent("hero-cta-projects")}
              className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:scale-105 transition-all text-[11px] md:text-sm uppercase tracking-widest flex items-center gap-2 group"
            >
              Projets{" "}
              <ArrowUpRight
                size={16}
                className="group-hover:rotate-45 transition-transform"
              />
            </Link>
            <Link
              href="/contact"
              onClick={() => trackEvent("hero-cta-contact")}
              className="bg-zinc-900/50 border border-white/10 px-6 md:px-8 py-3 md:py-4 rounded-2xl font-bold hover:bg-white/10 transition-all text-[11px] md:text-sm uppercase tracking-widest"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="relative h-[250px] md:h-[320px] w-full hidden sm:block">
          {quotes[0] && (
            <QuoteCard
              text={quotes[0].text}
              author={quotes[0].author}
              className={`top-0 left-0 rotate-[${quotes[0].rotation}]`}
            />
          )}
          {quotes[1] && (
            <QuoteCard
              text={quotes[1].text}
              author={quotes[1].author}
              className={`bottom-4 right-0 rotate-[${quotes[1].rotation}]`}
            />
          )}
        </div>
      </div>
    </section>
  );
}
