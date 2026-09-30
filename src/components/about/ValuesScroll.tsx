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

// Scroll distance (in viewport heights) per value after the first. Kept short so
// each value flips after a couple of wheel notches, not a long drag.
const VH_PER_STEP = 0.32;
// Where the content pins, as a fraction of viewport height from the top.
const PIN_TOP = 0.28;

// Inactive values: readable grey with only a hint of softness.
const INACTIVE = { opacity: 0.3, filter: "blur(0.6px)" };
const ACTIVE = { opacity: 1, filter: "blur(0px)" };
const EASE = [0.22, 1, 0.36, 1] as const;

export function ValuesScroll({ label, values }: ValuesScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const count = values.length;
  const [active, setActive] = useState(0);

  const { scrollY } = useScroll();

  // Discrete steps (like the sticky-scroll-reveal pattern): the pinned range is
  // split into equal zones, one per value. Animating on change, not tying opacity
  // to scroll position, keeps it snappy and unambiguous — exactly one value is on.
  // Progress is measured from the wrapper's position: 0 when the content pins,
  // 1 when it is released.
  const update = () => {
    const el = ref.current;
    if (!el) return;
    const vh = window.innerHeight;
    const pinAt = vh * PIN_TOP;
    const range = vh * VH_PER_STEP * (count - 1);
    const p = (pinAt - el.getBoundingClientRect().top) / range;
    const next = Math.min(count - 1, Math.max(0, Math.floor(p * count)));
    setActive((prev) => (prev === next ? prev : next));
  };
  useMotionValueEvent(scrollY, "change", update);
  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (reduce) {
    return (
      <div className="values-scroll-grid" style={{ padding: "var(--static-space-40, 40px) 0" }}>
        <div className="values-scroll-label">
          <SectionLabel>{label}</SectionLabel>
        </div>
        <div className="values-scroll-list">
          {values.map((item) => (
            <div key={item.name} className="values-scroll-row">
              <Heading as="h3" variant="heading-strong-l">
                {item.name}
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.line}
              </Text>
            </div>
          ))}
        </div>
        <ValuesStyles />
      </div>
    );
  }

  return (
    // Wrapper = content height + a spacer that is the scroll runway. The content
    // pins near the top of the viewport for exactly that runway, so there is no
    // full-screen empty box above or below it. (A spacer, not padding: sticky
    // only travels inside its parent's content box.)
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ position: "sticky", top: `${PIN_TOP * 100}svh`, paddingTop: 48 }}>
        <div className="values-scroll-grid">
          <div className="values-scroll-label">
            <SectionLabel>{label}</SectionLabel>
          </div>
          <div className="values-scroll-list">
            {values.map((item, i) => {
              const on = i === active;
              return (
                <div key={item.name} className="values-scroll-row">
                  <motion.div
                    initial={false}
                    animate={on ? ACTIVE : INACTIVE}
                    transition={{ duration: 0.35, ease: EASE }}
                    style={{ willChange: "opacity, filter" }}
                  >
                    <Heading as="h3" variant="heading-strong-l">
                      {item.name}
                    </Heading>
                  </motion.div>
                  <motion.div
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, x: on ? 0 : -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
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
        </div>
      </div>
      <div aria-hidden style={{ height: `${(count - 1) * VH_PER_STEP * 100}svh` }} />
      <ValuesStyles />
    </div>
  );
}

function ValuesStyles() {
  return (
    <style>{`
      .values-scroll-grid { display: flex; width: 100%; gap: 80px; align-items: flex-start; }
      .values-scroll-label { flex: 0 0 33%; max-width: 33%; }
      .values-scroll-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 20px; }
      .values-scroll-row { display: flex; align-items: flex-end; flex-wrap: wrap; column-gap: 16px; row-gap: 4px; }
      @media (max-width: 768px) {
        .values-scroll-grid { flex-direction: column; gap: 28px; }
        .values-scroll-label { flex: 1 1 100%; max-width: 100%; }
        .values-scroll-list { gap: 12px; }
        .values-scroll-row { min-height: 5rem; align-content: flex-start; }
      }
    `}</style>
  );
}
