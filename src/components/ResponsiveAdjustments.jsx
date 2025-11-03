// src/components/ResponsiveAdjustments.jsx
import React, { useEffect } from "react";

/**
 * ResponsiveAdjustments.jsx
 *
 * - Injects a viewport meta tag (viewport-fit=cover) if missing.
 * - Adds a 'touch-enabled' class on <html> when a touch device is detected.
 * - Injects responsive CSS tuned for small screens:
 *   - fluid root font scaling
 *   - larger hit targets for buttons/icons
 *   - stack hero & project layouts on narrow widths
 *   - scale down tech-stack bubbles / add spacing for rings
 *   - ensure images max-width and safe padding (safe-area-inset)
 *
 * Usage:
 *   import ResponsiveAdjustments from "./components/ResponsiveAdjustments";
 *   ...
 *   <ResponsiveAdjustments />
 *
 * Put this high in the tree (App.jsx) so CSS loads early.
 */

export default function ResponsiveAdjustments() {
  useEffect(() => {
    // add viewport meta tag if missing
    let meta = document.querySelector('meta[name="viewport"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "viewport";
      document.head.appendChild(meta);
    }
    // set recommended viewport for mobile + safe-area
    meta.content = "width=device-width,initial-scale=1,viewport-fit=cover";

    // detect touch device and add class for conditional CSS
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0;
    if (isTouch) {
      document.documentElement.classList.add("touch-enabled");
    } else {
      document.documentElement.classList.remove("touch-enabled");
    }

    // inject responsive CSS (scoped global helpers)
    const styleId = "responsive-adjustments-styles";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
/* === ResponsiveAdjustments (injected) === */

/* fluid root type scale */
:root {
  font-size: 16px;
}
@media (max-width: 1100px) {
  :root { font-size: clamp(15px, 1.6vw, 16px); }
}
@media (max-width: 720px) {
  :root { font-size: clamp(14px, 3.2vw, 15px); }
}

/* safe area on iOS fullscreen */
body { padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }

/* container spacing adapt */
.container-site {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}
@media (max-width: 480px) {
  .container-site { padding-left: 0.9rem !important; padding-right: 0.9rem !important; }
}

/* bigger touch targets for clickable items */
.cta-primary, .cta-ghost, .animated-btn, .animated-btn button, .btn-send, .btn-ghost {
  min-height: 44px;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  touch-action: manipulation;
}

/* disable hover-only animations on touch devices */
html.touch-enabled .preview-card,
html.touch-enabled .photo-card,
html.touch-enabled .animated-btn:hover,
html.touch-enabled .photo-card:hover {
  transition: none !important;
  transform: none !important;
}

/* hero stacking & spacing */
.hero-outer {
  gap: 18px;
  padding-top: 32px;
  padding-bottom: 32px;
}
@media (max-width: 900px) {
  .hero-outer { flex-direction: column-reverse; align-items: center; padding: 28px 0; }
  .hero-left, .hero-right { width: 100%; padding: 0; text-align: center; }
  .hero-left { order: 2; }
  .hero-right { order: 1; display:flex; justify-content:center; align-items:center; }
  .hero-outer .h-hero { font-size: clamp(20px, 7.4vw, 34px); }
  .animated-line { display: none; }
  .brand-logo { margin: 0 auto 8px; }
}

/* Projects grid: stacked single column on small */
.grid, .projects-grid, .projects-list {
  display: block;
}
.project-card { display: flex; gap: 0; flex-direction: row; align-items: stretch; }
.project-media { flex: 0 0 46%; max-width: 46%; }
.project-content { flex: 1 1 54%; padding: 18px; }
.project-img { width: 100%; height: auto; object-fit: cover; display: block; }

/* small screens: force stacked project card */
@media (max-width: 860px) {
  .project-card { flex-direction: column; }
  .project-media, .project-content { width: 100%; max-width: 100%; flex-basis: auto; }
  .project-img { height: 220px; }
  .project-content { padding: 14px; }
}

/* ensure small project images don't overflow */
.project-img { max-width: 100%; border-radius: 8px; }

/* featured title spacing & responsive */
.text-center .text-4xl, .text-center .text-5xl, .h-hero { line-height: 1.02; }
@media (max-width: 720px) {
  .text-center .text-4xl, .h-hero { font-size: clamp(20px, 7.6vw, 30px); }
}

/* contact card responsive fix */
.contact-card { width: 100%; box-sizing: border-box; }
.contact-card input, .contact-card textarea { font-size: 0.98rem; }
@media (max-width: 520px) {
  .contact-card { padding: 20px; border-radius: 12px; }
  .contact-form .field { margin-bottom: 12px; }
}

/* tech-stack / bubble layout responsiveness */
.tech-stack-root, .tech-system, .tech-orbit {
  max-width: 640px;
  margin: 0 auto;
}
@media (max-width: 920px) {
  .tech-stack-root, .tech-system, .tech-orbit { transform: scale(0.85); }
}
@media (max-width: 520px) {
  .tech-stack-root, .tech-system, .tech-orbit { transform: scale(0.7); }
}

/* adjust CTA row + social icon gap to avoid crowding */
.cta-row { gap: 12px; margin-bottom: 12px; }
.connect-icons { margin-top: 14px; gap: 12px; }

/* readable placeholders / input spacing - ensure contrast */
input::placeholder, textarea::placeholder {
  opacity: 0.8;
  color: rgba(255,255,255,0.55);
}

/* ensure hero photo scales nicely */
.photo-card, .preview-card { max-width: 92vw; width: 320px; }
@media (max-width: 520px) {
  .photo-card, .preview-card { width: 260px; }
}

/* make sure fixed sidebars don't overlap content on small screens */
.main-with-sidebar { padding-left: 0 !important; }
@media (min-width: 768px) {
  .main-with-sidebar { padding-left: 18rem; }
}

/* subtle performance: prefer-reduced-motion respects user preference */
@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }
}
      `;
      document.head.appendChild(style);
    }

    // cleanup not necessary (we want CSS to persist) but could be handled if desired
  }, []);

  return null;
}