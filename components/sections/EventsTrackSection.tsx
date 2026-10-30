"use client";

/**
 * Geek Room — Events on the Track Section
 * Pinned horizontal scroll track featuring 6 flagship editions across 4 cities.
 * Direct implementation of the live Geek Room events track (geekroom.co.in).
 */

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EVENTS_ON_THE_TRACK } from "@/lib/data/liveSiteData";
import { prefersReducedMotion } from "@/lib/animations/anime";

export default function EventsTrackSection() {
  const containerRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    if (prefersReducedMotion()) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Section total scrollable distance
      const totalScroll = rect.height - windowHeight;
      if (totalScroll <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScroll));
      setScrollProgress(progress);

      // Determine active event index
      const idx = Math.min(
        EVENTS_ON_THE_TRACK.length - 1,
        Math.floor(progress * EVENTS_ON_THE_TRACK.length)
      );
      setActiveEventIndex(idx);

      // Horizontal transform for desktop track
      if (window.innerWidth >= 768) {
        const maxTranslate = track.scrollWidth - window.innerWidth + 120;
        const translateX = -progress * maxTranslate;
        track.style.transform = `translateX(${translateX}px)`;
      } else {
        track.style.transform = "none";
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeEvent = EVENTS_ON_THE_TRACK[activeEventIndex] ?? EVENTS_ON_THE_TRACK[0];

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative overflow-x-clip pt-24 md:h-[280vh] md:pt-32"
    >
      {/* Pinned Desktop Viewport Stage */}
      <div
        ref={pinRef}
        className="md:sticky md:top-0 md:flex md:h-screen md:flex-col md:justify-center"
      >
        {/* Header Block */}
        <div className="shell flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
              <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5.5rem)]">
                Events on the <em>track</em>
              </h2>
              <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
                ( 01 )
              </span>
            </div>
            <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
              From global online hackathons and vibe-a-thons to in-person finales, meetups,
              campaigns and dedicated promotions, we handle it all. Explore our latest 6 editions
              across 4 cities.
            </p>
          </div>

          <Link
            href="/events"
            className="btn-ghost shrink-0 self-start md:self-auto"
          >
            Check Out our Events
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>

        {/* Progress Timeline Scrubber (Desktop) */}
        <div className="shell mt-8 hidden md:block">
          <div className="flex items-end justify-between gap-6">
            <p aria-live="polite" className="label tabular-nums">
              <span className="text-[var(--paper)] font-bold">
                {activeEvent.date}
              </span>{" "}
              · {activeEvent.title} ·{" "}
              <span className="text-[var(--orange)] font-bold">
                {String(activeEventIndex + 1).padStart(2, "0")}
              </span>{" "}
              / 06
            </p>
            <p className="label text-[var(--subtle)]">
              Scroll ↓ to travel
            </p>
          </div>

          <div className="relative mt-5 h-6">
            {/* Base timeline rail */}
            <span className="absolute inset-x-0 top-1/2 h-px bg-[var(--line-strong)]" />

            {/* Active event dots */}
            {EVENTS_ON_THE_TRACK.map((evt, idx) => {
              const leftPercent = (idx / (EVENTS_ON_THE_TRACK.length - 1)) * 100;
              const isPastOrActive = idx <= activeEventIndex;
              return (
                <span
                  key={evt.id}
                  className={`absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full transition-colors duration-300 ${
                    isPastOrActive ? "bg-[var(--orange)]" : "bg-[var(--line-strong)]"
                  }`}
                  style={{ left: `${leftPercent}%` }}
                />
              );
            })}

            {/* Moving Playhead */}
            <span
              className="absolute top-1/2 h-5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--paper)] shadow-[0_0_12px_var(--paper)] transition-all duration-75"
              style={{ left: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Horizontal Event Cards Track */}
        <div
          ref={trackRef}
          className="shell mt-10 flex flex-col gap-6 transition-transform duration-75 ease-out md:mt-10 md:w-max md:max-w-none md:flex-row md:gap-8 md:pr-[25vw]"
        >
          {EVENTS_ON_THE_TRACK.map((evt) => (
            <div
              key={evt.id}
              className="md:w-[min(680px,68vw)] md:shrink-0"
            >
              <div className="group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#181a27] text-white shadow-xl transition-all duration-300 hover:border-[var(--orange)] hover:bg-[#1e2132] hover:shadow-2xl md:flex-row">
                {/* Visual Left Banner (Ticket Stub with Diagonal Notch) */}
                <div
                  className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#202334] to-[#161824] p-8 md:w-[42%] md:border-r md:border-white/10"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black tracking-wider text-[var(--orange)] uppercase">
                      {evt.kind}
                    </span>
                    <span className="font-mono text-xs font-bold text-white/90">
                      {evt.number}
                    </span>
                  </div>

                  <div className="my-8">
                    <div className="font-mono text-2xl font-black text-white">
                      {evt.cityCode}
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-[#d2d6ea]">
                      {evt.date}
                    </div>
                  </div>

                  <div className="h-1.5 w-12 rounded-full bg-[var(--orange)]" />
                </div>

                {/* Right Content Body */}
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h3 className="display text-2xl font-black text-white group-hover:text-[var(--orange)] transition-colors md:text-3xl">
                      {evt.title}
                    </h3>
                    <p className="mt-3 text-sm md:text-base font-semibold leading-relaxed text-[#f4f6fc]">
                      {evt.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#d2d6ea]">
                      <span className="size-2 rounded-full bg-[var(--orange)]" />
                      <span>{evt.venue}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-white/15 pt-4">
                    <span className="font-mono text-xs font-bold text-white/80 uppercase">
                      Edition #{evt.number}
                    </span>
                    <Link
                      href={`/events#${evt.slug}`}
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-white hover:text-[var(--orange)] transition-colors"
                    >
                      View event
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
