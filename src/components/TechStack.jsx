import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TechStack - responsive 3-ring solar-system style orbiting icons around a central "Tech Stack" bubble.
 *
 * Behavior changes:
 * - Desktop: original (slow) orbit animations.
 * - Mobile (<= 880px): renders a compact, smaller version with animations paused (no sliding/overflow).
 * - Uses import.meta.url -> new URL(...) for SVG paths to be Vite / deployment friendly.
 *
 * This file is a drop-in replacement for your previous TechStack.jsx.
 */

const INNER = ["react", "nodedotjs", "vite", "tailwindcss", "prisma", "postgresql"];
const MIDDLE = ["mongodb", "docker", "socket", "streamlit", "fastapi", "fastify", "framer"];
const OUTER = ["python", "pandas", "scikitlearn", "pytorch", "git", "nextdotjs", "render", "jet"];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  // Desktop sizes (same spirit as original)
  const centerSize = 200;
  const innerRadiusDesktop = 180;
  const middleRadiusDesktop = 290;
  const outerRadiusDesktop = 420;
  const iconSizeDesktop = 80;

  // Mobile (compact) sizes
  const centerSizeMobile = 120;
  const innerRadiusMobile = 70;
  const middleRadiusMobile = 118;
  const outerRadiusMobile = 160;
  const iconSizeMobile = 48;

  // Animation durations (very slow)
  const outerDuration = 220;
  const middleDuration = 160;
  const innerDuration = 120;

  // Responsive detection (rehydrate on resize)
  const [isSmall, setIsSmall] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 880;
  });

  useEffect(() => {
    function onResize() {
      setIsSmall(window.innerWidth <= 880);
    }
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, []);

  function computeTransform(idx, N, radius) {
    const angle = (idx / N) * Math.PI * 2;
    const deg = (angle * 180) / Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, deg };
  }

  // Choose sizes based on breakpoint
  const center = isSmall ? centerSizeMobile : centerSize;
  const innerRadius = isSmall ? innerRadiusMobile : innerRadiusDesktop;
  const middleRadius = isSmall ? middleRadiusMobile : middleRadiusDesktop;
  const outerRadius = isSmall ? outerRadiusMobile : outerRadiusDesktop;
  const iconSize = isSmall ? iconSizeMobile : iconSizeDesktop;

  // Orbit wrapper size (avoid overflow on mobile by limiting to 100% width and using a safe pixel width)
  const orbitWrapSize = isSmall
    ? Math.min(outerRadius * 2 + iconSize, Math.max(300, outerRadius * 2 + iconSize))
    : outerRadius * 2 + iconSize;

  // For mobile we do not want continuous rotation that causes layout movement; pause animations.
  const animationsPaused = reduceMotion || isSmall;

  return (
    <section id="tech" style={{ padding: isSmall ? "36px 12px" : "60px 12px" }}>
      <style>{`
        .tech-solar {
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          gap:18px;
          width:100%;
          overflow: hidden;
        }

        .orbit-wrap {
          position:relative;
          display:grid;
          place-items:center;
          width: ${orbitWrapSize}px;
          height: ${orbitWrapSize}px;
          max-width: 100%;
        }

        .orbit { position:absolute; inset:0; display:block; transform-origin:center; }

        @keyframes orbit-outer { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-middle { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit-inner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        .orb-item {
          position:absolute;
          top:50%;
          left:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:999px;
          transition: transform 260ms ease, box-shadow 260ms ease;
          will-change:transform;
          box-shadow: 0 12px 28px rgba(2,6,23,0.08);
          border: 1px solid rgba(255,255,255,0.06);
          overflow:hidden;
          background: transparent;
        }

        .orb-item .orb-bg {
          position:absolute; inset:0; border-radius:999px;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.36), rgba(255,255,255,0.08));
          opacity: 1;
        }

        .orb-item .orb-content {
          position:relative; z-index: 2; width: 74%; height:74%; display:flex; align-items:center; justify-content:center;
        }

        .orb-item img { width: 100%; height: 100%; object-fit:contain; display:block; filter: drop-shadow(0 8px 14px rgba(2,6,23,0.09)); }

        .orb-item:hover { transform: scale(1.12); box-shadow: 0 30px 90px rgba(2,6,23,0.18); }

        .center-bubble {
          z-index:80;
          width: ${center}px;
          height: ${center}px;
          border-radius:999px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg, rgba(30,111,235,0.26), rgba(0,168,132,0.14));
          box-shadow: 0 30px 90px rgba(30,111,235,0.08);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .center-bubble .label { font-weight: 900; font-size: ${isSmall ? "1.05rem" : "1.35rem"}; color: var(--text); text-align:center; }

        .tech-sub { color: var(--muted); max-width: 880px; text-align:center; font-size:0.95rem; margin-top:6px; }

        @media (prefers-reduced-motion: reduce) {
          .orbit { animation: none !important; }
          .orb-item { transition: none !important; transform: none !important; }
        }

        /* Extra guard for tiny screens to ensure no horizontal overflow */
        @media (max-width: 420px) {
          .orbit-wrap { transform: scale(0.92); }
          .center-bubble { width: ${Math.max(100, centerSizeMobile - 10)}px; height: ${Math.max(100, centerSizeMobile - 10)}px; }
        }
      `}</style>

      <div className="tech-solar container-site" aria-hidden={false}>
        <div
          className="orbit-wrap"
          style={{
            width: orbitWrapSize,
            height: orbitWrapSize,
          }}
        >
          {/* OUTER ring */}
          <div
            className="orbit orbit-outer"
            style={{
              animationName: animationsPaused ? "none" : "orbit-outer",
              animationDuration: `${outerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: animationsPaused ? "paused" : "running",
            }}
            aria-hidden={animationsPaused}
          >
            {OUTER.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, OUTER.length, outerRadius);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`out-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    marginLeft: `-${iconSize / 2}px`,
                    marginTop: `-${iconSize / 2}px`,
                    transform,
                  }}
                  title={slug}
                  role="img"
                  aria-label={slug}
                >
                  <div className="orb-bg" />
                  <div className="orb-content">
                    <img src={img} alt={slug} onError={(e) => (e.target.style.display = "none")} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE ring */}
          <div
            className="orbit orbit-middle"
            style={{
              animationName: animationsPaused ? "none" : "orbit-middle",
              animationDuration: `${middleDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: animationsPaused ? "paused" : "running",
            }}
            aria-hidden={animationsPaused}
          >
            {MIDDLE.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, MIDDLE.length, middleRadius);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`mid-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    marginLeft: `-${iconSize / 2}px`,
                    marginTop: `-${iconSize / 2}px`,
                    transform,
                  }}
                  title={slug}
                  role="img"
                  aria-label={slug}
                >
                  <div className="orb-bg" />
                  <div className="orb-content">
                    <img src={img} alt={slug} onError={(e) => (e.target.style.display = "none")} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* INNER ring */}
          <div
            className="orbit orbit-inner"
            style={{
              animationName: animationsPaused ? "none" : "orbit-inner",
              animationDuration: `${innerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: animationsPaused ? "paused" : "running",
            }}
            aria-hidden={animationsPaused}
          >
            {INNER.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, INNER.length, innerRadius);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`in-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: iconSize,
                    height: iconSize,
                    marginLeft: `-${iconSize / 2}px`,
                    marginTop: `-${iconSize / 2}px`,
                    transform,
                  }}
                  title={slug}
                  role="img"
                  aria-label={slug}
                >
                  <div className="orb-bg" />
                  <div className="orb-content">
                    <img src={img} alt={slug} onError={(e) => (e.target.style.display = "none")} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* center bubble */}
          <motion.div
            className="center-bubble"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.9, type: "spring", stiffness: 88, damping: 12 }}
            viewport={{ once: true }}
            aria-hidden={false}
          >
            <div className="label">Tech Stack</div>
          </motion.div>
        </div>

        <div className="tech-sub" aria-hidden={false}>
          {/* optional explanatory text (kept empty by default) */}
        </div>
      </div>
    </section>
  );
}