"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!containerRef.current || itemRefs.current.length === 0) return;

      const vh = window.innerHeight;
      const containerRect = containerRef.current.getBoundingClientRect();
      const readLine = vh * 0.38;

      // 1. Before reaching reading line -> Always highlight item 0 ("Curious")
      if (containerRect.top > readLine - 20) {
        setActive(0);
        return;
      }

      // 2. Past the bottom of the section -> Keep last item highlighted
      if (containerRect.bottom < readLine) {
        setActive(values.length - 1);
        return;
      }

      // 3. Middle range -> Find exact item closest to the reading line
      let closestIndex = 0;
      let smallestDistance = Infinity;

      itemRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.top + rect.height / 2;
        const distance = Math.abs(itemCenter - readLine);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = index;
        }
      });

      setActive(closestIndex);
    };

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    // Run initial state setup
    handleScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [values.length]);

  const duration = reduce ? 0 : 0.35;

  return (
    <div className="values-grid" ref={containerRef}>
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
      <style>{`
        .values-grid { display: flex; width: 100%; gap: 48px; align-items: flex-start; }
        .values-label { flex: 0 0 33%; max-width: 33%; padding-top: 6px; }
        .values-label-sticky { position: sticky; top: 38svh; }
        
        .values-list { flex: 1 1 0%; min-width: 0; display: flex; flex-direction: column; gap: 12px; }
        
        .values-item { 
          display: flex; 
          align-items: baseline; 
          flex-wrap: wrap; 
          column-gap: 24px; 
          row-gap: 4px; 
          padding: 8px 0; 
        }

        .values-heading { 
          font-size: 1.625rem !important; 
          line-height: 1.2; 
          font-weight: 600; 
          letter-spacing: -0.01em; 
        }

        .values-subline { 
          display: flex; 
          align-items: center; 
          padding-bottom: 2px; 
        }
        
        @media (max-width: 768px) {
          .values-grid { flex-direction: column; gap: 16px; }
          .values-label { flex: 1 1 100%; max-width: 100%; padding-top: 0; }
          .values-label-sticky { position: static; }
          .values-heading { font-size: 1.375rem !important; }
          .values-item { flex-direction: column; align-items: flex-start; column-gap: 0; }
        }
      `}</style>
    </div>
  );
}
