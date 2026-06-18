"use client"; // Wajib untuk menjalankan animasi di browser

import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function FadeUp({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Posisi awal: transparan dan turun 30px
      whileInView={{ opacity: 1, y: 0 }} // Posisi akhir saat terlihat di layar
      viewport={{ once: true, amount: 0.1 }} // Animasi jalan sekali saat di-scroll
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }} // Durasi dan kehalusan
    >
      {children}
    </motion.div>
  );
}