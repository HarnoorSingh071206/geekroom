"use client";

/**
 * Geek Room — Homepage Hero Section
 * Direct implementation of the live Geek Room hero experience (geekroom.co.in).
 * Features:
 * - 3D Geek Room levitating logo with interactive pointer tilt
 * - Particle cloud + spider web backdrop (weaving in on scroll past logo)
 * - Large confident display typography: "Meet the smarter community"
 * - Dual-row partner marquee ticker scrubbed smoothly
 */

import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import HeroCanvas from "@/components/sections/HeroCanvas";
import LogoScene from "@/components/sections/LogoScene";
import { HERO_PARTNERS } from "@/lib/data/liveSiteData";

const ROW_A = HERO_PARTNERS.slice(0, 7);
const ROW_B = HERO_PARTNERS.slice(7);

export default function HeroSection() {
  return (
    <section
      aria-label="Geek Room introduction"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-36"
    >
      {/* Animated backdrop: particles + webs (revealing after logo exits) */}
      <HeroCanvas />

      {/* The 3D Geek Room logo in Three.js */}
      <LogoScene />

      {/* Hero Content Shell */}
      <div className="shell relative z-10 grid min-h-[calc(100svh-14rem)] items-center gap-10 pb-12 lg:grid-cols-[1.5fr_1fr]">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-strong)] bg-[var(--ink-2)]/80 px-4 py-1.5 backdrop-blur-md">
            <span className="size-2 rounded-full bg-[var(--orange)] animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--paper)]">
              Global Builder Community
            </span>
          </div>

          {/* Heading */}
          <h1 className="display mt-6 text-[clamp(2.8rem,9vw,6.5rem)] font-black leading-[0.92] text-[var(--paper)]">
            Meet the{" "}
            <em className="font-serif italic font-extrabold text-[var(--orange)]">
              smarter
            </em>
            <br />
            community
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-[34rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
            Geek Room is a global community of 150K+ builders, where developers, founders and 80+
            partner companies hack, meet and build in public, online and in person.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="#events" className="btn-primary cursor-pointer">
              See the events
              <ArrowRight className="size-4" />
            </Link>
            <Link href="#work" className="btn-ghost cursor-pointer">
              Partner with us
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </div>

        {/* Right side spacer for 3D logo focus */}
        <div className="hidden lg:block" aria-hidden="true" />
      </div>

      {/* Dual-Row Marquee Ribbon: "Hackathons powered by" */}
      <div className="relative z-10 border-y border-[var(--line-strong)] bg-[var(--ink-2)]/80 py-6 backdrop-blur-md">
        <div className="shell mb-3">
          <span className="label text-xs font-bold text-[var(--orange)]">
            Hackathons powered by
          </span>
        </div>

        {/* Ticker Row A */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-[marquee_25s_linear_infinite] gap-8 pr-8">
            {[...ROW_A, ...ROW_A, ...ROW_A].map((name, idx) => (
              <span
                key={idx}
                className="font-mono text-sm font-bold tracking-wide text-[#e8ebf5] hover:text-[var(--paper)] transition-colors"
              >
                {name}
                <span className="ml-8 text-[var(--subtle)]/60">/</span>
              </span>
            ))}
          </div>
        </div>

        {/* Ticker Row B (Opposing direction) */}
        <div className="mt-3 flex overflow-hidden whitespace-nowrap">
          <div className="flex animate-[marquee-reverse_30s_linear_infinite] gap-8 pr-8">
            {[...ROW_B, ...ROW_B, ...ROW_B].map((name, idx) => (
              <span
                key={idx}
                className="font-mono text-sm font-bold tracking-wide text-[#e8ebf5] hover:text-[var(--orange)] transition-colors"
              >
                {name}
                <span className="ml-8 text-[var(--subtle)]/60">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
