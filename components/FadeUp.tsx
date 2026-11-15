"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { usePerformance } from "./PerformanceProvider";

export default function FadeUp({ 
  children, 
  delay = 0 
}: { 
  children: ReactNode; 
  delay?: number 
}) {
  const { tier } = usePerformance();

  if (tier === "low") {
    return <div>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}