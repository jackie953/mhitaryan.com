"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HeroLineRevealProps {
  children: ReactNode;
  delay?: number;
}

// Mount-triggered fade + upward drift for a single line of the hero
// headline, so lines reveal in sequence (line 1, then line 2, then the
// subline via HeroHeadline's own revealDelay) instead of all at once.
// Matches RevealFx's easing/feel but scoped to inline text so it can sit
// inside a single <Heading> with <br /> between lines.
export function HeroLineReveal({ children, delay = 0 }: HeroLineRevealProps) {
  return (
    <motion.span
      style={{ display: "inline-block" }}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.span>
  );
}
