import React, { useEffect, useRef, useState } from "react";
import DarkToggle from "./DarkToggle";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Sidebar({ email = "your.email@example.com" }) {
  const LINE1 = "NILAM";

  const [line1, setLine1] = useState(LINE1.replace(/./g, " "));

  const cleanupRef = useRef([]);

  useEffect(() => {
    // Inject DM Serif Text font
    if (!document.querySelector('link[data-font="dmseriftext"]')) {
      const p1 = document.createElement("link");
      p1.rel = "preconnect";
      p1.href = "https://fonts.googleapis.com";
      document.head.appendChild(p1);

      const p2 = document.createElement("link");
      p2.rel = "preconnect";
      p2.href = "https://fonts.gstatic.com";
      p2.crossOrigin = "anonymous";
      document.head.appendChild(p2);

      const lf = document.createElement("link");
      lf.rel = "stylesheet";
      lf.href =
        "https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&display=swap";
      lf.setAttribute("data-font", "dmseriftext");
      document.head.appendChild(lf);
    }
  }, []);

  useEffect(() => {
    cleanupRef.current.forEach((fn) => typeof fn === "function" && fn());
    cleanupRef.current = [];

    function animateLine(target, setter, opts = {}) {
      const {
        charInterval = 32,
        startDelay = 0,
        baseStop = 420,
        perCharDelay = 90,
        jitter = 30,
      } = opts;

      const chars = target.split("");
      const display = chars.map((c) =>
        c === " " ? " " : ALPHABET[Math.floor(Math.random() * ALPHABET.length)]
      );

      setter(display.join(""));

      const startTimer = setTimeout(() => {
        const intervals = [];
        const stopTimers = [];

        chars.forEach((ch, idx) => {
          if (ch === " ") return;

          const iv = setInterval(() => {
            display[idx] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            setter(display.join(""));
          }, charInterval);
          intervals.push(iv);

          const stopAfter =
            baseStop + idx * perCharDelay + Math.floor(Math.random() * jitter);
          const st = setTimeout(() => {
            clearInterval(iv);
            display[idx] = ch;
            setter(display.join(""));
          }, stopAfter);
          stopTimers.push(st);
        });

        const finalize = setTimeout(() => {
          intervals.forEach((i) => clearInterval(i));
          stopTimers.forEach((t) => clearTimeout(t));
          setter(chars.join(""));
        }, baseStop + chars.length * perCharDelay + 1400);

        cleanupRef.current.push(() => {
          intervals.forEach((i) => clearInterval(i));
          stopTimers.forEach((t) => clearTimeout(t));
          clearTimeout(finalize);
        });
      }, startDelay);

      cleanupRef.current.push(() => clearTimeout(startTimer));
    }

    const onLoad = () => {
      animateLine(LINE1, setLine1, {
        charInterval: 28,
        startDelay: 80,
        baseStop: 360,
        perCharDelay: 70,
        jitter: 28,
      });
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
      cleanupRef.current.push(() =>
        window.removeEventListener("load", onLoad)
      );
    }

    return () => {
      cleanupRef.current.forEach((fn) => typeof fn === "function" && fn());
      cleanupRef.current = [];
    };
  }, []);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-[var(--card)] border-r border-[var(--glass)] z-40 p-6 sidebar"
        aria-label="Brand"
        style={{
          background: "transparent",
          borderRight: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              fontFamily: "'DM Serif Text', serif",
              fontWeight: 400,
              fontSize: 96,
              lineHeight: 1,
              letterSpacing: 1,
              color: "var(--text)",
              textTransform: "uppercase",
              textShadow:
                "0 12px 28px rgba(2,6,23,0.25), 0 2px 0 rgba(255,255,255,0.06)",
              whiteSpace: "nowrap",
              userSelect: "none",
              background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            aria-hidden
          >
            {line1}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <DarkToggle />
          <a
            href={`mailto:${email}`}
            style={{
              fontSize: 13,
              color: "var(--muted)",
              textDecoration: "none",
            }}
          >
            {email}
          </a>
        </div>
      </aside>

      {/* Mobile Header */}
      <header
        className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--card)] border-b border-[var(--glass)] z-50 flex items-center justify-center px-4"
        style={{
          background: "transparent",
          borderBottom: "none",
          backdropFilter: "none",
          WebkitBackdropFilter: "none",
        }}
      >
        <div
          style={{
            fontFamily: "'DM Serif Text', serif",
            fontWeight: 400,
            fontSize: 34,
            letterSpacing: 1,
            color: "var(--text)",
            textTransform: "uppercase",
            userSelect: "none",
            background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.85))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          aria-hidden
        >
          NILAM
        </div>
      </header>
    </>
  );
}
