"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";

/** Extra props (layoutId, onClick, role, tabIndex, onKeyDown, aria-*) go to the outer element. */
export interface MagicCardProps
  extends Omit<HTMLMotionProps<"div">, "children" | "className" | "style"> {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  radius?: number;
  gradientSize?: number;
  /** Faint spotlight inside the card */
  gradientColor?: string;
  gradientOpacity?: number;
  /** Border highlight colours, from cursor centre outwards */
  gradientFrom?: string;
  gradientTo?: string;
  /** Resting border colour */
  borderColor?: string;
  /** Fill inside the border. Must match the page background */
  background?: string;
}

export function MagicCard({
  children,
  className,
  style,
  radius = 16,
  gradientSize = 220,
  gradientColor = "#D9D9D955",
  gradientOpacity = 0.6,
  gradientFrom,
  gradientTo,
  borderColor = "var(--neutral-alpha-medium, rgba(0,0,0,0.12))",
  background = "var(--page-background, #faf8fc)",
  onPointerMove: onPointerMoveProp,
  onPointerLeave: onPointerLeaveProp,
  ...rest
}: MagicCardProps) {
  // Dark mode follows the site's own data-theme attribute, not next-themes.
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const read = () => setIsDark(root.getAttribute("data-theme") === "dark");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const from = gradientFrom ?? (isDark ? "#A77BBF" : "#5A286F");
  const to = gradientTo ?? (isDark ? "#D9C2E6" : "#A77BBF");

  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerMoveProp?.(e);
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY, onPointerMoveProp]
  );

  useEffect(() => {
    reset();
  }, [reset]);

  const borderBg = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${from}, ${to}, ${borderColor} 100%)`;
  const spotlight = useMotionTemplate`radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px, ${gradientColor}, transparent 100%)`;

  return (
    <motion.div
      {...rest}
      className={className}
      onPointerMove={onPointerMove}
      onPointerLeave={(e) => {
        onPointerLeaveProp?.(e);
        reset();
      }}
      style={{
        position: "relative",
        height: "100%",
        borderRadius: radius,
        background: borderBg,
        ...style,
      }}
    >
      {/* Inner fill: leaves a 1px ring where the gradient shows as the border */}
      <div
        style={{
          position: "absolute",
          inset: 1,
          borderRadius: radius - 1,
          background,
          zIndex: 1,
        }}
      />
      {/* Faint spotlight */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 1,
          borderRadius: radius - 1,
          background: spotlight,
          opacity: gradientOpacity,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div style={{ position: "relative", zIndex: 3, height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}