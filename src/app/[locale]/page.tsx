import {
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { getLocale, getTranslations } from "next-intl/server";
import { home, about, person, baseURL, getContactEmail } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { HeroGallerySlider } from "@/components/HeroGallerySlider";
import { HeroHeadline } from "@/components/HeroHeadline";
import { HeroLineReveal } from "@/components/HeroLineReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import styles from "./Hero.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations("home");
  return (
      <Column fillWidth gap="80">
        <Schema
          as="webPage"
          baseURL={baseURL}
          path={home.path}
          title={home.title}
          description={home.description}
          image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
          author={{
            name: person.name,
            url: `${baseURL}${about.path}`,
            image: `${baseURL}${person.avatar}`,
          }}
        />
        <Column fillWidth gap="0">
          <Column
            fillWidth
            gap="32"
            vertical="end"
            style={{ minHeight: "80vh", paddingTop: "96px", paddingBottom: "3rem" }}
            s={{ style: { minHeight: "auto", paddingTop: "0px", paddingBottom: "2rem" } }}
          >
            {home.featured.display && (
              <RevealFx speed="fast" delay={0.5} fillWidth>
                <Badge
                  background="brand-alpha-weak"
                  paddingX="12"
                  paddingY="4"
                  onBackground="neutral-strong"
                  textVariant="label-default-s"
                  arrow={false}
                  href={home.featured.href}
                >
                  <Row paddingY="2">{home.featured.title}</Row>
                </Badge>
              </RevealFx>
            )}
            <Column maxWidth="l" fillWidth>
              <HeroHeadline
                headline={
                  <>
                    <HeroLineReveal delay={0.15}>{t("headlineLine1")}</HeroLineReveal>
                    <br />
                    <HeroLineReveal delay={0.55}>{t("headlineLine2")}</HeroLineReveal>
                  </>
                }
                headingStyle={{
                  fontSize: "clamp(3.25rem, 9.2vw, 9.2rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
                sentences={t.raw("subheadlineSentences")}
                sublineDelay={0.95}
              />
            </Column>
          </Column>
          <ScrollReveal className={styles.gallery}>
            <HeroGallerySlider
              interval={9000}
              autoplay
              showProgress
              slides={[
                {
                  video: "/videos/hero/research-network.mp4",
                  poster: "/videos/hero/research-network-poster.jpg",
                  eyebrow: t("gallery.slide1.eyebrow"),
                  heading: t("gallery.slide1.heading"),
                  subtext: t("gallery.slide1.subtext"),
                  ctaLabel: t("gallery.cta"),
                  ctaHref: `/${locale}/services`,
                },
                {
                  video: "/videos/hero/comms-water.mp4",
                  poster: "/videos/hero/comms-water-poster.jpg",
                  eyebrow: t("gallery.slide2.eyebrow"),
                  heading: t("gallery.slide2.heading"),
                  subtext: t("gallery.slide2.subtext"),
                  ctaLabel: t("gallery.cta"),
                  ctaHref: `/${locale}/services`,
                },
              ]}
            />
          </ScrollReveal>
        </Column>
        <div 
          style={{ 
            marginTop: "-2rem",
            marginBottom: "calc(-1 * var(--responsive-space-xl) - 2rem)",
          }}
        >
          <ScrollReveal>
            <BookingCTA
              title="Before your next move, talk to us."
              description=""
              buttonText="Get in touch"
              buttonHrefEncoded={Buffer.from(`mailto:${getContactEmail(locale)}`).toString("base64")}
            />
          </ScrollReveal>
        </div>
      </Column>
  );
}
