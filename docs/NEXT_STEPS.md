# Geek Room — Next Steps

> **Last updated:** 2026-10-26 | **Current Milestone:** 1 — Visual Foundation (Milestone 0 Verified & Complete)

---

## Current State

**Milestone 0: Project Foundation is 100% complete and verified.**
- `npx tsc --noEmit`: 0 errors
- `npm run lint`: 0 errors, 0 warnings
- `npm run build`: 0 errors (all routes statically prerendered)
- Documentation and AI contract in place.

**Recent Completed Work:**
- Contrast and background overshadowing overhaul:
  - De-noised background grid from harsh `#2e3140` to subtle `rgba(255, 255, 255, 0.035)` grid lines.
  - Added scroll exit fade to `HeroCanvas` so the fixed particle/web canvas smoothly disappears when leaving the hero section, preventing canvas lines from shining behind content text.
  - Elevated surfaces to `#181a27` (crisp dark card glass) with `border-white/15` and drop shadows.
  - Overhauled Sections 01 through 08 (Work With Us, Numbers, Learn Connect Grow, Partners, Loved By Builders, Voices, Events, FAQ) with high-contrast text (`font-black` headings, `font-semibold text-[#f4f6fc]` descriptions, and bold pill badges).
  - Wrapped Three.js renderers in `try/catch` for graceful fallbacks when WebGL is unavailable.
- Three.js Logo 3D Hacker Icon Constellation (`components/sections/LogoScene.tsx`):
  - 3 custom builder & hacker items (Open Laptop with glowing code editor, Hackathon Championship Trophy with dual handles and floating gem, Chilled GEEK FUEL Energy Drink can with pull tab) revolving in layered 3D elliptical orbits around the extruded Geek Room `<GR/>` logo in the hero scene.
  - Passes in front of ($Z > 0$) and behind ($Z < 0$) the logo with natural depth layering, reacting to interactive mouse tilt and fading synchronously on scroll.
