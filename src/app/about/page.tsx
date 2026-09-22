import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

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
  const structure = [
    {
      title: about.aboutSection.title,
      display: about.aboutSection.display,
      items: [],
    },
    {
      title: about.approach.title,
      display: about.approach.display,
      items: [],
    },
  ];

  return (
    <Column maxWidth="s" className="page-about">
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
      
      {/* ================================================================== */}
      {/* CHANGE THIS LINE: Replaced <Row> with <Column> and removed props   */}
      {/* ================================================================== */}
      <Column fillWidth>
        {/* This is the (now hidden) column that used to hold the avatar */}
        {!about.avatar.display && (
          <Column
            className={styles.avatar}
            top="64"
            fitHeight
            position="sticky"
            s={{ position: "relative", style: { top: "auto" } }}
            xs={{ style: { top: "auto" } }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
          </Column>
        )}

        {/* This is your main content column */}
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          {/* Main Header — two-column intro */}
          <RevealFx translateY="4" delay={0} fillWidth>
            <Row
              fillWidth
              vertical="center"
              gap="xl"
              marginBottom="40"
              marginTop="32"
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
                width: 'clamp(100px, 30vw, 220px)',
                height: 'clamp(100px, 30vw, 220px)',
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

          {/* SECTION 1: Background (no heading) */}
          {about.aboutSection.display && (
            <RevealFx translateY="4" delay={0.1} fillWidth>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="s">
                {about.aboutSection.description}
              </Column>
            </RevealFx>
          )}


          {/* SECTION 2: How It Started */}
          {about.howItStarted.display && (
            <RevealFx translateY="4" delay={0.15} fillWidth>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                <Heading as="h1" id={about.howItStarted.title} variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
                  {about.howItStarted.title}
                </Heading>
                {about.howItStarted.description}
                <Avatar src={person.avatar} size="xl" />
              </Column>
            </RevealFx>
          )}

          {/* SECTION 3: Approach */}
          {about.approach.display && (
            <RevealFx translateY="4" delay={0.2} fillWidth>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="m">
                <Heading as="h1" id={about.approach.title} variant="heading-strong-l" marginBottom="4" style={{ marginTop: '4px' }}>
                  {about.approach.title}
                </Heading>
                {about.approach.description}
              </Column>
            </RevealFx>
          )}

          {/* SECTION 4: Why Work With Us */}
          {about.whyWorkWithUs.display && (
            <RevealFx translateY="4" delay={0.25} fillWidth>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                <Heading as="h1" id={about.whyWorkWithUs.title} variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
                  {about.whyWorkWithUs.title}
                </Heading>
                {about.whyWorkWithUs.description}
              </Column>
            </RevealFx>
          )}

          {/* SECTION 5: Experience/Background (This is your original 'work' section) */}
          {about.work.display && (
            <RevealFx translateY="4" delay={0.25} fillWidth>
              <>
                <Heading as="h1" id={about.work.title} variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
                  {about.work.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                  {about.work.experiences.map((experience, index) => (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                      <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                        <Text id={experience.company} variant="heading-strong-l">
                          {experience.company}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                          {experience.timeframe}
                        </Text>
                      </Row>
                      <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                        {experience.role}
                      </Text>
                      {/* ...This section continues as it was before... */}
                    </Column>
                  ))}
                </Column>
              </>
            </RevealFx>
          )}

          {/* SECTION 6: Working Together */}
          {about.workingTogether.display && (
            <RevealFx translateY="4" delay={0.3} fillWidth>
              <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                <Heading as="h1" id={about.workingTogether.title} variant="heading-strong-l" marginBottom="4" style={{ marginTop: '8px' }}>
                  {about.workingTogether.title}
                </Heading>
                {about.workingTogether.description}
              </Column>
            </RevealFx>
          )}

          <RevealFx translateY="4" delay={0.35} fillWidth>
            <Text
              variant="body-default-l"
              onBackground="neutral-weak"
              style={{ fontStyle: 'italic' }}
              marginBottom="xl"
            >
              CV available upon request.
            </Text>
          </RevealFx>

          <RevealFx translateY="4" delay={0.4} fillWidth>
            <BookingCTA
              title="Let's talk."
              description="If you think there might be something here, I'm easy to reach."
              buttonText="Send an email"
              mailButton
            />
          </RevealFx>
        </Column>

      {/* ================================================================== */}
      {/* AND THIS CLOSING TAG: Changed from </Row> to </Column>             */}
      {/* ================================================================== */}
      </Column>
    </Column>
  );
}