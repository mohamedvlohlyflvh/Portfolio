"use client";

import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import LineMaskSplit from "@/components/originkit/ui/scroll-text-reveal";
import HoverImageReveal from "@/components/originkit/ui/hover-image-reveal";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { PROJECTS, GITHUB, GITHUB_ICON, type Project } from "@/lib/data/projects";
import { fadeUpItem, staggerContainer, motionTokens } from "@/lib/motion-tokens";

/* Plain <img>: local PNG screenshots + generated SVG data-URL art tiles.
   next/image can't serve data: sources, and the sprite is tiny/lazy.
   `sizes` is explicit on every image; `priority` (eager + fetchPriority=high)
   is reserved for the primary featured card (Qestak) only — shelf and
   placeholder images stay lazy. */
/* eslint-disable @next/next/no-img-element */
function PreviewImage({
  src,
  alt,
  className = "",
  sizes,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      draggable={false}
      className={className}
    />
  );
}

const card = (reduced: boolean) => ({
  hidden: reduced ? { opacity: 0 } : { opacity: 0, y: motionTokens.distance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.ease.out },
  },
} as const);

/* Shared keyboard-focus ring — matches the double-bezel border radius. */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* HoverImageReveal is an object-keyed prop system, not an array.
   Build item{n} for however many REAL entries we pass. */
function buildRevealItems(projects: Project[]) {
  const items: Record<string, unknown> = {
    itemCount: projects.length,
  };
  projects.forEach((p, i) => {
    items[`item${i + 1}`] = {
      text: `${p.name} — ${p.gloss}`,
      image: { src: p.previews[0].src, alt: p.name },
      link: p.demo ?? p.github,
    };
  });
  return items;
}

