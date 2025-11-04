// src/components/TechStack.jsx
import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TechStack - responsive, deployment-safe.
 * - Scales radii/icons based on viewport width
 * - Prevents horizontal overflow (max-width: 100vw, overflow hidden)
 * - Pauses/halts animation on small screens / prefers-reduced-motion
 */

const INNER = ["react", "nodedotjs", "vite", "tailwindcss", "prisma", "postgresql"];
const MIDDLE = ["mongodb", "docker", "socket", "streamlit", "fastapi", "fastify", "framer"];
const OUTER = ["python", "pandas", "scikitlearn", "pytorch", "git", "nextdotjs", "render", "jet"];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  // viewport-driven config
  const [vw, setVw] = useState(typeof window !== "undefined" ? Math.max(320, window.innerWidth) : 1200);

  useEffect(() => {
    function onResize() {
      setVw(Math.max(320, window.innerWidth));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Determine breakpoints & scale factors
  const isSmall = vw <= 720;
  const isXSmall = vw <= 420;

  // Base sizes (desktop-friendly)
  const centerBase = 200;
  const iconBase = 80;
  const outerRadiusBase = 420;
  const middleRadiusBase = 290;
  const innerRadiusBase = 180;

  // Calculate scaled sizes so that the orbit-wrap fits inside viewport
  // We'll cap totalDiameter to 0.85 * vw so there's padding on both sides
  const maxDiameter = Math.floor(vw * 0.85);
  // On desktop we use base diameters, otherwise scale down
  const desiredOuterDiameter = outerRadiusBase * 2 + iconBase;
  const scaleFactor = desiredOuterDiameter > maxDiameter ? maxDiameter / desiredOuterDiameter : 1;

  const centerSize = Math.max(100, Math.round(centerBase * scaleFactor));
  const iconSize = Math.max(44, Math.round(iconBase * scaleFactor));
  const outerRadius = Math.max(outerRadiusBase * scaleFactor, iconSize * 1.6);
  const middleRadius = Math.max(middleRadiusBase * scaleFactor, iconSize * 1.1);
  const innerRadius = Math.max(innerRadiusBase * scaleFactor, iconSize * 0.9);

  // very slow durations (longer = slower)
  const outerDuration = isSmall ? 9999 : 220; // effectively static on small screens
  const middleDuration = isSmall ? 9999 : 160;
  const innerDuration = isSmall ? 9999 : 120;

  // compute transform helper
  function computeTransform(idx, N, radius) {
    const angle = (idx / N) * Math.PI * 2;
    const deg = (angle * 180) / Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, deg };
  }

  // If reduced motion or small, treat animations as paused
  const playAnimations = !reduceMotion && !isSmall && !isXSmall;

  // Precompute total orbit-wrap size (clamped to maxDiameter to avoid overflow)
  const orbitWrapSize = Math.min(Math.ceil(outerRadius * 2 + iconSize), Math.max(320, maxDiameter));

  return (
    <section
      id="tech"
      style={{
        padding: "48px 12px",
        overflowX: "hidden", // prevent horizontal overflow from any child
      }}
    >
      <style>{`
        .tech-solar {
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          gap:14px;
          width:100%;
        }

        .orbit-wrap {
          position:relative;
          display:grid;
          place-items:center;
          width: ${orbitWrapSize}px;
          height: ${orbitWrapSize}px;
          max-width: 100%;
          margin: 0 auto;
          overflow: visible;
          touch-action: pan-y; /* allow vertical scrolling, discourage horizontal pan */
        }

        /* ensure orbit doesn't produce layout overflow */
        .orbit { position:absolute; inset:0; display:block; transform-origin:center; pointer-events:none; }

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
          box-shadow: 0 10px 22px rgba(2,6,23,0.07);
          border: 1px solid rgba(255,255,255,0.06);
          overflow:hidden;
          background: transparent;
        }

        .orb-item .orb-bg {
          position:absolute; inset:0; border-radius:999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
          opacity: 1;
        }

        .orb-item .orb-content {
          position:relative; z-index: 2; width: 76%; height:76%; display:flex; align-items:center; justify-content:center;
          padding: 4px;
        }

        .orb-item img { width: 100%; height: 100%; object-fit:contain; display:block; filter: drop-shadow(0 8px 14px rgba(2,6,23,0.08)); }

        .orb-item:hover { transform: scale(1.08); box-shadow: 0 26px 72px rgba(2,6,23,0.12); }

        .center-bubble {
          z-index:80;
          width: ${centerSize}px;
          height: ${centerSize}px;
          border-radius:999px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg, rgba(30,111,235,0.22), rgba(0,168,132,0.10));
          box-shadow: 0 22px 60px rgba(30,111,235,0.06);
          border: 1px solid rgba(255,255,255,0.04);
        }
        .center-bubble .label { font-weight: 800; font-size: 1.08rem; color: var(--text); text-align:center; padding:6px 10px; }

        .tech-sub { color: var(--muted); max-width: 880px; text-align:center; font-size:0.95rem; margin-top:6px; }

        @media (prefers-reduced-motion: reduce) {
          .orbit { animation: none !important; }
          .orb-item { transition: none !important; transform: none !important; }
        }

        @media (max-width: 880px) {
          .tech-solar { gap: 12px; }
        }

        @media (max-width: 520px) {
          .center-bubble { width: ${Math.max(90, Math.round(centerSize * 0.7))}px; height: ${Math.max(90, Math.round(centerSize * 0.7))}px; }
        }
      `}</style>

      <div className="tech-solar container-site" aria-hidden="false">
        <div
          className="orbit-wrap"
          style={{
            width: `${orbitWrapSize}px`,
            height: `${orbitWrapSize}px`,
          }}
        >
          {/* OUTER ring */}
          <div
            className="orbit orbit-outer"
            style={{
              animationName: playAnimations ? "orbit-outer" : undefined,
              animationDuration: `${outerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: playAnimations ? "running" : "paused",
            }}
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
                    <img src={img} alt={slug} onError={(e) => (e.currentTarget.style.display = "none")} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* MIDDLE ring */}
          <div
            className="orbit orbit-middle"
            style={{
              animationName: playAnimations ? "orbit-middle" : undefined,
              animationDuration: `${middleDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: playAnimations ? "running" : "paused",
            }}
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
                    <img src={img} alt={slug} onError={(e) => (e.currentTarget.style.display = "none")} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* INNER ring */}
          <div
            className="orbit orbit-inner"
            style={{
              animationName: playAnimations ? "orbit-inner" : undefined,
              animationDuration: `${innerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: playAnimations ? "running" : "paused",
            }}
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
                    <img src={img} alt={slug} onError={(e) => (e.currentTarget.style.display = "none")} />
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
            transition={{ duration: 0.8, type: "spring", stiffness: 88, damping: 12 }}
            viewport={{ once: true }}
          >
            <div className="label">Tech Stack</div>
          </motion.div>
        </div>

        <div className="tech-sub">{/* optional subtitle text */}</div>
      </div>
    </section>
  );
}