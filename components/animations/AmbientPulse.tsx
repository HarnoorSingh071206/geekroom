"use client";

/**
 * Geek Room — AmbientPulse
 *
 * Slow, continuous looping pulse (scale + opacity) powered by anime.js.
 * Used for decorative glow layers (e.g. the Join CTA radial glow).
 *
 * Reduced motion: static render.
 */

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { animate } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";

export interface AmbientPulseProps
  extends React.ComponentPropsWithoutRef<"div"> {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Peak scale of the pulse */
  scale?: number;
  /** Peak opacity of the pulse */
  peakOpacity?: number;
  /** Base (resting) opacity */
  baseOpacity?: number;
  /** Full pulse cycle in ms */
  duration?: number;
}

export default function AmbientPulse({
  children,
  className,
  style,
  scale = 1.12,
  peakOpacity = 1,
  baseOpacity = 0.6,
  duration = 3800,
  ...rest
}: AmbientPulseProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    const animation = animate(el, {
      scale: [1, scale, 1],
      opacity: [baseOpacity, peakOpacity, baseOpacity],
      duration,
      ease: "inOutSine",
      loop: true,
    });

    return () => {
      animation.revert();
    };
  }, [scale, peakOpacity, baseOpacity, duration]);

  return (
    <div ref={ref} className={className} style={style} {...rest}>
      {children}
    </div>
  );
}