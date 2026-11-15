"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import { useScreenSize } from "./useScreenSize";
import HudCorner from "./HudCorner";

const cvOptions = [
  { code: "ID", label: "Bahasa Indonesia", flag: "🇮🇩", file: "/CV_Miftakhul_Ilmi_ID.pdf", filename: "CV_Miftakhul_Ilmi_ID.pdf" },
  { code: "EN", label: "English", flag: "🇺🇸", file: "/CV_Miftakhul_Ilmi_EN.pdf", filename: "CV_Miftakhul_Ilmi_EN.pdf" },
  { code: "JP", label: "日本語 (Japanese)", flag: "🇯🇵", file: "/CV_Miftakhul_Ilmi_JP.pdf", filename: "CV_Miftakhul_Ilmi_JP.pdf" },
];

export default function TransitJourneyMap() {
  const { dict } = useLanguage();
  const { tier } = usePerformance();
  const screen = useScreenSize();

  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<number | null>(null);
  const [activeSkillModal, setActiveSkillModal] = useState<string | null>(null);
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
    stiffness: 100,
    damping: 26,
    restDelta: 0.001,
  });

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
      className="relative w-full min-h-screen bg-black text-gray-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans pt-20 md:pt-24"
    >
      {/* ── PURE OBSIDIAN BACKGROUND ── */}
      <div className="fixed inset-0 bg-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-5%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* ── ORGANIC ASYMMETRIC TRANSIT NETWORK (Desktop) ── */}
      <div className="absolute inset-0 pointer-events-none z-10 hidden lg:block overflow-hidden">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Main Organic Arterial Track */}
          <path
            d="M 50 1 L 50 11 L 22 22 L 22 32 L 82 43 L 82 52 L 28 64 L 28 73 L 74 82 L 74 89 L 50 95 L 50 99"
            stroke="rgba(255, 255, 255, 0.07)"
            strokeWidth="0.25"
            strokeDasharray="1.2 1.2"
          />

          {/* Auxiliary Branch Circuits */}
          <path
            d="M 22 27 L 46 29 M 82 48 L 56 50 M 28 68 L 12 70 M 50 95 L 20 97 M 50 95 L 80 97"
            stroke="rgba(34, 211, 238, 0.15)"
            strokeWidth="0.18"
            strokeDasharray="0.8 0.8"
          />

          {/* Animated Glowing Progress Line */}
          {tier === "high" && (
            <motion.path
              d="M 50 1 L 50 11 L 22 22 L 22 32 L 82 43 L 82 52 L 28 64 L 28 73 L 74 82 L 74 89 L 50 95 L 50 99"
              stroke="url(#cyanGlowGradient)"
              strokeWidth="0.45"
              style={{ pathLength: smoothProgress }}
            />
          )}

          <defs>
            <linearGradient id="cyanGlowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="35%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ── MOBILE METRO TRANSIT LINE (Smartphone) ── */}
      <div className="absolute top-20 bottom-0 left-5 sm:left-8 w-[1px] bg-white/10 pointer-events-none z-10 lg:hidden">
        {tier === "high" && (
          <motion.div
            className="w-full bg-cyan-400 origin-top shadow-[0_0_12px_rgba(34,211,238,0.9)]"
            style={{ scaleY: smoothProgress, height: "100%" }}
          />
        )}
      </div>

      {/* ── EXPANSIVE FULL-WIDTH JOURNEY CANVAS ── */}
      <main className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 py-8 md:py-16 space-y-28 md:space-y-44">

        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 00 // ORIGIN (Operator Identity & Command Hub)
            Position: Full-Width Centered
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="origin" className="relative flex flex-col items-center text-center pt-4 md:pt-12">
          
          {/* Station Beacon & Tactical Badges */}
          <div className="relative mb-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase">
                {dict.hud.transit.wp00}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400">
                COORDS: 7.2575° S, 112.7521° E
              </span>
            </div>
            
            {/* Pulsing Station Hub */}
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-cyan-400 opacity-40" />
              <div className="w-5 h-5 rounded-full bg-cyan-400 border-4 border-black shadow-[0_0_25px_rgba(34,211,238,1)]" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-4 leading-none">
              Miftakhul Ilmi<span className="text-cyan-400">.</span>
            </h1>

            <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 text-xs sm:text-sm md:text-base text-gray-200 font-medium mb-6 backdrop-blur-md">
              <span className="text-emerald-400 animate-pulse">●</span>
              <span>Guru Ekstrakurikuler Coding @ SMP Pancasila</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span className="text-cyan-300">Freelance Subtitler &amp; Video Editor</span>
            </div>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto mb-10">
              {dict.hero.subtitle}
            </p>

            {/* Tactical Action Triggers */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="#academy"
                className="bg-white text-black hover:bg-cyan-300 px-8 py-3.5 rounded-xl font-bold text-xs sm:text-sm md:text-base tracking-wide transition-all shadow-[0_0_25px_rgba(255,255,255,0.25)] flex items-center gap-2"
              >
                <span>{dict.hero.btnWork}</span>
                <span>↓</span>
              </a>

              {/* CV Download Selector */}
              <div ref={cvMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCvMenuOpen((prev) => !prev)}
                  aria-expanded={cvMenuOpen}
                  className="bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-7 py-3.5 rounded-xl font-semibold text-xs sm:text-sm md:text-base transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2"
                >
                  <span>↓</span>
                  <span>{dict.hero.btnResume}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${cvMenuOpen ? "rotate-180" : ""}`}
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
                      className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-72 bg-[#0c0d14] border border-white/15 rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 text-left"
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
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs md:text-sm text-gray-200 hover:text-white hover:bg-cyan-500/15 transition-colors"
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="text-base">{opt.flag}</span>
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
                className="bg-white/5 hover:bg-white/10 border border-white/15 text-gray-300 hover:text-white px-7 py-3.5 rounded-xl font-medium text-xs sm:text-sm md:text-base transition-colors"
              >
                {dict.hero.btnContact}
              </a>
            </div>

            {/* Scroll Direction Bar */}
            <div className="mt-16 flex items-center justify-center gap-3 text-[11px] font-mono tracking-widest text-gray-500 uppercase">
              <span className="w-8 h-[1px] bg-white/20" />
              <span className="animate-pulse">{dict.hud.transit.scrollPrompt}</span>
              <span className="w-8 h-[1px] bg-white/20" />
            </div>
          </motion.div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 01 // ACADEMY (SMP Pancasila — Coding Education)
            Position: Wide Left-Leaning (Asymmetric Node 1)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="academy" className="relative pl-10 sm:pl-14 lg:pl-0">
          <div id="expertise" className="absolute -top-24 pointer-events-none" />
          
          <div className="w-full lg:w-[72%] xl:w-[65%] lg:mr-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.9)] shrink-0 lg:-ml-2" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {dict.hud.transit.wp01}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-emerald-400">AKTIF MENGAJAR (2026 - SEKARANG)</span>
            </div>

            {/* Expansive Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="text-xs sm:text-sm font-mono text-cyan-400 mb-1">
                    SMP PANCASILA • SURABAYA
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                    Guru Ekstrakurikuler Coding
                  </h2>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light max-w-2xl">
                    Membimbing siswa kelas 7–9 mempelajari dasar pemrograman web (HTML, CSS, JavaScript) dan pengenalan logika Python melalui materi interaktif bertema gelap serta praktik live coding.
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

              {/* Real Teaching Module Screenshot */}
              <div
                onClick={() => setActiveProjectModal(3)}
                className="group/mod relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all"
              >
                <Image
                  src="/images/project-4.png"
                  alt="Modul Materi Ekskul Coding SMP Pancasila"
                  fill
                  className="object-cover opacity-75 group-hover/mod:opacity-95 group-hover/mod:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                    <div>
                      <div className="text-[10px] sm:text-xs font-mono text-cyan-300 uppercase">
                        DOKUMENTASI MODUL AJAR RESMI
                      </div>
                      <div className="text-sm sm:text-base md:text-lg font-bold text-white">
                        Materi Pekan 2 — Modul Web Dark Mode SMP Pancasila
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-cyan-400 group-hover/mod:translate-x-1 transition-transform">
                      Buka Resolusi Penuh →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 02 // STUDIO (Multilingual Localization & Video Production)
            Position: Far-Right Offset (Asymmetric Node 2)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="relative pl-10 sm:pl-14 lg:pl-0">
          <div className="w-full lg:w-[85%] xl:w-[80%] lg:ml-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.9)] shrink-0 lg:-ml-2" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {dict.hud.transit.wp02}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-400">SUBTITLER &amp; VIDEO EDITOR</span>
            </div>

            {/* Asymmetric Dual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Work A: Subtitling (Higher Stagger) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveProjectModal(0)}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] cursor-pointer transition-all flex flex-col justify-between"
              >
                <HudCorner />

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 uppercase mb-2">
                    <span>LOKALISASI SUBTITLE</span>
                    <span className="text-gray-400">PRJ // 01</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    Inggris &amp; Jepang ke Indonesia
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    Penerjemahan kontekstual, penyelarasan timing dialog, dan hardcoding video (contoh serial Piece of Safe) dengan Subtitle Edit &amp; Aegisub.
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-4">
                  <Image
                    src="/images/project-1.png"
                    alt="Subtitle Edit Project Piece of Safe"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-3 border-t border-white/10">
                  <span>Subtitle Edit • Aegisub</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Lihat Detail →</span>
                </div>
              </motion.div>

              {/* Work B: Video Editing (Offset Lower) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => setActiveProjectModal(1)}
                className="group relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] cursor-pointer transition-all flex flex-col justify-between lg:translate-y-8"
              >
                <HudCorner />

                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 uppercase mb-2">
                    <span>VIDEO PRODUCTION</span>
                    <span className="text-gray-400">PRJ // 02</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    Editing Video &amp; Dokumentasi
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    Penyuntingan video dokumentasi acara dan konten pendek ritmis dengan CapCut Pro dual-screen workstation, Canva, dan OBS Studio.
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-4">
                  <Image
                    src="/images/project-2.png"
                    alt="CapCut Pro Dual Screen Setup"
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-3 border-t border-white/10">
                  <span>CapCut Pro • OBS Studio</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">Lihat Detail →</span>
                </div>
              </motion.div>

            </div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 03 // GATEWAY (Network Router & Workstation Rig Lab)
            Position: Center-Left Diagonal (Asymmetric Node 3)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="gateway" className="relative pl-10 sm:pl-14 lg:pl-0">
          <div className="w-full lg:w-[76%] xl:w-[70%] lg:ml-[6%]">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.9)] shrink-0 lg:-ml-2" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {dict.hud.transit.wp03}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-400">OPENWRT &amp; WORKSTATION</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Router Status Screenshot */}
                <div
                  onClick={() => setActiveProjectModal(2)}
                  className="lg:col-span-7 group/net relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 hover:border-cyan-400/50 cursor-pointer"
                >
                  <Image
                    src="/images/project-3.png"
                    alt="OpenWrt LuCI Router Status"
                    fill
                    className="object-cover opacity-70 group-hover/net:opacity-90 group-hover/net:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-mono text-cyan-300">
                      OpenWrt LuCI Gateway Status (Kawaragi) ↗
                    </span>
                  </div>
                </div>

                {/* Right: Technical Specs & Rig Details */}
                <div className="lg:col-span-5">
                  <div className="text-xs sm:text-sm font-mono text-cyan-400 mb-1">
                    INFRASTRUKTUR JARINGAN &amp; RIG
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                    Jaringan OpenWrt &amp; PC Workstation
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed mb-6">
                    Konfigurasi firmware custom OpenWrt untuk manajemen port LAN/WAN dan transfer data multimedia stabil, didukung PC Workstation AMD Ryzen untuk editing video dan edukasi coding.
                  </p>

                  <div className="space-y-2 text-xs font-mono mb-6">
                    <div className="flex justify-between p-2.5 rounded-lg bg-black/50 border border-white/5">
                      <span className="text-gray-400">GATEWAY:</span>
                      <span className="text-cyan-300 font-semibold">OpenWrt Gigabit Router</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-black/50 border border-white/5">
                      <span className="text-gray-400">WORKSTATION:</span>
                      <span className="text-gray-200">AMD Ryzen Dual-Screen</span>
                    </div>
                  </div>

                  {/* Quick Launcher Triggers */}
                  <div className="flex gap-2.5">
                    <button
                      type="button"
                      onClick={triggerMusic}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs font-mono text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>🎵</span>
                      <span>Audio Player</span>
                    </button>
                    <button
                      type="button"
                      onClick={triggerTerminal}
                      className="px-4 py-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-xs font-mono text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-2"
                    >
                      <span>&gt;_</span>
                      <span>Terminal AI</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 04 // LOGS (Career Chronology & Teaching History)
            Position: Expansive Asymmetric Grid (Asymmetric Node 4)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="relative pl-10 sm:pl-14 lg:pl-0">
          <div className="w-full lg:w-[88%] xl:w-[84%] lg:mx-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-black shadow-[0_0_15px_rgba(34,211,238,0.9)] shrink-0 lg:-ml-2" />
              <span className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-bold">
                {dict.hud.transit.wp04}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-400">{dict.experience.title}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all"
            >
              <HudCorner />

              {/* 2-Column Responsive Staggered Timeline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dict.experience.jobs.map((job, index) => {
                  const isCurrent = index === 0;

                  return (
                    <div
                      key={index}
                      className="relative p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1.5">
                          <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {job.title}
                          </h4>
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300">
                            {job.date}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm font-mono text-cyan-400 mb-3 flex items-center gap-2">
                          <span>{job.company}</span>
                          {isCurrent && (
                            <span className="text-[9px] bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 px-2 py-0.5 rounded font-mono font-bold">
                              AKTIF
                            </span>
                          )}
                        </div>

                        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                          {job.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                        <span>STAGE // 0{index + 1}</span>
                        <span className="text-cyan-400/80">VERIFIED LOG</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 05 // TERMINUS (Mission Dispatch & Docking Station)
            Position: Full-Width Centered
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="terminus" className="relative flex flex-col items-center pt-8">
          <div id="contact" className="absolute -top-24 pointer-events-none" />

          {/* Station Beacon Node */}
          <div className="relative mb-6 flex flex-col items-center">
            <span className="px-3.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-[10px] sm:text-xs font-mono tracking-widest text-emerald-400 uppercase mb-3 font-bold">
              {dict.hud.transit.wp05}
            </span>
            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-emerald-400 opacity-40" />
              <div className="w-5 h-5 rounded-full bg-emerald-400 border-4 border-black shadow-[0_0_25px_rgba(52,211,153,1)]" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-5xl"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
                {dict.contact.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-400 font-light max-w-xl mx-auto">
                {dict.contact.desc}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
              
              {/* Direct Mail Dispatch (7 cols) */}
              <div className="md:col-span-7 relative bg-white/[0.02] border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)]">
                <HudCorner />

                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                    DISPATCH FORM // {dict.contact.quickMessage}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">DIRECT MAIL</span>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-gray-400 uppercase mb-1">
                      EMAIL_PENGIRIM:
                    </label>
                    <input
                      type="email"
                      required
                      placeholder={dict.contact.emailPlaceholder}
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] sm:text-xs font-mono text-gray-400 uppercase mb-1">
                      PESAN:
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder={dict.contact.msgPlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 focus:border-cyan-400/60 rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none font-sans font-light transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.96 }}
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white text-black hover:bg-cyan-300 font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(255,255,255,0.25)]"
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
                  className="relative cursor-pointer bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.6)] transition-all group"
                >
                  <HudCorner />

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                      {dict.contact.copyTitle}
                    </span>
                    <span className="text-[11px] font-mono text-cyan-400 group-hover:translate-x-1 transition-transform">
                      📋 SALIN
                    </span>
                  </div>

                  <div className="text-lg font-mono font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {myEmail}
                  </div>

                  <div className="mt-2 text-xs">
                    {copied ? (
                      <span className="text-emerald-400 font-mono font-bold flex items-center gap-1">
                        {dict.contact.copiedText}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-mono text-xs">
                        {dict.contact.copyText}
                      </span>
                    )}
                  </div>
                </div>

                {/* Upwork & Location Split */}
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <a
                    href={upworkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative p-5 rounded-2xl bg-white/[0.02] hover:bg-[#14a800]/10 border border-white/10 hover:border-[#14a800]/50 transition-colors text-center group flex flex-col justify-center"
                  >
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      {dict.contact.freelance}
                    </div>
                    <div className="text-base font-bold text-white group-hover:text-[#14a800] transition-colors flex items-center justify-center gap-1">
                      <span>Upwork</span>
                      <span className="text-xs">↗</span>
                    </div>
                  </a>

                  <div className="relative p-5 rounded-2xl bg-white/[0.02] border border-white/10 text-center flex flex-col justify-center">
                    <div className="text-[10px] font-mono text-gray-400 uppercase mb-1">
                      {dict.contact.location}
                    </div>
                    <div className="text-base font-bold text-white">
                      Surabaya, ID
                    </div>
                    <div className="text-[11px] text-emerald-400 font-mono mt-0.5">
                      ● Remote Ready
                    </div>
                  </div>
                </div>

                {/* Footer Dock Bay Notice */}
                <div className="p-3 rounded-xl bg-black/60 border border-cyan-500/20 text-center">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    MISSION CONTROL DOCKED // READY FOR DISPATCH
                  </span>
                </div>

              </div>

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
            <span>{screen.displayStr}</span>
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
