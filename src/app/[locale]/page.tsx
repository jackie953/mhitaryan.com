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
          <Column fillWidth gap="32" style={{ paddingTop: "96px" }} s={{ style: { paddingTop: "0px" } }}>
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
            <RevealFx speed={1600} translateY="4" delay={0.15} fillWidth>
              <Column maxWidth="l" fillWidth>
                <HeroHeadline
                  headline={home.headline}
                  headingStyle={{
                    fontSize: "clamp(3.25rem, 9.2vw, 9.2rem)",
                    lineHeight: 0.95,
                    letterSpacing: "-0.03em",
                  }}
                  sentences={t.raw("subheadlineSentences")}
                />
              </Column>
            </RevealFx>
          </Column>
          <ScrollReveal delay={0.55} className={styles.gallery}>
            <HeroGallerySlider
              interval={5000}
              autoplay
              showProgress
              slides={[
                {
                  video: "/videos/hero/research-network.mp4",
                  poster: "/videos/hero/research-network-poster.jpg",
                  eyebrow: "Research & Intelligence",
                  heading: "Understand the landscape",
                  subtext: "Placeholder subtext for the Research & Intelligence slide.",
                  ctaLabel: "Explore our services",
                  ctaHref: `/${locale}/services#research-intelligence`,
                },
                {
                  video: "/videos/hero/comms-water.mp4",
                  poster: "/videos/hero/comms-water-poster.jpg",
                  eyebrow: "Strategic Communications",
                  heading: "Shape the narrative",
                  subtext: "Placeholder subtext for the Strategic Communications slide.",
                  ctaLabel: "Explore our services",
                  ctaHref: `/${locale}/services#strategic-communications`,
                },
              ]}
            />
          </ScrollReveal>
        </Column>
        <ScrollReveal delay={0.75}>
          <BookingCTA
            title="Before your next move, talk to us."
            description=""
            buttonText="Get in touch"
            buttonHrefEncoded={Buffer.from(`mailto:${getContactEmail(locale)}`).toString("base64")}
          />
        </ScrollReveal>
      </Column>
  );
}
