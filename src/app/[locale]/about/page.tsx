import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Line,
  RevealFx,
} from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import { baseURL, about, person, getContactEmail } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { AboutSection, SectionLabel } from "@/components/about/AboutSection";
import { ValuesScroll } from "@/components/about/ValuesScroll";
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

const valuesEn = [
  { name: "Curious", line: "We ask the questions others skip." },
  { name: "Independent", line: "We follow the evidence, not an agenda." },
  { name: "Candid", line: "We say what we see, even when it's uncomfortable." },
  { name: "Generous", line: "We share what we know, and how we know it." },
];

const valuesSv = [
  { name: "Nyfikna", line: "Vi ställer frågor andra hoppar över." },
  { name: "Oberoende", line: "Vi följer bevisen, inte en agenda." },
  { name: "Uppriktiga", line: "Vi säger vad vi ser, även när det är obekvämt." },
  { name: "Generösa", line: "Vi delar med oss av det vi vet, och hur vi vet det." },
];

export default async function About() {
  const locale = await getLocale();
  const isSv = locale === "sv";
  const values = isSv ? valuesSv : valuesEn;
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

      {/* 1. About us */}
      <RevealFx translateY="4" delay={0} fillWidth>
        <AboutSection showDivider={false} left={<Heading variant="display-strong-m">About us</Heading>}>
          <Text variant="body-default-l">
            Mhitaryan Consulting is a Stockholm-based strategic research and communications practice. We help clients understand and navigate complex environments across the Nordics, the EU and the US. Founded in 2018, we work with international companies and mission-driven organizations.
          </Text>
        </AboutSection>
      </RevealFx>

      {/* 2. Our values — pinned, scroll-driven reveal (no RevealFx wrapper, so sticky stays clean) */}
      <Column fillWidth>
        <Line background="neutral-alpha-weak" />
        <ValuesScroll label={isSv ? "Våra värderingar" : "Our values"} values={values} />
      </Column>

      {/* 3. Our approach */}
      {about.approach.display && (
        <RevealFx translateY="4" delay={0.15} fillWidth>
          <AboutSection left={<SectionLabel>Our approach</SectionLabel>}>
            <Column textVariant="body-default-l" gap="m">
              {about.approach.description}
            </Column>
            <Column gap="m">
              <Heading as="h2" variant="heading-strong-l">
                How We Work
              </Heading>
              <Text variant="body-default-l">
                Research and communications rarely work in isolation. Most engagements involve both – understanding the landscape and then doing something with that understanding. We take on both one-off projects and ongoing retainers, for new and existing clients.
              </Text>
            </Column>
          </AboutSection>
        </RevealFx>
      )}

      {/* 4. Founder */}
      <RevealFx translateY="4" delay={0.2} fillWidth>
        <AboutSection left={<SectionLabel>Founder</SectionLabel>}>
          <Column gap="s">
            <Heading variant="heading-strong-l">{person.name}</Heading>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Founder
            </Text>
            <Text variant="body-default-l" onBackground="neutral-weak">
              Clear thinking. Direct communication.
            </Text>
          </Column>
          {about.aboutSection.display && (
            <Column textVariant="body-default-l" gap="m">
              {about.aboutSection.description}
            </Column>
          )}
          <Text
            variant="body-default-l"
            onBackground="neutral-weak"
            style={{ fontStyle: 'italic' }}
          >
            CV available upon request.
          </Text>
        </AboutSection>
      </RevealFx>

      {/* 5. Kind words */}
      <RevealFx translateY="4" delay={0.25} fillWidth>
        <AboutSection left={<SectionLabel>Kind words</SectionLabel>}>
          <Testimonial1 testimonials={testimonials} />
        </AboutSection>
      </RevealFx>

      {/* 6. CTA */}
      <RevealFx translateY="4" delay={0.3} fillWidth>
        <BookingCTA
          title="Before your next move, talk to us."
          description=""
          buttonText="Get in touch"
          buttonHrefEncoded={Buffer.from(`mailto:${getContactEmail(locale)}`).toString("base64")}
        />
      </RevealFx>
    </Column>
  );
}
