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
import { ProjectVideoGrid } from "@/components/work/ProjectVideoGrid";
import { Posts } from "@/components/blog/Posts";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Testimonial1 } from "@/components/testimonial-1";
import { testimonials } from "@/components/testimonial-1-data";
import { getPosts } from "@/utils/utils";
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
  const sortedProjects = getPosts(["src", "app", "work", "projects"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const videoProjects = sortedProjects.slice(0, 2).map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    video: post.metadata.images?.[0] ?? "",
  }));
  const hasMoreProjects = sortedProjects.length > 2;

  return (
    <>
      <Column fillWidth gap="80" paddingY="12" horizontal="center">
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
        <Column maxWidth="m" fillWidth horizontal="center" gap="m">
          <Column horizontal="center" align="center" gap="32">
            {home.featured.display && (
              <RevealFx speed="fast" delay={0.5} fillWidth horizontal="center" paddingLeft="12">
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
            <RevealFx speed="fast" translateY="4" delay={0.5} fillWidth horizontal="center">
              <Column maxWidth="s" horizontal="center">
                <Heading wrap="balance" variant="display-strong-l">
                  {home.headline}
                </Heading>
              </Column>
            </RevealFx>
            <RevealFx speed="fast" translateY="8" delay={0.65} fillWidth horizontal="center">
              <Column maxWidth="m" horizontal="center">
                <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                  {home.subline}
                </Text>
              </Column>
            </RevealFx>
            <RevealFx speed="fast" delay={0.8} horizontal="center" paddingLeft="12">
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
        <Column maxWidth="xl" fillWidth horizontal="center">
          <ScrollReveal>
            <Column fillWidth paddingX="l">
              <ProjectVideoGrid projects={videoProjects} />
            </Column>
          </ScrollReveal>
        </Column>
        {routes["/blog"] && (
          <Column maxWidth="m" fillWidth horizontal="center" gap="24" marginBottom="l">
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
        {hasMoreProjects && (
          <Column maxWidth="m" fillWidth horizontal="center">
            <ScrollReveal>
              <Projects range={[3]} />
            </ScrollReveal>
          </Column>
        )}
        <Column maxWidth="m" fillWidth paddingX="l">
          <ScrollReveal>
            <Testimonial1 testimonials={testimonials} />
          </ScrollReveal>
        </Column>
        <Column maxWidth="m" fillWidth>
          <ScrollReveal>
            <BookingCTA
              title="Work with us."
              description="A short conversation to explore whether there's a fit."
              buttonText="Get in touch"
              buttonHref="mailto:contact@mhitaryan.com"
            />
          </ScrollReveal>
        </Column>
      </Column>
      <CookieBanner />
    </>
  );
}
