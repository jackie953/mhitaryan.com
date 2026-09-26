"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

interface KineticTextProps {
  children: string;
  className?: string;
  letterClassName?: string;
  transition?: Transition;
}

const DEFAULT_TRANSITION: Transition = { type: "spring", stiffness: 320, damping: 20, mass: 0.6 };

/**
 * Per-letter kinetic hover effect: the letter under the cursor lifts and
 * scales up, with neighbouring letters following at a fading amount —
 * a ripple of motion travelling through the word.
 */
export function KineticText({ children, className, letterClassName, transition = DEFAULT_TRANSITION }: KineticTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const characters = Array.from(children);

  return (
    <span className={cn("inline-flex", className)} aria-label={children}>
      {characters.map((char, index) => {
        const distance = hovered === null ? Infinity : Math.abs(index - hovered);
        const active = !prefersReducedMotion && distance <= 2;
        const falloff = active ? 1 - distance * 0.35 : 0;

        return (
          <motion.span
            key={index}
            aria-hidden="true"
            className={cn("inline-block", letterClassName)}
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered((current) => (current === index ? null : current))}
            animate={{
              y: active ? `${-0.22 * falloff}em` : 0,
              scale: active ? 1 + 0.18 * falloff : 1,
            }}
            transition={transition}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
