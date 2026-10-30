/**
 * Geek Room — Site Configuration
 *
 * CONTENT STATUS: Social links are PLACEHOLDER.
 * Replace with actual verified URLs before launch.
 * See docs/CONTENT_STATUS.md for full checklist.
 */

import type { NavItem, SocialLink } from "@/lib/types";

export const SITE_NAME = "Geek Room";
export const SITE_TAGLINE = "Build. Learn. Belong.";
export const SITE_DESCRIPTION =
  "A college technology society for students passionate about coding, AI, and building things.";

/**
 * Replace with actual verified social links before launch.
 *
 * NOTE: lucide-react does not export brand icons (Github, Instagram, Linkedin).
 * We use generic equivalents here. For branded SVGs, add custom icons
 * to /public/icons/ and render them with <img> or <Image>.
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "Discord",
    url: "#",  // PLACEHOLDER — add verified Discord invite link
    icon: "MessageSquare",
  },
  {
    platform: "Instagram",
    url: "#",  // PLACEHOLDER — add verified Instagram URL
    icon: "Camera",
  },
  {
    platform: "LinkedIn",
    url: "#",  // PLACEHOLDER — add verified LinkedIn URL
    icon: "Globe",
  },
  {
    platform: "GitHub",
    url: "#",  // PLACEHOLDER — add verified GitHub org URL
    icon: "GitBranch",
  },
];

export const navItems: NavItem[] = [
  { label: "Home",     href: "/" },
  { label: "Teams",    href: "/teams" },
  { label: "Events",   href: "/events" },
  { label: "Projects", href: "/projects" },
  { label: "Archive",  href: "/archive" },
  { label: "Join",     href: "/join" },
];
