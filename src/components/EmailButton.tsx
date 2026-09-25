import { IconButton } from "@once-ui-system/core";
import { CONTACT_EMAIL } from "@/resources";

interface EmailButtonProps {
  size?: "s" | "m" | "l";
  variant?: "ghost" | "primary" | "secondary" | "tertiary" | "danger";
}

export const EmailButton = ({ size = "m", variant = "ghost" }: EmailButtonProps) => {
  return (
    <IconButton
      href={`mailto:${CONTACT_EMAIL}`}
      icon="email"
      tooltip="Get in touch"
      aria-label="Email Mhitaryan"
      size={size}
      variant={variant}
    />
  );
};
