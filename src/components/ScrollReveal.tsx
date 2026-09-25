"use client";

import { motion } from "framer-motion";
import type React from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

// Quick, short fade + small upward drift, triggered once as the section
// scrolls into view — used for everything below the hero.
export function ScrollReveal({ children, className, delay = 0, y = 12 }: ScrollRevealProps) {
  return (
    <motion.div
      className={className}
      style={{ width: "100%" }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.35, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
