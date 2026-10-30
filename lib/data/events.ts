/**
 * Geek Room — Event Data
 *
 * CONTENT STATUS: All events are PLACEHOLDER.
 * Do not publish with fabricated event details, venues, or registration links.
 * Replace with verified society events before launch.
 *
 * See docs/CONTENT_STATUS.md for full content checklist.
 */

import type { Event } from "@/lib/types";

export const events: Event[] = [
  {
    id: "placeholder-workshop-01",
    title: "[Workshop Name]",           // PLACEHOLDER
    tagline: "[One-line description]",   // PLACEHOLDER
    description:
      "[Full event description. What will attendees learn or do? Who is it for?]", // PLACEHOLDER
    category: "workshop",
    status: "upcoming",
    date: "2026-11-15T10:00:00+05:30",  // PLACEHOLDER — replace with actual date
    venue: "[Venue name and location]",  // PLACEHOLDER
    registrationUrl: null,               // PLACEHOLDER — add when registration opens
    coverImageUrl: null,
    relevantTeams: ["web-development"],
    audience: "beginner",
  },
  {
    id: "placeholder-hackathon-01",
    title: "[Hackathon Name]",           // PLACEHOLDER
    tagline: "[One-line description]",   // PLACEHOLDER
    description:
      "[Full hackathon description. Theme, duration, prizes, eligibility.]", // PLACEHOLDER
    category: "hackathon",
    status: "upcoming",
    date: "2026-12-01T09:00:00+05:30",  // PLACEHOLDER
    endDate: "2026-12-02T21:00:00+05:30", // PLACEHOLDER
    venue: "[Venue]",                    // PLACEHOLDER
    registrationUrl: null,
    coverImageUrl: null,
    relevantTeams: ["web-development", "ai-ml", "app-development"],
    audience: "all",
  },
];

export function getUpcomingEvents(): Event[] {
  return events
    .filter((e) => e.status === "upcoming" || e.status === "ongoing")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getPastEvents(): Event[] {
  return events
    .filter((e) => e.status === "past")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEventById(id: string): Event | undefined {
  return events.find((e) => e.id === id);
}
