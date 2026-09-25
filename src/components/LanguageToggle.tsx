"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ToggleButton } from "@once-ui-system/core";

const SwedenFlag = () => (
  <svg width="18" height="13" viewBox="0 0 20 14" fill="none">
    <rect width="20" height="14" fill="#006AA7" />
    <rect y="5" width="20" height="4" fill="#FFCC00" />
    <rect x="8" width="4" height="14" fill="#FFCC00" />
  </svg>
);

const USFlag = () => (
  <svg width="18" height="13" viewBox="0 0 20 14" fill="none">
    <rect width="20" height="14" fill="#3C3B6B" />
    <rect y="1" width="20" height="1" fill="white" />
    <rect y="3" width="20" height="1" fill="white" />
    <rect y="5" width="20" height="1" fill="white" />
    <rect y="7" width="20" height="1" fill="white" />
    <rect y="9" width="20" height="1" fill="white" />
    <rect y="11" width="20" height="1" fill="white" />
    <rect y="13" width="20" height="1" fill="white" />
    <rect width="8" height="7" fill="#B22234" />
    <rect y="2" width="8" height="2" fill="#B22234" />
    <rect y="4" width="8" height="2" fill="#B22234" />
    <rect y="6" width="8" height="2" fill="#B22234" />
  </svg>
);

export const LanguageToggle = ({ size = "m" }: { size?: "s" | "m" | "l" }) => {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";

  // Strip the leading /en or /sv locale segment, whether or not anything follows it.
  const basePathname = pathname.replace(/^\/(en|sv)(?=\/|$)/, "") || "/";

  const isSwedish = locale === "sv";
  const nextLocale = isSwedish ? "en" : "sv";
  const toggleHref = `/${nextLocale}${basePathname === "/" ? "" : basePathname}`;

  const toggleLabel = isSwedish ? "English" : "Svenska";
  const ariaLabel = isSwedish ? "Switch to English" : "Byt till svenska";

  return (
    <ToggleButton size={size} href={toggleHref} title={toggleLabel} aria-label={ariaLabel}>
      {isSwedish ? <USFlag /> : <SwedenFlag />}
    </ToggleButton>
  );
};
