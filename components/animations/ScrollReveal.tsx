"use client";

/**
 * Geek Room — ScrollReveal
 *
 * Enter-triggered reveal wrapper powered by anime.js. Content starts
 * hidden (set only after hydration, so no-JS visitors still see it),
 * then animates in the first time it enters the viewport.
 *
 * When `stagger` is provided, the wrapper's DIRECT CHILDREN are
 * animated individually with that delay between each — otherwise the
 * wrapper itself animates as one unit.
 *
 * Reduced motion: no hiding, no animation — content renders static.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { animate, stagger, utils } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";

export interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds between direct children when staggering (e.g. 0.1) */
  stagger?: number;
  /** Seconds before the (first) animation starts */
  delay?: number;
  /** Initial translateY offset in px */
  y?: number;
  /** Initial translateX offset in px */
  x?: number;
  /** Initial scale */
  scale?: number;
  /** Initial rotation in degrees */
  rotate?: number;
  /** Animation duration in ms */
  duration?: number;
  /** anime.js easing name */
  ease?: string;
  /** Viewport visibility ratio required before triggering */
  threshold?: number;
}

export default function ScrollReveal({
  children,
  className,
  style,
  stagger: staggerDelay,
  delay = 0,
  y = 28,
  x = 0,
  scale = 1,
  rotate = 0,
  duration = 850,
  ease = "outExpo",
  threshold = 0.08,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const targets: Element[] = staggerDelay ? Array.from(el.children) : [el];
    if (targets.length === 0) return;

    const hidden: Record<string, number> = { opacity: 0 };
    if (y !== 0) hidden.y = y;
    if (x !== 0) hidden.x = x;
    if (scale !== 1) hidden.scale = scale;
    if (rotate !== 0) hidden.rotate = rotate;
    utils.set(targets, hidden as never);

    const shown: Record<string, number> = { opacity: 1 };
    if (y !== 0) shown.y = 0;
    if (x !== 0) shown.x = 0;
    if (scale !== 1) shown.scale = 1;
    if (rotate !== 0) shown.rotate = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.disconnect();
          animate(targets, {
            ...shown,
            duration,
            delay: staggerDelay
              ? stagger(staggerDelay * 1000, { start: delay * 1000 })
              : delay * 1000,
            ease,
          });
          break;
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(el);

    return () => observer.disconnect();
    // Props are set once per usage site; re-running would re-hide content.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}