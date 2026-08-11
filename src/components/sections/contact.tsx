"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import LineMaskSplit from "@/components/originkit/ui/scroll-text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { GITHUB, GITHUB_ICON } from "@/lib/data/projects";
import { fadeUpItem, staggerContainer } from "@/lib/motion-tokens";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/* ── Personal email — drop yours in and the mailto CTA appears ────────────
   Left empty on purpose: the GitHub CTA below is live right now. */
const EMAIL = "";

/**
 * Contact — the closer. LineMaskSplit heading (same reveal family as Work),
 * one real CTA (GitHub), a giant ghost wordmark behind it all. Everything
 * snaps in together at 0.5s; reduced motion swaps the heading for static.
 */
export function Contact() {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-32 md:py-44"
    >
      {/* Divider + ambient tint, same language as the other sections */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 size-[38rem] -translate-x-1/2 rounded-full bg-teal-500/[0.07] blur-[150px]"
      />

      {/* Giant ghost wordmark — kinetic closer, pure decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[4vw] left-1/2 -translate-x-1/2 select-none font-display text-[24vw] font-bold uppercase leading-none tracking-tight text-white/[0.02]"
      >
        Hymerious
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {/* Eyebrow */}
          <motion.div variants={fadeUpItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden />
              Contact
            </span>
          </motion.div>

          {/* Heading — Originkit LineMaskSplit word reveal */}
          <div id="contact-heading" className="mt-6 min-h-[1.2em]">
            {reduced ? (
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                Let&rsquo;s build something.
              </h2>
            ) : (
              <LineMaskSplit
                text="Let's build something."
                color="#F8FAFC"
                tag="h2"
                splitMode="words"
                blurEnabled
                blurIntensity={10}
                translateYInitial={60}
                scrollTriggerPosition="center"
                font={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
                  fontWeight: "700",
                  lineHeight: "1.05",
                  letterSpacing: "-0.02em",
                  textAlign: "left",
                }}
              />
            )}
          </div>

          {/* Copy + CTAs */}
          <motion.p
            variants={fadeUpItem}
            className="mt-8 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            No forms, no bots — one click away. Issues, DMs, or just saying
            hi: the repos above are the fastest way to reach me.
          </motion.p>

          <motion.div
            variants={fadeUpItem}
            className="mt-12 flex flex-wrap items-center gap-5"
          >
            <MagneticButton href={GITHUB}>
              <GITHUB_ICON className="size-4" aria-hidden />
              GitHub — mohamedvlohlyflvh
            </MagneticButton>
            <MagneticButton href="#work" variant="ghost">
              View Work
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden
              />
            </MagneticButton>
          </motion.div>

          {EMAIL && (
            <motion.a
              variants={fadeUpItem}
              href={`mailto:${EMAIL}`}
              className="mt-8 inline-block text-sm text-slate-500 underline decoration-slate-700 underline-offset-4 transition-colors duration-300 hover:text-cyan-300 hover:decoration-cyan-400/60"
            >
              {EMAIL}
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
