"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import HudCorner from "./HudCorner";

const cvOptions = [
  { code: "ID", label: "Bahasa Indonesia", flag: "🇮🇩", file: "/CV_Miftakhul_Ilmi_ID.pdf", filename: "CV_Miftakhul_Ilmi_ID.pdf" },
  { code: "EN", label: "English", flag: "🇺🇸", file: "/CV_Miftakhul_Ilmi_EN.pdf", filename: "CV_Miftakhul_Ilmi_EN.pdf" },
  { code: "JP", label: "日本語 (Japanese)", flag: "🇯🇵", file: "/CV_Miftakhul_Ilmi_JP.pdf", filename: "CV_Miftakhul_Ilmi_JP.pdf" },
];

export default function HeroShowreel() {
  const { lang, setLang, dict } = useLanguage();
  const { tier } = usePerformance();
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [selectedSkillId, setSelectedSkillId] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>("");
  const cvMenuRef = useRef<HTMLDivElement>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Live Surabaya WIB Clock
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
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Modal & Outside Click handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) {
        setCvMenuOpen(false);
      }
    };
    const handleCloseAll = () => {
      setCvMenuOpen(false);
      setSelectedSkillId(null);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("close-all-modals", handleCloseAll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("close-all-modals", handleCloseAll);
    };
  }, []);

  // Lock scroll when modal is active
  useEffect(() => {
    if (selectedSkillId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedSkillId]);

  const selectedSkill = dict.expertise.items.find((item) => item.id === selectedSkillId);

  const triggerMusic = () => {
    window.dispatchEvent(new CustomEvent("toggle-music"));
  };

  const triggerTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-terminal"));
  };

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-black text-white pt-20 md:pt-24 pb-8">
      {/* Background Ambience / Video */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {isClient && tier === "high" ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.18),transparent_65%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-between flex-1 gap-6">
        
        {/* ── TOP HUD TELEMETRY BAR ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-gray-400 border border-white/10 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {dict.hud.sysStatus}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-gray-300 hidden sm:inline">{dict.hud.telemetry}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="text-cyan-400">LOC:</span>
              <span className="tracking-wide">SUB (UTC+7)</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-white font-bold bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              <span className="text-cyan-400">TIME:</span>
              <span>{timeStr || "--:--:-- WIB"}</span>
            </div>
          </div>
        </div>

        {/* ── MAIN BENTO GRID (LAYER 1) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 my-auto">
          
          {/* Bento Cell 1: Operator Identity & Mission (8 Cols) */}
          <div className="lg:col-span-8 relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden group hover:border-cyan-500/30 transition-all duration-300">
            <HudCorner />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded">
                  SYS // OPERATOR_ID
                </span>
                
                {/* HUD Language Switcher */}
                <div className="flex p-1 rounded-lg bg-black/60 border border-white/10">
                  {(["ID", "EN", "JP"] as const).map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`px-3 py-1 text-xs font-mono rounded transition-colors ${
                        lang === l
                          ? "bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tight text-white mb-2">
                Miftakhul Ilmi<span className="text-cyan-400">.</span>
              </h1>
              
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-200 font-medium">
                <span className="text-emerald-400">●</span>
                <span>Guru Ekstrakurikuler Coding & Multimedia Freelancer</span>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6 font-light">
                {dict.hero.subtitle}
              </p>
            </div>

            {/* Tactical Actions Cluster */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
              <a
                href="#projects"
                className="bg-white text-black hover:bg-cyan-300 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
              >
                <span>{dict.hero.btnWork}</span>
                <span className="text-xs">↓</span>
              </a>

              {/* CV Download Selector */}
              <div ref={cvMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCvMenuOpen((prev) => !prev)}
                  aria-expanded={cvMenuOpen}
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2"
                >
                  <span>↓</span>
                  <span>{dict.hero.btnResume}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${cvMenuOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {cvMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute left-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-64 bg-[#0d0d14]/98 border border-white/15 rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50 text-left"
                    >
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-cyan-400 border-b border-white/10 mb-1">
                        {dict.hero.cvSelectTitle}
                      </div>
                      {cvOptions.map((opt) => (
                        <a
                          key={opt.code}
                          href={opt.file}
                          download={opt.filename}
                          onClick={() => setCvMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-gray-200 hover:text-white hover:bg-cyan-500/15 transition-colors"
                        >
                          <span className="flex items-center gap-2">
                            <span>{opt.flag}</span>
                            <span className="font-medium">{opt.label}</span>
                          </span>
                          <span className="text-[10px] font-mono text-cyan-400">PDF</span>
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href="#contact"
                className="bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white px-5 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                {dict.hero.btnContact}
              </a>
            </div>
          </div>

          {/* Bento Cell 2: Current Active Role (4 Cols) */}
          <div className="lg:col-span-4 relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300">
            <HudCorner />
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded">
                  STATUS // ACTIVE
                </span>
                <span className="text-[11px] font-mono text-gray-400">2026 - NOW</span>
              </div>

              <div className="text-3xl mb-3">🏫</div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                Guru Ekstrakurikuler Coding
              </h2>
              <p className="text-xs font-mono text-cyan-400 mb-3">
                SMP Pancasila • Surabaya
              </p>
              
              <p className="text-xs text-gray-300 leading-relaxed font-light mb-4">
                Membimbing siswa kelas 7–9 memahami dasar web (HTML, CSS, JS) dan pengenalan logika pemrograman secara menyenangkan melalui modul interaktif.
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10 text-[11px] font-mono text-gray-300">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">HTML/CSS</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">JS Dasar</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Python</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">Modul Interaktif</span>
            </div>
          </div>

          {/* Bento Cell 3: Core Arsenal / Keahlian Utama (7 Cols) */}
          <div id="expertise" className="lg:col-span-7 relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300">
            <HudCorner />
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                  MODULE // KEAHLIAN UTAMA
                </span>
                <span className="text-[10px] font-mono text-gray-400">5 SPESIALISASI</span>
              </div>

              <p className="text-xs text-gray-400 mb-4 font-mono">
                {dict.hud.stackSubtitle}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {dict.expertise.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSkillId(item.id)}
                    className="text-left p-3 rounded-xl bg-white/[0.02] hover:bg-cyan-500/10 border border-white/5 hover:border-cyan-400/30 transition-all group/item flex items-start gap-3"
                  >
                    <span className="text-xl p-2 rounded-lg bg-white/5 border border-white/10 shrink-0">
                      {item.icon}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover/item:text-cyan-300 transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[10px] text-gray-400 line-clamp-1 mt-0.5 font-light">
                        {item.desc}
                      </div>
                      <div className="text-[9px] font-mono text-cyan-400/80 mt-1 flex items-center gap-1">
                        <span>Lihat detail</span>
                        <span>→</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bento Cell 4: Workstation Specs & Tactical Triggers (5 Cols) */}
          <div className="lg:col-span-5 relative bg-white/[0.03] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between group hover:border-cyan-500/30 transition-all duration-300">
            <HudCorner />
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-0.5 rounded">
                  RIG // WORKSTATION
                </span>
                <span className="text-[10px] font-mono text-emerald-400">READY</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono mb-5">
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400">CPU / RIG:</span>
                  <span className="text-gray-200">AMD Ryzen Workstation</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400">GATEWAY:</span>
                  <span className="text-cyan-300">OpenWrt LuCI (Kawaragi)</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-black/40 border border-white/5">
                  <span className="text-gray-400">SETUP:</span>
                  <span className="text-gray-200">Dual-Screen Editing Station</span>
                </div>
              </div>
            </div>

            {/* Tactical Triggers */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                HUD QUICK LAUNCHERS:
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={triggerMusic}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-gray-200 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <span>🎵</span>
                  <span>Audio Player</span>
                </button>
                <button
                  type="button"
                  onClick={triggerTerminal}
                  className="px-3 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/40 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-all flex items-center justify-center gap-2"
                >
                  <span>&gt;_</span>
                  <span>Terminal AI</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ── BOTTOM HUD NAV NOTICE ── */}
        <div className="text-center py-2">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest text-gray-400 hover:text-cyan-300 uppercase transition-colors"
          >
            <span>[</span>
            <span>{dict.hud.scrollNotice}</span>
            <span>]</span>
          </a>
        </div>

      </div>

      {/* ── MODAL FULL DETAIL KEAHLIAN ── */}
      {isClient && createPortal(
        <AnimatePresence>
          {selectedSkillId && selectedSkill && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 md:px-10 py-6 md:py-10 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkillId(null)}
                className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-pointer"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative bg-[#0d0d14] border border-white/15 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
              >
                <HudCorner color="text-cyan-400/80" />

                <div className="bg-white/5 border-b border-white/10 p-5 md:p-6 flex justify-between items-center z-20 shrink-0">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-xl bg-white/10 border border-white/15">
                      {selectedSkill.icon}
                    </span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white">
                        {selectedSkill.title}
                      </h3>
                      <p className="text-xs text-cyan-400 font-mono mt-0.5">
                        {selectedSkill.desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedSkillId(null)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 text-gray-300">
                  <p className="text-sm md:text-base leading-relaxed font-light">
                    {selectedSkill.fullDesc}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                    <div>
                      <h4 className="text-xs font-mono tracking-wider uppercase text-cyan-400 mb-3">
                        {dict.expertise.techStack}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedSkill.tools.map((tool, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-mono tracking-wider uppercase text-cyan-400 mb-3">
                        {dict.expertise.coreSkills}
                      </h4>
                      <ul className="space-y-2">
                        {selectedSkill.capabilities.map((cap, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <span className="text-cyan-400 mt-0.5">▹</span>
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}