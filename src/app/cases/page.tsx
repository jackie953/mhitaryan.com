import { Column, Heading, Meta, Schema } from "@once-ui-system/core";
import { baseURL, about, person, cases } from "@/resources";
import { Cases } from "@/components/cases/Cases";

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
      <Heading variant="heading-strong-xl">
        Cases
      </Heading>
      <Cases />
    </Column>
  );
}
