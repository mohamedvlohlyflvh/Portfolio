"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Send } from "lucide-react";
import GlitchCharReveal from "@/components/originkit/ui/scrambletext";
import { SpotlightBackground } from "@/components/effects/spotlight";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ScrambleText } from "@/components/ui/scramble-text";
import { fadeUpItem, staggerContainer, motionTokens } from "@/lib/motion-tokens";

/**
 * Hero — first impression. Editorial scale: smaller headline, generous air.
 * Background: cursor-trailing spotlight + masked tech grid + slow ambient
 * aurora blobs. All content snaps in together at 0.5s (no stagger); the
 * wordmark scrambles in at 0.5s and the Originkit role line glitch-reveals
 * at 1s — both kinetic, both fast.
 */
export function Hero() {
  // Mount-gate the Originkit role line: appears + scrambles after 1000ms.
  const [showRoleLine, setShowRoleLine] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowRoleLine(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* ── Background layers ─────────────────────────────────────────── */}
      <SpotlightBackground />

      {/* Tech grid, radially masked so it melts into the void */}
      <div
        aria-hidden
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_65%_60%_at_50%_38%,black_20%,transparent_75%)]"
      />

      {/* Ambient aurora blobs */}
      <div
        aria-hidden
        className="absolute -left-40 -top-48 size-[34rem] animate-float-slow rounded-full bg-cyan-500/[0.13] blur-[130px]"
      />
      <div
        aria-hidden
        className="absolute -bottom-56 -right-40 size-[36rem] animate-float-slower rounded-full bg-teal-500/[0.11] blur-[140px]"
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-32 pt-36 sm:px-10 sm:pt-44"
      >
        <AvailabilityBadge />

        {/* Wordmark — scramble reveal, crisp and unglazed */}
        <h1 className="mt-12 max-w-5xl font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
          <ScrambleText
            text="Muhammad Said"
            delay={500}
            duration={600}
            stepMs={120}
            className="block"
          />
        </h1>

        {/* Role line — Originkit glitch reveal, appears at 1000ms */}
        <div className="mt-5 text-sm font-medium uppercase tracking-[0.4em] text-slate-400 sm:text-base">
          {!showRoleLine && (
            /* Same metrics placeholder — keeps layout stable until mount */
            <p aria-hidden className="opacity-0">
              Full-Stack Developer
            </p>
          )}
          {showRoleLine && (
            <GlitchCharReveal
              words="Full-Stack Developer"
              color="#475569"
              tag="div"
              enterAnimation={{
                mode: "oneLine",
                restState: "solid",
                replay: false,
                position: "above",
                scrambleIntensity: 60,
                ease: { type: "tween", duration: 0.6, ease: "easeOut" },
                flickerEnabled: true,
                flickerColor: "#475569",
                flickerIntensity: 40,
                flickerSpeed: 5,
              }}
              hoverAnimation={{
                type: "diffusion",
                lines: "oneLine",
                radius: 2,
              }}
              font={{
                fontSize: "inherit",
                lineHeight: "inherit",
                fontWeight: "inherit",
              }}
            />
          )}
        </div>

        {/* Capability subtitle */}
        <motion.p
          variants={fadeUpItem}
          className="mt-8 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
        >
          I build web apps — front to back. Next.js, Python, Node.js, and the
          database underneath. I sweat the boring parts: load time, edge
          cases, code you can still read in six months.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUpItem}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <MagneticButton href="#work">
            View Work
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            <Send className="size-4" aria-hidden />
            Contact Me
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#work"
        aria-label="Scroll to work"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: motionTokens.duration.fast, ease: motionTokens.ease.out }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-500 transition-colors hover:text-cyan-300"
      >
        <ChevronDown className="size-5 animate-scroll-cue" aria-hidden />
      </motion.a>
    </section>
  );
}