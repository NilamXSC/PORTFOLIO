import React, { useEffect } from "react";

export default function DarkToggle() {

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }, []);

  return (
    <button
      aria-label="Dark mode enforced"
      style={{ display: "none" }}
      tabIndex={-1}
    />
  );
}