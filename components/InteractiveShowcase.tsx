"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import { useLanguage } from "./LanguageProvider";

function subscribePointer(callback: () => void) {
  const media = window.matchMedia("(pointer: coarse)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getPointerSnapshot() {
  return window.matchMedia("(pointer: coarse)").matches;
}

function getServerPointerSnapshot() {
  return true;
}

export default function InteractiveShowcase() {
  const { dict } = useLanguage();
  const t = dict.showcase;

  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isMobile = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    handleMove(e.touches[0].clientX);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging || !isMobile) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="relative z-10 max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
          {t.title}
        </h2>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onTouchMove={onTouchMove}
        className="relative w-full aspect-video md:aspect-[21/9] max-h-[500px] rounded-3xl overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] select-none cursor-ew-resize bg-black"
      >
        {/* Layer 1: After (Graded & Subtitled with rich visual) */}
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter saturate-125 contrast-110 brightness-105"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>

          {/* Subtitle Demonstration Overlay */}
          <div className="absolute bottom-6 md:bottom-12 inset-x-0 flex justify-center z-20 pointer-events-none px-4">
            <span className="bg-black/70 backdrop-blur-md border border-cyan-400/40 text-cyan-300 px-4 py-2 rounded-xl text-xs md:text-base font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] tracking-wide">
              「 Setiap potongan visual memiliki irama dan maknanya sendiri. 」
            </span>
          </div>

          <div className="absolute top-4 right-4 z-20 bg-cyan-500/20 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {t.afterLabel}
          </div>
        </div>

        {/* Layer 2: Before (Raw Footage with desaturation & flat look) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover filter grayscale contrast-75 brightness-90"
          >
            <source src="/videos/showreel.mp4" type="video/mp4" />
          </video>

          <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-md border border-white/20 text-gray-300 text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
            {t.beforeLabel}
          </div>
        </div>

        {/* Vertical Divider Line with handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-0.5 h-full bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,1)]" />
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white text-black font-bold flex items-center justify-center shadow-2xl border-2 border-cyan-400 text-xs">
            ⇄
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-gray-500 font-mono mt-4">
        {t.dragHint}
      </p>
    </section>
  );
}
