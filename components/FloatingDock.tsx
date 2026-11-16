"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePerformance } from "./PerformanceProvider";

export default function FloatingDock() {
  const { tier, hasMouse } = usePerformance();
  const [isDocked, setIsDocked] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDocked(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const triggerMusic = () => {
    window.dispatchEvent(new CustomEvent("toggle-music"));
  };

  const triggerTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-terminal"));
  };

  const triggerShortcuts = () => {
    window.dispatchEvent(new CustomEvent("toggle-shortcuts"));
  };

  return (
    <div className="relative w-full pointer-events-none mt-8">
      {/* Sticky Unified Action Capsule: Floats at bottom-right while scrolling, locks seamlessly right above footer on the right */}
      <div className="sticky bottom-4 sm:bottom-6 z-[90] flex justify-end pr-0 sm:pr-2 pointer-events-none">
        <motion.div
          layout={tier === "high"}
          animate={{
            scale: isDocked ? 1.02 : 1,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className={`pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl backdrop-blur-2xl transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.85)] ${
            isDocked
              ? "bg-[#0a131a]/95 border border-cyan-400/55 shadow-[0_0_25px_rgba(34,211,238,0.3)]"
              : "bg-[#0a0b10]/90 border border-white/15 hover:border-cyan-400/40"
          }`}
        >
          {/* Music Trigger */}
          <button
            type="button"
            onClick={triggerMusic}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/40 text-xs sm:text-sm font-mono text-gray-200 hover:text-white transition-all active:scale-95"
            aria-label="Buka Pemutar Musik"
            title="Pemutar Musik (Shortcut: M)"
          >
            <span className="text-base leading-none">🎵</span>
            <span className="hidden md:inline font-semibold">Musik</span>
          </button>

          <div className="w-[1px] h-5 bg-white/10" />

          {/* Terminal CMD Trigger */}
          <button
            type="button"
            onClick={triggerTerminal}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/40 text-xs sm:text-sm font-mono text-cyan-300 hover:text-cyan-200 transition-all active:scale-95"
            aria-label="Buka Terminal AI"
            title="Terminal CMD (Shortcut: T)"
          >
            <span className="font-bold text-sm leading-none">{">_"}</span>
            <span className="hidden md:inline font-semibold">Terminal</span>
          </button>

          {/* Shortcut Info Trigger (shown on Desktop / Tablet with Keyboard or >= md) */}
          {(hasMouse || true) && (
            <>
              <div className="hidden sm:block w-[1px] h-5 bg-white/10" />
              <button
                type="button"
                onClick={triggerShortcuts}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-transparent hover:border-white/25 text-xs sm:text-sm font-mono text-gray-300 hover:text-white transition-all active:scale-95"
                aria-label="Info Shortcut Keyboard"
                title="Pintasan Keyboard (Shortcut: ?)"
              >
                <span className="w-5 h-5 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-[11px] font-bold text-cyan-300">
                  ?
                </span>
                <span className="hidden lg:inline font-medium">Shortcut</span>
              </button>
            </>
          )}

          {/* Docked Status Pill when settled above footer */}
          {isDocked && (
            <span className="hidden sm:inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1 ml-0.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-[10px] font-mono font-bold text-cyan-300 tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              DOCKED
            </span>
          )}
        </motion.div>
      </div>

      {/* Sentinel right at the footer boundary */}
      <div ref={sentinelRef} className="h-1 w-full pointer-events-none" aria-hidden="true" />
    </div>
  );
}
