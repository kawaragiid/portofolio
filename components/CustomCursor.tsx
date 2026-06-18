"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Matikan custom cursor jika diakses dari layar sentuh (HP)
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Deteksi apakah kursor sedang menyentuh elemen yang bisa diklik (tombol/link/kartu)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'button' || 
        target.tagName.toLowerCase() === 'a' || 
        target.closest('button') || 
        target.closest('a') ||
        target.closest('.cursor-pointer') // Mendeteksi kartu keahlianmu
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Lingkaran Luar (Liquid Glass yang mengikuti dengan gaya pegas) */}
      {/* Kunci ada di z-[9999999] agar selalu berada di atas Portal Modal */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400/50 bg-cyan-400/10 backdrop-blur-sm pointer-events-none z-[9999999]"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
          scale: isHovering ? 1.5 : 1, // Membesar saat menyentuh tombol
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
      />
      
      {/* Titik Inti (Mengikuti pergerakan mouse secara instan/presisi) */}
      <div 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyan-400 pointer-events-none z-[9999999]"
        style={{
          transform: `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`,
          // Efek menyala saat klik
          boxShadow: isHovering ? "0 0 10px 2px rgba(34, 211, 238, 0.8)" : "none",
          transition: "box-shadow 0.2s ease"
        }}
      />
    </>
  );
}