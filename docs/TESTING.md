# Geek Room — Testing Guide

> **Last updated:** 2026-10-25
> This document describes how to validate the application. Run these checks before claiming any milestone complete.

---

## 1. Type Checking

```bash
npx tsc --noEmit
```

**Expected result:** No errors, no warnings. Fix all type errors before proceeding.

**What it checks:**
- TypeScript strict mode compliance
- Correct types for all component props, data shapes, and function signatures
- Import paths are valid

---

## 2. Linting

```bash
npm run lint
```

**Expected result:** No errors. Warnings may be acceptable — document them.

**What it checks:**
- ESLint rules via `eslint-config-next`
- React hooks rules
- Import/export validity
- Accessibility (jsx-a11y rules)

---

## 3. Production Build

```bash
npm run build
```

**Expected result:** Build completes without errors. Note any warnings.

**What it checks:**
- All pages render without runtime errors
- No missing imports or modules
- Static generation works for all routes
- No `use client` / server component boundary violations
- Next.js metadata and image optimization configuration

> ⚠️ **Important:** Always run `npm run build` after significant changes to application code. Do not claim a task complete if the build fails.

---

## 4. Development Server

```bash
npm run dev
```

Open `http://localhost:3000` and verify manually:

- Homepage loads without console errors
- Navigation renders correctly on mobile (375px) and desktop
- All nav links navigate to the correct routes
- Footer renders and social links are present (even if placeholder)
- No visible layout breaks
- Dark background and accent green are visible

---

## 5. Responsive Testing

Test each page at these viewport widths:

| Width | Represents |
|---|---|
| 375px | iPhone SE / small mobile |
| 428px | iPhone 14 Pro Max |
| 768px | iPad / tablet |
| 1024px | Small desktop / laptop |
| 1440px | Standard desktop |

**What to check:**
- No horizontal scroll
- Text is readable (no overflow)
- Navigation collapses to mobile menu at ≤ 768px (md breakpoint)
- Tap targets are ≥ 44px
- Cards and grids reflow correctly

---

## 6. Accessibility Checks

### Keyboard navigation
1. Tab through the entire page
2. Every interactive element (links, buttons) must receive visible focus
3. Focus order must be logical (top-to-bottom, left-to-right)
4. Mobile menu must open/close via keyboard

### Screen reader (manual)
- Use browser DevTools accessibility tree
- All images must have `alt` text
- All sections must have headings in correct order (h1 → h2 → h3)
- Navigation must have `aria-label`
- Current page link must have `aria-current="page"`

### Contrast
- Body text on page background: minimum 4.5:1 (WCAG AA)
- `--color-gr-offwhite` (#e4e4e7) on `--color-gr-black` (#0a0a0b): ~14.2:1 ✅
- `--color-gr-accent` (#a3e635) on `--color-gr-black` (#0a0a0b): ~9.7:1 ✅
- `--color-gr-subtle` (#71717a) on `--color-gr-black` (#0a0a0b): ~4.8:1 ✅ (barely)
- `--color-gr-muted` (#52525b) on `--color-gr-black` (#0a0a0b): ~3.3:1 ❌ — use only for non-essential decorative text

---

## 7. Reduced Motion Testing

In browser DevTools → Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`.

**Expected behavior:**
- Hero section renders without animation (immediately visible)
- Mobile menu opens instantly
- No elements slide in or fade on scroll
- Content is fully accessible without motion

---

## 8. Animation Performance

Test on a mid-range device or using DevTools throttling (6x CPU slowdown):

- Animations must not drop below 30fps
- No layout thrashing (no DOM reads during animations)
- Hero section must not block initial render
- Background effects must not consume excessive CPU at idle

---

## 9. Navigation and Link Checks

Verify all routes are reachable and render without error:

| Route | Expected |
|---|---|
| `/` | Homepage with hero, teams, events, join sections |
| `/teams` | Teams listing with team cards |
| `/events` | Events page with empty state (no confirmed events) |
| `/projects` | Projects page with active "Geek Room Website" project |
| `/join` | Join page with social links (placeholder) and form notice |

**Verify no links point to `undefined` or throw a 404.**

Placeholder social links pointing to `#` are acceptable during development — they must be replaced before launch.

---

## 10. Build Verification Checklist

Before marking a milestone complete, run all of the following:

```bash
npx tsc --noEmit    # Must pass with 0 errors
npm run lint        # Must pass (0 errors; note warnings)
npm run build       # Must complete successfully
```

Record the results in `docs/IMPLEMENTATION_LOG.md`.

---

## 11. Known Testing Gaps (Milestone 0)

| Gap | Reason | Planned |
|---|---|---|
| No automated unit tests | Not set up yet | Consider Vitest in Milestone 1 |
| No E2E tests | Not set up yet | Consider Playwright post-launch |
| No Lighthouse CI | Manual only for now | Add to CI pipeline post-launch |
| No link checker | Manual only | Automate pre-launch |
| No visual regression tests | No screenshots yet | Consider post-Milestone 2 |

---

## 12. Pre-Launch Checklist

Before the site goes live, verify all of the following:

- [ ] All `// PLACEHOLDER` content replaced with real information
- [ ] All social links verified and tested
- [ ] Form submission endpoint configured and tested
- [ ] `metadataBase` URL updated in `app/layout.tsx`
- [ ] OG image created and tested
- [ ] Favicon added
- [ ] `npm run build` passes without warnings
- [ ] Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- [ ] Tested on real mobile devices (iOS Safari + Android Chrome)
- [ ] All placeholder text removed from public-facing pages
- [ ] `CONTENT_STATUS.md` shows all required items as VERIFIED
