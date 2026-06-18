"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Daftar musik pilihanmu. Kamu bisa menambah atau mengganti ID Spotify-nya nanti.
  const myPlaylist = [
    { id: "2qgXrzJsry4BaWdcuEWXzV", title: "First Love", artist: "Utada Hikaru" },
    { id: "0mG6LnsmXm7rKqG33o6D5e", title: "Pretty Girl", artist: "Clairo" },
    { id: "1YYhDizHx7PnDhAhko6cDS", title: "Take Me Home, Country Roads", artist: "John Denver" },
    { id: "4TqwjD4Xq2mFzLIfyV0m2W", title: "Stuck in the Moment", artist: "Justin Bieber" }
  ];

  // State untuk menyimpan lagu yang sedang diputar (default: lagu pertama)
  const [activeTrack, setActiveTrack] = useState(myPlaylist[0].id);

  // Deteksi scroll agar tombol menghindar dari Navbar di HP
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* OVERLAY GELAP SAAT WIDGET TERBUKA (Mobile Only) */}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            
            // Layout: Melayang di kiri bawah
            className="fixed z-[9999] flex flex-col overflow-hidden bg-[#0a0a0a]/90 backdrop-blur-3xl border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]
              max-md:bottom-[100px] max-md:left-4 max-md:right-4 max-md:rounded-3xl
              md:bottom-24 md:left-6 md:w-[350px] md:rounded-2xl"
          >
            {/* Header Widget */}
            <div className="bg-white/5 border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎧</span>
                <span className="text-white text-xs font-bold tracking-widest uppercase">My Playlist</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              >
                <span className="text-[10px] font-bold">✕</span>
              </button>
            </div>

            {/* List Lagu Pilihan */}
            <div className="p-2 flex flex-col gap-1 max-h-[200px] overflow-y-auto scrollbar-hide bg-white/[0.02]">
              {myPlaylist.map((track) => (
                <button
                  key={track.id}
                  onClick={() => setActiveTrack(track.id)}
                  className={`text-left px-4 py-3 rounded-xl transition-all ${
                    activeTrack === track.id 
                      ? "bg-white/10 border border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" 
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <p className={`text-sm font-bold ${activeTrack === track.id ? "text-white" : "text-gray-300"}`}>
                    {track.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${activeTrack === track.id ? "text-cyan-400" : "text-gray-500"}`}>
                    {track.artist}
                  </p>
                </button>
              ))}
            </div>

            {/* Spotify Iframe Embed */}
            <div className="bg-black">
              <iframe 
                src={`https://open.spotify.com/embed/track/${activeTrack}?utm_source=generator&theme=0`} 
                width="100%" 
                height="152" 
                frameBorder="0" 
                allowFullScreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy"
                className="rounded-b-2xl max-md:rounded-b-3xl"
              ></iframe>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Trigger Widget (Kiri Bawah) */}
      <motion.div
        // Bergerak naik kalau Navbar di HP sedang berada di bawah
        animate={{ y: isScrolled && !isOpen ? -90 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`fixed bottom-6 left-6 z-[9997] flex flex-col items-start pointer-events-none ${isOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'}`}
      >
        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.85 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="bg-white/[0.05] backdrop-blur-3xl border border-white/20 text-white text-xl w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] pointer-events-auto"
          aria-label="Buka Music Player"
        >
          🎵
        </motion.button>
      </motion.div>
    </>
  );
}