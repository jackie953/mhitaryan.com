"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import styles from "./LanguageToggle.module.scss";

export const LanguageToggle = () => {
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
    <Link href={toggleHref} className={styles.toggle} title={targetLabel} aria-label={ariaLabel}>
      {targetLabel}
    </Link>
  );
};
