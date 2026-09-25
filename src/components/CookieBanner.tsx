"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Background, Column, Icon, Row, Text } from "@once-ui-system/core";

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
    <Column
      position="fixed"
      style={{ bottom: "16px", right: "16px", zIndex: 60 }}
      maxWidth={18}
      padding="16"
      gap="8"
      radius="l"
      border="neutral-alpha-weak"
      overflow="hidden"
      background="surface"
      shadow="l"
    >
      <Background
        position="absolute"
        fill
        left="0"
        top="0"
        gradient={{
          display: true,
          opacity: 10,
          x: 100,
          y: 0,
          width: 80,
          height: 80,
          colorStart: "accent-background-strong",
          colorEnd: "static-transparent",
        }}
      />

      <Row gap="8" vertical="center" fillWidth style={{ position: "relative" }}>
        <Icon
          name="security"
          size="xs"
          padding="8"
          radius="full"
          background="brand-alpha-weak"
          onBackground="brand-weak"
        />
        <Row fillWidth horizontal="end">
          <button
            onClick={handleDismiss}
            aria-label="Dismiss cookie banner"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "18px",
              height: "18px",
              border: "none",
              background: "transparent",
              color: "var(--neutral-on-background-weak)",
              cursor: "pointer",
              padding: 0,
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </Row>
      </Row>

      <Text
        variant="body-default-xs"
        onBackground="neutral-weak"
        wrap="balance"
        style={{ position: "relative", lineHeight: 1.5 }}
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
    </Column>
  );
}
