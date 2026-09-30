"use client";

import type React from "react";
import { Column, Flex, Text } from "@once-ui-system/core";
import styles from "./about.module.scss";

interface TableOfContentsProps {
  structure: {
    title: string;
    display: boolean;
    items: string[];
  }[];
  about: {
    tableOfContent: {
      display: boolean;
      subItems: boolean;
    };
  };
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ structure, about }) => {
  const scrollTo = (id: string, offset: number) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  if (!about.tableOfContent?.display) return null;

  return (
    <Column
      left="0"
      style={{ top: "50%", transform: "translateY(-50%)", whiteSpace: "nowrap" }}
      position="fixed"
      paddingLeft="24"
      gap="32"
      m={{ hide: true }}
      textVariant="body-default-s"
    >
      {structure.filter(s => s.display).map((section) => (
        <Column key={section.title} gap="12">
          <Flex
            cursor="interactive"
            className={styles.hover}
            gap="8"
            vertical="center"
            onClick={() => scrollTo(section.title, 80)}
          >
            <Flex height="1" minWidth="16" background="neutral-medium" />
            <Text variant="body-default-s" onBackground="neutral-weak">
              {section.title}
            </Text>
          </Flex>

          {about.tableOfContent.subItems && section.items.map((item, i) => (
            <Flex
              l={{ hide: true }}
              key={`${section.title}-${i}`}
              style={{ cursor: "pointer" }}
              className={styles.hover}
              gap="12"
              paddingLeft="24"
              vertical="center"
              onClick={() => scrollTo(item, 80)}
            >
              <Flex height="1" minWidth="8" background="neutral-medium" />
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item}
              </Text>
            </Flex>
          ))}
        </Column>
      ))}
    </Column>
  );
};

export default TableOfContents;