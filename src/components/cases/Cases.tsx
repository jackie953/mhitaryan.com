import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";
import { CaseCard } from "@/components";

interface CasesProps {
  range?: [number, number?];
  exclude?: string[];
}

export function Cases({ range, exclude }: CasesProps) {
  let allCases = getPosts(["src", "app", "cases", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allCases = allCases.filter((post) => !exclude.includes(post.slug));
  }

  const sortedCases = allCases.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedCases = range
    ? sortedCases.slice(range[0] - 1, range[1] ?? sortedCases.length)
    : sortedCases;

  return (
    <Column fillWidth gap="l">
      {displayedCases.map((post) => (
        <CaseCard
          key={post.slug}
          href={`/cases/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          client={post.metadata.client}
          details={post.metadata.details || post.metadata.summary}
          tags={post.metadata.tags}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
