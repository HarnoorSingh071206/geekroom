# Geek Room — Design System

> **Last updated:** 2026-10-25 | All tokens are defined in `app/globals.css` under `@theme`.
> This document describes the design language and must stay synchronized with the implementation.

---

## 1. Color Tokens

All colors are CSS custom properties. **Never use raw hex values in components.** Use the token names.

### Palette

> **Rebranded 2026-10-25** — palette matched to the official Geek Room logo (teal brackets, orange slash, white eyes, dark navy tile).

| Token | Value | Usage |
|---|---|---|
| `--color-gr-black` | `#14151f` | Page background (dark navy-black) |
| `--color-gr-surface` | `#1c1e29` | Card backgrounds, nav, footer |
| `--color-gr-surface-2` | `#242633` | Nested surfaces, code blocks |
| `--color-gr-border` | `#2e3140` | Default borders |
| `--color-gr-border-2` | `#464a5c` | Hover borders, stronger dividers |
| `--color-gr-muted` | `#565b6e` | Tertiary text, timestamps |
| `--color-gr-subtle` | `#767b8f` | Secondary text, descriptions |
| `--color-gr-offwhite` | `#e5e6ee` | Primary body text |
| `--color-gr-white` | `#fafafd` | Headings, emphasized text |

### Accent

| Token | Value | Usage |
|---|---|---|
| `--color-gr-accent` | `#2ec4b6` | Primary accent — teal (logo brackets) |
| `--color-gr-accent-dim` | `#1fa396` | Accent on hover / slightly deeper |
| `--color-gr-accent-glow` | `#2ec4b640` | Glow effects (25% opacity) |
| `--color-gr-accent-2` | `#f4511e` | Secondary accent — orange (logo slash); use sparingly for highlights |
| `--color-gr-accent-2-dim` | `#c73e12` | Deeper orange |
| `--color-gr-accent-2-glow` | `#f4511e40` | Orange glow (25% opacity) |

> **Visual rationale:** Teal carries structure and links (the brackets that frame everything); orange is the punctuation — used for single focal marks (the logo slash, terminal-style dots). White and dark navy do the heavy lifting. Together they match the society's actual logo.

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--color-gr-error` | `#f87171` | Error states |
| `--color-gr-warning` | `#fbbf24` | Warnings |
| `--color-gr-success` | `#4ade80` | Success states |
| `--color-gr-info` | `#60a5fa` | Info / link color |

### Team Accent Colors

Each team has its own accent color used for team-specific UI. These are inline values in `lib/data/teams.ts`, not global tokens, because they are data-driven (different team, different color). They must contrast sufficiently against `--color-gr-surface`.

| Team | Color |
|---|---|
| Web Development | `var(--color-gr-accent)` — lime |
| AI/ML | `#60a5fa` — blue |
| Competitive Programming | `#f87171` — red |
| App Development | `#c084fc` — purple |
| Cybersecurity | `#fbbf24` — amber |
| Open Source | `#34d399` — teal |

---

## 2. Typography

### Font Families

| Token | Value | Usage |
|---|---|---|
| `--font-sans` | Geist → Inter → system-ui | Body text, UI |
| `--font-mono` | Geist Mono → Fira Code → monospace | Code, labels, badges, wordmark |

Geist and Geist Mono are loaded via `next/font/google` in `app/layout.tsx` with `display: swap`.

### Type Scale

| Class | Size | Usage |
|---|---|---|
| `.text-display` | `clamp(3rem, 8vw, 7rem)` | Hero headings only |
| `.text-headline` | `clamp(2rem, 5vw, 3.75rem)` | Page titles (h1 on inner pages) |
| `.text-title` | `clamp(1.5rem, 3vw, 2.25rem)` | Section headings |
| `text-lg` (Tailwind) | `1.125rem` | Lead text, section intros |
| `text-sm` (Tailwind) | `0.875rem` | Body, cards, descriptions |
| `text-xs` (Tailwind) | `0.75rem` | Labels, badges, metadata |

### Typography Conventions

