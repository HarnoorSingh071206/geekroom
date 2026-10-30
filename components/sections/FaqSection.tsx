"use client";

/**
 * Geek Room — FAQ Section
 * Interactive questions and answers accordion.
 * Direct implementation of Section 08 from geekroom.co.in.
 */

import { useState } from "react";
import { FAQS_DATA } from "@/lib/data/liveSiteData";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="shell grid grid-cols-[minmax(0,1fr)] gap-12 py-24 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
      {/* Left Column */}
      <div>
        <div className="flex flex-wrap items-start gap-x-4 gap-y-2">
          <h2 className="display min-w-0 text-[clamp(2.2rem,8vw,5rem)]">
            Questions, <em>answered</em>
          </h2>
          <span className="label mt-2 shrink-0 tabular-nums px-2.5 py-0.5 rounded-full border border-white/20 bg-white/10 text-white font-bold text-xs">
            ( 08 )
          </span>
        </div>
        <p className="mt-6 max-w-[36rem] text-lg md:text-xl font-semibold leading-relaxed text-[#f4f6fc]">
          Still curious? Our inbox is always open.
        </p>

        <div className="mt-8">
          <Link
            href="mailto:team@geekroom.co.in"
            className="btn-ghost"
          >
            team@geekroom.co.in
            <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Accordion Column */}
      <div className="border-t border-white/15">
        {FAQS_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border-b border-white/15 py-6 transition-colors duration-200"
            >
              <button
                type="button"
                onClick={() => toggle(faq.id)}
                className="flex w-full items-start justify-between gap-6 text-left group cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-[var(--orange)] mt-1 tabular-nums font-extrabold">
                    {faq.number}
                  </span>
                  <span className="font-display text-lg font-black text-white group-hover:text-[var(--orange)] transition-colors md:text-xl">
                    {faq.question}
                  </span>
                </div>
                <span className="shrink-0 rounded-full border border-white/20 bg-white/10 p-1.5 text-white transition-transform group-hover:border-white">
                  {isOpen ? (
                    <Minus className="size-4 text-[var(--orange)]" />
                  ) : (
                    <Plus className="size-4" />
                  )}
                </span>
              </button>

              {isOpen && (
                <div className="mt-4 pl-8 text-base md:text-lg font-semibold leading-relaxed text-[#f4f6fc]">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
