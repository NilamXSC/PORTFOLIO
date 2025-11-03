// src/components/AnimatedButton.jsx
import React from 'react';

/**
 * AnimatedButton
 * props:
 *  - children
 *  - onClick
 *  - variant: 'flame' | 'rain' | 'nature' | 'glass' | 'neon'
 *  - className (extra)
 *  - ariaLabel
 */
export default function AnimatedButton({ children, onClick, variant = 'glass', className = '', ariaLabel }) {
  return (
    <button
      className={`animated-btn animated-${variant} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || (typeof children === 'string' ? children : 'action')}
      type="button"
    >
      <span className="animated-btn__content">{children}</span>

      {/* Decorative layers */}
      <span aria-hidden className="animated-btn__effect" />
    </button>
  );
}
