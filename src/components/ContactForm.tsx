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
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    window.umami?.track("contact-form-submit");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, organization, message, locale }),
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
        <Input
          id="contact-name"
          label={t("formNameLabel")}
          placeholder={t("formNamePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          id="contact-email"
          type="email"
          label={t("formEmailLabel")}
          placeholder={t("formEmailPlaceholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          id="contact-organization"
          label={t("formOrganizationLabel")}
          placeholder={t("formOrganizationPlaceholder")}
          value={organization}
          onChange={(e) => setOrganization(e.target.value)}
        />
        <Textarea
          id="contact-message"
          label={t("formMessageLabel")}
          placeholder={t("formMessagePlaceholder")}
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
          {t("formSubmit")}
        </Button>
      </Column>
    </form>
  );
};
