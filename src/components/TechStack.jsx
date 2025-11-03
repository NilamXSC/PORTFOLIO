// src/components/TechStack.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * TechStack - 3-ring solar-system style orbiting icons around a central "Tech Stack" bubble.
 * Final version: slightly smaller, slow rotation, and balanced layout.
 */

const INNER = ["react", "nodedotjs", "vite", "tailwindcss", "prisma", "postgresql"];
const MIDDLE = ["mongodb", "docker", "socket", "streamlit", "fastapi", "fastify", "framer"];
const OUTER = ["python", "pandas", "scikitlearn", "pytorch", "git", "nextdotjs", "render", "jet"];

export default function TechStack() {
  const reduceMotion = useReducedMotion();

  // Layout sizes — smaller, cleaner look
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
          width: ${centerSize}px;
          height: ${centerSize}px;
          border-radius:999px;
          display:flex;
          align-items:center;
          justify-content:center;
          background: linear-gradient(180deg, rgba(30,111,235,0.26), rgba(0,168,132,0.14));
          box-shadow: 0 30px 90px rgba(30,111,235,0.08);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .center-bubble .label { font-weight: 900; font-size: 1.35rem; color: var(--text); text-align:center; }

        .tech-sub { color: var(--muted); max-width: 880px; text-align:center; font-size:0.95rem; margin-top:6px; }

        @media (prefers-reduced-motion: reduce) {
          .orbit { animation: none !important; }
          .orb-item { transition: none !important; transform: none !important; }
        }

        @media (max-width: 880px) {
          .center-bubble { width: 150px; height: 150px; }
          .orb-item { width: ${iconSizeMobile}px; height: ${iconSizeMobile}px; margin-left: calc(-${iconSizeMobile/2}px); margin-top: calc(-${iconSizeMobile/2}px); }
          .orbit-wrap { width: ${outerRadiusMobile * 2 + iconSizeMobile}px; height: ${outerRadiusMobile * 2 + iconSizeMobile}px; }
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
              const img = `/src/assets/tech/${slug}.svg`;
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
              const img = `/src/assets/tech/${slug}.svg`;
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
              const img = `/src/assets/tech/${slug}.svg`;
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