'use client';

import { ArrowUpRight, Eye } from 'lucide-react';
import Link from 'next/link';
import type React from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/utils/tailwind.utils';

interface ButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  target?: '_self' | '_blank' | '_parent' | '_top';
  className?: string;
  icon?: React.ReactNode;
}

const NavigationButton = ({
  href,
  onClick,
  text = 'Open',
  icon = undefined,
  target = '_blank',
  className = ''
}: ButtonProps) => {
  const [hovered, setHovered] = useState(false);

  const button = (
    <AnimatePresence mode="popLayout">
      <button
        type="button"
        className={cn(
          'flex items-center gap-1 outline-none cursor-pointer text-zinc-400 hover:text-blue-400 font-semibold shadow-sm py-2 px-4 hover:brightness-125 active:brightness-105 transition-opacity duration-100 rounded-lg',
          className
        )}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {!hovered && (
          <motion.div
            key={`eye-btn${text}`}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.1 }}
          >
            {icon ? icon : <Eye size={14} />}
          </motion.div>
        )}
        <motion.p
          layout
          transition={{ duration: 0.1, ease: 'linear' }}
          className="text-[11px] sm:text-xs whitespace-nowrap"
        >
          {text}
        </motion.p>
        {hovered && (
          <motion.div
            key={`arrow-btn${text}`}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ ease: 'linear', duration: 0.1 }}
          >
            <ArrowUpRight size={14} />
          </motion.div>
        )}
      </button>
    </AnimatePresence>
  );

  return (
    <div className="flex items-start">
      {href ? <Link href={href} target={target}>{button}</Link> : button}
    </div>
  );
};

export default NavigationButton;
