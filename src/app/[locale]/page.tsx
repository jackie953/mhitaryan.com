import {
  Heading,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  RevealFx,
  Grid,
} from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import { home, about, person, baseURL, getContactEmail } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { ServiceCard } from "@/components/ServiceCard";
import { ScrollReveal } from "@/components/ScrollReveal";

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
              <Heading
                wrap="balance"
                variant="display-strong-l"
                style={{
                  fontSize: "clamp(3.25rem, 7.8vw, 7.8rem)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.03em",
                }}
              >
                {home.headline}
              </Heading>
            </Column>
          </RevealFx>
        </Column>
        <ScrollReveal delay={0.55}>
          <Grid columns="2" s={{ columns: 1 }} fillWidth gap="40">
            <ServiceCard
              href={`/${locale}/services#research-intelligence`}
              video="/images/projects/project-01/video-1.mp4"
              label="Research & Intelligence"
              heading="Understand the landscape"
            />
            <ServiceCard
              href={`/${locale}/services#strategic-communications`}
              video="/images/projects/project-01/video-2.mp4"
              label="Strategic Communications"
              heading="Shape the narrative"
            />
          </Grid>
        </ScrollReveal>
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
