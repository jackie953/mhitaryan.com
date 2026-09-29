"use client";

import { useEffect, useState } from "react";
import { Button, Heading, Text, Column, Mask } from "@once-ui-system/core";
import type { opacity, SpacingToken } from "@once-ui-system/core";

interface BookingCTAConfig {
  display: boolean;
  title: string;
  description: string;
  calendlyUrl: string;
  effects: {
    mask: { x: number; y: number; radius: number; cursor: boolean };
    gradient: {
      display: boolean;
      opacity: number;
      x: number;
      y: number;
      width: number;
      height: number;
      tilt: number;
      colorStart: string;
      colorEnd: string;
    };
    dots: {
      display: boolean;
      opacity: number;
      size: string;
      color: string;
    };
    grid: {
      display: boolean;
      opacity: number;
      color: string;
      width: string;
      height: string;
    };
    lines: {
      display: boolean;
      opacity: number;
      size: string;
      thickness: number;
      angle: number;
      color: string;
    };
  };
}

const bookingConfig: BookingCTAConfig = {
  display: true,
  title: "Book a Discovery Call",
  description: "Arrange a no-obligation consultation to explore how we can work together.",
  calendlyUrl: "https://cal.com/mhitaryan",
  effects: {
    mask: { x: 50, y: 0, radius: 100, cursor: true },
    gradient: {
      display: true,
      opacity: 40,
      x: 50,
      y: 0,
      width: 50,
      height: 50,
      tilt: 0,
      colorStart: "accent-background-strong",
      colorEnd: "static-transparent",
    },
    dots: {
      display: true,
      opacity: 20,
      size: "2",
      color: "brand-on-background-weak",
    },
    grid: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      width: "0.25rem",
      height: "0.25rem",
    },
    lines: {
      display: false,
      opacity: 100,
      color: "neutral-alpha-medium",
      size: "16",
      thickness: 1,
      angle: 90,
    },
  },
};

interface BookingCTAOverrides {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
  /**
   * Base64-encoded href (use for a mailto: address). Decoded client-side
   * after mount, so the plain address never appears in the page's HTML or
   * the React Server Component payload — a prop value like `buttonHref`
   * gets serialized into that payload verbatim regardless of when the
   * component chooses to render it, so gating render time alone isn't
   * enough to keep an address out of the served bytes.
   */
  buttonHrefEncoded?: string;
}

export const BookingCTA: React.FC<React.ComponentProps<typeof Column> & BookingCTAOverrides> = ({ title, description, buttonText, buttonHref, buttonHrefEncoded, ...flex }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!bookingConfig.display) return null;
  const displayTitle = title ?? bookingConfig.title;
  const displayDescription = description === "" ? "" : description ?? bookingConfig.description;
  const displayButtonText = buttonText ?? "Book Now";
  const displayButtonHref = buttonHrefEncoded
    ? (mounted ? atob(buttonHrefEncoded) : undefined)
    : (buttonHref ?? bookingConfig.calendlyUrl);
  const isMailto = Boolean(buttonHrefEncoded) || (buttonHref ?? bookingConfig.calendlyUrl).startsWith("mailto:");

  return (
    <Column
      position="relative"
      overflow="hidden"
      fillWidth
      paddingX="xl"
      paddingY="80"
      radius="l"
      horizontal="center"
      vertical="center"
      align="center"
      background="surface"
      className="max-sm:!pt-16 max-sm:!px-8 max-sm:!pb-16"
      style={{ minHeight: "32rem" }}
      {...flex}
    >
      {/* Cursor-following spotlight — replays the glow wherever the pointer
          is over the card, instead of a static fixed-position gradient. */}
      <Mask
        cursor={bookingConfig.effects.mask.cursor}
        radius={50}
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, var(--accent-background-strong, rgba(93,50,133,0.45)) 0%, transparent 70%)',
          opacity: bookingConfig.effects.gradient.opacity / 100,
        }} />
      </Mask>

      <Column maxWidth="xs" horizontal="center">
        <Heading marginBottom={displayDescription ? "s" : "l"} variant="display-strong-xs">
          {displayTitle}
        </Heading>
        {displayDescription && (
          <Text wrap="balance" marginBottom="l" variant="body-default-l" onBackground="neutral-weak">
            {displayDescription}
          </Text>
        )}
      </Column>

      <a
        href={displayButtonHref}
        target={isMailto ? '_self' : '_blank'}
        rel="noopener noreferrer"
        aria-disabled={displayButtonHref === undefined}
        style={{ textDecoration: 'none', display: 'inline-block' }}
        onClick={isMailto ? () => window.umami?.track('contact-click') : undefined}
      >
        <Button size="m" style={{ paddingInline: '2rem' }}>
          {displayButtonText}
        </Button>
      </a>
    </Column>
  );
};
