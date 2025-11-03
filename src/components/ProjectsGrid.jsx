// src/components/ProjectsGrid.jsx
import React, { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

/* --- Vite-friendly imports using import.meta.url --- */
const imgMusic = new URL("../assets/projects/music-visualizer.jpg", import.meta.url).href;
const imgChitchat = new URL("../assets/projects/chitchat.jpg", import.meta.url).href;
const imgTodo = new URL("../assets/projects/todo.jpg", import.meta.url).href;
const imgMovie = new URL("../assets/projects/moviebuddy.jpg", import.meta.url).href;
const imgHouse = new URL("../assets/projects/housingprice.jpg", import.meta.url).href;
const imgGetfit = new URL("../assets/projects/getfit.jpg", import.meta.url).href;

/* small placeholder in case an image fails to load (also from src so bundled) */
const placeholder = new URL("../assets/projects/placeholder.jpg", import.meta.url).href;

/**
 * ProjectsGrid — desktop: image left / content right
 * mobile: stacked (image above, content below)
 */

const projects = [
  {
    title: "Python Music Visualizer",
    desc:
      "A Advance Music Visualizer with Audio-driven visuals (FFT, canvas) - dynamic patterns reacting to sound. built with Streamlit and integrated with JioSaavn. Play music from multiple sources & Enjoy Dynamic Visuals. Also, Dont forget to play BeatSaber :)",
    img: imgMusic,
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc:
      "Chit Chat is a privacy-focused, real-time messaging application designed for secure and hassle-free communication. Built on socket-based architecture, it delivers instant chat updates, presence indicators, and group messaging, all while ensuring zero data storage on servers. The app prioritizes user anonymity and practicality, offering a seamless texting experience that masks user origins and avoids intrusive data collection. Simply create an account, invite your friends, and start chatting or forming groups, Chit Chat handles everything with speed, simplicity, and privacy in mind.",
    img: imgChitchat,
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc:
      "A simple, fast task manager with auth and persistence. Designed for Practicality to help you going through day by day tasks & Fulfilling your needs, easy to traverse and plan your day.",
    img: imgTodo,
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc:
      "Movie Buddy is designed to be an intelligent, user-friendly application that helps users find movies and TV shows effortlessly. Instead of endlessly scrolling through lists or relying on algorithms that don’t understand your tastes, Movie Buddy acts as your personalized entertainment assistant. Discover & save movies, built with TMDB and polished UI interactions.",
    img: imgMovie,
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/index.html",
  },
  {
    title: "House Price Prediction",
    desc:
      "House Price Prediction is a machine learning project focused on building an intelligent model that accurately estimates property prices based on a variety of influencing factors such as location, area, number of rooms, amenities, and more. The goal of the project is to analyze key features affecting real estate prices and develop a predictive model capable of providing reliable price estimates, helping both buyers and sellers make more informed decisions.",
    img: imgHouse,
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me - Gym Trainer Landing Page",
    desc:
      "A fully responsive and visually engaging landing page designed for a personal fitness trainer brand. Built with a focus on modern UI/UX principles, it features smooth animations, interactive call-to-action (CTA) buttons, and dynamic form interactions to boost user engagement and lead conversion. The page adapts seamlessly across all devices, includes animated scroll effects, and presents key trainer details, services, testimonials, and a sign-up section, creating a professional first impression and encouraging visitors to join fitness programs.",
    img: imgGetfit,
    github: "https://github.com/NilamXSC/getfitwithme",
    live: "https://getfitwithme.vercel.app/",
  },
];

export default function ProjectsGrid() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // Diagnostic: check each image by creating an Image() and watching load/error
    projects.forEach((p) => {
      const check = new Image();
      check.src = p.img;
      check.onload = () => {
        console.log("[ProjectsGrid] image loaded:", p.img);
      };
      check.onerror = (err) => {
        console.error("[ProjectsGrid] image FAILED to load:", p.img, err);
      };
    });
  }, []);

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
    <section id="projects" className="section-gap container-site relative z-10 text-[var(--text)]">
      <div className="text-center mb-8">
        <AnimatedHeadline text="Featured Projects" className="text-4xl md:text-5xl font-extrabold mb-3" />
        <p className="text-[var(--muted)] max-w-xl mx-auto text-base md:text-lg">
          <b>A hand-picked projects of mine, Showcasing my Skills.</b>
        </p>
        <div className="mt-3 w-16 h-1 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_18px_var(--accent)]" />
      </div>

      <div className="grid">
        {projects.map((p, i) => {
          const direction = i % 2 === 0 ? 1 : -1; // slide-in direction
          return (
            <motion.article
              key={p.title}
              custom={direction}
              initial={reduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.24 }}
              variants={cardVariants}
              className="project-card card rounded-2xl overflow-hidden bg-[var(--card)]"
              style={{ marginBottom: "2.5rem" }} // 👈 added vertical gap between projects
            >
              {/* Left: media */}
              <div className="project-media">
                {p.img ? (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="project-img"
                    onError={(e) => {
                      console.error("[ProjectsGrid] onError replacing", p.img, "with placeholder");
                      e.currentTarget.src = placeholder;
                      e.currentTarget.style.objectFit = "cover";
                    }}
                    style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
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

                <p className="text-[var(--muted)] text-sm mb-4 leading-relaxed">{p.desc}</p>

                {/* ✅ Button spacing */}
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
