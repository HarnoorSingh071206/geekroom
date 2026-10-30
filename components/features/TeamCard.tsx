"use client";

/**
 * Geek Room — TeamCard (portrait card, client)
 *
 * Portrait team card for /teams, styled after the "Meet Your Dream
 * Team" reference. Clicking/tapping the card (portrait or name) opens
 * the TeamLeadDialog with the lead's full introduction.
 *
 * The social buttons sit OUTSIDE the trigger buttons so they remain
 * regular links and never open the dialog.
 */

import { useCallback, useState } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { GitBranch, Globe } from "lucide-react";
import TeamLeadDialog from "@/components/features/TeamLeadDialog";
import { monogram, socialEntries, XLogo } from "@/lib/utils/team";
import type { Team } from "@/lib/types";

export default function TeamCard({ team }: { team: Team }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = useCallback(() => setDialogOpen(false), []);
  const openDialog = useCallback(() => setDialogOpen(true), []);
  const links = socialEntries(team.lead);

  const triggerClass =
    "block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[var(--color-gr-accent)] focus-visible:outline-offset-4 rounded-xl";

  return (
    <article className="group/card" id={team.id}>
      {/* Trigger 1: portrait */}
      <button
        type="button"
        onClick={openDialog}
        aria-haspopup="dialog"
        aria-expanded={dialogOpen}
        className={`${triggerClass} relative block aspect-[3/4] w-full overflow-hidden rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface-2)]`}
      >
        {team.lead?.avatarUrl ? (
          <Image
            src={team.lead.avatarUrl}
            alt={`${team.name} team lead portrait — click to view the introduction`}
            fill
            sizes="(min-width: 768px) 300px, 100vw"
            className="object-cover transition-transform duration-500 group-hover/card:scale-[1.04]"
          />
        ) : (
          /* PLACEHOLDER — replaced by lead photo once avatarUrl is set */
          <span
            aria-hidden="true"
            className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-500 group-hover/card:scale-[1.04]"
            style={{
              background: `linear-gradient(160deg, ${team.color}26 0%, transparent 55%)`,
            }}
          >
            <span
              className="font-serif text-7xl font-bold italic"
              style={{ color: team.color, opacity: 0.9 }}
            >
              {monogram(team)}
            </span>
            <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[var(--color-gr-muted)]">
              Photo coming soon
            </span>
          </span>
        )}
      </button>

      {/* Name + tagline (trigger 2) + social buttons */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <button
          type="button"
          onClick={openDialog}
          aria-haspopup="dialog"
          aria-expanded={dialogOpen}
          className="min-w-0 cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[var(--color-gr-accent)] focus-visible:outline-offset-4 rounded-lg"
        >
          <h2 className="text-lg font-semibold text-[var(--color-gr-white)] transition-colors group-hover/card:text-[var(--color-gr-accent)]">
            {team.name}
          </h2>
          <p className="mt-0.5 text-sm text-[var(--color-gr-subtle)]">
            {team.tagline}
          </p>
          <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)] transition-colors group-hover/card:text-[var(--color-gr-accent)]">
            Meet the lead <ArrowRight size={10} />
          </span>
        </button>

        <div className="flex flex-shrink-0 gap-2 pt-1">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.key}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${team.name} on ${link.label}`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--color-gr-border-2)] text-[var(--color-gr-subtle)] transition-colors hover:border-[var(--color-gr-accent)] hover:text-[var(--color-gr-accent)]"
              >
                {link.key === "twitter" ? (
                  <XLogo className="h-3.5 w-3.5" />
                ) : link.key === "github" ? (
                  <GitBranch size={14} />
                ) : (
                  <Globe size={14} />
                )}
              </a>
            ))
          ) : (
            <span
              aria-label="Social links coming soon"
              title="Social links coming soon"
              className="inline-flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full border border-[var(--color-gr-border)] text-[var(--color-gr-muted)]"
            >
              <XLogo className="h-3.5 w-3.5" />
            </span>
          )}
        </div>
      </div>

      {/* Lead introduction dialog */}
      <TeamLeadDialog
        team={team}
        open={dialogOpen}
        onClose={closeDialog}
      />
    </article>
  );
}