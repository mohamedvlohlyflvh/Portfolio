"use client";

import { motion } from "motion/react";
import { fadeUpItem } from "@/lib/motion-tokens";

/**
 * AvailabilityBadge — pulsing-status pill shown atop the hero.
 * "Available for Freelance".
 */
export function AvailabilityBadge() {
  return (
    <motion.div
      variants={fadeUpItem}
      className="inline-flex items-center gap-2.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] py-1.5 pl-3 pr-4 backdrop-blur-sm"
    >
      {/* Pulsing status dot */}
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-pulse-ring rounded-full bg-emerald-400" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
      </span>
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-300">
        Available for Freelance
      </span>
    </motion.div>
  );
}