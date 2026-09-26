"use client";

import { useLocale } from "next-intl";
import { ToggleButton } from "@once-ui-system/core";
import { getContactEmail } from "@/resources";

interface EmailButtonProps {
  size?: "s" | "m" | "l";
}

export const EmailButton = ({ size = "m" }: EmailButtonProps) => {
  const locale = useLocale();

  return (
    <ToggleButton
      size={size}
      prefixIcon="email"
      href={`mailto:${getContactEmail(locale)}`}
      title="Get in touch"
      aria-label="Email Mhitaryan"
      onClick={() => window.umami?.track('contact-click')}
    />
  );
};
