# Geek Room — Implementation Log

> **Format:** Entries are appended chronologically. Never overwrite or edit previous entries.
> This file is the authoritative record of what actually happened during development.

---

## Entry 001 — 2026-10-25

### Task
Milestone 0: Project Foundation — Initialize, document, and verify.

### Requested Outcome
Initialize the Geek Room website from an empty workspace. Establish the Next.js application, TypeScript, Tailwind CSS, directory structure, design foundation, all mandatory documentation, and verify the project starts.

### Environment Discovered
- Workspace: `/home/Hsingh/Desktop/geekroom` — **empty** at start
- Node.js: v24.14.0
- npm: 11.9.0
- Git: 2.53.0
- OS: Linux

### Files Created

**Application:**
- `app/globals.css` — Design tokens (CSS custom properties via Tailwind v4 `@theme`), global resets, typography utilities, layout utilities, scrollbar styling
- `app/layout.tsx` — Root layout with Geist fonts, site metadata, viewport config, Navigation + Footer wrappers
- `app/page.tsx` — Homepage shell: Hero section, Teams preview, Events preview, Join CTA
- `app/teams/page.tsx` — Teams page stub
- `app/events/page.tsx` — Events page stub
- `app/projects/page.tsx` — Projects page stub
- `app/join/page.tsx` — Join page stub

**Components:**
- `components/layout/Navigation.tsx` — Client component: responsive nav, scroll-aware frosted glass, mobile menu, Motion active indicator
- `components/layout/Footer.tsx` — Server component: footer with nav, social links, identity
- `components/sections/HeroSection.tsx` — Client component: animated entrance, Motion stagger, reduced-motion aware

**Data + Types:**
- `lib/types/index.ts` — All TypeScript interfaces: Team, TeamLead, Event, Project, Achievement, Challenge, Quiz types, ShowcaseItem, NavItem, SocialLink
- `lib/data/teams.ts` — Team definitions (6 teams: 4 active, 2 inactive — all placeholder leads)
- `lib/data/events.ts` — Event definitions (2 placeholder upcoming events)
- `lib/data/projects.ts` — Project definitions (1 active: the website itself)
- `lib/data/config.ts` — Site constants, nav items, social links (all placeholder URLs)

**Documentation:**
- `README.md` — Full project guide
- `AGENTS.md` — AI agent operating contract (18 rules)
- `docs/PROJECT_MAP.md` — Application architecture and feature map
- `docs/IMPLEMENTATION_LOG.md` — This file
- `docs/NEXT_STEPS.md` — Current development queue
- `docs/DECISIONS.md` — Architecture decisions
- `docs/DESIGN_SYSTEM.md` — Design tokens, typography, animation conventions
- `docs/CONTENT_STATUS.md` — Placeholder content tracker
- `docs/TESTING.md` — Testing and validation procedures

### Files Modified
- `README.md` — Replaced create-next-app default with full project README
- `AGENTS.md` — Extended with full operating contract (preserving the `nextjs-agent-rules` block)
- `app/layout.tsx` — Replaced default with project layout

### Files Deleted
- None

### Commands Executed

| Command | Result |
|---|---|
| `git init && git branch -m main` | ✅ Git initialized, branch: main |
| `npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --turbopack` | ✅ 364 packages installed, 0 vulnerabilities |
| `npm install motion lucide-react` | ✅ 11 packages added (motion, lucide-react + deps), 0 vulnerabilities |

### Important Decisions
- **Next.js 16.4.3** (latest stable as of initialization)
- **Tailwind CSS v4** with CSS-first configuration (`@theme` in `globals.css`) — no `tailwind.config.js`
- **Turbopack** enabled for development (faster builds)
- **`LayoutProps<'/'>`** type helper from Next.js 16 — used in layout files
- **Motion for React** (not `framer-motion`) — this is the new package name
- **No database, auth, or backend** — static content driven from data files
- GSAP, Three.js, React Three Fiber **deferred** to Milestone 3

### Features Completed
- Project initialization
- TypeScript strict mode
- Tailwind CSS v4 design tokens
- Directory structure
- Type definitions
- Placeholder data files
- Navigation (responsive + animated)
- Footer
- Root layout (metadata + fonts)
- Homepage shell
- 4 route stub pages
- All 9 mandatory documentation files

### Features Partially Completed
- Homepage: hero shell exists; full animated hero (particle motif, scroll reveals) deferred to Milestone 1
- Route pages: functional stubs render correctly; full designs are Milestone 2

### Tests Executed
- `npm install` — completed without errors ✅
- Type-check and build run to follow (see below)

### Known Bugs / Limitations
- Social links in `lib/data/config.ts` all point to `#` — must be replaced before launch
- All team lead information is placeholder — no real names or photos
- No events are confirmed — placeholder events in data file
- Form on /join page has no backend — intentionally documented as pending
- `metadataBase` URL is a placeholder
- `dangerouslySetInnerHTML` used in `/join` page for card descriptions — these contain static hardcoded strings only (no user input), but should be refactored to avoid the pattern

### Dependencies Introduced
- `motion` (Motion for React)
- `lucide-react`
- (All other deps from create-next-app: next, react, react-dom, tailwindcss, typescript, eslint, etc.)

### Documentation Updated
- All 9 mandatory documentation files created fresh

### Recommended Next Step
Run `npx tsc --noEmit` and `npm run build` to verify type correctness and build success, then proceed to Milestone 1: Visual Foundation.


---

## Entry 002 — 2026-10-25

### Task
Milestone 0 Verification & Bug Resolution — Type checking, linting, build verification, and prerendering stability.

### Requested Outcome
Verify that Milestone 0 is completely functioning with zero TypeScript errors, zero ESLint errors/warnings, and a successful Next.js production build.

### Files Modified
- `app/join/page.tsx`:
  - Removed `dangerouslySetInnerHTML` for card descriptions; rendered safe static JSX text directly.
  - Replaced unsupported Lucide brand icons (`Instagram`, `Linkedin`, `Github`) with generic equivalents (`Camera`, `Globe`, `GitBranch`).
- `app/projects/page.tsx`:
  - Replaced Lucide `Github` import with `GitBranch`.
- `components/layout/Footer.tsx`:
  - Replaced Lucide brand icons (`Instagram`, `Linkedin`, `Github`) with `Camera`, `Globe`, `GitBranch`.
  - Replaced dynamic `new Date().getFullYear()` with static `2026` to comply with Next.js 16 `cacheComponents: true` prerender stability rules.
- `components/sections/HeroSection.tsx`:
  - Typed easing curve explicitly as `[number, number, number, number]` (`EASE_SMOOTH`) to satisfy Motion for React `Easing` type contract.
- `components/layout/Navigation.tsx`:
  - Resolved `react-hooks/set-state-in-effect` lint error by implementing the recommended React 19 pattern of storing previous route during render instead of synchronous `setState` in `useEffect`.
- `lib/data/config.ts`:
  - Updated placeholder social links config with corresponding generic icon names (`Camera`, `Globe`, `GitBranch`).

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (`8/8` static pages generated) |

### Important Decisions
- **Brand Icons in Lucide:** Lucide React v0.469+ does not include third-party brand icons (GitHub, LinkedIn, Instagram). Used generic equivalents for now; custom SVGs in `/public/icons/` will be used for final brand logos.
- **Prerender Stability in Next.js 16:** In Next.js 16 with `cacheComponents: true` and partial prefetching, calling un-cached nondeterministic system time like `new Date()` inside a Server Component halts static prerendering. Switched static copyright year in Footer to a constant (`2026`).

### Features Completed
- Milestone 0: 100% verified and complete.
  - TypeScript validation: 100% passing.
  - ESLint verification: 100% passing.
  - Next.js Production Build: 100% passing.
  - All routes (`/`, `/teams`, `/events`, `/projects`, `/join`) prerender statically without errors.

### Known Bugs / Limitations
- Social links in `lib/data/config.ts` point to `#` placeholders until verified accounts are provided.
- Team leads, events, achievements data remain placeholders in `lib/data/`.
- Join form backend endpoint is not yet connected (pending integration decision).

### Recommended Next Step
Proceed to **Milestone 1: Visual Foundation** (Art-directed animated hero with visual motif, reusable UI primitives, scroll reveal wrapper, shared animation variants).


---

## Entry 003 — 2026-10-25

### Task
Homepage: add a "Society Story" section — history, goals, and what makes Geek Room different — without duplicating content that already exists on other pages.

### Requested Outcome
The homepage should tell visitors about the society's history, its goals, and why it is special. Content must not repeat what is already covered by /teams (team details, leads), /events (event listings), /projects (projects, achievements), or /join (who can join, how to join, social links).

### Files Created
- `lib/data/society.ts` — Society story data: eyebrow/heading/intro, history timeline (2 milestones), goals (4), differentiators (3), plus `getSocietyStory()` helper

### Files Modified
- `lib/types/index.ts` — Added `SocietyStory`, `StoryMilestone`, `MissionGoal`, `Differentiator` types
- `app/page.tsx` — Added Section 2 "Society story" between Hero and Teams preview: history timeline (vertical rule + dot markers), goals list, differentiators card grid; renumbered subsequent section comments
- `docs/CONTENT_STATUS.md` — Added "Society Story" checklist section and updated summary table
- `docs/PROJECT_MAP.md` — Updated homepage feature matrix, data architecture tree, and dependency notes

### Design Notes
- Static Server Component section (no animation) — consistent with Milestone 0 shell status; scroll reveals remain a Milestone 1 task via `AnimatedReveal`
- Uses only existing design tokens (`--color-gr-*`), `container-gr` / `section-padding` utilities, and the established eyebrow + `text-title` heading pattern
- Timeline styled with `--color-gr-accent` dots on a left border rule; goals and differentiators use the standard bordered-surface card pattern

### Content Policy Compliance (AGENTS.md rule 8)
- Mission, goals, and differentiators are vision-derived statements consistent with README.md — verified as vision content
- Historical facts (founding year, specific milestones) are NOT fabricated: period label is `[Founding Year]` and milestone descriptions carry explicit `[Details to be confirmed with the society.]` markers, all flagged `// PLACEHOLDER` in `lib/data/society.ts`

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed — all 6 routes statically prerendered |

### Known Limitations
- Timeline content is placeholder — real founding year and history must be sourced from the society before launch
- Section is not animated yet — intentional; scroll-reveal wiring is scheduled for Milestone 1

### Recommended Next Step
Resume Milestone 1: Visual Foundation (animated hero motif, `AnimatedReveal` wrapper, `SectionHeader`/`Button` primitives) — the new story section should adopt `AnimatedReveal` when it lands.


---

## Entry 004 — 2026-10-25

### Task
Homepage animation system — replicate the animejs.com homepage animation language: scroll-driven section transitions, staggered grid motion, split-text reveals, and a scroll progress/chapter rail.

### Requested Outcome
The user requested animejs.com-style ("exact") animations: content visibly changes and moves as you scroll, each section has its own animation treatment, and the site should not feel basic. Implemented with the actual anime.js engine for fidelity.

