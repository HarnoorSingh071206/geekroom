# Geek Room — Project Map

> **Last updated:** 2026-10-25 | **Milestone:** 0 — Project Foundation

This is the authoritative map of the Geek Room application. It describes routes, components, data sources, feature status, and architectural relationships. Keep it current after every meaningful implementation change.

---

## 1. Website Purpose

The Geek Room website has three primary responsibilities:

1. **Attract** — make a first-time visitor genuinely curious about the society.
2. **Guide** — help students discover the team or activity that fits their interests.
3. **Convert** — give interested visitors a clear path to join and participate.

The website itself is a demonstration of Geek Room's technical and creative capabilities.

---

## 2. Target Audience

| Audience | What They Need |
|---|---|
| Curious first-year student | Quick sense of what Geek Room is and whether it's for them |
| Student with specific interest | Find the matching team and understand what it offers |
| Student ready to join | Clear joining instructions and working community links |
| Returning member | Find events, projects, and updates |
| Recruiter / faculty | See the society's work, members, and events |

---

## 3. Page-by-Page Responsibility

| Route | Page | Primary Responsibility | Status |
|---|---|---|---|
| `/` | Homepage | Introduce, engage, direct | 🔧 Shell (Milestone 1 for full) |
| `/teams` | Teams | Help users find their place | ✅ Dream Team layout |
| `/events` | Events | Communicate real activity | 🔧 Stub (Milestone 2) |
| `/projects` | Projects | Showcase real work | 🔧 Stub (Milestone 2) |
| `/archive` | Archive | Tell the society's history (scroll chapters) | ✅ Scroll-choreographed timeline (placeholder content) |
| `/join` | Join | Convert visitors to members | 🔧 Stub (Milestone 2) |

---

## 4. Page-to-Feature Matrix

| Page | Key Sections / Features | Data Source | Notes |
|---|---|---|---|
| Home | Hero, society story (history, goals, differentiators), teams preview, events preview, join CTA | `lib/data/teams`, `lib/data/events`, `lib/data/society` | Milestone 1: full hero animation, section reveals |
| Teams | "Meet Your Dream Team" panel, portrait team cards with photo slot + social buttons, planned-teams note | `lib/data/teams` | Full layout implemented; lead photos are placeholder monograms until `avatarUrl` is set |
| Events | Upcoming events, past events, timeline view | `lib/data/events` | Milestone 2 |
| Projects | Project gallery, achievement listings | `lib/data/projects` | Milestone 2 |
| Join | Social links, joining steps, interest form | `lib/data/config` | Form integration is a pending external dependency |

### Distinctive Features

| Feature | Route / Location | Status |
|---|---|---|
| Find Your Geek (quiz) | `/` or `/teams` | Planned — Milestone 3 |
| Geek Room Challenge | Dedicated section | Planned — Milestone 3 |
| Made at Geek Room showcase | `/projects` or `/` | Planned — Milestone 3 |
| Easter egg / terminal | Global (hidden) | Deferred — post Milestone 4 |

---

## 5. Shared Components

| Component | Location | Type | Responsibility |
|---|---|---|---|
| `Navigation` | `components/layout/Navigation.tsx` | Client | Global nav, mobile menu, active indicator (Motion) |
| `Footer` | `components/layout/Footer.tsx` | Server | Global footer, social links, nav |
| `HeroSection` | `components/sections/HeroSection.tsx` | Client | "Biomorphic nucleus" hero: canvas orb + particle cloud, bottom-left split-text heading, bottom-right stat cards, scrubbed exit |
| `HeroCanvas` | `components/sections/HeroCanvas.tsx` | Client | Canvas wrapper for the backdrop engine (`lib/animations/orbEngine.ts`) — particles + webs |
| `LogoScene` | `components/sections/LogoScene.tsx` | Client | three.js 3D Geek Room logo (extruded glyphs, tile, lighting); scroll expand/dim choreography |
| `ScrollReveal` | `components/animations/ScrollReveal.tsx` | Client | anime.js enter-triggered reveal (per-section treatments, stagger) |
| `ScrubFX` | `components/scroll/ScrubFX.tsx` | Client | anime.js scroll-synced scrub wrapper (ghost numbers, parallax) |
| `AmbientPulse` | `components/animations/AmbientPulse.tsx` | Client | anime.js looping pulse for decorative glows |
| `TeamCard` | `components/features/TeamCard.tsx` | Client | Portrait team card; click/tap opens lead introduction dialog |
| `TeamLeadDialog` | `components/features/TeamLeadDialog.tsx` | Client | Modal with lead bio/focus/welcome note/social links; focus-trapped, Esc-to-close, anime.js enter/exit |
| `ArchiveTimeline` | `components/features/ArchiveTimeline.tsx` | Client | /archive scroll chapters: sticky counter (onEnterForward/onLeaveBackward), per-era reveals, sync'd progress spine |
| `ScrollProgressRail` | `components/scroll/ScrollProgressRail.tsx` | Client | Top progress bar + chapter rail with active-section dots (homepage) |

**Planned shared components** (Milestone 1–2):
- `SectionHeader` — consistent section title + eyebrow pattern
- `TeamCard` — reusable team display card
- `EventCard` — reusable event display card
- `ProjectCard` — reusable project display card
- `AnimatedReveal` — scroll-triggered reveal wrapper
- `Button` — typed, styled button primitive

---

## 6. Data Architecture

All content lives in `lib/data/`. Page components import from data files — they do not contain hardcoded content.

