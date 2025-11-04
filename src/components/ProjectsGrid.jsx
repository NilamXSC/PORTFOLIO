// src/components/ProjectsGrid.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

/**
 * ProjectsGrid — Final Deployment-Safe Version
 * Uses public/assets/projects/... for all images.
 * Works on localhost + Vercel. If lowercase .jpg fails, it retries with .JPG.
 */

const projects = [
  {
    title: "Python Music Visualizer",
    desc: "A Advance Music Visualizer with Audio-driven visuals (FFT, canvas) - dynamic patterns reacting to sound. Built with Streamlit and integrated with JioSaavn.",
    img: "/assets/projects/music-visualizer.jpg",
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc: "A privacy-focused real-time messaging app using sockets, ensuring zero data storage and instant communication.",
    img: "/assets/projects/chitchat.jpg",
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc: "A simple, fast task manager with authentication and persistent data.",
    img: "/assets/projects/todo.jpg",
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc: "Discover & save movies easily using TMDB API with a clean, modern UI.",
    img: "/assets/projects/moviebuddy.jpg",
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/index.html",
  },
  {
    title: "House Price Prediction",
    desc: "A machine learning app predicting real estate prices using advanced regression models.",
    img: "/assets/projects/housingprice.jpg",
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me — Landing Page",
    desc: "A modern, responsive landing page for personal trainers with smooth animations and CTAs.",
    img: "/assets/projects/getfit.jpg",
    github: "https://github.com/NilamXSC/getfitwithme",
    live: "https://getfitwithme.vercel.app/",
  },
];

export default function ProjectsGrid() {
  const reduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: (dir = 1) => ({
      opacity: 0,
      x: dir * 110,
      y: 6,
      scale: 0.995,
    }),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 88, damping: 16, duration: 0.7 },
    },
  };

  const titleContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
  };

  const titleChar = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.26 } },
  };

  // Generic onError handler that retries the same filename with capitalized .JPG
  function handleImgError(ev) {
    try {
      const img = ev.currentTarget;
      const src = img.getAttribute("src") || "";
      if (!src) return;
      // if we already tried uppercase, avoid infinite loop
      if (src.endsWith(".JPG") || src.endsWith(".PNG") || src.endsWith(".SVG")) {
        img.style.display = "none";
        return;
      }
      // try uppercase extension fallback
      if (src.match(/\.(jpg|jpeg)$/i)) {
        const altSrc = src.replace(/\.(jpg|jpeg)$/i, (m) => m.toUpperCase());
        // set a small fallback delay to ensure browser registers the change
        img.setAttribute("src", altSrc);
      } else {
        img.style.display = "none";
      }
    } catch (e) {
      // if anything goes wrong, hide the broken image so UI remains stable
      ev.currentTarget.style.display = "none";
    }
  }

  return (
    <section
      id="projects"
      className="section-gap container-site relative z-10 text-[var(--text)]"
    >
      <div className="text-center mb-8">
        <AnimatedHeadline
          text="Featured Projects"
          className="text-4xl md:text-5xl font-extrabold mb-3"
        />
        <p className="text-[var(--muted)] max-w-xl mx-auto text-base md:text-lg">
          <b>A curated collection of my fullstack projects and creative builds.</b>
        </p>
        <div className="mt-3 w-16 h-1 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_18px_var(--accent)]" />
      </div>

      <div className="grid">
        {projects.map((p, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          return (
            <motion.article
              key={p.title}
              custom={direction}
              initial={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.24 }}
              variants={cardVariants}
              className="project-card card rounded-2xl overflow-hidden bg-[var(--card)]"
              style={{ marginBottom: "2.5rem" }}
            >
              <div className="project-media">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="project-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={handleImgError}
                  />
                ) : (
                  <div className="project-img project-img--placeholder" />
                )}
              </div>

              <motion.div
                className="project-content p-5 md:p-6"
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <motion.h3
                  className="text-lg md:text-xl font-semibold mb-2 text-[var(--text)]"
                  variants={titleContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                  {Array.from(p.title).map((ch, idx) => (
                    <motion.span
                      key={`${p.title}-${idx}`}
                      className="inline-block"
                      variants={titleChar}
                      style={{ display: "inline-block" }}
                    >
                      {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                  ))}
                </motion.h3>

                <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex gap-5 items-center">
                  {p.live ? (
                    <a
                      className="cta-primary"
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live
                    </a>
                  ) : (
                    <span className="cta-ghost" aria-hidden style={{ opacity: 0.75 }}>
                      No demo
                    </span>
                  )}

                  <a
                    className="cta-ghost"
                    href={p.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Code
                  </a>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
