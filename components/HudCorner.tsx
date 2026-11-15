"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs";
import { usePerformance } from "./PerformanceProvider";

export default function HudCorner({
  color = "#22d3ee",
  size = 12,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { tier } = usePerformance();

  useEffect(() => {
    if (!containerRef.current || tier === "low") return;

    const brackets = containerRef.current.querySelectorAll(".hud-corner-bracket");
    if (brackets.length === 0) return;

    const anim = animate(brackets, {
      strokeDashoffset: [16, 0],
      opacity: [0.3, 0.8],
      duration: 1200,
      ease: "outCubic",
    });

    return () => {
      anim.pause();
    };
  }, [tier]);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none select-none ${className}`}>
      {/* Top Left */}
      <svg className="absolute top-1.5 left-2 hud-corner-bracket" width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M 0 10 L 0 0 L 10 0" stroke={color} strokeWidth="2" strokeDasharray="16" />
      </svg>
      {/* Top Right */}
      <svg className="absolute top-1.5 right-2 hud-corner-bracket" width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M 10 0 L 20 0 L 20 10" stroke={color} strokeWidth="2" strokeDasharray="16" />
      </svg>
      {/* Bottom Left */}
      <svg className="absolute bottom-1.5 left-2 hud-corner-bracket" width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M 0 10 L 0 20 L 10 20" stroke={color} strokeWidth="2" strokeDasharray="16" />
      </svg>
      {/* Bottom Right */}
      <svg className="absolute bottom-1.5 right-2 hud-corner-bracket" width={size} height={size} viewBox="0 0 20 20" fill="none">
        <path d="M 10 20 L 20 20 L 20 10" stroke={color} strokeWidth="2" strokeDasharray="16" />
      </svg>
    </div>
  );
}
