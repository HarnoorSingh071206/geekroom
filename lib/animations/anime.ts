/**
 * Geek Room — anime.js client helpers
 *
 * anime.js v4 is the animation engine for homepage hero and scroll
 * effects (see docs/DECISIONS.md, Decision 009). These helpers keep
 * behavior consistent across components.
 */

/** Returns true when the user prefers reduced motion (browser only). */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Shared anime.js easing vocabulary — the animejs.com signature feel. */
export const EASE = {
  /** Fast-in, slow-out expo — the classic anime.js entrance ease */
  out: "outExpo",
  /** Deeper deceleration for large movements */
  outQuint: "outQuint",
  /** Gentle sine in-out for ambient loops */
  inOut: "inOutSine",
  /** Linear — required for scroll-synced (scrubbed) tweens */
  linear: "linear",
} as const;
