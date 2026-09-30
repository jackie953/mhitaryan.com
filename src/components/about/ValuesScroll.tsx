"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { Heading, Text } from "@once-ui-system/core";
import { SectionLabel } from "./AboutSection";

export interface ValueItem {
  name: string;
  line: string;
}

interface ValuesScrollProps {
  label: string;
  values: ValueItem[];
}

const INACTIVE = { opacity: 0.25, filter: "blur(0.5px)" };
const ACTIVE = { opacity: 1, filter: "blur(0px)" };
const EASE = [0.22, 1, 0.36, 1] as const;

export function ValuesScroll({ label, values }: ValuesScrollProps) {
  const reduce = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Track progress strictly within this 200vh pinned section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Evenly divide 0 to 1 progress across the array length
    const index = Math.min(
      values.length - 1,
      Math.floor(latest * values.length)
    );
    setActive(index);
  });

  const duration = reduce ? 0 : 0.35;

  return (
    // Outer tall container creates the scroll runway
    <div ref={targetRef} className="relative h-[200vh]">
      {/* Sticky box pins the content while scrolling through the runway */}
      <div className="sticky top-[30vh] w-full">
        <div className="values-grid">
          <div className="values-label">
            <SectionLabel>{label}</SectionLabel>
          </div>
          <div className="values-list">
            {values.map((item, i) => {
              const on = i === active;
              return (
                <div key={item.name} className="values-item">
                  <motion.div
                    initial={false}
                    animate={on ? ACTIVE : INACTIVE}
                    transition={{ duration, ease: EASE }}
                    style={{ willChange: "opacity, filter" }}
                    className="shrink-0"
                  >
                    <Heading as="h3" className="values-heading">
                      {item.name}
                    </Heading>
                  </motion.div>
                  {item.line && (
                    <motion.div
                      initial={false}
                      animate={{ opacity: on ? 1 : 0, x: on ? 0 : -10 }}
                      transition={{ duration, ease: EASE }}
                      aria-hidden={!on}
                      className="values-subline"
                    >
                      <Text variant="body-default-m" onBackground="neutral-weak">
                        {item.line}
                      </Text>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        .values-grid { display: flex; width: 100%; gap: 48px; align-items: flex-start; }
        .values-label { flex: 0 0 33%; max-width: 33%; padding-top: 6px; }
        .values-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
        .values-item { display: flex; align-items: baseline; flex-wrap: wrap; column-gap: 24px; row-gap: 4px; padding: 8px 0; }
        .values-heading { font-size: 1.625rem !important; line-height: 1.2; font-weight: 600; letter-spacing: -0.01em; }
        .values-subline { display: flex; align-items: center; padding-bottom: 2px; }
        
        @media (max-width: 768px) {
          .values-grid { flex-direction: column; gap: 16px; }
          .values-label { flex: 1 1 100%; max-width: 100%; }
          .values-heading { font-size: 1.375rem !important; }
          .values-item { flex-direction: column; align-items: flex-start; column-gap: 0; }
        }
      `}</style>
    </div>
  );
}
