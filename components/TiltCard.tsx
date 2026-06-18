"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // State untuk melacak apakah pengguna memakai HP dan sudah memberi izin Gyroscope
  const [isMobile, setIsMobile] = useState(false);
  const [gyroEnabled, setGyroEnabled] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  // Cek apakah perangkat adalah mobile saat pertama render
  useEffect(() => {
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // --- LOGIKA GYROSCOPE (Berjalan HANYA jika sudah diizinkan) ---
  useEffect(() => {
    if (!isMobile || !gyroEnabled) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma === null || e.beta === null) return;

      const clampedGamma = Math.max(-30, Math.min(30, e.gamma));
      const clampedBeta = Math.max(15, Math.min(75, e.beta));
      const adjustedBeta = clampedBeta - 45;

      x.set(clampedGamma / 60);
      y.set(adjustedBeta / 60);
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [isMobile, gyroEnabled, x, y]);

  // --- FUNGSI MEMINTA IZIN SENSOR KE BROWSER ---
  const enableGyro = async () => {
    // Pengecekan khusus untuk iOS/Safari yang butuh metode requestPermission
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        if (permission === 'granted') {
          setGyroEnabled(true);
        } else {
          alert("Akses sensor 3D ditolak oleh browser.");
        }
      } catch (error) {
        console.error("Gagal meminta izin:", error);
      }
    } else {
      // Untuk Android / Chrome yang tidak butuh fungsi requestPermission
      setGyroEnabled(true);
    }
  };

  // --- LOGIKA MOUSE (DESKTOP) ---
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      animate={{ scale: isHovered && !isMobile ? 1.05 : 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="tilt-card w-full h-full relative cursor-pointer"
    >
      {/* TAMPILAN TOMBOL "TAP TO ENABLE" KHUSUS MOBILE */}
      {isMobile && !gyroEnabled && (
        <div 
          onClick={enableGyro}
          className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-3xl"
        >
          <motion.span 
            whileTap={{ scale: 0.9 }}
            className="text-white text-xs tracking-widest uppercase font-bold border border-white/20 px-6 py-3 rounded-full shadow-lg bg-white/10"
          >
            Aktifkan 3D
          </motion.span>
        </div>
      )}

      {/* Konten Asli Kartu */}
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full relative z-10">
        {children}
      </div>
    </motion.div>
  );
}