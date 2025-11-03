// src/components/PhotoCard.jsx
import React from "react";

/**
 * PhotoCard
 * Props:
 *  - src: string (image path)
 *  - alt: string
 *
 * This component implements:
 *  - subtle floating animation
 *  - glowing border on hover
 *  - accessible alt text
 *  - responsive sizing for mobile/desktop
 */
export default function PhotoCard({ src = "/src/assets/profile.jpg", alt = "Nilam Sanjib Chakraborty" }) {
  return (
    <div className="photo-card-wrapper">
      <div className="photo-card" role="img" aria-label={alt} tabIndex={0}>
        <img src={src} alt={alt} className="photo-card-img" />
      </div>

      {/* decorative rings for glow (pure CSS) */}
      <div aria-hidden className="photo-card-rings" />
    </div>
  );
}
