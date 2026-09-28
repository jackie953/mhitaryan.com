"use client";

import { useCallback, useEffect, useRef, useState, type SyntheticEvent } from "react";
import Link from "next/link";
import CenterUnderline from "@/components/fancy/text/underline-center";
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
  /** Fallback autoplay duration in ms, used until a slide's video reports its own length. */
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
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);
  const [durations, setDurations] = useState<Record<number, number>>({});
  const paused = hoverPaused || focusPaused;

  const elapsedRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback((index: number) => {
    elapsedRef.current = 0;
    setProgress(0);
    setActive(index);
  }, []);

  const goNext = useCallback(
    () => goTo((active + 1) % slides.length),
    [goTo, active, slides.length],
  );

  const handleLoadedMetadata = useCallback(
    (index: number) => (event: SyntheticEvent<HTMLVideoElement>) => {
      const durationMs = event.currentTarget.duration * 1000;
      if (Number.isFinite(durationMs) && durationMs > 0) {
        setDurations((prev) => (prev[index] === durationMs ? prev : { ...prev, [index]: durationMs }));
      }
    },
    [],
  );

  // A slide with a video runs exactly as long as its video; otherwise it falls
  // back to `interval`. This is what keeps the progress bar, the autoplay
  // advance, and the actual footage in sync, instead of the two drifting apart.
  const activeDuration = durations[active] ?? interval;

  useEffect(() => {
    if (!autoplay || paused || reducedMotion || slides.length < 2) {
      lastTsRef.current = null;
      return;
    }

    const tick = (timestamp: number) => {
      if (lastTsRef.current == null) lastTsRef.current = timestamp;
      elapsedRef.current += timestamp - lastTsRef.current;
      lastTsRef.current = timestamp;

      if (elapsedRef.current >= activeDuration) {
        goTo((active + 1) % slides.length);
        return;
      }
      setProgress(elapsedRef.current / activeDuration);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [active, autoplay, paused, reducedMotion, slides.length, activeDuration, goTo]);

  return (
    <div
      className={styles.root}
      onMouseEnter={() => setHoverPaused(true)}
      onMouseLeave={() => setHoverPaused(false)}
      onFocus={() => setFocusPaused(true)}
      onBlur={() => setFocusPaused(false)}
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
                muted
                playsInline
                preload={index === active ? "auto" : "none"}
                onLoadedMetadata={handleLoadedMetadata(index)}
                onEnded={() => {
                  if (index === active) goNext();
                }}
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
                <CenterUnderline>{slide.ctaLabel}</CenterUnderline>
                <span aria-hidden="true" className={styles.ctaArrow}>
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>

        {(showProgress || slides.length > 1) && !reducedMotion && (
          <div className={styles.bottomControls}>
            {showProgress && (
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
                      className={styles.progressFill}
                      style={{
                        width:
                          index === active
                            ? `${Math.min(1, progress) * 100}%`
                            : index < active
                              ? "100%"
                              : "0%",
                      }}
                    />
                  </button>
                ))}
              </div>
            )}

            {slides.length > 1 && (
              <button
                type="button"
                className={styles.navNext}
                aria-label="Next slide"
                onClick={goNext}
              >
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path
                    d="M9 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
