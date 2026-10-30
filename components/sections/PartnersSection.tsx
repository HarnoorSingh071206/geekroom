"use client";

/**
 * Geek Room — Partners Section
 * Global AI labs, fintech, and developer-tool companies that back the build.
 * Direct implementation of Section 06 from geekroom.co.in.
 */

import { HERO_PARTNERS } from "@/lib/data/liveSiteData";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function PartnersSection() {
  return (
    <section id="partners" className="shell grid grid-cols-[minmax(0,1fr)] gap-12 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      <div>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5rem)]">
            Partners who <em>back the build</em>
          </h2>
          <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
            ( 06 )
          </span>
        </div>
        <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
          Global AI labs, fintech and developer-tool companies that power Geek Room hackathons and
          meetups.
        </p>

        <div className="mt-8">
          <Link href="/join" className="btn-ghost">
            Your logo here
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Partners Brand Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {HERO_PARTNERS.map((partner, idx) => (
          <div
            key={idx}
            className="flex h-24 items-center justify-center rounded-2xl border border-white/15 bg-[#181a27] p-4 text-center shadow-lg shadow-black/40 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--orange)] hover:bg-[#202334]"
          >
            <span className="font-sans text-base font-black tracking-tight text-white md:text-lg">
              {partner}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
