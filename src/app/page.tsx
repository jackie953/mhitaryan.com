import {
  Heading,
  Text,
  Column,
  Badge,
  Row,
  Schema,
  Meta,
  RevealFx,
} from "@once-ui-system/core";
import { home, about, person, baseURL } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { ProjectVideoGrid } from "@/components/cases/ProjectVideoGrid";
import { CookieBanner } from "@/components/CookieBanner";
import { ScrollReveal } from "@/components/ScrollReveal";
import { getPosts } from "@/utils/utils";

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
  const sortedCases = getPosts(["src", "app", "cases", "projects"]).sort(
    (a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
  );
  const videoCases = sortedCases.slice(0, 2).map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    video: post.metadata.images?.[0] ?? "",
  }));

  return (
    <>
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
        <Column fillWidth gap="32">
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
          <RevealFx speed="fast" translateY="4" delay={0.5} fillWidth>
            <Column maxWidth="s" fillWidth>
              <Heading wrap="balance" variant="display-strong-l">
                {home.headline}
              </Heading>
            </Column>
          </RevealFx>
          <RevealFx speed="fast" translateY="8" delay={0.65} fillWidth>
            <Column maxWidth="m" fillWidth>
              <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {home.subline}
              </Text>
            </Column>
          </RevealFx>
        </Column>
        <ScrollReveal>
          <ProjectVideoGrid projects={videoCases} />
        </ScrollReveal>
        <ScrollReveal>
          <BookingCTA
            title="Work with us."
            description="A short conversation to explore whether there's a fit."
            buttonText="Get in touch"
            buttonHref="mailto:contact@mhitaryan.com"
          />
        </ScrollReveal>
      </Column>
      <CookieBanner />
    </>
  );
}
