"use client";

import { Button, Icon, Row } from "@once-ui-system/core";
import { openContactEmail } from "@/utils/contact-email";

export function ScheduleEmailButton() {
  return (
    <Button
      id="schedule-call"
      data-border="rounded"
      onClick={openContactEmail}
      variant="secondary"
      size="l"
      style={{ paddingInline: "2rem", paddingBlock: "0.875rem", fontSize: "1.05rem", border: "1px solid var(--neutral-alpha-medium)" }}
      weight="default"
      arrowIcon
      className="text-neutral-900 dark:!text-white"
    >
      <Row vertical="center" gap="8">
        <Icon name="email" style={{ color: "var(--scheme-violet-300)" }} />
        <span>Get in touch</span>
      </Row>
    </Button>
  );
}
