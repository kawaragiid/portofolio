"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default anggap mobile dulu biar aman

  // Cek secara presisi apakah pakai layar sentuh (HP) atau Mouse (Desktop)
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // --- LOGIKA MOUSE (Hanya jalan di Desktop/Laptop) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      // Jika di HP, matikan transform 3D agar scroll tidak ngelag. Jika di PC, nyalakan 3D.
      style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      
      // Animasi Hover (PC) membesar ke 1.05. 
      animate={{ scale: isHovered && !isMobile ? 1.05 : 1 }}
      
      // Animasi Sentuh (HP) membal ke dalam ala Apple App Store
      whileTap={isMobile ? { scale: 0.95 } : { scale: 1 }}
      
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="tilt-card w-full h-full relative cursor-pointer"
    >
      <div style={isMobile ? {} : { transform: "translateZ(30px)" }} className="w-full h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}