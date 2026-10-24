"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";

import { Button, Line, Row, ToggleButton, useTheme } from "@once-ui-system/core";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import Text3DFlip from "@/registry/magicui/text-3d-flip";
import styles from "./Header.module.scss";

import {
  routes,
  display,
  about,
  cases,
  services,
  contact,
} from "@/resources";

/** Strip the leading /en or /sv locale segment for route-matching against locale-agnostic paths. */
const stripLocale = (pathname: string) => pathname.replace(/^\/(en|sv)(?=\/|$)/, "") || "/";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string;
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setCurrentTime(new Intl.DateTimeFormat(locale, options).format(now));
    };
    updateTime();
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, [timeZone, locale]);
  return <>{currentTime}</>;
};

export default TimeDisplay;

/** Full-row theme toggle used in the mobile hamburger menu */
const MobileThemeRow: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<string>("light");

  useEffect(() => {
    const t = document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(t);
  }, []);

  useEffect(() => {
    if (theme) setCurrentTheme(theme);
  }, [theme]);

  const toggle = () => {
    const next = currentTheme === "light" ? "dark" : "light";
    setTheme(next);
    setCurrentTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  const label = currentTheme === "light" ? "Dark mode" : "Light mode";

  return (
    <button
      onClick={toggle}
      style={{
        width: "100%",
        padding: "13px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
        color: "var(--neutral-on-background-weak)",
        textAlign: "left",
      }}
    >
      <span>{label}</span>
      {/* Render the real icon but block its own click so the row button handles it */}
      <span style={{ pointerEvents: "none" }}>
        <ThemeToggle />
      </span>
    </button>
  );
};

/** Override the library's default padding/height so each link reads ~10px
    horizontal (6px here + the ToggleButton's own 4px inner label padding
    = 10px) and stands 36px tall, matching the icon buttons and CTA. The
    lavender hover pill paints on this same box, so it hugs the text. */
const navPillButtonStyle: React.CSSProperties = {
  paddingLeft: 14,
  paddingRight: 14,
  height: 36,
  minHeight: 36,
};

const navLinkStyle = (active: boolean): React.CSSProperties => ({
  display: "flex",
  alignItems: "center",
  padding: "13px 20px",
  textDecoration: "none",
  fontSize: "14px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "var(--header-color)",
  background: active ? "var(--neutral-alpha-medium)" : "transparent",
  borderBottom: "1px solid var(--neutral-alpha-weak)",
  transition: "background 0.15s",
});

