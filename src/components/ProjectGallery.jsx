// src/components/ProjectGallery.jsx
import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * ProjectGallery.jsx
 * - Independent image-rendering component
 * - Reads images from both src/assets/projects and public/assets/projects
 * - Includes scoped CSS styling (no global edits)
 * - Handles smooth animations and fallback logic
 */

// Preload all images in src/assets/projects (Vite-safe)
const localImages = import.meta.globEager("../assets/projects/*.{png,jpg,jpeg,webp,svg}");
const imageMap = {};
for (const path in localImages) {
  const parts = path.split("/");
  const filename = parts[parts.length - 1];
  imageMap[filename] = localImages[path].default || localImages[path];
}

// Helper: get image URL from filename
function getImage(filename) {
  if (!filename) return null;
  if (imageMap[filename]) return imageMap[filename]; // from src/assets
  return `/assets/projects/${filename}`; // fallback to public
}

// Project data
const PROJECTS = [
  {
    title: "Python Music Visualizer",
    desc: "Audio-driven visuals reacting to sound. Built with Streamlit and integrated with JioSaavn.",
    img: "music-visualizer.jpg",
    github: "https://github.com/NilamXSC/Music-visualizer",
    live: "https://music-visualizer-hxuorbfc6jxffrzaujna37.streamlit.app",
  },
  {
    title: "ChitChat Messaging App",
    desc: "A privacy-first real-time chat app with sockets, presence indicators, and no data storage.",
    img: "chitchat.jpg",
    github: "https://github.com/NilamXSC/chitchat-textapp",
    live: "https://discord-mock-client.vercel.app/",
  },
  {
    title: "ToDo App",
    desc: "A minimalistic task manager with persistence and user authentication.",
    img: "todo.jpg",
    github: "https://github.com/NilamXSC/todo",
    live: "https://todo-nu-pearl.vercel.app/",
  },
  {
    title: "Movie Buddy",
    desc: "Discover & save movies with TMDB API. Personalized entertainment, sleek UI.",
    img: "moviebuddy.jpg",
    github: "https://github.com/NilamXSC/movie-buddy",
    live: "https://movie-buddy-taupe-rho.vercel.app/",
  },
  {
    title: "House Price Prediction",
    desc: "Predicts property prices using ML models based on various features.",
    img: "housingprice.jpg",
    github: "https://github.com/NilamXSC/housingPrice-prediction",
    live: "https://housingprice-predictionbynilam.streamlit.app/",
  },
  {
    title: "Get Fit With Me — Landing Page",
    desc: "A gym trainer landing page with animations and responsive UI.",
    img: "getfit.jpg",
    github: "https://github.com/NilamXSC/getfitwithme",
    live: "https://getfitwithme.vercel.app/",
  },
];

export default function ProjectGallery() {
  const reduceMotion = useReducedMotion();

  const cardVariants = {
    hidden: (dir = 1) => ({
      opacity: 0,
      x: dir * 120,
      scale: 0.96,
    }),
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 90, damping: 16, duration: 0.7 },
    },
  };

  return (
    <section className="project-gallery">
      <style>{`
        .project-gallery {
          display: grid;
          gap: 2.5rem;
          margin-top: 2rem;
        }
        .proj-card {
          background: var(--card);
          border-radius: 16px;
          border: 1px solid var(--glass);
          box-shadow: 0 10px 30px rgba(2,6,23,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform .3s ease, box-shadow .3s ease;
        }
        .proj-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 60px rgba(2,6,23,0.12);
        }
        .proj-img {
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-bottom: 1px solid var(--glass);
        }
        .proj-content {
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .proj-title {
          font-weight: 700;
          font-size: 1.15rem;
          margin-bottom: 6px;
          color: var(--text);
        }
        .proj-desc {
          color: var(--muted);
          font-size: 0.95rem;
          line-height: 1.45;
          margin-bottom: 12px;
        }
        .proj-actions {
          display: flex;
          gap: 14px;
          margin-top: auto;
        }
        .btn {
          display: inline-block;
          padding: 8px 16px;
          font-weight: 600;
          font-size: 0.9rem;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-live {
          background: linear-gradient(180deg, var(--accent), var(--accent-2));
          color: #fff;
          box-shadow: 0 6px 18px rgba(30,111,235,0.14);
        }
        .btn-live:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 40px rgba(30,111,235,0.16);
        }
        .btn-code {
          border: 1px solid var(--glass);
          background: rgba(255,255,255,0.02);
          color: var(--text);
        }
        .btn-code:hover {
          background: rgba(255,255,255,0.05);
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .proj-img { height: 220px; }
        }
      `}</style>

      {PROJECTS.map((p, i) => {
        const direction = i % 2 === 0 ? 1 : -1;
        const imgSrc = getImage(p.img);
        return (
          <motion.div
            key={p.title}
            custom={direction}
            initial={reduceMotion ? "visible" : "hidden"}
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={cardVariants}
            className="proj-card"
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={p.title}
                className="proj-img"
                onError={(e) => {
                  if (!imgSrc.startsWith("/assets/"))
                    e.currentTarget.src = `/assets/projects/${p.img}`;
                  else e.currentTarget.style.display = "none";
                }}
              />
            )}
            <div className="proj-content">
              <div>
                <div className="proj-title">{p.title}</div>
                <div className="proj-desc">{p.desc}</div>
              </div>
              <div className="proj-actions">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-live">
                    Live
                  </a>
                )}
                <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-code">
                  Code
                </a>
              </div>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}