"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
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

const READ_LINE = 0.38;

// Increased contrast on inactive items to match the reference image
const INACTIVE = { opacity: 0.2, filter: "blur(0.5px)" };
const ACTIVE = { opacity: 1, filter: "blur(0px)" };
const EASE = [0.22, 1, 0.36, 1] as const;

export function ValuesScroll({ label, values }: ValuesScrollProps) {
  const reduce = useReducedMotion();
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(-1);
  const { scrollY } = useScroll();

  const update = () => {
    const vh = window.innerHeight;
    const line = vh * READ_LINE + 12;
    let best = -1;
    let bestDist = Infinity;
    itemRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - line);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    const next = bestDist < vh * 0.4 ? best : -1;
    setActive((prev) => (prev === next ? prev : next));
  };

  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const duration = reduce ? 0 : 0.35;

  return (
    <div className="values-grid">
      <div className="values-label">
        <div className="values-label-sticky">
          <SectionLabel>{label}</SectionLabel>
        </div>
      </div>
      <div className="values-list">
        {values.map((item, i) => {
          const on = i === active;
          return (
            <div
              key={item.name}
              className="values-item"
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
            >
              <motion.div
                initial={false}
                animate={on ? ACTIVE : INACTIVE}
                transition={{ duration, ease: EASE }}
                style={{ willChange: "opacity, filter" }}
              >
                <Heading as="h3" variant="heading-strong-l" className="values-heading">
                  {item.name}
                </Heading>
              </motion.div>
              {item.line && (
                <motion.div
                  initial={false}
                  animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                  transition={{ duration, ease: EASE }}
                  aria-hidden={!on}
                  className="overflow-hidden"
                >
                  <Text variant="body-default-m" onBackground="neutral-weak" className="pt-1 pb-2">
                    {item.line}
                  </Text>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
      <style>{`
        .values-grid { display: flex; width: 100%; gap: 48px; align-items: flex-start; }
        .values-label { flex: 0 0 33%; max-width: 33%; }
        .values-label-sticky { position: sticky; top: ${READ_LINE * 100}svh; }
        
        /* Stacked tightly like continuous block text */
        .values-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 0; }
        .values-item { padding: 0; margin: 0; display: flex; flex-direction: column; }
        .values-heading { line-height: 1.15; padding: 2px 0; }
        
        @media (max-width: 768px) {
          .values-grid { flex-direction: column; gap: 16px; }
          .values-label { flex: 1 1 100%; max-width: 100%; }
          .values-label-sticky { position: static; }
        }
      `}</style>
    </div>
  );
}
