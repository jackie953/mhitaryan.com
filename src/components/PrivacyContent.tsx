import { Heading, Text, Column } from "@once-ui-system/core";
import { getTranslations } from "next-intl/server";
import { CONTACT_EMAIL } from "@/resources";

export const PrivacyContent = async () => {
  const t = await getTranslations("privacy");

  return (
    <Column maxWidth="m" fillWidth gap="xl">
      <Heading variant="display-strong-s">{t("title")}</Heading>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("whoResponsible")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("whoResponsibleText")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("whatWeCollect")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("whatWeCollectIntro")}
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: "disc" }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("whatWeCollectItem1")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("whatWeCollectItem2")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("whatWeCollectItem3")}
          </Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("whatWeCollectNote")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("howWeUse")}</Heading>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: "disc" }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("howWeUseItem1")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("howWeUseItem2")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("howWeUseItem3")}
          </Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("howWeUseNote")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("legalBasis")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("legalBasisIntro")}
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: "disc" }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("legalBasisItem1")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("legalBasisItem2")}
          </Text>
        </Column>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("sharing")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("sharingText")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("cookies")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("cookiesIntro")}
        </Text>
        <Column as="ul" gap="s" paddingLeft="l" style={{ listStyleType: "disc" }}>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("cookiesItem1")}
          </Text>
          <Text as="li" variant="body-default-m" onBackground="neutral-weak">
            {t("cookiesItem2")}
          </Text>
        </Column>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("cookiesNote")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("rights")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("rightsText")}{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline dark:text-blue-500">
            {CONTACT_EMAIL}
          </a>
          .
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("security")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("securityText")}
        </Text>
      </Column>

      <Column gap="m">
        <Heading variant="heading-strong-m">{t("updates")}</Heading>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {t("updatesText")}
        </Text>
        <Text variant="body-default-s" onBackground="neutral-weak" style={{ fontStyle: "italic" }}>
          {t("lastUpdated")}
        </Text>
      </Column>
    </Column>
  );
};
