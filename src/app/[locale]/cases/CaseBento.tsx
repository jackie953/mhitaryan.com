"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import { MagicCard } from "@/components/ui/magic-card";

interface CaseItem {
  slug: string;
  label: string;
  title: string;
  body: string;
  /** Modal write-up. Empty string shows a clearly marked placeholder. */
  situation: string;
  reading: string;
  delivered: string;
}

const cases: CaseItem[] = [
  {
    slug: "entering-spain-consumer-law",
    label: "Market entry",
    title: "Entering Spain under shifting consumer law",
    body: "An international vehicle maker, before rollout. Proposed consumer and automotive rules were moving. We set out what had to change in the compliance plan.",
    situation: "",
    reading: "",
    delivered: "",
  },
  {
    slug: "who-decides-cybersecurity-sweden",
    label: "Expansion",
    title: "Who decides on cybersecurity in Sweden",
    body: "A global technology firm, without a clear picture of the public and defense-adjacent landscape. We mapped who holds authority and who shapes the decision, and the order in which to approach them.",
    situation: "",
    reading: "",
    delivered: "",
  },
  {
    slug: "ai-rules-that-do-not-line-up",
    label: "Regulatory",
    title: "AI rules that do not line up",
    body: "A global technology firm, across markets where the rules were fragmenting. We compared governance in 16 countries and the European Union, and where the obligations diverged.",
    situation: "",
    reading: "",
    delivered: "",
  },
  {
    slug: "what-lands-in-sweden",
    label: "Communications",
    title: "What lands in Sweden",
    body: "A cosmetics company, preparing to enter. We set the communications for the entry: what to say, to whom, and what would read as local rather than imported. We also built the internal reference the team used to keep that line consistent.",
    situation: "",
    reading: "",
    delivered: "",
  },
  {
    slug: "an-issue-the-actors-and-a-submission",
    label: "Advocacy",
    title: "An issue, the actors, and a submission",
    body: "A mission-driven organization, ahead of the UN Human Rights Council. We mapped the actors around the issue and prepared the submission.",
    situation: "",
    reading: "",
    delivered: "",
  },
  {
    slug: "sanctions-trade-moving-political-map",
    label: "Risk",
    title: "Sanctions, trade, and a moving political map",
    body: "A US energy association. We turned shifts in sanctions, trade and geopolitics into what leadership needed to decide.",
    situation: "",
    reading: "",
    delivered: "",
  },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';

const tagClass =
  "select-none text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 md:text-[11px]";

function slugFromUrl(): string | null {
  const slug = new URLSearchParams(window.location.search).get("case");
  return slug && cases.some((c) => c.slug === slug) ? slug : null;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const read = () => setMobile(mq.matches);
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);
  return mobile;
}

function CaseModal({
  item,
  onClose,
  reduceMotion,
}: {
  item: CaseItem;
  onClose: () => void;
  reduceMotion: boolean;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const mobile = useIsMobile();
  const isPresent = useIsPresent();

  // Initial focus, body scroll lock, Escape and focus trap. Released as soon
  // as the exit animation starts, not when the element finally unmounts.
  useEffect(() => {
    if (!isPresent) return;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, isPresent]);

  const transition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 320, damping: 34 };

  const sections: { label: string; text: string }[] = [
    { label: "The situation", text: item.situation },
    { label: "How we read it", text: item.reading },
    { label: "What we delivered", text: item.delivered },
  ];

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 z-[1000] bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
      />
      <div
        className="fixed inset-0 z-[1001] flex items-stretch justify-center md:items-center md:p-[24px]"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <MagicCard
          layoutId={`case-${item.slug}`}
          transition={transition}
          radius={mobile ? 0 : 16}
          className="w-full md:max-w-[720px]"
          style={{ height: mobile ? "100%" : "auto" }}
        >
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`case-title-${item.slug}`}
            className="overflow-y-auto p-[24px] md:p-[32px]"
            style={{ maxHeight: mobile ? "100dvh" : "calc(100dvh - 48px)" }}
          >
            <div className="flex items-center justify-between">
              <span className={tagClass}>{item.label}</span>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close case"
                className="-mr-[8px] flex h-[32px] w-[32px] items-center justify-center rounded-full text-black/60 transition-colors hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5A286F] dark:text-white/60 dark:hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <h2
              id={`case-title-${item.slug}`}
              className="mt-[12px] text-xl font-semibold leading-[28px] tracking-tight text-foreground md:text-2xl md:leading-[32px]"
            >
              {item.title}
            </h2>

            <div className="mt-[24px] flex flex-col gap-[20px]">
              {sections.map((s) => (
                <div key={s.label}>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80">
                    {s.label}
                  </h3>
                  {s.text ? (
                    <p className="mt-[6px] text-[16px] leading-[1.5] text-black/80 dark:text-white/80">
                      {s.text}
                    </p>
                  ) : (
                    <p className="mt-[6px] text-[16px] italic leading-[1.5] text-black/45 dark:text-white/45">
                      [Placeholder: write-up not added yet]
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </MagicCard>
      </div>
    </>
  );
}

export function CaseBento() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const pushedRef = useRef(false);
  const reduceMotion = useReducedMotion() ?? false;

  // Open from ?case= on load, and follow back/forward.
  useEffect(() => {
    setActiveSlug(slugFromUrl());
    const onPopState = () => setActiveSlug(slugFromUrl());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const open = useCallback((slug: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("case", slug);
    window.history.pushState(null, "", url.toString());
    pushedRef.current = true;
    setActiveSlug(slug);
  }, []);

  const close = useCallback(() => {
    const slug = activeSlug;
    if (pushedRef.current) {
      pushedRef.current = false;
      window.history.back(); // popstate handler clears the state
    } else {
      const url = new URL(window.location.href);
      url.searchParams.delete("case");
      window.history.replaceState(null, "", url.toString());
      setActiveSlug(null);
    }
    if (slug) {
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>(`[data-case="${slug}"]`)?.focus()
      );
    }
  }, [activeSlug]);

  const active = cases.find((c) => c.slug === activeSlug) ?? null;

  return (
    <div className="w-full py-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cases.map((item) => {
          return (
            <MagicCard
              key={item.slug}
              layoutId={`case-${item.slug}`}
              data-case={item.slug}
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={`Read case: ${item.title}`}
              onClick={() => open(item.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  open(item.slug);
                }
              }}
              transition={reduceMotion ? { duration: 0 } : undefined}
              className="group min-h-[300px] md:min-h-[380px] cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#5A286F]/60 focus-visible:ring-offset-2 rounded-2xl"
            >
              <div className="flex h-full min-h-[inherit] flex-col p-[32px]">
                <div className="flex w-full justify-end">
                  <span className={tagClass}>{item.label}</span>
                </div>

                <h2 className="mt-[12px] text-lg font-semibold leading-[28px] tracking-tight text-foreground md:min-h-[56px] md:text-xl">
                  {item.title}
                </h2>

                <p className="mt-[12px] text-sm leading-relaxed text-black/80 dark:text-white/80">
                  {item.body}
                </p>

                <span className="mt-[16px] flex items-center justify-end gap-[6px] text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/80 transition-all duration-200 group-hover:text-black/80 group-focus-visible:text-black/80 dark:group-hover:text-white/80 dark:group-focus-visible:text-white/80 md:text-[11px]">
                  Read case
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-[2px] group-focus-visible:translate-x-[2px]">
                    <path d="M2 6h8M6.5 2.5L10 6l-3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </MagicCard>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <CaseModal
            key={active.slug}
            item={active}
            onClose={close}
            reduceMotion={reduceMotion}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
