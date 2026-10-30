/**
 * Geek Room — Projects Page (/projects)
 * MILESTONE STATUS: Stub — full implementation is Milestone 2.
 */

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitBranch, ExternalLink } from "lucide-react";
import { projects, achievements } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects built by Geek Room members — real work from a real community.",
};

export default function ProjectsPage() {
  const active = projects.filter((p) => p.status === "active");
  const completed = projects.filter((p) => p.status === "completed");

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
          What we build
        </p>
        <h1 className="text-headline font-bold text-[var(--color-gr-white)] mb-4">
          Projects & Achievements
        </h1>
        <p className="text-[var(--color-gr-subtle)] max-w-xl mb-12">
          Real projects. Real contributors. No fabricated stats or invented
          achievements. This page grows as the community does.
        </p>

        {/* Active */}
        {active.length > 0 && (
          <section aria-labelledby="active-heading" className="mb-16">
            <h2
              id="active-heading"
              className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-6"
            >
              Active Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {active.map((project) => (
                <article
                  key={project.id}
                  className="p-6 rounded-xl border border-[var(--color-gr-accent)]/30 bg-[var(--color-gr-surface)] space-y-3"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-[var(--color-gr-white)]">
                      {project.title}
                    </h3>
                    <span className="flex-shrink-0 px-2 py-0.5 text-xs font-mono rounded-full border border-[var(--color-gr-accent)]/40 text-[var(--color-gr-accent)]">
                      active
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-gr-subtle)]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs font-mono rounded border border-[var(--color-gr-border)] text-[var(--color-gr-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 pt-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] transition-colors"
                      >
                        <GitBranch size={12} /> GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-accent)] transition-colors"
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Completed */}
        {completed.length > 0 && (
          <section aria-labelledby="completed-heading" className="mb-16">
            <h2
              id="completed-heading"
              className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-6"
            >
              Completed Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {completed.map((project) => (
                <article
                  key={project.id}
                  className="p-6 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)] space-y-3"
                >
                  <h3 className="font-semibold text-[var(--color-gr-offwhite)]">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[var(--color-gr-subtle)]">
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        <section aria-labelledby="achievements-heading">
          <h2
            id="achievements-heading"
            className="text-lg font-semibold text-[var(--color-gr-offwhite)] mb-6"
          >
            Achievements
          </h2>
          {achievements.length > 0 ? (
            <div className="space-y-4">
              {achievements.map((a) => (
                <div
                  key={a.id}
                  className="p-5 rounded-xl border border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]"
                >
                  <h3 className="font-semibold text-[var(--color-gr-offwhite)]">
                    {a.title}
                  </h3>
                  {a.result && (
                    <p className="text-sm text-[var(--color-gr-accent)] mt-1">
                      {a.result}
                    </p>
                  )}
                  <p className="text-sm text-[var(--color-gr-subtle)] mt-2">
                    {a.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border border-dashed border-[var(--color-gr-border)] rounded-xl">
              <p className="text-[var(--color-gr-muted)] font-mono text-sm">
                Achievements will be listed here as they happen.
              </p>
              <p className="mt-2 text-sm text-[var(--color-gr-subtle)]">
                No fabricated results. This page grows with the community.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
