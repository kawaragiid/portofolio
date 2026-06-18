"use client";

import { motion } from "framer-motion";

export default function InfiniteMarquee() {
  const skills = [
    "CAPCUT",
    "OPENWRT",
    "PYTHON",
    "VS CODE",
    "CANVA",
    "NODE.JS",
    "SUBTITLE EDIT",
    "CAPTURE ONE"
  ];

  const textGroup = skills.join(" • ") + " • ";

  return (
    // Padding (py) diperkecil agar tidak memakan ruang vertikal
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
            // Font diperkecil (4xl di HP, 7xl di PC), ketebalan diubah ke font-bold (bukan black), stroke diset 1px
            className="text-4xl md:text-7xl font-bold uppercase tracking-widest mx-6 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] hover:[-webkit-text-stroke:1px_rgba(255,255,255,0.8)] transition-colors duration-300 cursor-default"
          >
            {textGroup}
          </span>
        ))}
      </motion.div>

    </section>
  );
}