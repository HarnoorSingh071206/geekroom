/**
 * Geek Room — Project & Achievement Data
 *
 * CONTENT STATUS: All entries are PLACEHOLDER.
 * Do not fabricate contributors, GitHub links, or achievement results.
 * Add only verified, real projects and achievements.
 */

import type { Project, Achievement } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "geekroom-website",
    title: "Geek Room Website",
    description:
      "The official Geek Room website — this project — built with Next.js, TypeScript, and Tailwind CSS. An open, collaborative project for all web team members.",
    status: "active",
    contributors: [],  // PLACEHOLDER — add verified contributor names
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Motion"],
    screenshotUrl: null,
    githubUrl: null,   // PLACEHOLDER — add when repository is made public
    liveUrl: null,     // PLACEHOLDER — add when deployed
    teams: ["web-development"],
    date: "2026-10-01",
    featured: true,
  },
];

export const achievements: Achievement[] = [
  // PLACEHOLDER — add verified competition results, awards, or milestones
  // Example shape:
  // {
  //   id: "hacktoberfest-2025",
  //   title: "Hacktoberfest 2025 Participation",
  //   description: "X members completed Hacktoberfest.",
  //   date: "2025-10-31",
  //   result: "X members earned completion badges",
  //   participants: [],
  //   verifiedSource: "https://hacktoberfest.com",
  // },
];

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