export function Work() {
  const reduced = usePrefersReducedMotion();
  const cardVariants = card(reduced);
  const revealItems = buildRevealItems(PROJECTS);

  return (
    <section
      id="work"
      className="relative scroll-mt-24 py-24 md:py-32"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        {/* Header — eyebrow + copy snap in together at 0.5s; the heading is
            an Originkit LineMaskSplit scroll reveal (GSAP word mask + blur). */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUpItem}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-400">
              <span className="size-1.5 rounded-full bg-cyan-400" aria-hidden />
              Selected Work
            </span>
          </motion.div>

          <div id="work-heading" className="mt-6 min-h-[1.2em]">
            {reduced ? (
              <h2 className="font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[1.05] tracking-tight text-white">
                Built, shipped, in&nbsp;use.
              </h2>
            ) : (
              <LineMaskSplit
                text="Built, shipped, in use."
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

          <div className="mt-16 flex flex-wrap items-end justify-between gap-6">
            <motion.p
              variants={fadeUpItem}
              className="max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
            >
              Two apps I use daily and three prototypes I keep sharpening. The
              featured two link straight to the live product — the rest live on
              GitHub, source and all.
            </motion.p>
            <motion.a
              variants={fadeUpItem}
              href={GITHUB}
              target="_blank"
              rel="noreferrer"
              className={`group inline-flex items-center gap-2 rounded-md text-sm font-medium text-slate-300 transition-colors duration-300 hover:text-cyan-300 ${FOCUS_RING}`}
            >
              <GITHUB_ICON className="size-4 text-slate-400 transition-colors duration-300 group-hover:text-cyan-300" aria-hidden />
              github.com/mohamedvlohlyflvh
              <ArrowUpRight
                className="size-3.5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </motion.a>
          </div>
        </motion.div>

        {/* Bento grid — progressive columns:
            <640px: 1 col (everything 1×1) · ≥640px: 6-col tablet · ≥1024px: 12-col
            asymmetric bento (featured 7×2 + 5/5/5/7, grid-flow-dense). */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-6 sm:auto-rows-[minmax(16rem,auto)] lg:grid-cols-12 lg:auto-rows-[minmax(19rem,auto)] lg:grid-flow-dense"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.slug}
              variants={cardVariants}
              whileHover={{ scale: reduced ? 1 : 1.012 }}
              transition={{ duration: motionTokens.duration.fast, ease: motionTokens.ease.out }}
              className={`group relative flex flex-col ${p.span}`}
            >
              {/* Double-bezel shell — border glows on hover AND keyboard focus */}
              <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.02] p-1.5 transition-colors duration-300 hover:border-cyan-400/40 focus-within:border-cyan-400/40">
                {/* Preview pane */}
                <div className="relative flex-1 min-h-44 overflow-hidden rounded-[calc(1.75rem-0.375rem)] bg-slate-900/70">
                  {p.featured && p.previews.length > 1 ? (
                    <>
                      {/* Coverflow strip — two slides, shifts on hover */}
                      <div className="absolute inset-0">
                        <div className="flex h-full w-[200%] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-x-1/2">
                          {p.previews.map((preview, i) => (
                            <div key={i} className="relative h-full w-1/2">
                              <PreviewImage
                                src={preview.src}
                                alt={preview.alt}
                                sizes="(max-width: 1023px) 100vw, 58vw"
                                className="absolute inset-0 h-full w-full object-cover object-top"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 flex items-center gap-1.5" aria-hidden>
                        <span className="size-1.5 rounded-full bg-cyan-400" />
                        <span className="size-1.5 rounded-full bg-white/25" />
                      </div>
                    </>
                  ) : p.tile ? (
                    <p.tile className="absolute inset-0 h-full w-full transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]" />
                  ) : (
                    <PreviewImage
                      src={p.previews[0].src}
                      alt={p.previews[0].alt}
                      sizes={
                        p.featured
                          ? "(max-width: 1023px) 100vw, 58vw"
                          : "(max-width: 1023px) 50vw, 42vw"
                      }
                      priority={p.featured ? true : false}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-[1.04]"
                    />
                  )}
                </div>

                {/* Card body */}
                <div className="px-4 pb-4 pt-5 md:px-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {p.name}
                      <span className="ml-2 align-middle font-sans text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
                        {p.year}
                      </span>
                    </h3>
                    <a
                      href={p.demo ?? p.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${p.demo ? "Open live demo of" : "Open source of"} ${p.name}`}
                      className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-all duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-cyan-400/50 hover:text-cyan-300 active:scale-95 ${FOCUS_RING}`}
                    >
                      <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2" aria-label={`${p.name} tech stack`}>
                    {p.stack.map((s) => (
                      <li key={s.label} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <s.icon className="size-4 text-cyan-400/70" aria-hidden />
                        {s.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}

          {/* The full shelf — Originkit HoverImageReveal: image chases cursor
              over the project row; reveal slides in on row hover / focus.
              Wrapped in .work-shelf so keyboard focus gets a visible ring. */}
          <motion.div variants={cardVariants} className="col-span-1 sm:col-span-6 lg:col-span-12">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5">
              <div className="rounded-[calc(2rem-0.375rem)] bg-slate-950/60 px-6 py-8 md:px-10 md:py-10">
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white">
                    The full shelf
                  </h3>
                  <p className="text-sm text-slate-400">
                    Hover a row — the project follows your cursor.
                  </p>
                </div>
                {reduced ? (
                  <ul className="divide-y divide-white/10">
                    {PROJECTS.map((p) => (
                      <li key={p.slug}>
                        <a
                          href={p.demo ?? p.github}
                          target="_blank"
                          rel="noreferrer"
                          className={`group -mx-4 flex items-baseline justify-between gap-6 rounded-lg px-4 py-5 transition-colors duration-200 hover:bg-slate-800/50 ${FOCUS_RING}`}
                        >
                          <span className="font-display text-lg font-bold uppercase tracking-tight text-white transition-colors duration-200 group-hover:text-cyan-300">
                            {p.name}
                          </span>
                          <span className="flex items-center gap-3 text-sm text-slate-500 transition-colors duration-200 group-hover:text-slate-300">
                            {p.gloss}
                            <ArrowUpRight
                              className="size-4 text-cyan-400/80 transition-transform duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                              aria-hidden
                            />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="work-shelf">
                    <HoverImageReveal
                      items={revealItems}
                      align="left"
                      rowGap={26}
                      imageWidth={340}
                      imageHeight={380}
                      rounded={18}
                      offsetX={190}
                      followStrength={0}
                      backgroundColor="transparent"
                      textColor="#E2E8F0"
                      dimColor="#475569"
                      font={{
                        fontFamily: "var(--font-space-grotesk)",
                        fontSize: "clamp(1.375rem, 2vw, 1.9rem)",
                        fontWeight: "600",
                        lineHeight: "120%",
                        letterSpacing: "-0.01em",
                        textAlign: "left",
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}