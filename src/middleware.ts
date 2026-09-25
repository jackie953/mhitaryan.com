import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "sv"],
  defaultLocale: "en",
});

export const config = {
  matcher: [
    "/((?!_next|api|favicon.ico|robots.txt|sitemap.xml|.*\\.png|.*\\.ico|.*\\.webmanifest).*)",
  ],
};
