/**
 * Geek Room — Live Site Data & Content Architecture
 * Directly derived from official Geek Room digital properties (geekroom.co.in).
 */

export interface EventTicket {
  id: string;
  number: string;
  title: string;
  kind: string;
  categoryTag?: string;
  date: string;
  venue: string;
  cityCode: string;
  accentColor: string;
  slug: string;
  description: string;
}

export interface WorkOffering {
  id: string;
  number: string;
  title: string;
  description: string;
  highlights?: string[];
}

export interface StatMetric {
  number: string;
  suffix?: string;
  label: string;
  barWidthPercent: number;
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
  bullets?: string[];
}

export interface SpeakerItem {
  name: string;
  role: string;
  company: string;
  linkedinUrl?: string;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  organization: string;
  tag?: string;
}

export interface FaqItem {
  id: string;
  number: string;
  question: string;
  answer: string;
}

export const HERO_PARTNERS = [
  "GitHub",
  "Groq",
  "Mastercard",
  "Qdrant",
  "Vapi",
  "Omnidimension",
  "Pathway",
  "Battery Smart",
  "Paytm",
  "Meta",
  "Google",
  "Oracle",
  "Nagarro",
  "InvoLead",
];

export const EVENTS_ON_THE_TRACK: EventTicket[] = [
  {
    id: "hacksmart",
    number: "01",
    title: "HackSmart 2026",
    kind: "Hackathon · Hiring",
    date: "31 JAN 2026",
    venue: "Battery Smart HQ, Sector 62, Gurugram",
    cityCode: "GGN",
    accentColor: "#ff5a1f",
    slug: "hacksmart",
    description: "Real skills evaluation with fast-track hiring for high-growth tech teams.",
  },
  {
    id: "hackgeekroom",
    number: "02",
    title: "Hack Geek Room",
    kind: "Hackathon",
    date: "07 MAR 2026",
    venue: "OPSTree Global",
    cityCode: "NCR",
    accentColor: "#0eb0ba",
    slug: "hack-geek-room",
    description: "High-intensity 36-hour build marathon focused on production-grade systems.",
  },
  {
    id: "hackblr",
    number: "03",
    title: "HackBLR (MLH HackDays)",
    kind: "Hackathon",
    date: "26 APR 2026",
    venue: "Zintlr Private Limited, Bengaluru",
    cityCode: "BLR",
    accentColor: "#10b981",
    slug: "hackblr",
    description: "MLH affiliated builder gathering in the tech capital with top mentor access.",
  },
  {
    id: "meetup3",
    number: "04",
    title: "Geek Room Meetup #3",
    kind: "Meetup",
    date: "10 MAY 2026",
    venue: "Nagarro Corporate Office, Sector 18, Gurugram",
    cityCode: "GGN",
    accentColor: "#8b5cf6",
    slug: "meetup-3",
    description: "Intimate architecture discussions, engineering keynotes, and founder breakouts.",
  },
  {
    id: "airace",
    number: "05",
    title: "AI Race Month GrandPrix",
    kind: "Hackathon",
    date: "22 AUG 2026",
    venue: "Paytm Office, Sector 98, Noida",
    cityCode: "NOI",
    accentColor: "#f59e0b",
    slug: "ai-race",
    description: "Full month of autonomous AI agents, multi-modal pipelines, and live deployment.",
  },
  {
    id: "codecubicle6",
    number: "06",
    title: "Code Cubicle 6.0",
    kind: "Hackathon",
    date: "11 OCT 2026",
    venue: "Paytm Office, Noida",
    cityCode: "NOI",
    accentColor: "#ec4899",
    slug: "code-cubicle-6",
    description: "Geek Room's flagship hackathon championship celebrating 6 legendary editions.",
  },
];

export const WORK_OFFERINGS: WorkOffering[] = [
  {
    id: "hiring",
    number: "01",
    title: "Hiring Challenges",
    description:
      "Run hiring challenges with us and move past old-school recruitment. Evaluate candidates on the real skills that make them right for your team, like our Hire-A-Thon with InvoLead and HackSmart with Battery Smart.",
  },
  {
    id: "exclusive-hackathons",
    number: "02",
    title: "Exclusive Hackathons",
    description:
      "Host an exclusive hackathon with Geek Room, like our finales at Microsoft, Mastercard and Paytm, and get strong branding and deep developer engagement across 10+ media channels.",
  },
  {
    id: "speaker-sessions",
    number: "03",
    title: "Speaker Sessions",
    description:
      "Run speaker sessions to showcase your brand and tech, and help grow the open-source and build-in-public culture as hackers adopt your tools natively.",
  },
];

