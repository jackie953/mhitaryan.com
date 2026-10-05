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
      title: isSv ? "Research & Omvärldsanalys" : "Research & Intelligence",
      description: isSv
        ? "Förstå landskapet innan ni agerar. Vi kartlägger maktdynamiker, följer narrativ och identifierar mönster över sektorer, intressenter och geografier – med särskild kompetens inom EU, Sverige, Spanien och internationella miljöer som USA."
        : "Making sense of a landscape before you move through it. We map power dynamics, track narratives, and identify patterns across sectors, stakeholders, and geographies – drawing on deep familiarity with EU, Swedish, and Spanish policy contexts, as well as international environments including the US.",
      bullets: isSv
        ? [
            "Research och open-source intelligence (OSINT), inklusive sociala medier och webb-intelligens",
            "Kartläggning av intressenter och nätverk – vem som fattar besluten och var inflytandet finns",
            "Policy- och regulatorisk analys – lagstiftningsprocesser och strategiska konsekvenser",
            "Marknads- och konkurrentanalys",
            "Löpande omvärlds-, medie- och policymonitorering",
          ]
        : [
            "Research and open-source intelligence (OSINT), including social media and web intelligence",
            "Stakeholder and network mapping – who matters, who influences whom, where leverage exists",
            "Policy and regulatory analysis – legislative developments, policy shifts, and strategic implications",
            "Market and competitive intelligence",
            "Policy, media, and social monitoring",
          ],
      footerNote: isSv
        ? "Levereras som fristående rapporter, lägesbilder eller löpande monitorering."
        : "Delivered as standalone reports, landscape snapshots, or ongoing retained monitoring.",
    },
    {
      id: "strategic-communications",
      number: "02",
      title: isSv ? "Strategisk Kommunikation" : "Strategic Communications",
      description: isSv
        ? "Byggt på starkt skrivande, mångkulturell förståelse och kunskap om vad som övertygar. Vi arbetar på engelska, svenska och spanska för att utveckla budskap som är precisa, ändamålsenliga och anpassade till kontexten."
        : "Built on strong writing, cross-cultural fluency, and an understanding of what persuades. We work in English, Swedish, and Spanish – developing content and strategy that is precise, purposeful, and adapted to context.",
      bullets: isSv
        ? [
            "Kommunikation för påverkansarbete och public affairs",
            "Positionering och budskapsstrategi",
            "Dialog och engagemang med nyckelaktörer",
            "Innehållsutveckling – thought leadership, artiklar, rapporter och formella remissvar",
            "Kris- och förtroendekommunikation",
          ]
        : [
            "Advocacy and public affairs communications",
            "Positioning and messaging strategy",
            "Stakeholder engagement and outreach",
            "Content development – thought leadership, articles, white papers, and formal policy submissions",
            "Crisis and reputational communications",
          ],
      footerNote: isSv
        ? "Levereras som fristående projekt eller löpande rådgivning."
        : "Delivered as standalone projects or ongoing advisory retainers.",
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
        <Column gap="s" className="pt-2 md:pt-4 max-w-xl">
          <Text variant="body-default-l" onBackground="neutral-strong">
            {isSv
              ? "Vi levererar tydlig politisk intelligens, strategisk research och kvalificerad rådgivning för ledare som verkar i komplexa och reglerade miljöer i Sverige, EU och internationellt."
              : "We deliver clear political intelligence, strategic research, and high-stakes advocacy guidance for leaders operating in complex, highly regulated environments across Sweden, the EU, and international markets."}
          </Text>
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="my-2">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 2. Situations We Solve */}
      <AboutSection
        showDivider={false}
        left={
          <SectionLabel>
            {isSv ? "SITUATIONER VI LÖSER" : "SITUATIONS WE SOLVE"}
          </SectionLabel>
        }
      >
        <Column fillWidth gap="s" className="pt-2">
          <SituationsGrid />
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="my-2">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 3. Capabilities / Core Service Lines */}
      <AboutSection
        showDivider={false}
        left={
          <SectionLabel>
            {isSv ? "KAPACITETER" : "CAPABILITIES"}
          </SectionLabel>
        }
      >
        <Column fillWidth gap="m" className="pt-2">
          {capabilitiesItems.map((item, index) => (
            <Accordion
              key={item.id}
              title={
                <Text variant="heading-default-l" onBackground="neutral-strong" className="font-semibold text-xl md:text-2xl">
                  {item.title}
                </Text>
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

      {/* 4. How We Engage */}
      <AboutSection
        showDivider={false}
        left={
          <SectionLabel>
            {isSv ? "HUR VI ARBETAR" : "HOW WE ENGAGE"}
          </SectionLabel>
        }
      >
        <Column gap="m" className="pt-2 max-w-xl">
          <Text variant="body-default-m" onBackground="neutral-strong">
            {isSv ? (
              <>
                Vi arbetar antingen på <strong>projektbasis</strong> (tidsbestämda djupdykningar, riskbedömningar, omvärldsanalyser) eller via <strong>löpande månatliga samarbeten</strong> för kontinuerlig bevakning, strategisk rådgivning och intressentanalys.
              </>
            ) : (
              <>
                We work either on a <strong>project basis</strong> (time-bound deep dives, risk assessments, landscape reports) or via <strong>ongoing monthly retainers</strong> for continuous monitoring, strategic advisory, and stakeholder intelligence.
              </>
            )}
          </Text>

          <Text variant="body-default-s" onBackground="neutral-medium" className="italic">
            {isSv
              ? "Notera: Vi fokuserar på strategisk intelligens, politisk analys och målriktad kommunikation. Vi fungerar inte som en volymexekverande PR- eller lobbybyrå."
              : "Note: We focus on high-level strategic intelligence, policy judgment, and targeted advocacy drafting. We do not operate as a volume execution PR agency or lobby firm."}
          </Text>
        </Column>
      </AboutSection>

      {/* Divider */}
      <Column fillWidth className="mt-4 mb-2">
        <Line background="neutral-alpha-weak" />
      </Column>

      {/* 5. Booking CTA */}
      <Column fillWidth className="py-4">
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