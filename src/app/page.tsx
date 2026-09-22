import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
} from "@once-ui-system/core";
import { home, about, services, contact, person, baseURL, routes } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { CookieBanner } from "@/components/CookieBanner";
import { Testimonial1 } from "@/components/testimonial-1";
import { testimonials } from "@/components/testimonial-1-data";
import Services from "./services/page";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <>
      <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
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
        <Column fillWidth horizontal="center" gap="m">
          <Column maxWidth="s" horizontal="center" align="center">
            {home.featured.display && (
              <RevealFx
                fillWidth
                horizontal="center"
                paddingTop="16"
                paddingBottom="32"
                paddingLeft="12"
              >
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
            <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </RevealFx>
            <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="16">
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </RevealFx>
            <RevealFx paddingTop="4" delay={0.4} horizontal="center" paddingLeft="12">
              <Column
                position="relative"
                overflow="hidden"
                radius="l"
                style={{ display: 'inline-flex' }}
              >
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  background: 'radial-gradient(ellipse at 50% 0%, var(--accent-background-strong, rgba(120,80,200,0.35)) 0%, transparent 70%)',
                  opacity: 0.6, borderRadius: 'inherit',
                }} />
                <Button
                  id="learn-more"
                  data-border="rounded"
                  href={services.path}
                  variant="secondary"
                  size="m"
                  weight="default"
                  arrowIcon
                  className="text-neutral-900 dark:!text-white"
                  style={{ border: '1px solid var(--neutral-alpha-medium)' }}
                >
                  Learn more
                </Button>
              </Column>
            </RevealFx>
          </Column>
        </Column>
        <Column fillWidth gap="m">
          <RevealFx translateY="8" delay={0.2}>
            <Projects range={[1, 1]} />
          </RevealFx>
          {routes["/blog"] && (
            <Column fillWidth gap="24" marginBottom="l">
              <Row fillWidth paddingRight="64">
                <Line maxWidth={48} />
              </Row>
              <Row fillWidth gap="24" marginTop="40" s={{ direction: "column" }}>
                <Row flex={1} paddingLeft="l" paddingTop="24">
                  <Heading as="h2" variant="display-strong-xs" wrap="balance">
                  </Heading>
                </Row>
                <Row flex={3} paddingX="20">
                  <Posts range={[1, 2]} columns="2" />
                </Row>
              </Row>
              <Row fillWidth paddingLeft="64" horizontal="end">
                <Line maxWidth={48} />
              </Row>
            </Column>
          )}
          <Projects range={[2]} />
        </Column>
        <Column fillWidth paddingX="l">
          <Testimonial1 testimonials={testimonials} />
        </Column>
        <BookingCTA
          title="Work with us."
          description="A short conversation to explore whether there's a fit."
          buttonText="Get in touch"
          mailButton
        />
      </Column>
      <CookieBanner />
    </>
  );
}