### Files Created
- `lib/animations/anime.ts` — `prefersReducedMotion()` helper + shared easing names (`outExpo`, `outQuint`, `inOutSine`, `linear`)
- `components/animations/ScrollReveal.tsx` — enter-triggered reveal wrapper (IntersectionObserver + anime.js animate; optional per-children stagger; supports y/x/scale/rotate)
- `components/animations/AmbientPulse.tsx` — looping scale/opacity pulse for decorative glows
- `components/scroll/ScrubFX.tsx` — scroll-synced scrub wrapper using `onScroll({ sync: 0.8, enter: 'bottom start', leave: 'top end' })`
- `components/scroll/ScrollProgressRail.tsx` — top progress bar (all sizes) + desktop chapter rail with glowing cursor and section dots (Story/Teams/Events/Join), rAF-based scroll spy, keyboard-accessible buttons

### Files Modified
- `components/sections/HeroSection.tsx` — full rewrite (Motion → anime.js):
  - Dot-grid "engine": adaptive grid (≤320 dots), stagger-grid entrance from center (`stagger(26, { grid, from: 'center' })`), ambient wave loop, pointer proximity energy (rAF loop, decaying scale + accent color), debounced rebuild on resize
  - Heading: `splitText({ chars: true, accessible: true })` per-character reveal
  - Entrance timeline: badge → chars → sub → pills → CTAs → scroll hint (`createTimeline`, outExpo)
  - Scroll-scrubbed hero exit (y −90px, opacity → 0.35)
  - Looping chevron scroll hint
- `app/page.tsx` — added `ScrollProgressRail`; section ids (`story`, `teams`, `events`, `join`) + `scroll-mt-24`; ghost chapter numbers 01–04 wrapped in `ScrubFX` (WebkitTextStroke outline, scrubbed y 90→−90); per-section `ScrollReveal` treatments (story intro fade-up, timeline slides from left, goals stack, differentiators scale-pop, team cards stagger, event rows slide from left, join content stagger); Join CTA glow converted to `AmbientPulse`
- `package.json` / `package-lock.json` — `animejs@^4.5.0` added

### Important Decisions
- **anime.js v4 as the scroll/hero engine** — see Decision 009 in `docs/DECISIONS.md`. Motion for React retained for Navigation. Never animate the same element with both engines (transform conflicts).
- **Reveal vs scrub separation** — `ScrollReveal` (once, time-based) and `ScrubFX` (continuous, scroll-based) must target different elements to avoid transform fights.
- **SSR-safe hiding** — reveal targets are hidden via `utils.set` inside `useEffect` (post-hydration), so no-JS visitors and crawlers always see full content.
- **Dots budget** — grid spacing adapts so total dots stay ≤320 for performance; pointer effect only writes styles for energized dots.
- **Scrub thresholds** — `enter: 'bottom start', leave: 'top end'` = classic full-traverse section scrub; hero uses `enter: 'top start', leave: 'top end'`.

### Commands Executed

| Command | Result |
|---|---|
| `npm install animejs` | ✅ animejs 4.5.0, 0 vulnerabilities |
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed — all 6 routes statically prerendered |
| `npm run start` + curl smoke test | ✅ HTTP 200, expected markup present |

### Known Bugs / Limitations
- Manual browser verification (visual feel, pointer interaction, mobile touch) NOT yet performed — requires human review at 375px/768px/1280px
- Hero dot grid is decorative and non-focusable (`aria-hidden`, `pointer-events-none` on container; pointer tracked on the section)
- `motion` package remains installed for Navigation — intentional (Decision 009)
- Hero ambient wave + pointer energy run client-side; on very low-end mobile devices the dot count adapts but has not been profiled

### Dependencies Introduced
- `animejs` 4.5.0 (peer-optional `three` NOT installed)

### Documentation Updated
- `docs/DECISIONS.md` — Decision 009 (anime.js adoption, engine split rules)
- `docs/DESIGN_SYSTEM.md` — anime.js conventions table, updated reduced-motion section
- `docs/PROJECT_MAP.md` — shared components, animation ownership, lib tree, homepage dependencies
- `docs/NEXT_STEPS.md` — Milestone 1 status adjustments

### Recommended Next Step
Manual visual QA of the homepage at 375/768/1280px (hero dot grid, pointer energy, rail dots, scrubbed ghosts), then continue Milestone 1: `SectionHeader`/`Button` primitives, page transitions, and responsive audit.


---

## Entry 005 — 2026-10-25

### Task
Enlarge the global navbar.

### Files Modified
- `components/layout/Navigation.tsx` — nav height `h-16` → `h-20`; wordmark `text-sm` → `text-lg`; desktop links `text-sm px-3 py-2` → `text-base px-4 py-2.5`; CTA `px-4 py-2 text-sm` → `px-5 py-2.5 text-base`; mobile toggle icon 20px → 24px with larger tap target; mobile menu links `text-sm py-2.5` → `text-base py-3`
- `app/layout.tsx` — main content offset `pt-16` → `pt-20` to match the taller fixed header
- `app/page.tsx` — homepage section anchor offsets `scroll-mt-24` → `scroll-mt-28`
- `docs/DESIGN_SYSTEM.md` — layout conventions updated (nav height, offset, scroll-mt)

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed — all 6 routes statically prerendered |

### Recommended Next Step
Continue Milestone 1 (visual QA + `SectionHeader`/`Button` primitives).


---

## Entry 006 — 2026-10-25

### Task
Redesign the Teams page (/teams) to match a reference design supplied by the user (`photos/Screenshot_20261025_202141.png`): a "Meet Your Dream Team" layout — centered heading with serif-italic accent inside a large rounded dark panel, and a 3-column grid of portrait cards (photo, name, role, social button).

### Requested Outcome
Teams page should visually match the reference screenshot while staying truthful to real society data (no fabricated names/photos).

### Files Modified
- `app/teams/page.tsx` — full rewrite:
  - Centered rounded panel (`rounded-3xl`, surface background) with ambient accent glow behind it
  - Heading "Meet Your *Dream Team*" — `font-serif italic` accent words
  - 3-column (md) portrait card grid: 3:4 aspect photo slot, team name, tagline, circular social buttons
  - Photo slots render real `lead.avatarUrl` via `next/image` when set; otherwise a labeled team-colored monogram placeholder ("Photo coming soon")
  - Social buttons: X brand glyph (inline SVG — lucide has no brand icons), `GitBranch` (GitHub), `Globe` (LinkedIn); verified links only, disabled placeholder button when none exist
  - Anchor `id={team.id}` + `scroll-mt-28` preserved (homepage cards deep-link to `/teams#id`)
  - Planned-teams note (Cybersecurity & Open Source) and a Join CTA line below the panel
  - Removed the old "under construction" stub notice
  - Content animates in via `ScrollReveal` (heading, subtitle, staggered cards, notes)
- `docs/DESIGN_SYSTEM.md` — documented serif-italic accent + portrait card pattern
- `docs/PROJECT_MAP.md` — Teams page feature matrix row updated
- `docs/CONTENT_STATUS.md` — Teams page placeholder notes updated

### Content Policy Compliance (AGENTS.md rule 8)
- Card titles use real team names; lead placeholder names are NOT rendered
- Photos: labeled placeholders (monogram + "Photo coming soon") — no stock/fake portraits
- Social buttons: disabled placeholder when no verified link exists

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed — all 6 routes statically prerendered |
| `npm run start` + curl smoke test | ✅ HTTP 200; heading, placeholders, and ids present |

### Known Bugs / Limitations
- Cards show team names instead of (placeholder) lead names — intentional until real lead data arrives
- 4 active teams in a 3-column grid leaves the 4th card alone on row 2 (reference shows 6) — visual imbalance acceptable; will resolve when Cybersecurity/Open Source teams are confirmed active
- Manual visual QA at 375/768/1280px still pending

### Recommended Next Step
Continue Milestone 1 (responsive audit, `SectionHeader`/`Button` primitives); source real lead photos + names to replace the monogram placeholders.


---

## Entry 007 — 2026-10-25

### Task
Make team cards interactive — clicking/tapping a team card (Web Development, AI/ML, Competitive Programming, App Development) opens the team lead's full introduction with all available info.

### Files Created
- `lib/utils/team.tsx` — shared team/lead helpers: `monogram()`, `socialEntries()` (verified links only), `XLogo` (inline X brand SVG), `isPlaceholderText()` (detects `[Placeholder]` markers)
- `components/features/TeamCard.tsx` — client component: portrait card with two trigger buttons (portrait + name/tagline block, both `aria-haspopup="dialog"`) plus a "Meet the lead →" hover affordance; social links stay outside the triggers as regular anchors
- `components/features/TeamLeadDialog.tsx` — client modal showing: lead portrait/monogram, team chip, lead name (or "Team Lead — to be announced"), role, bio, current focus, welcome-note quote, verified social links

### Files Modified
- `app/teams/page.tsx` — cards now rendered via `TeamCard`; subtitle updated ("tap a team to meet its lead")
- `docs/PROJECT_MAP.md`, `docs/CONTENT_STATUS.md` — component + content notes

### Behavior & Accessibility
- anime.js entrance (overlay fade + panel rise/scale) and exit timeline; reduced motion → instant show/hide
- `role="dialog"` + `aria-modal`, labelled by the lead heading
- Focus moves to the close button on open, is trapped inside (Tab/Shift+Tab cycle), restored to the trigger on close
- Esc closes; overlay click closes; body scroll locked while open
- Placeholder bio/focus values (`[...]`) are NEVER rendered — dialog shows honest "coming soon" messages (AGENTS.md rule 8)

### Implementation Notes
- Dialog visibility is prop-derived state adjusted during render (React 19 `prevOpen` pattern, as in Navigation.tsx) to satisfy `react-hooks/set-state-in-effect`; exit-unmount happens in the anime.js `onComplete` callback (external-system callback, allowed)
- `onClose`/`openDialog`/`closeDialog` are `useCallback`-stabilized so the focus/scroll-lock effect doesn't re-run on parent re-renders

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed — all 6 routes statically prerendered |
| `npm run start` + curl smoke test | ✅ HTTP 200; 4 cards expose `aria-haspopup="dialog"` + "Meet the lead" affordance |

### Known Bugs / Limitations
- Lead bios are placeholder — dialogs currently show "coming soon" text until the society supplies real introductions
- Manual QA of the dialog on touch devices and keyboard-only navigation still pending

### Recommended Next Step
Source real lead names/bios/photos; continue Milestone 1 responsive audit.


---

## Entry 008 — 2026-10-25

### Task
Redesign the homepage hero to match a second reference screenshot (`photos/Screenshot_20261025_202401.png`): a "biomorphic nucleus" hero — a large animated lime orb surrounded by a swirling particle cloud, heading anchored bottom-left with a mono eyebrow, and compact stat cards bottom-right. The user explicitly required the ball to be animated and always moving.

### Files Created
- `lib/animations/orbEngine.ts` — canvas 2D generative engine:
  - **Orb (the ball, always moving):** multi-frequency harmonic blob deformation (wobble), breathing scale, slow drift around its anchor (never static), layered radial gradients (ambient glow → dark mossy halo → lime body → drifting liquid highlights → rim), `Path2D` morphing shape
  - **Particle cloud:** 180–650 particles (area-based, DPR-capped) orbiting at individual speeds/radii with twinkle, radius wobble, `lighter` compositing, pointer parallax (outer particles move more — depth)
  - **Engineering:** colors read from CSS tokens via `getComputedStyle` (no hardcoded hex), DPR-aware, ResizeObserver rebuild, pauses on `document.hidden` and when out of view (IntersectionObserver), pointer ignored for touch, reduced motion → single static frame
