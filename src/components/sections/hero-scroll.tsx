"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * HeroScroll — immersive full-screen pinned scroll section.
 *
 * Displays "HYMERIOUS" with GSAP ScrollTrigger-driven animations:
 * - 0–20%: entrance (blur → crisp, opacity 0→1, letter-spacing tightens)
 * - 20–80%: scale 1→1.35, rotateX 0→15deg, cyan glow intensifies
 * - 80–100%: scale 1.8, opacity 0, blur 16px → seamless exit into page
 *
 * Reduced-motion: renders a static, beautifully styled H1 (no GSAP).
 */
export function HeroScroll() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Split text into per-character spans for staggered animation
      const chars = "HYMERIOUS".split("");
      text.innerHTML = chars
        .map(
          (char) =>
            `<span class="hero-char" style="display:inline-block;will-change:transform,filter,opacity;transform-origin:center bottom">${char}</span>`
        )
        .join("");

      const charEls = text.querySelectorAll<HTMLElement>(".hero-char");

      ctx = gsap.context(() => {
        // Entrance timeline (0–20% scroll)
        const entranceTL = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "20% top",
            scrub: 0.5,
            pin: false,
          },
        });

        entranceTL.from(charEls, {
          opacity: 0,
          filter: "blur(20px)",
          letterSpacing: "0.5em",
          y: 40,
          stagger: 0.03,
          duration: 1,
          ease: "power2.out",
        });

        // Progression (20–80% scroll) — scale, rotate, glow
        const progressionTL = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "20% top",
            end: "80% top",
            scrub: 0.5,
            pin: false,
          },
        });

        progressionTL.to(text, {
          scale: 1.35,
          rotateX: 15,
          filter: "drop-shadow(0 0 35px rgba(34,211,238,0.4))",
          duration: 1,
          ease: "none",
        });

        // Exit (80–100% scroll) — scale up, fade out, blur
        const exitTL = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "80% top",
            end: "100% top",
            scrub: 0.5,
            pin: false,
          },
        });

        exitTL.to(text, {
          scale: 1.8,
          opacity: 0,
          filter: "blur(16px)",
          duration: 1,
          ease: "power2.in",
        });

        // Pin the section during scroll
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "100% top",
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        });
      }, section);
    };

    init();

    return () => {
      ctx?.revert();
    };
  }, [reduced]);

  // Static fallback for reduced motion
  if (reduced) {
    return (
      <section
        id="hero-scroll"
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950"
      >
        {/* Radial glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent"
        />
        <h1
          className="relative font-display text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-none tracking-tighter text-white"
          style={{ textShadow: "0 0 40px rgba(34,211,238,0.3)" }}
        >
          HYMERIOUS
        </h1>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="hero-scroll"
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950"
      style={{ perspective: "1000px" }}
    >
      {/* Noise texture overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Radial cyan glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent"
      />

      {/* Text */}
      <div
        ref={textRef}
        className="relative font-display text-[clamp(3rem,12vw,10rem)] font-bold uppercase leading-none tracking-tighter text-white"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, filter, opacity",
        }}
      >
        HYMERIOUS
      </div>
    </section>
  );
}
