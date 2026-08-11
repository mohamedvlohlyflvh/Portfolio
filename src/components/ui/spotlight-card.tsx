"use client";

import { useRef, type HTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Size of the cursor-following glow ring. */
  glowSize?: number;
}

/**
 * SpotlightCard — double-bezel panel: a machined outer shell wrapping an
 * inner core with an inset highlight, plus a border glow that tracks the
 * cursor. Glow position is written to CSS custom properties directly
 * (no re-renders), and no backdrop-blur on scrolling content.
 */
export function SpotlightCard({
  className,
  glowSize = 240,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={cn(
        // Outer shell — machined bezel
        "group relative rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-1.5",
        "transition-[border-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
        "hover:border-cyan-400/30",
        className,
      )}
      {...props}
    >
      {/* Inner core */}
      <div className="relative h-full overflow-hidden rounded-[1.375rem] bg-slate-900/60 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] transition-shadow duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.08),0_0_28px_rgba(34,211,238,0.07)]">
        {/* Cursor-following spotlight glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${glowSize}px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(34,211,238,0.09), transparent 65%)`,
          }}
        />
        <div className="relative h-full p-6">{children}</div>
      </div>
    </div>
  );
}