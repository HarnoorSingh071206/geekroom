"use client";

/**
 * Geek Room — Voices on Stage Section
 * Speakers, founders, and industry mentors showcase grid.
 * Direct implementation of Section 05 from geekroom.co.in.
 */

import { SPEAKERS_DATA } from "@/lib/data/liveSiteData";

export default function VoicesSection() {
  return (
    <section id="voices" className="shell py-24 md:py-32">
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
        <div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
            <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5.5rem)]">
              Voices on <em>stage</em>
            </h2>
            <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
              ( 05 )
            </span>
          </div>
          <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
            Engineers, founders and data scientists who&apos;ve given talks and mentored at Geek
            Room. 35+ so far.
          </p>
        </div>
      </div>

      {/* Speaker Cards Grid */}
      <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
        {SPEAKERS_DATA.map((speaker, idx) => (
          <div
            key={idx}
            className="group relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/15 bg-[#181a27] p-6 shadow-xl transition-all duration-300 hover:border-[var(--orange)] hover:-translate-y-1 hover:bg-[#1e2132]"
          >
            {/* Portrait placeholder with initial avatar */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[#2a2d3d] to-[#161720] flex items-center justify-center border border-white/10">
              <span className="font-display text-4xl font-black text-white/90 transition-transform duration-500 group-hover:scale-110 group-hover:text-[var(--orange)]">
                {speaker.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-[#181a27] via-transparent to-transparent opacity-80" />
            </div>

            <div className="mt-5">
              <h3 className="font-display text-lg font-black text-white transition-colors group-hover:text-[var(--orange)]">
                {speaker.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-[#d2d6ea]">
                {speaker.role}
              </p>
              <div className="mt-1.5 font-mono text-xs font-black text-[var(--teal)]">
                {speaker.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
