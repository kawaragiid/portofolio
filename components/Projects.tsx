"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import TiltCard from "./TiltCard";

export default function Projects() {
  const { dict } = useLanguage();
  const t = dict.projects;
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const images = [
    "/images/project-1.png",
    "/images/project-2.png",
    "/images/project-3.png"
  ];

  // Kunci scroll body saat modal video terbuka
  useEffect(() => {
    if (activeProjectIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [activeProjectIndex]);

  const activeProject = activeProjectIndex !== null ? t.items[activeProjectIndex] : null;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 perspective-1000">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md mb-3">
          {t.title}
        </h2>
        <p className="text-gray-400 text-sm md:text-base">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.items.map((item, index) => (
          <div key={item.id} onClick={() => setActiveProjectIndex(index)}>
            <TiltCard>
              <div className="group relative aspect-video bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/40 shadow-[0_15px_30px_rgba(0,0,0,0.6)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300">
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                  {item.category}
                </div>

                {/* Play Button Indicator */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none scale-75 group-hover:scale-100">
                  <div className="w-14 h-14 rounded-full bg-cyan-400/90 text-black flex items-center justify-center shadow-[0_0_30px_rgba(34,211,238,0.8)]">
                    <svg className="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent z-10 flex flex-col justify-end p-6 pointer-events-none">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-300">{item.desc}</p>
                </div>

                <Image
                  src={images[index]}
                  alt={item.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 ease-out pointer-events-none"
                />
              </div>
            </TiltCard>
          </div>
        ))}
      </div>

      {/* VIDEO PLAYER & CASE STUDY LIGHTBOX MODAL */}
      {isClient && createPortal(
        <AnimatePresence>
          {activeProject !== null && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center px-4 md:px-8 py-6 pointer-events-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProjectIndex(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative bg-[#0d0d0d]/95 backdrop-blur-3xl border border-white/20 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-[2rem] shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 md:p-6 bg-white/[0.03] border-b border-white/10 flex items-center justify-between shrink-0">
                  <div>
                    <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cyan-400">
                      {activeProject.category}
                    </span>
                    <h3 className="text-lg md:text-2xl font-bold text-white mt-0.5">
                      {activeProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveProjectIndex(null)}
                    className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content with Scroll */}
                <div className="p-4 md:p-8 space-y-6 overflow-y-auto overscroll-contain">
                  {/* Embedded Video Showcase Player */}
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                    <video
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={activeProject.video} type="video/mp4" />
                      Browser Anda tidak mendukung tag video.
                    </video>
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-2">
                      Ringkasan Produksi & Eksekusi:
                    </h4>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light">
                      {activeProject.details}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
                      {t.toolsUsed}:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {activeProject.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-mono text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white/[0.02] border-t border-white/10 flex justify-end shrink-0">
                  <button
                    onClick={() => setActiveProjectIndex(null)}
                    className="px-6 py-2 rounded-full bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors"
                  >
                    {t.modalClose}
                  </button>
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