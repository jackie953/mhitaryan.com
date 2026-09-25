"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import styles from "./CookieBanner.module.scss";

export function CookieBanner() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.cookieCard}>
        <p className={styles.title}>We use cookies</p>
        <p className={styles.description}>
          We use essential cookies to make our site work. With your permission, we&apos;ll also use
          analytics cookies to improve your experience. You can change your choice anytime. See our{" "}
          <Link href={`/${locale}/privacy`}>Privacy Policy</Link> for details.
        </p>
        <div className={styles.actions}>
          <button className={styles.pref} onClick={handleDismiss}>
            Manage preferences
          </button>
          <button className={styles.accept} onClick={handleDismiss}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
