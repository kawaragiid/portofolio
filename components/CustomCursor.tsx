"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePerformance } from "./PerformanceProvider";

export default function CustomCursor() {
  const { tier, hasMouse } = usePerformance();
  const isDisabled = !hasMouse || tier === "low";

  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Exact precision point spring
  const dotSpring = { stiffness: 800, damping: 40, mass: 0.1 };
  const smoothDotX = useSpring(mouseX, dotSpring);
  const smoothDotY = useSpring(mouseY, dotSpring);

  // Smooth luxury trailing ring spring
  const ringSpring = { stiffness: 320, damping: 28, mass: 0.25 };
  const smoothRingX = useSpring(mouseX, ringSpring);
  const smoothRingY = useSpring(mouseY, ringSpring);

  useEffect(() => {
    if (isDisabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive =
        target.tagName?.toLowerCase() === "button" ||
        target.tagName?.toLowerCase() === "a" ||
        target.tagName?.toLowerCase() === "input" ||
        target.tagName?.toLowerCase() === "textarea" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.getAttribute("role") === "button";

      setIsHovering(Boolean(isInteractive));
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isDisabled, mouseX, mouseY]);

  useEffect(() => {
    if (isDisabled || !isVisible) {
      delete document.documentElement.dataset.cursorActive;
    } else {
      document.documentElement.dataset.cursorActive = "true";
    }
    return () => {
      delete document.documentElement.dataset.cursorActive;
    };
  }, [isDisabled, isVisible]);

  if (isDisabled || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999999] overflow-hidden select-none">
      
      {/* ── Smooth Fluid Trailing Ring (Minimalist Inverting Aura) ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 48 : 28,
          height: isHovering ? 48 : 28,
          backgroundColor: isHovering ? "rgba(34, 211, 238, 0.12)" : "rgba(255, 255, 255, 0.02)",
          borderColor: isHovering ? "rgba(34, 211, 238, 0.6)" : "rgba(255, 255, 255, 0.35)",
          borderWidth: isHovering ? "1.5px" : "1px",
          scale: isMouseDown ? 0.85 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* ── Precision Center Dot ── */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: smoothDotX,
          y: smoothDotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 6 : 5,
          height: isHovering ? 6 : 5,
          backgroundColor: isHovering ? "#22d3ee" : "#ffffff",
          scale: isMouseDown ? 0.6 : 1,
          boxShadow: isHovering ? "0 0 10px rgba(34, 211, 238, 0.8)" : "0 0 4px rgba(255, 255, 255, 0.5)",
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
      />

    </div>
  );
}