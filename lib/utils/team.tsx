/**
 * Geek Room — Team helpers
 *
 * Shared utilities for team/lead presentation across pages.
 */

import type { Team, TeamLead } from "@/lib/types";

/** True when a string is empty or a `[Placeholder]`-style marker */
export function isPlaceholderText(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed.length === 0 || trimmed.startsWith("[");
}

/** First two letters of the team's first word — placeholder monogram */
export function monogram(team: Team): string {
  return team.name.replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase();
}

export interface SocialEntry {
  key: "twitter" | "github" | "linkedin";
  url: string;
  label: string;
}

/** Verified lead social links only — placeholders are excluded */
export function socialEntries(lead: TeamLead | null): SocialEntry[] {
  if (!lead) return [];
  const entries: Array<SocialEntry | false> = [
    lead.links.twitter
      ? { key: "twitter", url: lead.links.twitter, label: "X (Twitter)" }
      : false,
    lead.links.github
      ? { key: "github", url: lead.links.github, label: "GitHub" }
      : false,
    lead.links.linkedin
      ? { key: "linkedin", url: lead.links.linkedin, label: "LinkedIn" }
      : false,
  ];
  return entries.filter((entry): entry is SocialEntry => entry !== false);
}

/** The X (Twitter) brand glyph — lucide-react has no brand icons */
export function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}
