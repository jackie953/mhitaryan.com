import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Line,
} from "@once-ui-system/core";
import Image from "next/image";
import { getLocale } from "next-intl/server";
import { baseURL, about, person, getContactEmail } from "@/resources";
import { BookingCTA } from "@/components/BookingCTA";
import { AboutSection } from "@/components/about/AboutSection";
import { ValuesScroll } from "@/components/about/ValuesScroll";

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

      {/* Inline style block for footer-matched animated link */}
      <style>{`
        .footer-style-link {
          position: relative;
          display: inline-block;
          color: var(--neutral-on-background-weak);
          text-decoration: none;
          transition: color 200ms ease;
        }
        .footer-style-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0.1em;
          width: 100%;
          height: 1px;
          background: var(--brand-on-background-strong);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 200ms ease;
        }
        .footer-style-link:hover {
          color: var(--brand-on-background-strong);
        }
        .footer-style-link:hover::after {
          transform: scaleX(1);
        }
      `}</style>

      {/* 1. About us */}
      <AboutSection 
        showDivider={false} 
        left={<Heading variant="display-strong-m">{isSv ? "Om oss" : "About us"}</Heading>}
      >
        <Column gap="m" className="pt-0 md:pt-3">
          <Text variant="body-default-l">
            {isSv
              ? "Mhitaryan grundades 2018 utifrån en enkel övertygelse: en bra strategi börjar med en korrekt läsning av läget. Vad och vem kan hjälpa eller hindra er, och varför? Vad förändras, och vad är bara brus?"
              : "Mhitaryan was founded in 2018 on a simple conviction: good strategy starts with an accurate read of the room. What and who can help or block you, and why? What is shifting, and what is just noise?"}
          </Text>
          <Text variant="body-default-l">
            {isSv
              ? "Vi gräver tills vi förstår, sedan gör vi det begripligt. Det är den kombinationen vi bygger på: djupgående research och bred kommunikationserfarenhet. Först får vi det rätt. Sedan ser vi till att det slår igenom."
              : "We dig until we understand, and then make it clear. That is the combination we are built on: deep research and extensive communications experience. First we get it right. Then we make it land."}
          </Text>
          <Text variant="body-default-l">
            {isSv
              ? "Vi arbetar med internationella företag och idéburna organisationer i Sverige, Norden, EU, USA och Mellanöstern. Vår erfarenhet sträcker sig över näringslivet, det civila samhället och påverkansarbete, vilket gör att vi kan se en fråga ur flera olika perspektiv."
              : "We work with international companies and mission-driven organizations in Sweden and across the Nordics, the EU, the US, and the Middle East. Our experience spans the corporate world, civil society and advocacy, so we can see an issue from more than one side."}
          </Text>
        </Column>
      </AboutSection>

      {/* 2. Our values */}
      <Column fillWidth>
        <Line background="neutral-alpha-weak" />
        <ValuesScroll label={isSv ? "Våra värderingar" : "Our values"} values={values} />
      </Column>

      {/* 3. Founder */}
      <AboutSection 
        left={
          <Text variant="heading-strong-s" onBackground="neutral-weak" className="uppercase tracking-wider">
            {isSv ? "Grundare" : "Founder"}
          </Text>
        }
      >
        <Column gap="l">
          {/* Portrait + Name/Title Header */}
          <div className="flex items-center gap-6">
            <Image
              src="/images/avatar.jpg"
              alt="Jacqueline Mhitaryan"
              width={112}
              height={112}
              className="rounded-full object-cover shrink-0"
              style={{ width: "112px", height: "112px" }}
            />
            <Column gap="xs">
              <Heading variant="heading-strong-l">Jacqueline Mhitaryan</Heading>
              <Text variant="body-default-l" onBackground="neutral-weak">
                {isSv ? "Grundare" : "Founder"}
              </Text>
            </Column>
          </div>

          {/* Bio copy + LinkedIn link with custom footer-hover effect */}
          <Text variant="body-default-l">
            {isSv ? (
              <>
                I snart sex år har Jacqueline arbetat med research, omvärldsbevakning och politisk och regulatorisk analys för internationella kunder, däribland Fortune 500-bolag, med APCO Worldwide. Hon har också arbetat med research, kommunikation och påverkansarbete för idéburna organisationer och tankesmedjor, grundat och lett gräsrotsorganisationer med tusentals medlemmar, och har en bakgrund inom affärsutveckling. Hon har bott och arbetat i flera länder, med kunder i Europa, USA och Mellanöstern.{" "}
                <a
                  href="https://www.linkedin.com/in/mhitaryan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-style-link"
                >
                  LinkedIn
                </a>
                .
              </>
            ) : (
              <>
                For almost six years, Jacqueline has worked on research, monitoring and political and regulatory analysis for international clients, including Fortune 500 companies, with APCO Worldwide. She has also worked in research, communications and advocacy for NGOs and think tanks, founded and led grassroots organizations with thousands of members, and has a background in business development. She has lived and worked in several countries, with clients across Europe, the US and the Middle East.{" "}
                <a
                  href="https://www.linkedin.com/in/mhitaryan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-style-link"
                >
                  LinkedIn
                </a>
                .
              </>
            )}
          </Text>
        </Column>
      </AboutSection>

      {/* 4. CTA */}
      <BookingCTA
        title={isSv ? "Prata med oss inför ert nästa drag." : "Before your next move, talk to us."}
        description=""
        buttonText={isSv ? "Ta kontakt" : "Get in touch"}
        buttonHrefEncoded={Buffer.from(`mailto:${getContactEmail(locale)}`).toString("base64")}
      />
    </Column>
  );
}
