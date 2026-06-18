"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Damping dinaikkan agar efek pegasnya lebih kuat meredam getaran tangan di HP
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // --- LOGIKA GYROSCOPE YANG DIPERHALUS ---
  useEffect(() => {
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;

      let rawGamma = e.gamma; // Miring kiri-kanan
      let rawBeta = e.beta;   // Miring depan-belakang

      // 1. Batasi kemiringan kiri-kanan maksimal 30 derajat saja agar tidak terbalik
      const clampedGamma = Math.max(-30, Math.min(30, rawGamma));
      
      // 2. Asumsikan HP dipegang santai di sudut 45 derajat. 
      // Kita batasi rentang geraknya antara 15 sampai 75 derajat saja.
      const clampedBeta = Math.max(15, Math.min(75, rawBeta));
      const adjustedBeta = clampedBeta - 45;

      // 3. Normalisasi ke rentang -0.5 sampai 0.5. 
      // Angka pembagi dibesarkan (60) agar perubahannya lebih lambat dan halus.
      x.set(clampedGamma / 60);
      y.set(adjustedBeta / 60);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [x, y]);

  // --- LOGIKA MOUSE (DESKTOP) TETAP SAMA ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="tilt-card w-full h-full relative cursor-pointer"
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}