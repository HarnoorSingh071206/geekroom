# Geek Room — Content Status

> **Last updated:** 2026-10-25
> This file tracks all content items that require real society information.
> **Do not launch with any item marked MISSING or PLACEHOLDER.**

---

## Legend

| Status | Meaning |
|---|---|
| ✅ VERIFIED | Real, confirmed content — ready to publish |
| 🔧 PLACEHOLDER | Dummy content in place — must be replaced |
| ❌ MISSING | No content exists yet — must be sourced |
| ⏳ AWAITING | Confirmed to exist — waiting on delivery |
| 🚫 NOT APPLICABLE | This item does not apply to the current scope |

---

## Brand & Identity

| Item | Status | Notes | Location |
|---|---|---|---|
| Official logo (SVG + PNG) | ✅ VERIFIED | Added from official asset `photos/Screenshot_20261025_224642.png` to `public/icons/logo.png` and `lib/data/logoVectors.ts` | `public/icons/logo.png`, `lib/data/logoVectors.ts` |
| Approved brand colors | ✅ VERIFIED | Matched to official logo: teal `#0eb0ba`, orange `#e85c2e`, white `#ffffff`, navy `#14151f` (see `globals.css`) | `app/globals.css` |
| Official college name | ✅ VERIFIED | Guru Tegh Bahadur Institute of Technology (GTBIT) | `components/layout/Footer.tsx` |
| Actual city/campus | ✅ VERIFIED | New Delhi | `components/layout/Footer.tsx` |
| Site domain / URL | 🔧 PLACEHOLDER | `geekroom.vercel.app` placeholder | `app/layout.tsx` (metadataBase) |
| OG image (1200×630) | ❌ MISSING | Required for social sharing | Add to `/public/` |
| Favicon | ❌ MISSING | No custom favicon | Add to `/public/` + `app/layout.tsx` |

---

## Social Links

| Platform | Status | Notes | Location |
|---|---|---|---|
| Discord server invite | 🔧 PLACEHOLDER | Currently `#` | `lib/data/config.ts` |
| Instagram profile | 🔧 PLACEHOLDER | Currently `#` | `lib/data/config.ts` |
| LinkedIn page | 🔧 PLACEHOLDER | Currently `#` | `lib/data/config.ts` |
| GitHub organization | 🔧 PLACEHOLDER | Currently `#` | `lib/data/config.ts` |
| Twitter / X (if used) | ❌ MISSING | Not currently in config | Add if needed |

---

## Team Information

> All team content is in `lib/data/teams.ts`. Replace `// PLACEHOLDER` comments.

### Web Development Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ✅ VERIFIED | Active: true |
| Team name | ✅ VERIFIED | "Web Development" |
| Team lead name | 🔧 PLACEHOLDER | `[Team Lead Name]` |
| Team lead photo | ❌ MISSING | Card shows labeled monogram placeholder until `avatarUrl` is set |
| Team lead bio | 🔧 PLACEHOLDER | `[A short bio...]` |
| Team lead focus | 🔧 PLACEHOLDER | `[Current team focus area]` |
| Team lead GitHub | 🔧 PLACEHOLDER | `undefined` |
| Team lead LinkedIn | 🔧 PLACEHOLDER | `undefined` |

> **Teams page (2026-10-25):** /teams renders "Meet Your Dream Team" portrait cards; clicking/tapping a card opens the lead introduction dialog (`TeamLeadDialog`). Placeholder bios/focus text are never rendered — the dialog shows "coming soon" messages instead. Photo slots without a lead photo show a team-colored monogram placeholder labeled "Photo coming soon". Card social buttons render only for verified lead links; a disabled X button appears when none exist.

### AI/ML Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ✅ VERIFIED | Active: true |
| Team lead name | 🔧 PLACEHOLDER | `[Team Lead Name]` |
| Team lead photo | ❌ MISSING | `avatarUrl: null` |
| Team lead bio | 🔧 PLACEHOLDER | |
| Team lead focus | 🔧 PLACEHOLDER | |

### Competitive Programming Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ✅ VERIFIED | Active: true |
| Team lead name | 🔧 PLACEHOLDER | |
| Team lead photo | ❌ MISSING | |
| Team lead bio | 🔧 PLACEHOLDER | |

### App Development Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ✅ VERIFIED | Active: true |
| Team lead name | 🔧 PLACEHOLDER | |
| Team lead photo | ❌ MISSING | |
| Team lead bio | 🔧 PLACEHOLDER | |

### Cybersecurity Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ❌ MISSING | Set to `active: false` — confirm with society |
| Team lead | ❌ MISSING | `lead: null` |

