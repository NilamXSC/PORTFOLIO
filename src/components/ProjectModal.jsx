// src/components/ProjectModal.jsx
import React from "react";

export default function ProjectModal({ open, onClose, project }) {
  if (!open || !project) return null;

  return (
    <>
      <div className="fixed inset-0 z-60" onClick={onClose} style={{ background: "rgba(2,6,23,0.4)" }} />
      <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
        <div className="card" style={{ width: "100%", maxWidth: 900 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: 16 }}>
            <div><h3 style={{ margin:0 }}>{project.title}</h3><div className="caption-sm">{project.tagline}</div></div>
            <button onClick={onClose} className="p-2 rounded-md border border-[var(--glass)]">✕</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, padding: 16 }}>
            <div>
              <img src={project.img} alt={project.title} style={{ width: "100%", borderRadius: 8, objectFit: "cover" }} />
              <p style={{ marginTop: 12, color: "var(--muted)" }}>{project.description}</p>
            </div>
            <aside>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontWeight: 700 }}>Project Details</div>
                <div className="caption-sm">{project.details || "More information about this project."}</div>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <a className="cta-primary" href={project.live} target="_blank" rel="noreferrer">Live</a>
                <a className="cta-ghost" href={project.code} target="_blank" rel="noreferrer">Code</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}