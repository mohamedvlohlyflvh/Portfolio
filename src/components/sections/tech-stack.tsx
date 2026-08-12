"use client";

import { motion } from "motion/react";
import GlitchCharReveal from "@/components/originkit/ui/scrambletext";
import { stackCategories } from "@/lib/data/stack";
import { motionTokens } from "@/lib/motion-tokens";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { SpotlightCard } from "@/components/ui/spotlight-card";

/** Asymmetric bento weights: [7,5] / [5,7] — interlocks with zero dead cells. */
const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-7",
];

/**
 * TechStack — "The Arsenal". Asymmetric bento of 4 pillars; each category is
 * a minimal list of tools with brand icons that highlight on hover. No pills,
 * no badges, no tag chips. Cards snap in together on scroll (whileInView,
 * once, unified 0.5s delay — no stagger); reduced motion fades instead.
 */
export function TechStack() {
  const reduced = usePrefersReducedMotion();

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.sm },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.out },
    },
  } as const;

  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative py-32 md:py-40"
    >
      {/* Divider + faint ambient tint */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute right-[-12rem] top-40 size-[30rem] rounded-full bg-cyan-500/[0.05] blur-[130px]"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* ── Section header ─────────────────────────────────────────── */}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">
          What I build with
        </p>
        {/* Heading — Originkit GlitchCharReveal scramble on scroll (native
            IntersectionObserver, position "middle" = half visible). The
            component renders its own Tag, so the semantic h2 is sr-only and
            the visual is a div — tag="div" is mandatory (ghost measurers). */}
        <div className="mt-4">
          {reduced ? (
            <h2
              id="stack-heading"
              className="font-display text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl"
            >
              The Arsenal
            </h2>
          ) : (
            <>
              <h2 id="stack-heading" className="sr-only">
                The Arsenal
              </h2>
              <GlitchCharReveal
                words="The Arsenal"
                color="#F8FAFC"
                tag="div"
                enterAnimation={{
                  mode: "oneLine",
                  restState: "solid",
                  replay: false,
                  position: "middle",
                  scrambleIntensity: 60,
                  ease: { type: "tween", duration: 0.6, ease: "easeOut" },
                  flickerEnabled: true,
                  flickerColor: "#94A3B8",
                  flickerIntensity: 40,
                  flickerSpeed: 5,
                }}
                hoverAnimation={{
                  type: "diffusion",
                  lines: "oneLine",
                  radius: 2,
                }}
                font={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
                  fontWeight: "700",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              />
            </>
          )}
        </div>
        {/* Subtitle — Originkit GlitchCharReveal scramble, same treatment as
            the hero subtitle + work copy: hover none, flicker off (large
            text), tag="div" mandatory, scroll-triggered at "middle" (same
            beat as the heading above), solid pre-trigger; reduced motion
            keeps the static p. */}
        <div className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          {reduced ? (
            <p>
              No resumé bingo — just the tools I actually use every week, from
              interface to infrastructure.
            </p>
          ) : (
            <GlitchCharReveal
              words="No resumé bingo — just the tools I actually use every week, from interface to infrastructure."
              color="#94A3B8"
              tag="div"
              hoverAnimation={{ type: "none" }}
              enterAnimation={{
                mode: "multiLine",
                restState: "solid",
                replay: false,
                position: "middle",
                scrambleIntensity: 45,
                ease: { type: "tween", duration: 0.6, ease: "easeOut" },
                // Flicker OFF: ~90 chars — maybeFlicker's per-char loops
                // flood renders. Same call as hero subtitle + work copy.
                flickerEnabled: false,
                flickerColor: "#64748B",
                flickerIntensity: 30,
                flickerSpeed: 5,
              }}
              font={{
                fontFamily: "var(--font-geist)",
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
                letterSpacing: "0",
              }}
            />
          )}
        </div>

        {/* ── Asymmetric bento ───────────────────────────────────────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 grid grid-flow-dense grid-cols-1 gap-5 md:grid-cols-12"
        >
          {stackCategories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={item}
              className={cn("h-full", SPANS[index % SPANS.length])}
            >
              <SpotlightCard className="h-full">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {category.description}
                </p>

                {/* Minimal tool list */}
                <ul className="mt-6 flex flex-col border-t border-slate-800/80 pt-1">
                  {category.tools.map((tool) => {
                    const ToolIcon = tool.icon;
                    return (
                      <li
                        key={tool.name}
                        className="group/tool -mx-2 flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-slate-800/40"
                      >
                        <span aria-hidden className="shrink-0 text-slate-500 transition-colors duration-300 group-hover/tool:text-cyan-300">
                          <ToolIcon className="size-4" />
                        </span>
                        <span className="text-sm text-slate-300 transition-colors duration-300 group-hover/tool:text-white">
                          {tool.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}