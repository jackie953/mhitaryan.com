"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/utils/tailwind.utils";

interface ComesInGoesOutUnderlineProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  direction?: "left" | "right";
  underlineHeightRatio?: number;
  underlinePaddingRatio?: number;
  transition?: Transition;
}

// The underline enters from `direction` on hover-in, then keeps travelling
// the same way and exits through the opposite edge on hover-out, instead of
// retreating the way it came — a continuous sweep rather than a reverse.
export default function ComesInGoesOutUnderline({
  children,
  as: Tag = "span",
  className,
  direction = "left",
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.05,
  transition = { duration: 0.35, ease: "easeInOut" },
}: ComesInGoesOutUnderlineProps) {
  const ref = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState<"rest" | "in" | "out">("rest");
  const [metrics, setMetrics] = useState({ height: 1, padding: 2 });

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

  const enterOrigin = direction === "left" ? "0% 50%" : "100% 50%";
  const exitOrigin = direction === "left" ? "100% 50%" : "0% 50%";
  const origin = phase === "out" ? exitOrigin : enterOrigin;
  const scaleX = phase === "in" ? 1 : 0;

  const handleEnter = () => setPhase("in");
  const handleLeave = () => setPhase("out");

  return (
    <Tag
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
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
        animate={{ scaleX }}
        transition={transition}
      />
    </Tag>
  );
}
