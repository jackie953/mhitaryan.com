import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "sv"],
  defaultLocale: "en",
});

export const config = {
  // Skip API routes, Next.js internals, and any request for a static file
  // (anything with a file extension — images, video, fonts, etc.). The
  // previous pattern only excluded a few specific extensions and ended up
  // redirecting every other public asset (e.g. /images/*.mp4) through a
  // locale prefix, 404ing them.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
