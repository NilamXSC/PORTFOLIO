// src/components/AnimatedHeadline
import React, { useEffect, useRef, useState } from "react";

/**
 
 */
export default function AnimatedHeadline({ text = "", className = "", triggerOnView = true }) {
  const containerRef = useRef(null);
  const [play, setPlay] = useState(!triggerOnView); // if not triggering on view, play immediately
  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setPlay(false);
      return;
    }
    if (!triggerOnView) {
      setPlay(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      // fallback: play immediately
      setPlay(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPlay(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerOnView, prefersReduced]);

  const chars = Array.from(text);

  return (
    <h1 ref={containerRef} className={`h-hero animated-headline ${className}`} aria-label={text}>
      {/* Screen-reader friendly copy */}
      <span className="sr-only">{text}</span>

      {/* Visual per-character animation (aria-hidden) */}
      <span aria-hidden="true" className="animated-headline__visual" role="presentation">
        {chars.map((ch, i) => {
          const key = `${i}-${ch}`;
          const displayChar = ch === " " ? "\u00A0" : ch;
          const delay = `${i * 30}ms`;
          const style = {
            animationDelay: delay,
            animationPlayState: play ? "running" : "paused",
            // keep the char visible immediately when reduced-motion active
            opacity: prefersReduced ? 1 : undefined,
          };
          return (
            <span key={key} className="hero-char" style={style}>
              {displayChar}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
