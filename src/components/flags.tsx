"use client";

import { useId } from "react";
import type React from "react";

type FlagProps = {
  size?: number;
};

/** Thin ring (rgba of the logo's near-black) so a flag sits well on the pill. */
const Ring: React.FC<{ cx: number; cy: number; r: number }> = ({ cx, cy, r }) => (
  <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--header-color)" strokeOpacity={0.15} strokeWidth="1" />
);

/** Round Swedish flag — shown when the site is in English (switches to SV). */
export const SwedishFlag: React.FC<FlagProps> = ({ size = 22 }) => {
  const clipId = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <clipPath id={clipId}>
        <circle cx="10" cy="10" r="9.5" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        <rect x="0" y="0" width="20" height="20" fill="#006AA7" />
        <rect x="7" y="0" width="3" height="20" fill="#FECC02" />
        <rect x="0" y="8" width="20" height="3" fill="#FECC02" />
      </g>
      <Ring cx={10} cy={10} r={9.5} />
    </svg>
  );
};

/** Round US flag, cropped square so the blue canton stays visible top-left —
    shown when the site is in Swedish (switches to EN). */
export const UsFlag: React.FC<FlagProps> = ({ size = 22 }) => {
  const clipId = useId();
  const stripeHeight = 20 / 13;
  const cantonWidth = 8;
  const cantonHeight = stripeHeight * 7;
  const starPositions: [number, number][] = [
    [1.6, 1.6], [4, 1.6], [6.4, 1.6],
    [2.8, 3.6], [5.2, 3.6],
    [1.6, 5.6], [4, 5.6], [6.4, 5.6],
    [2.8, 7.6], [5.2, 7.6],
  ];

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <clipPath id={clipId}>
        <circle cx="10" cy="10" r="9.5" />
      </clipPath>
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: 13 }, (_, i) => (
          <rect
            key={i}
            x="0"
            y={i * stripeHeight}
            width="20"
            height={stripeHeight}
            fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"}
          />
        ))}
        <rect x="0" y="0" width={cantonWidth} height={cantonHeight} fill="#3C3B6E" />
        {starPositions.map(([sx, sy], idx) => (
          <circle key={idx} cx={sx} cy={sy} r="0.55" fill="#fff" />
        ))}
      </g>
      <Ring cx={10} cy={10} r={9.5} />
    </svg>
  );
};