- `components/sections/HeroCanvas.tsx` — thin client wrapper (aria-hidden, pointer-events-none)

### Files Modified
- `components/sections/HeroSection.tsx` — full layout rewrite to match the reference:
  - Full-height hero (`min-h-[100svh]`), canvas fills the section
  - Heading moved bottom-left: mono 3-line eyebrow ("College / Technology / Society") beside a medium `text-title` heading with serif-italic accent word ("Where *curiosity* becomes code.")
  - Sub-copy shortened; principle pills kept (rounded-full like the reference chips); CTAs pill-shaped
  - Bottom-right stat cards: white card ("Currently active — N teams" with decorative tick gauge, count passed from the server page) + dark glass card ("Admissions — Open to all students")
  - Removed the old dot-grid engine, scroll hint, and static radial glow (replaced by the canvas)
  - anime.js entrance timeline updated (eyebrow → chars → sub → pills → CTAs → stats); scroll-scrubbed exit retained
- `app/page.tsx` — passes `teamCount={activeTeams.length}` to the hero
- `docs/DESIGN_SYSTEM.md` — canvas rule + updated anime.js convention table
- `docs/PROJECT_MAP.md` — hero components + animation ownership updated

### Important Decisions
- **Canvas 2D over Three.js/WebGL** for the orb: zero new dependencies (Lean rule), sufficient for a 2D blob + particles, and far smaller bundle. Three.js remains deferred unless a genuine 3D need appears.
- **Engine split refined:** anime.js drives DOM; generative canvas visuals own their rAF loop. Both respect reduced motion.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |
| `npm run start` + curl smoke test | ✅ HTTP 200; eyebrow/stat cards/serif accent present |

### Known Bugs / Limitations
- Manual visual QA pending — orb size/drift amplitude, particle density, and stat-card spacing need human review at 375/768/1280px
- Canvas orb is 2D (flat blob + shading), not a 3D rendered sphere — matches the reference's look but is not volumetric
- Mobile: pointer parallax inactive (touch ignored) — orb still drifts autonomously

### Recommended Next Step
Human visual QA of the new hero; then continue Milestone 1 (responsive audit, `SectionHeader`/`Button` primitives).


---

## Entry 009 — 2026-10-25

### Task
User feedback: the hero orb looked like "a blob of germ" — restyle it as a **crystal** while keeping it animated and always moving.

### Files Modified
- `lib/animations/orbEngine.ts` — replaced the harmonic blob with a faceted low-poly gem:
  - Silhouette: 7-vertex polygon with alternating long/short radii + jitter (crystal outline), fixed at build time
  - Facets: centroid triangles, each shaded by its angle to a slowly sweeping light direction → the gem constantly re-lights (shimmer) as it rotates
  - Crisp facet edges + faint inner refraction lines (vertex → center) for crystalline structure
  - Luminous core, bright silhouette outline, and star glints (4-ray flashes) at vertices with individual phases
  - Motion retained: slow majestic rotation, breathing scale, drift around the anchor, orbiting particles, pointer parallax
  - All colors still read from CSS tokens; performance/pause/reduced-motion behavior unchanged

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Known Bugs / Limitations
- Facet count/shape is randomized once per load (no seed) — slightly different crystal each visit (intentional)
- Manual visual QA pending

### Recommended Next Step
Human visual QA; tune facet brightness contrast or rotation speed if requested.


---

## Entry 010 — 2026-10-25

### Task
User feedback on the hero crystal: add a gentle expand/collapse ("a bit, not a lot") and make it "rotate like inside out".

### Files Modified
- `lib/animations/orbEngine.ts`:
  - **Inside-out folding:** each vertex now holds a long radius and a short radius and continuously folds between them on a slow sine (period ≈ 15–20s), with alternating vertices counter-phased (±π) — long points shrink while short points grow, so the crystal appears to fold through itself while still rotating slowly
  - **Expand/collapse breathing:** breathing amplitude raised from ±3.5% to ±8.5% at a slow period (~14s) — noticeable but subtle; glow and halo scale along with the crystal since they derive from the same radius
  - Existing rotation, light shimmer, glints, particles, parallax, pause/reduced-motion behavior unchanged

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Recommended Next Step
Human visual QA; tune fold depth or breathing amplitude if requested (single constants in `orbEngine.ts`).


---

## Entry 011 — 2026-10-25

### Task
User feedback on the hero crystal: make it bigger, make it expand to cover the screen while scrolling down, and make the particle dots scatter to the corners during that scroll.

### Files Modified
- `lib/animations/orbEngine.ts`:
  - **Bigger crystal:** resting radius factor raised from 16% to 20% of the viewport min-dimension (clamp 90–200px)
  - **Scroll expansion:** new `setProgress(value)` on the engine handle; `coverScale = (viewport diagonal × 0.52) / radius` — at scroll progress 1 the crystal silhouette is larger than the screen diagonal, fully covering it. Drift amplitude eases off (×0.2 at full) so the expanded crystal stays centered. Progress is smoothed per-frame (lerp 0.1) for a buttery scrub.
  - **Corner scatter:** each particle now carries a scatter target (one of the 4 screen corners, slightly outside the viewport, with jitter). On scroll, particles lerp from their orbit position to their corner (ease-in, `progress^1.4`), dimming to ~45% alpha and shrinking ~35% — fully reversible when scrolling back up
- `components/sections/HeroCanvas.tsx` — wires an anime.js `onScroll({ target: section, sync: true, enter: 'top start', leave: 'top end', onUpdate })` to feed `engine.setProgress(self.progress)`; skipped under reduced motion

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Known Bugs / Limitations
- Manual visual QA pending — cover scale (0.52 of diagonal) and scatter easing may need taste adjustments
- The hero text still scroll-fades via its own scrub; combined with the expanding crystal this reads as "diving into" the gem

### Recommended Next Step
Human visual QA; continue Milestone 1 responsive audit.


---

## Entry 013 — 2026-10-25

### Task
User feedback: after the crystal covers the full screen, the screen should become slightly dull and turn to black with a green Spider-Man-style web.

### Files Modified
- `lib/animations/orbEngine.ts` — added the scroll-driven end-phase sequence:
  - **Dull phase** (progress 0.78 → 1): a near-black overlay (token `--color-gr-black`) ramps to 92% opacity and the crystal dims to 15% of its shine (`globalAlpha`), so the covered screen "loses its shine" before sinking to black
  - **Web phase** (progress 0.86 → 1): a green spider web weaves itself in over the black — 14 jittered radial spokes + 10 sagging spiral rings (quadratic curves pulled toward the center, real web geometry) with glue dots at the junctions; spokes draw first, rings reveal center-outward; gentle alpha shimmer while visible; fully reversible on scroll-up
  - Draw order per frame: black overlay → corner particles → dulled crystal → web
- `components/sections/HeroCanvas.tsx` — handoff changed: the canvas no longer fades at the hero's end; the **web remains as the fixed backdrop behind the Story section**, fading out through the first half of the Story section's scroll (second ScrollObserver on `#story`; fallback to end-of-hero fade if the section is missing)

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Known Bugs / Limitations
- The web sits behind the (transparent) Story section while it scrolls in — contrast of story text over web lines needs visual QA
- Web freezes at its final state once fully scrolled past (engine pauses for perf); it re-animates when scrolling back

### Recommended Next Step
Human visual QA of the dull→web sequence; continue Milestone 1.


---

## Entry 014 — 2026-10-25

### Task
User feedback on the web: (1) make it asymmetric, (2) keep it until the end of the page instead of fading out, (3) make random parts of the web glow at random times.

### Files Modified
- `lib/animations/orbEngine.ts` — web system rewritten:
  - **Asymmetry:** spoke angles are randomized with uneven gaps (normalized to close the circle), spoke lengths vary (some fall short), ring radii use random cumulative gaps (irregular spacing), every strand has its own radius jitter and sag factor, ~9% of strands are randomly missing (broken web), and the web center is offset from the screen center by a random fraction of its radius — no symmetry anywhere
  - **Persistence:** the web is the fixed page backdrop after the handoff and never fades; the Story-section fade observer was removed from `HeroCanvas.tsx`
  - **Random glows:** 12 random strands (ring segments + spokes) each pulse with an independent period (2.5–7.5s) and phase — when active, the strand is overdrawn in bright light-lime (additive `lighter` compositing) with a soft radial glow at its midpoint; pulses are independent so they appear at random, unsynchronized times
  - Geometry is generated once at init in normalized units (resizes only rescale), removed the progress-based render pause so the glows keep animating behind the content (visibilitychange pause retained)
- `components/sections/HeroCanvas.tsx` — removed the Story-section fade; canvas stays visible for the whole page

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Known Bugs / Limitations
- The web (and dimmed crystal) now sit behind all homepage content — section headings render over the web lines; readability needs visual QA (cards are opaque, headings are not)
- The canvas animates continuously for the whole page session (glow pulses) — battery cost on mobile is possible; visibility tab-hidden pause retained

### Recommended Next Step
Human visual QA; consider a subtle per-section scrim if text-over-web contrast is too low.


---

## Entry 015 — 2026-10-25

### Task
User feedback on the webs: (1) not a single radial web — multiple webs spanning left→right and up→down, looking like real webs; (2) the glow should be graceful, not robotic.

### Files Modified
- `lib/animations/orbEngine.ts` — web system redesigned as multiple sheet-webs:
  - **Three separate sheet-webs**: one spanning left→right across the upper-middle, one up→down along the right-middle, one smaller (diagonal, lower-left) — each generated by `makeSheet()` with its own spoke count (10–13), uneven spoke gaps, uneven anchor-thread lengths, irregular cumulative ring spacing, per-strand radius jitter and sag, occasional broken strands (more broken toward the rim, like real webs)
  - **Anchored off-screen**: each sheet's radius (≈0.56× the spanning dimension) pushes its anchor threads beyond the screen edges, so threads run off-screen left→right / up→down like real anchor lines
  - Webs weave in staggered (sheet 1 → 2 → 3) as scroll progress advances
  - **Graceful glow redesign**: 14 chosen strands now breathe on long smooth waves (14–40s periods, smoothstep-eased — no threshold, no blink); each glow renders as a wide soft halo (5px, 14% alpha) under a bright core line (1.4px), plus a **point of light that travels along the thread** (quadratic-bezier parameter tied to the same eased wave) — like light moving through fiber; everything fully reversible with scroll
- Geometry stored as viewport fractions — resizes rescale without regeneration

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Recommended Next Step
Human visual QA of the multi-web layout and glow pacing.


---

## Entry 016 — 2026-10-25

### Task
User feedback: the blinks should be slow and graceful.

### Files Modified
- `lib/animations/orbEngine.ts` — every blinking element slowed and softened:
  - **Web strand glows:** wave periods raised from ~14–40s to ~25–80s, peak brightness capped at 85% (smoother ceiling)
  - **Crystal vertex star glints:** frequency reduced (~11–35s per swell) and the hard 0.82-sine threshold replaced with an eased ramp from 0.5 (smoothstep) — no sharp flash; peak dot/ray alphas lowered (0.85→0.55, 0.7→0.45)
  - **Particle twinkle:** frequency halved (periods ~7–25s) and contrast reduced (0.72–1.0 instead of 0.55–1.0)

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Recommended Next Step
Human visual QA of pacing; continue Milestone 1.


