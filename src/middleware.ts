import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "sv"],
  defaultLocale: "en",
  // Swedish is paused and /sv redirects to /en. Without this, a Swedish browser
  // (or a stale NEXT_LOCALE cookie) would be sent to /sv and bounce in a loop.
  localeDetection: false,
});

export const config = {
  // Skip API routes, Next.js internals, and any request for a static file
  // (anything with a file extension — images, video, fonts, etc.). The
  // previous pattern only excluded a few specific extensions and ended up
  // redirecting every other public asset (e.g. /images/*.mp4) through a
  // locale prefix, 404ing them.
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
