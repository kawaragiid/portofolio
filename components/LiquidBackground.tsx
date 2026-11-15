"use client";

import { motion } from "framer-motion";
import { usePerformance } from "./PerformanceProvider";

export default function LiquidBackground() {
  const { tier, isClient } = usePerformance();

  if (!isClient) return null;

  // MODE RINGAN (HP & Perangkat Spek Rendah)
  if (tier === "low") {
    return (
      <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505]/0 to-transparent" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505]/0 to-transparent" />
      </div>
    );
  }

  // MODE MAKSIMAL (Desktop / Perangkat Spek Tinggi)
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black will-change-transform">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[100px] md:blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] md:blur-[150px]"
      />
    </div>
  );
}