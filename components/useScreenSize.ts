"use client";

import { useState, useEffect } from "react";

export interface ScreenInfo {
  width: number;
  height: number;
  category: "MOBILE" | "TABLET" | "DESKTOP" | "FHD" | "ULTRAWIDE/4K";
  aspect: string;
  displayStr: string;
}

export function useScreenSize(): ScreenInfo {
  const [screen, setScreen] = useState<ScreenInfo>({
    width: 0,
    height: 0,
    category: "DESKTOP",
    aspect: "16:9",
    displayStr: "SYS // CALIBRATING...",
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      
      let category: ScreenInfo["category"] = "DESKTOP";
      if (w < 640) category = "MOBILE";
      else if (w < 1024) category = "TABLET";
      else if (w <= 1536) category = "DESKTOP";
      else if (w <= 1920) category = "FHD";
      else category = "ULTRAWIDE/4K";

      let aspect = `${w}:${h}`;
      if (Math.abs(w / h - 16 / 9) < 0.1) aspect = "16:9";
      else if (Math.abs(w / h - 21 / 9) < 0.1) aspect = "21:9";
      else if (Math.abs(w / h - 16 / 10) < 0.1) aspect = "16:10";
      else if (w < h) aspect = "MOBILE/PORTRAIT";

      setScreen({
        width: w,
        height: h,
        category,
        aspect,
        displayStr: `${w}×${h} [${category}]`,
      });
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screen;
}
