"use client";

/**
 * Geek Room Navigation
 *
 * Client component because it tracks scroll position for
 * the transparent → frosted-glass transition.
 *
 * Accessibility: keyboard-navigable, skip-to-content link included.
 */

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems, SITE_NAME } from "@/lib/data/config";

export default function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (store during render per React guidelines)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded focus:bg-[var(--color-gr-accent)] focus:text-black focus:font-semibold"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[var(--color-gr-border)] bg-[var(--color-gr-black)]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav
          className="container-gr flex items-center justify-between h-20"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="font-mono text-xl font-bold tracking-widest uppercase text-white hover:text-[var(--color-gr-accent)] transition-colors"
            aria-label={`${SITE_NAME} — Home`}
          >
            <span className="text-[var(--color-gr-accent)]">&lt;</span>
            {SITE_NAME}
            <span className="text-[var(--color-gr-accent)]">/&gt;</span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-2" role="list">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-semibold rounded transition-colors ${
                      isActive
                        ? "text-[var(--color-gr-accent)]"
                        : "text-[#e2e5f2] hover:text-white"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--color-gr-accent)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/join"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold tracking-wide rounded-full border border-[var(--color-gr-accent)] bg-[var(--color-gr-accent)]/10 text-[var(--color-gr-accent)] hover:bg-[var(--color-gr-accent)] hover:text-black transition-colors"
          >
            Join Geek Room
          </Link>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2.5 rounded text-[var(--color-gr-offwhite)] hover:text-[var(--color-gr-accent)] transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-b border-[var(--color-gr-border)] bg-[var(--color-gr-black)]/95 backdrop-blur-md"
            >
              <ul className="container-gr flex flex-col py-5 gap-1" role="list">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`block px-3 py-3 text-base font-medium rounded transition-colors ${
                          isActive
                            ? "text-[var(--color-gr-accent)] bg-[var(--color-gr-surface)]"
                            : "text-[var(--color-gr-subtle)] hover:text-[var(--color-gr-offwhite)] hover:bg-[var(--color-gr-surface)]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
                <li className="mt-3 pt-3 border-t border-[var(--color-gr-border)]">
                  <Link
                    href="/join"
                    className="block px-3 py-3 text-base font-semibold text-center rounded border border-[var(--color-gr-accent)] text-[var(--color-gr-accent)] hover:bg-[var(--color-gr-accent)] hover:text-black transition-colors"
                  >
                    Join Geek Room
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
