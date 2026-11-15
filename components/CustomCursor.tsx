"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePerformance } from "./PerformanceProvider";

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

export default function CustomCursor() {
  const { tier } = usePerformance();
  const isMobile = useSyncExternalStore(
    subscribePointer,
    getPointerSnapshot,
    getServerPointerSnapshot
  );

  const isDisabled = isMobile || tier === "low";

  const [isHovering, setIsHovering] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string>("TARGET");
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth Spring Lerp for Precision Tracking
  const springConfig = { stiffness: 450, damping: 30, mass: 0.15 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Outer Reticle with slightly softer spring for dynamic trailing feel
  const outerSpringConfig = { stiffness: 280, damping: 24, mass: 0.3 };
  const outerX = useSpring(mouseX, outerSpringConfig);
  const outerY = useSpring(mouseY, outerSpringConfig);

  useEffect(() => {
    if (isDisabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const clickable =
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      if (clickable) {
        setIsHovering(true);
        const ariaLabel = target.getAttribute("aria-label") || target.innerText?.slice(0, 12);
        setHoverLabel(ariaLabel && ariaLabel.trim().length > 0 ? "LOCK // " + ariaLabel.trim().toUpperCase() : "LOCK // TARGET");
      } else {
        setIsHovering(false);
        setHoverLabel("SCAN");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDisabled, mouseX, mouseY]);

  if (isDisabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999999] overflow-hidden">
      
      {/* ── Outer Vision Reticle Brackets ── */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.4 : 1,
          rotate: isHovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {/* 4 Corner HUD Brackets */}
        <span className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 transition-colors duration-200 ${isHovering ? "border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "border-cyan-500/40"}`} />
        <span className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 transition-colors duration-200 ${isHovering ? "border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "border-cyan-500/40"}`} />
        <span className={`absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 transition-colors duration-200 ${isHovering ? "border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "border-cyan-500/40"}`} />
        <span className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 transition-colors duration-200 ${isHovering ? "border-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" : "border-cyan-500/40"}`} />
      </motion.div>

      {/* ── Precision Center Dot / Cross ── */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none flex items-center justify-center"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className={`rounded-full transition-all duration-150 ${isHovering ? "w-2 h-2 bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,1)]" : "w-1.5 h-1.5 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]"}`} />
        
        {/* Fine crosshair lines */}
        <div className="absolute w-4 h-[1px] bg-cyan-400/30" />
        <div className="absolute h-4 w-[1px] bg-cyan-400/30" />

        {/* Tactical Hover Readout Badge */}
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, x: 8, scale: 0.8 }}
            animate={{ opacity: 1, x: 18, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute left-0 top-0 whitespace-nowrap bg-black/85 backdrop-blur-md border border-cyan-400/40 px-2 py-0.5 rounded text-[8px] font-mono text-cyan-300 tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.3)] pointer-events-none"
          >
            {hoverLabel}
          </motion.div>
        )}
      </motion.div>

    </div>
  );
}