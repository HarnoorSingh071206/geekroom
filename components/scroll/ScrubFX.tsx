"use client";

/**
 * Geek Room — ScrubFX
 *
 * Scroll-synced (scrubbed) animation wrapper powered by anime.js
 * ScrollObserver. The wrapper's transform/opacity is driven directly by
 * the scroll position across its parent <section>: progress 0 when the
 * section's top enters the viewport, progress 1 when its bottom leaves.
 *
 * This is the animejs.com pattern — elements keep moving (parallax,
 * drift, rotation) for as long as the section is being scrolled.
 *
 * Use for decorative elements (ghost chapter numbers, hero exit) —
 * do NOT wrap elements that are also animated by ScrollReveal, as both
 * write to `y`/`opacity`.
 *
 * Reduced motion: static render at the mid-state.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { animate, onScroll, utils } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";

export interface ScrubFXProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** [start, end] translateY in px across the section's scroll range */
  y?: [number, number];
  /** [start, end] rotation in degrees */
  rotate?: [number, number];
  /** [start, end] opacity */
  opacity?: [number, number];
  /** Sync smoothing: 1 = exact, <1 = lerped (default 0.8 — buttery) */
  smooth?: number;
}

export default function ScrubFX({
  children,
  className,
  style,
  y = [0, 0],
  rotate = [0, 0],
  opacity = [1, 1],
  smooth = 0.8,
}: ScrubFXProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const section = el.closest("section") ?? el;
    const staticState: Record<string, number> = {};
    if (y[0] !== 0) staticState.y = (y[0] + y[1]) / 2;
    if (rotate[0] !== 0) staticState.rotate = (rotate[0] + rotate[1]) / 2;
    if (opacity[0] !== 1 || opacity[1] !== 1)
      staticState.opacity = (opacity[0] + opacity[1]) / 2;
    if (Object.keys(staticState).length > 0)
      utils.set(el, staticState as never);

    const observer = onScroll({
      target: section,
      sync: smooth,
      enter: "bottom start",
      leave: "top end",
    });

    const animation = animate(el, {
      y: [y[0], y[1]],
      rotate: [rotate[0], rotate[1]],
      opacity: [opacity[0], opacity[1]],
      ease: "linear",
      autoplay: observer,
    });

    return () => {
      animation.revert();
      observer.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}