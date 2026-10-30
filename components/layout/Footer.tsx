/**
 * Geek Room Footer
 *
 * Server component — no interactivity needed.
 * Consistent across all pages via root layout.
 *
 * Stacking note: the homepage renders a FIXED animation canvas
 * (z-0). Positioned elements paint above unpositioned ones, so the
 * footer MUST be `relative z-10` or the web/crystal backdrop paints
 * over it. Do not remove those classes.
 *
 * CONTENT STATUS: Social links are PLACEHOLDER.
 * Replace in lib/data/config.ts before launch.
 */

import Link from "next/link";
import { ArrowUp, GitBranch, Globe, Camera, MessageSquare } from "lucide-react";
import { navItems, SITE_NAME, SITE_TAGLINE, socialLinks } from "@/lib/data/config";

// Map config icon names → Lucide components
// Note: lucide-react does not ship brand icons (Github, Instagram, Linkedin).
// We use generic equivalents. Replace with custom SVGs from /public/icons/ if needed.
const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  GitBranch: GitBranch,
  Globe: Globe,
  Camera: Camera,
  MessageSquare: MessageSquare,
};

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative z-10 mt-auto border-t border-[var(--color-gr-border)] bg-[var(--color-gr-surface)]">
      {/* Accent hairline — top edge */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gr-accent)]/50 to-transparent"
      />

      <div className="container-gr py-14 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1.2fr]">
          {/* Identity */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block font-mono text-xl font-semibold tracking-widest uppercase text-[var(--color-gr-white)] hover:text-[var(--color-gr-accent)] transition-colors"
              aria-label={`${SITE_NAME} — Home`}
            >
              <span className="text-[var(--color-gr-accent)]">&lt;</span>
              {SITE_NAME}
              <span className="text-[var(--color-gr-accent)]">/&gt;</span>
            </Link>
            <p className="text-sm text-[var(--color-gr-offwhite)]">
              {SITE_TAGLINE.split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className={
                    i % 2 === 0
                      ? "font-serif italic text-[var(--color-gr-accent)]"
                      : undefined
                  }
                >
                  {word}{" "}
                </span>
              ))}
            </p>
            <p className="max-w-[34ch] text-sm font-medium leading-relaxed text-[#edf0f8]">
              A college technology society for students who want to build real
              things and grow alongside people just as curious.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#c5c9dd]">
              Navigate
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3 sm:flex sm:flex-col" role="list">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-[#e2e5f2] transition-colors hover:text-[var(--color-gr-accent)]"
                  >
                    <span
                      aria-hidden="true"
                      className="h-px w-3 bg-[var(--color-gr-border-2)] transition-all group-hover:w-5 group-hover:bg-[var(--color-gr-accent)]"
                    />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Community */}
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-widest text-[#c5c9dd]">
              Community
            </p>
            <ul className="flex flex-wrap gap-2.5" role="list">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <li key={link.platform}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Geek Room on ${link.platform}`}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-gr-border-2)] px-3.5 py-2 text-xs font-semibold text-[#e2e5f2] transition-colors hover:border-[var(--color-gr-accent)] hover:text-[var(--color-gr-accent)]"
                    >
                      {Icon && <Icon size={14} />}
                      {link.platform}
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-[#c5c9dd] font-medium">
              Guru Tegh Bahadur Institute of Technology · New Delhi
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-gr-border)] pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[var(--color-gr-muted)]">
            © {year} {SITE_NAME} · GTBIT Chapter. Built by the Web Team.
          </p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-[var(--color-gr-muted)]">
              Made with curiosity.
            </p>
            <a
              href="#main-content"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--color-gr-subtle)] transition-colors hover:text-[var(--color-gr-accent)]"
            >
              Back to top
              <ArrowUp size={12} />
            </a>
          </div>
        </div>

        {/* Big Finale Endmark — GEEKROOM GTBIT */}
        <div className="mt-12 sm:mt-16 border-t border-[var(--color-gr-border)]/50 pt-8 sm:pt-12 text-center select-none overflow-hidden">
          <p
            className="font-black uppercase tracking-tighter leading-[0.82] text-transparent bg-clip-text bg-gradient-to-b from-white via-[#f0f3fa] to-white/15 hover:to-[var(--color-gr-accent)]/80 transition-all duration-700 text-[clamp(2rem,9.6vw,10.5rem)]"
            aria-label="Geek Room GTBIT"
          >
            GEEKROOM GTBIT
          </p>
        </div>
      </div>
    </footer>
  );
}