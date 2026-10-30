/**
 * Geek Room — Society Story
 *
 * Content for the homepage "story" section: history, goals,
 * and what makes the society different.
 *
 * CONTENT STATUS:
 * - Mission, goals, and differentiators reflect the society's stated
 *   vision (see README.md) — verified as vision content.
 * - Historical facts (founding year, timeline details) are PLACEHOLDER —
 *   they must be confirmed with the society before launch.
 * See docs/CONTENT_STATUS.md for the full checklist.
 */

import type { SocietyStory } from "@/lib/types";

export const societyStory: SocietyStory = {
  eyebrow: "Who we are",
  heading: "More than a club. A room full of geeks.",
  intro:
    "Geek Room started with a simple observation: a lot of students are curious about technology, but very few have a place to explore it together. The society exists to be that place — a room where questions are welcome, projects are real, and nobody has to figure things out alone.",

  milestones: [
    {
      period: "[Founding Year]", // PLACEHOLDER — confirm actual founding year with society
      title: "Founded by students, for students",
      description:
        "A small group of technically curious students wanted a community that took building seriously — so they started one. [Details to be confirmed with the society.]",
    },
    {
      period: "[Year — confirm]", // PLACEHOLDER — confirm with society
      title: "The first public events",
      description:
        "Workshops and sessions opened the room to the whole college. [Dates, turnouts, and outcomes to be confirmed with the society.]",
    },
    {
      period: "[Year — confirm]", // PLACEHOLDER — confirm with society
      title: "Dedicated teams take shape",
      description:
        "The society organized into focused teams, each with its own lead and direction. [Which teams formed first, and who led them, to be confirmed.]",
    },
    {
      period: "Today", // PLACEHOLDER — replace with a real, verified milestone
      title: "Growing into a full technical community",
      description:
        "Geek Room now runs dedicated teams across the major areas of modern technology, from web development to AI/ML. [Add verified milestones — first project, first competition — as they are confirmed.]",
    },
  ],

  goals: [
    {
      title: "Build things that matter",
      description:
        "Learning by doing. Members work on real projects — tools, websites, experiments — not just tutorial exercises.",
    },
    {
      title: "Make expertise reachable",
      description:
        "Juniors learn from seniors, seniors learn by teaching. Knowledge moves through the community, not around it.",
    },
    {
      title: "Compete and represent",
      description:
        "Hackathons, contests, and competitions — Geek Room exists to put its members on the map, together.",
    },
    {
      title: "Belong before you're an expert",
      description:
        "You don't earn your place here by already knowing things. Curiosity is the only entry requirement.",
    },
  ],

  differentiators: [
    {
      title: "Real work, honestly shown",
      description:
        "We only show projects and results that actually happened. Every claim on this site is something we can point to — no inflated stats, no invented achievements.",
    },
    {
      title: "Structured teams, not scattered efforts",
      description:
        "Instead of one generic tech club, Geek Room is organized into focused teams — each with its own lead, culture, and roadmap — so your interests get real depth.",
    },
    {
      title: "Built by the people in it",
      description:
        "Even this website is maintained by student members. The society runs on the work of its own community, and every member can shape what it becomes.",
    },
  ],
};

export function getSocietyStory(): SocietyStory {
  return societyStory;
}
