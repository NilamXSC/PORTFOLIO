// src/components/Hero.jsx
import React from "react";
import PhotoCard from "./PhotoCard";
import AnimatedButton from "./AnimatedButton";
import AnimatedHeadline from "./AnimatedHeadline";

/**
 * Hero — uses public/assets for images and icons
 * Move these files into /public/assets/:
 *   logo-symbol.png
 *   profile.jpg
 *   social/github.svg, linkedin.svg, instagram.svg, youtube.svg, mail.svg, leetcode.svg
 */

export default function Hero() {
  // Scroll helper with offset to avoid fixed header overlap
  const scrollToId = (id, offset = 84) => {
    const el = document.getElementById(id);
    if (!el) {
      console.warn("scrollToId: element not found:", id);
      return;
    }
    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY;
    const targetY = Math.max(0, absoluteY - offset);

    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  return (
    <section id="home" className="hero-outer container-site mx-auto">
      <style>{`
        /* small scoped styles for the connect icons */
        .connect-icons {
          display: flex;
          gap: 12px;
          margin-top: 18px;
          align-items: center;
          flex-wrap: nowrap;
        }
        .connect-icon {
          width: 44px;
          height: 44px;
          display: inline-grid;
          place-items: center;
          border-radius: 10px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 6px 18px rgba(2,6,23,0.06);
          transition: transform .18s cubic-bezier(.2,.9,.2,1), box-shadow .18s ease, background .18s ease;
          cursor: pointer;
          text-decoration: none;
          -webkit-tap-highlight-color: transparent;
        }
        .connect-icon:focus { outline: 3px solid rgba(30,111,235,0.12); outline-offset: 3px; }
        .connect-icon img, .connect-icon svg { width: 20px; height: 20px; display: block; }

        /* hover glow variants */
        .connect-icon:hover {
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 18px 50px rgba(2,6,23,0.16);
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
        }

        /* subtle color accents kept professional */
        .ci-github { color: #fff; background: linear-gradient(180deg, rgba(0,0,0,0.28), rgba(0,0,0,0.14)); }
        .ci-linkedin { color: #0a66c2; background: linear-gradient(180deg, rgba(14,118,168,0.06), rgba(14,118,168,0.03)); }
        .ci-ig { color: #e4405f; background: linear-gradient(180deg, rgba(233,86,86,0.06), rgba(240,160,80,0.03)); }
        .ci-yt { color: #ff3333; background: linear-gradient(180deg, rgba(220,65,65,0.06), rgba(220,100,100,0.03)); }
        .ci-mail { color: #2b6cb0; background: linear-gradient(180deg, rgba(90,120,200,0.04), rgba(90,120,200,0.02)); }
        .ci-leet { color: #2a9d8f; background: linear-gradient(180deg, rgba(120,200,120,0.04), rgba(120,200,120,0.02)); }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .connect-icon { transition: none; transform: none; }
        }

        /* responsive: shrink icons a bit on small screens */
        @media (max-width: 720px) {
          .connect-icon { width: 40px; height: 40px; border-radius: 9px; }
          .connect-icon img, .connect-icon svg { width: 18px; height: 18px; }
        }
      `}</style>

      <div className="hero-left">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div className="brand-logo" style={{ width: 46, height: 46 }}>
            <img
              src="/assets/logo-symbol.png"
              alt="Arc of Nilam logo"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>Arc of Nilam</div>
          </div>
        </div>

        {/* Animated headline */}
        <AnimatedHeadline
          text={"Hi, Nilam Here,         Welcoming you to myPortfolio"}
        />

        <p className="lead">
          I’m a MERN Fullstack Developer and DevOps professional passionate
          about harnessing Cloud, AI, and Data Science to build projects that
          simplify everyday life.
        </p>

        {/* CTA row */}
        <div
          className="cta-row"
          style={{
            marginTop: 18,
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <AnimatedButton variant="flame" onClick={() => scrollToId("about")}>
            About Me
          </AnimatedButton>
          <AnimatedButton variant="rain" onClick={() => scrollToId("projects")}>
            Projects
          </AnimatedButton>
          <AnimatedButton variant="nature" onClick={() => scrollToId("tech")}>
            Tech Stack
          </AnimatedButton>
          <AnimatedButton variant="glass" onClick={() => scrollToId("contact")}>
            Contact
          </AnimatedButton>
        </div>

        {/* SOCIAL ICONS: GitHub, LinkedIn, Instagram, YouTube, Email, LeetCode */}
        <div className="connect-icons" role="navigation" aria-label="social links">
          <a
            className="connect-icon ci-github"
            href="https://github.com/NilamXSC"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <img
              src="/assets/social/github.svg"
              alt="GitHub"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <a
            className="connect-icon ci-linkedin"
            href="https://www.linkedin.com/in/chakrabortynilam9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <img
              src="/assets/social/linkedin.svg"
              alt="LinkedIn"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <a
            className="connect-icon ci-ig"
            href="https://www.instagram.com/nilam.jackdaw7"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            title="Instagram"
          >
            <img
              src="/assets/social/instagram.svg"
              alt="Instagram"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <a
            className="connect-icon ci-yt"
            href="https://www.youtube.com/@raidenxd7482"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            title="YouTube"
          >
            <img
              src="/assets/social/youtube.svg"
              alt="YouTube"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <a
            className="connect-icon ci-mail"
            href="mailto:chakrabortynilam88@gmail.com"
            aria-label="Email"
            title="Email"
          >
            <img
              src="/assets/social/mail.svg"
              alt="Email"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <a
            className="connect-icon ci-leet"
            href="https://leetcode.com/u/nilamxsc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LeetCode"
            title="LeetCode"
          >
            <img
              src="/assets/social/leetcode.svg"
              alt="LeetCode"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg
            className="animated-line"
            viewBox="0 0 36 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              className="line-path"
              d="M18 8 C18 40 18 80 18 120 C18 160 18 184 18 192"
            />
          </svg>

          <PhotoCard
            src="/assets/profile.jpg"
            alt="Nilam Sanjib Chakraborty - Fullstack Developer"
          />
        </div>
      </div>
    </section>
  );
}