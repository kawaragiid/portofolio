"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // ID Playlist YT Music milikmu
  const playlistId = "PL-W6TZk0nvH6YD_Fi1LtUxGxGVb7F5sYj"; 

  useEffect(() => {
    const handleScroll = () => {
      // Cek apakah ini layar HP (lebar di bawah 768px)
      const isMobile = window.innerWidth < 768;
      // Bergeser HANYA jika sedang di-scroll DAN di layar HP
      setIsScrolled(window.scrollY > 50 && isMobile);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9998] md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.9, 
          y: isOpen ? 0 : 20, 
          x: isOpen ? 0 : -20,
          pointerEvents: isOpen ? "auto" : "none" 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed z-[9999] flex flex-col overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
          max-md:bottom-[100px] max-md:left-4 max-md:right-4 max-md:rounded-3xl
          md:bottom-6 md:left-6 md:w-[350px] md:rounded-2xl"
      >
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎧</span>
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              My Playlist
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-bold">✕</span>
          </button>
        </div>

        <div className="w-full bg-black flex flex-col relative">
          {/* Petunjuk UI untuk user baru */}
          <div className="absolute top-1 right-12 pointer-events-none z-10 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white opacity-70">
            Pilih lagu di pojok kanan ↗
          </div>
          
          <iframe 
            width="100%" 
            // Tinggi diperbesar ke 280px agar menu playlist YT muat dibuka
            height="280" 
            src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="rounded-b-2xl max-md:rounded-b-3xl"
          ></iframe>
        </div>
      </motion.div>

      {/* Tombol Trigger */}
      <motion.div
        animate={{ y: isScrolled && !isOpen ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        // Saat isOpen, jadikan tombol menghilang (opacity-0) dan tidak bisa diklik (pointer-events-none)
        className={`fixed bottom-6 left-6 z-[9997] flex flex-col items-start transition-all duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
          aria-label="Buka Music Player"
        >
          <span className="text-white text-xl">🎵</span>
        </motion.button>
      </motion.div>
    </>
  );
}