- Display type: `font-bold`, `tracking-tight`, `leading-none` or `leading-[1.0]`
- Headline type: `font-bold`, `tracking-tight`, `leading-[1.1]`
- Eyebrow labels: `text-xs font-mono font-semibold uppercase tracking-widest text-[var(--color-gr-accent)]`
- Body text: `text-[var(--color-gr-subtle)]` or `text-[var(--color-gr-offwhite)]`
- Monospace used for: wordmark, badges, code, category labels, step numbers, status indicators
- **Serif-italic accent** (added 2026-10-25): key words inside headings may use `font-serif italic` (e.g. "Meet Your *Dream Team*" on /teams). Tailwind's default serif stack; no additional font dependency.
- **Portrait card pattern** (added 2026-10-25): 3:4 aspect photo slot with `rounded-xl` + border, name/tagline/social row below. Photo slots without a real image render a team-colored gradient + serif-italic monogram + "Photo coming soon" mono label (placeholder, labeled).

---

## 3. Spacing

### Container

| Class | Behavior |
|---|---|
| `.container-gr` | `max-width: 1280px`, centered, `padding-inline: clamp(1rem, 5vw, 2rem)` |

### Section Padding

| Class | Behavior |
|---|---|
| `.section-padding` | `padding-block: clamp(4rem, 10vw, 8rem)` |

### Component Spacing

Follow Tailwind spacing conventions (4px base unit). Common values:
- Card padding: `p-5` or `p-6`
- Section gap: `gap-4` to `gap-6`
- Nav height: `h-20` (80px); layout content offset `pt-20`; anchor `scroll-mt-28`

---

## 4. Layout Conventions

- **Grid**: CSS Grid via Tailwind. 1 column mobile → 2 column tablet → 3 column desktop for card grids.
- **Max width**: `1280px` enforced by `.container-gr`
- **Fixed nav**: `position: fixed; top: 0; height: 64px` — pages start at `pt-16` via layout
- **Section rhythm**: Sections separated by `border-t border-[var(--color-gr-border)]`

---

## 5. Border and Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Badges, chips, code |
| `--radius-md` | `8px` | Buttons, inputs |
| `--radius-lg` | `12px` | Cards |
| `--radius-xl` | `20px` | Large cards, modals |
| `--radius-full` | `9999px` | Pills, circular elements |

Tailwind rounded classes are used in practice: `rounded` (4px), `rounded-lg` (8px), `rounded-xl` (12px), `rounded-full`.

---

## 6. Border Conventions

- **Default card border:** `border border-[var(--color-gr-border)]`
- **Hover state border:** `hover:border-[var(--color-gr-border-2)]`
- **Accent border (CTAs):** `border border-[var(--color-gr-accent)]`
- **Dashed border (empty states):** `border border-dashed border-[var(--color-gr-border)]`

---

## 7. Background Grid

The page background includes a CSS grid texture:
```css
background-image:
  linear-gradient(var(--color-gr-border) 1px, transparent 1px),
  linear-gradient(90deg, var(--color-gr-border) 1px, transparent 1px);
background-size: 48px 48px;
background-attachment: fixed;
```

This provides the "technical graph paper" visual motif. It is purely decorative. Under `prefers-reduced-motion: reduce`, `background-attachment` is changed to `scroll` (no motion impact, but consistent with reduced-motion intent).

---

## 8. Animation Principles

> **Engine note (2026-10-25):** anime.js v4 is now the animation engine for
> homepage hero and scroll-driven effects (Decision 009 in `docs/DECISIONS.md`).
> Motion for React remains in use for the Navigation component. Do not mix
> both engines on the *same* element — they both write to `transform`.

### Core principles
1. **Purpose first** — every animation must communicate something or guide the user.
2. **Entrance reveals** — sections fade in as they enter the viewport.
3. **Stagger** — related elements animate with a delay between children (0.05–0.15s).
4. **Ease** — `outExpo` (anime.js entrances) / `[0.16, 1, 0.3, 1]` (Motion entrances).
5. **Hover states** — immediate (≤150ms), subtle, never startling.
6. **Reduced motion** — check `prefers-reduced-motion` (`prefersReducedMotion()` helper for anime.js components, `useReducedMotion()` for Motion); skip animation to final state.
7. **Scroll-scrubbed ≠ time-based** — scroll-driven movement must use `onScroll({ sync })` (linear ease) so motion is fully controlled by the user's scroll position.