### Open Source Team

| Item | Status | Notes |
|---|---|---|
| Team is active | ❌ MISSING | Set to `active: false` — confirm with society |
| Team lead | ❌ MISSING | `lead: null` |

---

## Events

> Event content is in `lib/data/events.ts`. All current events are PLACEHOLDER.

| Item | Status | Notes |
|---|---|---|
| Confirmed upcoming events | 🔧 PLACEHOLDER | 2 placeholder events exist |
| Event names | 🔧 PLACEHOLDER | `[Workshop Name]`, `[Hackathon Name]` |
| Event dates | 🔧 PLACEHOLDER | Future dates set; must be confirmed |
| Event venues | 🔧 PLACEHOLDER | `[Venue name and location]` |
| Registration URLs | ❌ MISSING | `registrationUrl: null` for both |
| Event cover photos | ❌ MISSING | `coverImageUrl: null` for all |
| Past event records | ❌ MISSING | No past events in data file |
| Past event photos | ❌ MISSING | |
| Past event recaps | ❌ MISSING | |

---

## Projects

> Project content is in `lib/data/projects.ts`.

| Item | Status | Notes |
|---|---|---|
| Geek Room website (this project) | ✅ VERIFIED | Active project listed |
| GitHub URL for website | ❌ MISSING | `githubUrl: null` — add when repo is public |
| Live URL for website | ❌ MISSING | `liveUrl: null` — add when deployed |
| Contributors to website | ❌ MISSING | Empty array — add when confirmed |
| Additional projects | ❌ MISSING | No other projects listed |
| Project screenshots | ❌ MISSING | `screenshotUrl: null` for all |

---

## Achievements

> Achievement content is in `lib/data/projects.ts`.

| Item | Status | Notes |
|---|---|---|
| Verified achievements | ❌ MISSING | `achievements` array is empty |

> **Important:** Only add achievements that can be verified. Do not fabricate results.

---

## Society Story (Homepage)

> Story content is in `lib/data/society.ts`.

| Item | Status | Notes |
|---|---|---|
| Section eyebrow / heading / intro | ✅ VERIFIED | Vision-derived content, consistent with README |
| Goals (4) | ✅ VERIFIED | Vision-derived content, consistent with README |
| Differentiators (3) | ✅ VERIFIED | Reflect stated society principles |
| Timeline period labels | 🔧 PLACEHOLDER | `[Founding Year]`, 2× `[Year — confirm]` — confirm actual years |
| Timeline milestone details | 🔧 PLACEHOLDER | Founding story, first events, teams formation need society confirmation |

> **Archive page (2026-10-25):** /archive renders these milestones as scroll-driven chapters — filling in the periods/descriptions in `lib/data/society.ts` automatically updates the homepage story section and the archive timeline.

---

## Join Page

| Item | Status | Notes | Location |
|---|---|---|---|
| Joining process description | ✅ VERIFIED | Generic but accurate — 4 steps | `app/join/page.tsx` |
| Form submission endpoint | ❌ MISSING | No backend configured | Integrate Formspree / Resend / Google Forms |
| Eligibility rules | 🔧 PLACEHOLDER | "All students" — verify with society | `app/join/page.tsx` |
| Recruitment process details | ❌ MISSING | No detailed process documented | Add when confirmed |

---

## Community Showcase (Made at Geek Room)

> Feature planned for Milestone 3.

| Item | Status | Notes |
|---|---|---|
| Member project submissions | ❌ MISSING | No showcase items exist |
| Workshop photographs | ❌ MISSING | |
| Member milestones / stories | ❌ MISSING | |

---

## Challenges (Geek Room Challenge)

> Feature planned for Milestone 3.

| Item | Status | Notes |
|---|---|---|
| Challenge content | ❌ MISSING | Data file not yet created |
| Challenge review process | ❌ MISSING | Verification workflow not defined |

---

## Summary

| Category | Verified | Placeholder | Missing |
|---|---|---|---|
| Brand & Identity | 0 | 3 | 4 |
| Social Links | 0 | 4 | 1 |
| Teams | 5 | 12 | 8 |
| Events | 0 | 4 | 6 |
| Projects | 2 | 0 | 3 |
| Achievements | 0 | 0 | 1 |
| Join | 1 | 1 | 2 |
| Society Story | 3 | 2 | 0 |
| Showcase | 0 | 0 | 3 |
| Challenges | 0 | 0 | 2 |

**Total missing or placeholder: ~50 items.** This is expected at Milestone 0. The site must not launch until all required items are resolved.
