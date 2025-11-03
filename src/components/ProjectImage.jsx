// src/components/ProjectImage.jsx
import React from "react";

/**
 * ProjectImage
 * - Usage: <ProjectImage file="music-visualizer.jpg" alt="..." className="project-img" />
 * - Resolves first from src/assets/projects (bundled by Vite)
 * - Falls back to /assets/projects/<filename> (public) if not found in bundle
 */

const localImages = import.meta.globEager("../assets/projects/*.{png,jpg,jpeg,webp,svg}");

const imageMap = {};
for (const p in localImages) {
  const parts = p.split("/");
  const filename = parts[parts.length - 1];
  // module might export default or be the URL directly
  imageMap[filename] = localImages[p].default || localImages[p];
}

export default function ProjectImage({ file, alt = "", className = "", style = {}, ...rest }) {
  if (!file) return null;

  // prefer bundled src asset
  const bundled = imageMap[file];
  const publicPath = `/assets/projects/${file}`;

  const handleError = (e) => {
    // If the current src is bundled and fails (rare), try public path
    if (e.currentTarget.src && !e.currentTarget.src.includes(publicPath)) {
      e.currentTarget.src = publicPath;
      return;
    }
    // otherwise hide broken image
    e.currentTarget.style.display = "none";
  };

  // small default styles so it fits typical project-card usage (you can override via className/style)
  const defaultStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    ...style,
  };

  return (
    <img
      src={bundled || publicPath}
      alt={alt}
      className={className}
      style={defaultStyle}
      onError={handleError}
      {...rest}
    />
  );
}