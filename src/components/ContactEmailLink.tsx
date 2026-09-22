"use client";

import { useEffect, useState } from "react";
import { getContactEmail, openContactEmail } from "@/utils/contact-email";

export function ContactEmailLink({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(getContactEmail());
  }, []);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        openContactEmail();
      }}
      className={className}
    >
      {email ?? "my email"}
    </a>
  );
}
