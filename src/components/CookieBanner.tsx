"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Text, Button } from "@once-ui-system/core";

export function CookieBanner() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookiesAccepted");
    if (!hasAccepted) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  // HIDDEN: cookie banner temporarily disabled — remove this line to restore
  return null;
  // eslint-disable-next-line no-unreachable
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 start-1/2 transform -translate-x-1/2 z-[60] sm:max-w-3xl w-full mx-auto px-4 py-6">
      <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-2xl dark:bg-neutral-900 dark:border-neutral-800 flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center">
          <Text variant="body-default-s" onBackground="neutral-weak">
            By continuing to use this site you consent to the use of cookies in accordance with our{" "}
            <Link
              className="text-blue-600 hover:underline font-medium dark:text-blue-500"
              href={`/${locale}/privacy`}
            >
              Cookies Policy
            </Link>
            .
          </Text>
        </div>
        <Button
          onClick={handleDismiss}
          variant="tertiary"
          size="s"
          className="shrink-0"
          aria-label="Dismiss cookie banner"
        >
          <svg
            className="size-5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </Button>
      </div>
    </div>
  );
}