"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Flex, Line, Row, ToggleButton, useTheme } from "@once-ui-system/core";
import { ThemeToggle } from "./ThemeToggle";
import { HyperText } from "@/registry/magicui/hyper-text";
import styles from "./Header.module.scss";

import {
  routes,
  display,
  about,
  blog,
  work,
  services,
  contact,
} from "@/resources";

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

const navLinkStyle = (active: boolean): React.CSSProperties => ({
  display: "block",
  padding: "13px 20px",
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: active ? 600 : 400,
  color: active
    ? "var(--neutral-on-background-strong)"
    : "var(--neutral-on-background-weak)",
  borderBottom: "1px solid var(--neutral-alpha-weak)",
  transition: "background 0.15s",
});

export const Header = () => {
  const pathname = usePathname() ?? "";
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
        {/* LEFT: Site name — always visible */}
        <Row paddingLeft="12" fillWidth vertical="center" style={navFadeStyle}>
          <Link
            href="/"
            style={{
              textDecoration: "none",
              transform: "translateY(-4px)",
              display: "inline-block",
            }}
          >
            <HyperText
              as="span"
              duration={700}
              className="p-0 overflow-visible"
              style={{
                color: "var(--header-color)",
                fontSize: "clamp(1rem, 2.8vw, 1.375rem)",
                fontWeight: 600,
                letterSpacing: "0.02em",
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
                whiteSpace: "nowrap",
              }}
            >
              MHITARYAN CONSULTING
            </HyperText>
          </Link>
        </Row>

        {/* CENTER: Pill nav — desktop only */}
        <Row fillWidth horizontal="center" className={styles.desktopOnly} style={navFadeStyle}>
          <Row
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {routes["/about"] && (
                <ToggleButton href="/about" label={about.label} selected={pathname === "/about"} />
              )}
              {routes["/work"] && (
                <ToggleButton href="/work" label={work.label} selected={pathname.startsWith("/work")} />
              )}
              {routes["/services"] && (
                <ToggleButton href={services.path} label={services.label} selected={pathname.startsWith("/services")} />
              )}
              {routes["/contact"] && (
                <ToggleButton href={contact.path} label={contact.label} selected={pathname.startsWith("/contact")} />
              )}
              {routes["/blog"] && (
                <ToggleButton href="/blog" label={blog.label} selected={pathname.startsWith("/blog")} />
              )}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>

        {/* RIGHT: Timezone — desktop only */}
        <Flex fillWidth horizontal="end" vertical="center" className={styles.desktopOnly} style={navFadeStyle}>
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            style={{ transform: "translateY(-4px)" }}
          >
            Europe/Stockholm
          </Flex>
        </Flex>

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
              {routes["/"] && (
                <Link href="/" style={navLinkStyle(pathname === "/")} onClick={() => setMenuOpen(false)}>
                  Home
                </Link>
              )}
              {routes["/about"] && (
                <Link href="/about" style={navLinkStyle(pathname === "/about")} onClick={() => setMenuOpen(false)}>
                  About
                </Link>
              )}
              {routes["/services"] && (
                <Link href={services.path} style={navLinkStyle(pathname.startsWith("/services"))} onClick={() => setMenuOpen(false)}>
                  Services
                </Link>
              )}
              {routes["/work"] && (
                <Link href="/work" style={navLinkStyle(pathname.startsWith("/work"))} onClick={() => setMenuOpen(false)}>
                  Work
                </Link>
              )}
              {routes["/blog"] && (
                <Link href="/blog" style={navLinkStyle(pathname.startsWith("/blog"))} onClick={() => setMenuOpen(false)}>
                  Blog
                </Link>
              )}
              {routes["/contact"] && (
                <Link href={contact.path} style={navLinkStyle(pathname.startsWith("/contact"))} onClick={() => setMenuOpen(false)}>
                  Contact
                </Link>
              )}
              {display.themeSwitcher && <MobileThemeRow />}
            </div>
          )}
        </div>
      </Row>
    </>
  );
};
