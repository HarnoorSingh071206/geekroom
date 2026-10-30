# Geek Room — Architecture & Design Decisions

> **Format:** Each entry records a significant decision. Minor coding choices are not recorded here.
> Entries are not deleted — if a decision changes, add a new entry that supersedes it.

---

## Decision 001 — 2026-10-25
**Framework: Next.js 16 with App Router**

**Context:** New project, empty workspace. Need a React-based framework with good TypeScript support, routing, and server components.

**Decision:** Next.js 16 with App Router.

**Alternatives considered:**
- Remix — solid, but smaller ecosystem for the features planned (Three.js, complex animations)
- Vite + React — no SSR, routing requires additional setup
- Astro — excellent for static, but animations and interactive features favor React

**Reasoning:** Next.js App Router provides server components by default (better performance), built-in routing, image optimization, font optimization, and TypeScript support. The team has familiarity with it. The App Router's server-first model matches our use case — mostly server-rendered content with islands of client-side animation.

**Consequences:** Must follow App Router conventions. `"use client"` directive required for components using browser APIs, state, or animation libraries. `LayoutProps<'/'>` type helper is available from Next.js 16.

**Status:** Final.

---

## Decision 002 — 2026-10-25
**Styling: Tailwind CSS v4 with CSS-first configuration**

**Context:** create-next-app installed Tailwind CSS v4. This is a breaking change from v3 — no `tailwind.config.js`; all configuration lives in `app/globals.css` via `@theme`.

**Decision:** Accept Tailwind v4. Use `@theme` in `globals.css` for all design tokens.

**Alternatives considered:**
- Downgrade to Tailwind v3 — unnecessary; v4 is stable and the CSS-first approach is cleaner
- CSS Modules — more verbose for the design system we're building
- Emotion / styled-components — bundle cost not justified

**Reasoning:** Tailwind v4 `@theme` allows us to define all design tokens in a single CSS file, making the design system transparent and easy for any developer to read. Custom properties cascade naturally. The token names (`--color-gr-accent`, etc.) are descriptive and unambiguous.

**Consequences:** All agents must use `--color-gr-*` CSS custom properties from `globals.css`. Never scatter raw hex values in components. No `tailwind.config.js` file exists or should be created.

**Status:** Final.

---

## Decision 003 — 2026-10-25
**Animation: Motion for React as primary animation library**

**Context:** The product vision requires high-quality animations. Multiple libraries are available.

**Decision:** Motion for React (the `motion` package) is the primary animation library. GSAP is reserved for complex timelines where Motion is insufficient. Three.js/React Three Fiber is reserved for 3D-specific use cases.

**Alternatives considered:**
- Framer Motion — `motion` is the rebranded continuation; same team, same API
- GSAP only — excellent for timelines, but less ergonomic for React state-driven animations
- CSS animations — insufficient for the complex, data-driven interactions planned
- React Spring — solid but Motion is a superset and more familiar to the team

**Reasoning:** Motion for React integrates naturally with React's rendering model. `useReducedMotion()` is built in. `AnimatePresence` handles mount/unmount. `layoutId` handles shared layout transitions. GSAP ScrollTrigger will be added only when Milestone 3 scroll sequences exceed Motion's capabilities.

**Consequences:** GSAP and Three.js are NOT installed in Milestone 0. Install them only at the milestone that specifically requires them. Document the installation in `IMPLEMENTATION_LOG.md`.

**Status:** Final.

---

## Decision 004 — 2026-10-25
**Content architecture: Static data files, no database**

**Context:** The site is primarily informational — teams, events, projects, social links. A database would add unnecessary complexity and infrastructure cost.

**Decision:** All content lives in `lib/data/*.ts` files. TypeScript provides type safety. No database, ORM, or CMS is introduced.

**Alternatives considered:**
- Headless CMS (Contentful, Sanity) — good for non-technical editors; overkill for current team
- Database (Postgres/Supabase) — no requirement that justifies it
- MDX files — useful for blog-like content; not needed yet

**Reasoning:** The website is maintained by student developers who are comfortable with TypeScript. Editing a typed data file is simpler and more reliable than managing a CMS for a team of this size. This can be changed if the content editing requirement changes.

**Consequences:** Updating content requires a code change and redeployment. Acceptable for the current team. If non-technical members need to update content frequently, migrating to a CMS is the recommended escalation path.

**Status:** Final for Milestones 0–3. Revisit after launch.

---

## Decision 005 — 2026-10-25
**Dark-only color scheme**

**Context:** The design direction specifies dark backgrounds as a primary characteristic.

**Decision:** The website is dark-only for the initial launch. No light mode toggle is implemented.

**Alternatives considered:**
- Dark default + light toggle — adds development complexity; not a Milestone 0 requirement
- System preference auto-switch — requires parallel design system; not warranted yet

**Reasoning:** Dark mode is central to the Geek Room visual identity (dark backgrounds, lime accent, grid lines). Implementing a coherent light mode requires separate design decisions. This is deferred to avoid premature complexity.

**Consequences:** The `globals.css` does not include light mode `@media (prefers-color-scheme: light)` overrides. The `colorScheme: "dark"` viewport setting is set in layout. If a light mode is added later, design tokens must be extended.

