// src/components/ProjectsGrid.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

/**
 * ProjectsGrid — Vite-safe version using import.meta.globEager
 * Auto-bundles images from src/assets/projects/ so deployment works on Vercel.
 *
 * Ensure your images are in: src/assets/projects/
 * Filenames (case-sensitive) should match the keys used below (or update them).
 */

// load all images in folder at build time (Vite)
const images = import.meta.globEager("../assets/projects/*.{png,jpg,jpeg,webp,svg}");

// Build a simple map from basename (without extension) to URL
const imgMap = {};
Object.keys(images).forEach((key) => {
  // key example: "../assets/projects/music-visualizer.jpg"
  const parts = key.split("/");
  const file = parts[parts.length - 1]; // e.g. "music-visualizer.jpg"
  const name = file.replace(/\.[^/.]+$/, ""); // "music-visualizer"
  imgMap[name.toLowerCase()] = images[key].default || images[key];
});

// Projects list (images referred by "basename" key)
const projects = [
  {
    title: "Python Music Visualizer",
    desc: "A Advance Music Visualizer with Audio-driven visuals (FFT, canvas) - dynamic patterns reacting to sound. Built with Streamlit and integrated with JioSaavn.",
    imgKey: "music-visualizer",
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc: "A privacy-focused real-time messaging app using sockets, ensuring zero data storage and instant communication.",
    imgKey: "chitchat",
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc: "A simple, fast task manager with authentication and persistent data.",
    imgKey: "todo",
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc: "Discover & save movies easily using TMDB API with a clean, modern UI.",
    imgKey: "moviebuddy",
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/index.html",
  },
  {
    title: "House Price Prediction",
    desc: "A machine learning app predicting real estate prices using advanced regression models.",
    imgKey: "housingprice",
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me — Landing Page",
    desc: "A modern, responsive landing page for personal trainers with smooth animations and CTAs.",
    imgKey: "getfit",
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

  // title per-letter animation (subtle)
  const titleContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.03, delayChildren: 0.04 } },
  };
  const titleChar = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.26 } },
  };

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
          const direction = i % 2 === 0 ? 1 : -1; // slide-in direction
          const imgSrc = imgMap[p.imgKey?.toLowerCase()] || null;

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
              {/* Left: media */}
              <div className="project-media">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={p.title}
                    className="project-img"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : (
                  <div className="project-img project-img--placeholder" />
                )}
              </div>

              {/* Right: content */}
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
                  {Array.from(p.title).map((ch, idx) => {
                    const key = `${p.title}-${idx}`;
                    const display = ch === " " ? "\u00A0" : ch;
                    return (
                      <motion.span
                        key={key}
                        className="inline-block"
                        variants={titleChar}
                        style={{ display: "inline-block" }}
                        aria-hidden
                      >
                        {display}
                      </motion.span>
                    );
                  })}
                </motion.h3>

                <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">
                  {p.desc}
                </p>

                <div className="flex gap-5 items-center">
                  {p.live ? (
                    <a className="cta-primary" href={p.live} target="_blank" rel="noreferrer">
                      Live
                    </a>
                  ) : (
                    <span className="cta-ghost" aria-hidden style={{ opacity: 0.75 }}>
                      No demo
                    </span>
                  )}

                  <a className="cta-ghost" href={p.github} target="_blank" rel="noreferrer">
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