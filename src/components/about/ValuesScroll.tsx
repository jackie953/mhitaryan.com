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

// The "reading line": the value closest to this height (fraction of the viewport)
// is the lit one. The page scrolls normally — nothing is pinned or hijacked.
const READ_LINE = 0.38;

const INACTIVE = { opacity: 0.3, filter: "blur(0.6px)" };
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
    // Far from every value (section off-screen): nothing is lit.
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
                <Heading as="h3" variant="heading-strong-l">
                  {item.name}
                </Heading>
              </motion.div>
              <motion.div
                initial={false}
                animate={{ opacity: on ? 1 : 0, x: on ? 0 : -8 }}
                transition={{ duration, ease: EASE }}
                aria-hidden={!on}
              >
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {item.line}
                </Text>
              </motion.div>
            </div>
          );
        })}
      </div>
      <style>{`
        .values-grid { display: flex; width: 100%; gap: 64px; align-items: stretch; }
        .values-label { flex: 0 0 33%; max-width: 33%; padding-top: 1.75rem; }
        .values-label-sticky { position: sticky; top: ${READ_LINE * 100}svh; }
        .values-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; }
        
        /* Changed padding from 9svh 0 to 1.75rem 0 for realistic line height spacing */
        .values-item { display: flex; align-items: flex-end; flex-wrap: wrap; column-gap: 16px; row-gap: 4px; padding: 1.75rem 0; }
        
        @media (max-width: 768px) {
          .values-grid { flex-direction: column; gap: 0; }
          .values-label { flex: 1 1 100%; max-width: 100%; padding-top: 0; }
          .values-label-sticky { position: static; padding-top: 24px; }
          .values-item { padding: 1.25rem 0; min-height: auto; align-content: flex-start; }
        }
      `}</style>
    </div>
  );
}
