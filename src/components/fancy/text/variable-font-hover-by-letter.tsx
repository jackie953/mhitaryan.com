"use client";

import { motion, type Transition } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

interface VariableFontHoverByLetterProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
}

const DEFAULT_TRANSITION: Transition = { type: "spring", duration: 0.7 };

export default function VariableFontHoverByLetter({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = DEFAULT_TRANSITION,
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
}: VariableFontHoverByLetterProps) {
  const letters = Array.from(label);

  const getStaggerDelay = (index: number) => {
    const total = letters.length;
    if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
    if (staggerFrom === "center") {
      const center = Math.floor(total / 2);
      return Math.abs(center - index) * staggerDuration;
    }
    if (typeof staggerFrom === "number") {
      return Math.abs(staggerFrom - index) * staggerDuration;
    }
    return index * staggerDuration;
  };

  return (
    <motion.span
      className={cn("inline-flex", className)}
      whileHover="hover"
      onClick={onClick}
      aria-label={label}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          aria-hidden="true"
          className="inline-block"
          style={{
            fontVariationSettings: fromFontVariationSettings,
            whiteSpace: letter === " " ? "pre" : undefined,
          }}
          variants={{ hover: { fontVariationSettings: toFontVariationSettings } }}
          transition={{ ...transition, delay: getStaggerDelay(index) }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
