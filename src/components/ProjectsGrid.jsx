// src/components/ProjectsGrid.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

/**
 * ProjectsGrid — desktop: image left / content right
 * mobile: stacked (image above, content below)
 *
 * Image loading strategy:
 * 1) Try to resolve images from src/assets/projects via import.meta.globEager (Vite bundling).
 * 2) If not found, fall back to public path /assets/projects/<filename>.
 *
 * This makes the component resilient for both local dev and Vercel deployments.
 */

// preload anything inside src/assets/projects (jpg|jpeg|png|webp|svg)
const imagesEager = import.meta.globEager("../assets/projects/*.{png,jpg,jpeg,webp,svg}");

// build a map: "music-visualizer.jpg" -> imported URL (default export)
const bundled = {};
for (const path in imagesEager) {
  const mod = imagesEager[path];
  // extract filename
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  // modules can export default or be the URL
  bundled[filename] = mod.default || mod;
}

// helper to resolve image path from a "basename" (filename)
function resolveImg(filename) {
  if (!filename) return null;
  // If user passed a filename with leading slash remove it
  const fname = filename.replace(/^\/+/, "");
  // If bundled version exists, return it
  if (bundled[fname]) return bundled[fname];
  // else try public fallback (ensure it starts with /)
  return `/assets/projects/${fname}`;
}

const projects = [
  {
    title: "Python Music Visualizer",
    desc: "A Advance Music Visualizer with Audio-driven visuals (FFT, canvas) - dynamic patterns reacting to sound. built with Streamlit and integrated with JioSaavn.  Play music from multiple sources & Enjoy Dynamic Visuals. Also, Dont forget to play BeatSaber :)",
    img: "music-visualizer.jpg",
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc: "Chit Chat is a privacy-focused, real-time messaging application designed for secure and hassle-free communication. Built on socket-based architecture, it delivers instant chat updates, presence indicators, and group messaging, all while ensuring zero data storage on servers. The app prioritizes user anonymity and practicality, offering a seamless texting experience that masks user origins and avoids intrusive data collection. Simply create an account, invite your friends, and start chatting or forming groups, Chit Chat handles everything with speed, simplicity, and privacy in mind.",
    img: "chitchat.jpg",
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc: "A simple, fast task manager with auth and persistence. Designed for Practicality to help you going through day by day tasks & Fulfilling your needs, easy to traverse and plan your day.",
    img: "todo.jpg",
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc: "Movie Buddy is designed to be an intelligent, user-friendly application that helps users find movies and TV shows effortlessly. Instead of endlessly scrolling through lists or relying on algorithms that don’t understand your tastes, Movie Buddy acts as your personalized entertainment assistant. Discover & save movies, built with TMDB and polished UI interactions.",
    img: "moviebuddy.jpg",
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/index.html",
  },
  {
    title: "House Price Prediction",
    desc: "House Price Prediction is a machine learning project focused on building an intelligent model that accurately estimates property prices based on a variety of influencing factors such as location, area, number of rooms, amenities, and more. The goal of the project is to analyze key features affecting real estate prices and develop a predictive model capable of providing reliable price estimates, helping both buyers and sellers make more informed decisions.",
    img: "housingprice.jpg",
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me - Gym Trainer Landing Page",
    desc: "A fully responsive and visually engaging landing page designed for a personal fitness trainer brand. Built with a focus on modern UI/UX principles, it features smooth animations, interactive call-to-action (CTA) buttons, and dynamic form interactions to boost user engagement and lead conversion. The page adapts seamlessly across all devices, includes animated scroll effects, and presents key trainer details, services, testimonials, and a sign-up section, creating a professional first impression and encouraging visitors to join fitness programs.",
    img: "getfit.jpg",
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
          <b>A hand-picked projects of mine, Showcasing my Skills.</b>
        </p>
        <div className="mt-3 w-16 h-1 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_18px_var(--accent)]" />
      </div>

      <div className="grid">
        {projects.map((p, i) => {
          const direction = i % 2 === 0 ? 1 : -1; // slide-in direction
          const imgUrl = resolveImg(p.img);
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
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={p.title}
                    className="project-img"
                    onError={(e) => {
                      // if this fires, try fallback public path just in case
                      if (!imgUrl.startsWith("/assets/")) {
                        e.currentTarget.src = `/assets/projects/${p.img}`;
                        return;
                      }
                      e.currentTarget.style.display = "none";
                    }}
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