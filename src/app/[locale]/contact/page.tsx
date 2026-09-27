import { Column, Row, Heading, Text, Icon, Meta, Schema, RevealFx } from "@once-ui-system/core";
import { getTranslations, getLocale } from "next-intl/server";
import { baseURL, contact, person, getContactEmail, getLocation } from "@/resources";
import { ContactForm } from "@/components/ContactForm";

export async function generateMetadata() {
  return Meta.generate({
    title: contact.title,
    description: contact.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(contact.title)}`,
    path: contact.path,
  });
}

export default async function Contact() {
  const t = await getTranslations("contact");
  const locale = await getLocale();
  const contactEmail = getContactEmail(locale);
  const location = getLocation(locale);

  return (
    <Column fillWidth gap="xl" className="page-contact">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={contact.title}
        description={contact.description}
        path={contact.path}
        image={`/api/og/generate?title=${encodeURIComponent(contact.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${contact.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <RevealFx translateY="4" delay={0} fillWidth>
        <Row fillWidth gap="xl" s={{ direction: "column" }}>
          {/* LEFT: heading, description, contact details */}
          <Column gap="m" style={{ flex: "1 1 0%", minWidth: 0 }} s={{ style: { flex: "1 1 100%" } }}>
            <Heading variant="display-strong-m">{t("heading")}</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              {t("description")}
            </Text>

            <Column gap="12" style={{ marginTop: "0.5rem" }}>
              <Row gap="8" vertical="center">
                <Icon name="email" size="s" onBackground="neutral-weak" decorative />
                <a href={`mailto:${contactEmail}`}>
                  <Text variant="body-default-m">{contactEmail}</Text>
                </a>
              </Row>
              <Row gap="8" vertical="center">
                <Icon name="location" size="s" onBackground="neutral-weak" decorative />
                <Text variant="body-default-m">{location}</Text>
              </Row>
            </Column>
          </Column>

          {/* RIGHT: form */}
          <Column style={{ flex: "1 1 0%", minWidth: 0 }} s={{ style: { flex: "1 1 100%" } }}>
            <ContactForm />
          </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}
