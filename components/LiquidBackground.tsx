"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function LiquidBackground() {
  // null = sedang mengecek, "low" = HP/Spek rendah, "high" = PC/Spek dewa
  const [performanceTier, setPerformanceTier] = useState<"high" | "low" | null>(null);

  useEffect(() => {
    const checkHardware = () => {
      // Deteksi jumlah core CPU (Minimal 8 core untuk efek penuh)
      const cores = navigator.hardwareConcurrency || 4;
      // Deteksi jumlah RAM (hanya jalan di browser berbasis Chromium/Android)
      // Gunakan tipe 'any' untuk menghindari error TypeScript karena deviceMemory belum standar
      const ram = (navigator as any).deviceMemory || 4; 
      
      // Deteksi layar HP. Semua layar di bawah 768px (termasuk S21+) otomatis masuk "low" 
      // agar baterai pengunjung tidak terkuras dan FPS tetap 60.
      const isMobile = window.innerWidth < 768;

      // Jika RAM di bawah 6GB, atau Core CPU 4 ke bawah, atau dibuka di HP -> Mode Ringan
      if (ram <= 4 || cores <= 4 || isMobile) {
        setPerformanceTier("low");
      } else {
        setPerformanceTier("high");
      }
    };

    checkHardware();
  }, []);

  // Jangan render apa-apa selama 1 milidetik pertama saat mengecek hardware
  if (!performanceTier) return null;

  // ==========================================
  // MODE RINGAN (Untuk S21+, Note 9, dan semua HP)
  // ==========================================
  if (performanceTier === "low") {
    return (
      <div className="fixed inset-0 z-0 bg-[#050505] pointer-events-none">
        {/* Menggunakan CSS Radial Gradient statis sebagai ganti efek Blur/WebGL yang berat. 
            Tampilannya 90% mirip aslinya, tapi 100x lipat lebih enteng di GPU HP. */}
        <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-[#050505]/0 to-transparent" />
        <div className="absolute bottom-[-10%] left-[-20%] w-[80%] h-[80%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#050505]/0 to-transparent" />
      </div>
    );
  }

  // ==========================================
  // MODE MAXIMAL (Untuk PC Gaming / Workstation)
  // ==========================================
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black will-change-transform">
      {/* Animasi Liquid Glass Mewah yang memakan banyak GPU */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/20 rounded-full blur-[100px] md:blur-[140px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -40, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/10 rounded-full blur-[100px] md:blur-[150px]"
      />
    </div>
  );
}