"use client";

/**
 * Geek Room — Hero Canvas
 *
 * Thin React wrapper around the canvas crystal engine
 * (lib/animations/orbEngine.ts). Renders the animated faceted lime
 * crystal + orbiting particle cloud.
 *
 * The canvas is FIXED to the viewport (animejs.com "fixed-section"
 * pattern) and never clipped by the hero section:
 *
 * Scroll sequence (scrubbed by an anime.js ScrollObserver):
 * 1. Crystal expands until it covers the screen; particles scatter
 *    to the corners
 * 2. The screen goes slightly dull, sinks to near-black, and an
 *    asymmetric green spider web weaves itself in — random strands
 *    glow at random times
 * 3. The web REMAINS as the fixed backdrop for the entire page —
 *    it never fades away
 *
 * Fully decorative: aria-hidden, no pointer events.
 */

import { useEffect, useRef } from "react";
import { onScroll } from "animejs";
import { createOrbEngine } from "@/lib/animations/orbEngine";
import { prefersReducedMotion } from "@/lib/animations/anime";

export default function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const engine = createOrbEngine(canvas);

    let observer: ReturnType<typeof onScroll> | null = null;
    if (!prefersReducedMotion()) {
      observer = onScroll({
        target: canvas.closest("section") ?? canvas,
        sync: true,
        enter: "top start",
        leave: "top end",
        onUpdate: (self) => {
          engine.setProgress(self.progress);
          // Smoothly fade hero canvas as the hero section exits so it never overshadows content sections
          const opacity = Math.max(0, 1 - self.progress * 1.5);
          canvas.style.opacity = String(opacity);
          canvas.style.visibility = opacity <= 0.01 ? "hidden" : "visible";
        },
      });
    }

    return () => {
      observer?.revert();
      engine.destroy();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen transition-opacity duration-300"
    />
  );
}