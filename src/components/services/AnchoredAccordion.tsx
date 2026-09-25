"use client";

import { useEffect, useState } from "react";
import { Accordion } from "@once-ui-system/core";
import type React from "react";

interface AnchoredAccordionProps {
  id: string;
  title: React.ReactNode;
  children: React.ReactNode;
}

// Opens and scrolls to itself when the page loads with a matching URL hash,
// e.g. arriving at /services#research-intelligence from a link elsewhere.
export function AnchoredAccordion({ id, title, children }: AnchoredAccordionProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (window.location.hash.slice(1) !== id) return;
    setOpen(true);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [id]);

  return (
    <div id={id}>
      <Accordion title={title} open={open} size="l" radius="m">
        {children}
      </Accordion>
    </div>
  );
}
