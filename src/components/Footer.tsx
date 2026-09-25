"use client";

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { about, services, cases, CONTACT_EMAIL, LINKEDIN_URL, LOCATION } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const currentYear = new Date().getFullYear();

  const withLocale = (path: string) => `/${locale}${path}`;

  return (
    <footer style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div className={styles.container}>
        <div className={styles.hairline} />

        <div className={styles.grid}>
          <div className={styles.column}>
            <span className={styles.brand}>Mhitaryan</span>
            <span className={styles.pronunciation}>{t("pronunciation")}</span>
          </div>

          <div className={styles.column}>
            <span className={styles.item}>{LOCATION}</span>
            <Link href={`mailto:${CONTACT_EMAIL}`} className={styles.link}>
              {CONTACT_EMAIL}
            </Link>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={styles.link}>
              LinkedIn
            </a>
          </div>

          <div className={styles.column}>
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
        </div>

        <div className={styles.bottomRow}>
          <span className={styles.bottomText}>
            © {currentYear} Mhitaryan · {t("descriptor")}
          </span>
          <Link href={withLocale("/privacy")} className={styles.bottomLink}>
            {t("privacy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