export const Header = () => {
  const pathname = usePathname() ?? "";
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const localePath = stripLocale(pathname);
  const withLocale = (path: string) => (path === "/" ? `/${locale}` : `/${locale}${path}`);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollHidden, setScrollHidden] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const menuRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  // Fade the header text/nav out over the first bit of scroll (all breakpoints)
  useEffect(() => {
    const FADE_DISTANCE = 160;
    const onScroll = () => {
      const currentY = window.scrollY;
      setNavOpacity(Math.max(0, 1 - currentY / FADE_DISTANCE));

      // Hide on scroll-down (mobile only), show on scroll-up
      if (window.innerWidth > 768) return;
      if (currentY > lastScrollY.current && currentY > 80) {
        setScrollHidden(true);
        setMenuOpen(false);
      } else {
        setScrollHidden(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navFadeStyle: React.CSSProperties = {
    opacity: navOpacity,
    transition: "opacity 0.15s linear",
    pointerEvents: navOpacity < 0.05 ? "none" : "auto",
  };

  // Close dropdown on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const headerClass = [styles.position, scrollHidden ? styles.headerHidden : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <Row
        fitHeight
        className={headerClass}
        position="sticky"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        vertical="center"
        data-border="rounded"
      >
        {/* Inner container — aligned to the same max-width as the main content
            so the logo and menu line up with the page grid's edges */}
        <Row maxWidth="xl" fillWidth horizontal="between" vertical="center" style={{ minHeight: 48 }}>
          {/* LEFT: Site name — always visible */}
          <Row paddingLeft="12" fillHeight vertical="center" style={{ ...navFadeStyle, minHeight: 48 }}>
            <Link
              href={withLocale("/")}
              style={{
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Text3DFlip
                textClassName="text-[var(--header-color)]"
                flipTextClassName="text-[#11051D]"
                rotateDirection="top"
                staggerDuration={0.02}
                staggerFrom="first"
                transition={{ type: "spring", damping: 25, stiffness: 160 }}
                style={{
                  color: "var(--header-color)",
                  fontSize: "clamp(1.7rem, 2.9vw, 2.05rem)",
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  fontFamily: "var(--font-heading)",
                  whiteSpace: "nowrap",
                  lineHeight: 1,
                  alignItems: "center",
                }}
              >
                MHITARYAN
              </Text3DFlip>
            </Link>
          </Row>

          {/* RIGHT: Pill nav — desktop only, right edge aligned to the container */}
          <Row paddingRight="12" fillHeight vertical="center" className={styles.desktopOnly} style={{ ...navFadeStyle, minHeight: 48 }}>
            <Row
              background="page"
              radius="l"
              paddingX="4"
              paddingY="4"
              horizontal="center"
              vertical="center"
              zIndex={1}
            >
              <Row vertical="center" className={styles.navPill} style={{ fontSize: "15px" }} suppressHydrationWarning>
              <Row gap="2" vertical="center" className={styles.navLinks}>
                {routes["/about"] && (
                  <ToggleButton size="m" style={navPillButtonStyle} href={withLocale("/about")} label={tNav("about")} selected={localePath === "/about"} />
                )}
                {routes["/services"] && (
                  <ToggleButton size="m" style={navPillButtonStyle} href={withLocale(services.path)} label={tNav("services")} selected={localePath.startsWith("/services")} />
                )}
                {routes["/cases"] && (
                  <ToggleButton size="m" style={navPillButtonStyle} href={withLocale(cases.path)} label={tNav("cases")} selected={localePath.startsWith("/cases")} />
                )}
              </Row>
              <Line background="neutral-alpha-medium" vert maxHeight="20" style={{ marginLeft: 6, marginRight: 6 }} />
              <Row gap="4" vertical="center" className={styles.navToggles}>
                {display.themeSwitcher && <ThemeToggle size="m" />}
                <LanguageToggle />
              </Row>
              <Line background="neutral-alpha-medium" vert maxHeight="20" style={{ marginLeft: 4, marginRight: 10 }} />
              <Button
                href={withLocale(contact.path)}
                size="s"
                weight="default"
                className={styles.cta}
                style={{
                  height: 32,
                  minHeight: 32,
                  borderRadius: 999,
                  paddingLeft: 10,
                  paddingRight: 10,
                  background: "var(--header-color)",
                  border: "none",
                  boxShadow: "none",
                  color: "var(--page-background)",
                }}
              >
                {/* once-ui's Button wraps children in its own inner div, so a
                    gap on the Button's own style never reaches these two —
                    the flex + gap has to live on a wrapper we control. */}
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{tNav("briefUs")}</span>
                  <span className={styles.ctaArrowWrapper}>
                    <span className={styles.ctaArrow} />
                  </span>
                </span>
              </Button>
              </Row>
            </Row>
          </Row>

          {/* MOBILE: Hamburger + dropdown */}
          <div ref={menuRef} className={styles.mobileNav}>
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className={styles.hamburger}
          >
            {menuOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
          </button>

          {menuOpen && (
            <div className={styles.mobileDropdown}>
              {routes["/about"] && (
                <Link href={withLocale("/about")} style={navLinkStyle(localePath === "/about")} onClick={() => setMenuOpen(false)}>
                  {tNav("about")}
                </Link>
              )}
              {routes["/services"] && (
                <Link href={withLocale(services.path)} style={navLinkStyle(localePath.startsWith("/services"))} onClick={() => setMenuOpen(false)}>
                  {tNav("services")}
                </Link>
              )}
              {routes["/cases"] && (
                <Link href={withLocale(cases.path)} style={navLinkStyle(localePath.startsWith("/cases"))} onClick={() => setMenuOpen(false)}>
                  {tNav("cases")}
                </Link>
              )}
              {display.themeSwitcher && <MobileThemeRow />}
              <div style={{ padding: "13px 20px", borderBottom: "1px solid var(--neutral-alpha-weak)", display: "flex", justifyContent: "flex-end" }}>
                <LanguageToggle />
              </div>
              <div style={{ padding: "13px 20px" }}>
                <Button
                  href={withLocale(contact.path)}
                  size="m"
                  weight="default"
                  fillWidth
                  horizontal="center"
                  className={styles.cta}
                  style={{
                    height: 36,
                    minHeight: 36,
                    borderRadius: 999,
                    background: "var(--header-color)",
                    border: "none",
                    boxShadow: "none",
                    color: "var(--page-background)",
                  }}
                  onClick={() => setMenuOpen(false)}
                >
                  <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{tNav("briefUs")}</span>
                    <span className={styles.ctaArrowWrapper}>
                      <span className={styles.ctaArrow} />
                    </span>
                  </span>
                </Button>
              </div>
            </div>
          )}
          </div>
        </Row>
      </Row>
    </>
  );
};