- Mascot Kinematics & Companion Polish (`components/animations/ChinkuRobot.tsx`):
  - **Striker GR-7** companion with official Geek Room jersey (#7, GEEKROOM), tech soccer ball dribbling across screen on scroll, direct touch tricks (Ronaldo "SIUUU", flip, jump, fall, say hi), and 18 rotating community quotes.
- Footer Grand Finale Brand Mark (`components/layout/Footer.tsx`):
  - Massive fluid-scale `GEEKROOM GTBIT` typography (`text-[clamp(2rem,9.6vw,10.5rem)]`) anchored at the end of the footer with high-contrast gradient fill and hover sheen.
  - Resolved chapter attribution to Guru Tegh Bahadur Institute of Technology · New Delhi in [`components/layout/Footer.tsx`](file:///home/Hsingh/Desktop/geekroom/components/layout/Footer.tsx) and updated [`docs/CONTENT_STATUS.md`](file:///home/Hsingh/Desktop/geekroom/docs/CONTENT_STATUS.md).

**Additions since Milestone 0:**
- Homepage "Society Story" section (history, goals, differentiators) driven by `lib/data/society.ts` — timeline facts are placeholders pending society confirmation (see `docs/CONTENT_STATUS.md`).
- anime.js v4 installed and powering the homepage animation system (hero split-text + dot-grid engine, scroll-scrubbed ghost numbers, per-section `ScrollReveal` treatments, `ScrollProgressRail`). See Decision 009 in `docs/DECISIONS.md`.
- **Pending:** manual visual QA of all animations at 375/768/1280px; Motion remains in use only for Navigation.

**Post-Milestone 0 addition:** Homepage now includes a "Society Story" section (history timeline, goals, differentiators) driven by `lib/data/society.ts`. Timeline facts are placeholders pending society confirmation (see `docs/CONTENT_STATUS.md`). The section should adopt `AnimatedReveal` in Milestone 1.

---

## Immediate Next Task: Begin Milestone 1 (Visual Foundation)

> Goal: Deliver a distinctive, memorable homepage visual experience, reusable UI primitives, and motion architecture.

### Task queue (in priority order):

1. **Animated Hero — Full Art Direction & Motif**
   - Design and implement the distinctive hero visual motif (e.g., interactive generative particle grid or geometric constellation connecting nodes).
   - Must be performant, purposeful, and fully respect `prefers-reduced-motion`.
   - Update `components/sections/HeroSection.tsx`.

2. **Extract Shared Animation Variants**
   - Create `lib/animations/variants.ts` for standardized transitions, staggers, and easing curves.
   - Establish consistent motion tokens across components.

3. **`AnimatedReveal` Scroll Wrapper Component**
   - Create `components/animations/AnimatedReveal.tsx` utilizing `motion` and `whileInView` with viewport thresholds and reduced-motion fallback.

4. **Shared UI Primitives (`components/ui/`)**
   - `Button`: Strongly typed variants (primary, secondary, outline, ghost) with keyboard accessibility.
   - `SectionHeader`: Eyebrow, headline, and subtext with consistent responsive styling.
   - `Badge`: Domain and category indicator chip.

5. **Homepage Shell Enhancement**
   - Replace temporary inline sections in `app/page.tsx` with structured components using the new primitives and motion wrappers.

6. **Responsive Layout & Typography Audit**
   - Test and refine layout across mobile (375px), tablet (768px), and desktop (1280px+).

7. **Milestone 1 Verification**
   - Run typecheck, lint, and build to ensure zero regressions.

4. **`SectionHeader` shared component**
   - Eyebrow label + heading + optional description
   - Used in every section across all pages
   - Eliminates current repetition

5. **`Button` primitive component**
   - Primary (accent-filled), Secondary (outlined), Ghost variants
   - `Link`-compatible and `button`-compatible
   - Keyboard accessible, proper focus states

6. **Shared animation variants in `lib/animations/`**
   - Extract `ENTER` variants from `HeroSection.tsx` into `lib/animations/variants.ts`
   - All components import from there

7. **Page transitions**
   - Subtle fade/slide between routes
   - Test on mobile (no janky transitions)

8. **Typography refinement**
   - Verify type scale renders correctly at all breakpoints
   - Ensure heading contrast meets WCAG AA

9. **Full mobile responsive audit** — test all current pages at 375px, 768px, 1280px

10. **Milestone 1 build verification** — `tsc --noEmit` + `npm run build` must pass

---

## Milestone 2 — Core Pages

After Milestone 1 passes verification:

- Full Teams page (team cards, lead profiles, interest links)
- Full Events page (timeline, upcoming/past)
- Full Projects page (gallery, achievements section)
- Full Join page (real social links configured, form integration)
- `TeamCard`, `EventCard`, `ProjectCard` shared components
- Replace all `// PLACEHOLDER` content with real society information

---

## Milestone 3 — Signature Features

After Milestone 2:

- Find Your Geek quiz
- Geek Room Challenge system
- Made at Geek Room showcase
- Interactive team node visualization (decide: Motion vs Three.js)
- Micro-interactions and hover effects refinement

---

## Milestone 4 — Polish and Validation

After Milestone 3:

- Full accessibility audit (keyboard, ARIA, contrast)
- Performance audit (bundle size, LCP, FID)
- Animation audit (reduced-motion, mobile, 60fps)
- Broken link check
- Final build and deployment verification
- Easter egg feature (if time permits)

---

## Known Bugs

| Bug | File | Priority |
|---|---|---|
| `dangerouslySetInnerHTML` used for static strings | `app/join/page.tsx` | Low — fix in Milestone 1 |
| Social links point to `#` | `lib/data/config.ts` | Block launch — fix when links verified |
| `metadataBase` URL is placeholder | `app/layout.tsx` | Block launch — fix before deployment |

---

## Blockers

| Blocker | Owner | Required for |
|---|---|---|
| Real team lead names and bios | Web Dev Lead / Society | Milestone 2 Teams page |
| Verified social URLs (Discord, Instagram, LinkedIn) | Web Dev Lead / Society | Milestone 2 Join page |
| Confirmed upcoming events | Society | Milestone 2 Events page |
| Form backend (Formspree / Resend / other) | Web Dev Lead | Join form integration |
| Team lead photographs | Team leads | Lead profile cards |
| Real college name | Web Dev Lead | Footer |

---

## Deferred Features

- Easter egg / hidden terminal — after Milestone 4
- GSAP animations — only if Motion is insufficient for specific timelines
- Three.js 3D — only if team visualization genuinely benefits from it
- Local challenge progress / streaks — after challenge system is stable
- Dark/light mode toggle — currently dark-only by design

---

## Recommended Next Prompt

> **Proceed with Milestone 0 verification, then start Milestone 1.**
>
> "Run `npx tsc --noEmit` and `npm run build` to verify the current state. Fix any errors. Then begin Milestone 1: implement the full animated hero section, extract shared animation variants, build the `AnimatedReveal` wrapper, `SectionHeader`, and `Button` components, and perform the first responsive audit."
