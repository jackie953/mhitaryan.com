import { ReactNode } from "react";
import { Line } from "@once-ui-system/core";

interface AboutSectionProps {
  left: ReactNode;
  children: ReactNode;
  showDivider?: boolean;
}

export function AboutSection({ left, children, showDivider = true }: AboutSectionProps) {
  return (
    <div className="about-section-container">
      {showDivider && (
        <div className="about-section-divider">
          <Line background="neutral-alpha-weak" />
        </div>
      )}
      <div className="about-section-grid">
        <div className="about-section-left">{left}</div>
        <div className="about-section-right">{children}</div>
      </div>
      <style>{`
        .about-section-container {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
        .about-section-divider {
          width: 100%;
          margin-bottom: 32px;
        }
        .about-section-grid {
          display: flex;
          width: 100%;
          gap: 48px;
          align-items: flex-start;
        }
        .about-section-left {
          flex: 0 0 33%;
          max-width: 33%;
        }
        .about-section-right {
          flex: 1 1 0%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 768px) {
          .about-section-grid {
            flex-direction: column;
            gap: 16px;
          }
          .about-section-left {
            flex: 1 1 100%;
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-xs font-semibold tracking-wider uppercase text-neutral-weak">
      {children}
    </span>
  );
}
