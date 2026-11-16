"use client";

import { createContext, useContext, useEffect, useState, useSyncExternalStore, ReactNode } from "react";
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

  // 1. Respect OS reduced motion preference
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return "low";
  }

  const nav = navigator as NavigatorExtended;

  // 2. Data saver mode
  if (nav.connection?.saveData) {
    return "low";
  }

  // 3. Hardware specs check (CPU cores & RAM)
  // Note: iOS Safari omits deviceMemory (undefined), whereas low-end Androids (e.g. Redmi Note 9) report 3 or 4GB.
  const cores = nav.hardwareConcurrency || 4;
  const ram = nav.deviceMemory;

  if (ram !== undefined && ram <= 4) {
    return "low";
  }

  if (cores < 4) {
    return "low";
  }

  // If deviceMemory is undefined (iOS/iPadOS/desktop Safari) and cores === 4, check screen size/DPR or allow high on modern Apple devices
  return "high";
}

function detectFinePointer(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(any-pointer: fine)").matches ||
    window.matchMedia("(pointer: fine)").matches
  );
}

function subscribeClient(callback: () => void) {
  const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerMedia = window.matchMedia("(any-pointer: fine)");
  motionMedia.addEventListener("change", callback);
  pointerMedia.addEventListener("change", callback);
  window.addEventListener("resize", callback);
  return () => {
    motionMedia.removeEventListener("change", callback);
    pointerMedia.removeEventListener("change", callback);
    window.removeEventListener("resize", callback);
  };
}

const PerformanceContext = createContext<{
  tier: PerformanceTier;
  hasMouse: boolean;
  isClient: boolean;
}>({
  tier: "low",
  hasMouse: false,
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

  const mediaHasMouse = useSyncExternalStore(
    subscribeClient,
    detectFinePointer,
    () => false
  );

  // Also dynamically detect if an external mouse is actively used on iPadOS / Android Tablet
  const [dynamicMouse, setDynamicMouse] = useState(false);

  useEffect(() => {
    if (!isClient) return;
    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        setDynamicMouse(true);
      } else if (e.pointerType === "touch") {
        setDynamicMouse(false);
      }
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [isClient]);

  const hasMouse = mediaHasMouse || dynamicMouse;

  useEffect(() => {
    if (!isClient) return;
    document.documentElement.dataset.perf = tier;
    document.documentElement.dataset.pointer = hasMouse ? "mouse" : "touch";
  }, [isClient, tier, hasMouse]);

  return (
    <PerformanceContext.Provider value={{ tier, hasMouse, isClient }}>
      <MotionConfig reducedMotion={isClient && tier === "low" ? "always" : "user"}>
        {children}
      </MotionConfig>
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  return useContext(PerformanceContext);
}
