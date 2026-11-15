"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline } from "animejs";
import { usePerformance } from "./PerformanceProvider";

interface AnimeShapeProps {
  type?: "radar" | "circuit-node" | "beacon" | "target";
  size?: number;
  className?: string;
  color?: string;
}

export default function AnimeShape({
  type = "radar",
  size = 40,
  className = "",
  color = "#22d3ee",
}: AnimeShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { tier } = usePerformance();

  useEffect(() => {
    if (!svgRef.current || tier === "low") return;

    const el = svgRef.current;
    let animInstance: { pause: () => void } | null = null;

    if (type === "radar") {
      const sweep = el.querySelector(".radar-sweep");
      const rings = el.querySelectorAll(".radar-ring");

      const tl = createTimeline({ loop: true });
      if (sweep) {
        tl.add(sweep, {
          rotate: [0, 360],
          duration: 4000,
          ease: "linear",
        });
      }
      if (rings.length > 0) {
        tl.add(rings, {
          scale: [0.8, 1.15, 0.8],
          opacity: [0.3, 0.9, 0.3],
          duration: 3000,
          ease: "inOutQuad",
        }, 0);
      }
      animInstance = tl;
    } else if (type === "circuit-node") {
      const diamond = el.querySelector(".circuit-diamond");
      const ticks = el.querySelectorAll(".circuit-tick");

      const tl = createTimeline({ loop: true, alternate: true });
      if (diamond) {
        tl.add(diamond, {
          rotate: [0, 90],
          scale: [0.9, 1.1],
          duration: 2500,
          ease: "inOutCubic",
        });
      }
      if (ticks.length > 0) {
        tl.add(ticks, {
          strokeDashoffset: [20, 0],
          opacity: [0.3, 1],
          duration: 2000,
          ease: "inOutQuad",
        }, 0);
      }
      animInstance = tl;
    } else if (type === "beacon") {
      const core = el.querySelector(".beacon-core");
      const wave = el.querySelector(".beacon-wave");

      const tl = createTimeline({ loop: true });
      if (wave) {
        tl.add(wave, {
          scale: [0.5, 2],
          opacity: [0.9, 0],
          duration: 1800,
          ease: "outExpo",
        });
      }
      if (core) {
        tl.add(core, {
          scale: [0.85, 1.25, 0.85],
          duration: 1800,
          ease: "inOutSine",
        }, 0);
      }
      animInstance = tl;
    } else if (type === "target") {
      const brackets = el.querySelectorAll(".target-bracket");
      animInstance = animate(brackets, {
        scale: [1, 1.3, 1],
        opacity: [0.4, 1, 0.4],
        duration: 2200,
        ease: "inOutSine",
        loop: true,
      });
    }

    return () => {
      if (animInstance) {
        animInstance.pause();
      }
    };
  }, [type, tier]);

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`overflow-visible pointer-events-none select-none ${className}`}
      fill="none"
    >
      {type === "radar" && (
        <>
          <circle cx="50" cy="50" r="45" stroke={color} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.3" />
          <circle className="radar-ring" cx="50" cy="50" r="32" stroke={color} strokeWidth="1" opacity="0.5" style={{ transformOrigin: "50px 50px" }} />
          <circle className="radar-ring" cx="50" cy="50" r="16" stroke={color} strokeWidth="1.5" opacity="0.8" style={{ transformOrigin: "50px 50px" }} />
          <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="0.8" opacity="0.25" />
          <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="0.8" opacity="0.25" />
          <line className="radar-sweep" x1="50" y1="50" x2="50" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.9" style={{ transformOrigin: "50px 50px" }} />
          <circle cx="50" cy="50" r="3.5" fill={color} />
        </>
      )}

      {type === "circuit-node" && (
        <>
          <rect className="circuit-diamond" x="25" y="25" width="50" height="50" stroke={color} strokeWidth="1.5" opacity="0.75" style={{ transformOrigin: "50px 50px" }} />
          <circle cx="50" cy="50" r="8" fill={color} opacity="0.9" />
          <line className="circuit-tick" x1="50" y1="0" x2="50" y2="20" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
          <line className="circuit-tick" x1="50" y1="80" x2="50" y2="100" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
          <line className="circuit-tick" x1="0" y1="50" x2="20" y2="50" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
          <line className="circuit-tick" x1="80" y1="50" x2="100" y2="50" stroke={color} strokeWidth="1.5" strokeDasharray="4 2" />
        </>
      )}

      {type === "beacon" && (
        <>
          <circle className="beacon-wave" cx="50" cy="50" r="24" stroke={color} strokeWidth="2" style={{ transformOrigin: "50px 50px" }} />
          <circle className="beacon-core" cx="50" cy="50" r="10" fill={color} style={{ transformOrigin: "50px 50px" }} />
          <circle cx="50" cy="50" r="4" fill="#ffffff" />
        </>
      )}

      {type === "target" && (
        <>
          <path className="target-bracket" d="M 20 35 L 20 20 L 35 20" stroke={color} strokeWidth="2" strokeLinecap="square" style={{ transformOrigin: "50px 50px" }} />
          <path className="target-bracket" d="M 80 35 L 80 20 L 65 20" stroke={color} strokeWidth="2" strokeLinecap="square" style={{ transformOrigin: "50px 50px" }} />
          <path className="target-bracket" d="M 20 65 L 20 80 L 35 80" stroke={color} strokeWidth="2" strokeLinecap="square" style={{ transformOrigin: "50px 50px" }} />
          <path className="target-bracket" d="M 80 65 L 80 80 L 65 80" stroke={color} strokeWidth="2" strokeLinecap="square" style={{ transformOrigin: "50px 50px" }} />
          <circle cx="50" cy="50" r="3" fill={color} />
        </>
      )}
    </svg>
  );
}
