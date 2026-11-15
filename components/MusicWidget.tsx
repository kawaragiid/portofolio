"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDocked, setIsDocked] = useState(false);

  // ID Playlist YT Music
  const playlistId = "PL-W6TZk0nvH6YD_Fi1LtUxGxGVb7F5sYj";

  useEffect(() => {
    const handleToggle = () => setIsOpen((prev) => !prev);
    const handleClose = () => setIsOpen(false);
    window.addEventListener("toggle-music", handleToggle);
    window.addEventListener("close-all-modals", handleClose);

    const handleScroll = () => {
      const terminus = document.getElementById("terminus");
      if (!terminus) return;
      const rect = terminus.getBoundingClientRect();
      const docked = rect.top < window.innerHeight - 80;
      setIsDocked((prev) => (prev !== docked ? docked : prev));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("toggle-music", handleToggle);
      window.removeEventListener("close-all-modals", handleClose);
      window.removeEventListener("scroll", handleScroll);
    };
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
          scale: isOpen ? 1 : 0.95,
          y: isOpen ? 0 : 16,
          pointerEvents: isOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="fixed z-[9999] flex flex-col overflow-hidden bg-[#0a0a0a]/95 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
          max-md:bottom-24 max-md:left-4 max-md:right-4 max-md:rounded-3xl
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
          <div className="absolute top-1 right-12 pointer-events-none z-10 bg-black/60 px-2 py-0.5 rounded text-[10px] text-white opacity-70">
            Pilih lagu di pojok kanan ↗
          </div>

          <iframe
            width="100%"
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

      {/* Tombol Trigger: Melayang di Desktop dan Mengunci (Dock) saat Mendekati Footer */}
      <motion.div
        animate={{
          x: isDocked ? 24 : 0,
          y: isDocked ? -12 : 0,
          scale: isDocked ? 1.05 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`fixed bottom-6 left-6 z-[9997] hidden md:flex flex-col items-start transition-opacity duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className={`w-14 h-14 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.7)] backdrop-blur-3xl ${
            isDocked
              ? "bg-cyan-950/80 border-2 border-cyan-400 text-cyan-300 shadow-[0_0_25px_rgba(34,211,238,0.6)]"
              : "bg-black/70 border border-white/20 text-white hover:border-cyan-400/50"
          }`}
          aria-label="Buka Music Player"
        >
          <span className="text-lg">🎵</span>
          {isDocked && (
            <span className="text-[7px] font-mono tracking-widest text-cyan-300 font-bold -mt-0.5">
              DOCKED
            </span>
          )}
        </motion.button>
      </motion.div>
    </>
  );
}