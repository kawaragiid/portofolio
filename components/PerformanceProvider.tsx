"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";
import { MotionConfig } from "framer-motion";

export type PerformanceTier = "high" | "low";

interface NavigatorExtended extends Navigator {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
  };
}

function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "low";

  // 1. Hormati preferensi OS user untuk mengurangi animasi
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  const nav = navigator as NavigatorExtended;

  // 2. Hemat data / koneksi sangat lambat
  if (nav.connection?.saveData) {
    return "low";
  }

  // 3. Cek spesifikasi CPU & RAM
  const cores = nav.hardwareConcurrency || 4;
  const ram = nav.deviceMemory ?? 4;
  const isSmallScreen = window.innerWidth < 768;

  // Device dengan core <= 4, RAM <= 4GB, atau layar mobile masuk mode hemat animasi
  if (cores <= 4 || ram <= 4 || isSmallScreen) {
    return "low";
  }

  return "high";
}

function subscribeClient(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    media.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

const PerformanceContext = createContext<{
  tier: PerformanceTier;
  isClient: boolean;
}>({
  tier: "low",
  isClient: false,
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const tier = useSyncExternalStore(
    subscribeClient,
    detectPerformanceTier,
    () => "low" as PerformanceTier
  );

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.dataset.perf = tier;
  }, [isClient, tier]);

  return (
    <PerformanceContext.Provider value={{ tier, isClient }}>
      <MotionConfig reducedMotion={isClient && tier === "low" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
