"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

export default function TiltCard({
  title,
  description,
  icon: Icon,
}: TiltCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: "1200px" }} className="w-full h-80">
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full h-full bg-zinc-900/40 border border-white/10 rounded-[2.5rem] p-8 overflow-hidden group hover:border-white/30 transition-colors duration-500"
      >
        <div
          style={{
            transform: "translateZ(50px)",
            transformStyle: "preserve-3d",
          }}
          className="relative z-10 flex flex-col h-full"
        >
          <div className="bg-white/5 w-fit p-4 rounded-2xl mb-6 border border-white/10 group-hover:bg-white/10 transition-all">
            <Icon size={28} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tighter uppercase italic">
            {title}
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed font-medium group-hover:text-zinc-200 transition-colors">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
