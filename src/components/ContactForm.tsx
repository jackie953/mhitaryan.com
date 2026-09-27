"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, Column, Input, Textarea, Text } from "@once-ui-system/core";
import { getContactEmail } from "@/resources";

type Status = "idle" | "sending" | "success" | "error";

export const ContactForm = () => {
  const t = useTranslations("contact");
  const locale = useLocale();
  const contactEmail = getContactEmail(locale);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot — left empty by real visitors
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    window.umami?.track("contact-form-submit");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, message, website, locale }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Column
        background="page"
        radius="l"
        padding="24"
        gap="8"
        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
      >
        <Text variant="body-default-m">{t("formSuccess")}</Text>
      </Column>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Column
        background="page"
        radius="l"
        padding="24"
        gap="16"
        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
      >
        {/* Honeypot — hidden from real visitors via CSS, not `type="hidden"`,
            since bots specifically skip hidden fields. Left blank by anyone
            who can see the form. */}
        <input
          type="text"
          name="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
        />
        <Input
          id="contact-name"
          label={t("formNameLabel")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="contact-email"
          type="email"
          label={t("formEmailLabel")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="contact-organization"
          label={t("formOrganizationLabel")}
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <Textarea
          id="contact-message"
          label={t("formMessageLabel")}
          lines={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />

        {status === "error" && (
          <Text variant="body-default-s" onBackground="danger-weak">
            {t("formError")}{" "}
            <a href={`mailto:${contactEmail}`} style={{ textDecoration: "underline" }}>
              {contactEmail}
            </a>
            .
          </Text>
        )}

        <Button type="submit" fillWidth horizontal="center" loading={status === "sending"} disabled={status === "sending"}>
          {status === "sending" ? t("formSending") : t("formSubmit")}
        </Button>
      </Column>
    </form>
  );
};
