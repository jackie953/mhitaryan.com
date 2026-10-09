"use client";

import { MagicCard } from "@/components/ui/magic-card";

const cases = [
  {
    label: "Market entry",
    title: "Entering Spain under shifting consumer law",
    body: "An international vehicle maker, before rollout. Proposed consumer and automotive rules were moving. We set out what had to change in the compliance plan.",
    className: "lg:col-span-1",
  },
  {
    label: "Regulatory",
    title: "AI rules that do not line up",
    body: "A global technology firm, across markets where the rules were fragmenting. We compared governance in 16 countries and the European Union, and where the obligations diverged.",
    className: "lg:col-span-1",
  },
  {
    label: "Expansion",
    title: "Who decides on cybersecurity in Sweden",
    body: "A global technology firm, without a clear picture of the public and defence-adjacent landscape. We mapped who holds authority and who shapes the decision, and the order in which to approach them.",
    className: "lg:col-span-1",
  },
  {
    label: "Risk",
    title: "Sanctions, trade, and a moving political map",
    body: "A US energy association. We turned shifts in sanctions, trade and geopolitics into what leadership needed to decide.",
    className: "lg:col-span-1 md:col-span-1 lg:col-span-3 xl:col-span-1 min-[1100px]:col-span-1",
  },
  {
    label: "Advocacy",
    title: "An issue, the actors, and a submission",
    body: "A mission-driven organisation, ahead of the UN Human Rights Council. We mapped the actors around the issue and prepared the submission.",
    className: "",
  },
];

export function CaseBento() {
  return (
    <div className="w-full py-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => (
          <MagicCard
            key={item.title}
            className={`min-h-[220px] ${item.className}`}
            gradientColor="#5A286F25"
          >
            <div className="flex min-h-[220px] flex-col justify-between">
              <div className="flex w-full justify-end">
                <span className="select-none text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 md:text-[11px]">
                  {item.label}
                </span>
              </div>

              <div>
                <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-black/80 dark:text-white/80">
                  {item.body}
                </p>
              </div>
            </div>
          </MagicCard>
        ))}
      </div>
    </div>
  );
}