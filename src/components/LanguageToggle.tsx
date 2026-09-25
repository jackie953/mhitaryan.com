"use client";

import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import { ToggleButton } from "@once-ui-system/core";

export const LanguageToggle = ({ size = "m" }: { size?: "s" | "m" | "l" }) => {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";

  // Strip the leading /en or /sv locale segment, whether or not anything follows it.
  const basePathname = pathname.replace(/^\/(en|sv)(?=\/|$)/, "") || "/";

  const isSwedish = locale === "sv";
  const nextLocale = isSwedish ? "en" : "sv";
  const toggleHref = `/${nextLocale}${basePathname === "/" ? "" : basePathname}`;

  const targetLabel = isSwedish ? "EN" : "SV";
  const ariaLabel = isSwedish ? "Switch to English" : "Byt till svenska";

  return (
    <ToggleButton size={size} href={toggleHref} label={targetLabel} title={targetLabel} aria-label={ariaLabel} />
  );
};
