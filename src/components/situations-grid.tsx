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
    id: "nordics-entry",
    title: "Entering Sweden or the Nordics",
    description: "Sweden and the Nordics are consensus-driven and highly structured. We map decision-makers across public and private sectors, analyze regulatory conditions, and identify key stakeholders.",
    tag: "MARKET ENTRY"
  },
  {
    id: "cross-border",
    title: "Operating Cross-Border or Expanding Abroad",
    description: "Different markets operate by different rules and networks. We deliver comparative political and regulatory landscape analysis across the EU, US, and regional markets to help you expand smoothly.",
    tag: "EXPANSION"
  },
  {
    id: "regulatory-shift",
    title: "A Regulatory Shift is Approaching",
    description: "Rules are changing, and you need to assess the operational impact early. We track policy processes from proposal to enforcement, identifying key decision windows and translating legislative shifts.",
    tag: "REGULATORY"
  },
  {
    id: "political-shift",
    title: "The Political Landscape is Shifting",
    description: "Public sentiment and political narratives move fast. We monitor debates across politics, media, and civil society to separate temporary noise from real policy momentum.",
    tag: "POLITICAL"
  },
  {
    id: "geopolitical-risk",
    title: "Geopolitical & Market Risk is Elevating",
    description: "Trade dynamics, sanctions, energy policy, and security considerations are altering your operational environment. We provide ongoing monitoring and risk analysis to keep leadership updated.",
    tag: "RISK & INTELLIGENCE"
  },
  {
    id: "advocacy-position",
    title: "Advancing a Policy Position",
    description: "Moving an issue requires knowing where and when a battle is winnable. Drawing on extensive policy experience, we map power structures, shape core narratives, and build advocacy strategies.",
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
                  <span className="text-[10px] md:text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/60 select-none">
                    {item.tag}
                  </span>
                )}
              </div>

              {/* Row 2: Full-width Heading */}
              <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-[#5A286F]">
                {item.title}
              </h3>

              {/* Row 3: Description */}
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground/90">
                {item.description}
              </p>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
}