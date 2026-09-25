"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Text } from "@once-ui-system/core";

export function CookieBanner() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "16px",
        right: "16px",
        zIndex: 60,
        width: "min(320px, calc(100vw - 32px))",
      }}
    >
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius-l)",
          border: "1px solid var(--neutral-alpha-weak)",
          background: "var(--surface-background)",
          boxShadow: "var(--shadow-l)",
          padding: "14px 16px",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse at 100% 0%, var(--accent-background-strong, rgba(93,50,133,0.45)) 0%, transparent 70%)",
            opacity: 0.4,
          }}
        />
        <button
          onClick={handleDismiss}
          aria-label="Dismiss cookie banner"
          style={{
            position: "absolute",
            top: "8px",
            right: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "20px",
            height: "20px",
            border: "none",
            background: "transparent",
            color: "var(--neutral-on-background-weak)",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
        <Text
          variant="body-default-xs"
          onBackground="neutral-weak"
          style={{ position: "relative", display: "block", paddingRight: "18px", lineHeight: 1.5 }}
        >
          We use essential cookies to make our site work. With your permission, we&apos;ll also use
          analytics cookies to improve your experience. You can change your choice anytime. See our{" "}
          <Link
            href={`/${locale}/privacy`}
            style={{ color: "var(--neutral-on-background-strong)", textDecoration: "underline" }}
          >
            Privacy Policy
          </Link>{" "}
          for details.
        </Text>
      </div>
    </div>
  );
}
