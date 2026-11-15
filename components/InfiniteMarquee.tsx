"use client";

import { motion } from "framer-motion";
import { usePerformance } from "./PerformanceProvider";

export default function InfiniteMarquee() {
  const { tier } = usePerformance();

  const skills = [
    "CAPCUT",
    "OPENWRT",
    "PYTHON",
    "VS CODE",
    "HTML / CSS",
    "SUBTITLE EDIT",
    "OBS STUDIO",
    "AEGISUB"
  ];

  const textGroup = skills.join(" • ") + " • ";

  if (tier === "low") {
    return (
      <section className="w-full py-6 overflow-hidden relative z-10 border-y border-white/5 bg-black/40">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap justify-center gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono tracking-wider text-gray-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-6 md:py-10 overflow-hidden relative z-10 border-y border-white/5 bg-black/20 backdrop-blur-md flex items-center">
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-black via-transparent to-black" />

      <motion.div
        className="flex whitespace-nowrap w-fit"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="text-4xl md:text-7xl font-bold uppercase tracking-widest mx-6 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] transition-colors duration-300 cursor-default"
          >
            {textGroup}
          </span>
        ))}
      </motion.div>
    </section>
  );
}