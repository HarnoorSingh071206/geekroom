"use client";

/**
 * Geek Room — Numbers That Compound Section
 * Measurable growth metrics with logarithmic progress bars.
 * Direct implementation of Section 03 from geekroom.co.in.
 */

import { STATS_METRICS } from "@/lib/data/liveSiteData";

export default function NumbersSection() {
  return (
    <section id="numbers" className="shell py-24 md:py-32">
      {/* Heading */}
      <div>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5.5rem)]">
            Numbers that <em>compound</em>
          </h2>
          <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
            ( 03 )
          </span>
        </div>
        <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
          Three years of events, measured. Bars use a log scale so every figure stays readable.
        </p>
      </div>

      {/* Metrics List with Logarithmic Bars */}
      <div className="mt-14 rounded-[2rem] border border-white/15 bg-[#181a27]/90 p-6 md:p-10 shadow-2xl backdrop-blur-md">
        <dl className="divide-y divide-white/15">
          {STATS_METRICS.map((stat, idx) => (
            <div
              key={idx}
              className="grid gap-4 py-8 first:pt-2 last:pb-2 transition-colors duration-200 hover:bg-white/[0.03] md:grid-cols-[minmax(0,24rem)_1fr] md:items-center md:gap-12 md:py-10"
            >
              <div>
                <dd className="display text-[clamp(2.8rem,6vw,5.2rem)] font-black tabular-nums text-white">
                  <span>{stat.number}</span>
                  <span className="text-[var(--orange)]">{stat.suffix}</span>
                </dd>
                <dt className="mt-2 text-base md:text-lg font-bold text-white">
                  {stat.label}
                </dt>
              </div>

              <div className="relative h-4 overflow-hidden rounded-full bg-white/10 border border-white/10 md:h-5">
                <span
                  className="absolute inset-y-0 left-0 rounded-full bg-[var(--orange)] shadow-[0_0_16px_rgba(255,90,31,0.6)] transition-all duration-1000 ease-out"
                  style={{ width: `${stat.barWidthPercent}%` }}
                />
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
