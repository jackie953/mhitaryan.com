import React from 'react';
import {
  Column,
  Heading,
  Text,
  Schema,
  Button,
  Row,
  Icon,
  RevealFx,
} from "@once-ui-system/core";
import { Meta } from "@once-ui-system/core";
import { baseURL } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";

export async function generateMetadata() {
  const title = "Services | Jacqueline Mhitaryan";
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
  const structure = [
    {
      title: "Research & Intelligence",
      display: true,
      items: [],
    },
    {
      title: "Strategic Communications",
      display: true,
      items: [],
    },
    {
      title: "How I Work",
      display: true,
      items: [],
    },
  ];

  const about = {
    tableOfContent: {
      display: true,
      subItems: false,
    },
    calendar: {
      display: true,
      link: "https://cal.com/your-link", // Replace with your actual calendar link
    }
  };

  return (
    <Column maxWidth="s" className="page-services">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Services"
        description="Strategic Research & Intelligence, Strategic Communications, and Strategic Advisory services."
        path="/services"
      />
      
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}

      <Column fillWidth>
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>

          {/* Page Header */}
          <RevealFx translateY="4" delay={0} fillWidth>
            <Column
              fillWidth
              marginBottom="20"
              marginTop="32"
            >
              <Heading variant="display-strong-m">
                Services
              </Heading>
            </Column>
          </RevealFx>

          {/* Intro Section */}
          <RevealFx translateY="4" delay={0.1} fillWidth>
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="l">
              <Text variant="body-default-l">
                I work at the intersection of research, strategy, and communications – helping organizations understand complex environments and act with confidence.
              </Text>
            </Column>
          </RevealFx>

          {/* Research & Intelligence */}
          <RevealFx translateY="4" delay={0.15} fillWidth>
          <Column fillWidth gap="s" marginBottom="40">
            <Heading as="h1" id="Research & Intelligence" variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
              Research & Intelligence
            </Heading>

            <Text variant="body-default-l">
              Making sense of a landscape before you move through it. I map power dynamics, track narratives, and identify patterns across sectors, stakeholders, and geographies – drawing on familiarity with EU, Swedish, and Spanish policy contexts, as well as international environments including the US.
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
          </RevealFx>

          {/* Strategic Communications */}
          <RevealFx translateY="4" delay={0.2} fillWidth>
          <Column fillWidth gap="s" marginBottom="40">
            <Heading as="h1" id="Strategic Communications" variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
              Strategic Communications
            </Heading>

            <Text variant="body-default-l">
              Built on strong writing, cross-cultural fluency, and an understanding of what persuades. I work in English, Swedish, and Spanish – developing content and strategy that is precise, purposeful, and adapted to context.
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
          </RevealFx>

          {/* How I Work */}
          <RevealFx translateY="4" delay={0.25} fillWidth>
          <Column fillWidth gap="s" marginBottom="l">
            <Heading as="h1" id="How I Work" variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
              How I Work
            </Heading>

            <Text variant="body-default-l">
              Research and communications rarely work in isolation. Most engagements involve both – understanding the landscape and then doing something with that understanding. I take on both one-off projects and ongoing retainers, for new and existing clients.
            </Text>

            {about.calendar.display && (
              <RevealFx paddingTop="8" delay={0.35} horizontal="center">
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
                    id="schedule-call"
                    data-border="rounded"
                    href="mailto:contact@mhitaryan.com"
                    variant="secondary"
                    size="l"
                    style={{ paddingInline: '2rem', paddingBlock: '0.875rem', fontSize: '1.05rem', border: '1px solid var(--neutral-alpha-medium)' }}
                    weight="default"
                    arrowIcon
                    className="text-neutral-900 dark:!text-white"
                  >
                    <Row vertical="center" gap="8">
                      <Icon name="email" onBackground="brand-weak" />
                      <span>Get in touch</span>
                    </Row>
                  </Button>
                </Column>
              </RevealFx>
            )}
          </Column>
          </RevealFx>

        </Column>
      </Column>
    </Column>
  );
}