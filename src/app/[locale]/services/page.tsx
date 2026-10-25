import {
  Column,
  Text,
  Meta,
  Schema,
  Line,
} from "@once-ui-system/core";
import { getLocale } from "next-intl/server";
import { baseURL, getContactEmail } from "@/resources";
import { AboutSection, SectionLabel } from "@/components/about/AboutSection";
import { PageHeader } from "@/components/about/PageHeader";
import { BookingCTA } from "@/components/BookingCTA";
import { SituationsGrid } from "@/components/situations-grid";
import { ServiceCards, type ServiceCardItem } from "@/components/service-cards";

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

  const capabilitiesItems: ServiceCardItem[] = [
    {
      id: "research-intelligence",
      tag: isSv ? "ANALYS" : "ANALYSIS",
      title: isSv ? "Research & omvärldsanalys" : "Research & intelligence",
      description: isSv
        ? "Förstå landskapet innan ni agerar. Vi kartlägger maktdynamiker, följer narrativ och identifierar mönster över sektorer, intressenter och geografier – med särskild kompetens inom EU, Sverige, Spanien och internationella miljöer som USA."
        : "Making sense of a landscape before you move through it. We work out who holds power, what binds you and where the debate is heading.",
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
            "Landscape reports and country briefs",
            "Stakeholder and power mapping",
            "Policy and regulatory analysis",
            "Political risk assessments",
            "Public opinion and narrative analysis",
          ],
      footerNote: isSv
        ? "Levereras som fristående rapporter eller som löpande uppdrag."
        : "Delivered as standalone reports or ongoing retainers with regular briefings.",
    },
    {
      id: "strategic-communications",
      tag: isSv ? "STRATEGI" : "STRATEGY",
      title: isSv ? "Strategisk kommunikation" : "Strategic communications",
      description: isSv
        ? "Baserat på analysen, interkulturell kompetens och god förståelse för vad som övertygar. Vi arbetar på svenska, engelska och spanska och anpassar strategi och innehåll efter sammanhang."
        : "Built on the analysis, cross-cultural fluency and an understanding of what persuades. We work in English, Swedish and Spanish.",
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
            "Issue and campaign strategy",
            "Stakeholder engagement strategy",
            "Position papers and policy submissions",
            "Executive briefings and talking points",
          ],
      footerNote: isSv
        ? "Levereras som fristående projekt, en strategi ert team driver eller löpande rådgivning, där vi bygger upp tillsammans där det passar."
        : "Delivered as a one-off project, a strategy your team runs, or an ongoing advisory retainer.",
    },
  ];

  return (
    <Column fillWidth gap="m" className="page-services">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title="Services | Mhitaryan"
        description="Independent political intelligence, strategic research, and public affairs advice."
        path="/services"
      />

      {/* 1. Page Header & Intro */}
      <PageHeader title={isSv ? "Erbjudande" : "Services"}>
        <Text variant="body-default-m" onBackground="neutral-strong" className="page-intro">
          {isSv
            ? "Vi levererar tydlig politisk intelligens, strategisk research och kvalificerad rådgivning för ledare som verkar i komplexa och reglerade miljöer i Sverige, EU och internationellt."
            : "Intelligence on politics, regulation and public opinion in Sweden, the EU and the US, and the strategic communications that follow. Take the analysis and run with it, or keep us on to build the plan, as a one-off project or an ongoing retainer."}
        </Text>
      </PageHeader>

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
        <Column fillWidth gap="s" className="pt-2">
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
        <ServiceCards items={capabilitiesItems} />
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