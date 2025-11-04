import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";


const projects = [
  {
    title: "Python Music Visualizer",
    desc: "An advanced Music Visualizer with audio-driven visuals (FFT, canvas) — dynamic patterns reacting to sound. Built with Streamlit and integrated with JioSaavn. Also Dont forget to try BeatSaber :)",
    img: "/assets/projects/music-visualizer.JPG",
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc: "ChitChat is a privacy-focused realtime messaging app built on secure socket connections, enabling instant communication with zero data storage. Every message is encrypted end-to-end and transmitted directly between users, never stored on servers or in the cloud. Once delivered, conversations disappear completely, leaving no trace, no logs, and no history. ChitChat redefines real-time messaging with a sleek, fast, and truly ephemeral chat experience that prioritizes your privacy above all else.",
    img: "/assets/projects/chitchat.JPG",
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc: "Todo is a lightweight, fast task manager with built-in authentication and reliable persistent storage, perfect for getting things done without the bloat. It’s focused on speed, simplicity, and secure access so users can create, organize, and sync tasks across devices with no fuss.",
    img: "/assets/projects/todo.JPG",
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc: "Movie Buddy is your answer when gettind bored and you need to watch some stuff but google doesnot really help you with that, it helps users discover, organize, and enjoy movies with friends. Fast, simple, and social, it combines personalized recommendations, watchlists, and lightweight watch-party features with secure sign-in and persistent data so nothing gets lost.",
    img: "/assets/projects/moviebuddy.JPG",
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/index.html",
  },
  {
    title: "House Price Prediction",
    desc: "This is a machine-learning project that ingests real estate features, trains advanced regression ensembles (XGBoost / LightGBM / CatBoost and neural nets), and returns instant price estimates with uncertainty and interpretability. Trained on a curated Kaggle dataset, it provides interactive visualizations, local explanations (SHAP), and deployment-ready models so users can test scenarios and see why a prediction was made.",
    img: "/assets/projects/housingprice.JPG",
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me - Trainer Landing Page",
    desc: "GetFit is a modern, fully responsive landing page designed specifically for personal trainers, fitness coaches, and wellness professionals who want to establish a strong online presence and attract more clients. With sleek design aesthetics, smooth animations, and conversion-optimized call-to-actions (CTAs), GetFit seamlessly combines style, speed, and functionality to deliver an exceptional user experience.",
    img: "/assets/projects/getfit.JPG",
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
                    onError={(e) => (e.currentTarget.style.display = "none")}
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
