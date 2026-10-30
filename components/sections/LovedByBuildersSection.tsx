"use client";

/**
 * Geek Room — Loved by Builders Section
 * Testimonial quotes from industry partners, mentors, and hackers.
 * Direct implementation of Section 07 from geekroom.co.in.
 */

import { TESTIMONIALS_DATA } from "@/lib/data/liveSiteData";

export default function LovedByBuildersSection() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="shell">
        <div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
            <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5.5rem)]">
              Loved by <em>builders</em>
            </h2>
            <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
              ( 07 )
            </span>
          </div>
          <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
            Partners, mentors and hackers on what it&apos;s like to build with Geek Room.
          </p>
        </div>

        {/* Testimonials 3-Column Grid */}
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS_DATA.slice(0, 3).map((item, idx) => (
            <figure
              key={idx}
              className="relative flex flex-col justify-between gap-10 overflow-hidden rounded-[1.75rem] border border-[var(--line-strong)] bg-[var(--paper)] p-8 text-[var(--ink)] shadow-xl transition-all duration-300 hover:-translate-y-1 md:p-10"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-[var(--orange)]"
              />

              <blockquote className="font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-extrabold leading-snug">
                <span className="text-[var(--orange)] font-serif text-2xl mr-1">“</span>
                {item.quote}
                <span className="text-[var(--orange)] font-serif text-2xl ml-1">”</span>
              </blockquote>

              <figcaption className="flex items-center gap-4 border-t border-[var(--ink)]/15 pt-6">
                <div className="size-11 shrink-0 rounded-full bg-[var(--ink)] flex items-center justify-center font-bold text-white font-mono text-sm">
                  {item.author[0]}
                </div>
                <div>
                  <span className="block font-display text-base font-extrabold uppercase leading-tight">
                    {item.author}
                  </span>
                  <span className="mt-0.5 block font-mono text-xs font-semibold tracking-[0.02em] text-[var(--ink)]/80">
                    {item.role}, {item.organization}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Hacker Quotes Sub-row */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS_DATA.slice(3).map((item, idx) => (
            <figure
              key={idx}
              className="relative flex flex-col justify-between gap-6 rounded-[1.5rem] border border-white/15 bg-[#181a27] p-7 text-white shadow-lg transition-all hover:border-white/30 hover:bg-[#1e2132]"
            >
              <div className="label text-xs font-black text-[var(--orange)] uppercase tracking-wider">
                {item.tag ?? "From the hackers"}
              </div>
              <blockquote className="text-base md:text-lg font-semibold leading-relaxed text-[#f4f6fc]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="font-mono text-xs font-bold text-[#e2e5f2]">
                — {item.organization}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
