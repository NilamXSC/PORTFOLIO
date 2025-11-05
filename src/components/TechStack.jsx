// src/components/TechStack.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TechStack - 3-ring solar-system style orbiting icons around a central "Tech Stack" bubble.
 * Updated: stronger, more visible bubbles and Vite-safe SVG loading (import.meta.url).
 * Mobile behavior: on small screens the orbit animations are disabled and rings are hidden;
 * only a smaller center bubble is shown to prevent horizontal sliding/overflow.
 */

const INNER = ["react", "nodedotjs", "vite", "tailwindcss", "prisma", "postgresql"];
const MIDDLE = ["mongodb", "docker", "socket", "streamlit", "fastapi", "fastify", "framer"];
const OUTER = ["python", "pandas", "scikitlearn", "pytorch", "git", "nextdotjs", "render", "jet"];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  // Layout sizes — unchanged logic
  const centerSize = 200;
  const innerRadiusDesktop = 180;
  const middleRadiusDesktop = 290;
  const outerRadiusDesktop = 420;
  const innerRadiusMobile = 100;
  const middleRadiusMobile = 160;
  const outerRadiusMobile = 220;

  // Icon bubble sizes
  const iconSizeDesktop = 80;
  const iconSizeMobile = 56;

  // Animation durations (very slow)
  const outerDuration = 220;
  const middleDuration = 160;
  const innerDuration = 120;

  function computeTransform(idx, N, radius) {
    const angle = (idx / N) * Math.PI * 2;
    const deg = (angle * 180) / Math.PI;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, deg };
  }

  return (
    <section id="tech" style={{ padding: "60px 12px" }}>
      <style>{`
        .tech-solar {
          display:flex;
          align-items:center;
          justify-content:center;
          flex-direction:column;
          gap:18px;
          width:100%;
        }

        .orbit-wrap {
          position:relative;
          display:grid;
          place-items:center;
          overflow: visible; /* keep visible by default */
        }

        .orbit { position:absolute; inset:0; display:block; transform-origin:center; }

        @keyframes orbit-outer { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes orbit-middle { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
        @keyframes orbit-inner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

        /* stronger visible orb: richer gradient, colored border & glow */
        .orb-item {
          position:absolute;
          top:50%;
          left:50%;
          display:flex;
          align-items:center;
          justify-content:center;
          border-radius:999px;
          transition: transform 260ms ease, box-shadow 260ms ease, filter 260ms ease;
          will-change:transform;
          box-shadow: 0 18px 60px rgba(12,18,32,0.18), inset 0 1px 0 rgba(255,255,255,0.02);
          border: 1px solid rgba(90,160,255,0.20); /* subtle blue-ish border for contrast */
          overflow:hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(2,6,23,0.02));
          backdrop-filter: blur(3px);
          filter: saturate(1.05);
        }

        /* glossy highlight for professional sheen */
        .orb-item::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 56%;
          border-top-left-radius: 999px;
          border-top-right-radius: 999px;
          background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.00));
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.95;
        }

        /* inner disc with a mild color tint to make icons pop */
        .orb-item .orb-bg {
          position:absolute; inset:0; border-radius:999px;
          background: radial-gradient(circle at 30% 20%, rgba(255,255,255,0.16), rgba(6,30,50,0.06));
          opacity: 1;
        }

        .orb-item .orb-content {
          position:relative; z-index: 2; width: 74%; height:74%; display:flex; align-items:center; justify-content:center;
        }

        /* ensure svg visibility: no extra filters that kill color, allow full size */
        .orb-item img { width: 100%; height: 100%; object-fit:contain; display:block; filter: drop-shadow(0 10px 20px rgba(2,6,23,0.14)); }

        .orb-item:hover { transform: scale(1.12); box-shadow: 0 36px 110px rgba(2,6,23,0.26); }

        .center-bubble {
          z-index:80;
          width: ${centerSize}px;
          height: ${centerSize}px;
          border-radius:999px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg, rgba(40,140,255,0.36), rgba(3,200,150,0.16));
          box-shadow: 0 40px 110px rgba(30,111,235,0.12);
          border: 1px solid rgba(255,255,255,0.10);
          backdrop-filter: blur(5px);
        }
        .center-bubble .label { font-weight: 900; font-size: 1.35rem; color: var(--text); text-align:center; text-shadow: 0 2px 12px rgba(2,6,23,0.32); }

        .tech-sub { color: var(--muted); max-width: 880px; text-align:center; font-size:0.95rem; margin-top:6px; }

        @media (prefers-reduced-motion: reduce) {
          .orbit { animation: none !important; }
          .orb-item { transition: none !important; transform: none !important; }
        }

        /* -----------------------
           MOBILE / SMALL SCREENS
           - hide orbit rings and items
           - stop animations
           - shrink the orbit-wrap and center bubble
           - prevent horizontal overflow / sliding
           ----------------------- */
        @media (max-width: 720px) {
          .orbit { 
            display: none !important;         /* hide rotating rings entirely */
            animation: none !important;       /* extra safety to stop any animation */
          }
          .orb-item { display: none !important; } /* safety: hide any absolutely positioned items */

          /* shrink the orbit-wrap to a compact box centered in flow */
          .orbit-wrap {
            width: min(280px, 86vw) !important;
            height: min(280px, 86vw) !important;
            overflow: hidden !important; /* prevent overflow/slide */
            position: relative !important;
            margin: 0 auto;
          }

          /* show only a smaller center bubble (no animation) */
          .center-bubble {
            width: 120px !important;
            height: 120px !important;
            box-shadow: 0 18px 50px rgba(30,111,235,0.08);
            background: linear-gradient(180deg, rgba(40,140,255,0.28), rgba(3,200,150,0.08));
            border: 1px solid rgba(255,255,255,0.06);
            backdrop-filter: blur(3px);
          }
          .center-bubble .label { font-size: 1rem !important; padding: 6px; }

          /* ensure the section doesn't create horizontal scroll */
          section#tech { overflow-x: hidden; }

          /* disable animation-related transforms on the center bubble */
          .center-bubble { transform: none !important; transition: none !important; }
        }

        @media (max-width: 420px) {
          /* even smaller center on tiny phones */
          .orbit-wrap { width: min(240px, 86vw) !important; height: min(240px, 86vw) !important; }
          .center-bubble { width: 100px !important; height: 100px !important; }
          .center-bubble .label { font-size: 0.95rem !important; }
        }
      `}</style>

      <div className="tech-solar container-site">
        <div
          className="orbit-wrap"
          style={{
            width: `${outerRadiusDesktop * 2 + iconSizeDesktop}px`,
            height: `${outerRadiusDesktop * 2 + iconSizeDesktop}px`,
          }}
        >
          {/* OUTER ring */}
          <div
            className="orbit orbit-outer"
            style={{
              animationName: "orbit-outer",
              animationDuration: `${outerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: reduceMotion ? "paused" : "running",
            }}
          >
            {OUTER.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, OUTER.length, outerRadiusDesktop);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const size = iconSizeDesktop;
              // Vite-safe SVG URL so icons resolve both in dev and production
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`out-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: size,
                    height: size,
                    marginLeft: `-${size / 2}px`,
                    marginTop: `-${size / 2}px`,
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
              animationName: "orbit-middle",
              animationDuration: `${middleDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: reduceMotion ? "paused" : "running",
            }}
          >
            {MIDDLE.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, MIDDLE.length, middleRadiusDesktop);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const size = iconSizeDesktop;
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`mid-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: size,
                    height: size,
                    marginLeft: `-${size / 2}px`,
                    marginTop: `-${size / 2}px`,
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
              animationName: "orbit-inner",
              animationDuration: `${innerDuration}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationPlayState: reduceMotion ? "paused" : "running",
            }}
          >
            {INNER.map((slug, idx) => {
              const { x, y, deg } = computeTransform(idx, INNER.length, innerRadiusDesktop);
              const transform = `translate(${x}px, ${y}px) rotate(${-deg}deg)`;
              const size = iconSizeDesktop;
              const img = new URL(`../assets/tech/${slug}.svg`, import.meta.url).href;
              return (
                <div
                  key={`in-${slug}-${idx}`}
                  className="orb-item"
                  style={{
                    width: size,
                    height: size,
                    marginLeft: `-${size / 2}px`,
                    marginTop: `-${size / 2}px`,
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
            transition={{ duration: 0.9, type: "spring", stiffness: 88, damping: 12 }}
            viewport={{ once: true }}
          >
            <div className="label">Tech Stack</div>
          </motion.div>
        </div>

        <div className="tech-sub">
        </div>
      </div>
    </section>
  );
}