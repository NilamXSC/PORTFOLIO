import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import AnimatedHeadline from "./AnimatedHeadline";

export default function About() {
  const reduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12, duration: 1.1 },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-transparent py-16"
    >
      <style>{`
        .about-card {
          position: relative;
          background: var(--card);
          border-radius: 18px;
          padding: 28px;
          box-shadow:
            0 8px 30px rgba(2,6,23,0.06),
            0 0 40px rgba(30,111,235,0.04),
            inset 0 1px 0 rgba(255,255,255,0.02);
          border: 1px solid var(--glass);
        }

        .about-card::before {
          content: "";
          position: absolute;
          inset: -12px;
          border-radius: 22px;
          background: linear-gradient(90deg, rgba(30,111,235,0.03), rgba(0,168,132,0.02));
          z-index: -1;
          filter: blur(14px);
          opacity: 0.95;
        }

        @media (max-width: 900px) {
          .about-card { padding: 18px; border-radius: 14px; }
          .about-card::before { inset: -10px; filter: blur(10px); }
        }
      `}</style>

      <div className="w-[92%] max-w-[1200px] mx-auto">
        <div className="w-full min-h-[85vh] flex items-center justify-center">
          <motion.div
            className="about-card text-[var(--text)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={containerVariants}
            aria-labelledby="about-heading"
          >
            <div className="text-center mb-8">
              <AnimatedHeadline
                text="About Me"
                className="text-5xl md:text-7xl font-extrabold text-center tracking-tight text-[var(--text)]"
              />
              <div className="mt-2 w-16 h-1 bg-[var(--accent)] mx-auto rounded-full shadow-[0_0_18px_var(--accent)]" />
            </div>

            <motion.div
              className="prose max-w-none"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <p className="text-base md:text-lg leading-relaxed text-[var(--text)]">
                Hello, I am <strong className="text-[var(--accent)]">Nilam Chakraborty</strong>, a Full-Stack Developer and a student in Computer Science & Engineering from India. With a passion for building impact-driven, user-centric scalable digital solutions, I work with the MERN stack to bridge the gap between intuitive design and robust backend architecture, hence delivering seamless, high-performance web applications.
              </p>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--text)]">
                My practice lies at the crossroads of FullStack Development, cloud infrastructure, and intelligent automation to develop tools that make technology more human-centered. From developing real-time messaging apps and predictive AI models to designing privacy-first, production-grade systems, I try to solve complex problems with precision and creativity.
              </p>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--text)]">
                Beyond coding, I am interested in DevOps and cloud deployment-continuously improving workflows through containerization, CI/CD pipelines, and optimized cloud environments.
              </p>

              <p className="mt-4 text-base md:text-lg leading-relaxed text-[var(--text)]">
                I'm always learning, iterating, and collaborating to build systems that don't just function but leave a lasting impression to the user.
              </p>

              
             <div className="mt-10">
                <h3 className="text-2xl font-semibold text-[var(--text)] mb-4">
                  Core Skills
                </h3>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-3">
                  {[
                    "React + Vite \u00A0",
                    "Node.js / Fastify \u00A0",
                    "Socket.IO (Real-time) \u00A0",
                    "Prisma + PostgreSQL \u00A0",
                    "MERN Stack \u00A0",
                    "Docker / CI-CD \u00A0",
                    "Render & Vercel \u00A0",
                    "Zustand & React Query \u00A0",
                    "ML/DL & GenAI \u00A0",
                    "Security & Privacy",
                  ].map((s) => (
                    <span
                      key={s}
                      className="inline-block px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-slate-100 hover:bg-[var(--accent)]/20 hover:scale-105 transition-all duration-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-[var(--text)] mb-3">
                  Selected Highlights
              </h3>

              <ul className="list-disc list-inside text-base md:text-lg leading-relaxed text-[var(--muted)] space-y-2 mt-4">
                <li>
                  Designed and deployed a privacy-first real-time chat app by implementing IP masking and no hardware storage using Fastify + Socket.IO, Prisma + Postgres, hosted on Render & Vercel.
                </li>
                <li>
                  Worked on "AirRakshak 5G" project by Amantya Technologies on "Deepening Of Scientific Research On 5G Use Cases".
                </li>
                <li>
                  Participated in NER Hackathon & GDG DevFest; prototyped AI-powered solutions for healthcare and low-latency 5G use-cases.
                </li>
                <li>
                  Worked as an intern with Assam Sale Tax Department, Kar Bhawan, in the development of a real-time data visualization dashboard on tax analytics based on React and Chart.js.
                </li>
              </ul>

              <p className="mt-10 text-sm md:text-base text-[var(--muted)] max-w-2xl leading-relaxed">
                I also enjoy mentoring, collaborating on open-source projects, and crafting delightfully simple user experiences out of complex ideas. If you'd like to collaborate or review my code, please feel free to get in touch.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
