import "@/styles/tailwind.css";
import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import classNames from "classnames";

import {
  Column,
  Flex,
  Meta,
  type opacity,
  type SpacingToken,
} from "@once-ui-system/core";
import { Footer, Header, RouteGuard, Providers } from "@/components";
import { baseURL, fonts, style, dataStyle, home } from "@/resources";

// CTA chat-bubble widget — hidden for now, kept for future re-enable.
// import CTAWrapper from "@/components/CTAWrapper";

export function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="MC" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* 🧠 Smart default theme: respects system preference and saved user choice */}
        <Script id="init-theme" strategy="beforeInteractive">
          {`
            try {
              const saved = localStorage.getItem('theme');
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = saved || (prefersDark ? 'dark' : 'light');
              document.documentElement.setAttribute('data-theme', theme);
            } catch (e) {
              document.documentElement.setAttribute('data-theme', 'light');
            }
          `}
        </Script>
      </head>
      <body>
        <Providers>
          <Flex
            fillWidth
            className={classNames(
              fonts.heading.variable,
              fonts.body.variable,
              fonts.label.variable,
              fonts.code.variable
            )}
          >
            <Column
              background="page"
              fillWidth
              style={{ minHeight: "100vh" }}
              margin="0"
              padding="0"
              horizontal="center"
            >
              <Flex fillWidth minHeight="16" s={{ hide: true }} />
              <Header />
              {/* Spacer so content starts below the fixed header on mobile */}
              <Flex fillWidth hide s={{ hide: false }} style={{ height: '64px', flexShrink: 0 }} />
              <Flex zIndex={0} fillWidth padding="l" horizontal="center" flex={1}>
                <Flex horizontal="center" fillWidth minHeight="0">
                  <RouteGuard>{children}</RouteGuard>
                </Flex>
              </Flex>
              <Footer />
              {/* <CTAWrapper /> */}
            </Column>
          </Flex>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
