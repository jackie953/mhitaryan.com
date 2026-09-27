"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, type Transition } from "framer-motion";
import { cn } from "@/utils/tailwind.utils";

interface GoesOutComesInUnderlineProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  direction?: "left" | "right";
  underlineHeightRatio?: number;
  underlinePaddingRatio?: number;
  transition?: Transition;
}

// The underline is visible at rest. On hover it first retreats out through
// the edge opposite `direction`, then grows back in from `direction` — a
// "goes out, comes in" beat instead of a simple fade or slide.
export default function GoesOutComesInUnderline({
  children,
  as: Tag = "span",
  className,
  direction = "left",
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.05,
  transition = { duration: 0.25, ease: "easeOut" },
}: GoesOutComesInUnderlineProps) {
  const ref = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const blockedRef = useRef(false);
  const [origin, setOrigin] = useState(direction === "left" ? "100% 50%" : "0% 50%");
  const [metrics, setMetrics] = useState({ height: 1, padding: 2 });

  const outOrigin = direction === "left" ? "100% 50%" : "0% 50%";
  const inOrigin = direction === "left" ? "0% 50%" : "100% 50%";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const fontSize = Number.parseFloat(getComputedStyle(el).fontSize) || 16;
      setMetrics({
        height: Math.max(1, fontSize * underlineHeightRatio),
        padding: fontSize * underlinePaddingRatio,
      });
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [underlineHeightRatio, underlinePaddingRatio]);

  async function playCycle(startOrigin: string, endOrigin: string) {
    if (blockedRef.current) return;
    blockedRef.current = true;
    setOrigin(startOrigin);
    await controls.start({ scaleX: 0, transition });
    setOrigin(endOrigin);
    await controls.start({ scaleX: 1, transition });
    blockedRef.current = false;
  }

  return (
    <Tag
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => playCycle(outOrigin, inOrigin)}
      onMouseLeave={() => playCycle(inOrigin, outOrigin)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bg-current"
        style={{
          bottom: -metrics.padding,
          height: metrics.height,
          transformOrigin: origin,
        }}
        initial={{ scaleX: 1 }}
        animate={controls}
      />
    </Tag>
  );
}
