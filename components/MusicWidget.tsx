"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Ganti ID ini dengan ID video YouTube/YT Music pilihanmu.
  // Contoh: https://www.youtube.com/watch?v=mngEGGoXzmM -> ID-nya adalah "mngEGGoXzmM"
  // Kamu juga bisa memakai ID Playlist YouTube dengan parameter "?list=ID_PLAYLIST"
  const youtubeVideoId = "mngEGGoXzmM"; 

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* OVERLAY GELAP KHUSUS HP */}
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

      {/* WIDGET UTAMA (PERSISTENT)
        Kita TIDAK memakai AnimatePresence di sini. Kita selalu me-render kotak ini, 
        hanya saja opacity-nya kita jadikan 0 saat ditutup. Ini rahasia agar musik tidak mati!
      */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: isOpen ? 1 : 0, 
          scale: isOpen ? 1 : 0.9, 
          y: isOpen ? 0 : 20, 
          x: isOpen ? 0 : -20,
          // pointerEvents "none" membuat kotak yang tak terlihat ini tidak menghalangi klik ke website-mu
          pointerEvents: isOpen ? "auto" : "none" 
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="fixed z-[9999] flex flex-col overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
          max-md:bottom-[100px] max-md:left-4 max-md:right-4 max-md:rounded-3xl
          md:bottom-6 md:left-6 md:w-[320px] md:rounded-2xl"
      >
        {/* Header Widget */}
        <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎧</span>
            <span className="text-white text-xs font-bold tracking-widest uppercase">
              YouTube Player
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
          >
            <span className="text-[10px] font-bold">✕</span>
          </button>
        </div>

        {/* YouTube Iframe Embed */}
        <div className="w-full bg-black flex flex-col">
          <iframe 
            width="100%" 
            height="180" 
            src={`https://www.youtube.com/embed/${youtubeVideoId}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            className="rounded-b-2xl max-md:rounded-b-3xl"
          ></iframe>
        </div>
      </motion.div>

      {/* TOMBOL TRIGGER (Kiri Bawah) */}
      <motion.div
        animate={{ y: isScrolled && !isOpen ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`fixed bottom-6 left-6 z-[9997] flex flex-col items-start pointer-events-none transition-opacity duration-300 ${isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-auto relative"
          aria-label="Buka Music Player"
        >
          <span className="text-white text-xl">🎵</span>
        </motion.button>
      </motion.div>
    </>
  );
}