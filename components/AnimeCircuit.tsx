"use client";

import { useEffect, useRef } from "react";
import { createTimeline } from "animejs";
import { usePerformance } from "./PerformanceProvider";

export default function AnimeCircuit({
  className = "",
}: {
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { tier } = usePerformance();

  useEffect(() => {
    if (!svgRef.current || tier === "low") return;

    const el = svgRef.current;
    const branches = el.querySelectorAll(".anime-branch-line");
    const pulses = el.querySelectorAll(".anime-pulse-node");

    const tl = createTimeline({ loop: true, alternate: true });

    if (branches.length > 0) {
      tl.add(branches, {
        strokeDashoffset: [100, 0],
        opacity: [0.15, 0.6],
        duration: 3500,
        ease: "inOutSine",
      });
    }

    if (pulses.length > 0) {
      tl.add(pulses, {
        scale: [0.8, 1.3],
        opacity: [0.4, 1],
        duration: 2000,
        ease: "inOutQuad",
      }, 0);
    }

    return () => {
      tl.pause();
    };
  }, [tier]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}>
      <svg
        ref={svgRef}
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
      >
        {/* Branch Circuit 1: Connecting Origin to Academy */}
        <path
          className="anime-branch-line"
          d="M 50 11 L 35 17 L 22 22"
          stroke="#22d3ee"
          strokeWidth="0.25"
          strokeDasharray="6 3"
          opacity="0.3"
        />

        {/* Branch Circuit 2: Connecting Academy to Studio */}
        <path
          className="anime-branch-line"
          d="M 22 32 L 52 38 L 82 43"
          stroke="#38bdf8"
          strokeWidth="0.25"
          strokeDasharray="8 4"
          opacity="0.3"
        />

        {/* Branch Circuit 3: Connecting Studio to Gateway */}
        <path
          className="anime-branch-line"
          d="M 82 52 L 55 58 L 28 64"
          stroke="#34d399"
          strokeWidth="0.25"
          strokeDasharray="6 3"
          opacity="0.3"
        />

        {/* Branch Circuit 4: Connecting Gateway to Logs */}
        <path
          className="anime-branch-line"
          d="M 28 73 L 51 78 L 74 82"
          stroke="#22d3ee"
          strokeWidth="0.25"
          strokeDasharray="7 3.5"
          opacity="0.3"
        />

        {/* Branch Circuit 5: Connecting Logs to Terminus */}
        <path
          className="anime-branch-line"
          d="M 74 89 L 62 92 L 50 95"
          stroke="#34d399"
          strokeWidth="0.25"
          strokeDasharray="6 3"
          opacity="0.3"
        />

        {/* Tactical Pulse Junction Nodes */}
        <circle className="anime-pulse-node" cx="35" cy="17" r="0.6" fill="#22d3ee" style={{ transformOrigin: "35% 17%" }} />
        <circle className="anime-pulse-node" cx="52" cy="38" r="0.6" fill="#38bdf8" style={{ transformOrigin: "52% 38%" }} />
        <circle className="anime-pulse-node" cx="55" cy="58" r="0.6" fill="#34d399" style={{ transformOrigin: "55% 58%" }} />
        <circle className="anime-pulse-node" cx="51" cy="78" r="0.6" fill="#22d3ee" style={{ transformOrigin: "51% 78%" }} />
        <circle className="anime-pulse-node" cx="62" cy="92" r="0.6" fill="#34d399" style={{ transformOrigin: "62% 92%" }} />
      </svg>
    </div>
  );
}
