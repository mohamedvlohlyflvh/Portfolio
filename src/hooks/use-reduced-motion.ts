"use client";

import { useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
const COARSE_QUERY = "(pointer: coarse)";

function subscribe(onStoreChange: () => void) {
  const reduced = window.matchMedia(REDUCED_QUERY);
  const coarse = window.matchMedia(COARSE_QUERY);
  const onChange = () => onStoreChange();
  reduced.addEventListener("change", onChange);
  coarse.addEventListener("change", onChange);
  return () => {
    reduced.removeEventListener("change", onChange);
    coarse.removeEventListener("change", onChange);
  };
}

function getSnapshot() {
  return (
    window.matchMedia(REDUCED_QUERY).matches ||
    window.matchMedia(COARSE_QUERY).matches
  );
}

/**
 * SSR-safe hook that returns true when hover-driven motion should be skipped:
 * prefers-reduced-motion OR any coarse pointer (touch). Backed by
 * useSyncExternalStore — no effects, no setState-in-effect, no hydration
 * flash (server snapshot is `false`, real value swaps in after hydration).
 *
 * Touch devices can't hover, so every cursor-chasing / hover-reveal /
 * hover-only interaction in the page falls back to its static variant.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
