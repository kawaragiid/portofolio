"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import { useScreenSize } from "./useScreenSize";

type Language = "ID" | "EN" | "JP";

export default function Navbar() {
  const { lang, setLang } = useLanguage();
  const { tier } = usePerformance();
  const screen = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("origin");
  const [timeStr, setTimeStr] = useState("");

  const languages: Language[] = ["ID", "EN", "JP"];

  // Real-time Surabaya Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat("id-ID", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(formatted);
      } catch {
        setTimeStr("00:00:00");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track active section for waypoints indicator
  useEffect(() => {
    const sectionIds = ["origin", "academy", "projects", "gateway", "experience", "terminus"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
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

  const stations = [
    { href: "#origin", id: "origin", label: "00 PROFIL" },
    { href: "#academy", id: "academy", label: "01 EDUKASI" },
    { href: "#projects", id: "projects", label: "02 KARYA" },
    { href: "#gateway", id: "gateway", label: "03 LAB" },
    { href: "#experience", id: "experience", label: "04 PENGALAMAN" },
    { href: "#terminus", id: "terminus", label: "05 KONTAK" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] pointer-events-none flex justify-center px-2 sm:px-6 pt-3 sm:pt-4">
      <motion.nav
        layout={tier === "high"}
        className="pointer-events-auto w-full max-w-7xl bg-[#08090d]/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all"
      >
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Branding & Telemetry */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="#origin"
              className="text-sm sm:text-base font-black tracking-tight text-white flex items-center gap-1.5 group"
            >
              <span>ILMI</span>
              <span className="text-cyan-400 group-hover:animate-ping inline-block">.</span>
            </Link>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Screen Resolution Telemetry Badge */}
            <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-cyan-300">
              {screen.displayStr}
            </span>

            <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">ONLINE</span>
            </span>
          </div>

          {/* Center: Desktop Waypoint Navigation Stations */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-[11px]">
            {stations.map((st) => {
              const isActive = activeSection === st.id;

              return (
                <Link
                  key={st.id}
                  href={st.href}
                  className={`px-3 py-1 rounded-lg transition-all relative ${
                    isActive
                      ? "text-cyan-300 font-bold bg-cyan-500/10 border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {st.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Clock, Language, Quick Triggers & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Surabaya Clock */}
            <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-gray-300 bg-black/50 px-2.5 py-1 rounded-lg border border-white/10">
              <span className="text-cyan-400 text-[10px]">WIB:</span>
              <span>{timeStr || "--:--:--"}</span>
            </div>

            {/* Language HUD Selector */}
            <div className="flex p-0.5 rounded-lg bg-black/60 border border-white/10">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                    lang === l
                      ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Quick Action Triggers (Music & Terminal) */}
            <div className="flex items-center gap-1 sm:gap-1.5">
              <button
                type="button"
                onClick={toggleMusic}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center text-xs text-white transition-all active:scale-90"
                aria-label="Toggle Audio Player"
                title="Buka Audio Playlist"
              >
                🎵
              </button>
              <button
                type="button"
                onClick={toggleTerminal}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center font-mono text-[11px] font-bold text-cyan-400 transition-all active:scale-90"
                aria-label="Toggle AI Terminal"
                title="Buka AI Terminal"
              >
                {">_"}
              </button>
            </div>

            {/* Hamburger Button for Mobile Stations */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Stations"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>

          </div>

        </div>

        {/* Mobile Dropdown Stations Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-white/10 px-4 py-3 bg-black/95 rounded-b-2xl overflow-hidden font-mono"
            >
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2 font-bold">
                NAVIGASI HALAMAN:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {stations.map((st) => (
                  <Link
                    key={st.id}
                    href={st.href}
                    onClick={() => setIsOpen(false)}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/5 text-xs text-gray-200 hover:text-white transition-colors"
                  >
                    {st.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  );
}