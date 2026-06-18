"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Nilai pergerakan X dan Y (berlaku untuk Mouse dan Gyroscope)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mesin Pegas (Spring) untuk pergerakan mulus
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  // Batas rotasi maksimal 15 derajat
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // --- LOGIKA GYROSCOPE (MOBILE) ---
  useEffect(() => {
    // Cek apakah perangkat menggunakan layar sentuh/mobile
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;

      // Gamma: miring kiri-kanan (-90 hingga 90)
      let rawGamma = e.gamma;
      // Beta: miring depan-belakang (-180 hingga 180). Sudut baca normal biasanya 45 derajat
      let rawBeta = e.beta;

      // Batasi kemiringan agar rotasi 3D tidak kebablasan sampai terbalik
      rawGamma = Math.max(-45, Math.min(45, rawGamma));
      
      // Normalisasi beta dengan asumsi kita memegang HP di sudut 45 derajat
      let adjustedBeta = rawBeta - 45;
      adjustedBeta = Math.max(-45, Math.min(45, adjustedBeta));

      // Konversi ke skala -0.5 sampai 0.5 untuk mesin transform
      x.set(rawGamma / 90);
      y.set(adjustedBeta / 90);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [x, y]);

  // --- LOGIKA MOUSE (DESKTOP) ---
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Matikan efek mouse jika digeser dari layar sentuh HP
    if (window.matchMedia("(pointer: coarse)").matches) return;

    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
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
      // Membaca rotasi dari kombinasi Spring Gyro & Mouse
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      // Zoom in (scale) hanya berlaku saat di-hover pakai Mouse (Desktop)
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