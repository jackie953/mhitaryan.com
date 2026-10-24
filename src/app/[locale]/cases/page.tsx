import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { baseURL, about, person, cases } from "@/resources";
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
      <div className="flex flex-wrap items-end gap-x-10 gap-y-4">
        <Heading variant="display-strong-m">Cases</Heading>
        <Text variant="body-default-m" style={{ flex: "1 1 28rem" }}>
          Research and communications, for companies and mission-driven organisations. Clients are anonymised.
        </Text>
      </div>
      <CaseBento />
    </Column>
  );
}