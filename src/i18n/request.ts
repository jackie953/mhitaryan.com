import { getRequestConfig } from "next-intl/server";

const locales = ["en", "sv"] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const normalizedLocale = locales.includes(requested as (typeof locales)[number])
    ? (requested as (typeof locales)[number])
    : "en";

  return {
    locale: normalizedLocale,
    messages: (await import(`./messages/${normalizedLocale}.json`)).default,
  };
});
