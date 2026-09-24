"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { ToggleButton, useTheme } from "@once-ui-system/core";

export const ThemeToggle: React.FC<{ size?: "s" | "m" | "l" }> = ({ size }) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");

  // Run once after mount
  useEffect(() => {
    setMounted(true);
    const htmlTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    setCurrentTheme(htmlTheme);
  }, []);

  // Persist user’s theme choice
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", currentTheme);
    }
  }, [currentTheme, mounted]);

  const icon = currentTheme === "dark" ? "light" : "dark";
  const nextTheme = currentTheme === "light" ? "dark" : "light";

  return (
    <ToggleButton
      size={size}
      prefixIcon={icon}
      onClick={() => {
        setTheme(nextTheme);
        setCurrentTheme(nextTheme); // ensure state sync
      }}
      aria-label={`Switch to ${nextTheme} mode`}
    />
  );
};
