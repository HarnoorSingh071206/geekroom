# Geek Room — Official Website

> **Build. Learn. Belong.**
>
> The official website for Geek Room, a college technology society for students passionate about coding, AI/ML, web development, competitive programming, and building things that matter.

---

## Project Overview

This repository contains the source code for the Geek Room website. The website is designed to:

1. **Introduce Geek Room** — communicate what the society is, what it values, and why students should care.
2. **Help students find their team** — surface the domains, leads, and activities relevant to each visitor.
3. **Demonstrate the society's technical capability** — through thoughtful design, real animations, and quality engineering.
4. **Convert visitors into members** — with clear joining instructions and community links.

The website is intended to be maintained by student developers over time. Code quality, documentation, and maintainability are first-class concerns.

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.x | Framework — App Router, SSR, routing |
| React | 19.x | UI components |
| TypeScript | 5.x | Strict type checking |
| Tailwind CSS | 4.x | Utility-first styling (CSS-first config via `@theme`) |
| Motion for React | latest | Component animations, transitions |
| Lucide React | latest | Icon system |
| ESLint | 9.x | Code quality |
| Node.js | 24.x | Runtime |
| npm | 11.x | Package manager |

> **Planned for later milestones:** GSAP (complex timelines), Three.js + React Three Fiber (3D), Framer Motion scroll utilities. These are NOT installed in Milestone 0.

---

## Prerequisites

- Node.js 20+ (project uses 24.x)
- npm 10+ (project uses 11.x)
- Git

---

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd geekroom

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Development Commands

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | TypeScript type check |

---

## Folder Structure

```
geekroom/
├── app/                     # Next.js App Router
│   ├── layout.tsx           # Root layout (Navigation + Footer)
│   ├── page.tsx             # Homepage (/)
│   ├── globals.css          # Design tokens + global styles
│   ├── events/page.tsx      # Events page (/events)
│   ├── join/page.tsx        # Join page (/join)
│   ├── projects/page.tsx    # Projects page (/projects)
│   └── teams/page.tsx       # Teams page (/teams)
│
├── components/
│   ├── layout/              # Navigation, Footer
│   ├── sections/            # Page sections (HeroSection, etc.)
│   ├── ui/                  # Reusable UI primitives
│   ├── animations/          # Animation wrappers
│   └── features/            # Feature-specific components
│
├── lib/
│   ├── types/index.ts       # All TypeScript interfaces and types
│   ├── data/                # Content files (teams, events, projects, config)
│   ├── utils/               # Pure utility functions
│   ├── hooks/               # Custom React hooks
│   └── animations/          # Shared animation variants
│
├── public/
│   ├── images/              # Static images (team photos, event covers)
│   └── icons/               # SVG icons
│
├── docs/                    # Project documentation
│   ├── PROJECT_MAP.md
│   ├── IMPLEMENTATION_LOG.md
│   ├── NEXT_STEPS.md
│   ├── DECISIONS.md
│   ├── DESIGN_SYSTEM.md
│   ├── CONTENT_STATUS.md
│   └── TESTING.md
│
├── AGENTS.md                # AI agent operating contract
├── README.md                # This file
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.mjs        # ESLint configuration
```

---

## Routes

| Route | File | Status |
|---|---|---|
| `/` | `app/page.tsx` | ✅ Shell complete |
| `/teams` | `app/teams/page.tsx` | 🔧 Stub (Milestone 2) |
| `/events` | `app/events/page.tsx` | 🔧 Stub (Milestone 2) |
| `/projects` | `app/projects/page.tsx` | 🔧 Stub (Milestone 2) |
| `/join` | `app/join/page.tsx` | 🔧 Stub (Milestone 2) |

---

## Updating Content

All content is driven by data files in `lib/data/`. **Do not hardcode content into page components.**

| Content Type | File | Notes |
|---|---|---|
| Teams | `lib/data/teams.ts` | Add/edit teams and lead information |
| Events | `lib/data/events.ts` | Add upcoming or past events |
| Projects | `lib/data/projects.ts` | Add society projects and achievements |
| Navigation | `lib/data/config.ts` | Nav items and social links |
| Site metadata | `app/layout.tsx` | Title, description, OG tags |

**All placeholder content is clearly labeled** with `// PLACEHOLDER` comments. See `docs/CONTENT_STATUS.md` for the full checklist.

---

## Environment Variables

No environment variables are required for the current Milestone 0 build.

Future integrations (form submission, analytics) will require a `.env.local` file. **Never commit `.env.local` to version control.** The `.gitignore` already excludes it.

---

## Deployment

The project is ready for deployment on Vercel. Connect the GitHub repository to a Vercel project and it will deploy automatically on push to `main`.

Before deployment:
- Replace all `// PLACEHOLDER` items in `lib/data/`
- Update `metadataBase` in `app/layout.tsx` with the actual URL
- Configure any form integration in `/join`

---

## Current Implementation Status

**Milestone 0 — Project Foundation** (current)

- ✅ Next.js 16 + React 19 + TypeScript initialized
- ✅ Tailwind CSS v4 with design tokens (`globals.css`)
- ✅ Motion for React + Lucide React installed
- ✅ Directory structure established
- ✅ TypeScript type definitions (`lib/types/index.ts`)
- ✅ Data files with placeholder content (`lib/data/`)
- ✅ Navigation (responsive, animated active indicator)
- ✅ Footer (consistent, social links)
- ✅ Root layout with metadata and viewport config
- ✅ Homepage shell (Hero + Teams preview + Events preview + Join CTA)
- ✅ Stub pages for all 4 routes (Teams, Events, Projects, Join)
- ✅ Documentation system created
- 🔧 Full page implementations — Milestone 2
- 🔧 Signature features (quiz, challenges, showcase) — Milestone 3
- 🔧 Polish and accessibility audit — Milestone 4

---

## Documentation

| File | Purpose |
|---|---|
| `AGENTS.md` | AI agent operating contract |
| `docs/PROJECT_MAP.md` | Application architecture and feature map |
| `docs/IMPLEMENTATION_LOG.md` | Chronological record of all changes |
| `docs/NEXT_STEPS.md` | Current actionable development queue |
| `docs/DECISIONS.md` | Architecture and design decisions |
| `docs/DESIGN_SYSTEM.md` | Design tokens, typography, animation |
| `docs/CONTENT_STATUS.md` | Content checklist and placeholder tracker |
| `docs/TESTING.md` | Testing and validation procedures |
