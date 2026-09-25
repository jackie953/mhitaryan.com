import type React from "react";
import { Column, Line, Row, Text } from "@once-ui-system/core";

interface AboutSectionProps {
  /** Left column content — a page title Heading for the first section, or a SectionLabel for the rest */
  left: React.ReactNode;
  children: React.ReactNode;
  /** Thin full-width divider above the section; omit for the first section on the page */
  showDivider?: boolean;
}

export function AboutSection({ left, children, showDivider = true }: AboutSectionProps) {
  return (
    <Column fillWidth gap="xl">
      {showDivider && <Line background="neutral-alpha-weak" />}
      <Row fillWidth gap="xl" s={{ direction: "column" }}>
        <Column
          style={{ flex: "0 0 33%", maxWidth: "33%" }}
          s={{ style: { flex: "1 1 100%", maxWidth: "100%" } }}
        >
          {left}
        </Column>
        <Column
          gap="m"
          style={{ flex: "1 1 0%", minWidth: 0 }}
          s={{ style: { flex: "1 1 100%" } }}
        >
          {children}
        </Column>
      </Row>
    </Column>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: "var(--neutral-on-background-weak)",
      }}
    >
      {children}
    </Text>
  );
}
