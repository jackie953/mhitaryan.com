"use client";

import { useLocale, useTranslations } from "next-intl";
import { Row, IconButton, Text } from "@once-ui-system/core";
import Link from "next/link";
import { social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">
            © {currentYear} Mhitaryan ·{" "}
          </Text>
          <Text onBackground="neutral-weak">{t("descriptor")}</Text>
        </Text>
        <Row gap="16" vertical="center">
          <Link
            href={`/${locale}/privacy`}
            style={{
              fontSize: "var(--font-size-body-s, 0.875rem)",
              color: "var(--neutral-on-background-weak)",
              textDecoration: "none",
            }}
          >
            {t("privacy")}
          </Link>
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
