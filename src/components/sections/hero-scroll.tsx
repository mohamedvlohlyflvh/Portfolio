"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import ZoomTextTunnel from "@/components/originkit/ui/infinite-text-passage";

const HERO_TEXTS = ["Welcome to", "My world", "HYMERIOUS"];

export function HeroScroll() {
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const section = sectionRef.current;
    if (!section) return;

    let isCancelled = false;
    let ctx: ReturnType<typeof import("gsap").gsap.context> | null = null;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (isCancelled) return;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=220%",
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (!isCancelled) {
              setScrollProgress(self.progress);
            }
          },
        });
      }, section);

      ScrollTrigger.refresh();
    };

    init();

    return () => {
      isCancelled = true;
      ctx?.revert();
    };
  }, [reduced]);

  if (reduced) {
    return (
      <section
        id="hero-scroll"
        className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-slate-950 px-4"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-transparent to-transparent"
        />
        <h1
          className="relative font-display text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase leading-none tracking-tight text-white text-center"
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
    >
      {/* Background Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* Radial Cyan Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/20 via-transparent to-transparent"
      />

      {/* Originkit Infinite Text Passage Component */}
      <div className="relative z-10 h-full w-full max-w-7xl px-4">
        <ZoomTextTunnel
          texts={HERO_TEXTS}
          suffixes={[null, null, <span key="dot" style={{ color: "#22d3ee" }}>.</span>]}
          scrollTriggered={true}
          progress={scrollProgress}
          maxScale={30}
          color="#FFFFFF"
          font={{
            fontFamily: "var(--font-display), system-ui, sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 10vw, 8.5rem)",
            lineHeight: "1.05",
            letterSpacing: "-0.02em",
            textTransform: "uppercase",
            textAlign: "center",
          }}
        />
      </div>

      {/* Scroll Cue Indicator */}
      <div
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium uppercase tracking-[0.3em] text-slate-500 transition-opacity duration-300 z-20"
        style={{ opacity: scrollProgress > 0.85 ? 0 : 0.7 }}
      >
        Scroll to explore
      </div>
    </section>
  );
}