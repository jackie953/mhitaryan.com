"use client";

import Link from "next/link";
import {
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

interface CaseCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  client?: string;
  details: string;
  tags?: string[];
  link: string;
}

export const CaseCard: React.FC<CaseCardProps> = ({
  href,
  images = [],
  title,
  client,
  details,
  tags = [],
  link,
}) => {
  const thumbnail = images[0];
  const isVideo = thumbnail?.endsWith(".mp4");

  return (
    <Row fillWidth gap="24" vertical="center">
      <Column fillWidth gap="8">
        {client && (
          <Text variant="label-default-s" onBackground="brand-weak">
            {client}
          </Text>
        )}
        {title && (
          <Link href={href} className="no-underline">
            <Heading as="h2" wrap="balance" variant="heading-strong-l">
              {title}
            </Heading>
          </Link>
        )}
        {details?.trim() && (
          <Text wrap="balance" variant="body-default-m" onBackground="neutral-weak">
            {details}
          </Text>
        )}
        {tags?.length > 0 && (
          <Flex gap="8" wrap paddingTop="4">
            {tags.map((tag) => (
              <Tag key={tag} size="m" variant="neutral">
                {tag}
              </Tag>
            ))}
          </Flex>
        )}
        {link && (
          <Flex paddingTop="4">
            <SmartLink
              suffixIcon="arrowUpRightFromSquare"
              style={{ margin: "0", width: "fit-content" }}
              href={link}
            >
              <Text variant="body-default-s">View project</Text>
            </SmartLink>
          </Flex>
        )}
      </Column>
      {thumbnail && (
        <Link
          href={href}
          style={{
            flexShrink: 0,
            width: "96px",
            height: "72px",
            borderRadius: "var(--radius-m)",
            overflow: "hidden",
            display: "block",
          }}
        >
          {isVideo ? (
            <video
              src={thumbnail}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          )}
        </Link>
      )}
    </Row>
  );
};