export const STATS_METRICS: StatMetric[] = [
  {
    number: "1,50,000",
    suffix: "+",
    label: "Builders in the community",
    barWidthPercent: 100,
  },
  {
    number: "25,000",
    suffix: "+",
    label: "Code Cubicle registrations across the first five editions",
    barWidthPercent: 85,
  },
  {
    number: "14,500",
    suffix: "+",
    label: "Applications for Code Kshetra 2.0",
    barWidthPercent: 72,
  },
  {
    number: "3,700",
    suffix: "+",
    label: "Builders registered for Code Cubicle 6.0",
    barWidthPercent: 58,
  },
  {
    number: "80",
    suffix: "+",
    label: "Partner companies, from AI labs to global brands",
    barWidthPercent: 44,
  },
];

export const PILLARS_DATA: PillarItem[] = [
  {
    number: "01",
    title: "Join 150K+ builders",
    description:
      "Be part of a global network of 150K+ developers, founders, engineers and students who hack, build and grow together: online from anywhere, and in person at partner offices.",
  },
  {
    number: "02",
    title: "Geek Room hackathons are a safe space to learn",
    description:
      "Our hackathons are built for learning, connecting and growing alongside your peers. Building in public is the way forward.",
  },
  {
    number: "03",
    title: "Network with the best people in industry",
    description:
      "Every Geek Room event is a chance to meet, talk to and learn from people across the industry. We've hosted finales at Microsoft, Mastercard and Paytm, and worked with 80+ companies including Google, Meta, GitHub, Groq, Qdrant, Pathway, Vapi and Oracle.",
  },
];

export const SPEAKERS_DATA: SpeakerItem[] = [
  {
    name: "Samyam Bhutani",
    role: "Partner Engineer",
    company: "Meta",
    linkedinUrl: "https://linkedin.com/in/sanyambhutani",
  },
  {
    name: "Nishchay Dhankar",
    role: "Founding Engineer",
    company: "Nace AI",
  },
  {
    name: "Ayon Roy",
    role: "Executive Data Scientist",
    company: "NielsenIQ",
  },
  {
    name: "Manav Gupta",
    role: "Founder / Engineer",
    company: "aka TensorBoy",
  },
  {
    name: "Sonu Kumar",
    role: "Founder",
    company: "AI Anytime",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    quote:
      "The execution was top-notch. The Geek Room team maintains a genuinely high standard of quality across every part of the event.",
    author: "Ankur Arora",
    role: "Vice President",
    organization: "Mastercard AI Garage",
  },
  {
    quote:
      "The innovation is what makes Geek Room different from other organisers. The sense of belonging among participants and the connections they build are unmatched.",
    author: "Siddharth Chugh",
    role: "Azure Engineer",
    organization: "Microsoft",
  },
  {
    quote:
      "They manage hackathons really well. I've been part of several hackathons, but Geek Room's organisation is commendable.",
    author: "Abhijit Kar",
    role: "Professor & Educator",
    organization: "PhysicsWallah",
  },
  {
    quote:
      "Great mentoring, great food and awesome management. The Geek Room team's hard work really shows. One of the few genuinely high-quality hackathons out there.",
    author: "Community Hacker",
    role: "Participant",
    organization: "Code Cubicle 3.0",
    tag: "From the hackers",
  },
  {
    quote:
      "The perfect mix of learning and networking. I'm walking away with fresh ideas, shipped code, and valuable connections.",
    author: "Full-Stack Builder",
    role: "Participant",
    organization: "HackBLR",
    tag: "From the hackers",
  },
];

export const FAQS_DATA: FaqItem[] = [
  {
    id: "faq-1",
    number: "01",
    question: "What does Geek Room do?",
    answer:
      "Geek Room helps companies reach and engage a global community of 150,000+ developers, founders and engineers through hackathons, meetups, roadshows, campaigns, speaker sessions and dedicated promotions. We also run skills-based hiring challenges so teams can evaluate talent by what they can build.",
  },
  {
    id: "faq-2",
    number: "02",
    question: "How do we join Geek Room?",
    answer:
      "You can join directly through our community Discord and Telegram channels, participate in our regular open hackathons, or attend local city meetups. Membership is free and open to curious builders at any experience level.",
  },
  {
    id: "faq-3",
    number: "03",
    question: "Can I join from outside India?",
    answer:
      "Yes! Geek Room is a global community with international participants in our online vibe-a-thons, virtual hiring challenges, and global hackathons.",
  },
  {
    id: "faq-4",
    number: "04",
    question: "How much do we charge for events?",
    answer:
      "Geek Room community hackathons and meetups are free for student and developer participants. For companies and sponsors looking to host branded hackathons or hiring challenges, we offer tailored partnership packages.",
  },
  {
    id: "faq-5",
    number: "05",
    question: "If I am an organizer / brand, how do I partner with Geek Room?",
    answer:
      "Reach out to team@geekroom.co.in or click 'Partner with us'. We will set up an intro call to understand your developer relation, tech adoption, or hiring goals.",
  },
];
