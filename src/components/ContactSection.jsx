import React, { useState, useEffect } from "react";
import * as emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const CONTACT_EMAIL = "chakrabortynilam42@gmail.com";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (PUBLIC_KEY) {
      try {
        emailjs.init(PUBLIC_KEY);
      } catch (err) {
        console.warn("EmailJS init failed", err);
      }
    }
  }, []);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(form.email.trim())) e.email = "Please enter a valid email.";
    }
    if (!form.message.trim() || form.message.trim().length < 8)
      e.message = "Please enter a message (8+ characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    setStatus(null);

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      const params = {
        from_name: form.name.trim(),
        from_email: form.email.trim(),
        message: form.message.trim(),
      };

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, params);
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } catch (err) {
        console.error("EmailJS send error:", err);
        setStatus("error");
      } finally {
        setSending(false);
      }
      return;
    }

    try {
      const subject = encodeURIComponent(`Portfolio message from ${form.name.trim()}`);
      const body = encodeURIComponent(
        `Name: ${form.name.trim()}\nEmail: ${form.email.trim()}\n\nMessage:\n${form.message.trim()}`
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("mailto fallback failed", err);
      setStatus("error");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="container-site section-gap">
      <style>{`
        .contact-card {
          max-width: 700px;
          margin: 0 auto;
          background: var(--card);
          border: 1px solid var(--glass);
          border-radius: 14px;
          padding: 36px;
          box-shadow: 0 20px 60px rgba(2,6,23,0.08);
        }
        .contact-left h2 { margin: 0 0 10px 0; font-size: 2rem; line-height: 1.05; text-align:center;}
        .contact-sub { color: var(--muted); margin-bottom: 20px; text-align:center;}

        .contact-form label { display:block; font-size: 0.9rem; margin-bottom: 8px; color: var(--muted); }
        .contact-form .field { margin-bottom: 16px; }
        .contact-form input[type="text"],
        .contact-form input[type="email"],
        .contact-form textarea {
          width: 100%;
          padding: 14px 18px;
          box-sizing: border-box;
          border-radius: 12px;
          border: 1px solid var(--glass);
          background: rgba(255,255,255,0.03);
          color: var(--text);
          font-size: 0.98rem;
          outline: none;
          transition: box-shadow .18s ease, transform .12s ease;
        }
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: rgba(255,255,255,0.45);
        }
        .contact-form input:focus, .contact-form textarea:focus {
          box-shadow: 0 8px 30px rgba(30,111,235,0.08);
          transform: translateY(-2px);
          border-color: rgba(30,111,235,0.14);
        }
        .contact-form textarea { min-height: 160px; resize: vertical; padding-top: 14px; }

        .error-text { color: #ef4444; font-size: 0.85rem; margin-top: 8px; }

        .contact-actions { display:flex; gap: 12px; align-items:center; margin-top:12px; justify-content:center;}
        .btn-send {
          background: linear-gradient(180deg, var(--accent), var(--accent-2));
          color: white;
          padding: 10px 16px;
          border-radius: 10px;
          border: none;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 12px 40px rgba(30,111,235,0.12);
          transition: transform .12s ease, box-shadow .12s ease;
        }
        .btn-send:active { transform: translateY(1px) scale(0.997); }
        .btn-send[disabled] { opacity: 0.7; cursor: not-allowed; transform:none; }

        .btn-ghost { background: transparent; border: 1px solid var(--glass); padding: 8px 12px; border-radius: 10px; color: var(--muted); cursor: pointer; }

        .status { margin-top: 14px; padding: 10px 12px; border-radius: 10px; font-weight: 600; text-align:center;}
        .status-success { background: rgba(4,120,87,0.08); color: #03543f; border: 1px solid rgba(4,120,87,0.12); }
        .status-error { background: rgba(220,38,38,0.06); color: #7f1d1d; border: 1px solid rgba(220,38,38,0.08); }

        @media (max-width: 480px) {
          .contact-card { padding: 22px; }
          .contact-form textarea { min-height: 140px; }
        }
      `}</style>

      <div className="contact-card">
        <div className="contact-left">
          <h2 id="contact-heading">Get in Touch with Me</h2>
          <p className="contact-sub">
            Want to get in touch? Text me, I reply quick.
          </p>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="c-name">Your name</label>
              <input
                id="c-name"
                name="name"
                type="text"
                value={form.name}
                onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                placeholder="Jane Doe"
              />
              {errors.name && <div className="error-text">{errors.name}</div>}
            </div>

            <div className="field">
              <label htmlFor="c-email">Your email</label>
              <input
                id="c-email"
                name="email"
                type="email"
                value={form.email}
                onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                placeholder="you@example.com"
              />
              {errors.email && <div className="error-text">{errors.email}</div>}
            </div>

            <div className="field">
              <label htmlFor="c-message">Message / Feedback</label>
              <textarea
                id="c-message"
                name="message"
                value={form.message}
                onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                placeholder="Write your message here..."
              />
              {errors.message && <div className="error-text">{errors.message}</div>}
            </div>

            <div className="contact-actions">
              <button className="btn-send" type="submit" disabled={sending}>
                {sending ? "Sending..." : "Send message"}
              </button>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => { setForm({ name: "", email: "", message: "" }); setErrors({}); setStatus(null); }}
              >
                Clear
              </button>
            </div>

            {status === "success" && (
              <div className="status status-success" role="status">
                Message sent, Thank you!
              </div>
            )}
            {status === "error" && (
              <div className="status status-error" role="alert">
                Something went wrong, please try again later.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}