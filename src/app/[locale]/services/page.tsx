import {
  Column,
  Heading,
  Text,
  Meta,
  Schema,
  Line,
  Accordion,
} from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import { baseURL, getContactEmail } from "@/resources";
import { AboutSection, SectionLabel } from "@/components/about/AboutSection";
import { BookingCTA } from "@/components/BookingCTA";
import { SituationsGrid } from "@/components/situations-grid";

type AccordionItemData = {
  id: string;
  number: string;
  title: string;
  description: string;
  bullets?: string[];
  footerNote?: string;
};

export async function generateMetadata() {
  const title = "Services | Mhitaryan";
  return Meta.generate({
    title,
    description:
      "Independent political intelligence, strategic research, and public affairs advice across Sweden, the Nordics, EU, and international markets.",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: "/services",
  });
}

export default async function Services() {
  const locale = await getLocale();
  const isSv = locale === "sv";

  const capabilitiesItems: AccordionItemData[] = [
    {
      id: "research-intelligence",
      number: "01",
      title: isSv ? "Research & omvärldsanalys" : "Research & intelligence",
      description: isSv
        ? "Förstå landskapet innan ni agerar. Vi kartlägger maktdynamiker, följer narrativ och identifierar mönster över sektorer, intressenter och geografier – med särskild kompetens inom EU, Sverige, Spanien och internationella miljöer som USA."
        : "Making sense of a landscape before you move through it. We work out who holds power, what binds you and where the debate is heading, drawing on deep familiarity with Swedish,  Spanish, and EU policy contexts, and international environments including the US.",
      bullets: isSv
        ? [
            "Översiktsrapporter: hur en marknad, en sektor eller en fråga formas politiskt och socialt",
            "Kartläggning av intressenter och nätverk: vem som fattar besluten och var inflytandet finns",
            "Analys av politik, policy och regelverk: förändringar i lagstiftning, politik och strategiska konsekvenser",
            "Bedömning av politiska risker: val, sanktioner, förändringar inom handel och säkerhet, och vad dessa innebär för verksamheten, samarbetspartnerna och anseendet",
            "Analys av den allmänna opinionen och diskursen: vad som sägs och vilka signaler som står kvar",
            "Löpande omvärldsbevakning: media, policy och sociala kanaler för att följa utvecklingen i realtid",
          ]
        : [
            "Landscape reports and country briefs: how a market, sector or issue is shaped politically and socially",
            "Stakeholder and power mapping: who matters, who influences whom, where leverage sits",
            "Policy and regulatory analysis: legislative developments, policy shifts, and strategic implications",
            "Political risk assessments: elections, sanctions, trade and security shifts, and what they mean for operations, partners and reputation",
            "Public opinion and narrative analysis: what is being said, and which signals will last",
            "Ongoing monitoring and intelligence: media, policy, and social channels to track developments in real time",
          ],
      footerNote: isSv
        ? "Levereras som fristående rapporter eller som löpande uppdrag."
        : "Delivered as standalone reports or ongoing retainers.",
    },
    {
      id: "strategic-communications",
      number: "02",
      title: isSv ? "Strategisk kommunikation" : "Strategic communications",
      description: isSv
        ? "Baserat på analysen, interkulturell kompetens och god förståelse för vad som övertygar. Vi arbetar på svenska, engelska och spanska och anpassar strategi och innehåll efter sammanhang."
        : "Built on the analysis, cross-cultural fluency, and an understanding of what persuades. We work in English, Swedish and Spanish, and adapt strategy and content to context.",
      bullets: isSv
        ? [
            "Positionerings- och budskapsstrategi",
            "Strategi för olika frågor och kampanjer: vilka som går att vinna, vilka koalitioner som ska bildas, när man ska agera",
            "Strategi för intressentengagemang: vem man ska vända sig till, i vilken ordning och med vilket budskap",
            "Positionsdokument, remissvar, policyförslag och tankeledarskap",
            "Kriskommunikation och hantering av komplexa frågor",
            "Exekutiva briefingar och talepunkter",
          ]
        : [
            "Positioning and messaging strategy",
            "Issue and campaign strategy: where an issue is winnable, which coalitions to build, when to move",
            "Stakeholder engagement strategy: who to approach, in what order, with what message",
            "Position papers, policy submissions and thought leadership",
            "Crisis communications and issue management",
            "Executive briefings and talking points"
          ],
      footerNote: isSv
        ? "Levereras som fristående projekt, en strategi ert team driver eller löpande rådgivning, där vi bygger upp tillsammans där det passar."
        : "Delivered as a one-off project, a strategy your team runs, or an ongoing advisory retainer, with us building alongside you where that fits.",
    },
  ];

  return (
    <Column fillWidth gap="m" className="page-services" style={{ paddingTop: "4rem" }}>
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Services | Mhitaryan"
        description="Independent political intelligence, strategic research, and public affairs advice."
        path="/services"
      />

      {/* 1. Page Header & Intro */}
      <AboutSection
        showDivider={false}
        left={
          <Heading variant="display-strong-m" onBackground="neutral-strong">
            {isSv ? "Erbjudande" : "Services"}
          </Heading>
        }
      >
        <Column fillWidth gap="m" className="pt-2 md:-ml-8 lg:-ml-12">
          <Text variant="body-default-l" onBackground="neutral-strong">
            {isSv
              ? "Vi levererar tydlig politisk intelligens, strategisk research och kvalificerad rådgivning för ledare som verkar i komplexa och reglerade miljöer i Sverige, EU och internationellt."
              : "Intelligence on politics, regulation and public opinion in Sweden, the EU and the US, and the strategic communications that follow. Take the analysis and run with it, or keep us on to build the plan, as a one-off project or an ongoing retainer."}
          </Text>
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="my-13">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 2. Situations We Solve */}
      <AboutSection
        showDivider={false}
        left={
          <SectionLabel>
            {isSv ? "VAD VI LÖSER" : "WHAT WE SOLVE"}
          </SectionLabel>
        }
      >
        <Column fillWidth gap="s" className="pt-2 md:-ml-8 lg:-ml-12">
          <SituationsGrid />
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="my-13">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 3. Capabilities / Core Service Lines */}
      <AboutSection
        showDivider={false}
        left={
          <SectionLabel>
            {isSv ? "VAD VI ERBJUDER" : "WHAT WE DELIVER"}
          </SectionLabel>
        }
      >
        <Column fillWidth gap="m" className="pt-2 md:-ml-8 lg:-ml-12">
          {capabilitiesItems.map((item, index) => (
            <Accordion
              key={item.id}
              title={
                <Heading variant="heading-strong-l" onBackground="neutral-strong" className="font-bold text-lg md:text-xl">
                  {item.title}
                </Heading>
              }
              open={index === 0}
            >
              <Column gap="m" fillWidth className="pt-3 pb-6">
                <Text variant="body-default-l" onBackground="neutral-strong" className="leading-relaxed">
                  {item.description}
                </Text>

                {item.bullets && item.bullets.length > 0 && (
                  <Column as="ul" gap="xs" className="list-disc pl-5 mt-2">
                    {item.bullets.map((bullet, idx) => (
                      <Text as="li" key={idx} variant="body-default-m" onBackground="neutral-medium">
                        {bullet}
                      </Text>
                    ))}
                  </Column>
                )}

                {item.footerNote && (
                  <Text variant="body-default-s" onBackground="neutral-weak" className="italic mt-3 pt-3 border-t border-neutral-alpha-weak">
                    {item.footerNote}
                  </Text>
                )}
              </Column>
            </Accordion>
          ))}
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="my-2">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 5. Booking CTA */}
      <Column fillWidth className="py-2">
        <BookingCTA
          title={isSv ? "Tala med oss innan ert nästa drag." : "Before your next move, talk to us."}
          description={
            isSv
              ? "Boka ett inledande samtal för att utvärdera er politiska eller regulatoriska omvärld."
              : "Schedule an initial discussion to assess your political or regulatory environment."
          }
          buttonText={isSv ? "Ta kontakt" : "Get in touch"}
          buttonHrefEncoded={Buffer.from(`mailto:${getContactEmail(locale)}`).toString("base64")}
        />
      </Column>
    </Column>
  );
}