"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  /** Autoplay duration in ms for slides with no video to read a clock from (reduced motion). */
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
  const [focusPaused, setFocusPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const rafRef = useRef<number | null>(null);
  // Only used as a fallback clock when there's no video to read a real
  // position from (reduced motion). Video-driven slides ignore this.
  const fallbackElapsedRef = useRef(0);
  const fallbackLastTsRef = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback((index: number) => {
    fallbackElapsedRef.current = 0;
    setProgress(0);
    setActive(index);
  }, []);

  const goNext = useCallback(
    () => goTo((active + 1) % slides.length),
    [goTo, active, slides.length],
  );

  // If a slide finishes while focus-pause is holding it, don't skip the
  // advance entirely - just apply it once the pause lifts.
  useEffect(() => {
    if (!focusPaused) {
      const video = videoRefs.current[active];
      if (video && video.ended) goNext();
    }
  }, [focusPaused, active, goNext]);

  useEffect(() => {
    if (!autoplay || focusPaused || slides.length < 2) {
      fallbackLastTsRef.current = null;
      return;
    }

    const tick = (timestamp: number) => {
      // Video slides: read the real playback position each frame, so the bar
      // can never drift from what's actually on screen. Advancing to the next
      // slide is handled by the video's own `ended` event, not this clock.
      const activeVideo = reducedMotion ? null : videoRefs.current[active];
      if (activeVideo && Number.isFinite(activeVideo.duration) && activeVideo.duration > 0) {
        setProgress(activeVideo.currentTime / activeVideo.duration);
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // No video to read from (reduced motion, or metadata not loaded yet):
      // fall back to a plain wall clock against `interval`.
      if (fallbackLastTsRef.current == null) fallbackLastTsRef.current = timestamp;
      fallbackElapsedRef.current += timestamp - fallbackLastTsRef.current;
      fallbackLastTsRef.current = timestamp;

      if (fallbackElapsedRef.current >= interval) {
        goTo((active + 1) % slides.length);
        return;
      }
      setProgress(fallbackElapsedRef.current / interval);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      fallbackLastTsRef.current = null;
    };
  }, [active, autoplay, focusPaused, reducedMotion, slides.length, interval, goTo]);

  return (
    <div
      className={styles.root}
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
                ref={(element) => {
                  videoRefs.current[index] = element;
                }}
                className={styles.media}
                src={slide.video}
                poster={slide.poster}
                autoPlay={index === active}
                muted
                playsInline
                preload={index === active ? "auto" : "none"}
                onEnded={() => {
                  if (index === active && !focusPaused) goNext();
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
                            ? `${Math.min(1, Math.max(0, progress)) * 100}%`
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
