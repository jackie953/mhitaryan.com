"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";
import { about, services, cases, getContactEmail, LINKEDIN_URL, LOCATION, NETWORK_LINKS } from "@/resources";
import VariableFontHoverByLetter from "@/components/fancy/text/variable-font-hover-by-letter";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const withLocale = (path: string) => `/${locale}${path}`;
  const contactEmail = getContactEmail(locale);

  return (
    <footer style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.hairline} />

        <div className={styles.grid}>
          <div className={styles.column}>
            <motion.div className={styles.brandLockup} whileHover="hover">
              <VariableFontHoverByLetter
                inheritHover
                label="MHITARYAN"
                className={styles.brand}
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
              />
              <VariableFontHoverByLetter
                inheritHover
                label={t("pronunciation")}
                className={styles.pronunciation}
                staggerDuration={0.03}
                fromFontVariationSettings="'wght' 400"
                toFontVariationSettings="'wght' 900"
              />
            </motion.div>
          </div>

          <div className={styles.column}>
            <span className={styles.heading}>{t("contactHeading")}</span>
            <span className={styles.item}>{LOCATION}</span>
            <Link
              href={`mailto:${contactEmail}`}
              className={styles.link}
              onClick={() => window.umami?.track('contact-click')}
            >
              {contactEmail}
            </Link>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn
            </a>
          </div>

          <div className={styles.column}>
            <span className={styles.heading}>{t("pagesHeading")}</span>
            <Link href={withLocale(about.path)} className={styles.link}>
              {tNav("about")}
            </Link>
            <Link href={withLocale(services.path)} className={styles.link}>
              {tNav("services")}
            </Link>
            <Link href={withLocale(cases.path)} className={styles.link}>
              {tNav("cases")}
            </Link>
          </div>

          <div className={styles.column}>
            <span className={styles.heading}>{t("networkHeading")}</span>
            {NETWORK_LINKS.map((network) => (
              <a
                key={network.label}
                href={network.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {network.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.bottomText}>{t("copyright")}</span>
          <Link href={withLocale("/privacy")} className={styles.bottomLink}>
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