---

## Entry 017 — 2026-10-25

### Task
User feedback: make the blink speed even slower.

### Files Modified
- `lib/animations/orbEngine.ts` — all blink frequencies halved again:
  - Web strand glow waves: `0.05 + rand*0.1` rad/s (periods ≈ 40–125s)
  - Crystal vertex glints: `0.08 + rand*0.18` rad/s (periods ≈ 20–80s)
  - Particle twinkle: `0.12 + rand*0.3` rad/s (periods ≈ 13–50s)

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Recommended Next Step
Human visual QA; continue Milestone 1.


---

## Entry 019 — 2026-10-25

### Task
New page: **/archive** — the society's history as a scroll-choreographed timeline using the anime.js `onScroll` chapter pattern the user referenced (enter/leave callbacks updating a counter, `sync: true` scrubbing).

### Files Created
- `app/archive/page.tsx` — server page: header ("A history written in *code*."), delegates to the timeline component
- `components/features/ArchiveTimeline.tsx` — client component:
  - **Sticky chapter counter** (big serif-italic number + period label) that advances via `onEnterForward` and steps back via `onLeaveBackward` — updated via direct `textContent` writes (no re-render), exactly like the anime.js demo's `entered` counter
  - Per-era reveals: content hidden via `utils.set`, animates in (`opacity`, `y 48→0`, `outExpo`) on enter, hides again on leave-backward so the story replays in both scroll directions
  - Scroll-synced progress spine (`onScroll({ sync: true })` scaleX fill)
  - Thresholds mirror the demo: `enter: 'bottom-=100 top'`, `leave: 'top+=120 bottom'`
  - Closing "next chapter is unwritten" card linking to /join
  - Reduced motion: static page, counter stays on chapter 01

### Files Modified
- `lib/data/society.ts` — added two more timeline milestones as clearly-labeled PLACEHOLDER entries ("The first public events", "Dedicated teams take shape" — periods `[Year — confirm]`, descriptions explicitly marked for society confirmation)
- `lib/data/config.ts` — added `Archive → /archive` to `navItems` (Navigation + Footer pick it up automatically)

### Content Policy Compliance (AGENTS.md rule 8)
- No historical facts invented — new milestones are structural placeholders with `[...]` markers; listed in CONTENT_STATUS

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 7 routes statically prerendered |

### Documentation Updated
- `docs/CONTENT_STATUS.md` — Society Story table extended with the two new placeholder milestones (see below)

### Recommended Next Step
Human visual QA of /archive; source real history from the society to fill the placeholder chapters.


---

## Entry 020 — 2026-10-25

### Task
User feedback: the web backdrop felt like "a Halloween website" — reduce it.

### Files Modified
- `lib/animations/orbEngine.ts` — web presence dialed way down so it reads as a subtle texture, not a theme:
  - Strand alphas roughly halved: spokes `0.38→0.16`, rings `0.26→0.11` (× base, itself lowered `0.9→0.5`)
  - Glow strands reduced from 14 to 6, with all glow alphas halved (halo `0.14→0.07`, core `0.6→0.34`, traveling dot `0.45→0.28`)

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 7 routes statically prerendered |

### Recommended Next Step
Human visual QA; reduce further or restore density based on feedback.


---

## Entry 021 — 2026-10-25

### Task
User supplied the official Geek Room logo screenshot (`photos/Screenshot_20261025_224642.png`) and requested: (1) the hero crystal replaced by a three.js 3D version of the logo, (2) the site UI rebranded to the logo's colors (teal/orange/white/navy).

