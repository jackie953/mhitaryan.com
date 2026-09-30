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

const INACTIVE = { opacity: 0.25, filter: "blur(0.5px)" };
const ACTIVE = { opacity: 1, filter: "blur(0px)" };
const EASE = [0.22, 1, 0.36, 1] as const;

export function ValuesScroll({ label, values }: ValuesScrollProps) {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollY } = useScroll();
  const tickingRef = useRef(false);

  const update = () => {
    tickingRef.current = false;
    if (!containerRef.current || values.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;

    // Trigger region: Starts when top hits 60% of viewport, ends when bottom hits 30%
    const start = vh * 0.6;
    const end = vh * 0.3;
    const totalDistance = rect.height + (start - end);

    // Calculate normalized progress (0 to 1) through the section
    const currentPos = start - rect.top;
    const progress = Math.max(0, Math.min(1, currentPos / totalDistance));

    // Map progress smoothly into array indices (0, 1, 2, 3...)
    const rawIndex = Math.floor(progress * values.length);
    const targetIndex = Math.min(values.length - 1, Math.max(0, rawIndex));

    setActive(targetIndex);
  };

  const requestUpdate = () => {
    if (!tickingRef.current) {
      tickingRef.current = true;
      requestAnimationFrame(update);
    }
  };

  useMotionValueEvent(scrollY, "change", requestUpdate);

  useEffect(() => {
    requestUpdate();
    window.addEventListener("resize", requestUpdate);
    return () => window.removeEventListener("resize", requestUpdate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          padding: 6px 0; 
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