**Status:** Provisional — defer light mode to post-launch if requested.

---

## Decision 006 — 2026-10-25
**Package manager: npm**

**Context:** Node.js 24 / npm 11 detected on the system. create-next-app defaulted to npm.

**Decision:** npm. No migration to pnpm or yarn.

**Reasoning:** npm is available, familiar, and sufficient. Switching package managers adds no value for the current team size.

**Status:** Final.

---

## Decision 007 — 2026-10-25
**No authentication, database, or backend in initial scope**

**Context:** The product requirements do not include user accounts, dynamic data, or server-side mutation.

**Decision:** No auth, no database, no custom API routes in Milestones 0–2.

**Exceptions:** A form submission endpoint may be added to the Join page via an external service (Formspree, Resend, or similar). This is an integration, not a backend.

**Reasoning:** Introducing auth or a database without a clear product requirement creates unnecessary complexity, security surface, and maintenance burden for student developers.

**Status:** Final for Milestones 0–2. Revisit if membership management, event registration, or challenge tracking requires user identity.

---

## Decision 008 — 2026-10-25
**Turbopack enabled for development**

**Context:** create-next-app offered Turbopack as the development bundler. Next.js 16 supports it via the `--turbopack` flag.

**Decision:** Enable Turbopack for development. Production builds still use the standard Next.js build pipeline.

**Reasoning:** Faster development iterations. Turbopack is stable for the features we're using.

**Consequences:** The `next.config.ts` includes Turbopack configuration. The `@tailwindcss/turbopack` package is installed as a dev dependency for CSS processing. Do not remove the Turbopack config.

**Status:** Final.

---

## Decision 009 — 2026-10-25
**Animation engine: anime.js v4 added for homepage hero + scroll-driven effects**

**Context:** The user requested animations matching the animejs.com homepage — scroll-scrubbed section transitions, staggered grid motion, split-text reveals, and a scroll progress rail. Motion for React cannot expressively deliver scroll-synced scrubbing (`onScroll({ sync })`), stagger-grid easing, or `splitText` per-character reveals.

**Decision:** Install `animejs` v4.5.0 (~25 KB, actively maintained, MIT). anime.js is the engine for: hero entrance timeline, dot-grid engine (stagger grid + pointer energy), scroll-scrubbed effects (`ScrubFX`), enter reveals (`ScrollReveal`), ambient loops (`AmbientPulse`), and the scroll progress rail (`ScrollProgressRail`).

**Alternatives considered:**
- Motion `useScroll` + `useTransform` — can scrub, but lacks stagger-grid easing, splitText, and the exact anime.js easing character requested
- GSAP ScrollTrigger — capable but heavier; anime.js matches the requested site's actual engine

**Reasoning:** The request explicitly referenced animejs.com; using the same engine is the most faithful and least-hacky path. anime.js v4 is TypeScript-first, SSR-safe (browser guards in the engine), and tree-shakeable.

**Consequences:**
- Motion for React is retained for `Navigation` — do NOT remove the `motion` dependency
- Never animate the same element with both engines (both write `transform`)
- All new scroll/entrance homepage work should use the shared components (`ScrollReveal`, `ScrubFX`, `AmbientPulse`) rather than hand-rolled Motion wrappers
- All components respect `prefers-reduced-motion` via `lib/animations/anime.ts`

**Status:** Final.

---

## Decision 010 — 2026-10-25
**Brand palette matched to the logo + three.js for the 3D logo hero**

**Context:** The user supplied the official Geek Room logo (teal `<`/`>` brackets with G/R hooks, orange serrated slash, two white eyes on a dark navy tile) and requested (a) the site UI rebranded to the logo's colors, and (b) the hero's generative crystal replaced by a 3D three.js version of the logo.

**Decision:**
1. **Palette:** design tokens swapped to the logo palette — teal `#2ec4b6` primary accent, orange `#f4511e` secondary accent (new `--color-gr-accent-2*` tokens), white, dark navy `#14151f` background family. Orange is used sparingly (single focal marks), teal carries structure.
2. **Hero object:** `components/sections/LogoScene.tsx` builds the logo from extruded `THREE.Shape` geometry (beveled chevrons with G/R hooks, serrated slash, extruded circle eyes, rounded navy tile) with directional/rim lighting. It replaces the 2D crystal (removed from `orbEngine.ts`, which now renders only particles, the black-out overlay, and the webs).
3. **Scroll choreography preserved:** LogoScene receives the same ScrollObserver progress (expand to cover the screen → dim into the web phase) and mirrors the backdrop engine's phases.

**Alternatives considered:**
- Keep lime + add logo colors — rejected: two competing accent identities
- Render the logo as a textured plane — rejected: no depth/light response; extruded geometry gives real 3D character

**Consequences:**
- `three` + `@types/three` installed (the Milestone 3 gate the user explicitly triggered)
- The 3D glyph shapes are hand-approximated from the screenshot — the real logo SVG should replace the hand-drawn `THREE.Shape` paths when available
- All canvas engines read tokens at runtime, so future palette changes propagate automatically

**Status:** Final.
