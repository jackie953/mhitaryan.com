import { ReactNode } from "react";
import { Column, Heading } from "@once-ui-system/core";
import { AboutSection } from "./AboutSection";

interface PageHeaderProps {
  title: ReactNode;
  children: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div style={{ paddingTop: "36px", width: "100%" }}>
      <AboutSection
        showDivider={false}
        left={
          <Heading variant="display-strong-m" onBackground="neutral-strong">
            {title}
          </Heading>
        }
      >
        <Column gap="s" className="pt-2 md:pt-4 max-w-[640px]">
          {children}
        </Column>
      </AboutSection>
    </div>
  );
}
