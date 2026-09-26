import { Heading, Text, Column } from "@once-ui-system/core";
import { getTranslations, getLocale } from "next-intl/server";
import { getContactEmail } from "@/resources";

export const PrivacyContent = async () => {
  const t = await getTranslations("privacy");
  const locale = await getLocale();
  const contactEmail = getContactEmail(locale);

  return (
    <Column maxWidth="m" fillWidth gap="xl">
      <Heading variant="display-strong-s">{t("title")}</Heading>

      <Text variant="body-default-m" onBackground="neutral-weak">
        {t("intro")}
      </Text>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("analytics")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("analyticsText")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("contact")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("contactText")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("rights")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("rightsText")}{" "}
          <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:underline dark:text-blue-500">
            {contactEmail}
          </a>
          {t("rightsTextAfter")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("changes")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("changesText")}
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak" style={{ fontStyle: "italic" }}>
          {t("lastUpdated")}
        </Text>
      </Column>
    </Column>
  );
};
