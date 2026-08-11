"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * SpotlightBackground — a soft cyan/teal radial gradient that trails the
 * cursor with a spring (OriginKit-style). Pairs with the static grid
 * overlay defined in the hero. Purely decorative → aria-hidden.
 */
export function SpotlightBackground() {
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const x = useSpring(mouseX, { stiffness: 60, damping: 18, mass: 0.6 });
  const y = useSpring(mouseY, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 hidden md:block"
    >
      {/* Trailing glow — outer element carries motion x/y, inner one centers it */}
      <motion.div style={{ x, y }} className="absolute left-0 top-0">
        <div className="size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),rgba(45,212,191,0.07)_42%,transparent_68%)] mix-blend-screen" />
      </motion.div>
    </div>
  );
}