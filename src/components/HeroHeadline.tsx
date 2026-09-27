"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Heading, Text } from "@once-ui-system/core";
import styles from "@/app/[locale]/Hero.module.scss";

interface HeroHeadlineProps {
  headline: ReactNode;
  headingStyle: CSSProperties;
  sentences: string[];
}

// The subheading needs to match the headline's own rendered width (not the
// full hero column) and, at desktop widths, break one sentence per line —
// but only when the longest sentence actually fits that width. Both are
// content-dependent (locale, viewport, font) in a way plain CSS can't
// resolve: a shrink-to-fit container sized from both children ends up
// sized by whichever child's unwrapped text is widest, which is usually
// the paragraph, not the headline. So we measure the rendered headline
// width client-side and drive the subheading from it directly.
export function HeroHeadline({ headline, headingStyle, sentences }: HeroHeadlineProps) {
  const headingWrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [subheadlineStyle, setSubheadlineStyle] = useState<CSSProperties>({});
  const [blockMode, setBlockMode] = useState(false);

  useLayoutEffect(() => {
    const headingWrap = headingWrapRef.current;
    const measure = measureRef.current;
    if (!headingWrap || !measure) return;

    const update = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) {
        setSubheadlineStyle({});
        setBlockMode(false);
        return;
      }
      const headlineWidth = headingWrap.getBoundingClientRect().width;
      const longestSentenceWidth = Math.max(
        ...sentences.map((sentence, index) => {
          // Match exactly what's rendered: every sentence but the last carries
          // a trailing space in the real spans, and it counts toward width.
          measure.textContent = index < sentences.length - 1 ? `${sentence} ` : sentence;
          return measure.getBoundingClientRect().width;
        })
      );
      setSubheadlineStyle({ maxWidth: `${headlineWidth}px`, width: `${headlineWidth}px` });
      // Safety margin so subpixel rounding (measuring a span vs. a div,
      // possibly under a different subpixel offset from the reveal
      // animation's transform) never lets a borderline-too-long sentence
      // slip into block mode and wrap mid-line.
      setBlockMode(longestSentenceWidth <= headlineWidth - 2);
    };

    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(headingWrap);
    window.addEventListener("resize", update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [sentences]);

  return (
    <>
      <div ref={headingWrapRef} className={styles.headlineGroup}>
        <Heading wrap="balance" variant="display-strong-l" style={headingStyle}>
          {headline}
        </Heading>
      </div>
      <Text as="p" onBackground="neutral-weak" className={styles.subheadline} style={subheadlineStyle}>
        {sentences.map((sentence, index) => (
          <span key={sentence} className={blockMode ? styles.sentenceBlock : styles.sentence}>
            {sentence}
            {index < sentences.length - 1 ? " " : ""}
          </span>
        ))}
      </Text>
      {/* Hidden probe, same font as .subheadline, used only to measure each
          sentence's unwrapped width against the headline's measured width. */}
      <span
        ref={measureRef}
        aria-hidden
        className={styles.subheadline}
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "none",
          width: "auto",
          top: -9999,
          left: -9999,
        }}
      />
    </>
  );
}
