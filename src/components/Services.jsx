// src/components/Services.jsx
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

/* Inline services data to avoid external imports */
const servicesItem = [
  {
    id: "s1",
    title: "Web Development",
    description: "Design & Build secure, scalable, and real time web applications tailored for performance.",
    img: "/assets/services/webdev.jpg",
  },
  {
    id: "s2",
    title: "UI/UX Solutions",
    description: "Designing intuitive, user-centric designs with seamless and consistent experiences.",
    img: "/assets/services/uiux.jpg",
  },
  {
    id: "s3",
    title: "E Commerce Platforms",
    description: "Develop fast, reliable, and conversion-focused online shopping platforms.",
    img: "/assets/services/ecom.jpg",
  },
  {
    id: "s4",
    title: "Responsive Optimization",
    description: "Ensure flawless adaptability across all devices with smooth, optimized interfaces.",
    img: "/assets/services/opt.jpg",
  },
  {
    id: "s5",
    title: "Data Visualizations",
    description: "Create interactive dashboards and analytics tools for real-time insights.",
    img: "/assets/services/feat.jpg",
  },
];

export default function Services() {
  const containerRef = useRef(null); // visible viewport
  const contentRef = useRef(null); // the inner content (one sequence)
  const trackRef = useRef(null); // the moving track (contains two sequences)
  const controls = useAnimation();

  const [loopPx, setLoopPx] = useState(0); // pixels to translate for a single loop
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // slower base speed (px per second). Lower = slower movement.
  const BASE_SPEED = 60;

  // detect mobile / small screens
  useEffect(() => {
    function check() {
      const w = window.innerWidth || document.documentElement.clientWidth;
      setIsMobile(w <= 768);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // measure widths after first paint and whenever window resizes or images load
  useEffect(() => {
    function measure() {
      const contentEl = contentRef.current;
      if (!contentEl) return;
      const w = Math.ceil(contentEl.getBoundingClientRect().width);
      if (!w || w < 10) return;
      setLoopPx(w);
      if (trackRef.current) {
        trackRef.current.style.transform = "translate3d(0,0,0)";
        trackRef.current.style.willChange = "transform";
      }
    }

    // measure after paint / images load
    let raf = requestAnimationFrame(measure);
    const onLoad = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    window.addEventListener("load", onLoad);
    window.addEventListener("resize", measure);

    // re-measure when images inside content finish loading (in case cached vs not)
    const imgs = contentRef.current?.querySelectorAll("img") ?? [];
    const listeners = [];
    imgs.forEach((img) => {
      if (!img.complete) {
        const fn = () => {
          measure();
          img.removeEventListener("load", fn);
        };
        listeners.push([img, fn]);
        img.addEventListener("load", fn);
      }
    });

    // initial measure
    measure();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measure);
      listeners.forEach(([img, fn]) => img.removeEventListener("load", fn));
    };
  }, []);

  // compute duration based on loopPx and base speed (seconds). ensure min duration to avoid too-fast
  const duration = loopPx ? Math.max(12, loopPx / BASE_SPEED) : 0; // minimum increased for slow feel

  // start/stop animation via controls depending on loopPx, isPaused and isMobile
  useEffect(() => {
    // if mobile: stop any animation (we use scroll/swipe instead)
    if (isMobile || !loopPx) {
      controls.stop();
      return;
    }

    // if paused, stop animation
    if (isPaused) {
      controls.stop();
      return;
    }

    // start infinite pixel animation from 0 to -loopPx
    controls.start({
      x: [-0, -loopPx],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: duration,
          ease: "linear",
        },
      },
    });

    return () => {
      controls.stop();
    };
  }, [controls, loopPx, isPaused, isMobile, duration]);

  // hover handlers: pause on hover (desktop)
  const handleMouseEnter = () => {
    if (!isMobile) setIsPaused(true);
  };
  const handleMouseLeave = () => {
    if (!isMobile) setIsPaused(false);
  };

  return (
    <section
      id="services"
      style={{
        minHeight: "68vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "56px 20px",
        zIndex: 10,
      }}
    >
      <style>{`
        .services-card {
          width: 94%;
          max-width: 1200px;
          background: var(--card);
          border-radius: 18px;
          padding: 28px;
          box-shadow:
            0 8px 30px rgba(2,6,23,0.06),
            0 0 40px rgba(30,111,235,0.04),
            inset 0 1px 0 rgba(255,255,255,0.02);
          border: 1px solid var(--glass);
          position: relative;
          overflow: hidden;
        }

        .services-top {
          text-align: center;
          margin-bottom: 18px;
        }

        .services-title {
          font-size: 44px;
          line-height: 1;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text);
          margin: 0 0 8px;
        }

        .services-sub {
          max-width: 900px;
          margin: 0 auto;
          color: var(--muted);
          font-size: 15px;
        }

        .marquee-viewport {
          width: 100%;
          overflow: hidden;
          padding: 22px 8px 6px;
          -webkit-overflow-scrolling: touch;
        }

        /* hide scrollbar visually across browsers when horizontal scroll is enabled */
        .marquee-viewport::-webkit-scrollbar { display: none; height: 0; width: 0; }
        .marquee-viewport { -ms-overflow-style: none; scrollbar-width: none; }

        .marquee-track {
          display: flex;
          gap: 22px;
          align-items: stretch;
          will-change: transform;
          transform: translate3d(0,0,0);
        }

        .marquee-seq {
          display: flex;
          gap: 22px;
          align-items: stretch;
        }

        .service-card {
          width: 340px;
          min-width: 340px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 20px 50px rgba(2,6,23,0.16);
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-shrink: 0;
        }

        .service-media {
          width: 100%;
          height: 190px;
          border-radius: 8px;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.06));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .service-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .service-title {
          font-size: 18px;
          font-weight: 700;
          color: var(--text);
        }

        .service-desc {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.45;
        }

        /* Mobile behavior: disable automatic animation and allow horizontal swipe inside viewport.
           Also hide browser scrollbar and add subtle padding so cards are comfortably swipeable */
        @media (max-width: 768px) {
          .marquee-viewport {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 18px;
          }
          .marquee-track { transform: none !important; }
        }

        @media (max-width: 920px) {
          .service-card { width: 300px; min-width: 300px; }
          .service-media { height: 160px; }
          .services-title { font-size: 36px; }
        }

        @media (max-width: 640px) {
          .services-card { padding: 18px; border-radius: 12px; }
          .service-card { width: 86vw; min-width: 86vw; }
          .services-title { font-size: 28px; }
          .services-sub { font-size: 14px; }
        }

        /* tiny swipe hint */
        .mobile-swipe-hint {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.9);
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 6px 18px rgba(2,6,23,0.28);
          z-index: 22;
          pointer-events: none;
          opacity: 0.95;
        }

        .mobile-swipe-hint .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          box-shadow: 0 4px 10px rgba(2,6,23,0.28);
          transform: translateX(0);
          animation: swipePulse 1.4s infinite;
        }

        @keyframes swipePulse {
          0% { transform: translateX(-2px); opacity: 0.8; }
          50% { transform: translateX(6px); opacity: 1; }
          100% { transform: translateX(-2px); opacity: 0.8; }
        }
      `}</style>

      <div className="services-card" role="region" aria-labelledby="services-title">
        <div className="services-top">
          <h2 id="services-title" className="services-title">Services I Provide</h2>
        </div>

        <div
          className="marquee-viewport"
          ref={containerRef}
          aria-hidden={false}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!isMobile ? (
            <motion.div
              ref={trackRef}
              className="marquee-track"
              animate={controls}
            >
              <div className="marquee-seq" ref={contentRef} aria-hidden={false}>
                {servicesItem.map((s) => (
                  <article key={`a-${s.id}`} className="service-card" aria-label={s.title}>
                    <div className="service-media">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23161e2a'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div>
                      <div className="service-title">{s.title}</div>
                      <p className="service-desc">{s.description}</p>
                    </div>
                  </article>
                ))}
              </div>

              <div className="marquee-seq" aria-hidden>
                {servicesItem.map((s) => (
                  <article key={`b-${s.id}`} className="service-card" aria-hidden>
                    <div className="service-media">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23161e2a'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div>
                      <div className="service-title">{s.title}</div>
                      <p className="service-desc">{s.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="marquee-track" ref={trackRef}>
              <div className="marquee-seq" ref={contentRef} aria-hidden={false}>
                {servicesItem.map((s) => (
                  <article key={`m-${s.id}`} className="service-card" aria-label={s.title}>
                    <div className="service-media">
                      <img
                        src={s.img}
                        alt={s.title}
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Crect width='100%25' height='100%25' fill='%23161e2a'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div>
                      <div className="service-title">{s.title}</div>
                      <p className="service-desc">{s.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        {isMobile && (
          <div className="mobile-swipe-hint" aria-hidden>
            <div className="dot" />
            <div>Swipe</div>
          </div>
        )}
      </div>
    </section>
  );
}