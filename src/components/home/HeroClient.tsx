"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { QuoteCard } from "@/components/ui/QuoteCard";
import { trackEvent } from "@/lib/analytics";

export default function HeroClient() {
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
            Emilien <br />
            <span className="text-zinc-600 italic font-light uppercase">
              OLIVAREZ
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-zinc-400 max-w-md md:max-w-xl leading-relaxed font-medium"
          >
            Élève en Bac Pro CIEL. Je me forme au développement web et aux
            systèmes embarqués.
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
          <QuoteCard
            text="La parole ne coûte rien. Montrez-moi le code."
            author="Linus Torvalds"
            className="top-0 left-0 rotate-[-4deg]"
          />
          <QuoteCard
            text="Le design est la façon dont ça fonctionne."
            author="Steve Jobs"
            className="bottom-4 right-0 rotate-[4deg]"
          />
        </div>
      </div>
    </section>
  );
}
