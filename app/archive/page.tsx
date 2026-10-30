/**
 * Geek Room — Archive Page (/archive)
 *
 * The society's history as a scroll-choreographed timeline: a sticky
 * chapter counter advances as each era enters the viewport (anime.js
 * onScroll enter/leave callbacks), with a scroll-synced progress
 * spine — see components/features/ArchiveTimeline.tsx.
 *
 * CONTENT STATUS: All timeline facts are PLACEHOLDER — sourced from
 * lib/data/society.ts and must be confirmed with the society before
 * launch. See docs/CONTENT_STATUS.md.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ArchiveTimeline from "@/components/features/ArchiveTimeline";
import { getSocietyStory } from "@/lib/data/society";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "The history of Geek Room — chapter by chapter, from founding to today.",
};

export default function ArchivePage() {
  const story = getSocietyStory();

  return (
    <div className="section-padding relative">
      <div className="container-gr">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--color-gr-subtle)] transition-colors hover:text-[var(--color-gr-accent)]"
        >
          <ArrowLeft size={14} /> Home
        </Link>

        {/* Header */}
        <ScrollReveal className="max-w-2xl">
          <p className="mb-2 text-xs font-mono font-semibold uppercase tracking-widest text-[var(--color-gr-accent)]">
            The Archive
          </p>
          <h1 className="text-headline font-bold tracking-tight text-[var(--color-gr-white)]">
            A history written in{" "}
            <span className="font-serif italic">code</span>.
          </h1>
          <p className="mt-4 leading-relaxed text-[var(--color-gr-subtle)]">
            The timeline of Geek Room — where we came from, what we built
            along the way, and what&apos;s being written next. Scroll through
            the chapters.
          </p>
        </ScrollReveal>

        {/* Scroll-choreographed timeline */}
        <div className="mt-16 md:mt-24">
          <ArchiveTimeline milestones={story.milestones} />
        </div>
      </div>
    </div>
  );
}