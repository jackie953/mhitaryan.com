import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Row,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { Testimonial1 } from "@/components/testimonial-1";
import { testimonials } from "@/components/testimonial-1-data";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  return (
    <Column fillWidth gap="xl" className="page-about">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Main Header — two-column intro */}
      <RevealFx translateY="4" delay={0} fillWidth>
        <Row
          fillWidth
          vertical="center"
          gap="xl"
          s={{ direction: "column", horizontal: "start" }}
        >
          <Column gap="s" flex={1}>
            <Heading variant="display-strong-m">
              {person.name}
            </Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Clear thinking. Direct communication.
            </Text>
          </Column>
          <div style={{
            flexShrink: 0,
            width: 'clamp(100px, 20vw, 200px)',
            height: 'clamp(100px, 20vw, 200px)',
            borderRadius: '50%',
            overflow: 'hidden',
          }}>
            <img
              src="/images/avatar.jpg"
              alt={person.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>
        </Row>
      </RevealFx>

      {/* Background */}
      {about.aboutSection.display && (
        <RevealFx translateY="4" delay={0.1} fillWidth>
          <Column maxWidth="m" textVariant="body-default-l" fillWidth gap="m">
            {about.aboutSection.description}
          </Column>
        </RevealFx>
      )}

      {/* Approach */}
      {about.approach.display && (
        <RevealFx translateY="4" delay={0.2} fillWidth>
          <Column maxWidth="m" textVariant="body-default-l" fillWidth gap="m">
            <Heading as="h1" id={about.approach.title} variant="heading-strong-l">
              {about.approach.title}
            </Heading>
            {about.approach.description}
          </Column>
        </RevealFx>
      )}

      <RevealFx translateY="4" delay={0.3} fillWidth>
        <Text
          variant="body-default-l"
          onBackground="neutral-weak"
          style={{ fontStyle: 'italic' }}
        >
          CV available upon request.
        </Text>
      </RevealFx>

      <RevealFx translateY="4" delay={0.35} fillWidth>
        <Testimonial1 testimonials={testimonials} />
      </RevealFx>

      <RevealFx translateY="4" delay={0.4} fillWidth>
        <BookingCTA
          title="Let's talk."
          description="If you think there might be something here, I'm easy to reach."
          buttonText="Send an email"
          buttonHref="mailto:contact@mhitaryan.com"
        />
      </RevealFx>
    </Column>
  );
}
