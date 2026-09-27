import type React from "react";

type FlagProps = {
  size?: number;
};

/** Round Swedish flag — shown when the site is in English (switches to SV). */
export const SwedishFlag: React.FC<FlagProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <clipPath id="sv-flag-clip">
      <circle cx="10" cy="10" r="9.5" />
    </clipPath>
    <g clipPath="url(#sv-flag-clip)">
      <rect x="0" y="0" width="20" height="20" fill="#006AA7" />
      <rect x="7" y="0" width="3" height="20" fill="#FECC02" />
      <rect x="0" y="8" width="20" height="3" fill="#FECC02" />
    </g>
    <circle cx="10" cy="10" r="9.5" fill="none" stroke="var(--neutral-alpha-medium)" strokeWidth="1" />
  </svg>
);

/** Round split US/UK flag — shown when the site is in Swedish (switches to EN). */
export const UsUkFlag: React.FC<FlagProps> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <clipPath id="usuk-flag-clip">
      <circle cx="10" cy="10" r="9.5" />
    </clipPath>
    <g clipPath="url(#usuk-flag-clip)">
      {/* Left half — stylized US flag */}
      <rect x="0" y="0" width="10" height="20" fill="#B22234" />
      <rect x="0" y="2.2" width="10" height="2.2" fill="#fff" />
      <rect x="0" y="6.6" width="10" height="2.2" fill="#fff" />
      <rect x="0" y="11" width="10" height="2.2" fill="#fff" />
      <rect x="0" y="15.4" width="10" height="2.2" fill="#fff" />
      <rect x="0" y="0" width="5" height="10" fill="#3C3B6E" />

      {/* Right half — stylized UK flag */}
      <rect x="10" y="0" width="10" height="20" fill="#00247D" />
      <path d="M10 0 L20 20 M20 0 L10 20" stroke="#fff" strokeWidth="2.6" />
      <path d="M10 0 L20 20 M20 0 L10 20" stroke="#CF142B" strokeWidth="1.1" />
      <rect x="14" y="0" width="2" height="20" fill="#fff" />
      <rect x="10" y="9" width="10" height="2" fill="#fff" />
      <rect x="14.55" y="0" width="0.9" height="20" fill="#CF142B" />
      <rect x="10" y="9.55" width="10" height="0.9" fill="#CF142B" />
    </g>
    <circle cx="10" cy="10" r="9.5" fill="none" stroke="var(--neutral-alpha-medium)" strokeWidth="1" />
  </svg>
);
