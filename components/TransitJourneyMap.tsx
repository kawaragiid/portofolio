"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import HudCorner from "./HudCorner";

const cvOptions = [
  { code: "ID", label: "Bahasa Indonesia", flag: "🇮🇩", file: "/CV_Miftakhul_Ilmi_ID.pdf", filename: "CV_Miftakhul_Ilmi_ID.pdf" },
  { code: "EN", label: "English", flag: "🇺🇸", file: "/CV_Miftakhul_Ilmi_EN.pdf", filename: "CV_Miftakhul_Ilmi_EN.pdf" },
  { code: "JP", label: "日本語 (Japanese)", flag: "🇯🇵", file: "/CV_Miftakhul_Ilmi_JP.pdf", filename: "CV_Miftakhul_Ilmi_JP.pdf" },
];

export default function TransitJourneyMap() {
  const { lang, setLang, dict } = useLanguage();
  const { tier } = usePerformance();

  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<number | null>(null);
  const [activeSkillModal, setActiveSkillModal] = useState<string | null>(null);
  const [timeStr, setTimeStr] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");

  const cvMenuRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const myEmail = "ilmi@kawaragi.id";
  const upworkLink = "https://www.upwork.com/freelancers/~01705729bdc457ff0f?mp_source=share";

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Scroll Progress for Transit Track
  const { scrollYProgress } = useScroll({
    target: mapContainerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Real-time Surabaya WIB Clock
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

  // Modal & Outside Click handlers
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) {
        setCvMenuOpen(false);
      }
    };
    const handleCloseAll = () => {
      setCvMenuOpen(false);
      setActiveProjectModal(null);
      setActiveSkillModal(null);
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
    if (activeProjectModal !== null || activeSkillModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeProjectModal, activeSkillModal]);

  const copyToClipboard = () => {
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    navigator.clipboard.writeText(myEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate(50);
    }
    const subject = encodeURIComponent(dict.contact.subject);
    const body = encodeURIComponent(`From: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;
  };

  const triggerMusic = () => {
    window.dispatchEvent(new CustomEvent("toggle-music"));
  };

  const triggerTerminal = () => {
    window.dispatchEvent(new CustomEvent("toggle-terminal"));
  };

  const selectedProject = activeProjectModal !== null ? dict.projects.items[activeProjectModal] : null;
  const selectedSkill = activeSkillModal !== null ? dict.expertise.items.find((item) => item.id === activeSkillModal) : null;

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full min-h-screen bg-black text-gray-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans"
    >
      {/* ── PURE OBSIDIAN MINIMAL BACKGROUND ── */}
      <div className="fixed inset-0 bg-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(6,182,212,0.08),transparent_70%)] pointer-events-none z-0" />

      {/* ── TOP HUD TELEMETRY BAR (Sticky Header) ── */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/85 backdrop-blur-md px-4 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 font-semibold tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {dict.hud.sysStatus}
            </span>
            <span className="text-white/20">|</span>
            <span className="text-gray-400 hidden sm:inline">TRANSIT MAP // ILMI.OS</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex items-center gap-1.5 text-gray-300">
              <span className="text-cyan-400">LOC:</span>
              <span>SUB (UTC+7)</span>
            </div>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5 text-white font-bold bg-white/5 px-2.5 py-0.5 rounded border border-white/10">
              <span className="text-cyan-400">TIME:</span>
              <span>{timeStr || "--:--:-- WIB"}</span>
            </div>

            {/* Language HUD Selector */}
            <div className="flex p-0.5 rounded-lg bg-black/60 border border-white/10">
              {(["ID", "EN", "JP"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
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
          </div>
        </div>
      </header>

      {/* ── ZIG-ZAG TRANSIT PROGRESS LINE ── */}
      {/* On desktop: Center-Left-Right-Left-Right-Center path */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-hidden">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Base Track */}
          <path
            d="M 50 2 L 50 14 L 30 26 L 70 44 L 30 62 L 70 80 L 50 94 L 50 99"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.3"
            strokeDasharray="1 1"
          />
          {/* Animated Glowing Track */}
          {tier === "high" && (
            <motion.path
              d="M 50 2 L 50 14 L 30 26 L 70 44 L 30 62 L 70 80 L 50 94 L 50 99"
              stroke="url(#cyanEmeraldGlow)"
              strokeWidth="0.45"
              style={{ pathLength: smoothProgress }}
            />
          )}
          <defs>
            <linearGradient id="cyanEmeraldGlow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* On mobile: Straight Metro Line along the left margin */}
      <div className="absolute top-16 bottom-0 left-6 sm:left-10 w-[1px] bg-white/10 pointer-events-none z-10 lg:hidden">
        {tier === "high" && (
          <motion.div
            className="w-full bg-cyan-400 origin-top shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            style={{ scaleY: smoothProgress, height: "100%" }}
          />
        )}
      </div>

      {/* ── MAIN JOURNEY STATIONS CONTAINER ── */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 py-12 md:py-20 space-y-32 md:space-y-48">

        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 00 // ORIGIN (Header & Operator Identity)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="origin" className="relative flex flex-col items-center text-center pt-8 md:pt-16">
          {/* Station Beacon Node */}
          <div className="relative mb-6 flex flex-col items-center">
            <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-3">
              {dict.hud.transit.wp00}
            </span>
            <div className="w-4 h-4 rounded-full bg-cyan-400 border-4 border-black shadow-[0_0_20px_rgba(34,211,238,0.9)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight text-white mb-3">
              Miftakhul Ilmi<span className="text-cyan-400">.</span>
            </h1>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-200 font-medium mb-6">
              <span className="text-emerald-400">●</span>
              <span>Guru Ekstrakurikuler Coding @ SMP Pancasila &amp; Freelancer</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-10">
              {dict.hero.subtitle}
            </p>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#academy"
                className="bg-white text-black hover:bg-cyan-300 px-7 py-3 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
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
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2"
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
                      className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-64 bg-[#0d0d14] border border-white/15 rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.9)] z-50 text-left"
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
                href="#terminus"
                className="bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium text-xs sm:text-sm transition-colors"
              >
                {dict.hero.btnContact}
              </a>
            </div>

            {/* Scroll Notice */}
            <div className="mt-14 text-center">
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase animate-pulse">
                {dict.hud.transit.scrollPrompt}
              </span>
            </div>
          </motion.div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 01 // ACADEMY (SMP Pancasila — Coding Education)
            Position: Left-leaning on desktop (Zig-Zag Pos 1)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="academy" className="relative pl-12 sm:pl-16 lg:pl-0">
          <div id="expertise" className="absolute -top-24 pointer-events-none" />
          <div className="lg:w-[75%] lg:mr-auto">
            
            {/* Station Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.8)] shrink-0 lg:-ml-1.5" />
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {dict.hud.transit.wp01}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs font-mono text-emerald-400">AKTIF MENGAJAR (2026 - SEKARANG)</span>
            </div>

            {/* Card Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="text-xs font-mono text-cyan-400 mb-1">
                    SMP PANCASILA • SURABAYA
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                    Guru Ekstrakurikuler Coding
                  </h2>
                  <p className="text-sm text-gray-300 leading-relaxed font-light max-w-xl">
                    Membimbing siswa kelas 7–9 memahami dasar web (HTML, CSS, JavaScript) dan pengenalan logika Python melalui materi ajar web interaktif bertema gelap serta praktik live coding.
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    HTML5 &amp; CSS3
                  </span>
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    JavaScript Dasar
                  </span>
                  <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-gray-300">
                    Python Logic
                  </span>
                  <span className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300">
                    Modul Web Interaktif
                  </span>
                </div>
              </div>

              {/* Module Visual Showcase (Clickable) */}
              <div
                onClick={() => setActiveProjectModal(3)}
                className="group/img relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all"
              >
                <Image
                  src="/images/project-4.png"
                  alt="Modul Materi Ekskul Coding SMP Pancasila"
                  fill
                  className="object-cover opacity-75 group-hover/img:opacity-95 group-hover/img:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 md:p-6">
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-xs font-mono text-cyan-300 uppercase">
                        DOKUMENTASI MODUL AJAR
                      </div>
                      <div className="text-sm md:text-base font-bold text-white">
                        Materi Pekan 2 — Modul Web Dark Mode SMP Pancasila
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-400 group-hover/img:translate-x-1 transition-transform">
                      Buka Detail →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 02 // STUDIO (Multilingual Localization & Video Production)
            Position: Right-leaning on desktop (Zig-Zag Pos 2)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="relative pl-12 sm:pl-16 lg:pl-0">
          <div className="lg:w-[75%] lg:ml-auto">
            
            {/* Station Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.8)] shrink-0 lg:-ml-1.5" />
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {dict.hud.transit.wp02}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs font-mono text-gray-400">SUBTITLER &amp; VIDEO EDITOR</span>
            </div>

            {/* Dual Works Bento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Work A: Subtitling */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveProjectModal(0)}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all flex flex-col justify-between"
              >
                <HudCorner />

                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase mb-2">
                    <span>LOKALISASI SUBTITLE</span>
                    <span className="text-gray-400">PRJ // 01</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    Inggris &amp; Jepang ke Indonesia
                  </h3>
                  <p className="text-xs text-gray-300 font-light mb-4">
                    Penerjemahan kontekstual, penyelarasan timing dialog, dan hardcoding video (contoh serial Piece of Safe) dengan Subtitle Edit &amp; Aegisub.
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-3">
                  <Image
                    src="/images/project-1.png"
                    alt="Subtitle Edit Project Piece of Safe"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-white/10">
                  <span>Subtitle Edit • Aegisub</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Detail →</span>
                </div>
              </motion.div>

              {/* Work B: Video Editing */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => setActiveProjectModal(1)}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-5 md:p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] cursor-pointer transition-all flex flex-col justify-between"
              >
                <HudCorner />

                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 uppercase mb-2">
                    <span>VIDEO PRODUCTION</span>
                    <span className="text-gray-400">PRJ // 02</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-1">
                    Editing Video &amp; Dokumentasi
                  </h3>
                  <p className="text-xs text-gray-300 font-light mb-4">
                    Penyuntingan video dokumentasi acara dan konten pendek ritmis dengan CapCut Pro dual-screen workstation, Canva, dan OBS Studio.
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-3">
                  <Image
                    src="/images/project-2.png"
                    alt="CapCut Pro Dual Screen Setup"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-gray-400 pt-2 border-t border-white/10">
                  <span>CapCut Pro • OBS</span>
                  <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform">Detail →</span>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 03 // GATEWAY (Network Router & Hardware Rig Lab)
            Position: Left-leaning on desktop (Zig-Zag Pos 3)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="gateway" className="relative pl-12 sm:pl-16 lg:pl-0">
          <div className="lg:w-[75%] lg:mr-auto">
            
            {/* Station Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.8)] shrink-0 lg:-ml-1.5" />
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {dict.hud.transit.wp03}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs font-mono text-gray-400">OPENWRT &amp; WORKSTATION</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                
                {/* Left: Project Screenshot */}
                <div
                  onClick={() => setActiveProjectModal(2)}
                  className="md:col-span-6 group/net relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 hover:border-cyan-400/50 cursor-pointer"
                >
                  <Image
                    src="/images/project-3.png"
                    alt="OpenWrt LuCI Router Status"
                    fill
                    className="object-cover opacity-70 group-hover/net:opacity-90 group-hover/net:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[10px] font-mono text-cyan-300">
                      OpenWrt LuCI Gateway Status (Kawaragi) ↗
                    </span>
                  </div>
                </div>

                {/* Right: Technical Details & Rig Telemetry */}
                <div className="md:col-span-6">
                  <div className="text-xs font-mono text-cyan-400 mb-1">
                    INFRASTRUKTUR &amp; RIG
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                    Jaringan OpenWrt &amp; PC Workstation
                  </h3>
                  <p className="text-xs text-gray-300 font-light leading-relaxed mb-4">
                    Konfigurasi firmware custom OpenWrt untuk manajemen port LAN/WAN dan transfer data multimedia stabil, didukung PC Workstation AMD Ryzen untuk editing video dan edukasi coding.
                  </p>

                  <div className="space-y-1.5 text-xs font-mono mb-4">
                    <div className="flex justify-between p-2 rounded bg-black/50 border border-white/5">
                      <span className="text-gray-400">GATEWAY:</span>
                      <span className="text-cyan-300 font-semibold">OpenWrt Gigabit Router</span>
                    </div>
                    <div className="flex justify-between p-2 rounded bg-black/50 border border-white/5">
                      <span className="text-gray-400">WORKSTATION:</span>
                      <span className="text-gray-200">AMD Ryzen Dual-Screen</span>
                    </div>
                  </div>

                  {/* Quick Launcher Triggers */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={triggerMusic}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <span>🎵</span>
                      <span>Audio</span>
                    </button>
                    <button
                      type="button"
                      onClick={triggerTerminal}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-1.5"
                    >
                      <span>&gt;_</span>
                      <span>Terminal</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 04 // LOGS (Career Chronology & Teaching History)
            Position: Right-leaning on desktop (Zig-Zag Pos 4)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="relative pl-12 sm:pl-16 lg:pl-0">
          <div className="lg:w-[75%] lg:ml-auto">
            
            {/* Station Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.8)] shrink-0 lg:-ml-1.5" />
              <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {dict.hud.transit.wp04}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs font-mono text-gray-400">{dict.experience.title}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                {dict.experience.jobs.map((job, index) => {
                  const isCurrent = index === 0;

                  return (
                    <div key={index} className="relative pl-8 group">
                      <div
                        className={`absolute left-1.5 top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border transition-all ${
                          isCurrent
                            ? "bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                            : "bg-black border-white/30 group-hover:border-cyan-400"
                        }`}
                      />

                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all">
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {job.title}
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                            {job.date}
                          </span>
                        </div>

                        <div className="text-xs font-mono text-cyan-400 mb-2 flex items-center gap-2">
                          <span>{job.company}</span>
                          {isCurrent && (
                            <span className="text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-1.5 py-0.2 rounded font-mono">
                              AKTIF
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-300 leading-relaxed font-light">
                          {job.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 05 // TERMINUS (Mission Dispatch & Contact Console)
            Position: Centered at the journey end (Zig-Zag Terminus)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="terminus" className="relative flex flex-col items-center pt-8">
          <div id="contact" className="absolute -top-24 pointer-events-none" />
          
          {/* Station Beacon Node */}
          <div className="relative mb-6 flex flex-col items-center">
            <span className="px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[10px] font-mono tracking-widest text-emerald-400 uppercase mb-3">
              {dict.hud.transit.wp05}
            </span>
            <div className="w-4 h-4 rounded-full bg-emerald-400 border-4 border-black shadow-[0_0_20px_rgba(52,211,153,0.9)]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-4xl"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-2">
                {dict.contact.title}
              </h2>
              <p className="text-sm text-gray-400 font-light max-w-lg mx-auto">
                {dict.contact.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Direct Mail Dispatch (7 cols) */}
              <div className="md:col-span-7 relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                <HudCorner />

                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    DISPATCH FORM // {dict.contact.quickMessage}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">DIRECT MAIL</span>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-3.5">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">
                      EMAIL_PENGIRIM:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={dict.contact.emailPlaceholder}
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase mb-1">
                      PESAN:
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={dict.contact.msgPlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/60 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-sans font-light transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-white text-black hover:bg-cyan-300 font-bold text-xs tracking-wider uppercase transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    {dict.contact.btnSend}
                  </motion.button>
                </form>
              </div>

              {/* Quick Connect & Upwork (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-4">
                
                {/* 1-Click Copy Email */}
                <div
                  onClick={copyToClipboard}
                  className="relative cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-5 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all group"
                >
                  <HudCorner />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      {dict.contact.copyTitle}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                      📋 SALIN
                    </span>
                  </div>

                  <div className="text-base font-mono font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {myEmail}
                  </div>

                  <div className="mt-2 text-xs">
                    {copied ? (
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        {dict.contact.copiedText}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-mono text-[11px]">
                        {dict.contact.copyText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Upwork & Location Cards */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <a
                    href={upworkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-4 rounded-2xl bg-white/[0.02] hover:bg-[#14a800]/10 border border-white/10 hover:border-[#14a800]/50 transition-colors text-center group flex flex-col justify-center"
                  >
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      {dict.contact.freelance}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-[#14a800] transition-colors flex items-center justify-center gap-1">
                      <span>Upwork</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </a>

                  <div className="relative p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex flex-col justify-center">
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      {dict.contact.location}
                    </div>
                    <div className="text-sm font-bold text-white">
                      Surabaya, ID
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono mt-0.5">
                      ● Remote Ready
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Terminal Notice */}
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={triggerTerminal}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-400/30 text-xs font-mono text-cyan-300 transition-colors"
              >
                <span>&gt;_</span>
                <span>{dict.shortcuts.terminal} (Tekan Ctrl + K atau klik di sini)</span>
              </button>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ── FOOTER ── */}
      <footer className="relative z-20 border-t border-white/10 py-8 px-4 sm:px-8 text-center text-xs font-mono text-gray-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Miftakhul Ilmi. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span>VISIONQUEST MAP</span>
            <span className="text-cyan-400">●</span>
            <span>Next.js • Tailwind v4 • Framer Motion</span>
          </p>
        </div>
      </footer>

      {/* ── LIGHTBOX MODAL FOR WORKS & LAB ── */}
      {isClient && createPortal(
        <AnimatePresence>
          {selectedProject !== null && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 md:px-8 py-6 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectModal(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative bg-[#0d0d14] border border-white/20 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
              >
                <HudCorner color="text-cyan-400/80" />

                <div className="p-4 md:p-6 bg-white/[0.03] border-b border-white/10 flex items-center justify-between shrink-0">
                  <div>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-400">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-white mt-0.5">
                      {selectedProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveProjectModal(null)}
                    className="p-2 md:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="p-4 md:p-8 space-y-6 overflow-y-auto overscroll-contain">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      className="object-contain bg-black"
                    />
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-2">
                      {dict.projects.summaryTitle}:
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                      {selectedProject.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
                      {dict.projects.toolsUsed}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* ── MODAL FULL DETAIL KEAHLIAN ── */}
      {isClient && createPortal(
        <AnimatePresence>
          {activeSkillModal !== null && selectedSkill && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 md:px-10 py-6 md:py-10 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveSkillModal(null)}
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
                    onClick={() => setActiveSkillModal(null)}
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

    </div>
  );
}
