import { Column, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, cases } from "@/resources";
import { PageHeader } from "@/components/about/PageHeader";
import { CaseBento } from "./CaseBento";

export async function generateMetadata() {
  return Meta.generate({
    title: cases.title,
    description: cases.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(cases.title)}`,
    path: cases.path,
  });
}

export default function CasesPage() {
  return (
    <Column fillWidth gap="xl">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={cases.path}
        title={cases.title}
        description={cases.description}
        image={`/api/og/generate?title=${encodeURIComponent(cases.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <PageHeader title="Cases">
        <Text variant="body-default-m" onBackground="neutral-strong">
          Research and communications, for companies and mission-driven organizations.
        </Text>
        <Text variant="body-default-m" onBackground="neutral-strong">
          Our work is confidential, so every case here is anonymized. What we can show is the situation, how we read it, and what changed.
        </Text>
      </PageHeader>
      <CaseBento />
    </Column>
  );
}