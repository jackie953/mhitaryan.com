"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { cn } from "@/utils/tailwind.utils";

interface CenterUnderlineProps {
  children: React.ReactNode;
  as?: React.ElementType;
  className?: string;
  underlineHeightRatio?: number;
  underlinePaddingRatio?: number;
  transition?: Transition;
}

// Underline grows outward from the center on hover, and collapses back to
// the center on hover-out. Good default for a single, deliberate link.
export default function CenterUnderline({
  children,
  as: Tag = "span",
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.05,
  transition = { duration: 0.3, ease: "easeInOut" },
}: CenterUnderlineProps) {
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
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

  return (
    <Tag
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute left-0 right-0 bg-current"
        style={{
          bottom: -metrics.padding,
          height: metrics.height,
          transformOrigin: "50% 50%",
        }}
        initial={false}
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={transition}
      />
    </Tag>
  );
}
