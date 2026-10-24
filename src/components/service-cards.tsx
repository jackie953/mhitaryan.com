"use client";

import { useTheme } from "next-themes";
import { MagicCard } from "@/components/situations-grid";

export interface ServiceCardItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  footerNote: string;
}

export function ServiceCards({ items }: { items: ServiceCardItem[] }) {
  const { theme } = useTheme();

  return (
    <div className="grid w-full grid-cols-1 gap-[36px] pt-2 md:grid-cols-2">
      {items.map((item) => (
        <MagicCard
          key={item.id}
          gradientColor={theme === "dark" ? "#5A286F35" : "#5A286F15"}
          className="group flex h-full flex-col p-[32px]"
        >
          <div className="mb-[12px] flex w-full justify-end">
            <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 select-none">
              {item.tag}
            </span>
          </div>

          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground">
            {item.title}
          </h3>

          <p className="mt-[12px] text-[16px] leading-[1.5] text-black/80 dark:text-white/80">
            {item.description}
          </p>

          <ul className="mt-[16px] flex list-disc flex-col gap-[6px] pl-[20px] text-[16px] text-black marker:text-black dark:text-white dark:marker:text-white">
            {item.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>

          <div className="mt-auto pt-[24px]">
            <p className="min-h-[53px] border-t border-black/10 dark:border-white/15pt-[12px]text-[13px] italic leading-5 text-muted-foreground">
              {item.footerNote}
            </p>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