```
lib/
├── types/index.ts          # All TypeScript interfaces (Team, Event, Project, etc.)
├── data/
│   ├── teams.ts            # Team definitions + helper functions
│   ├── events.ts           # Event definitions + helper functions
│   ├── projects.ts         # Project + achievement definitions
│   ├── society.ts          # Society story: history, goals, differentiators
│   └── config.ts           # Nav items, social links, site constants
├── animations/
│   └── anime.ts            # anime.js helpers (prefersReducedMotion, EASE)
├── utils/
│   └── team.tsx            # Team/lead presentation helpers (monogram, socials, XLogo)
└── hooks/                  # Custom React hooks (empty — Milestone 1+)
└── animations/             # Shared Motion/GSAP animation variants (empty — Milestone 1+)
```

### Data Principles
- All placeholder content is labeled `// PLACEHOLDER`
- Content can be updated without touching any component or page file
- New content types require a type in `lib/types/index.ts` before a data file

---

## 7. Navigation and Internal Links

```
/          ──→  /teams
           ──→  /events
           ──→  /projects
           ──→  /join

/teams     ──→  /join (interest expression)

/join      ──→  /teams (find your team)
           ──→  External social links (placeholder)
```

All pages include Navigation (header) and Footer — rendered via root layout.

---

## 8. Animation Ownership

**Engine split (Decision 009):** anime.js v4 drives all homepage hero + scroll effects; Motion for React drives the Navigation. Never animate the same element with both engines.

| Animation | Owner | Library | Notes |
|---|---|---|---|
| Nav active indicator | `Navigation.tsx` | Motion (layoutId) | Spring transition |
| Mobile menu open/close | `Navigation.tsx` | Motion (AnimatePresence) | Height + opacity |
| Hero entrance (split text + stagger) | `HeroSection.tsx` | anime.js (createTimeline, splitText, stagger) | Reduced-motion aware |
| Hero orb + particle cloud | `lib/animations/orbEngine.ts` | Canvas 2D rAF loop | Faceted crystal rotates/shimmers/drifts; particles orbit; pointer parallax; pauses off-view/hidden; static frame under reduced motion |
| Hero scroll exit | `HeroSection.tsx` | anime.js (onScroll sync 0.8) | Scrubbed |
| Section enter reveals | `ScrollReveal.tsx` | anime.js (IntersectionObserver + animate) | Different treatment per section |
| Ghost chapter number scrub | `ScrubFX.tsx` | anime.js (onScroll sync) | Sections 01–04 on homepage |
| Scroll progress rail + chapter dots | `ScrollProgressRail.tsx` | anime.js (onScroll sync true) + rAF spy | Top bar (all sizes) + rail (desktop) |
| CTA glow pulse | `AmbientPulse.tsx` | anime.js loop | Join CTA section |
| Team node visualization | TBD — Milestone 3 | Motion or Three.js | Decision pending |
| Page transitions | TBD — Milestone 1 | Motion | Layout transitions |

**Shared animation conventions** (to be extracted to `lib/animations/` in Milestone 1):
- Entrance: `opacity 0→1`, `y 24→0`, `duration 700ms`, `ease: [0.16, 1, 0.3, 1]`
- Stagger: `0.12s` between children
- All animations check `useReducedMotion()` or `prefersReduced` from Motion

---

## 9. Known Dependencies Between Features

- `Navigation` depends on `lib/data/config.ts` (navItems)
- `Footer` depends on `lib/data/config.ts` (navItems, socialLinks)
- `Homepage` depends on `lib/data/teams.ts`, `lib/data/events.ts`, and `lib/data/society.ts`
- `Find Your Geek` (Milestone 3) depends on `lib/data/teams.ts` for result mapping
- `Interest form` (/join) depends on an external form endpoint — not yet configured

---

## 10. Implementation Status

### Milestone 0 — Foundation ✅ Complete
- [x] Next.js 16 + React 19 + TypeScript initialized
- [x] Tailwind CSS v4 design tokens (`globals.css`)
- [x] Motion for React + Lucide React installed
- [x] Directory structure
- [x] TypeScript types (`lib/types/index.ts`)
- [x] Data files with placeholder content
- [x] Navigation component
- [x] Footer component
- [x] Root layout with metadata
- [x] Homepage shell (hero + preview sections)
- [x] Stub pages for all routes
- [x] Documentation system

### Milestone 1 — Visual Foundation 🔲 Not started
- [ ] Full animated hero (particle/geometry motif)
- [ ] `SectionHeader` shared component
- [ ] `AnimatedReveal` scroll wrapper
- [ ] `Button` primitive
- [ ] Shared animation variants in `lib/animations/`
- [ ] Page transitions
- [ ] Full mobile responsive audit
- [ ] Typography refinement

### Milestone 2 — Core Pages 🔲 Not started
- [ ] Full Teams page (team cards, lead profiles, interest links)
- [ ] Full Events page (timeline, upcoming/past, empty states)
- [ ] Full Projects page (gallery, achievements)
- [ ] Full Join page (form integration, real social links)
- [ ] `TeamCard`, `EventCard`, `ProjectCard` shared components

### Milestone 3 — Signature Features 🔲 Not started
- [ ] Find Your Geek quiz
- [ ] Geek Room Challenge system
- [ ] Made at Geek Room showcase
- [ ] Interactive team visualization
- [ ] Refined transitions and micro-interactions

### Milestone 4 — Polish 🔲 Not started
- [ ] Accessibility audit
- [ ] Responsive audit
- [ ] Animation + performance audit
- [ ] Build verification
- [ ] Documentation reconciliation
- [ ] Easter egg feature (deferred)

---

## 11. Known Gaps

- Social links are all `#` placeholders — must be replaced before launch
- College name in Footer is placeholder
- All team lead information is placeholder
- No events are confirmed — empty state renders correctly
- Interest form has no backend — clearly documented as pending
- No images exist in `/public/images/` — cover images not yet sourced
- `metadataBase` URL in `app/layout.tsx` is a placeholder
