/**
 * Geek Room — Events Page (/events)
 * MILESTONE STATUS: Stub — full implementation is Milestone 2.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { getUpcomingEvents, getPastEvents } from "@/lib/data/events";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Upcoming and past Geek Room events — workshops, hackathons, talks, and more.",
};

export default function EventsPage() {
  const upcoming = getUpcomingEvents();
  const past = getPastEvents();

  return (
    <div className="section-padding">
      <div className="container-gr">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Home
        </Link>

        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--color-gr-accent)] mb-2">
          Stay in the loop
        </p>
        <h1 className="text-headline font-bold text-[var(--color-gr-white)] mb-4">
          Events
        </h1>
        <p className="text-[var(--color-gr-subtle)] max-w-xl mb-12">
          Workshops, hackathons, talks, and competitions. Real events from a real community.
        </p>

        {/* Upcoming */}
        <section aria-labelledby="upcoming-heading" className="mb-16">
          <h2
            id="upcoming-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-6 flex items-center gap-2"
          >
            <Calendar size={18} className="text-[var(--color-gr-accent)]" />
            Upcoming
          </h2>

          {upcoming.length > 0 ? (
            <div className="space-y-4">
              {upcoming.map((event) => (
                <article
                  key={event.id}
                  className="p-6 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
                >
                  <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-gr-accent)] mb-2">
                    {event.category} · {event.audience}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-gr-white)]">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-gr-subtle)]">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    {event.venue && ` · ${event.venue}`}
                  </p>
                  <p className="mt-3 text-sm text-[var(--color-gr-subtle)]">
                    {event.description}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-[var(--color-gr-border)] rounded-xl">
              <p className="text-[var(--color-gr-muted)] font-mono text-sm">
                No upcoming events confirmed yet.
              </p>
              <p className="mt-2 text-sm text-[var(--color-gr-subtle)]">
                Follow us on social media to be the first to know.
              </p>
            </div>
          )}
        </section>

        {/* Past */}
        {past.length > 0 && (
          <section aria-labelledby="past-heading">
            <h2
              id="past-heading"
              className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-6"
            >
              Past Events
            </h2>
            <div className="space-y-4 opacity-70">
              {past.map((event) => (
                <article
                  key={event.id}
                  className="p-6 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
                >
                  <p className="text-xs font-mono uppercase tracking-wide text-[var(--color-gr-muted)] mb-2">
                    {event.category}
                  </p>
                  <h3 className="text-lg font-semibold text-[var(--color-gr-offwhite)]">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-gr-subtle)]">
                    {new Date(event.date).toLocaleDateString("en-IN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
