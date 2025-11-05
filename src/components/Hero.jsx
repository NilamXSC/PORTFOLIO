// src/components/Hero.jsx
import React from "react";
import PhotoCard from "./PhotoCard";
import AnimatedButton from "./AnimatedButton";
import AnimatedHeadline from "./AnimatedHeadline";

/* Import assets from src so Vite bundles them */
import profileImg from "../assets/profile.jpg";
import githubIcon from "../assets/social/github.svg";
import linkedinIcon from "../assets/social/linkedin.svg";
import instagramIcon from "../assets/social/instagram.svg";
import youtubeIcon from "../assets/social/youtube.svg";
import mailIcon from "../assets/social/mail.svg";
import leetcodeIcon from "../assets/social/leetcode.svg";

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
        /* Base layout - desktop */
        .hero-outer {
          display: flex;
          gap: 28px;
          align-items: center;
          justify-content: space-between;
          padding: 36px 12px;
        }

        .hero-left {
          flex: 1 1 60%;
          min-width: 0;
        }

        .hero-right {
          width: 40%;
          display:flex;
          align-items:center;
          justify-content:center;
        }

        /* Headline container sizing controlled by AnimatedHeadline but we add responsive safeties */
        .hero-headline {
          margin: 6px 0 12px 0;
          display:flex;
          flex-direction:column;
          gap: 10px; /* visible gap between the animated lines */
          align-items:flex-start; /* LEFT align on desktop */
        }

        /* center the headline on small screens (overridden in mobile media query) */
        .hero-headline--center { align-items:center; text-align:center; }

        /* CTA row - desktop horizontal */
        .cta-row {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: min-content;
          gap: 12px;
          align-items: center;
          margin-top: 18px; /* gap between intro and buttons */
        }

        /* Social icons row */
        .connect-icons {
          display: flex;
          gap: 12px;
          margin-top: 22px; /* increased gap between buttons and icons */
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
        .connect-icon img { width: 20px; height: 20px; display: block; filter: none; }

        .connect-icon:hover {
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 18px 50px rgba(2,6,23,0.16);
          background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
        }

        /* Animated vertical divider (kept as in original) */
        .animated-line { width: 36px; height: 200px; display:block; }

        /* PhotoCard container rules */
        .photo-wrap { display:flex; align-items:center; justify-content:center; }

        /* Responsive rules (mobile-first adjustments) */
        @media (max-width: 980px) {
          .hero-outer {
            gap: 18px;
            padding: 28px 12px;
          }
          .hero-right { width: 46%; }
        }

        @media (max-width: 720px) {
          /* Stack the layout vertically on small screens */
          .hero-outer {
            flex-direction: column;
            align-items: stretch;
            padding: 20px 12px 36px 12px;
            gap: 18px;
          }
          .hero-left {
            order: 1;
            width: 100%;
            text-align: center;
            padding: 0 6px;
          }
          .hero-right {
            order: 2;
            width: 100%;
            display:flex;
            justify-content:center;
            margin-top: 6px;
          }

          /* headline: smaller and better line-height; center on mobile */
          .hero-headline { align-items:center; text-align:center; gap: 8px; }
          .hero-headline .animated-headline__visual,
          .hero-headline h1, 
          .hero-headline h2 {
            font-size: 34px !important;
            line-height: 1.02 !important;
            letter-spacing: -0.4px;
          }

          /* CTA: two column grid to avoid huge vertical stack */
          .cta-row {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
            justify-items: center;
            margin: 14px auto 0;
            max-width: 420px;
          }

          /* Make buttons full width in the grid cells */
          .cta-row .btn {
            width: 100%;
            max-width: 320px;
          }

          /* Social icons: center and slightly bigger for touch */
          .connect-icons {
            justify-content: center;
            gap: 14px;
            margin-top: 18px;
          }
          .connect-icon { width: 48px; height: 48px; border-radius: 12px; }
          .connect-icon img { width: 22px; height: 22px; }

          /* Photo sizing: make the profile card smaller and center */
          .photo-wrap { padding: 6px 8px 18px; }
          .photo-wrap .photo-card { width: min(86vw, 360px); }
        }

        /* tiny screens */
        @media (max-width: 420px) {
          .hero-headline .animated-headline__visual,
          .hero-headline h1, 
          .hero-headline h2 {
            font-size: 28px !important;
            line-height: 1.04 !important;
          }
          .cta-row { gap: 10px; margin-top: 12px; }
          .connect-icons { gap: 10px; margin-top: 12px; }
        }
      `}</style>

      <div className="hero-left">
        {/* logo + heading removed as requested */}

        {/* Animated headline — three separate lines to keep them stable and exact */}
        {/* NOTE: left aligned on desktop (align-items:flex-start), centered on mobile via media query */}
        <div className="hero-headline" aria-hidden>
          <AnimatedHeadline text={"Hi, Nilam Here,"} />
          <AnimatedHeadline text={"Welcoming You To My"} />
          <AnimatedHeadline text={"Portfolio"} />
        </div>

        {/* visible gap before the intro */}
        <div style={{ height: 12 }} aria-hidden />

        <p className="lead" style={{ maxWidth: 820, margin: "8px 0 0", textAlign: "left" }}>
          I’m a MERN Fullstack & Python Dev, Passionate about Cloud DevOps with interest in ML/DL & Gen AI.
        </p>

        {/* visible gap between intro and buttons */}
        <div style={{ height: 12 }} aria-hidden />

        {/* CTA row */}
        <div className="cta-row" style={{ marginTop: 18 }}>
          <AnimatedButton variant="flame" onClick={() => scrollToId("about")}>About Me</AnimatedButton>
          <AnimatedButton variant="rain" onClick={() => scrollToId("projects")}>Projects</AnimatedButton>
          <AnimatedButton variant="nature" onClick={() => scrollToId("tech")}>Tech Stack</AnimatedButton>
          <AnimatedButton variant="glass" onClick={() => scrollToId("contact")}>Contact</AnimatedButton>
        </div>

        {/* small gap between buttons and icons */}
        <div style={{ height: 8 }} aria-hidden />

        {/* SOCIAL ICONS: GitHub, LinkedIn, Instagram, YouTube, Email, LeetCode */}
        <div className="connect-icons" role="navigation" aria-label="social links">
          <a className="connect-icon ci-github" href="https://github.com/NilamXSC" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
            <img src={githubIcon} alt="GitHub" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>

          <a className="connect-icon ci-linkedin" href="https://www.linkedin.com/in/chakrabortynilam9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
            <img src={linkedinIcon} alt="LinkedIn" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>

          <a className="connect-icon ci-ig" href="https://www.instagram.com/nilam.jackdaw7" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
            <img src={instagramIcon} alt="Instagram" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>

          <a className="connect-icon ci-yt" href="https://www.youtube.com/@raidenxd7482" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
            <img src={youtubeIcon} alt="YouTube" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>

          <a className="connect-icon ci-mail" href="mailto:chakrabortynilam88@gmail.com" aria-label="Email" title="Email">
            <img src={mailIcon} alt="Email" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>

          <a className="connect-icon ci-leet" href="https://leetcode.com/u/nilamxsc/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode" title="LeetCode">
            <img src={leetcodeIcon} alt="LeetCode" onError={(e)=> e.currentTarget.style.display='none'} />
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg className="animated-line" viewBox="0 0 36 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path className="line-path" d="M18 8 C18 40 18 80 18 120 C18 160 18 184 18 192" stroke="rgba(30,111,235,0.6)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          <div className="photo-wrap">
            <PhotoCard
              src={profileImg}
              alt="Nilam Sanjib Chakraborty - Fullstack Developer"
              style={{ maxWidth: "480px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
