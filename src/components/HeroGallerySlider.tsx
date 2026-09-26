"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./HeroGallerySlider.module.scss";

export interface HeroGallerySlide {
  video: string;
  poster: string;
  eyebrow: string;
  heading: string;
  subtext: string;
  ctaLabel: string;
  ctaHref: string;
}

interface HeroGallerySliderProps {
  slides: HeroGallerySlide[];
  /** Autoplay interval in ms, should roughly match each slide's video length. */
  interval?: number;
  autoplay?: boolean;
  showProgress?: boolean;
}

export function HeroGallerySlider({
  slides,
  interval = 5000,
  autoplay = true,
  showProgress = true,
}: HeroGallerySliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const remainingRef = useRef(interval);
  const startedAtRef = useRef(0);
  const firedRef = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActive(index);
      setProgressKey((key) => key + 1);
      remainingRef.current = interval;
    },
    [interval],
  );

  useEffect(() => {
    if (!autoplay || paused || reducedMotion || slides.length < 2) return;
    firedRef.current = false;
    startedAtRef.current = Date.now();
    timeoutRef.current = setTimeout(() => {
      firedRef.current = true;
      goTo((active + 1) % slides.length);
    }, remainingRef.current);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (!firedRef.current) {
        remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startedAtRef.current));
      }
    };
  }, [active, autoplay, paused, reducedMotion, slides.length, goTo]);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={styles.stage}>
        {slides.map((slide, index) => (
          <div
            key={slide.video}
            className={`${styles.slide} ${index === active ? styles.slideActive : ""}`}
            aria-hidden={index !== active}
          >
            {reducedMotion ? (
              <img src={slide.poster} alt="" className={styles.media} />
            ) : (
              <video
                className={styles.media}
                src={slide.video}
                poster={slide.poster}
                autoPlay={index === active}
                loop
                muted
                playsInline
                preload={index === active ? "auto" : "none"}
              />
            )}
            <div className={styles.scrim} />
          </div>
        ))}

        <div className={styles.content}>
          {slides.map((slide, index) => (
            <div
              key={slide.video}
              className={`${styles.copy} ${index === active ? styles.copyActive : ""}`}
              aria-hidden={index !== active}
            >
              <span className={styles.eyebrow}>{slide.eyebrow}</span>
              <span className={styles.heading}>{slide.heading}</span>
              {slide.subtext && <span className={styles.subtext}>{slide.subtext}</span>}
              <Link href={slide.ctaHref} className={styles.cta}>
                {slide.ctaLabel}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>

        {showProgress && !reducedMotion && (
          <div className={styles.progressTrack}>
            {slides.map((slide, index) => (
              <button
                key={slide.video}
                type="button"
                className={styles.progressDot}
                aria-label={`Show slide ${index + 1}: ${slide.heading}`}
                aria-current={index === active}
                onClick={() => goTo(index)}
              >
                <span
                  key={index === active ? progressKey : undefined}
                  className={[
                    styles.progressFill,
                    index === active ? styles.progressRunning : "",
                    index === active && paused ? styles.progressPaused : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={
                    index === active
                      ? ({ ["--gs-interval" as string]: `${interval}ms` } as React.CSSProperties)
                      : undefined
                  }
                  data-complete={index < active ? "true" : undefined}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
