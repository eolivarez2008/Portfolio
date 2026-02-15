"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/5 bg-card p-6 transition-colors",
        className
      )}
    >
      {children}
    </motion.div>
  );
};