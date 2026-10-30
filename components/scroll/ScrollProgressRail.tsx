"use client";

/**
 * Geek Room — ScrollProgressRail
 *
 * Replica of the animejs.com scroll navigation pattern:
 * - A thin top progress bar scrubbed to document scroll (all sizes)
 * - A vertical progress rail with a glowing cursor + chapter dots
 *   (desktop only). The dot for the section currently under the
 *   viewport's midline is highlighted; clicking a dot scrolls to it.
 *
 * Scrubbing uses anime.js `onScroll({ sync: true })` — the cursor and
 * bar are directly bound to scroll position, zero easing lag.
 */

import { useEffect, useRef, useState } from "react";
import { animate, onScroll } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";

const CHAPTERS = [
  { id: "story", label: "Story" },
  { id: "teams", label: "Teams" },
  { id: "events", label: "Events" },
  { id: "join", label: "Join" },
] as const;

export default function ScrollProgressRail() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const topBar = topBarRef.current;
    const cursor = cursorRef.current;
    if (!topBar || !cursor) return;

    const cleanups: Array<() => void> = [];

    if (!prefersReducedMotion()) {
      const topObserver = onScroll({ sync: true });
      const topAnim = animate(topBar, {
        scaleX: [0, 1],
        ease: "linear",
        autoplay: topObserver,
      });
      cleanups.push(() => {
        topAnim.revert();
        topObserver.revert();
      });

      const railObserver = onScroll({ sync: true });
      const railAnim = animate(cursor, {
        top: ["0%", "100%"],
        ease: "linear",
        autoplay: railObserver,
      });
      cleanups.push(() => {
        railAnim.revert();
        railObserver.revert();
      });
    }

    // Chapter spy — the section under the viewport's midline is active.
    let raf = 0;
    const spy = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const mid = window.innerHeight * 0.5;
        let current = "";
        for (const chapter of CHAPTERS) {
          const el = document.getElementById(chapter.id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= mid && rect.bottom >= mid) {
            current = chapter.id;
            break;
          }
          if (rect.top < mid) current = chapter.id;
        }
        setActive((prev) => (prev === current ? prev : current));
      });
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    window.addEventListener("resize", spy);
    cleanups.push(() => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", spy);
      window.removeEventListener("resize", spy);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      {/* Top progress bar — all sizes */}
      <div
        ref={topBarRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left bg-[var(--color-gr-accent)] opacity-80"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Vertical rail + chapter dots — desktop only */}
      <nav
        aria-label="Page sections"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 lg:flex"
      >
        <div className="relative h-36 w-px bg-[var(--color-gr-border)]">
          <div
            ref={cursorRef}
            aria-hidden="true"
            className="absolute left-1/2 h-4 w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gr-accent)] shadow-accent"
            style={{ top: "0%" }}
          />
        </div>
        <ul className="flex flex-col items-center gap-3">
          {CHAPTERS.map((chapter) => {
            const isActive = active === chapter.id;
            return (
              <li key={chapter.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(chapter.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-colors ${
                    isActive
                      ? "border-[var(--color-gr-accent)] bg-[var(--color-gr-accent)]"
                      : "border-[var(--color-gr-border-2)] bg-transparent hover:border-[var(--color-gr-accent)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-5 translate-x-1 whitespace-nowrap rounded border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)] px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-[var(--color-gr-subtle)] opacity-0 transition-all group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    {chapter.label}
                  </span>
                  <span className="sr-only">{chapter.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}