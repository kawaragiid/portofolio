"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface GlitchAvatarProps {
  className?: string;
}

export default function GlitchAvatar({ className = "" }: GlitchAvatarProps) {
  // Phase: "grayscale" (initial) -> "glitching" (active on scroll) -> "color" (normal color revealed)
  const [phase, setPhase] = useState<"grayscale" | "glitching" | "color">("grayscale");
  const containerRef = useRef<HTMLDivElement>(null);
  const glitchTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasTriggeredRef = useRef(false);
  const isInViewRef = useRef(false);

  useEffect(() => {
    const triggerReveal = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setPhase("glitching");

      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
      glitchTimerRef.current = setTimeout(() => {
        setPhase("color");
      }, 650);
    };

    const checkTrigger = () => {
      const scrollY = window.scrollY;
      if (scrollY > 25 && isInViewRef.current) {
        triggerReveal();
      } else if (scrollY < 8) {
        hasTriggeredRef.current = false;
        setPhase("grayscale");
      }
    };

    const el = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting && window.scrollY > 25) {
          triggerReveal();
        }
      },
      { threshold: 0.25 }
    );

    if (el) observer.observe(el);

    window.addEventListener("scroll", checkTrigger, { passive: true });
    checkTrigger();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkTrigger);
      if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    };
  }, []);

  const triggerManualGlitch = () => {
    hasTriggeredRef.current = true;
    setPhase("glitching");
    if (glitchTimerRef.current) clearTimeout(glitchTimerRef.current);
    glitchTimerRef.current = setTimeout(() => {
      setPhase("color");
    }, 650);
  };

  const isColor = phase === "color";
  const isGlitching = phase === "glitching";

  return (
    <div
      ref={containerRef}
      role="button"
      tabIndex={0}
      onClick={triggerManualGlitch}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          triggerManualGlitch();
        }
      }}
      className={`relative inline-block select-none group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl ${className}`}
      title="Scroll untuk reveal warna / klik untuk efek glitch"
      aria-label="Foto Miftakhul Ilmi - klik atau tekan Enter untuk efek glitch"
    >
      {/* Ambient Backlight Glow */}
      <div
        className={`absolute -inset-2.5 rounded-3xl transition-all duration-700 blur-2xl pointer-events-none ${
          isColor
            ? "bg-cyan-500/30 opacity-100"
            : isGlitching
            ? "bg-red-500/40 opacity-100 animate-pulse"
            : "bg-white/5 opacity-30"
        }`}
      />

      {/* Frame Container */}
      <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 aspect-[3/4] rounded-2xl overflow-hidden border border-white/20 bg-[#08090d] shadow-[0_20px_50px_rgba(0,0,0,0.9)] transition-colors duration-500 group-hover:border-cyan-400/60">
        
        {/* Base Photo Image with Filter Transitions */}
        <div
          className={`relative w-full h-full transition-all duration-700 ease-out ${
            isColor
              ? "grayscale-0 brightness-100 contrast-100 scale-100"
              : isGlitching
              ? "grayscale-0 contrast-150 brightness-115 scale-[1.03]"
              : "grayscale brightness-90 contrast-125 scale-100"
          }`}
        >
          <Image
            src="/images/avatar-transit.jpg"
            alt="Miftakhul Ilmi"
            fill
            sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 320px"
            priority
            className="object-cover object-top"
          />
        </div>

        {/* Dynamic Glitch Chromatic Aberration Layers (Enabled on ALL devices including smartphones) */}
        {isGlitching && (
          <>
            {/* Cyan Glitch Slice */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 animate-glitch-cyan z-20"
              style={{
                clipPath: "polygon(0 15%, 100% 15%, 100% 38%, 0 38%)",
                transform: "translate(-5px, -2px)",
              }}
            >
              <Image
                src="/images/avatar-transit.jpg"
                alt=""
                fill
                sizes="320px"
                className="object-cover object-top hue-rotate-90 saturate-200"
              />
            </div>

            {/* Red / Magenta Glitch Slice */}
            <div
              className="absolute inset-0 pointer-events-none mix-blend-screen opacity-90 animate-glitch-red z-20"
              style={{
                clipPath: "polygon(0 52%, 100% 52%, 100% 74%, 0 74%)",
                transform: "translate(5px, 2px)",
              }}
            >
              <Image
                src="/images/avatar-transit.jpg"
                alt=""
                fill
                sizes="320px"
                className="object-cover object-top hue-rotate-270 saturate-200"
              />
            </div>

            {/* Scanline CRT overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.6)_3px)] z-20" />
            <div className="absolute inset-0 pointer-events-none bg-cyan-400/20 mix-blend-overlay animate-pulse z-20" />
          </>
        )}

        {/* Minimalist HUD Corner Brackets */}
        <div className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
        <div className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 pointer-events-none z-30" />
        <div className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 pointer-events-none z-30" />
        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 pointer-events-none z-30" />

        {/* Status Pill Badge */}
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 backdrop-blur-md text-[10px] font-mono tracking-wider text-cyan-300 z-30 flex items-center gap-1.5 shadow-md">
          <span className={`w-1.5 h-1.5 rounded-full ${isColor ? "bg-emerald-400 animate-pulse" : isGlitching ? "bg-red-400 animate-ping" : "bg-gray-400"}`} />
          <span>{isColor ? "ONLINE" : isGlitching ? "GLITCH SYNC" : "MONO"}</span>
        </div>

        {/* Scroll / Color Status Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-black/80 border border-white/20 backdrop-blur-md text-[10px] font-mono tracking-wider text-gray-200 z-30 shadow-md">
          {isColor ? "NORMAL COLOR" : "GULIR KE BAWAH ↓"}
        </div>
      </div>
    </div>
  );
}
