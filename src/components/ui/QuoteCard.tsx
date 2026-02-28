import React from "react";

interface QuoteCardProps {
  text: string;
  author: string;
  className?: string;
}

export const QuoteCard = ({ text, author, className }: QuoteCardProps) => (
  <blockquote
    className={`absolute bg-gradient-to-br from-white/5 to-white/10 border border-white/10 p-6 rounded-2xl shadow-2xl w-72 md:w-80 backdrop-blur-md transition-transform hover:scale-105 ${className}`}
  >
    “{text}”
    <footer className="text-right mt-4 text-[10px] text-zinc-500 font-mono uppercase tracking-widest">
      – {author}
    </footer>
  </blockquote>
);
