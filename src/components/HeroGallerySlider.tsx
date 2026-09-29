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
  const [hoverHeld, setHoverHeld] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  // Hover/focus only freeze the progress bar; the video keeps playing.
  // The play/pause button is the only thing that stops the video itself.
  const held = focusPaused || hoverHeld;
  const heldRef = useRef(held);
  heldRef.current = held;
  const userPausedRef = useRef(userPaused);
  userPausedRef.current = userPaused;

  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});
  const rafRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
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

  // Toggling `autoPlay`/`preload` on an already-mounted <video> doesn't make a
  // browser (re)play it - those attributes are only honored on initial load.
  // So every time the active slide changes, explicitly rewind and play it,
  // and pause the one that just lost focus. This is what actually makes the
  // gallery loop back to the first slide instead of stalling on its last frame.
  useEffect(() => {
    if (reducedMotion) return;
    Object.entries(videoRefs.current).forEach(([key, video]) => {
      if (!video) return;
      if (Number(key) === active) {
        video.currentTime = 0;
        if (!userPausedRef.current) video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [active, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) return;
    const video = videoRefs.current[active];
    if (!video) return;
    if (userPaused) video.pause();
    else if (!video.ended) video.play().catch(() => {});
  }, [userPaused, active, reducedMotion]);

  const goNext = useCallback(
    () => goTo((active + 1) % slides.length),
    [goTo, active, slides.length],
  );

  // The progress bar runs on its own clock (one video length per slide), so
  // hover/focus can freeze the bar while the looping video keeps playing.
  useEffect(() => {
    if (!autoplay || userPaused || slides.length < 2) {
      lastTsRef.current = null;
      return;
    }

    const tick = (timestamp: number) => {
      const last = lastTsRef.current ?? timestamp;
      lastTsRef.current = timestamp;
      // Clamp so a throttled background tab doesn't skip straight to the next slide.
      if (!heldRef.current) elapsedRef.current += Math.min(timestamp - last, 250);

      const video = reducedMotion ? null : videoRefs.current[active];
      const duration =
        video && Number.isFinite(video.duration) && video.duration > 0
          ? video.duration * 1000
          : interval;

      if (elapsedRef.current >= duration) {
        goTo((active + 1) % slides.length);
        return;
      }
      setProgress(elapsedRef.current / duration);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [active, autoplay, userPaused, reducedMotion, slides.length, interval, goTo]);

  return (
    <div className={styles.root}>
      <div
        className={styles.stage}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHoverHeld(true);
        }}
        onPointerLeave={() => setHoverHeld(false)}
      >
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
                muted
                playsInline
                preload="auto"
                loop
              />
            )}
            <div className={styles.scrim} />
          </div>
        ))}

        <div
          className={styles.content}
          onFocus={() => setFocusPaused(true)}
          onBlur={() => setFocusPaused(false)}
        >
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

            <button
              type="button"
              className={styles.playPause}
              aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
              onClick={() => setUserPaused(!userPaused)}
            >
              {userPaused ? (
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path
                    d="M5 3l14 9-14 9V3z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true">
                  <path
                    d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </button>

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
