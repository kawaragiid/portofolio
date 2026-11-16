"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import { useScreenSize } from "./useScreenSize";

type Language = "ID" | "EN" | "JP";

export default function Navbar() {
  const { lang, setLang, dict } = useLanguage();
  const { tier } = usePerformance();
  const screen = useScreenSize();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("origin");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isDocked, setIsDocked] = useState(false);
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

  // Track active section, scroll state & footer docking for mobile bottom Navbar
  useEffect(() => {
    const sectionIds = ["origin", "academy", "projects", "gateway", "experience", "terminus"];
    const handleScroll = () => {
      const y = window.scrollY;
      setHasScrolled((prev) => {
        const next = y > 25;
        return prev !== next ? next : prev;
      });

      if (window.innerWidth < 768) {
        const slot = document.getElementById("mobile-nav-footer-slot");
        if (slot) {
          const rect = slot.getBoundingClientRect();
          const shouldDock = rect.top <= window.innerHeight - 16;
          setIsDocked((prev) => (prev !== shouldDock ? shouldDock : prev));
        }
      } else {
        setIsDocked(false);
      }

      const scrollPos = y + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  const stations = dict.nav.stations;

  return (
    <div
      className={`fixed left-0 right-0 z-[100] pointer-events-none flex justify-center px-2 sm:px-6 transition-all duration-300 md:top-0 md:bottom-auto md:pt-4 md:pb-0 ${
        hasScrolled ? "max-md:bottom-0 max-md:pb-3" : "max-md:top-0 max-md:pt-3"
      } ${
        isDocked
          ? "max-md:opacity-0 max-md:translate-y-4"
          : "max-md:opacity-100 max-md:translate-y-0"
      }`}
      aria-hidden={isDocked}
    >
      <motion.nav
        layout={tier === "high"}
        className={`${isDocked ? "max-md:pointer-events-none md:pointer-events-auto" : "pointer-events-auto"} w-full max-w-7xl bg-[#08090d]/90 backdrop-blur-2xl border rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-colors flex ${
          hasScrolled
            ? "max-md:flex-col-reverse max-md:border-cyan-400/35 md:flex-col md:border-white/10"
            : "flex-col border-white/10"
        }`}
      >
        <div className="px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Branding & Telemetry */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="#origin"
              className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-1 group"
            >
              <span>ILMI</span>
              <span className="text-cyan-400 group-hover:animate-ping inline-block">.</span>
            </Link>

            <span className="text-white/20 hidden sm:inline">|</span>

            {/* Screen Resolution Telemetry Badge */}
            <span className="hidden 2xl:inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
              {screen.displayStr}
            </span>

            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-700/50 px-2 sm:px-2.5 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">ONLINE</span>
            </span>
          </div>

          {/* Center: Desktop Waypoint Navigation Stations (Readable & Clean) */}
          <div className="hidden lg:flex items-center space-x-1 font-mono text-xs xl:text-sm">
            {stations.map((st) => {
              const isActive = activeSection === st.id;

              return (
                <Link
                  key={st.id}
                  href={st.href}
                  className={`px-3 xl:px-3.5 py-1.5 rounded-xl transition-all relative whitespace-nowrap ${
                    isActive
                      ? "text-cyan-200 font-bold bg-cyan-500/15 border border-cyan-400/40 shadow-[0_0_12px_rgba(34,211,238,0.2)]"
                      : "text-gray-300 hover:text-white hover:bg-white/10 font-medium"
                  }`}
                >
                  {st.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Clock, Language, Merged Mobile Dock & Hamburger */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* Live Surabaya Clock */}
            <div className="hidden md:flex items-center gap-1.5 font-mono text-xs text-gray-200 bg-black/60 px-3 py-1.5 rounded-xl border border-white/15">
              <span className="text-cyan-400 font-bold">WIB</span>
              <span className="font-semibold">{timeStr || "--:--:--"}</span>
            </div>

            {/* Language HUD Selector */}
            <div className="flex p-0.5 rounded-xl bg-black/60 border border-white/15">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-2 sm:px-2.5 py-1 text-xs font-mono rounded-lg transition-colors ${
                    lang === l
                      ? "bg-cyan-500/25 text-cyan-200 font-bold border border-cyan-400/40"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Merged Dock Triggers on Mobile (ONLY shown after scrolling when Navbar drops to bottom) */}
            {hasScrolled && (
              <div className="flex md:hidden items-center gap-1 animate-glitch-assemble">
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center text-xs text-white transition-all active:scale-90"
                  aria-label="Toggle Audio Player"
                  title="Buka Audio Playlist"
                >
                  🎵
                </button>
                <button
                  type="button"
                  onClick={toggleTerminal}
                  className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/30 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 transition-all active:scale-90"
                  aria-label="Toggle AI Terminal"
                  title="Buka AI Terminal"
                >
                  {">_"}
                </button>
              </div>
            )}

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

        {/* Mobile Dropdown Stations Menu (opens downward at top, upward when docked at bottom) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`lg:hidden px-4 py-3 bg-black/95 overflow-hidden font-mono ${
                hasScrolled
                  ? "max-md:border-b max-md:border-white/10 max-md:rounded-t-2xl md:border-t md:border-white/10 md:rounded-b-2xl"
                  : "border-t border-white/10 rounded-b-2xl"
              }`}
            >
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2 font-bold">
                {dict.nav.menuTitle}
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

/**
 * Static footer-docked slot for the mobile Navbar (< md).
 * When the user scrolls down to the footer, the floating bottom Navbar merges seamlessly here;
 * when scrolling back up, it detaches and floats at the bottom again.
 */
export function MobileFooterNavbarSlot() {
  const { lang, setLang, dict } = useLanguage();
  const [isDocked, setIsDocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ["ID", "EN", "JP"];
  const stations = dict.nav.stations;

  useEffect(() => {
    const checkDock = () => {
      if (window.innerWidth >= 768) {
        setIsDocked(false);
        return;
      }
      const slot = document.getElementById("mobile-nav-footer-slot");
      if (!slot) return;
      const rect = slot.getBoundingClientRect();
      const shouldDock = rect.top <= window.innerHeight - 16;
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

  const handleLanguageChange = (newLang: Language) => {
    if (lang === newLang) return;
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    setLang(newLang);
  };

  return (
    <div id="mobile-nav-footer-slot" className="md:hidden w-full pt-4">
      <div
        className={`w-full bg-[#08090d]/95 border rounded-2xl shadow-[0_15px_45px_rgba(0,0,0,0.8)] transition-all duration-300 flex flex-col-reverse ${
          isDocked
            ? "opacity-100 translate-y-0 border-cyan-400/35 pointer-events-auto"
            : "opacity-0 translate-y-2 border-white/10 pointer-events-none"
        }`}
      >
        <div className="px-3 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="#origin"
              className="text-base font-black tracking-tight text-white flex items-center gap-1"
            >
              <span>ILMI</span>
              <span className="text-cyan-400">.</span>
            </Link>
            <span className="flex items-center gap-1.5 text-[11px] font-mono font-semibold text-emerald-300 bg-emerald-950/50 border border-emerald-700/50 px-2 py-0.5 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <div className="flex p-0.5 rounded-xl bg-black/60 border border-white/15">
              {languages.map((l) => (
                <button
                  key={l}
                  onClick={() => handleLanguageChange(l)}
                  className={`px-2 py-1 text-xs font-mono rounded-lg transition-colors ${
                    lang === l
                      ? "bg-cyan-500/25 text-cyan-200 font-bold border border-cyan-400/40"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-music"))}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 flex items-center justify-center text-xs text-white transition-all active:scale-90"
              aria-label="Toggle Audio Player"
            >
              🎵
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent("toggle-terminal"))}
              className="w-8 h-8 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 transition-all active:scale-90"
              aria-label="Toggle AI Terminal"
            >
              {">_"}
            </button>

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-gray-300 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
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

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="px-4 py-3 bg-black/95 border-b border-white/10 rounded-t-2xl overflow-hidden font-mono"
            >
              <div className="text-[10px] uppercase tracking-widest text-cyan-400 mb-2 font-bold">
                {dict.nav.menuTitle}
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
      </div>
    </div>
  );
}