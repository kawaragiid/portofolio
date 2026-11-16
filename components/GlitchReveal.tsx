"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

interface GlitchRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** If provided, controls visibility externally (e.g. Hero scroll threshold). Otherwise uses IntersectionObserver. */
  revealed?: boolean;
}

export default function GlitchReveal({
  children,
  className = "",
  delay = 0,
  revealed,
}: GlitchRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const isControlled = revealed !== undefined;
  const isVisible = isControlled ? revealed : inView;

  useEffect(() => {
    if (isControlled) return;
    const el = ref.current;
    if (!el) return;

    const checkIfAlreadyVisible = () => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && window.scrollY > 15) {
        setInView(true);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && window.scrollY > 15) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    window.addEventListener("scroll", checkIfAlreadyVisible, { passive: true });
    checkIfAlreadyVisible();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", checkIfAlreadyVisible);
    };
  }, [isControlled]);

  return (
    <div
      ref={ref}
      style={isVisible && delay > 0 ? { animationDelay: `${delay}ms` } : undefined}
      className={`${
        isVisible
          ? "animate-glitch-assemble"
          : "opacity-0 translate-y-3 pointer-events-none select-none"
      } ${className}`}
      aria-hidden={!isVisible}
    >
      {children}
    </div>
  );
}
