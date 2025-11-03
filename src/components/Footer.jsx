import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="backdrop-blur-md bg-[var(--card)]/40 border-t border-[var(--glass)] text-[var(--muted)] py-6 mt-16"
      style={{
        boxShadow: "0 -10px 30px rgba(2,6,23,0.06)",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="container-site flex flex-col items-center justify-center text-center text-sm md:text-base space-y-2">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[var(--muted)]"
        >
          © {new Date().getFullYear()} All rights reserved.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-semibold"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,111,235,1) 0%, rgba(16,185,129,1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Designed by Nilam Chakraborty
        </motion.p>
      </div>
    </footer>
  );
}