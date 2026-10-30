/**
 * Geek Room — Shared Type Definitions
 *
 * This file is the single source of truth for data shapes used across
 * the application. When adding a new domain, add its types here.
 *
 * Content lives in lib/data/. These types enforce the shape of that content.
 */

// ============================================================
// TEAM
// ============================================================

export type TeamDomain =
  | "web-development"
  | "ai-ml"
  | "competitive-programming"
  | "app-development"
  | "cybersecurity"
  | "open-source";

export interface TeamLead {
  id: string;
  name: string;
  role: string;
  /** Path relative to /public — e.g. "/images/leads/jane.jpg" */
  avatarUrl: string | null;
  bio: string;
  focus: string;
  /** What a newcomer can expect from this team */
  welcomeNote: string;
  /** Verified social/GitHub links only */
  links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export interface Team {
  id: TeamDomain;
  name: string;
  tagline: string;
  description: string;
  /** Accent color token — must match one of the gr-* CSS custom properties */
  color: string;
  icon: string;
  lead: TeamLead | null;
  skills: string[];
  /** If false, team is planned but not yet active — do not list on public Teams page */
  active: boolean;
}

// ============================================================
// EVENT
// ============================================================

export type EventStatus = "upcoming" | "ongoing" | "past" | "cancelled";
export type EventCategory =
  | "workshop"
  | "hackathon"
  | "talk"
  | "competition"
  | "meetup"
  | "online";

export interface Event {
  id: string;
  title: string;
  tagline: string;
  description: string;
  category: EventCategory;
  status: EventStatus;
  /** ISO 8601 date string */
  date: string;
  /** ISO 8601 date string — for multi-day events */
  endDate?: string;
  venue: string | null;
  registrationUrl: string | null;
  /** Path relative to /public */
  coverImageUrl: string | null;
  /** Verified teams / domains this event is relevant to */
  relevantTeams: TeamDomain[];
  /** Skill level guidance */
  audience: "beginner" | "intermediate" | "advanced" | "all";
  /** For past events */
  recap?: {
    summary: string;
    photoUrls: string[];
    learningOutcomes: string[];
  };
}

// ============================================================
// PROJECT
// ============================================================

export type ProjectStatus = "completed" | "active" | "planned";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: ProjectStatus;
  /** Confirmed contributor names or handles */
  contributors: string[];
  techStack: string[];
  /** Path relative to /public */
  screenshotUrl: string | null;
  githubUrl: string | null;
  liveUrl: string | null;
  /** Which Geek Room team(s) this belongs to */
  teams: TeamDomain[];
  /** ISO 8601 completion or start date */
  date: string;
  featured: boolean;
}

// ============================================================
// ACHIEVEMENT
// ============================================================

export interface Achievement {
  id: string;
  title: string;
  description: string;
  /** ISO 8601 date */
  date: string;
  /** Verified prize/rank — do not fabricate */
  result: string | null;
  participants: string[];
  verifiedSource: string | null;
}

// ============================================================
// CHALLENGE (Feature B — Geek Room Challenge)
// ============================================================

export type ChallengeCategory =
  | "debug"
  | "logic"
  | "decode"
  | "algorithm"
  | "web-ui";

export type ChallengeDifficulty = "easy" | "medium" | "hard";

export interface Challenge {
  id: string;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  description: string;
  /** Plain-text problem statement */
  problem: string;
  hints: string[];
  /** Human-readable explanation shown after answer is revealed */
  explanation: string;
  /** Featured for "Challenge of the Week" rotation */
  featured: boolean;
  /** ISO 8601 date this challenge was added */
  addedDate: string;
}

// ============================================================
// QUIZ (Feature A — Find Your Geek)
// ============================================================

export interface QuizOption {
  id: string;
  label: string;
  /** Which team domains this option points toward */
  weights: Partial<Record<TeamDomain, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  domain: TeamDomain;
  score: number;
}

// ============================================================
// COMMUNITY SHOWCASE (Feature C — Made at Geek Room)
// ============================================================

export type ShowcaseItemType = "project" | "milestone" | "photo" | "story";

export interface ShowcaseItem {
  id: string;
  type: ShowcaseItemType;
  title: string;
  description: string;
  /** Verified contributor — do not fabricate */
  author: string | null;
  /** Path relative to /public */
  imageUrl: string | null;
  externalUrl: string | null;
  /** ISO 8601 date */
  date: string;
  teams: TeamDomain[];
}

// ============================================================
// SOCIETY STORY (Homepage "About" section)
// ============================================================

export interface StoryMilestone {
  /** Period label — e.g. a year or semester. Must be verified, never fabricated. */
  period: string;
  title: string;
  description: string;
}

export interface MissionGoal {
  title: string;
  description: string;
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface SocietyStory {
  /** Section eyebrow label */
  eyebrow: string;
  heading: string;
  intro: string;
  milestones: StoryMilestone[];
  goals: MissionGoal[];
  /** Why Geek Room is different from a generic college club */
  differentiators: Differentiator[];
}

// ============================================================
// NAVIGATION
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

// ============================================================
// SOCIAL LINKS
// ============================================================

export interface SocialLink {
  platform: string;
  url: string;
  /** Path relative to /public/icons/ or a Lucide icon name */
  icon: string;
}
