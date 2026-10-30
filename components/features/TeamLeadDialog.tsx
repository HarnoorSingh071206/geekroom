"use client";

/**
 * Geek Room — TeamLeadDialog
 *
 * Modal overlay showing a team lead's full introduction: name, role,
 * bio, current focus, welcome note, and verified social links.
 * Opens when a team card is clicked/tapped.
 *
 * - anime.js entrance/exit timeline (overlay fade + panel rise/scale)
 * - role="dialog" + aria-modal, focus trapped inside, Esc to close,
 *   focus restored to the trigger on close, body scroll locked
 * - Reduced motion: instant show/hide, no animation
 * - Placeholder bio/focus text is never displayed — an honest
 *   "coming soon" message is shown instead (no fabricated content)
 */

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { GitBranch, Globe, X } from "lucide-react";
import { createTimeline } from "animejs";
import { prefersReducedMotion } from "@/lib/animations/anime";
import {
  isPlaceholderText,
  monogram,
  socialEntries,
  XLogo,
} from "@/lib/utils/team";
import type { Team } from "@/lib/types";

export interface TeamLeadDialogProps {
  team: Team;
  open: boolean;
  onClose: () => void;
}

interface DialogState {
  /** Dialog is mounted and shown (or playing its exit animation) */
  visible: boolean;
  /** Exit animation in progress */
  exiting: boolean;
  prevOpen: boolean;
}

