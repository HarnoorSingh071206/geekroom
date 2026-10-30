"use client";

/**
 * Geek Room — Work With Us Section
 * Value proposition bento grid with custom icons, statistics, and partner offerings.
 * Direct implementation of Section 02 from geekroom.co.in.
 */

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WORK_OFFERINGS } from "@/lib/data/liveSiteData";

export default function WorkWithUsSection() {
  return (
    <section id="work" className="shell py-24 md:py-32">
      {/* Heading */}
      <div>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5.5rem)]">
            Work with us, <em>get seen</em>
          </h2>
          <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
            ( 02 )
          </span>
        </div>
        <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
          Put your brand in front of the world&apos;s sharpest builders, and meet your tech
          and hiring needs while you&apos;re at it.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="mt-14 grid gap-5 md:grid-cols-12 md:grid-rows-2">
        {/* Card 01: Hiring Challenges */}
        <article className="flex flex-col justify-between rounded-[1.75rem] border border-white/15 bg-[#181a27] p-8 shadow-xl transition-all hover:border-white/30 hover:bg-[#1e2132] md:col-span-7 md:p-10">
          <div className="flex items-start justify-between">
            {/* Target Crosshair SVG */}
            <svg
              aria-hidden="true"
              className="size-14 text-[var(--orange)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 64 64"
            >
              <circle cx="32" cy="32" r="26" />
              <circle cx="32" cy="32" r="14" />
              <path d="M32 2v14M32 48v14M2 32h14M48 32h14" />
            </svg>
            <span className="label tabular-nums px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-bold text-xs">01</span>
          </div>

          <div className="mt-12">
            <h3 className="display text-2xl font-black text-white md:text-3xl">
              {WORK_OFFERINGS[0].title}
            </h3>
            <p className="mt-4 max-w-[32rem] text-base md:text-lg font-semibold leading-relaxed text-[#f4f6fc]">
              {WORK_OFFERINGS[0].description}
            </p>
          </div>
        </article>

        {/* Card 02: Exclusive Hackathons (Tall Card) */}
        <article className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/15 bg-[#181a27] p-8 shadow-xl transition-all hover:border-[var(--orange)] hover:bg-[#1e2132] md:col-span-5 md:row-span-2 md:p-10">
          <div className="flex items-start justify-between">
            {/* Geek Room Logo Outline SVG */}
            <svg
              aria-hidden="true"
              className="h-16 w-auto text-[var(--paper)]"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
              viewBox="32 54 408 280"
            >
              <path d="M169 74 L52 192 L170 310 L170 255" />
              <path d="M303 74 L420 176 L303 277 L340 311" />
              <path className="text-[var(--orange)]" stroke="var(--orange)" d="M276 64 L200 320" />
            </svg>
            <span className="label tabular-nums px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-bold text-xs">02</span>
          </div>

          {/* Quick Metrics Badge Container */}
          <div className="my-10 space-y-4 rounded-xl border border-white/15 bg-[#1e2132] p-6 shadow-inner">
            <div>
              <div className="font-mono text-2xl font-black text-[var(--orange)]">
                150,000+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Community members</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-white">
                70+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Events conducted</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-black text-[var(--teal)]">
                50+
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-white/90">Companies partnered</div>
            </div>
          </div>

          <div>
            <h3 className="display text-2xl font-black text-white md:text-3xl">
              {WORK_OFFERINGS[1].title}
            </h3>
            <p className="mt-4 text-base md:text-lg font-semibold leading-relaxed text-[#f4f6fc]">
              {WORK_OFFERINGS[1].description}
            </p>
          </div>
        </article>

        {/* Card 03: Speaker Sessions */}
        <article className="flex flex-col justify-between rounded-[1.75rem] border border-white/15 bg-[#181a27] p-8 shadow-xl transition-all hover:border-[var(--teal)] hover:bg-[#1e2132] md:col-span-7 md:p-10">
          <div className="flex items-start justify-between">
            {/* Waveform / Megaphone SVG */}
            <svg
              aria-hidden="true"
              className="size-14 text-[var(--teal)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              viewBox="0 0 64 64"
            >
              <path d="M12 24h12l16-12v40L24 40H12a4 4 0 0 1-4-4V28a4 4 0 0 1 4-4z" />
              <path d="M48 22a14 14 0 0 1 0 20M54 16a22 22 0 0 1 0 32" />
            </svg>
            <span className="label tabular-nums px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-white font-bold text-xs">03</span>
          </div>

          <div className="mt-12">
            <h3 className="display text-2xl font-black text-white md:text-3xl">
              {WORK_OFFERINGS[2].title}
            </h3>
            <p className="mt-4 max-w-[32rem] text-base md:text-lg font-semibold leading-relaxed text-[#f4f6fc]">
              {WORK_OFFERINGS[2].description}
            </p>
          </div>
        </article>
      </div>

      {/* Bottom CTA bar */}
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6 rounded-[1.75rem] border border-white/20 bg-[#181a27] p-8 shadow-2xl md:p-10">
        <div>
          <div className="font-display text-xl md:text-2xl font-black uppercase text-white">
            Got a different idea?
          </div>
          <div className="text-base font-semibold text-white/90">
            Pitch your custom hackathon, hiring campaign, or roadshow to our core team.
          </div>
        </div>
        <Link href="/join" className="btn-primary">
          Pitch it to us
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </section>
  );
}
