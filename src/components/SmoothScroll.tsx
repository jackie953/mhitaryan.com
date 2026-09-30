'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.05,        // Lower number = smoother, slower acceleration (default was 0.08)
        duration: 1.5,     // Higher duration = longer, smoother deceleration (default was 1.2)
        smoothWheel: true,
        wheelMultiplier: 0.85, // Decreases mouse wheel scroll distance per tick (prevents fast jumps)
      }}
    >
      {children}
    </ReactLenis>
  );
}
