import { notFound } from "next/navigation";
import { getPosts } from "@/utils/utils";
import {
  Meta,
  Button,
  Column,
  Flex,
  Heading,
  Icon,
  Media,
  Tag,
  Text,
  Row,
  RevealFx,
} from "@once-ui-system/core";
import { baseURL, about, person, cases } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { ScrollToHash, CustomMDX } from "@/components";
import type { Metadata } from "next";

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "cases", "projects"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slugPath = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug || "";

  const posts = getPosts(["src", "app", "cases", "projects"]);
  const post = posts.find((post) => post.slug === slugPath);

  if (!post) return {};

  const title = `${post.metadata.title} | Mhitaryan Consulting`;

  return Meta.generate({
    title,
    description: post.metadata.summary,
    baseURL: baseURL,
    image: post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`,
    path: `${cases.path}/${post.slug}`,
  });
}

export default async function CaseDetail({
  params,
}: {
  params: Promise<{ slug: string | string[] }>;
}) {
  const resolvedParams = await params;
  const slugPath = Array.isArray(resolvedParams.slug)
    ? resolvedParams.slug.join("/")
    : resolvedParams.slug || "";

  const post = getPosts(["src", "app", "cases", "projects"]).find(
    (post) => post.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  return (
    <>
      <ScrollToHash />

      <Column as="section" fillWidth gap="l">
        <Column gap="m">
          {post.metadata.images && post.metadata.images.length > 0 && (
            <Media
              src={post.metadata.images[0]}
              alt={post.metadata.title}
              aspectRatio="16 / 9"
              radius="l"
            />
          )}
          {post.metadata.client && (
            <Text variant="label-default-s" onBackground="brand-weak">
              {post.metadata.client}
            </Text>
          )}
          <Heading variant="display-strong-s">{post.metadata.title}</Heading>
          {(post.metadata.details || post.metadata.summary) && (
            <Text variant="body-default-l" onBackground="neutral-weak">
              {post.metadata.details || post.metadata.summary}
            </Text>
          )}
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <Flex gap="8" wrap>
              {post.metadata.tags.map((tag) => (
                <Tag key={tag} size="m" variant="neutral">
                  {tag}
                </Tag>
              ))}
            </Flex>
          )}
          <Text variant="body-default-s" onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt)}
          </Text>
        </Column>
        <Column as="article" maxWidth="m" gap="l">
          <CustomMDX source={post.content} />
        </Column>
        <Button
          href={cases.path}
          variant="secondary"
          size="m"
          prefixIcon="chevronLeft"
        >
          Back to cases
        </Button>
        {about.calendar.display && (
          <RevealFx paddingTop="8" delay={0.4}>
            <Column
              position="relative"
              overflow="hidden"
              radius="l"
              style={{ display: 'inline-flex' }}
            >
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 0%, var(--accent-background-strong, rgba(93,50,133,0.35)) 0%, transparent 70%)',
                opacity: 0.6, borderRadius: 'inherit',
              }} />
              <Button
                id="schedule-call"
                data-border="rounded"
                href={about.calendar.link}
                variant="secondary"
                size="m"
                weight="default"
                arrowIcon
                className="text-neutral-900 dark:text-white"
              >
                <Row vertical="center" gap="8">
                  <Icon name="calendar" onBackground="brand-weak" />
                  <span>Schedule a call</span>
                </Row>
              </Button>
            </Column>
          </RevealFx>
        )}
      </Column>
    </>
  );
}
