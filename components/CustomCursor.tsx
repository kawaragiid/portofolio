"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest("a, button, .tilt-card, .cursor-pointer"));
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[10000] pointer-events-none flex items-center justify-center rounded-full"
      animate={{
        x: mousePosition.x - (isHovered ? 24 : 8),
        y: mousePosition.y - (isHovered ? 24 : 8),
        width: isHovered ? 48 : 16,
        height: isHovered ? 48 : 16,
        backgroundColor: isHovered ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.6)",
        backdropFilter: isHovered ? "blur(4px)" : "blur(0px)",
        border: isHovered ? "1px solid rgba(255,255,255,0.4)" : "0px solid rgba(255,255,255,0)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25, mass: 0.1 }}
    >
      <motion.div 
        className="bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        animate={{ width: isHovered ? 0 : 6, height: isHovered ? 0 : 6, opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}