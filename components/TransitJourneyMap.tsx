"use client";

import { useState, useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import { usePerformance } from "./PerformanceProvider";
import { useScreenSize } from "./useScreenSize";
import HudCorner from "./HudCorner";
import AnimeShape from "./AnimeShape";
import AnimeCircuit from "./AnimeCircuit";
import GlitchAvatar from "./GlitchAvatar";
import GlitchReveal from "./GlitchReveal";
import FloatingDock from "./FloatingDock";

const cvOptions = [
  { code: "ID", label: "Bahasa Indonesia", flag: "🇮🇩", file: "/CV_Miftakhul_Ilmi_ID.pdf", filename: "CV_Miftakhul_Ilmi_ID.pdf" },
  { code: "EN", label: "English", flag: "🇺🇸", file: "/CV_Miftakhul_Ilmi_EN.pdf", filename: "CV_Miftakhul_Ilmi_EN.pdf" },
  { code: "JP", label: "日本語 (Japanese)", flag: "🇯🇵", file: "/CV_Miftakhul_Ilmi_JP.pdf", filename: "CV_Miftakhul_Ilmi_JP.pdf" },
];

export default function TransitJourneyMap() {
  const { dict } = useLanguage();
  const { tier } = usePerformance();
  const screen = useScreenSize();

  const [scrollStage, setScrollStage] = useState(0);
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<number | null>(null);
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
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("close-all-modals", handleCloseAll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("close-all-modals", handleCloseAll);
    };
  }, []);

  // Progressive scroll-driven glitch assembly stages (0..7)
  // Desktop (>=1024px) uses a sticky Hero runway (~700px) before scrolling down to Section 01.
  // Mobile/Tablet (<1024px) uses tighter thresholds with normal scrolling.
  useEffect(() => {
    const handleScrollAssemble = () => {
      const y = window.scrollY;
      const isDesktop = window.innerWidth >= 1024;
      let nextStage = 0;

      if (isDesktop) {
        if (y >= 540) nextStage = 7;
        else if (y >= 440) nextStage = 6;
        else if (y >= 350) nextStage = 5;
        else if (y >= 260) nextStage = 4;
        else if (y >= 170) nextStage = 3;
        else if (y >= 80) nextStage = 2;
        else if (y >= 20) nextStage = 1;
        else if (y < 8) nextStage = 0;
        else return;
      } else {
        if (y >= 280) nextStage = 7;
        else if (y >= 220) nextStage = 6;
        else if (y >= 180) nextStage = 5;
        else if (y >= 140) nextStage = 4;
        else if (y >= 100) nextStage = 3;
        else if (y >= 55) nextStage = 2;
        else if (y >= 20) nextStage = 1;
        else if (y < 8) nextStage = 0;
        else return;
      }

      setScrollStage((prev) => (prev !== nextStage ? nextStage : prev));
    };
    window.addEventListener("scroll", handleScrollAssemble, { passive: true });
    window.addEventListener("resize", handleScrollAssemble, { passive: true });
    handleScrollAssemble();
    return () => {
      window.removeEventListener("scroll", handleScrollAssemble);
      window.removeEventListener("resize", handleScrollAssemble);
    };
  }, []);

  // Lock scroll when modal is active
  useEffect(() => {
    if (activeProjectModal !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeProjectModal]);

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

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full min-h-screen bg-black text-gray-100 selection:bg-cyan-500/30 selection:text-white overflow-x-clip font-sans pt-20 md:pt-24"
    >
      {/* ── PURE OBSIDIAN BACKGROUND ── */}
      <div className="fixed inset-0 bg-black pointer-events-none z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_90%_50%_at_50%_-5%,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none z-0" />

      {/* ── ANIME.JS DYNAMIC TOPOLOGY CIRCUIT ── */}
      <AnimeCircuit className="hidden lg:block" />

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

      {/* ── MOBILE METRO TRANSIT LINE (Smartphone & Tablet Portrait) ── */}
      <div className="absolute top-20 bottom-0 left-3 sm:left-5 w-[2px] bg-white/10 pointer-events-none z-10 lg:hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-cyan-400 via-sky-400 to-emerald-400 origin-top shadow-[0_0_10px_rgba(34,211,238,0.85)]"
          style={{ scaleY: smoothProgress, height: "100%" }}
        />
      </div>

      {/* ── EXPANSIVE FULL-WIDTH JOURNEY CANVAS ── */}
      <main className="relative z-20 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 pt-4 pb-6 md:pt-10 md:pb-8 space-y-16 sm:space-y-24 lg:space-y-36">

        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 00 // ORIGIN (Profile & Core Identity)
            Position: Full-Width 2-Column Responsive Layout
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="origin" className="relative pt-2 md:pt-6 lg:min-h-[175vh]">
          <div className="lg:sticky lg:top-24 lg:min-h-[calc(100vh-7rem)] lg:flex lg:items-center w-full">
          {scrollStage === 0 ? (
            /* ── INITIAL EMPTY STAGE: FULL-SCREEN NAME ONLY ── */
            <div className="min-h-[calc(100svh-6.5rem)] w-full flex flex-col items-center justify-center text-center max-w-7xl mx-auto px-2">
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[10.5rem] font-black tracking-tight text-white leading-[0.95] select-none">
                Miftakhul Ilmi<span className="text-cyan-400">.</span>
              </h1>
              <div className="mt-8 flex items-center gap-2.5 text-xs sm:text-sm font-mono text-cyan-400/80 animate-pulse tracking-widest uppercase">
                <span>↓</span>
                <span>{dict.hud.transit.scrollPrompt}</span>
              </div>
            </div>
          ) : (
            /* ── ASSEMBLED HERO STAGE: SEQUENTIAL GLITCH FORMATION ON SCROLL ── */
            <div className="min-h-[calc(100svh-6.5rem)] lg:min-h-0 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 max-w-7xl mx-auto">
              
              {/* Left Column: Core Identity & Key Highlights */}
              <div className="flex-1 text-left w-full">
                {/* Stage 1: Station Tag & Active Status */}
                <GlitchReveal revealed={scrollStage >= 1}>
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                      {dict.hud.transit.wp00}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 text-xs font-mono text-emerald-300 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{dict.hero.statusBadge}</span>
                    </span>
                  </div>
                </GlitchReveal>

                {/* Main Name Heading */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-3 leading-none animate-glitch-assemble">
                  Miftakhul Ilmi<span className="text-cyan-400">.</span>
                </h1>

                {/* Stage 2: Core Role Badges */}
                <GlitchReveal revealed={scrollStage >= 2}>
                  <div className="text-base sm:text-lg md:text-xl font-semibold text-cyan-300 mb-6 flex flex-wrap items-center gap-2">
                    <span>{dict.hero.role1}</span>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <span className="text-gray-200">{dict.hero.role2}</span>
                  </div>
                </GlitchReveal>

                {/* Stage 3-5: High-Contrast Key Points Summary (One by One as You Scroll) */}
                <div className="space-y-3.5 mb-8 bg-white/[0.03] border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md">
                  {dict.hero.highlights.map((hl, idx) => (
                    <GlitchReveal key={idx} revealed={scrollStage >= 3 + idx}>
                      <div className="flex items-start gap-3">
                        <span className="text-xl shrink-0 mt-0.5">{hl.icon}</span>
                        <div>
                          <div className="text-sm sm:text-base font-bold text-white">{hl.title}</div>
                          <div className="text-xs sm:text-sm text-gray-200 font-normal leading-relaxed">
                            {hl.desc}
                          </div>
                        </div>
                      </div>
                    </GlitchReveal>
                  ))}
                </div>

                {/* Stage 6: Tactical Action Buttons */}
                <GlitchReveal revealed={scrollStage >= 6}>
                  <div className="relative flex flex-wrap items-center gap-3">
                    <a
                      href="#academy"
                      className="bg-white text-black hover:bg-cyan-300 px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.25)] flex items-center gap-2"
                    >
                      <span>{dict.hero.btnWork}</span>
                      <span>↓</span>
                    </a>

                    {/* CV Download Selector */}
                    <div ref={cvMenuRef} className="sm:relative">
                      <button
                        type="button"
                        onClick={() => setCvMenuOpen((prev) => !prev)}
                        aria-expanded={cvMenuOpen}
                        className="bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-400/50 text-cyan-200 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all shadow-[0_0_15px_rgba(34,211,238,0.15)] flex items-center gap-2"
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
                            className="absolute left-0 bottom-full mb-2 sm:bottom-auto sm:top-full sm:mt-2 w-[min(18rem,100%)] sm:w-72 bg-[#0c0d14] border border-white/20 rounded-xl p-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] z-50 text-left"
                          >
                            <div className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider text-cyan-400 border-b border-white/10 mb-1 font-bold">
                              {dict.hero.cvSelectTitle}
                            </div>
                            {cvOptions.map((opt) => (
                              <a
                                key={opt.code}
                                href={opt.file}
                                download={opt.filename}
                                onClick={() => setCvMenuOpen(false)}
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-gray-100 hover:text-white hover:bg-cyan-500/20 transition-colors"
                              >
                                <span className="flex items-center gap-2.5">
                                  <span className="text-base">{opt.flag}</span>
                                  <span className="font-semibold">{opt.label}</span>
                                </span>
                                <span className="text-xs font-mono text-cyan-300 font-bold">PDF</span>
                              </a>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <a
                      href="#terminus"
                      className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 rounded-xl font-medium text-sm transition-colors"
                    >
                      {dict.hero.btnContact}
                    </a>
                  </div>
                </GlitchReveal>
              </div>

              {/* Right Column: Glitch Photo Avatar Component (Grayscale at Stage 2, Color Glitch at Stage 7) */}
              <GlitchReveal revealed={scrollStage >= 2} className="flex flex-col items-center shrink-0 w-full sm:w-auto">
                <GlitchAvatar shouldRevealColor={scrollStage >= 7} />
                <GlitchReveal revealed={scrollStage >= 2}>
                  <div className="mt-3 flex items-center gap-2 text-xs font-mono text-gray-300">
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${scrollStage >= 7 ? "bg-emerald-400" : "bg-cyan-400"}`} />
                    <span>{scrollStage >= 7 ? dict.hud.transit.scrollPrompt : dict.hero.scrollRevealHint}</span>
                  </div>
                </GlitchReveal>
              </GlitchReveal>

            </div>
          )}
          </div>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 01 // ACADEMY (SMP Pancasila — Coding Education)
            Position: Wide Left-Leaning (Asymmetric Node 1)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="academy" className="relative pl-10 sm:pl-14 lg:pl-0">
          <div id="expertise" className="absolute -top-24 pointer-events-none" />
          
          <GlitchReveal className="w-full lg:w-[75%] xl:w-[70%] lg:mr-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <AnimeShape type="circuit-node" size={28} color="#38bdf8" className="shrink-0 lg:-ml-1" />
              <span className="text-sm sm:text-base font-mono tracking-widest text-cyan-300 uppercase font-bold">
                {dict.hud.transit.wp01}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-emerald-400 font-semibold">{dict.sections.academy.orgBadge}</span>
            </div>

            {/* Expansive Card Container */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.03] border border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all"
            >
              <HudCorner />

              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                <div>
                  <div className="inline-block px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-700/60 text-xs font-mono text-emerald-300 font-bold mb-3">
                    {dict.sections.academy.activeBadge}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-3">
                    {dict.sections.academy.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-100 leading-relaxed font-normal max-w-2xl">
                    {dict.sections.academy.desc}
                  </p>
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                  {dict.sections.academy.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-mono ${
                        idx === dict.sections.academy.tags.length - 1
                          ? "bg-cyan-500/20 border border-cyan-400/40 font-semibold text-cyan-200"
                          : "bg-white/10 border border-white/20 font-medium text-white"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Real Teaching Module Screenshot */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setActiveProjectModal(3)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveProjectModal(3);
                  }
                }}
                className="touch-interactive group/mod relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black/60 border border-white/15 hover:border-cyan-400/60 cursor-pointer transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Image
                  src="/images/project-4.png"
                  alt={dict.sections.academy.docTitle}
                  fill
                  className="object-cover opacity-85 group-hover/mod:opacity-100 group-hover/mod:scale-[1.02] transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex items-end p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-2">
                    <div>
                      <div className="text-xs font-mono text-cyan-300 uppercase font-semibold">
                        {dict.sections.academy.docLabel}
                      </div>
                      <div className="text-base sm:text-lg md:text-xl font-bold text-white">
                        {dict.sections.academy.docTitle}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold group-hover/mod:translate-x-1 transition-transform">
                      {dict.sections.academy.docAction}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </GlitchReveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 02 // STUDIO (Multilingual Localization & Video Production)
            Position: Far-Right Offset (Asymmetric Node 2)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="projects" className="relative pl-7 sm:pl-11 lg:pl-0">
          <GlitchReveal className="w-full lg:w-[85%] xl:w-[80%] lg:ml-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <AnimeShape type="target" size={28} color="#22d3ee" className="shrink-0 lg:-ml-1" />
              <span className="text-sm sm:text-base font-mono tracking-widest text-cyan-300 uppercase font-bold">
                {dict.hud.transit.wp02}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-300 font-semibold">{dict.sections.studio.subBadge}</span>
            </div>

            {/* Asymmetric Dual Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Work A: Subtitling */}
              <motion.div
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6 }}
                onClick={() => setActiveProjectModal(0)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveProjectModal(0);
                  }
                }}
                className="touch-interactive group relative bg-white/[0.03] border border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] cursor-pointer transition-all flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <HudCorner />

                <div>
                  <div className="text-xs font-mono text-cyan-300 uppercase font-bold mb-2">
                    {dict.sections.studio.card1Badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {dict.sections.studio.card1Title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed mb-6">
                    {dict.sections.studio.card1Desc}
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                  <Image
                    src="/images/project-1.webp"
                    alt="Subtitle Edit Project Piece of Safe"
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-gray-300 pt-3 border-t border-white/10">
                  <span className="font-medium text-gray-200">Subtitle Edit • Aegisub</span>
                  <span className="text-cyan-300 font-bold group-hover:translate-x-1 transition-transform">{dict.sections.studio.viewDetail}</span>
                </div>
              </motion.div>

              {/* Work B: Video Editing */}
              <motion.div
                role="button"
                tabIndex={0}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                onClick={() => setActiveProjectModal(1)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveProjectModal(1);
                  }
                }}
                className="touch-interactive group relative bg-white/[0.03] border border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 md:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] cursor-pointer transition-all flex flex-col justify-between lg:translate-y-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <HudCorner />

                <div>
                  <div className="text-xs font-mono text-cyan-300 uppercase font-bold mb-2">
                    {dict.sections.studio.card2Badge}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {dict.sections.studio.card2Title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed mb-6">
                    {dict.sections.studio.card2Desc}
                  </p>
                </div>

                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-black mb-4 border border-white/10">
                  <Image
                    src="/images/project-2.png"
                    alt="CapCut Pro Dual Screen Setup"
                    fill
                    className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-gray-300 pt-3 border-t border-white/10">
                  <span className="font-medium text-gray-200">CapCut Pro • OBS Studio</span>
                  <span className="text-cyan-300 font-bold group-hover:translate-x-1 transition-transform">{dict.sections.studio.viewDetail}</span>
                </div>
              </motion.div>

            </div>

          </GlitchReveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 03 // GATEWAY (Network Router & Workstation Rig Lab)
            Position: Center-Left Diagonal (Asymmetric Node 3)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="gateway" className="relative pl-7 sm:pl-11 lg:pl-0">
          <GlitchReveal className="w-full lg:w-[78%] xl:w-[72%] lg:ml-[6%]">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <AnimeShape type="circuit-node" size={28} color="#34d399" className="shrink-0 lg:-ml-1" />
              <span className="text-sm sm:text-base font-mono tracking-widest text-cyan-300 uppercase font-bold">
                {dict.hud.transit.wp03}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-300 font-semibold">{dict.sections.gateway.subBadge}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.03] border border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all"
            >
              <HudCorner />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Router Status Screenshot */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveProjectModal(2)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveProjectModal(2);
                    }
                  }}
                  className="touch-interactive lg:col-span-7 group/net relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/15 hover:border-cyan-400/60 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Image
                    src="/images/project-3.png"
                    alt="OpenWrt LuCI Router Status"
                    fill
                    className="object-cover opacity-85 group-hover/net:opacity-100 group-hover/net:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold">
                      {dict.sections.gateway.imgLabel}
                    </span>
                  </div>
                </div>

                {/* Right: Technical Specs & Rig Details */}
                <div className="lg:col-span-5">
                  <div className="text-xs font-mono text-cyan-300 mb-1 font-bold">
                    {dict.sections.gateway.eyebrow}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
                    {dict.sections.gateway.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-100 font-normal leading-relaxed mb-6">
                    {dict.sections.gateway.desc}
                  </p>

                  <div className="space-y-2.5 text-xs sm:text-sm font-mono mb-6">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-gray-300 font-medium">{dict.sections.gateway.gatewayLabel}</span>
                      <span className="text-cyan-300 font-bold">{dict.sections.gateway.gatewayVal}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-black/60 border border-white/10">
                      <span className="text-gray-300 font-medium">{dict.sections.gateway.rigLabel}</span>
                      <span className="text-white font-bold">{dict.sections.gateway.rigVal}</span>
                    </div>
                  </div>

                  {/* Quick Launcher Triggers */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={triggerMusic}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-500/25 border border-white/20 text-xs sm:text-sm font-mono font-semibold text-gray-100 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>🎵</span>
                      <span>{dict.sections.gateway.btnAudio}</span>
                    </button>
                    <button
                      type="button"
                      onClick={triggerTerminal}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/30 border border-cyan-400/40 text-xs sm:text-sm font-mono font-semibold text-cyan-300 hover:text-cyan-200 transition-colors flex items-center gap-2"
                    >
                      <span>&gt;_</span>
                      <span>{dict.sections.gateway.btnTerminal}</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>

          </GlitchReveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 04 // LOGS (Career Chronology & Teaching History)
            Position: Expansive Asymmetric Grid (Asymmetric Node 4)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="experience" className="relative pl-10 sm:pl-14 lg:pl-0">
          <GlitchReveal className="w-full lg:w-[88%] xl:w-[84%] lg:mx-auto">
            
            {/* Station Header Node */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
              <AnimeShape type="radar" size={28} color="#22d3ee" className="shrink-0 lg:-ml-1" />
              <span className="text-sm sm:text-base font-mono tracking-widest text-cyan-300 uppercase font-bold">
                {dict.hud.transit.wp04}
              </span>
              <span className="text-white/20">/</span>
              <span className="text-xs sm:text-sm font-mono text-gray-300 font-semibold">{dict.experience.title}</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="relative bg-white/[0.03] border border-white/15 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all"
            >
              <HudCorner />

              {/* 2-Column Responsive Staggered Timeline Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dict.experience.jobs.map((job, index) => {
                  const isCurrent = index === 0;

                  return (
                    <GlitchReveal
                      key={index}
                      delay={index * 110}
                      className="relative p-5 sm:p-6 rounded-xl bg-white/[0.02] border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                          <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {job.title}
                          </h4>
                          <span className="text-xs font-mono px-2.5 py-1 rounded bg-white/10 border border-white/20 text-gray-100 font-semibold">
                            {job.date}
                          </span>
                        </div>

                        <div className="text-xs sm:text-sm font-mono text-cyan-300 font-semibold mb-3 flex items-center gap-2">
                          <span>{job.company}</span>
                          {isCurrent && (
                            <span className="text-[10px] bg-emerald-950/70 text-emerald-300 border border-emerald-700/60 px-2 py-0.5 rounded font-mono font-bold">
                              {dict.sections.experience.activeNow}
                            </span>
                          )}
                        </div>

                        <p className="text-sm sm:text-base text-gray-100 leading-relaxed font-normal">
                          {job.desc}
                        </p>
                      </div>
                    </GlitchReveal>
                  );
                })}
              </div>
            </motion.div>

          </GlitchReveal>
        </section>


        {/* ════════════════════════════════════════════════════════════════════════
            WAYPOINT 05 // TERMINUS (Hubungi Saya — Clean & Balanced Layout)
        ════════════════════════════════════════════════════════════════════════ */}
        <section id="terminus" className="relative pt-4 sm:pt-8">
          <div id="contact" className="absolute -top-24 pointer-events-none" />

          <GlitchReveal className="w-full max-w-6xl mx-auto">
            {/* Clean Section Header */}
            <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-700/50 text-xs font-mono tracking-widest text-emerald-300 uppercase font-bold">
                  {dict.hud.transit.wp05}
                </span>
                <AnimeShape type="beacon" size={32} color="#34d399" />
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-3">
                {dict.contact.title}
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-200 font-normal max-w-xl mx-auto">
                {dict.contact.desc}
              </p>
            </div>

            {/* Balanced 12-Column Contact Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              
              {/* Left Column (5 cols): Direct Contact Channels */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                
                {/* 1-Click Copy Email Card */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={copyToClipboard}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      copyToClipboard();
                    }
                  }}
                  className="touch-interactive relative cursor-pointer bg-white/[0.03] hover:bg-white/[0.06] border border-white/15 hover:border-cyan-400/50 rounded-2xl p-6 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <HudCorner />

                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-bold">
                      {dict.contact.copyTitle}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-xs font-mono text-cyan-200 font-semibold group-hover:bg-cyan-500/25 transition-colors">
                      {copied ? "✓" : "📋"}
                    </span>
                  </div>

                  <div className="text-lg sm:text-xl font-mono font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {myEmail}
                  </div>

                  <p className="mt-2 text-xs sm:text-sm text-gray-300">
                    {copied ? (
                      <span className="text-emerald-400 font-semibold">{dict.contact.copiedText}</span>
                    ) : (
                      <span>{dict.contact.copyText}</span>
                    )}
                  </p>
                </div>

                {/* Upwork & Location Split */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 flex-1">
                  <a
                    href={upworkLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="touch-interactive relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] hover:bg-[#14a800]/15 border border-white/15 hover:border-[#14a800]/60 transition-all group flex flex-col justify-center"
                  >
                    <div className="text-xs font-mono text-gray-300 uppercase mb-1.5 font-semibold">
                      {dict.contact.freelance}
                    </div>
                    <div className="text-xl font-bold text-white group-hover:text-[#14a800] transition-colors flex items-center justify-between">
                      <span>Upwork</span>
                      <span className="text-sm opacity-75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {dict.sections.contactExtra.upworkSub}
                    </div>
                  </a>

                  <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/15 flex flex-col justify-center">
                    <div className="text-xs font-mono text-gray-300 uppercase mb-1.5 font-semibold">
                      {dict.contact.location}
                    </div>
                    <div className="text-xl font-bold text-white">
                      Surabaya, ID
                    </div>
                    <div className="text-xs text-emerald-400 font-mono font-semibold mt-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{dict.sections.contactExtra.remoteReady}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column (7 cols): Direct Mail Form */}
              <div className="lg:col-span-7 relative bg-white/[0.03] border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_45px_rgba(0,0,0,0.7)]">
                <HudCorner />

                <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
                  <span className="text-sm font-bold text-white tracking-wide">
                    {dict.contact.quickMessage}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 border border-cyan-400/30 px-2.5 py-0.5 rounded-md">
                    {dict.sections.contactExtra.formTag}
                  </span>
                </div>

                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-xs sm:text-sm font-mono text-gray-200 uppercase font-semibold mb-1.5">
                      {dict.sections.contactExtra.senderLabel}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder={dict.contact.emailPlaceholder}
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      className="w-full bg-black/70 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 outline-none font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs sm:text-sm font-mono text-gray-200 uppercase font-semibold mb-1.5">
                      {dict.sections.contactExtra.msgLabel}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder={dict.contact.msgPlaceholder}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-black/70 border border-white/15 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm sm:text-base text-white placeholder-gray-400 outline-none font-sans transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    whileHover={tier === "high" ? { scale: 1.01 } : undefined}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-black hover:bg-cyan-300 font-bold text-sm tracking-wider uppercase transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    {dict.contact.btnSend}
                  </motion.button>
                </form>
              </div>

            </div>
          </GlitchReveal>
        </section>

        {/* ── UNIFIED FLOATING DOCK (Floats bottom-right while scrolling, locks right above footer) ── */}
        <FloatingDock />

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

    </div>
  );
}
