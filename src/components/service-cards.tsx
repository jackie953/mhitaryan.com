"use client";

import { MagicCard } from "@/components/ui/magic-card";

export interface ServiceCardItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  bullets: string[];
  footerNote: string;
}

export function ServiceCards({ items }: { items: ServiceCardItem[] }) {
  return (
    <div className="service-grid w-full pt-2">
      {items.map((item) => (
        <MagicCard key={item.id} className="service-card">
          <div className="service-card-body p-[32px]">
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
              <p className="min-h-[57px] border-t border-black/10 pt-[16px] text-[13px] italic leading-5 text-black/55 dark:border-white/15 dark:text-white/55">
                {item.footerNote}
              </p>
            </div>
          </div>
        </MagicCard>
      ))}
    </div>
  );
}
