"use client";

/**
 * Geek Room — Learn. Connect. Grow. Section
 * Origin story with sticky chapter rail and 3 core pillar panels.
 * Direct implementation of Section 04 from geekroom.co.in.
 */

import { useState, useEffect } from "react";
import { PILLARS_DATA } from "@/lib/data/liveSiteData";

export default function LearnConnectGrowSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const panels = document.querySelectorAll("[data-pillar-panel]");
      panels.forEach((p, idx) => {
        const rect = p.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
          setActiveStep(idx);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="story"
      className="shell grid grid-cols-[minmax(0,1fr)] gap-12 py-24 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
    >
      {/* Sticky Left Rail */}
      <div className="lg:sticky lg:top-32 lg:h-fit">
        <div>
          <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
            <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,4.5rem)]">
              Learn. Connect. <em>Grow.</em>
            </h2>
            <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
              ( 04 )
            </span>
          </div>
          <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
            What began as a WhatsApp group at MSIT is now a global builder community, where
            developers, founders and companies come to hack, ship, and meet the people building the
            industry.
          </p>
        </div>

        {/* Numbered Indicator Rail */}
        <ol className="mt-10 hidden border-t border-white/15 lg:block">
          {PILLARS_DATA.map((p, idx) => (
            <li
              key={p.number}
              className={`flex items-baseline gap-4 border-b border-white/15 py-4 transition-colors duration-300 ${
                activeStep === idx ? "text-white font-bold" : "text-[#d2d6ea] font-semibold"
              }`}
            >
              <span
                className={`font-mono text-sm tabular-nums font-black ${
                  activeStep === idx ? "text-[var(--orange)]" : "text-white/60"
                }`}
              >
                {p.number}
              </span>
              <span className="text-base font-bold">{p.title}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Right Column: 3 Pillar Panels */}
      <div className="flex flex-col gap-16">
        {PILLARS_DATA.map((p) => (
          <article
            key={p.number}
            data-pillar-panel
            className="rounded-[1.75rem] border border-white/15 bg-[#181a27] p-8 shadow-xl transition-all hover:border-[var(--orange)] hover:bg-[#1e2132] md:p-12"
          >
            <div className="flex items-center justify-between border-b border-white/15 pb-6">
              <span className="label font-mono text-base font-extrabold text-[var(--orange)]">
                Pillar {p.number}
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/90 bg-white/10 px-3 py-1 rounded-full border border-white/15">
                Geek Room Ethos
              </span>
            </div>

            <div className="mt-8">
              <h3 className="display text-2xl font-black text-white md:text-3xl">
                {p.title}
              </h3>
              <p className="mt-4 text-base font-semibold leading-relaxed text-[#f4f6fc] md:text-lg">
                {p.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
