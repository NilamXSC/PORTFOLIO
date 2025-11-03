// src/components/CertificatesGallery.jsx
import React from "react";
import { motion } from "framer-motion";

/**
 * CertificatesGallery.jsx
 *
 * - Uses certificate images from /public/assets/certificates/
 * - Filenames used here: cert1.jpg, cert2.jpg, cert3.jpg
 * - Replace GALLERY_URL with your real gallery site.
 */

const CERTS = [
  { id: 1, src: "/assets/certificates/cert1.jpg", alt: "Certificate 1" },
  { id: 2, src: "/assets/certificates/cert2.jpg", alt: "Certificate 2" },
  { id: 3, src: "/assets/certificates/cert3.jpg", alt: "Certificate 3" },
];

// Replace with your real gallery URL
const GALLERY_URL = "https://imagyn-swart.vercel.app";

export default function CertificatesGallery() {
  return (
    <section
      id="certificates"
      className="container-site section-gap"
      aria-labelledby="certificates-heading"
      style={{ paddingTop: 28, paddingBottom: 48 }}
    >
      <style>{`
        /* Scoped styles for certificates section */
        .certs-wrap { max-width: 1100px; margin: 0 auto; }
        .certs-head { text-align: center; margin-bottom: 18px; }
        .certs-sub { color: var(--muted); max-width: 820px; margin: 6px auto 22px; font-size: 1rem; }

        .certs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          align-items: start;
        }

        .cert-card {
          background: var(--card);
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--glass);
          box-shadow: 0 12px 40px rgba(2,6,23,0.06);
          cursor: pointer;
          transform-origin: center;
          transition: transform .36s cubic-bezier(.2,.9,.2,1), box-shadow .28s ease, opacity .25s ease;
        }

        .cert-card:focus { outline: 3px solid rgba(30,111,235,0.12); outline-offset: 3px; }
        .cert-card:hover { transform: translateY(-8px); box-shadow: 0 30px 90px rgba(2,6,23,0.12); }

        .cert-thumb {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          background: linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.03));
        }

        .cert-meta {
          padding: 12px 14px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }

        .cert-title { font-size: 0.98rem; font-weight: 700; color: var(--text); }
        .cert-action {
          font-size: 0.85rem;
          color: var(--muted);
          background: transparent;
          border: 1px solid var(--glass);
          padding: 6px 10px;
          border-radius: 8px;
        }

        /* CTA area */
        .cert-cta {
          margin-top: 28px;
          text-align: center;
        }
        .cert-cta h3 { margin-bottom: 12px; font-size: 1.18rem; font-weight: 700; }
        .cert-go {
          display:inline-block;
          padding: 10px 20px;
          border-radius: 12px;
          background: linear-gradient(180deg, var(--accent), var(--accent-2));
          color: #fff;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 12px 40px rgba(30,111,235,0.12);
          transition: transform .18s ease, box-shadow .18s ease;
        }
        .cert-go:hover { transform: translateY(-4px); box-shadow: 0 22px 60px rgba(30,111,235,0.16); }

        /* Responsive */
        @media (max-width: 980px) {
          .certs-grid { grid-template-columns: repeat(2, 1fr); }
          .cert-thumb { height: 200px; }
        }
        @media (max-width: 640px) {
          .certs-grid { grid-template-columns: 1fr; }
          .cert-thumb { height: 260px; }
        }
      `}</style>

      <div className="certs-wrap">
        <header className="certs-head" id="certificates-heading">
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Certifications & Photo Gallery
          </h2>
          <p className="certs-sub"></p>
        </header>

        <div className="certs-grid" role="list">
          {CERTS.map((c) => (
            <motion.button
              key={c.id}
              className="cert-card"
              onClick={() => window.open(c.src, "_blank", "noopener")}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              aria-label={`Open ${c.alt}`}
              role="listitem"
            >
              <img src={c.src} alt={c.alt} className="cert-thumb" />
              <div className="cert-meta">
                <div className="cert-title">{c.alt}</div>
                <div className="cert-action" aria-hidden>
                  View
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="cert-cta">
          <h3>
            To explore more of my certificates press the Go button below.
          </h3>
          <a
            className="cert-go"
            href={GALLERY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open personal gallery site"
          >
            Go
          </a>
        </div>
      </div>
    </section>
  );
}