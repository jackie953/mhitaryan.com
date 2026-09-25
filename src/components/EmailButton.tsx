import { ToggleButton } from "@once-ui-system/core";
import { CONTACT_EMAIL } from "@/resources";

interface EmailButtonProps {
  size?: "s" | "m" | "l";
}

export const EmailButton = ({ size = "m" }: EmailButtonProps) => {
  return (
    <ToggleButton
      size={size}
      prefixIcon="email"
      href={`mailto:${CONTACT_EMAIL}`}
      title="Get in touch"
      aria-label="Email Mhitaryan"
    />
  );
};
