import {
  Column,
  Heading,
  Text,
  Schema,
  RevealFx,
} from "@once-ui-system/core";
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import { AnchoredAccordion } from "@/components/services/AnchoredAccordion";
import { BookingCTA } from "@/components/BookingCTA";
import { ScrollReveal } from "@/components/ScrollReveal";

export async function generateMetadata() {
  const title = "Services | Mhitaryan Consulting";
  return Meta.generate({
    title,
    description:
      "Strategic Research & Intelligence, Strategic Communications, and Strategic Advisory services.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: "/services",
  });
}

export default function Services() {
  return (
    <Column fillWidth gap="xl" className="page-services">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Services"
        description="Strategic Research & Intelligence, Strategic Communications, and Strategic Advisory services."
        path="/services"
      />

      {/* Page Header */}
      <RevealFx translateY="4" delay={0} fillWidth>
        <Heading variant="display-strong-m">
          Our services
        </Heading>
      </RevealFx>

      {/* Intro Section */}
      <RevealFx translateY="4" delay={0.1} fillWidth>
        <Column maxWidth="m" textVariant="body-default-l" fillWidth gap="m">
          <Text variant="body-default-l">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
        </Column>
      </RevealFx>

      {/* Research & Intelligence */}
      <RevealFx translateY="4" delay={0.15} fillWidth>
      <Column maxWidth="m" fillWidth>
        <AnchoredAccordion id="research-intelligence" title="Research & Intelligence">
          <Column fillWidth gap="s">
            <Text variant="body-default-l">
              Making sense of a landscape before you move through it. We map power dynamics, track narratives, and identify patterns across sectors, stakeholders, and geographies – drawing on familiarity with EU, Swedish, and Spanish policy contexts, as well as international environments including the US.
            </Text>

            <Column as="ul" gap="xs" paddingLeft="l" style={{ listStyleType: 'disc' }}>
              <Text as="li" variant="body-default-l">
                Research and open-source intelligence (OSINT), including social media and web intelligence
              </Text>
              <Text as="li" variant="body-default-l">
                Stakeholder and network mapping – who matters, who influences whom, where leverage exists
              </Text>
              <Text as="li" variant="body-default-l">
                Policy and regulatory analysis – legislative developments, policy shifts, and strategic implications
              </Text>
              <Text as="li" variant="body-default-l">
                Market and competitive intelligence
              </Text>
              <Text as="li" variant="body-default-l">
                Policy, media, and social monitoring
              </Text>
            </Column>

            <Text variant="body-default-l">
              Delivered as standalone reports, landscape snapshots, or ongoing monitoring; one-off projects or retainer.
            </Text>
          </Column>
        </AnchoredAccordion>
      </Column>
      </RevealFx>

      {/* Strategic Communications */}
      <RevealFx translateY="4" delay={0.2} fillWidth>
      <Column maxWidth="m" fillWidth>
        <AnchoredAccordion id="strategic-communications" title="Strategic Communications">
          <Column fillWidth gap="s">
            <Text variant="body-default-l">
              Built on strong writing, cross-cultural fluency, and an understanding of what persuades. We work in English, Swedish, and Spanish – developing content and strategy that is precise, purposeful, and adapted to context.
            </Text>

            <Column as="ul" gap="xs" paddingLeft="l" style={{ listStyleType: 'disc' }}>
              <Text as="li" variant="body-default-l">
                Advocacy and public affairs communications
              </Text>
              <Text as="li" variant="body-default-l">
                Positioning and messaging strategy
              </Text>
              <Text as="li" variant="body-default-l">
                Stakeholder engagement and outreach
              </Text>
              <Text as="li" variant="body-default-l">
                Content development – thought leadership, articles, white papers, and presentations
              </Text>
              <Text as="li" variant="body-default-l">
                Crisis and reputational communications
              </Text>
            </Column>

            <Text variant="body-default-l">
              Delivered as standalone projects or ongoing retainers.
            </Text>
          </Column>
        </AnchoredAccordion>
      </Column>
      </RevealFx>

      <ScrollReveal>
        <BookingCTA
          title="Before your next move, talk to us."
          description=""
          buttonText="Get in touch"
          buttonHrefEncoded="bWFpbHRvOmhlbGxvQG1oaXRhcnlhbi5jb20="
        />
      </ScrollReveal>
    </Column>
  );
}
