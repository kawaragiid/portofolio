"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageProvider";
import TiltCard from "./TiltCard";
import HudCorner from "./HudCorner";

export default function Projects() {
  const { dict } = useLanguage();
  const t = dict.projects;
  const [activeProjectIndex, setActiveProjectIndex] = useState<number | null>(null);

  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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

  useEffect(() => {
    const handleClose = () => setActiveProjectIndex(null);
    window.addEventListener("close-all-modals", handleClose);
    return () => window.removeEventListener("close-all-modals", handleClose);
  }, []);

  const activeProject = activeProjectIndex !== null ? t.items[activeProjectIndex] : null;

  return (
    <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-1">
            <span>MODULE 02</span>
            <span>{"//"}</span>
            <span>SELECTED WORKS & ARTIFACTS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-white">
            {t.title}
          </h2>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm font-mono max-w-md">
          {t.subtitle}
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
        {t.items.map((item, index) => {
          // Asymmetric Bento spans for 12 columns
          const spanClass = index === 0 ? "lg:col-span-7" : index === 1 ? "lg:col-span-5" : index === 2 ? "lg:col-span-5" : "lg:col-span-7";

          return (
            <div key={item.id} className={`${spanClass} cursor-pointer`} onClick={() => setActiveProjectIndex(index)}>
              <TiltCard>
                <div className="group relative aspect-[16/10] sm:aspect-video lg:aspect-[16/10] bg-[#0c0d12] rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-400/50 shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-all duration-300">
                  <HudCorner color="text-cyan-400/60" />

                  {/* Top Bar with Badges */}
                  <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                    <span className="bg-black/80 backdrop-blur-md border border-cyan-500/30 px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-cyan-300">
                      {item.category}
                    </span>
                    <span className="bg-black/80 backdrop-blur-md border border-white/10 px-2 py-0.5 rounded text-[10px] font-mono text-gray-400">
                      PRJ // 0{index + 1}
                    </span>
                  </div>

                  {/* Image Preview */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 ease-out pointer-events-none"
                  />

                  {/* Bottom Gradient & Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 flex flex-col justify-end p-5 md:p-6 pointer-events-none">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 font-light mb-3">
                      {item.desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {item.tools.map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-gray-300"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* PROJECT LIGHTBOX MODAL */}
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
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="relative bg-[#0d0d14] border border-white/20 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9)] z-10 overflow-hidden"
              >
                <HudCorner color="text-cyan-400/80" />

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
                    className="p-2 md:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Content with Scroll */}
                <div className="p-4 md:p-8 space-y-6 overflow-y-auto overscroll-contain">
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                    <Image
                      src={activeProject.image}
                      alt={activeProject.title}
                      fill
                      className="object-contain bg-black"
                    />
                  </div>

                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base mb-2">
                      {t.summaryTitle}:
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
    </section>
  );
}