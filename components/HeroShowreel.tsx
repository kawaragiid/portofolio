"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider"; // <--- Import Hook

export default function HeroShowreel() {
  // Panggil lang, setLang, dan dict dari global state
  const { lang, setLang, dict } = useLanguage();

  return (
    <section className="relative w-full h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Video tetap sama */}
      <div className="absolute inset-0 bg-black">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-50">
          <source src="/videos/showreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6 mt-16 w-full max-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white drop-shadow-lg"
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
              className="text-xl md:text-3xl text-gray-200 font-light tracking-wide drop-shadow-md"
            >
              {dict.hero.subtitle} {/* <--- Gunakan dictionary */}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* --- LIQUID GLASS TOGGLE --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative flex p-1.5 rounded-full bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] mb-12"
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
                  layoutId="active-pill"
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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a 
            href="#projects" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-white/90 backdrop-blur-md border border-white text-black px-8 py-3 rounded-full font-semibold shadow-[0_4px_15px_rgba(255,255,255,0.2)]"
          >
            {dict.hero.btnWork} {/* <--- Gunakan dictionary */}
          </motion.a>
          <motion.a 
            href="#contact" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="bg-white/[0.05] backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] text-white px-8 py-3 rounded-full font-semibold"
          >
            {dict.hero.btnContact} {/* <--- Gunakan dictionary */}
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}