/**
 * Geek Room — Team Data
 *
 * CONTENT STATUS: All team information is PLACEHOLDER.
 * Real team names, leads, bios, and links must be confirmed
 * by the Web Development Lead before launch.
 *
 * See docs/CONTENT_STATUS.md for full content checklist.
 *
 * To add a team: copy the shape below and add to the teams array.
 * Set active: false for teams that are not yet operational.
 */

import type { Team } from "@/lib/types";

export const teams: Team[] = [
  {
    id: "web-development",
    name: "Web Development",
    tagline: "Build the web you imagine.",
    description:
      "The web team works on everything from static sites to full-stack applications. We explore React, Next.js, Node.js, design systems, and whatever the web throws at us next.",
    color: "var(--color-gr-accent)",
    icon: "Globe",
    active: true,
    skills: ["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS"],
    lead: {
      id: "lead-webdev",
      name: "[Team Lead Name]", // PLACEHOLDER — replace with actual name
      role: "Web Development Lead",
      avatarUrl: null, // PLACEHOLDER — add photo to /public/images/leads/
      bio: "[A short bio about the lead's background and interests.]", // PLACEHOLDER
      focus: "[Current team focus area, e.g. 'Building the Geek Room website and exploring Next.js 15.']", // PLACEHOLDER
      welcomeNote:
        "Whether you've built your first HTML page or deployed production apps, there's a place for you here. We learn together.",
      links: {
        github: undefined,   // PLACEHOLDER — add verified link
        linkedin: undefined, // PLACEHOLDER — add verified link
      },
    },
  },
  {
    id: "ai-ml",
    name: "AI / ML",
    tagline: "Teach machines. Ask better questions.",
    description:
      "The AI/ML team explores machine learning, data science, and applied AI. We run experiments, read papers, build models, and try to understand what intelligence actually means.",
    color: "#60a5fa",
    icon: "Brain",
    active: true,
    skills: ["Python", "PyTorch", "scikit-learn", "Jupyter", "Data Analysis"],
    lead: {
      id: "lead-aiml",
      name: "[Team Lead Name]", // PLACEHOLDER
      role: "AI/ML Lead",
      avatarUrl: null,
      bio: "[Lead bio.]", // PLACEHOLDER
      focus: "[Current focus.]", // PLACEHOLDER
      welcomeNote:
        "No PhD required. Curiosity and patience are the only prerequisites.",
      links: {},
    },
  },
  {
    id: "competitive-programming",
    name: "Competitive Programming",
    tagline: "Train your problem-solving muscle.",
    description:
      "The CP team sharpens algorithmic thinking through regular practice, contests, and structured problem-solving sessions. We participate in Codeforces, LeetCode, and intercollegiate competitions.",
    color: "#f87171",
    icon: "Trophy",
    active: true,
    skills: ["C++", "Python", "Algorithms", "Data Structures", "Graph Theory"],
    lead: {
      id: "lead-cp",
      name: "[Team Lead Name]", // PLACEHOLDER
      role: "Competitive Programming Lead",
      avatarUrl: null,
      bio: "[Lead bio.]", // PLACEHOLDER
      focus: "[Current focus.]", // PLACEHOLDER
      welcomeNote:
        "Start from scratch, solve one problem a day. In six months you'll surprise yourself.",
      links: {},
    },
  },
  {
    id: "app-development",
    name: "App Development",
    tagline: "Ship apps people actually use.",
    description:
      "The app team builds mobile and cross-platform applications. We work with React Native, Flutter, and native Android/iOS development depending on the project.",
    color: "#c084fc",
    icon: "Smartphone",
    active: true,
    skills: ["React Native", "Flutter", "Firebase", "Expo", "UI/UX"],
    lead: {
      id: "lead-app",
      name: "[Team Lead Name]", // PLACEHOLDER
      role: "App Development Lead",
      avatarUrl: null,
      bio: "[Lead bio.]", // PLACEHOLDER
      focus: "[Current focus.]", // PLACEHOLDER
      welcomeNote:
        "The best way to learn app development is to ship something — no matter how small.",
      links: {},
    },
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    tagline: "Think like an attacker. Build like a defender.",
    description:
      "The security team explores ethical hacking, CTF competitions, network security, and secure software practices. We learn to break things so we can build them better.",
    color: "#fbbf24",
    icon: "Shield",
    active: false, // PLACEHOLDER — confirm whether this team is active
    skills: ["CTF", "Linux", "Networking", "Python", "OWASP"],
    lead: null, // PLACEHOLDER — assign when lead is confirmed
  },
  {
    id: "open-source",
    name: "Open Source",
    tagline: "Contribute to software the world uses.",
    description:
      "The open source team guides members toward making their first contributions to real open source projects. We participate in Hacktoberfest, GSOC, and other community programs.",
    color: "#34d399",
    icon: "GitBranch",
    active: false, // PLACEHOLDER — confirm whether this team is active
    skills: ["Git", "GitHub", "Code Review", "Documentation", "Any Stack"],
    lead: null, // PLACEHOLDER
  },
];

export function getActiveTeams(): Team[] {
  return teams.filter((t) => t.active);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}
