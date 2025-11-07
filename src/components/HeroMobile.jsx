// src/components/HeroMobile.jsx
import React, { useEffect, useState } from "react";
import AnimatedButton from "./AnimatedButton";
import AnimatedHeadline from "./AnimatedHeadline";
import PhotoCard from "./PhotoCard";

import githubIcon from "../assets/social/github.svg";
import linkedinIcon from "../assets/social/linkedin.svg";
import instagramIcon from "../assets/social/instagram.svg";
import youtubeIcon from "../assets/social/youtube.svg";
import mailIcon from "../assets/social/mail.svg";
import leetcodeIcon from "../assets/social/leetcode.svg";
import profileImg from "../assets/profile.jpg";

/**
 * HeroMobile — mobile-only hero layout
 *
 * - Renders only on small screens (<= 720px).
 * - Omits brand/logo and "Arc of Nilam" label.
 * - Animated headline split across three lines:
 *    1) Hi, Nilam Here,
 *    2) Welcoming you to
 *    3) My Portfolio
 * - Stacked CTAs with visible gaps, social icons centered below.
 */

export default function HeroMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function check() {
      setIsMobile(typeof window !== "undefined" ? window.innerWidth <= 720 : false);
    }
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // scroll helper (same behavior as desktop)
  const scrollToId = (id, offset = 72) => {
    const el = document.getElementById(id);
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const absoluteY = rect.top + window.scrollY;
    const targetY = Math.max(0, absoluteY - offset);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  if (!isMobile) return null;

  return (
    <section id="home-mobile" className="hero-mobile container-site" aria-hidden={false}>
      <style>{`
        .hero-mobile {
          padding: 20px 12px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          justify-content: flex-start;
          max-width: 920px;
          margin: 0 auto;
        }

        .mobile-head {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: center;
          width: 100%;
        }
        .mobile-head .line {
          font-weight: 800;
          color: var(--text);
          font-size: 34px;
          line-height: 1.02;
          letter-spacing: -0.4px;
        }

        @media (max-width: 420px) {
          .mobile-head .line { font-size: 28px; }
        }

        .mobile-sub {
          max-width: 92%;
          text-align: center;
          color: var(--muted);
          font-size: 15px;
          line-height: 1.6;
          margin: 6px auto 0;
        }

        .mobile-cta {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 14px;
          justify-items: center;
        }
        .mobile-cta .btn {
          width: min(92%, 420px);
        }

        .mobile-socials {
          display: flex;
          gap: 12px;
          margin-top: 14px;
          justify-content: center;
          width: 100%;
        }
        .mobile-social {
          width: 52px;
          height: 52px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.03);
          box-shadow: 0 10px 24px rgba(2,6,23,0.06);
          transition: transform .14s ease, box-shadow .14s ease;
        }
        .mobile-social img { width: 22px; height: 22px; display:block; }

        .mobile-social:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 64px rgba(2,6,23,0.12);
          background: linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01));
        }

        .mobile-photo-wrap {
          width: 92%;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-top: 8px;
        }
        .mobile-photo-wrap .photo-card { width: 100%; max-width: 420px; }
      `}</style>

      <div className="mobile-head" role="heading" aria-level={1}>
        <div className="line" aria-hidden>
          <AnimatedHeadline text="Hi, Nilam Here," />
        </div>
        <div className="line" aria-hidden>
          <AnimatedHeadline text="Welcoming you to" />
        </div>
        <div className="line" aria-hidden>
          <AnimatedHeadline text="My Portfolio" />
        </div>
      </div>

      <div className="mobile-sub">
        I’m a MERN Full-Stack Developer and DevOps professional passionate about harnessing Cloud, AI, and Data Science to build projects that simplify everyday life.
      </div>

      <div className="mobile-cta" role="navigation" aria-label="Primary actions">
        <AnimatedButton className="btn" variant="flame" onClick={() => scrollToId("about")}>About Me</AnimatedButton>
        <AnimatedButton className="btn" variant="rain" onClick={() => scrollToId("projects")}>Projects</AnimatedButton>
        <AnimatedButton
          className="btn"
          variant="sun"
          onClick={() => scrollToId("services")}
          style={{ width: "min(86%, 380px)" }}
        >
          Services
        </AnimatedButton>
        <AnimatedButton className="btn" variant="nature" onClick={() => scrollToId("tech")}>Tech Stack</AnimatedButton>
        <AnimatedButton className="btn" variant="glass" onClick={() => scrollToId("contact")}>Contact</AnimatedButton>
      </div>

      <div className="mobile-socials" role="navigation" aria-label="Social links">
        <a className="mobile-social" href="https://github.com/NilamXSC" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src={githubIcon} alt="GitHub" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
        <a className="mobile-social" href="https://www.linkedin.com/in/chakrabortynil9/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src={linkedinIcon} alt="LinkedIn" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
        <a className="mobile-social" href="https://www.instagram.com/nilam.jackdaw7" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <img src={instagramIcon} alt="Instagram" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
        <a className="mobile-social" href="https://www.youtube.com/@raidenxd7482" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <img src={youtubeIcon} alt="YouTube" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
        <a className="mobile-social" href="mailto:chakrabortynil88@gmail.com" aria-label="Email">
          <img src={mailIcon} alt="Email" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
        <a className="mobile-social" href="https://leetcode.com/u/nilamxsc/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
          <img src={leetcodeIcon} alt="LeetCode" onError={(e) => (e.currentTarget.style.display = "none")} />
        </a>
      </div>

      <div className="mobile-photo-wrap">
        <PhotoCard src={profileImg} alt="Nilam Sanjib Chakraborty — Fullstack Developer" />
      </div>
    </section>
  );
}
