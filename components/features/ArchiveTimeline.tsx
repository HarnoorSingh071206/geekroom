"use client";

/**
 * Geek Room — Archive Timeline
 *
 * Scroll-choreographed history timeline, modeled on the anime.js
 * onScroll chapter pattern:
 *
 * - A STICKY chapter counter (big serif-italic number + period label)
 *   that advances via `onEnterForward` and steps back via
 *   `onLeaveBackward` as each era enters/leaves the viewport —
 *   textContent updates directly, no re-render
 * - Each era's content reveals on enter (opacity + rise, outExpo)
 *   and hides again when scrolled back above the viewport, so the
 *   story replays in both directions
 * - A scroll-synced progress spine (`onScroll({ sync: true })`)
 *   fills along the timeline as you scroll
 *
 * Reduced motion: everything renders static and visible.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import { animate, onScroll, utils } from "animejs";
import { ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations/anime";
import type { StoryMilestone } from "@/lib/types";

export interface ArchiveTimelineProps {
  milestones: StoryMilestone[];
}

export default function ArchiveTimeline({
  milestones,
}: ArchiveTimelineProps) {
  const listRef = useRef<HTMLOListElement>(null);
  const counterNumberRef = useRef<HTMLSpanElement>(null);
  const counterPeriodRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const numberEl = counterNumberRef.current;
    const periodEl = counterPeriodRef.current;
    const progress = progressRef.current;
    if (!list || !numberEl || !periodEl || !progress) return;

    // Reduced motion: static page, counter stays on chapter 01
    if (prefersReducedMotion()) return;

    const cleanups: Array<() => void> = [];
    const entries = Array.from(
      list.querySelectorAll<HTMLElement>("[data-archive-entry]")
    );

    entries.forEach((entry, index) => {
      const content = entry.querySelector<HTMLElement>(
        "[data-archive-content]"
      );
      if (!content) return;

      utils.set(content, { opacity: 0, y: 48 });

      const show = () => {
        animate(content, {
          opacity: 1,
          y: 0,
          duration: 900,
          ease: "outExpo",
        });
        // Sticky chapter counter — direct textContent update
        numberEl.textContent = String(index + 1).padStart(2, "0");
        periodEl.textContent = milestones[index]?.period ?? "";
      };
      const hide = () => {
        utils.set(content, { opacity: 0, y: 48 });
        if (index > 0) {
          numberEl.textContent = String(index).padStart(2, "0");
          periodEl.textContent = milestones[index - 1]?.period ?? "";
        }
      };

      // Same threshold pattern as the anime.js onScroll demo:
      // enter when the era's top reaches 100px above the viewport
      // bottom; leave once its bottom passes 120px below the top.
      const observer = onScroll({
        target: entry,
        enter: "bottom-=100 top",
        leave: "top+=120 bottom",
        onEnterForward: show,
        onLeaveBackward: hide,
      });
      cleanups.push(() => observer.revert());
    });

    // Scroll-synced progress spine
    const progressObserver = onScroll({ target: list, sync: true });
    const progressAnim = animate(progress, {
      scaleX: [0, 1],
      ease: "linear",
      autoplay: progressObserver,
    });
    cleanups.push(() => {
      progressAnim.revert();
      progressObserver.revert();
    });

    return () => cleanups.forEach((fn) => fn());
  }, [milestones]);

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr] lg:gap-20">
      {/* Sticky chapter counter */}
      <div className="h-fit lg:sticky lg:top-32">
        <p className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)]">
          Chapter
        </p>
        <p
          aria-hidden="true"
          className="font-serif text-7xl font-bold italic leading-none text-[var(--color-gr-accent)] lg:text-8xl"
        >
          <span ref={counterNumberRef}>01</span>
        </p>
        <p className="mt-4 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-px w-8 bg-[var(--color-gr-accent)]"
          />
          <span
            ref={counterPeriodRef}
            className="font-mono text-xs uppercase tracking-widest text-[var(--color-gr-subtle)]"
          >
            {milestones[0]?.period ?? ""}
          </span>
        </p>

        {/* Scroll-synced progress spine */}
        <div
          aria-hidden="true"
          className="mt-10 h-[2px] w-full bg-[var(--color-gr-border)]"
        >
          <div
            ref={progressRef}
            className="h-full w-full origin-left bg-[var(--color-gr-accent)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-[var(--color-gr-muted)]">
          {milestones.length} chapters
        </p>
      </div>

      {/* Era entries */}
      <ol
        ref={listRef}
        className="relative space-y-[14vh] border-l border-[var(--color-gr-border)] pl-10 md:pl-14"
      >
        {milestones.map((milestone, index) => (
          <li
            key={`${milestone.period}-${index}`}
            data-archive-entry
            className="relative"
          >
            {/* Timeline node */}
            <span
              aria-hidden="true"
              className="absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full border-2 border-[var(--color-gr-accent)] bg-[var(--color-gr-black)] md:-left-[2.85rem]"
            />
            <div data-archive-content className="max-w-xl">
              <p className="mb-3 inline-block rounded-full border border-[var(--color-gr-accent)]/25 bg-[var(--color-gr-accent)]/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-accent)]">
                {milestone.period}
              </p>
              <h2 className="text-title font-semibold text-[var(--color-gr-white)]">
                {milestone.title}
              </h2>
              <p className="mt-3 leading-relaxed text-[var(--color-gr-subtle)]">
                {milestone.description}
              </p>
              <p
                aria-hidden="true"
                className="mt-6 font-mono text-[10px] uppercase tracking-widest text-[var(--color-gr-muted)]"
              >
                Chapter {String(index + 1).padStart(2, "0")} /{" "}
                {String(milestones.length).padStart(2, "0")}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Closing note */}
      <div className="lg:col-start-2">
        <div className="rounded-xl border border-dashed border-[var(--color-gr-border)] p-8 text-center">
          <p className="text-sm text-[var(--color-gr-subtle)]">
            The next chapter is unwritten — it gets written by the people who
            show up.
          </p>
          <Link
            href="/join"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-gr-accent)] hover:underline"
          >
            Be part of the next chapter <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}