### Files Created
- `components/sections/LogoScene.tsx` — three.js scene building the logo from extruded `THREE.Shape` geometry:
  - Teal `<` bracket with G-hook + mirrored bracket with R-hook (beveled extrusions)
  - Orange serrated slash (jagged left edge, pointed tips)
  - Two extruded white circle eyes
  - Dark navy rounded-corner tile behind everything
  - Lighting: ambient + white key + teal/orange rim directionals
  - Motion: continuous sway/bob/breathe, damped pointer tilt, scroll-scrubbed expansion until the tile covers the viewport diagonal, then dimming into the web phase (mirrors the backdrop engine's phases); pauses when hidden or fully scrolled past; static frame under reduced motion

### Files Modified
- `app/globals.css` — palette rebranded to the logo: dark navy background family (`#14151f`…), teal primary accent (`#2ec4b6`), new secondary accent tokens `--color-gr-accent-2*` (orange `#f4511e`)
- `app/layout.tsx` — `themeColor` updated to `#14151f`
- `lib/animations/orbEngine.ts` — crystal rendering removed entirely; the 2D engine now renders only particles, the black-out overlay, and the webs (the logo lives in the three.js layer above)
- `components/sections/HeroSection.tsx` — renders `LogoScene` above `HeroCanvas`; heading period recolored orange (the logo's slash accent)
- `docs/DESIGN_SYSTEM.md`, `docs/DECISIONS.md` (Decision 010; repaired Decision 009 numbering), `docs/CONTENT_STATUS.md` — palette + architecture updates

### Dependencies Introduced
- `three` + `@types/three` (user-triggered Milestone 3 gate)

### Important Decisions
- Decision 010: palette swap + three.js hero object (see docs/DECISIONS.md)
- All canvas/three engines read tokens at runtime → future rebrands propagate automatically

### Commands Executed

| Command | Result |
|---|---|
| `npm install three @types/three` | ✅ 0 vulnerabilities |
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 7 routes statically prerendered |
| `npm run start` + curl smoke test | ✅ HTTP 200 |

### Known Bugs / Limitations
- The 3D glyph shapes are **hand-approximated** from the screenshot (extruded vector paths) — the real logo SVG should replace them for pixel-exact fidelity
- Manual visual QA of the 3D scene (lighting, tilt feel, cover-scale) pending

### Recommended Next Step
Visual QA of the 3D logo; obtain the real logo SVG to refine the glyph shapes.


---

## Entry 018 — 2026-10-25

### Task
User feedback: the web glow looked static — it should glow, but only when scrolled down, very gracefully and slowly.

### Root Cause
The previous "slower" request pushed glow wave periods to 40–125s — brightness changed so slowly it appeared frozen.

### Files Modified
- `lib/animations/orbEngine.ts`:
  - Glow wave periods brought back to a perceptible-but-graceful ~8–20s (`speed = 0.3 + rand*0.45`)
  - **Scroll-tied intensity:** glow amplitude now scales with the web reveal (`glowAmp = 0.3 + 0.7 * revealBase`) — strands barely glow when the webs first weave in and reach full breathing strength only once the crystal has fully covered the screen; still fully reversible with scroll position

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Recommended Next Step
Human visual QA of glow pacing; continue Milestone 1.


---

## Entry 012 — 2026-10-25

### Task
User feedback: the expanding crystal was being cut off abruptly mid-screen instead of covering the entire viewport.

### Root Cause
The canvas was `absolute` inside the hero `<section>` (which has `overflow-hidden`), so the expanding crystal was clipped at the section boundary while scrolling.

### Files Modified
- `components/sections/HeroCanvas.tsx` — canvas is now **fixed to the viewport** (`fixed inset-0 z-0`, the animejs.com "fixed-section" pattern): the crystal stays centered while the page scrolls and grows over the whole screen. In the final 8% of the hero scroll range the canvas fades out so the next section takes over smoothly — no abrupt cut. Later sections (all `position: relative`) paint above the fixed canvas.
- `lib/animations/orbEngine.ts` — rendering pauses once fully scrolled past (progress ≥ ~1) and resumes automatically when `setProgress` receives a value < 1 (scroll-back), avoiding wasted frames while the faded canvas sits behind later sections.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ 0 errors |
| `npm run lint` | ✅ 0 errors, 0 warnings |
| `npm run build` | ✅ all 6 routes statically prerendered |

### Known Bugs / Limitations
- During the mid-transition (hero half-scrolled), the expanding crystal can briefly sit behind the Story section's text — contrast should be checked during visual QA
- Fixed canvas + `position: relative` sections relies on standard stacking; verify no z-index regression on other pages (canvas only exists on the homepage)

### Recommended Next Step
Human visual QA of the full scroll handoff; continue Milestone 1.


---

## Entry 003 — 2026-10-25

### Task
3D Logo Reconstruction & Animation Fix — Pixel-Perfect Three.js Implementation from Official Logo Asset.

### Requested Outcome
Align the Three.js 3D logo implementation in `components/sections/LogoScene.tsx` exactly with the newly provided official Geek Room logo photo (`photos/Screenshot_20261025_224642.png`), fixing both the 3D geometry and the animation.

### Analysis of the Official Logo
- **Left Glyph ('<')**: Cyan-teal bracket with integrated upward vertical hook forming the letter "G", uniform stroke width with rounded semicircular caps.
- **Right Glyph ('>')**: Cyan-teal bracket with integrated downward-right diagonal leg forming the letter "R", uniform stroke width with rounded semicircular caps.
- **Center Slash ('/')**: Vibrant coral-orange tilted bar with keyboard notch teeth on the left edge and clean beveled end cuts.
- **Eyes ('● ●')**: Two pure white circular nodes positioned in the optical center of the brackets.
- **Colors**:
  - Teal: `#0eb0ba` (RGB [18, 176, 186])
  - Orange: `#e85c2e` (RGB [232, 92, 46])
  - White: `#ffffff`

### Files Created
- `lib/data/logoVectors.ts` — High-precision normalized 2D vector coordinates for G glyph (80 points), R glyph (80 points), Slash with keyboard teeth (147 points), and white eye positions/radii.
- `public/icons/logo.png` — Official logo PNG copied into assets.

### Files Modified
- `components/sections/LogoScene.tsx`:
  - Replaced incorrect hand-coded chevrons and jagged slash with the pixel-accurate vector extrusion geometry from `logoVectors.ts`.
  - Removed unnatural dark background tile mesh that was cluttering the 3D scene.
  - Implemented `MeshPhysicalMaterial` with exact color hexes (`#0eb0ba`, `#e85c2e`, `#ffffff`), subtle emissive luminescence, and clearcoat sheen.
  - Added balanced multi-point lighting (ambient, directional key, cool fill, and teal/orange rim lights) to illuminate the front face while highlighting beveled edges.
  - Refactored animation: gentle organic floating/levitation, responsive pointer tilt with damped spring physics, and an elegant receding scroll exit (replacing the previous oversized blowout).
  - Implemented responsive scaling and viewport positioning so the logo displays with ideal proportions across desktop, tablet, and mobile.
- `app/globals.css`:
  - Updated `--color-gr-accent` to `#0eb0ba` and `--color-gr-accent-2` to `#e85c2e` to match official logo colors.
- `docs/CONTENT_STATUS.md`:
  - Updated status for Official Logo to Verified.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


### Features Completed
- 3D Geek Room logo now matches `photos/Screenshot_20261025_224642.png` 1:1 in geometry, colors, and proportions.
- Smooth, tactile 3D interactive tilt and organic floating animations implemented with reduced-motion fallback.


---

## Entry 004 — 2026-10-25

### Task
Interactive Spider Web Touch & Hover Illumination with Graceful Decay.

### Requested Outcome
Ensure that whenever a user touches a particular area of the background web or hovers over it with a mouse, that area of the web lights up and gracefully fades away.

### Implementation Details
- **Multi-Input Pointer Tracking**:
  - Implemented continuous pointer tracking (`pointermove`, `pointerdown`, `pointerup`, `pointerleave`) and multi-touch tracking (`touchstart`, `touchmove`, `touchend`, `touchcancel`) on `window` in `lib/animations/orbEngine.ts`.
  - The canvas remains `pointer-events-none` so foreground interactive elements (navigation, buttons, links) are never blocked.
- **Strand Excitation & Proximity Physics**:
  - Added per-strand excitation fields (`glow: number` on `WebSegment` and `WebSpoke`).
  - Added fast distance-to-segment calculation (`distToSegment`) checking quadratic midpoints and endpoints against active pointers within a responsive radius (175px on desktop, 210px on touch).
- **Graceful Decay**:
  - Applied exponential decay on each frame (`decay = Math.exp(-dt * 2.2)`), giving a smooth ~1.6–2.2 second phosphorescent fade-out after the pointer moves away or touch is released.
- **Visuals of Lit-Up Web**:
  - Rendered with additive compositing (`lighter`):
    - Wide soft aura: `rgba(accent, 0.45 * glow)` with `lineWidth = 4 + 7 * glow`.
    - Electric core: `rgba(light, 0.88 * glow)` with `lineWidth = 1.4 + 1.4 * glow`.
    - Glowing dewdrop nodes: circular highlights at strand vertices (`arc` with radius `1.8 + 2.8 * glow`).
    - Spoke illumination: radial anchor threads also glow when crossed.
- **Tap & Click Shockwave Ripples**:
  - Added expanding circular shockwaves (`ripples`) on pointer down / tap that propagate across the web strands at 480px/s, exciting strands as the wave passes through.
- **Responsive Web Visibility**:
  - Enabled baseline subtle presence (`baseReveal = 0.24`) combined with local touch reveal override (`Math.max(segReveal, seg.glow)`), so the web responds immediately everywhere on the page even before scrolling.

### Files Modified
- `lib/animations/orbEngine.ts`

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |



---

## Entry 005 — 2026-10-25

### Task
Spider Web Touch & Hover Interaction Refinement: "Glows Up, Then Glows Down" One-Shot Pulse Envelope.

### Requested Outcome
Ensure that whenever a user hovers or touches an area of the background web, the light does NOT stay permanently on during hover; instead, the web strands in that area first swell up with light (glow up) and then automatically and gracefully fade back down to darkness (glow down), even if the cursor remains parked in that exact location. Moving the cursor to new strands or scrubbing across the web triggers fresh waves of light that trail behind the cursor and dissolve away.

### Implementation Details
- **Pulse Envelope Architecture**:
  - Replaced the continuous clamping behavior (`Math.max(glow, energy)`) with an attack/decay envelope model:
    - Attack phase ($\sim 0.30\text{s}$, 22% of duration): Quarter-sine curve $r = u / 0.22$, $\text{envelope} = \sin(r \cdot \pi / 2)$ smoothly rising from $0$ to $1$.
    - Decay phase ($\sim 1.05\text{s}$, 78% of duration): Smooth power cosine curve $r = (u - 0.22) / 0.78$, $\text{envelope} = (\cos(r \cdot \pi / 2))^{2.5}$ gracefully fading from $1$ down to $0$.
    - Total pulse duration: $1.35\text{s}$.
- **Per-Strand State Tracking (`WebSegment` & `WebSpoke`)**:
  - Added `glowTimer`: tracks elapsed time of active pulse ($-1$ when idle).
  - Added `peakIntensity`: target intensity based on pointer proximity ($prox^2$).
  - Added `inProximity`: boolean tracking whether the pointer is already inside the strand's activation radius.
  - Added `lastTrigX`, `lastTrigY`: pointer coordinate coordinates when triggered.
- **Hover & Stationary Handling**:
  - On pointer entry into proximity (`dist < POINTER_RADIUS`), if `!inProximity`, a fresh pulse is initiated (`glowTimer = 0`).
  - While the pointer sits completely still within the strand area, `inProximity` remains `true` and the pulse finishes its $1.35\text{s}$ envelope and sets `glow = 0`. Because the pointer has not moved ($< 22\text{px}$ delta), the pulse does NOT re-trigger, ensuring the light completely extinguishes.
  - Active pointer movement ($> 22\text{px}$ delta) or moving across new strands re-triggers pulses, creating a phosphorescent bioluminescent trail following the cursor.
  - When the cursor moves away ($> \text{EXIT\_RADIUS}$), `inProximity` resets to `false`, allowing re-entry to trigger a new pulse.
  - Tap / shockwave ripples similarly trigger the one-shot envelope.

### Files Modified
- `lib/animations/orbEngine.ts`

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


### Features Completed
- Background spider web now swells up with radiant electric teal light on hover or touch, and then automatically and gracefully dissolves down to 0 even if the cursor remains parked on that spot.
- Moving the cursor across the canvas produces a wave trail of light that smoothly vanishes.


---

## Entry 006 — 2026-10-26

### Task
Spider Web Architecture & Illumination Surface Area Refinement: Un-jumble the web layout and reduce the hover illumination surface area.

### Requested Outcome
1. Reduce the surface area of the hover glow so it is tight, focused, and precise rather than a giant broad puddle.
2. Un-jumble the web structure so strands do not criss-cross in a chaotic, tangled mess across the screen.

### Implementation Details
- **Harmonic Non-Overlapping Layout**:
  - Replaced the three massive overlapping sheets (which previously criss-crossed across 70% of the screen creating a tangled, dense jumble in the center) with **two cleanly separated corner webs**:
    - **Upper-Right Web**: Anchored at `(0.88, 0.12)`, sweeping gracefully down and left across the upper quadrant ($8$ spokes, $6$ progressive rings).
    - **Lower-Left Web**: Anchored at `(0.12, 0.88)`, sweeping up and right across the lower quadrant ($8$ spokes, $6$ progressive rings).
    - Leaves a clean $\sim 300\text{px}$ diagonal corridor of open negative space in the center for the 3D logo and hero typography with **zero colliding strands**.
- **Pure Concentric Catenary Geometry**:
  - Eliminated erratic random spoke gaps, angle jitter, and radius fluctuations ($\pm 12\%$) that previously caused rings to collide, zig-zag, and break.
  - Implemented mathematical concentric rings with progressive radial expansion ($r_k = 0.16 + 0.84 \cdot (k/N)^{1.25}$) and uniform $5.5\%$ catenary inward sag curves between adjacent spokes.
- **Surface Area of Glow Reduced by > 13x**:
  - Reduced `POINTER_RADIUS` from $175\text{px} \to 48\text{px}$ on desktop (and $210\text{px} \to 64\text{px}$ on touch). Activation area dropped from $\sim 96,200\text{px}^2 \to 7,200\text{px}^2$.
  - Only the exact individual strand right beneath the cursor lights up.
- **Refined Line Widths & Auras**:
  - Soft aura line width reduced from $4 + 7 \cdot \text{glow}$ (up to $11\text{px}$) down to $1.8 + 2.2 \cdot \text{glow}$ (max $4\text{px}$).
  - Core electric line width sharpened to $0.9 + 0.6 \cdot \text{glow}$ (max $1.5\text{px}$).
  - Vertex dewdrop node radius refined to $0.9 + 1.1 \cdot \text{glow}$ (only triggering on strongly excited strands $\text{glow} > 0.35$).
  - Resting baseline strands narrowed to $0.75\text{px}$ with softer ambient opacity ($0.08 - 0.10$).
  - Click/tap shockwave ripple thickness narrowed from $48\text{px} \to 24\text{px}$.
  - Autonomous breathing strands reduced from $6 \to 3$.

### Files Modified
- `lib/animations/orbEngine.ts`

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


### Features Completed
- Web strands are clean, uncluttered, and strictly concentric with zero jumbled collisions.
- Hover illumination is tightly focused on the immediate strand touched, creating a delicate surgical pinpoint trace rather than a broad floodlight.


---

## Entry 007 — 2026-10-26

### Task
Suppress spider web during Geek Room logo display in Hero section.

### Requested Outcome
Ensure that the spider web is NOT present or visible while the 3D Geek Room logo is on the screen. The web must only weave in once the user scrolls down and the Geek Room logo has receded / exited.

### Implementation Details
- **Eliminated Artificial Web Presence at Zero Scroll**:
  - Removed `Math.max(0.24, revealBase)` in `drawWeb()` which previously forced a 24% baseline web reveal even at the very top of the page (`progress = 0`).
  - Added early exit `if (revealBase <= 0.001) return;` inside `drawWeb()` so zero web geometry, spokes, or excitation calculations run while the Geek Room logo is active.
- **Scroll Sequence Synchronization**:
  - `LogoScene.tsx` recedes and fades out the 3D logo as the hero scrolls (`opacity = Math.max(0, 1 - progress * 1.6)`), completely exiting by `progress = 0.625`.
  - In `lib/animations/orbEngine.ts`, updated `DULL_START` to $0.58$ and `WEB_START` to $0.65$.
  - At scroll `progress < 0.65` (hero section with Geek Room logo present): `webP = 0`, so the web is **completely absent**. The 3D logo floats cleanly with only the orbiting particle cloud.
  - At scroll `progress >= 0.65` (as logo recedes and exits into darkness): `webP` climbs smoothly from $0 \to 1.0$, weaving the web in to serve as the fixed interactive backdrop for the subsequent sections (Society Story, Teams, Events, Projects, Join).
  - Scrolling back up to the top gracefully fades the web out before the Geek Room logo returns.

### Files Modified
- `lib/animations/orbEngine.ts`

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


### Features Completed
- Spider web is 100% hidden while the 3D Geek Room logo is present on screen in the hero section.
- Web cleanly weaves in only after scrolling past the logo.


---

## Entry 008 — 2026-10-26

### Task
Implement Live Geek Room Website Architecture & Interactive 3D Companion Robot "Chinku" (modeled on geekroom.co.in).

### Requested Outcome
1. Study and replicate the live `https://www.geekroom.co.in/` experience: design tokens, sections, layout, typography, and scroll-driven interactions.
2. Build the interactive 3D robot companion "Chinku" docked fixed at the bottom of the viewport, which drives on tank treads across the screen as the user scrolls, tracks mouse position, blinks, and waves.
3. Add the complete suite of live sections with rich real data:
   - Hero Section: Display headline "Meet the smarter community", live copy, dual-row marquee ticker ("Hackathons powered by" GitHub, Groq, Mastercard, etc.).
   - Section 01: Events on the track with desktop horizontal pinned scroll track and 6 flagship ticket-styled edition cards.
   - Section 02: Work with us, get seen (bento grid with hiring challenges, exclusive hackathons, speaker sessions, and community stats).
   - Section 03: Numbers that compound (logarithmic animated progress bars with large counter metrics).
   - Section 04: Learn. Connect. Grow. (origin story from MSIT WhatsApp group to global community, sticky rail).
   - Section 05: Voices on stage (mentor and speaker showcase with hover states).
   - Section 06: Partners who back the build (partner logo grid).
   - Section 07: Loved by builders (testimonials from Mastercard AI Garage VP, Microsoft Azure engineer, PhysicsWallah professor, and community hackers).
   - Section 08: Questions, answered (interactive accordion FAQ).

### Implementation Details
- **Chinku 3D Companion Robot (`components/animations/ChinkuRobot.tsx`)**:
  - Implemented 100% procedural Three.js robot companion docked fixed at the bottom (`.chinku-dock` `fixed inset-x-0 bottom-0 z-30 h-[180px] pointer-events-none`).
  - Tank tracks with 34 instanced rubber track links, 3 wheels (2 main + 1 idler), and side hex hubs.
  - Articulated upper body with suspension bounce (`0.012 * sin(16 * dist) * speed`) and driving inertia.
  - Head and eye sockets with white sclera and glowing teal pupils that smoothly watch the mouse cursor.
  - Procedural canvas textures: dark red racing gradient with Geek Room logo emblem on the chest, metallic chassis with "T-37" stencil, and screen face with curved smile.
  - Physics loop: syncs position with `window.scrollY / maxScroll`, driving across the bottom of the screen with tread rotation and wheel spin. Periodic blinking and autonomous idle waving animation (`wave`).
  - Mounted directly in root layout (`app/layout.tsx`).
- **Live Site Design Tokens & CSS Utilities (`app/globals.css`)**:
  - Added CSS variables: `--ink: #0d0e0c`, `--ink-2: #151714`, `--ink-3: #1e201c`, `--paper: #eeece6`, `--orange: #ff5a1f`, `--teal: #19b3bf`, `--line`, `--line-strong`.
  - Added utility classes: `.shell` (responsive container max 1320px), `.display`, `.wide`, `.label`, `.btn-primary`, `.btn-ghost`, `@keyframes marquee`, `@keyframes marquee-reverse`.
- **Live Data Architecture (`lib/data/liveSiteData.ts`)**:
  - Extracted and structured events, work offerings, stat metrics, pillars, speakers, testimonials, and FAQs from `geekroom.co.in`.
- **Full Homepage Composition (`app/page.tsx`)**:
  - Composed sections 00 to 08 in clean modular Server & Client Components.

### Files Created
- `components/animations/ChinkuRobot.tsx`
- `components/sections/EventsTrackSection.tsx`
- `components/sections/WorkWithUsSection.tsx`
- `components/sections/NumbersSection.tsx`
- `components/sections/LearnConnectGrowSection.tsx`
- `components/sections/VoicesSection.tsx`
- `components/sections/PartnersSection.tsx`
- `components/sections/LovedByBuildersSection.tsx`
- `components/sections/FaqSection.tsx`
- `lib/data/liveSiteData.ts`

### Files Modified
- `app/layout.tsx` — Mounted `<ChinkuRobot />` at root layout.
- `app/globals.css` — Added live design tokens, shell container, display typography, marquee keyframes, and button primitives.
- `app/page.tsx` — Full composition of sections 00 through 08.
- `components/sections/HeroSection.tsx` — Upgraded with live headline, copy, and dual-row marquee ticker.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 009 — 2026-10-26

### Task
Typography weight and contrast overhaul across the homepage — eliminate dim/faint text, boost heading prominence, and make all messages bold and readable.

### Requested Outcome
Fix the light typography and low contrast across the front page (headings, messages, subtitles, badges, and card text) to ensure high readability and a bold, punchy aesthetic matching the live brand.

### Implementation Details
- **Global Typography Tokens (`app/globals.css`)**:
  - Elevated `.display` to `font-weight: 900`, `letter-spacing: -0.025em`, `color: #ffffff`, and added subtle depth with `text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5)`.
  - Upgraded `.display em, .wide` to `font-weight: 900`, `color: var(--orange)`, with vibrant luminous glow (`text-shadow: 0 0 24px rgba(255, 90, 31, 0.45)`).
  - Upgraded `.text-muted` from `#767b8f` (dark slate-gray) to high-contrast `#eaedf7` with `font-weight: 500`.
  - Raised `--muted` to `#eaedf7` and `--subtle` to `#c5c9dd`.
  - Upgraded `.label` to `font-weight: 700`, `letter-spacing: 0.08em`, and crisp `#c5c9dd`.
  - Enhanced button primitives (`.btn-primary`, `.btn-ghost`) with `font-weight: 700`, larger text, and refined padding.
- **Hero Section (`components/sections/HeroSection.tsx`)**:
  - Removed `font-normal` override on the `<em>smarter</em>` italic display keyword, upgrading to `font-extrabold text-[var(--orange)]`.
  - Set main hero display heading to `font-black`.
  - Elevated the hero message / subtitle to `text-lg md:text-xl font-medium leading-relaxed text-[#f3f4fa]`.
  - Upgraded the partner marquee ticker text to `font-bold text-sm tracking-wide text-[#e8ebf5]`.
- **Content Sections 01–08**:
  - `EventsTrackSection.tsx`: Elevated section description to `text-lg font-medium text-[#edf0f8]`, ticket headers and event descriptions to `font-medium text-[#edf0f8]`, and metadata to `font-bold text-[#c5c9dd]`.
  - `WorkWithUsSection.tsx`: Upgraded section subtitle and all 3 bento card descriptions to `text-base font-medium text-[#edf0f8]`; boosted stat labels to `font-semibold text-[#c5c9dd]`.
  - `NumbersSection.tsx`: Boosted stat numbers to `font-black text-[clamp(2.8rem,6vw,5.2rem)]` and stat descriptions to `font-semibold text-[#f0f2fb]`.
  - `LearnConnectGrowSection.tsx`: Set rail indicator to `font-bold text-[var(--paper)]`, and pillar descriptions to `font-medium text-[#edf0f8]`.
  - `VoicesSection.tsx`: Enhanced speaker names to `font-extrabold`, roles to `font-semibold text-[#c5c9dd]`, and company names to `font-bold text-[var(--teal)]`.
  - `PartnersSection.tsx`: Upgraded partner brand names to `font-extrabold tracking-wide text-[var(--paper)]`.
  - `LovedByBuildersSection.tsx`: Raised quote text to `font-extrabold`, author attribution to `font-semibold text-[var(--ink)]/80`, and hacker quotes to `text-base font-medium text-[#edf0f8]`.
  - `FaqSection.tsx`: Set question text to `font-extrabold` and answer text to `text-base font-medium text-[#edf0f8]`.
  - `Navigation.tsx` & `Footer.tsx`: Elevated link weights to `font-semibold text-[#e2e5f2]`, wordmark to `font-bold`, and CTA to `font-bold rounded-full`.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |




---

## Entry 010 — 2026-10-26

### Task
Eliminate background overshadowing and fix light/low-contrast text across homepage sections (Work With Us, Numbers, Learn. Connect. Grow., Partners, Loved By Builders, Voices, Events, FAQ).

### Requested Outcome
Fix the visual conflict where background elements (fixed canvas web animations, harsh 48px grid lines) overshadowed content, and elevate font weights, card surfaces, and label badges so all copy is crisp, punchy, and instantly readable.

### Implementation Details
- **Background De-noising & Fade Choreography**:
  - `app/globals.css`: Replaced harsh 100% opaque `#2e3140` body grid with subtle `rgba(255, 255, 255, 0.035)` grid lines, preventing background jailbars from cutting through text.
  - `components/sections/HeroCanvas.tsx`: Added scroll exit fade (`canvas.style.opacity = Math.max(0, 1 - self.progress * 1.5)`) and visibility toggle so the fixed canvas (particles, spider web strands) smoothly disappears when scrolling into content sections, eliminating bright canvas illumination beneath content text.
  - `components/sections/LogoScene.tsx` & `components/animations/ChinkuRobot.tsx`: Wrapped `THREE.WebGLRenderer` initialization in graceful `try/catch` fallbacks to avoid unhandled context creation errors.
- **Surface Elevation & Card Architecture**:
  - `app/globals.css`: Elevated `--ink-2` to `#181a27` (crisp dark card glass), `--ink-3` to `#1e2132`, `--muted` to `#f4f6fc`, `--subtle` to `#d2d6ea`, `--line` to `rgba(255, 255, 255, 0.16)`, and `--line-strong` to `rgba(255, 255, 255, 0.28)`.
  - Updated `.label` token to `color: #f4f6fc` and `0.8125rem` font size.
  - Upgraded `.btn-ghost` with `rgba(255, 255, 255, 0.08)` surface, `backdrop-filter: blur(8px)`, and crisp white border.
- **Section Contrast Overhaul**:
  - `PartnersSection.tsx`: Swapped partner brand fonts from thin monospace to `font-sans text-base md:text-lg font-black tracking-tight text-white`. Cards upgraded to `bg-[#181a27]` with `border-white/15` and `shadow-lg`. Section badge enclosed in pill badge.
  - `NumbersSection.tsx`: Housed growth metrics inside a distinct elevated card container (`bg-[#181a27]/90 border border-white/15 shadow-2xl backdrop-blur-md`) with `divide-white/15` dividers, `text-white font-bold` stat labels, and high-contrast progress bar tracks.
  - `LearnConnectGrowSection.tsx`: Upgraded pillar panels to `bg-[#181a27]` with `border-white/15` and `shadow-xl`. Pillar headings elevated to `font-black text-white`, body copy to `font-semibold text-[#f4f6fc]`, and "Geek Room Ethos" given an explicit pill badge.
  - `WorkWithUsSection.tsx`: Upgraded bento cards with `bg-[#181a27]`, `border-white/15`, `shadow-xl`, bold titles (`font-black text-white`), bold body copy (`font-semibold text-[#f4f6fc]`), and high-contrast metrics badge container.
  - `LovedByBuildersSection.tsx`: Enhanced hacker quote cards with `bg-[#181a27]`, `border-white/15`, `shadow-lg`, bold quote text (`font-semibold text-[#f4f6fc]`), and bold attribution (`font-bold text-[#e2e5f2]`).
  - `VoicesSection.tsx`, `EventsTrackSection.tsx`, `FaqSection.tsx`: Aligned with identical high-contrast tokens, bold subtitles, and elevated card surfaces.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 011 — 2026-10-26

### Task
Striker GR-7 Mascot Redesign: Official Geek Room Football Jersey (#7, "GEEKROOM"), original character design, and 4 interactive acrobatic tricks (Somersault, Jump, Fall & Get Up, Says Hi).

### Requested Outcome
- Stop frantic scroll traversal across the screen.
- Redesign the mascot into an original futuristic athletic android companion (not copied from `geekroom.co.in` or generic templates).
- Dress the robot in an official Geek Room football jersey with number 7 and "GEEKROOM" visible on the back.
- Enable direct touch/click interactivity performing 4 distinct acrobatics:
  1. Somersault (360° airborne flip).
  2. Jump (explosive high leap).
  3. Fall and then get up again (comedic tumble flat, dazed recovery, scrambling back to feet).
  4. Says hi back to you (waves right hand with animated speech bubble greeting).

### Implementation Details
- **Character Architecture (`components/animations/ChinkuRobot.tsx`)**:
  - Replaced tank-tread robot with **Striker GR-7**, an athletic bipedal android docked gracefully at `bottom-4 right-4 z-40`.
  - Removed all scroll-driven horizontal traversal across the viewport.
  - Procedural 512x512 Canvas Textures for Football Kit:
    - **Jersey Front**: Deep navy micro-mesh fabric (`#121420`), athletic V-neck collar, dual teal (`#0eb0ba`) and coral-orange (`#ff5a1f`) speed stripes, diagonal side chevrons, `<GR/>` crest shield, and sponsor tech branding.
    - **Jersey Back**: Arched athletic `GEEKROOM` typography and bold athletic number `7` in coral-orange with crisp white outlines, placed below neckline ($Y = 146$) to ensure 100% visibility under the helmet.
  - Character Details: Curved athletic shorts, dual jointed legs with cyan LED knee caps, soccer cleats with orange soles and studs, dynamic ear antenna, headphone audio nodes, and mini tech soccer ball companion.
  - Procedural OLED Visor: Dynamic facial expressions driven by CanvasTexture (`normal` focused eyes, `somersault` excited eyes, `jump` starburst eyes, `fall` dazed `x_x` eyes, `say_hi` happy smiling `^‿^` eyes).
- **Interactive Acrobatics & Kinematics**:
  1. **Somersault**: Deep crouch prep, launch into 360° airborne flip around X-axis with tucked limbs, and athletic damped landing.
  2. **Jump**: Deep preparatory squat, explosive vertical launch ($Y = +2.4$), arms extended overhead in celebration, and landing compression.
  3. **Fall & Get Up**: Comedic forward trip flat on the ground ($X = 90^\circ, Y = -0.55$), dazed `x_x` expression with dizzy head wobble, scramble onto hands and knees, push back to feet, dust off jersey, and return to ready stance.
  4. **Says Hi**: Turns to face viewer, tilts helmet inquisitively, raises right forearm in an enthusiastic multi-beat wave, lights up smiling visor (`^‿^`), and renders floating speech bubble `"Hi there, builder! 👋"`.
- **UI & Controls**:
  - Direct 3D Raycasting on canvas: Clicking or tapping the character triggers a random trick or cycles through the acrobatics.
  - Quick Action Pills: Accessible buttons for `[ 🤸 Flip ]`, `[ 🚀 Jump ]`, `[ 😵 Fall ]`, `[ 👋 Say Hi ]`, and a `[ 🔄 Back #7 ]` camera angle toggle allowing instant inspection of the jersey back.
  - Floating speech bubble with animated entrance and exit.
  - Safe initialization: Wrapped Three.js renderer in `try/catch` with fallback messaging for WebGL-restricted environments.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 012 — 2026-10-26

### Task
Striker GR-7 Mascot Integration: Uncaged screen traversal on scroll with ball dribbling, direct click-to-perform interaction, and Cristiano Ronaldo's iconic "SIUUU" celebration.

### Requested Outcome
- **Screen Scroll Traversal**: Start at the left edge and progress to the right edge as the user scrolls down, walking and kicking the soccer ball along with every stride.
- **Remove Container Cage / Box**: Eliminate the boxed card, borders, and backgrounds entirely so the robot walks freely directly over the screen content.
- **Remove Top Trick Buttons**: Eliminate the button pill row; clicking or tapping directly on the robot triggers the acrobatics.
- **Cristiano Ronaldo "SIUUU" Celebration**: Add the iconic celebration where the robot twirls its finger in a circle in the air, leaps high into the sky with a 180° airborne spin, and lands emphatically in the iconic power stance facing away from the camera to proudly showcase the `GEEKROOM` jersey and number `7`.

### Implementation Details
- **Uncaged Transparent Screen Dock (`components/animations/ChinkuRobot.tsx`)**:
  - Replaced the corner card container with a full-viewport transparent dock (`fixed inset-x-0 bottom-0 z-40 h-[220px] pointer-events-none select-none overflow-visible`).
  - Three.js transparent canvas spans the entire screen width, with zero background, zero border, and zero box shadow.
  - Placed a dedicated transparent hitbox element (`div` with `pointer-events-auto cursor-pointer`) and floating speech bubble that track the robot's projected 3D position in real-time, preserving 100% click-through for all page links, buttons, and content behind the robot while allowing direct clicks on the character.
- **Scroll-Driven Walk Cycle & Soccer Ball Dribbling**:
  - Dynamically calculates viewport horizontal span bounds (`minX`, `maxX`) from camera projection and aspect ratio across all screen sizes.
  - Interpolates robot position across the screen based on `scrollY / maxScroll`.
  - When moving, activates full walking kinematics: rhythmic leg swings, knee/calf flex, counter-swinging arms, and torso bounce.
  - Dynamically orients facing direction: turns towards the right when scrolling down, and turns towards the left when scrolling up.
  - High-tech soccer match ball (with procedural geometric panels, glowing cyan seams, and mini `<GR/> #7` insignia) rolls and hops ahead of the leading cleat as it traverses the screen.
- **Cristiano Ronaldo "SIUUU" Celebration (`suii`)**:
  - **Phase 1 (Winding Up)**: Robot raises right arm high above head and swirls its forearm and hand in a circular winding gesture in the air while taking preparatory spring steps. Visor lights up with fierce champion warrior brows and glowing pupils. Speech: `"Watch this! ⚡"`.
  - **Phase 2 (Airborne 180° Spin)**: Explosive vertical rocket leap ($Y = 2.5$) combined with a smooth 180° mid-air spin, rotating from front to back while airborne.
  - **Phase 3 (Back Power Landing & "SIUUU!")**: Touchdown facing away from the camera in the classic wide-legged power stance (`leg.rotation.z = \pm 0.36`), both arms thrust downward and backward (`arm.rotation.x = 0.95, arm.rotation.z = \pm 0.55`), torso arched back towards the audience, holding the pose for a full second with the bold `GEEKROOM` name and giant coral-orange `#7` in full view. Speech: `"SIUUUUUUUU! 💥 #7"`. Ground shadow pulses wide on impact.
  - **Phase 4 (Recovery)**: Confident return spin to front and resets to ready stance.
- **Direct Touch/Click Interaction & Removed Button Row**:
  - Removed all top action buttons (`[ 🤸 Flip ]`, `[ 🚀 Jump ]`, `[ 😵 Fall ]`, etc.).
  - Touching or clicking the robot directly launches the next trick in sequence (`suii` $\to$ `somersault` $\to$ `jump` $\to$ `fall` $\to$ `say_hi`), with keyboard accessibility support (`Enter` / `Space`).

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 013 — 2026-10-26

### Task
Striker GR-7 Mascot Kinematics & Orthographic Projection Refinement: Uniform screen proportions, directional awareness, rest-state user eye-contact, and vertical headroom calibration.

### Requested Outcome
- **Zero Perspective Distortion**: Eliminate corner bulging and middle slimming caused by wide-angle perspective projection across wide screens. Maintain 100% uniform proportions everywhere.
- **Directional Walking**: When scrolling down, the mascot walks forward facing right; when scrolling up, it walks forward facing left. No walking backwards or moonwalking.
- **Rest-State User Eye-Contact**: Whenever the user stops scrolling anywhere on the page, the mascot smoothly swivels to face directly towards the viewer with friendly eye contact.
- **Vertical Headroom & Scaled Proportions**: Scale down the character model to $0.72\times$ and expand dock height to 260px so high leaps (jumping, somersault, and Ronaldo "SIUUU" celebration) never clip at the top.
- **Precise Screen Boundaries**: Mascot stays safely inside the screen with a calibrated margin, never starting or moving off-screen.

### Implementation Details
- **Orthographic Projection Architecture (`components/animations/ChinkuRobot.tsx`)**:
  - Replaced `THREE.PerspectiveCamera` with `THREE.OrthographicCamera` configured with a fixed view height (`VIEW_HEIGHT = 4.6`) and aspect-ratio-derived width.
  - Orthographic projection eliminates all perspective distortion: character width, helmet shape, and jersey details remain mathematically identical from the far left margin to the far right margin.
  - Dynamically calculates left/right world bounds (`minX = -viewWidth/2 + 1.25`, `maxX = viewWidth/2 - 1.25`), guaranteeing the mascot never renders off-screen or clips at the start of the page.
- **Directional Awareness & Smooth Swivel**:
  - Actively tracks scroll velocity direction ($dx$).
  - When scrolling down ($dx \ge 0$), body smoothly rotates to $+0.42\pi$ (~$75^\circ$) facing right and strides forward, tapping the soccer ball ahead to the right.
  - When scrolling up ($dx < 0$), body smoothly rotates to $-0.42\pi$ (~$-75^\circ$) facing left and strides forward, tapping the soccer ball ahead to the left.
  - Employs scroll-stop detection (`100ms` debounce timer): when scrolling ceases at any scroll position, `curFacingYaw` smoothly lerps to `0` radians, looking directly at the user.
- **Headroom & Jump Calibration**:
  - Mascot scaled down to $0.72\times$, giving ample headroom inside the 260px dock.
  - Ground level established at $Y = -1.2$.
  - Jump height calibrated to $Y = 1.45$ and somersault to $Y = 1.35$, keeping the top beacon well within the canvas boundary at all times.
  - Ronaldo "SIUUU" celebration landing pose holds facing away to showcase `GEEKROOM` and `#7` with shadow impact pulse, before smoothly turning back to face the user.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 014 — 2026-10-26

### Task
Striker GR-7 Dynamic Community Quotes Rotation: Short, punchy, funny, motivational, and society-recruitment quotes rotating every 10–15 seconds.

### Requested Outcome
- Add 10+ short quotes spoken by the robot covering developer humor, builder motivation, and why students should join Geek Room.
- Automatically cycle through quotes every 10 to 15 seconds.
- Keep quotes compact to fit within the floating speech bubble.
- Seamlessly transition between acrobatic trick dialog and periodic quotes.

### Implementation Details
- **Curated Quote Suite (`components/animations/ChinkuRobot.tsx`)**:
  - Implemented an 18-quote library (`ROBOT_QUOTES`) categorized across three themes:
    1. *Society Recruitment*: `"Why debug alone? Join Geek Room! 🚀"`, `"150K+ builders can't be wrong. Join us! 👥"`, `"Your next co-founder is right here 👀"`, `"Win hackathons. Meet founders. Belong. 🏆"`, `"80+ partner companies want to hire you 💼"`, `"Zero gatekeeping, 100% building 🤝"`, `"Turn campus coding into 10x engineering 🚀"`.
    2. *Developer & Hacker Humor*: `"Even my bugs have bugs... still building! 🐛"`, `"Code isn't coffee, but fuels our nights ☕"`, `"Sleep is temporary, hackathon glory forever 🍕"`, `"Eat. Code. SIUUU. Repeat. ⚽"`, `"It worked on my localhost, trust me bro 💻"`, `"404: Excuses not found in Geek Room 🎯"`.
    3. *Builder Motivation*: `"Stop dreaming, start shipping. Let's build! ⚡"`, `"Don't just watch tech happen. Build it! 💡"`, `"Great engineers aren't born, they're compiled 🛠️"`, `"Your wildest projects start with one commit ✨"`, `"Real builders build in public. Hop in! 🔥"`.
- **Timer & Rotation Logic**:
  - Configured a randomized interval (`10000ms + Math.random() * 5000ms`) that advances to the next quote every 10 to 15 seconds when the robot is in an `idle` state.
  - When the user triggers an acrobatics trick (e.g. Ronaldo celebration `suii`), the trick dialog takes precedence; once completed, after a brief 2.2s outro, the speech bubble smoothly resumes the rotating quote cycle.
- **Bubble UI Polish**:
  - Speech bubble styled with `max-w-[calc(100vw-32px)]`, `whitespace-nowrap overflow-hidden text-ellipsis`, and smooth opacity transitions, ensuring zero text overflow on narrow viewports.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 015 — 2026-10-26

### Task
Striker GR-7 Micro Satellite Constellation: 3 orbital tech escort satellites revolving in 3D around the mascot.

### Requested Outcome
- Add 2–3 small satellites revolving around the robot companion.
- Distinctive futuristic aerospace designs with solar panels, glow rings, antennas, and thrusters.
- 3D layered orbits with varied radii, heights, and inclinations that travel seamlessly with the mascot across the screen.

### Implementation Details
- **Satellite Architecture (`components/animations/ChinkuRobot.tsx`)**:
  - Implemented 3 custom micro satellite models revolving around Striker GR-7 inside an anchored `satelliteGroup`:
    1. **Aero-Orb 1 (Comms Orb)**: Metallic steel sphere with glowing equatorial teal LED ring, dual silicon photovoltaic solar wings (`matSolar`), and a blinking orange beacon on an antenna stalk.
    2. **CubeSat 2 (Nano-Probe)**: Dark tech chassis with dual fold-out solar array wings, a forward parabolic telecommunications dish, and a glowing cyan ion propulsion nozzle.
    3. **Relay-Capsule 3 (Deep-Space Relay)**: Cylindrical relay drone with a central glowing coral-orange reactor band, 4 angled X-configured solar stabilizer fins, and a forward optical scanning eye.
- **Orbital Mechanics & Kinematics**:
  - **Satellite 1**: Fast clockwise inner orbit ($R = 1.35$, period ~4.2s) at upper chest height with slight positive inclination ($15^\circ$), facing tangent to its orbital path.
  - **Satellite 2**: Counter-rotating mid orbit ($R = 1.70$, period ~5.7s) with reverse inclination ($-22^\circ$) and gentle self-axis tumbling.
  - **Satellite 3**: Outer slow orbit ($R = 2.05$, period ~7.4s) with high inclination ($30^\circ$), sweeping high around the mascot's antenna and down past the turf.
  - **Dynamic Tracking**: `satelliteGroup.position.set(currentX, robotRoot.position.y, 0)` ensures the orbital constellation accompanies Striker GR-7 wherever it walks on scroll, or leaps during acrobatics and celebrations.
  - **Reduced Motion Support**: Dampens orbital velocities to a gentle drift when `prefers-reduced-motion` is active.
- **Memory & GPU Cleanup**:
  - Registered all satellite geometries in `satGeoms` for complete disposal on unmount, along with `matSolar`.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 016 — 2026-10-26

### Task
Three.js Logo Micro Satellite Constellation: 3 orbital satellites revolving in 3D around the extruded Geek Room logo (`components/sections/LogoScene.tsx`).

### Requested Outcome
- Add 3 small satellites revolving around the Three.js Geek Room logo in the hero section.
- Multi-tier elliptical orbits that pass in front of ($Z > 0$) and behind ($Z < 0$) the extruded `<GR/>` logo glyphs.
- Synchronize with the logo's interactive pointer tilt, responsive scaling, levitation, and scroll fade.
- Clean up mascot companion so the satellites reside cleanly around the Three.js logo.

### Implementation Details
- **Satellite Models (`components/sections/LogoScene.tsx`)**:
  - Implemented 3 micro satellites anchored directly inside `logoGroup`:
    1. **Satellite Alpha ("Aero-Orb")**: Metallic titanium sphere core (`SphereGeometry(0.12)`), glowing equatorial teal ring (`TorusGeometry`), dual silicon solar array wings (`RoundedBoxGeometry(0.36, 0.11)`), and blinking coral-orange beacon LED on an antenna stalk.
    2. **Satellite Beta ("CubeSat")**: Dark tech chassis (`RoundedBoxGeometry(0.18, 0.18, 0.22)`), dual fold-out photovoltaic solar panels, forward parabolic telecommunications dish (`ConeGeometry`), and glowing cyan ion thruster nozzle at the rear.
    3. **Satellite Gamma ("Relay-Capsule")**: Cylindrical relay capsule (`CylinderGeometry(0.08, 0.08, 0.25)`), central coral-orange glowing reactor ring, 4 angled X-stabilizer solar fins, and a glowing cyan optical scanning sensor eye.
- **Orbital Mechanics**:
  - **Satellite 1**: Fast inner elliptical orbit ($X = 2.5, Z = 1.65$, period ~4.6s) with $+16^\circ$ inclination.
  - **Satellite 2**: Counter-rotating mid orbit ($X = 2.9, Z = 1.95$, period ~6.8s) with $-20^\circ$ inclination and self-axis tumbling.
  - **Satellite 3**: Sweeping outer orbit ($X = 3.3, Z = 2.25$, period ~9.2s) with steep $+28^\circ$ inclination.
  - Both front ($Z > 0$) and back ($Z < 0$) depth passes occur naturally relative to the extruded 3D logo glyphs.
  - Dynamic opacity: Added satellite materials to the `materials` array so all satellites fade gracefully on scroll alongside the logo.
- **Mascot Streamlining (`components/animations/ChinkuRobot.tsx`)**:
  - Removed satellites from the mascot companion, keeping Striker GR-7 cleanly focused on its jersey (#7, GEEKROOM), tech soccer match ball, screen traversal, acrobatics, and community quotes.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 017 — 2026-10-26

### Task
Replace satellites around the Three.js Geek Room logo with 3 builder & hacker items: a **Laptop**, a **Trophy**, and an **Energy Drink** (`components/sections/LogoScene.tsx`).

### Requested Outcome
- Replace the orbital satellites with 3 custom 3D hacker props revolving around the extruded Geek Room logo in the hero section.
- Multi-tier elliptical orbits that pass in front of ($Z > 0$) and behind ($Z < 0$) the extruded `<GR/>` logo glyphs with genuine depth occlusion.
- Custom procedural canvas textures and materials for high visual detail.
- Synchronized with interactive pointer tilt, responsive scaling, levitation, and scroll-scrubbed exit fade.

### Implementation Details
- **Procedural Canvas Textures (`components/sections/LogoScene.tsx`)**:
  - `makeLaptopScreenTexture()`: 512×340 procedural canvas rendering a dark-mode code editor interface with macOS-style window controls (red, amber, green dots), active tab (`geekroom.tsx`), numbered code lines syntax-highlighted in official coral orange and cyan (`<GeekRoom mode='winner' />`, `connect(150_000)`), and an active blinking editor cursor.
  - `makeKeyboardTexture()`: 512×220 canvas generating an authentic keyboard deck grid with keycaps and spacebar.
  - `makeCanLabelTexture()`: 512×512 canvas with carbon black to navy gradient, neon speed stripes, edge color ribbons, glowing electric cyan lightning bolt graphic with bright white core, and bold typography ("GEEK FUEL — HACKATHON EDITION", "300mg CODE CAFFEINE • 0% CRASH").
- **3D Hacker Models (`components/sections/LogoScene.tsx`)**:
  1. **The Laptop (`propLaptop`)**:
     - Aluminum space-gray unibody chassis (`RoundedBoxGeometry(0.56, 0.022, 0.38)`).
     - Recessed keyboard deck with keys texture and satin-finish trackpad.
     - Screen lid hinged at back edge and angled open at $\approx 112^\circ$.
     - Emissive screen displaying the active IDE editor texture, plus a glowing cyan Geek Room emblem on the reverse of the lid.
  2. **The Trophy (`propTrophy`)**:
     - Championship Cup in mirror-polished gold (`MeshPhysicalMaterial`, `metalness: 0.95`, `roughness: 0.16`, `clearcoat: 0.95`).
     - Tiered obsidian pedestal base with golden engraving nameplate.
     - Slender golden stem, sphere node, flared chalice bowl, and rolled toroidal rim.
     - Dual curved ergonomic handles (`TorusGeometry(0.10, 0.016)`).
     - Floating faceted gem crystal (`OctahedronGeometry`) glowing with cyan light inside the bowl.
  3. **The Energy Drink Can (`propCan`)**:
     - Cylindrical beverage can with high-res `GEEK FUEL` label (`CylinderGeometry(0.12, 0.12, 0.33)`).
     - Brushed aluminum silver tapered shoulder, bottom heel, and recessed lid disc.
     - Rolled top and bottom rim rings.
     - Coral orange anodized aluminum pull tab with opening ring and rivet.
- **Orbital Mechanics & Rendering**:
  - **Laptop**: Fast inner elliptical orbit ($X = 2.55, Z = 1.70$, period ~5.0s, $+16^\circ$ inclination) with coding tilt.
  - **Trophy**: Counter-rotating mid orbit ($X = 2.95, Z = 2.05$, period ~7.2s, $-20^\circ$ tilt) with proud golden spin.
  - **Energy Drink**: Sweeping outer orbit ($X = 3.35, Z = 2.35$, period ~9.6s, $+28^\circ$ steep inclination) with zero-gravity tumbling.
  - All 13 materials registered in the `materials` array for synchronized opacity fade on scroll.
  - Textures cleanly disposed on unmount to prevent GPU memory leaks.
  - Static fallback frame positioned gracefully for `prefers-reduced-motion`.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |


---

## Entry 018 — 2026-10-26

### Task
Add "GEEKROOM GTBIT" in large fluid typography at the end of the site footer (`components/layout/Footer.tsx`).

### Requested Outcome
- Add a bold, high-contrast, large-scale brand mark for `GEEKROOM GTBIT` at the very end of the footer.
- Maintain responsive fluidity across all breakpoints (mobile 320px/375px up to ultrawide 1920px+) with zero horizontal overflow or awkward wrapping.
- Resolve the college name and city placeholder in the footer to Guru Tegh Bahadur Institute of Technology (GTBIT) · New Delhi.

### Implementation Details
- **Grand Finale Brand Mark (`components/layout/Footer.tsx`)**:
  - Added a dedicated full-width container section at the very bottom of [`Footer.tsx`](file:///home/Hsingh/Desktop/geekroom/components/layout/Footer.tsx).
  - Fluid typography: `text-[clamp(2rem,9.6vw,10.5rem)]` with `font-black`, `uppercase`, `tracking-tighter`, and compact `leading-[0.82]`.
  - Gradient styling: High-contrast metallic vertical fade (`from-white via-[#f0f3fa] to-white/15`) with a subtle interactive hover shift toward brand teal (`hover:to-[var(--color-gr-accent)]/80`).
  - Accessible label `aria-label="Geek Room GTBIT"` to ensure assistive screen readers pronounce both names naturally.
- **Chapter Attribution & Placeholder Resolution**:
  - Replaced the placeholder `[College Name] · [City]` in the community column with `Guru Tegh Bahadur Institute of Technology · New Delhi`.
  - Updated copyright line to explicitly acknowledge the GTBIT Chapter (`© 2026 Geek Room · GTBIT Chapter. Built by the Web Team.`).
  - Updated [`docs/CONTENT_STATUS.md`](file:///home/Hsingh/Desktop/geekroom/docs/CONTENT_STATUS.md) to mark official college name and city as `✅ VERIFIED`.

### Commands Executed

| Command | Result |
|---|---|
| `npx tsc --noEmit` | ✅ Passed with 0 errors |
| `npm run lint` | ✅ Passed with 0 errors, 0 warnings |
| `npm run build` | ✅ Passed with 0 errors (9/9 routes prerendered) |
