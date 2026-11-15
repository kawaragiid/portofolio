"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';
import { usePerformance } from './PerformanceProvider';

type Language = "ID" | "EN" | "JP";

export default function Navbar() {
  const { lang, setLang, dict } = useLanguage();
  const { tier } = usePerformance();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: Language[] = ["ID", "EN", "JP"];

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    if (lang === newLang) return;
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setLang(newLang);
  };

  const toggleMusic = () => {
    window.dispatchEvent(new CustomEvent("toggle-music"));
  };

  const toggleTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-terminal"));
  };

  const menuItems = [
    { href: "#expertise", label: dict.nav.expertise },
    { href: "#projects", label: dict.nav.projects },
    { href: "#experience", label: dict.nav.experience },
  ];

  return (
    <div className={`fixed inset-0 z-[100] pointer-events-none flex flex-col items-center px-3 md:px-6 py-4 md:py-6 ${
      isScrolled ? "justify-end md:justify-start" : "justify-start"
    }`}>
      <motion.nav
        layout={tier === "high"}
        transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
        className="w-full max-w-4xl pointer-events-auto relative"
      >
        <div className="relative z-20 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="px-4 md:px-8 py-3 md:py-4 flex justify-between items-center gap-2">
            
            <Link href="/" className="text-lg md:text-xl font-bold tracking-tighter text-white drop-shadow-md shrink-0">
              Ilmi<span className="text-cyan-400">.</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
              {menuItems.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                >
                  <Link href={item.href} className="hover:text-white transition-colors block">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-1.5 md:gap-4">
              {/* Mobile Quick Actions: Music & Terminal terintegrasi rapi di dalam Navbar */}
              <div className="flex md:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={toggleMusic}
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-sm text-white active:scale-90 transition-transform"
                  aria-label="Toggle Music Player"
                  title="Music Player"
                >
                  🎵
                </button>
                <button
                  type="button"
                  onClick={toggleTerminal}
                  style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center font-mono text-[11px] font-bold text-cyan-400 active:scale-90 transition-transform"
                  aria-label="Toggle Terminal AI"
                  title="Terminal AI"
                >
                  {">_"}
                </button>
              </div>

              {/* Language Toggle saat di-scroll */}
              <AnimatePresence>
                {isScrolled && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-full p-0.5 md:p-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    {languages.map((l) => (
                      <button
                        key={l}
                        onClick={() => handleLanguageChange(l)}
                        style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                        className={`relative px-2 md:px-4 py-1 md:py-1.5 text-[10px] md:text-xs font-bold tracking-wider md:tracking-widest rounded-full transition-colors z-10 ${
                          lang === l ? "text-white" : "text-gray-500 hover:text-gray-300"
                        }`}
                      >
                        {lang === l && (
                          <motion.div
                            layoutId={tier === "high" ? "active-lang-pill" : undefined}
                            className="absolute inset-0 bg-white/15 border border-white/20 rounded-full z-[-1]"
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                        )}
                        {l}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hamburger Button untuk HP */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                style={{ touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}
                className="md:hidden text-gray-300 hover:text-white transition-colors p-1 active:scale-90"
                aria-label="Toggle Menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: isScrolled ? 16 : -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: isScrolled ? 16 : -16 }}
              transition={{ duration: 0.2 }}
              className={`absolute left-0 w-full z-10 md:hidden bg-[#0c0c10]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.6)] flex flex-col py-2 px-4 overflow-hidden ${
                isScrolled ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3.5 px-4 text-center text-sm font-bold tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}