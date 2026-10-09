"use client";

import type { HTMLAttributes } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface MagicCardProps extends HTMLAttributes<HTMLDivElement> {
  gradientColor?: string;
}

function MagicCard({ children, className, gradientColor, ...props }: MagicCardProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border/80 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:border-[#5A286F]/60 hover:shadow-lg hover:shadow-[#5A286F]/5",
        className
      )}
      style={{
        backgroundImage: gradientColor
          ? `radial-gradient(circle at top left, ${gradientColor}, transparent 55%)`
          : undefined,
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}

interface SituationItem {
  id: string;
  tag: string;
  title: string;
  description: string;
}

const situations: SituationItem[] = [
  {
    id: "market-entry",
    title: "Entering Sweden",
    description: "Sweden is small and consensus-driven, and local dynamics run alongside EU rules. Whether you're establishing a presence, launching a project or adapting a brand, the first question is which issues and stakeholders matter.",
    tag: "MARKET ENTRY"
  },
  {
    id: "cross-border",
    title: "Operating cross-border",
    description: "The rules, norms and networks rarely travel with you. Whether moving further into the EU or entering the US, the task is working out what matters in the new market and what doesn't.",
    tag: "EXPANSION"
  },
  {
    id: "regulatory-shift",
    title: "Regulatory uncertainty",
    description: "Laws, regulations, draft proposals, political signals. We sort what is binding today from what is still on its way, and tell you what it means for your operations and your bottom line.",
    tag: "REGULATORY"
  },
  {
    id: "opinion",
    title: "Shifting narratives",
    description: "Narratives and sentiments move fast, and so can the perception of your organization or sector. The work is telling temporary noise from lasting risk, and deciding whether to speak or stay quiet.",
    tag: "OPINION"
  },
  {
    id: "geopolitical-risk",
    title: "Changing risk picture",
    description: "An election, a sanctions regime, a trade fight, a security shift. What is real, and what does it mean for your operations, partners and reputation?",
    tag: "RISK"
  },
  {
    id: "advocacy-position",
    title: "Advancing a position",
    description: "Progress depends on where power sits and when a window opens. It starts with understanding the landscape before committing to a position or a campaign.",
    tag: "ADVOCACY"
  },
];

interface SituationsGridProps {
  className?: string;
}

export function SituationsGrid({ className }: SituationsGridProps) {
  const { theme } = useTheme();

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {situations.map((item) => (
          <MagicCard
            key={item.id}
            gradientColor={theme === "dark" ? "#5A286F35" : "#5A286F15"}
            className="group flex flex-col justify-between p-6 md:p-8 min-h-[220px] transition-transform duration-300 hover:-translate-y-1"
          >
            <div>
              {/* Row 1: Upper right tag in its own dedicated row */}
              <div className="flex justify-end w-full mb-3">
                {item.tag && (
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 select-none">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Row 2: Full-width Heading */}
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-[#5A286F]">
                {item.title}
              </h3>

              {/* Row 3: Description */}
              <p className="mt-3 text-sm leading-relaxed text-black/80 dark:text-white/80 transition-colors group-hover:text-[#5A286F]/90">
                {item.description}
              </p>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
}