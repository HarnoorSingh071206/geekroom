/**
 * Geek Room — Join Page (/join)
 * MILESTONE STATUS: Stub — full implementation is Milestone 2.
 *
 * CONTENT STATUS:
 * - Social links are PLACEHOLDER (see lib/data/config.ts)
 * - No form backend is configured — submission is disabled.
 *   Integrate a verified form service (e.g. Formspree, Resend)
 *   before enabling the interest form.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Camera, Globe, GitBranch } from "lucide-react";
import { socialLinks } from "@/lib/data/config";

export const metadata: Metadata = {
  title: "Join Geek Room",
  description:
    "Join Geek Room — a college technology society open to all students, regardless of experience level.",
};

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  MessageSquare,
  Camera,
  Globe,
  GitBranch,
};

export default function JoinPage() {
  return (
    <div className="section-padding">
      <div className="container-gr max-w-3xl">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] transition-colors mb-8"
        >
          <ArrowLeft size={14} /> Home
        </Link>

        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-[var(--color-gr-accent)] mb-2">
          Be part of it
        </p>
        <h1 className="text-headline font-bold text-[var(--color-gr-white)] mb-4">
          Join Geek Room
        </h1>
        <p className="text-[var(--color-gr-subtle)] max-w-xl mb-12 text-lg">
          Geek Room is open to every student who&apos;s curious about technology.
          You don&apos;t need to be an expert — just willing to explore and contribute.
        </p>

        {/* Who can join */}
        <section aria-labelledby="who-heading" className="mb-12">
          <h2
            id="who-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-4"
          >
            Who can join?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                label: "Beginners",
                desc: "If you've written your first line of code — or are about to — you belong here.",
              },
              {
                label: "Builders",
                desc: "If you have projects you want to work on with people who get it.",
              },
              {
                label: "Explorers",
                desc: "If you're not sure what to focus on yet and want to try different things.",
              },
            ].map((card) => (
              <div
                key={card.label}
                className="p-5 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
              >
                <p className="font-semibold text-[var(--color-gr-accent)] mb-2">
                  {card.label}
                </p>
                <p className="text-sm text-[var(--color-gr-subtle)]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How to join */}
        <section aria-labelledby="how-heading" className="mb-12">
          <h2
            id="how-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-4"
          >
            How to join
          </h2>
          <div className="space-y-4">
            {[
              {
                step: "01",
                title: "Join our community channels",
                desc: "Connect via Discord or Instagram to get started and stay updated.",
              },
              {
                step: "02",
                title: "Explore the teams",
                desc: "Browse our active teams and find one that matches your interests.",
              },
              {
                step: "03",
                title: "Attend an event or session",
                desc: "Join a workshop, hackathon, or weekly session to meet the community.",
              },
              {
                step: "04",
                title: "Start building",
                desc: "Contribute to a project, participate in challenges, or propose something new.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-5 p-5 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
              >
                <span className="flex-shrink-0 font-mono text-2xl font-bold text-[var(--color-gr-border-2)]">
                  {item.step}
                </span>
                <div>
                  <p className="font-semibold text-[var(--color-gr-offwhite)]">
                    {item.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-gr-subtle)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community links */}
        <section aria-labelledby="community-heading" className="mb-12">
          <h2
            id="community-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-4"
          >
            Find us
          </h2>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = iconMap[link.icon];
              const isPlaceholder = link.url === "#";
              return (
                <a
                  key={link.platform}
                  href={isPlaceholder ? undefined : link.url}
                  target={isPlaceholder ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`Geek Room on ${link.platform}${isPlaceholder ? " (link not yet available)" : ""}`}
                  aria-disabled={isPlaceholder}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded border text-sm font-medium transition-colors ${
                    isPlaceholder
                      ? "border-[var(--color-gr-border)] text-[var(--color-gr-muted)] cursor-not-allowed"
                      : "border-[var(--color-gr-border-2)] text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] hover:border-[var(--color-gr-accent)]"
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {link.platform}
                  {isPlaceholder && (
                    <span className="text-xs font-mono text-[var(--color-gr-muted)]">
                      (coming soon)
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </section>

        {/* Interest form — pending backend integration */}
        <section
          aria-labelledby="form-heading"
          className="p-6 rounded-xl border border-dashed border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
        >
          <h2
            id="form-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-2"
          >
            Interest Form
          </h2>
          <p className="text-sm text-[var(--color-gr-subtle)] mb-4">
            An interest form for registering your details and preferred team
            will be available here once the submission endpoint is configured.
          </p>
          <p className="text-xs font-mono text-[var(--color-gr-muted)] bg-[var(--color-gr-surface-2)] px-3 py-2 rounded border border-[var(--color-gr-border)] inline-block">
            STATUS: Pending form integration — see docs/CONTENT_STATUS.md
          </p>
          <p className="mt-4 text-sm text-[var(--color-gr-subtle)]">
            In the meantime, reach out directly through{" "}
            <Link
              href="/join#community-heading"
              className="text-[var(--color-gr-accent)] hover:underline"
            >
              our community channels
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
