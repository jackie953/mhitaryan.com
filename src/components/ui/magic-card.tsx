"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  gradientSize?: number;
  gradientColor?: string;
  /** Spotlight opacity, from 0 to 1. */
  gradientOpacity?: number;
}

export function MagicCard({
  children,
  className,
  gradientSize = 150,
  gradientColor = "#5A286F25",
  gradientOpacity = 1,
  onMouseMove,
  onMouseLeave,
  ...props
}: MagicCardProps) {
  const [isPointerInside, setIsPointerInside] = useState(false);
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const { left, top } = event.currentTarget.getBoundingClientRect();
      mouseX.set(event.clientX - left);
      mouseY.set(event.clientY - top);
      setIsPointerInside(true);
      onMouseMove?.(event);
    },
    [mouseX, mouseY, onMouseMove]
  );

  const handleMouseLeave = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      setIsPointerInside(false);
      mouseX.set(-gradientSize);
      mouseY.set(-gradientSize);
      onMouseLeave?.(event);
    },
    [mouseX, mouseY, gradientSize, onMouseLeave]
  );

  useEffect(() => {
    mouseX.set(-gradientSize);
    mouseY.set(-gradientSize);
  }, [mouseX, mouseY, gradientSize]);

  const background = useMotionTemplate`
    radial-gradient(
      ${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 90%
    )
  `;

  return (
    <div
      {...props}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card/80 p-6 backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg",
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        {children}
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-2xl"
        style={{
          background,
          opacity: isPointerInside ? gradientOpacity : 0,
        }}
      />
    </div>
  );
}