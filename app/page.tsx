/**
 * Geek Room — Official Homepage (/)
 * Modeled directly on the live Geek Room digital experience (geekroom.co.in).
 *
 * Sections:
 * - 00 Hero Section: 3D Geek Room logo + headline + dual-row partner marquee ticker
 * - 01 Events on the track: Horizontal pinned scroll track with flagship edition cards
 * - 02 Work with us, get seen: Bento grid offerings & community stats
 * - 03 Numbers that compound: Measured growth metrics with logarithmic progress bars
 * - 04 Learn. Connect. Grow.: Origin story from MSIT to global builder community
 * - 05 Voices on stage: Mentors, founders, and speakers showcase
 * - 06 Partners who back the build: Supporting global brands and AI labs
 * - 07 Loved by builders: Testimonials from partners & hackers
 * - 08 Questions, answered: Interactive FAQ accordion
 */

import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import EventsTrackSection from "@/components/sections/EventsTrackSection";
import WorkWithUsSection from "@/components/sections/WorkWithUsSection";
import NumbersSection from "@/components/sections/NumbersSection";
import LearnConnectGrowSection from "@/components/sections/LearnConnectGrowSection";
import VoicesSection from "@/components/sections/VoicesSection";
import PartnersSection from "@/components/sections/PartnersSection";
import LovedByBuildersSection from "@/components/sections/LovedByBuildersSection";
import FaqSection from "@/components/sections/FaqSection";

export const metadata: Metadata = {
  title: "Geek Room — Meet the smarter community",
  description:
    "Geek Room is a global community of 150K+ builders, where developers, founders and 80+ partner companies hack, meet and build in public, online and in person.",
};

export default function HomePage() {
  return (
    <div className="relative flex flex-col">
      {/* 00 Hero: 3D Logo Scene, Animated Particles & Live Marquee */}
      <HeroSection />

      {/* 01 Events on the track (Pinned Horizontal Scroll Track) */}
      <EventsTrackSection />

      {/* 02 Work with us, get seen (Bento Grid) */}
      <WorkWithUsSection />

      {/* 03 Numbers that compound (Animated Logarithmic Metrics) */}
      <NumbersSection />

      {/* 04 Learn. Connect. Grow. (Sticky Rail + Origin Story) */}
      <LearnConnectGrowSection />

      {/* 05 Voices on stage (Speaker & Mentor Showcase) */}
      <VoicesSection />

      {/* 06 Partners who back the build (Partner Logo Grid) */}
      <PartnersSection />

      {/* 07 Loved by builders (Testimonial Quote Cards) */}
      <LovedByBuildersSection />

      {/* 08 Questions, answered (Interactive FAQ Accordion) */}
      <FaqSection />
    </div>
  );
}
