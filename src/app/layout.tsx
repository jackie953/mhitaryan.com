import "@/styles/tailwind.css";
import "@once-ui-system/core/css/styles.css";
import "@once-ui-system/core/css/tokens.css";
import "@/resources/custom.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

import { Meta } from "@once-ui-system/core";
import { Providers } from "@/components";
import { baseURL, home } from "@/resources";

export function generateMetadata() {
  const meta = Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });

  return {
    ...meta,
    icons: {
      icon: [
        { url: "/favicon.svg?v=20260928b", type: "image/svg+xml" },
        { url: "/favicon-96x96.png?v=20260928", sizes: "96x96", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png?v=20260928" }],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=20260928b" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=20260928" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=20260928" />
        <meta name="apple-mobile-web-app-title" content="Mhitaryan" />
        <link rel="manifest" href="/site.webmanifest" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="c2a62245-10d7-4dd8-ae04-8e9843c9e7db" />
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
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