### anime.js conventions (homepage)

| Pattern | Implementation | Usage |
|---|---|---|
| Hero orb engine | `HeroCanvas` + `lib/animations/orbEngine.ts` (canvas 2D, rAF) | Faceted lime **crystal** (rotating gem, shimmering facets, vertex glints) + orbiting particle cloud + pointer parallax |
| Enter reveal | `ScrollReveal` (`components/animations/`) | Fade/rise/scale/slide-in per section, first time in view |
| Scroll scrub | `ScrubFX` + `onScroll({ sync: 0.8, enter: 'bottom start', leave: 'top end' })` | Ghost chapter numbers drift; hero exit |
| Split text | `splitText(h1, { chars: true, accessible: true })` | Per-character hero heading reveal |
| Ambient loop | `animate(..., { loop: true, ease: 'inOutSine' })` | CTA glow (`AmbientPulse`) |
| Scroll progress | `onScroll({ sync: true })` on `scaleX` / `top` | `ScrollProgressRail` top bar + rail cursor |

> **Canvas rule (2026-10-25):** generative/organic visuals (the hero orb) run on a dedicated canvas engine with their own rAF loop — anime.js drives DOM elements only. The canvas reads colors from CSS tokens via `getComputedStyle`; hardcoding colors inside canvas code is forbidden. Canvas loops must pause on `document.hidden` and when out of view, and render a single static frame under reduced motion.

### Shared easing values

| Token | Value | Usage |
|---|---|---|
| `--ease-smooth` | `cubic-bezier(0.16, 1, 0.3, 1)` | Motion entrances, reveals |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard transitions |
| `--ease-bounce` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful hover states |
| anime.js names | `outExpo`, `outQuint`, `inOutSine`, `linear` | Homepage animations (`lib/animations/anime.ts` `EASE`) |

### Duration conventions

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover, focus, color changes |
| `--duration-normal` | `300ms` | Menu open/close, small reveals |
| `--duration-slow` | `600ms` | Page sections, layout shifts |
| `--duration-enter` | `800ms` | Hero entrances |

### Standard entrance variant (Motion)
```typescript
// Defined in HeroSection.tsx — to be extracted to lib/animations/variants.ts in Milestone 1
const ENTER = {
  container: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  },
};
```

---

## 9. Reduced Motion

Every animated component must check the user's preference:
- anime.js components: `prefersReducedMotion()` from `lib/animations/anime.ts`
- Motion components: `useReducedMotion()` from Motion for React
- Skip entrance delays, stagger, loops, and scrubbing entirely
- Keep layout and content — only remove motion

Decorative elements (glow, dot grid) render static when reduced motion is preferred.

---

## 10. Responsive Breakpoints

Using Tailwind defaults:

| Prefix | Min-width | Target |
|---|---|---|
| (none) | 0px | Mobile — 375px baseline |
| `sm:` | 640px | Large mobile / small tablet |
| `md:` | 768px | Tablet |
| `lg:` | 1024px | Desktop |
| `xl:` | 1280px | Large desktop |

Test at: 375px, 428px, 768px, 1024px, 1440px.

---

## 11. Interaction States

| State | Style |
|---|---|
| Default | Defined per-component |
| Hover | Color or border change, ≤150ms transition |
| Focus-visible | 2px solid `--color-gr-accent` outline, 2px offset |
| Active / pressed | Slight opacity reduction (`opacity-90`) |
| Disabled | `opacity-50`, `cursor-not-allowed`, `aria-disabled` |
| Loading | Skeleton or spinner (not yet implemented) |

---

## 12. Visual Rules to Avoid

- ❌ Random floating gradient blobs
- ❌ Excessive glassmorphism (frosted glass on everything)
- ❌ Neon glow on text
- ❌ Bubbles as background decoration
- ❌ Identical card grids in every section without variation
- ❌ Constant background animation at idle
- ❌ Scroll hijacking
- ❌ Animations on every DOM element
- ❌ Raw hex values in component files
- ❌ Inconsistent spacing between sections
- ❌ Light text on light background or dark text on dark background
