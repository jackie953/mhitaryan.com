"use client";

import { motion, useReducedMotion } from "framer-motion";
import type React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

// Fade + upward drift, triggered once as the section scrolls into view —
// used for everything below the hero. Duration/easing intentionally match
// HeroLineReveal so the whole page reads as one consistent pace, not a
// fast hero followed by a snappier scroll effect.
export function ScrollReveal({ children, className, delay = 0, y = 28 }: ScrollRevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ width: "100%" }}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.01, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
