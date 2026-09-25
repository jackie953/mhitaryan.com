"use client";

import {
  Column,
  Flex,
  Heading,
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
  images = [],
  title,
  client,
  details,
  tags = [],
  link,
}) => {
  const firstImage = images[0];
  const isVideo = firstImage?.endsWith(".mp4");

  return (
    <Column fillWidth gap="20">
      {firstImage && (
        <div style={{
          borderRadius: 'var(--radius-l)',
          overflow: 'hidden',
          width: '100%',
          aspectRatio: '16/9',
          background: 'transparent',
        }}>
          {isVideo ? (
            <video
              src={firstImage}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                border: 'none',
                outline: 'none',
              }}
            />
          ) : (
            <img
              src={firstImage}
              alt={title}
              loading="eager"
              fetchPriority="high"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                border: 'none',
                outline: 'none',
              }}
            />
          )}
        </div>
      )}
      <Column fillWidth gap="8" style={{ maxWidth: "60ch" }}>
        {client && (
          <Text variant="label-default-s" onBackground="brand-weak">
            {client}
          </Text>
        )}
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
          </Heading>
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
          <Flex paddingTop="8">
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
    </Column>
  );
};
