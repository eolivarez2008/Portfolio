import React from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
}

export const SectionHeader = ({ label, title }: SectionHeaderProps) => (
  <div className="flex flex-col mb-12 md:mb-20 text-left">
    <h2 className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.5em] mb-4">
      {label}_
    </h2>
    <p className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase italic">
      {title}
    </p>
  </div>
);
