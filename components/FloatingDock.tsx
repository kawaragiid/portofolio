"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function FloatingDock() {
  const { dict } = useLanguage();
  const [isDocked, setIsDocked] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDock = () => {
      const slot = slotRef.current;
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      // Dock seamlessly into the page as soon as the footer dock slot enters the bottom of the viewport
      const shouldDock = rect.top <= window.innerHeight - 20;
      setIsDocked((prev) => (prev !== shouldDock ? shouldDock : prev));
    };

    window.addEventListener("scroll", checkDock, { passive: true });
    window.addEventListener("resize", checkDock, { passive: true });
    checkDock();

    return () => {
      window.removeEventListener("scroll", checkDock);
      window.removeEventListener("resize", checkDock);
    };
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

  const renderButtons = (docked: boolean) => (
    <>
      {/* Music Trigger */}
      <button
        type="button"
        onClick={triggerMusic}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/40 text-xs sm:text-sm font-mono text-gray-200 hover:text-white transition-all active:scale-95"
        aria-label={dict.sections.dock.music}
        title={`${dict.sections.dock.music} (M)`}
      >
        <span className="text-base leading-none">🎵</span>
        <span className={docked ? "inline font-semibold" : "hidden md:inline font-semibold"}>
          {dict.sections.dock.music}
        </span>
      </button>

      <div className="w-[1px] h-5 bg-white/10" />

      {/* Terminal CMD Trigger */}
      <button
        type="button"
        onClick={triggerTerminal}
        className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-transparent hover:border-cyan-400/40 text-xs sm:text-sm font-mono text-cyan-300 hover:text-cyan-200 transition-all active:scale-95"
        aria-label={dict.sections.dock.terminal}
        title={`${dict.sections.dock.terminal} (T)`}
      >
        <span className="font-bold text-sm leading-none">{">_"}</span>
        <span className={docked ? "inline font-semibold" : "hidden md:inline font-semibold"}>
          {dict.sections.dock.terminal}
        </span>
      </button>

      {/* Shortcut Info Trigger */}
      <div className="hidden sm:block w-[1px] h-5 bg-white/10" />
      <button
        type="button"
        onClick={triggerShortcuts}
        className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-transparent hover:border-white/25 text-xs sm:text-sm font-mono text-gray-300 hover:text-white transition-all active:scale-95"
        aria-label={dict.sections.dock.shortcut}
        title={`${dict.sections.dock.shortcut} (?)`}
      >
        <span className="w-5 h-5 rounded-md bg-white/10 border border-white/15 flex items-center justify-center text-[11px] font-bold text-cyan-300">
          ?
        </span>
        <span className={docked ? "inline font-medium" : "hidden lg:inline font-medium"}>
          {dict.sections.dock.shortcut}
        </span>
      </button>
    </>
  );

  return (
    <>
      {/* 1. Floating Capsule (Visible while scrolling mid-page, hides smoothly once docked at bottom) */}
      <div
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] transition-all duration-300 ${
          isDocked
            ? "opacity-0 translate-y-3 pointer-events-none scale-95"
            : "opacity-100 translate-y-0 pointer-events-auto scale-100"
        }`}
        aria-hidden={isDocked}
      >
        <div className="inline-flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-2xl bg-[#0a0b10]/90 backdrop-blur-2xl border border-white/15 hover:border-cyan-400/40 shadow-[0_12px_40px_rgba(0,0,0,0.85)]">
          {renderButtons(false)}
        </div>
      </div>

      {/* 2. Static Docked Slot (Merged into page right above footer on the right) */}
      <div ref={slotRef} className="w-full max-w-6xl mx-auto pt-4 flex justify-end">
        <div
          className={`inline-flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-2xl bg-white/[0.03] border border-white/15 transition-all duration-300 ${
            isDocked
              ? "opacity-100 translate-y-0 border-cyan-400/35"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <span className="hidden md:inline-flex items-center gap-1.5 pl-2.5 pr-1 text-[11px] font-mono text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>{dict.sections.dock.quickTools}</span>
          </span>
          {renderButtons(true)}
        </div>
      </div>
    </>
  );
}
