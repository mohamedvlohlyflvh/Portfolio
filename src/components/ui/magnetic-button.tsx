"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { springs } from "@/lib/motion-tokens";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
  /** Magnetic pull strength (0 = disabled). */
  strength?: number;
  onClick?: () => void;
}

/**
 * MagneticButton — anchor that pulls toward the cursor with a spring and
 * glows on hover. Primary = gradient fill w/ cyan glow, ghost = glass border.
 */
export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  strength = 0.32,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const x = useSpring(0, springs.trail);
  const y = useSpring(0, springs.trail);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || strength <= 0) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x, y }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ ...springs.snappy, scale: springs.gentle }}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-300 select-none",
        variant === "primary" &&
          "bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 hover:shadow-[0_0_44px_rgba(34,211,238,0.4)]",
        variant === "ghost" &&
          "border border-slate-700/80 bg-transparent text-slate-200 hover:border-cyan-400/60 hover:bg-cyan-400/5 hover:text-cyan-300",
        className,
      )}
    >
      {children}
    </motion.a>
  );
}