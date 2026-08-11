/**
 * Central motion tokens — every animation in the app imports from here.
 * No inline durations / easings / springs anywhere else.
 */

export const springs = {
  /** Buttons, badges, small pops */
  snappy: { type: "spring", stiffness: 520, damping: 34, mass: 0.7 },
  /** Cards, list items */
  gentle: { type: "spring", stiffness: 260, damping: 26 },
  /** Magnetic / trailing elements */
  trail: { type: "spring", stiffness: 160, damping: 16 },
} as const;

export const motionTokens = {
  duration: {
    fast: 0.2,
    normal: 0.35,
    slow: 0.6,
  },
  ease: {
    smooth: [0.22, 1, 0.36, 1] as const,
    out: [0.16, 1, 0.3, 1] as const,
  },
  distance: {
    sm: 8,
    md: 16,
    lg: 32,
  },
  stagger: {
    tight: 0.05,
    normal: 0.08,
    loose: 0.1,
  },
} as const;

/** Unified entrance container — no stagger; everything snaps at 0.5s. */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0,
      delayChildren: 0.5,
    },
  },
} as const;

/** Fast hard snap — short rise, crisp ease-out. */
export const fadeUpItem = {
  hidden: { opacity: 0, y: motionTokens.distance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionTokens.duration.fast, ease: motionTokens.ease.out },
  },
} as const;