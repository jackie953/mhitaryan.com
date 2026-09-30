"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { SectionLabel } from "./AboutSection";

export interface ValueItem {
  name: string;
  line: string;
}

interface ValuesScrollProps {
  label: string;
  values: ValueItem[];
}

// Scroll distance (in viewport heights) allotted to each step after the first.
const VH_PER_STEP = 0.6;

function ValueRow({
  item,
  index,
  count,
  progress,
}: {
  item: ValueItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const step = 1 / (count - 1);
  const center = index * step;
  const w = step * 0.6;

  // 0 = inactive (grey, blurred), 1 = active (dark, sharp). The first and last
  // items are fully active at the very start / end of the pinned range.
  const active = useTransform(progress, [center - w, center, center + w], [0, 1, 0]);

  const opacity = useTransform(active, [0, 1], [0.22, 1]);
  const blurPx = useTransform(active, [0, 1], [2.5, 0]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);
  const lineOpacity = useTransform(active, [0.4, 1], [0, 1]);
  const lineX = useTransform(active, [0.4, 1], [-12, 0]);

  return (
    <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", columnGap: 16, rowGap: 4 }}>
      <motion.span
        style={{
          opacity,
          filter,
          fontSize: "clamp(1.9rem, 4.6vw, 3rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          color: "var(--neutral-on-background-strong)",
          willChange: "opacity, filter",
        }}
      >
        {item.name}
      </motion.span>
      <motion.span
        style={{
          opacity: lineOpacity,
          x: lineX,
          fontSize: "1rem",
          lineHeight: 1.4,
          paddingBottom: "0.35em",
          color: "var(--neutral-on-background-weak)",
          willChange: "opacity, transform",
        }}
      >
        {item.line}
      </motion.span>
    </div>
  );
}

export function ValuesScroll({ label, values }: ValuesScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const count = values.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Light spring so fast wheel flicks still ease between values.
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });

  // Reduced motion: no pinning, no blur, everything readable at once.
  if (reduce) {
    return (
      <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
        <div style={{ flex: "0 0 33%", maxWidth: "100%" }}>
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 20 }}>
          {values.map((v) => (
            <div key={v.name}>
              <div style={{ fontSize: "2rem", fontWeight: 600, color: "var(--neutral-on-background-strong)" }}>
                {v.name}
              </div>
              <div style={{ color: "var(--neutral-on-background-weak)" }}>{v.line}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{ position: "relative", height: `${100 + (count - 1) * VH_PER_STEP * 100}svh` }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="values-scroll-grid">
          <div className="values-scroll-label">
            <SectionLabel>{label}</SectionLabel>
          </div>
          <div className="values-scroll-list">
            {values.map((item, i) => (
              <ValueRow key={item.name} item={item} index={i} count={count} progress={progress} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .values-scroll-grid { display: flex; width: 100%; gap: 80px; align-items: flex-start; }
        .values-scroll-label { flex: 0 0 33%; max-width: 33%; }
        .values-scroll-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 20px; }
        @media (max-width: 768px) {
          .values-scroll-grid { flex-direction: column; gap: 28px; }
          .values-scroll-label { flex: 1 1 100%; max-width: 100%; }
          .values-scroll-list { gap: 24px; }
        }
      `}</style>
    </div>
  );
}
