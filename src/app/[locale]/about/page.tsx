import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
} from "@once-ui-system/core";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { baseURL, about, person } from "@/resources";
import { AboutSection, SectionLabel } from "@/components/about/AboutSection";
import { PageHeader } from "@/components/about/PageHeader";

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
    <Column fillWidth gap="l" className="page-about">
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

      {/* Underline hover effect for LinkedIn link */}
      <style>{`
        .linkedin-footer-link {
          position: relative;
          display: inline-block;
          color: var(--neutral-on-background-strong, #000);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .linkedin-footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0.1em;
          width: 100%;
          height: 1px;
          background: var(--brand-on-background-strong, #000);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms ease;
        }
        .linkedin-footer-link:hover {
          color: var(--brand-on-background-strong, #000);
        }
        .linkedin-footer-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* 1. About us */}
      <PageHeader title={isSv ? "Om oss" : "About us"}>
        <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
          {isSv
            ? "Mhitaryan grundades 2018 utifrån en enkel övertygelse: en bra strategi börjar med en korrekt läsning av läget. Vad och vem kan hjälpa eller hindra er, och varför? Vad förändras, och vad är bara brus?"
            : "Mhitaryan was founded in 2018 on a simple conviction: good strategy starts with an accurate read of the room. What and who can help or block you, and why? What is shifting, and what is just noise?"}
        </Text>
        <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
          {isSv
            ? "Vi gräver tills vi förstår, sedan gör vi det begripligt. Det är den kombinationen vi bygger på: djupgående research och bred kommunikationserfarenhet. Först får vi det rätt. Sedan ser vi till att det slår igenom."
            : "We dig until we understand, and then make it clear. That is the combination we are built on: deep research and extensive communications experience. First we get it right. Then we make it land."}
        </Text>
        <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
          {isSv
            ? "Vi arbetar med internationella företag och idéburna organisationer i Sverige, övriga Norden, EU, USA och andra delar av världen. Vårt politiska och policyinriktade arbete spänner över näringsliv, civilsamhälle och påverkansarbete, så vi vet hur en fråga ser ut från varje sida av bordet."
            : "We work with international companies and mission-driven organizations in Sweden and across the Nordics, the EU, the US and beyond. Our political and policy work spans business, civil society and advocacy, so we know how an issue looks from each side of the table."}
        </Text>
      </PageHeader>

      {/* 2. Values */}
      <AboutSection
        left={<SectionLabel>{isSv ? "Värderingar" : "Values"}</SectionLabel>}
      >
        <Column gap="m" className="max-w-[640px]">
          {values.map((item) => (
            <div
              key={item.name}
              className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-8"
            >
              <Text
                variant="heading-strong-m"
                onBackground="neutral-strong"
                className="md:w-40 md:shrink-0"
              >
                {item.name}
              </Text>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {item.line}
              </Text>
            </div>
          ))}
        </Column>
      </AboutSection>

      {/* 3. People */}
      <AboutSection
        left={
          <SectionLabel>
            {isSv ? "Ledning" : "Leadership"}
          </SectionLabel>
        }
      >
        <Column gap="m">
          {/* Portrait + Name Header */}
          <div className="flex items-center gap-6">
            <Image
              src="/images/avatar.png"
              alt="Jacqueline Mhitaryan"
              width={100}
              height={100}
              className="rounded-full object-cover shrink-0"
              style={{
                width: "100px",
                height: "100px",
                background: "var(--brand-alpha-weak, rgba(124, 58, 237, 0.12))",
              }}
            />
            <Column gap="4">
              <Heading variant="heading-strong-l" onBackground="neutral-strong">
                Jacqueline Mhitaryan
              </Heading>
              <Text variant="body-default-m" onBackground="neutral-weak">
                {isSv ? "Grundare & Principal" : "Founder & Principal"}
              </Text>
              <a
                href="https://www.linkedin.com/in/mhitaryan/"
                target="_blank"
                rel="noopener noreferrer"
                className="linkedin-footer-link text-sm"
              >
                LinkedIn
              </a>
            </Column>
          </div>

          {/* Bio copy */}
          <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
            {isSv
              ? "Jacqueline leder byråns research- och rådgivningsarbete. I snart sex år har hon levererat politisk analys och policyanalys för internationella kunder, däribland Fortune 500-bolag, i samarbete med APCO Worldwide och andra."
              : "Jacqueline leads the firm’s research and advisory work. For almost six years she has delivered political and policy analysis for international clients, including Fortune 500 companies, working with APCO Worldwide and others."}
          </Text>
          <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
            {isSv
              ? "Sedan 2018 har hon också arbetat med research, kommunikation och påverkansarbete för tankesmedjor och idéburna organisationer. Hon har grundat och lett civilsamhällesorganisationer, den största med tusentals medlemmar, och har en bakgrund inom försäljning och affärsutveckling. Hon har bott och arbetat i flera länder och arbetar på svenska, engelska och spanska."
              : "Since 2018 she has also worked in research, communications and advocacy for think tanks and NGOs. She has founded and led civil society organizations, the largest with thousands of members, and has a background in sales and business development. She has lived and worked in several countries and works in Swedish, English and Spanish."}
          </Text>
        </Column>
      </AboutSection>
    </Column>
  );
}