"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import HudCorner from "./HudCorner";

export default function MusicWidget() {
  const { dict } = useLanguage();
  const m = dict.sections.music;

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playlistId = "PL-W6TZk0nvH6YD_Fi1LtUxGxGVb7F5sYj";

  useEffect(() => {
    const handleToggle = () => {
      setIsOpen((prev) => {
        const next = !prev;
        if (next) {
          setHasOpened(true);
          setIsMinimized(false);
        }
        return next;
      });
    };
    const handleClose = () => {
      setIsOpen(false);
    };

    window.addEventListener("toggle-music", handleToggle);
    window.addEventListener("close-all-modals", handleClose);

    return () => {
      window.removeEventListener("toggle-music", handleToggle);
      window.removeEventListener("close-all-modals", handleClose);
    };
  }, []);

  const sendPlayerCommand = (func: "playVideo" | "pauseVideo" | "nextVideo" | "previousVideo") => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify({ event: "command", func, args: [] }),
      "*"
    );
    if (func === "playVideo" || func === "nextVideo" || func === "previousVideo") {
      setIsPlaying(true);
    } else if (func === "pauseVideo") {
      setIsPlaying(false);
    }
  };

  const handleMinimize = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  const handleCloseDeck = () => {
    sendPlayerCommand("pauseVideo");
    setIsOpen(false);
    setIsMinimized(false);
  };

  const eqHeights = [0.45, 0.9, 0.65, 1, 0.55];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleMinimize}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── MINI-PILL WHEN MINIMIZED (KEEPS MUSIC PLAYING) ── */}
      <AnimatePresence>
        {isMinimized && !isOpen && hasOpened && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-[9999] inline-flex items-center gap-2.5 px-3 py-2 rounded-2xl bg-[#090a0f]/95 backdrop-blur-2xl border border-cyan-500/35 shadow-[0_12px_36px_rgba(0,0,0,0.85)]"
          >
            {/* Animated Equalizer */}
            <div className="flex items-end gap-0.5 h-4 px-0.5" aria-hidden="true">
              {eqHeights.map((h, idx) => (
                <span
                  key={idx}
                  className={`w-1 rounded-full bg-cyan-400 transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : "opacity-40"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.round(h * 16)}px` : "4px",
                    animationDelay: `${idx * 120}ms`,
                  }}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={handleExpand}
              className="text-xs font-mono font-bold tracking-wider text-white hover:text-cyan-300 transition-colors"
              title={m.expand}
            >
              {m.title}
            </button>

            <button
              type="button"
              onClick={() => sendPlayerCommand(isPlaying ? "pauseVideo" : "playVideo")}
              className="w-7 h-7 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/40 flex items-center justify-center text-xs text-cyan-200 transition-all active:scale-90"
              aria-label={isPlaying ? m.pause : m.play}
              title={isPlaying ? m.pause : m.play}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              type="button"
              onClick={handleCloseDeck}
              className="w-6 h-6 rounded-lg bg-white/5 hover:bg-red-500/25 flex items-center justify-center text-[10px] text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CYBERPUNK AUDIO DECK MODAL ── */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.95,
          y: isOpen ? 0 : 16,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed z-[9999] flex flex-col overflow-hidden bg-[#090a0f]/95 backdrop-blur-3xl border border-cyan-500/35 shadow-[0_20px_60px_rgba(0,0,0,0.9)]
          max-md:bottom-20 max-md:left-3 max-md:right-3 max-md:rounded-2xl
          md:bottom-6 md:left-6 md:w-[370px] md:rounded-2xl"
      >
        <HudCorner color="text-cyan-400/75" />

        {/* Header Bar */}
        <div className="bg-white/[0.04] border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-4" aria-hidden="true">
              {eqHeights.map((h, idx) => (
                <span
                  key={idx}
                  className={`w-1 rounded-full bg-cyan-400 transition-all duration-300 ${
                    isPlaying ? "animate-pulse" : "opacity-45"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.round(h * 16)}px` : "5px",
                    animationDelay: `${idx * 110}ms`,
                  }}
                />
              ))}
            </div>
            <span className="text-white text-xs font-mono font-bold tracking-widest uppercase">
              {m.title}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                isPlaying
                  ? "bg-emerald-950/70 text-emerald-300 border-emerald-700/60"
                  : "bg-white/5 text-gray-400 border-white/10"
              }`}
            >
              {isPlaying ? m.playing : m.standby}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleMinimize}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-cyan-500/25 flex items-center justify-center text-white/80 hover:text-cyan-200 transition-colors text-xs font-bold"
              aria-label={m.minimize}
              title={m.minimize}
            >
              —
            </button>
            <button
              type="button"
              onClick={handleCloseDeck}
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-red-500/30 flex items-center justify-center text-white/80 hover:text-white transition-colors text-xs font-bold"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* YouTube Player Area */}
        <div className="w-full bg-black flex flex-col relative">
          <div className="px-3 py-1.5 bg-black/80 border-b border-white/5 text-[10px] font-mono text-cyan-300/80 flex items-center justify-between">
            <span>YT MUSIC // PLAYLIST</span>
            <span className="truncate ml-2 text-gray-400">{m.hint}</span>
          </div>

          {hasOpened && (
            <iframe
              ref={iframeRef}
              width="100%"
              height="240"
              src={`https://www.youtube.com/embed/videoseries?list=${playlistId}&enablejsapi=1`}
              title="YouTube Music Playlist"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        {/* Deck Controls */}
        <div className="bg-white/[0.03] border-t border-white/10 px-4 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => sendPlayerCommand("previousVideo")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-gray-200 hover:text-white transition-all active:scale-95"
              title={m.prev}
              aria-label={m.prev}
            >
              ⏮
            </button>
            <button
              type="button"
              onClick={() => sendPlayerCommand(isPlaying ? "pauseVideo" : "playVideo")}
              className="px-4 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/35 border border-cyan-400/50 text-xs font-mono font-bold text-cyan-200 transition-all active:scale-95 flex items-center gap-1.5"
            >
              <span>{isPlaying ? "⏸" : "▶"}</span>
              <span>{isPlaying ? m.pause : m.play}</span>
            </button>
            <button
              type="button"
              onClick={() => sendPlayerCommand("nextVideo")}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-gray-200 hover:text-white transition-all active:scale-95"
              title={m.next}
              aria-label={m.next}
            >
              ⏭
            </button>
          </div>

          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">
            KAWARAGI.FM
          </span>
        </div>
      </motion.div>
    </>
  );
}