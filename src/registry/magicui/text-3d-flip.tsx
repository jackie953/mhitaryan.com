"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type RotateDirection = "top" | "bottom" | "left" | "right";
type StaggerFrom = "first" | "last" | "center" | number;

interface Text3DFlipProps {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: RotateDirection;
  staggerDuration?: number;
  staggerFrom?: StaggerFrom;
  transition?: Transition;
  style?: React.CSSProperties;
}

const AXIS: Record<RotateDirection, "rotateX" | "rotateY"> = {
  top: "rotateX",
  bottom: "rotateX",
  left: "rotateY",
  right: "rotateY",
};

// Both signs land on the same resting orientation (a half turn) — the sign
// only decides which way the flip visually rotates in.
const START_DEGREES: Record<RotateDirection, number> = {
  top: 180,
  bottom: -180,
  left: 180,
  right: -180,
};

function getDelay(index: number, total: number, staggerFrom: StaggerFrom, staggerDuration: number) {
  let from: number;
  if (staggerFrom === "first") from = 0;
  else if (staggerFrom === "last") from = total - 1;
  else if (staggerFrom === "center") from = (total - 1) / 2;
  else from = staggerFrom;
  return Math.abs(index - from) * staggerDuration;
}

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = "top",
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = { type: "spring", damping: 25, stiffness: 160 },
  style,
}: Text3DFlipProps) {
  // Driven by variants rather than a key-based remount: swapping DOM nodes
  // under a stationary cursor can make the browser refire mouseenter on the
  // freshly-inserted elements, which would restart the flip in a loop and
  // leave it stuck mid-rotation. Toggling a variant name instead keeps the
  // same nodes mounted throughout.
  const [phase, setPhase] = useState<"hidden" | "visible">("hidden");

  useEffect(() => {
    const raf = requestAnimationFrame(() => setPhase("visible"));
    return () => cancelAnimationFrame(raf);
  }, []);

  const replay = () => {
    setPhase("hidden");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPhase("visible"));
    });
  };

  const characters = Array.from(children);
  const axis = AXIS[rotateDirection];
  const startDegrees = START_DEGREES[rotateDirection];

  const variants: Variants = {
    hidden: { [axis]: startDegrees },
    visible: { [axis]: 0 },
  };

  return (
    <span
      className={cn("inline-flex", className)}
      onMouseEnter={replay}
      style={{ perspective: "600px", ...style }}
    >
      {characters.map((char, index) => {
        const delay = getDelay(index, characters.length, staggerFrom, staggerDuration);
        return (
          <span key={index} style={{ display: "inline-block" }}>
            <motion.span
              style={{
                position: "relative",
                display: "inline-block",
                transformStyle: "preserve-3d",
              }}
              variants={variants}
              initial="hidden"
              animate={phase}
              transition={phase === "visible" ? { ...transition, delay } : { duration: 0 }}
            >
              <span
                className={textClassName}
                style={{
                  display: "inline-block",
                  backfaceVisibility: "hidden",
                  whiteSpace: "pre",
                }}
              >
                {char}
              </span>
              <span
                className={flipTextClassName}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "inline-block",
                  backfaceVisibility: "hidden",
                  transform: `${axis}(180deg)`,
                  whiteSpace: "pre",
                }}
                aria-hidden="true"
              >
                {char}
              </span>
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
