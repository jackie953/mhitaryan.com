import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import classNames from "classnames";

import { Column, Flex } from "@once-ui-system/core";
import { Footer, Header, RouteGuard } from "@/components";
import { CookieBanner } from "@/components/CookieBanner";
import { fonts } from "@/resources";

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "sv" }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
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
          <Flex fillWidth minHeight="12" s={{ hide: true }} />
          <Header />
          {/* Spacer so content starts below the fixed header on mobile */}
          <Flex fillWidth hide s={{ hide: false }} style={{ height: "64px", flexShrink: 0 }} />
          <Flex zIndex={0} fillWidth horizontal="center" flex={1}>
            {/* Wide, left-aligned container matching the header's max-width
                and left inset — every page's content starts at the same
                left edge as the logo. */}
            <Column
              maxWidth="xl"
              fillWidth
              minHeight="0"
              paddingX="12"
              paddingTop="l"
              paddingBottom="xl"
              s={{ paddingX: "16" }}
            >
              <RouteGuard>{children}</RouteGuard>
            </Column>
          </Flex>
          <Footer />
          {/* <CTAWrapper /> */}
        </Column>
      </Flex>
      <CookieBanner />
    </NextIntlClientProvider>
  );
}
