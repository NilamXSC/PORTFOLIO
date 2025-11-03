// src/components/Sidebar.jsx
import React from "react";
import DarkToggle from "./DarkToggle";

export default function Sidebar({ email = "your.email@example.com" }) {
  return (
    <>
      {/* Desktop brand bar (no nav) */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-72 bg-[var(--card)] border-r border-[var(--glass)] z-40 p-6 sidebar"
        aria-label="Brand"
      >
        <div>
          <div className="brand-wrap mb-6">
            <div className="brand-logo">
              <img src="/src/assets/logo-symbol.png" alt="Arc of Nilam logo" />
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <DarkToggle />
          <a href={`mailto:${email}`} className="text-sm text-[var(--muted)] hover:text-[var(--text)]">{email}</a>
        </div>
      </aside>

      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--card)] border-b border-[var(--glass)] z-50 flex items-center justify-between px-4">
        <div className="mobile-brand">
          <div className="brand-logo" style={{ width: 36, height: 36 }}>
            <img src="/src/assets/logo-symbol.png" alt="Arc of Nilam logo" />
          </div>
        </div>

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <DarkToggle />
        </div>
      </header>
    </>
  );
}