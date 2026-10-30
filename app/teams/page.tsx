/**
 * Geek Room — Teams Page (/teams)
 *
 * Design: "Meet Your Dream Team" panel — centered serif-italic accent
 * heading inside a large rounded panel, with a 3-column grid of
 * portrait team cards (see components/features/TeamCard.tsx).
 *
 * Clicking/tapping a card opens the lead's full introduction
 * (TeamLeadDialog): bio, current focus, welcome note, social links.
 *
 * CONTENT STATUS:
 * - All lead names/photos are PLACEHOLDER — cards currently show the
 *   team name and a labeled monogram placeholder in the photo slot.
 *   When a lead's `avatarUrl` is set in lib/data/teams.ts, the real
 *   photo renders automatically.
 * - Social link buttons render only for verified links; the disabled
 *   X button is a "coming soon" placeholder.
 * See docs/CONTENT_STATUS.md for the full checklist.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import TeamCard from "@/components/features/TeamCard";
import { getActiveTeams, teams } from "@/lib/data/teams";

export const metadata: Metadata = {
  title: "Teams",
  description:
    "Meet the Geek Room teams — find the domain that matches your interests.",
};

export default function TeamsPage() {
  const activeTeams = getActiveTeams();
  const plannedTeams = teams.filter((team) => !team.active);
  const activeCount = activeTeams.length;

  return (
    <div className="section-padding relative overflow-hidden">
      {/* Ambient glow behind the panel — decorative */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 flex justify-center"
      >
        <div
          className="h-[460px] w-[860px] max-w-full rounded-full opacity-50"
          style={{
            background:
              "radial-gradient(ellipse, var(--color-gr-accent-glow) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="container-gr relative">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Home
        </Link>

        {/* Main panel */}
        <div className="rounded-3xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)] p-8 md:p-14">
          {/* Heading */}
          <ScrollReveal className="text-center">
            <h1 className="text-headline font-bold tracking-tight text-[var(--color-gr-white)]">
              Meet Your{" "}
              <span className="font-serif italic tracking-normal">
                Dream Team
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.08} className="text-center">
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-gr-subtle)]">
              {activeCount} dedicated teams, each with its own focus, lead, and
              culture — tap a team to meet its lead.
            </p>
          </ScrollReveal>

          {/* Team cards */}
          <ScrollReveal
            stagger={0.12}
            y={30}
            scale={0.97}
            className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3"
          >
            {activeTeams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </ScrollReveal>

          {/* Planned teams note */}
          {plannedTeams.length > 0 && (
            <ScrollReveal delay={0.1} className="mt-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-gr-muted)]">
                More teams on the way —{" "}
                {plannedTeams.map((team) => team.name).join(" & ")} coming soon
              </p>
            </ScrollReveal>
          )}
        </div>

        {/* Join CTA */}
        <ScrollReveal delay={0.15} className="mt-8 text-center">
          <p className="text-sm text-[var(--color-gr-subtle)]">
            Found your place?{" "}
            <Link
              href="/join"
              className="font-semibold text-[var(--color-gr-accent)] hover:underline"
            >
              Join Geek Room
            </Link>{" "}
            — open to all students, no experience required.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}