export default function TeamLeadDialog({
  team,
  open,
  onClose,
}: TeamLeadDialogProps) {
  // Prop-derived state, adjusted during render (React 19 pattern —
  // same approach as Navigation.tsx; avoids sync setState in effects)
  const [dialogState, setDialogState] = useState<DialogState>({
    visible: open,
    exiting: false,
    prevOpen: open,
  });
  if (dialogState.prevOpen !== open) {
    setDialogState({
      prevOpen: open,
      visible: open || dialogState.visible,
      exiting: !open && dialogState.visible,
    });
  }
  const { visible, exiting } = dialogState;

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  const titleId = useId();
  const lead = team.lead;

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Exit animation — runs when `exiting` flips true; anime.js
  // onComplete (an external callback) then unmounts the dialog
  useEffect(() => {
    if (!exiting) return;
    if (prefersReducedMotion()) return; // render short-circuits below
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) {
      const fallback = setTimeout(() => {
        setDialogState((s) => ({ ...s, visible: false, exiting: false }));
      }, 0);
      return () => clearTimeout(fallback);
    }
    const tl = createTimeline({
      defaults: { ease: "inOutQuad" },
      onComplete: () => {
        if (!openRef.current) {
          setDialogState((s) => ({ ...s, visible: false, exiting: false }));
        }
      },
    });
    tl.add(panel, {
      opacity: [1, 0],
      y: [0, 20],
      scale: [1, 0.97],
      duration: 220,
    }).add(overlay, { opacity: [1, 0], duration: 200 }, "-=120");
    return () => tl.revert();
  }, [exiting]);

  // While visible (and not exiting): entrance animation, focus
  // management, Esc-to-close, body scroll lock, focus trap
  useEffect(() => {
    if (!visible || exiting) return;

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const reduced = prefersReducedMotion();

    if (!reduced) {
      const overlay = overlayRef.current;
      const panel = panelRef.current;
      if (overlay && panel) {
        const tl = createTimeline({ defaults: { ease: "outExpo" } });
        tl.add(overlay, { opacity: [0, 1], duration: 250 }).add(
          panel,
          {
            opacity: [0, 1],
            y: [36, 0],
            scale: [0.96, 1],
            duration: 500,
          },
          "-=100"
        );
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const dialog = panelRef.current;
      if (!dialog) return;
      const focusables = dialog.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [visible, exiting, onClose]);

  const requestClose = useCallback(() => onClose(), [onClose]);

  // Reduced motion: no exit animation — hide immediately
  if (!visible || (exiting && prefersReducedMotion())) return null;

  const leadName =
    lead && !isPlaceholderText(lead.name)
      ? lead.name
      : "Team Lead — to be announced";
  const hasBio = lead ? !isPlaceholderText(lead.bio) : false;
  const hasFocus = lead ? !isPlaceholderText(lead.focus) : false;
  const hasWelcome = lead ? !isPlaceholderText(lead.welcomeNote) : false;
  const links = socialEntries(lead);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        ref={overlayRef}
        onClick={requestClose}
        aria-hidden="true"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        style={{ opacity: prefersReducedMotion() ? 1 : 0 }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)] p-6 md:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={requestClose}
          aria-label="Close lead introduction"
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-gr-border-2)] text-[var(--color-gr-subtle)] transition-colors hover:border-[var(--color-gr-accent)] hover:text-[var(--color-gr-accent)]"
        >
          <X size={16} />
        </button>

        {/* Header: portrait + name/role */}
        <div className="flex items-center gap-5 pr-10">
          <div
            className="relative h-24 w-20 flex-shrink-0 overflow-hidden rounded-lg border border-[var(--color-gr-border)]"
            style={
              lead?.avatarUrl
                ? undefined
                : { background: `linear-gradient(160deg, ${team.color}26 0%, transparent 60%)` }
            }
          >
            {lead?.avatarUrl ? (
              <Image
                src={lead.avatarUrl}
                alt={`${leadName} portrait`}
                fill
                sizes="96px"
                className="object-cover"
              />
            ) : (
              <span
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-bold italic"
                style={{ color: team.color }}
              >
                {monogram(team)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <p
              className="mb-1.5 inline-block rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-widest"
              style={{
                background: `${team.color}1f`,
                color: team.color,
                border: `1px solid ${team.color}40`,
              }}
            >
              {team.name}
            </p>
            <h2
              id={titleId}
              className="text-lg font-semibold leading-snug text-[var(--color-gr-white)]"
            >
              {leadName}
            </h2>
            {lead && (
              <p className="mt-0.5 text-sm text-[var(--color-gr-subtle)]">
                {lead.role}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <section className="mt-6">
          <h3 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)]">
            About the lead
          </h3>
          <p className="text-sm leading-relaxed text-[var(--color-gr-subtle)]">
            {hasBio && lead
              ? lead.bio
              : "The lead's introduction is coming soon — check back shortly."}
          </p>
        </section>

        {/* Current focus */}
        {hasFocus && lead && (
          <section className="mt-5">
            <h3 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)]">
              Current focus
            </h3>
            <p className="text-sm leading-relaxed text-[var(--color-gr-subtle)]">
              {lead.focus}
            </p>
          </section>
        )}

        {/* Welcome note */}
        {hasWelcome && lead && (
          <section className="mt-5">
            <h3 className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)]">
              A word for newcomers
            </h3>
            <blockquote className="border-l-2 border-[var(--color-gr-accent)] pl-4 text-sm italic leading-relaxed text-[var(--color-gr-offwhite)]">
              &ldquo;{lead.welcomeNote}&rdquo;
            </blockquote>
          </section>
        )}

        {/* Social links */}
        <section className="mt-6 border-t border-[var(--color-gr-border)] pt-5">
          <h3 className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--color-gr-muted)]">
            Connect
          </h3>
          {links.length > 0 ? (
            <div className="flex flex-wrap gap-2.5">
              {links.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gr-border-2)] px-3.5 py-1.5 text-xs font-medium text-[var(--color-gr-subtle)] transition-colors hover:border-[var(--color-gr-accent)] hover:text-[var(--color-gr-accent)]"
                >
                  {link.key === "twitter" ? (
                    <XLogo className="h-3 w-3" />
                  ) : link.key === "github" ? (
                    <GitBranch size={12} />
                  ) : (
                    <Globe size={12} />
                  )}
                  {link.label}
                </a>
              ))}
            </div>
          ) : (
            <p className="text-sm text-[var(--color-gr-muted)]">
              Social links will appear here once verified.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}