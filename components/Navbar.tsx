"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from './LanguageProvider';

type Language = "ID" | "EN" | "JP";

export default function Navbar() {
  const { lang, setLang, dict } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const languages: Language[] = ["ID", "EN", "JP"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    // passive: true membantu performa scroll di HP
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    if (lang === newLang) return; // Jangan lakukan apa-apa jika bahasanya sama
    
    // Memicu getaran (Haptic Feedback) di device yang mendukung
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50); // Getar singkat 50ms
    }
    
    setLang(newLang);
  };

  const menuItems = [
    { href: "#expertise", label: dict.nav.expertise },
    { href: "#projects", label: dict.nav.projects },
    { href: "#experience", label: dict.nav.experience },
  ];

  return (
    // Pembungkus penuh layar. Menggunakan Flexbox agar perpindahan atas-bawah sangat mulus.
    // Di PC (md): selalu justify-start (di atas). Di HP: justify-end (di bawah) saat di-scroll.
    <div className={`fixed inset-0 z-[100] pointer-events-none flex flex-col items-center px-4 md:px-6 py-6 transition-all duration-500 ${
      isScrolled ? "justify-end md:justify-start" : "justify-start"
    }`}>
      
      <motion.nav 
        layout
        // Fisika spring yang dihaluskan khusus untuk perpindahan jarak jauh
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-full max-w-4xl pointer-events-auto relative"
      >
        <div className="relative z-20 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
          <div className="px-6 md:px-8 py-4 flex justify-between items-center gap-2">
            
            <Link href="/" className="text-xl font-bold tracking-tighter text-white drop-shadow-md">
              Ilmi<span className="text-cyan-400">.</span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
              {menuItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center gap-3 md:gap-4">
              
              {/* TOGGLE BAHASA SQUISH & SLIDING ALA APPLE */}
              <div className="flex items-center bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-full p-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.5)]">
                {languages.map((l) => (
                  <motion.button
                    key={l}
                    onClick={() => handleLanguageChange(l)}
                    // Squish Effect saat ditekan
                    whileTap={{ scale: 0.9 }}
                    className={`relative px-3 md:px-4 py-1.5 text-[10px] md:text-xs font-bold tracking-widest rounded-full transition-colors z-10 ${
                      lang === l ? "text-white" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {/* Ini adalah kapsul putih yang meluncur mulus ke bahasa aktif */}
                    {lang === l && (
                      <motion.div
                        layoutId="active-lang-pill"
                        className="absolute inset-0 bg-white/10 border border-white/20 rounded-full z-[-1] shadow-sm"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    {l}
                  </motion.button>
                ))}
              </div>

              {/* Hamburger Button untuk HP */}
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gray-300 hover:text-white transition-colors p-1"
                aria-label="Toggle Menu"
              >
                <motion.svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </motion.svg>
              </button>

            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: isScrolled ? 20 : -20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: isScrolled ? 20 : -20, filter: "blur(10px)" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`absolute left-0 w-full z-10 md:hidden bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col py-2 px-4 overflow-hidden ${
                isScrolled ? "bottom-full mb-2" : "top-full mt-2"
              }`}
            >
              {menuItems.map((item) => (
                <motion.div key={item.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link 
                    href={item.href} 
                    onClick={() => setIsOpen(false)}
                    className="block py-4 px-4 text-center text-sm font-bold tracking-wide text-gray-300 hover:text-white hover:bg-white/5 rounded-2xl transition-all duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        
      </motion.nav>
    </div>
  );
}