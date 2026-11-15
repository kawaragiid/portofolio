"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";

const cvOptions = [
  { code: "ID", label: "Bahasa Indonesia", flag: "🇮🇩", file: "/CV_Miftakhul_Ilmi_ID.pdf", filename: "CV_Miftakhul_Ilmi_ID.pdf" },
  { code: "EN", label: "English", flag: "🇺🇸", file: "/CV_Miftakhul_Ilmi_EN.pdf", filename: "CV_Miftakhul_Ilmi_EN.pdf" },
  { code: "JP", label: "日本語 (Japanese)", flag: "🇯🇵", file: "/CV_Miftakhul_Ilmi_JP.pdf", filename: "CV_Miftakhul_Ilmi_JP.pdf" },
];

export default function HeroShowreel() {
  const { lang, setLang, dict } = useLanguage();
  const { tier, isClient } = usePerformance();
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) {
        setCvMenuOpen(false);
      }
    };
    const handleCloseAll = () => setCvMenuOpen(false);

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("close-all-modals", handleCloseAll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("close-all-modals", handleCloseAll);
    };
  }, []);

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video hanya aktif di perangkat spek tinggi agar HP spek menengah/rendah tidak lag */}
      <div className="absolute inset-0 bg-black">
        {isClient && tier === "high" ? (
          <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.16),transparent_60%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-lg"
        >
          Visuals. Language. Tech.
        </motion.h1>

        <div className="h-24 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={lang}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl md:text-3xl text-gray-200 font-light tracking-wide drop-shadow-md"
            >
              {dict.hero.subtitle}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* --- LIQUID GLASS TOGGLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex p-1.5 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] mb-10"
        >
          {(["ID", "EN", "JP"] as const).map((l) => (
            <motion.button
              key={l}
              onClick={() => setLang(l)}
              whileTap={{ scale: 0.9 }}
              className="relative px-6 py-2.5 rounded-full text-sm font-bold tracking-widest outline-none transition-colors duration-300"
            >
              {lang === l && (
                <motion.div
                  layoutId={tier === "high" ? "active-pill" : undefined}
                  className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] border border-white/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={`relative z-10 ${lang === l ? "text-white drop-shadow-md" : "text-gray-400 hover:text-white"}`}>
                {l}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* --- TOMBOL CTA --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto bg-white/90 backdrop-blur-md border border-white text-black px-8 py-3 rounded-full font-semibold shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
          >
            {dict.hero.btnWork}
          </motion.a>

          {/* Dropdown Pemilihan Bahasa CV */}
          <div ref={cvMenuRef} className="relative w-full sm:w-auto">
            <motion.button
              type="button"
              onClick={() => setCvMenuOpen((prev) => !prev)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              aria-expanded={cvMenuOpen}
              className="w-full sm:w-auto bg-cyan-500/10 hover:bg-cyan-500/20 backdrop-blur-xl border border-cyan-400/40 text-cyan-300 px-8 py-3 rounded-full font-semibold shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2"
            >
              <span>↓</span>
              <span>{dict.hero.btnResume}</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${cvMenuOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </motion.button>

            <AnimatePresence>
              {cvMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-3 sm:bottom-auto sm:top-full sm:mt-3 sm:mb-0 w-64 bg-[#0d0d12]/95 backdrop-blur-3xl border border-white/15 rounded-2xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 text-left"
                >
                  <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-gray-400 border-b border-white/5 mb-1">
                    {dict.hero.cvSelectTitle}
                  </div>
                  {cvOptions.map((opt) => (
                    <a
                      key={opt.code}
                      href={opt.file}
                      download={opt.filename}
                      onClick={() => setCvMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs md:text-sm text-gray-200 hover:text-white hover:bg-cyan-500/15 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="text-base">{opt.flag}</span>
                        <span className="font-medium">{opt.label}</span>
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400">PDF</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-full sm:w-auto bg-white/[0.05] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-white px-8 py-3 rounded-full font-semibold"
          >
            {dict.hero.btnContact}
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}