"use client";

import { useEffect, useRef, useState } from "react";
import { FadeUp } from "../anim/Reveal";

/*
 * NarrativeScroll: the home "path" story as a sticky-stepper timeline. A sticky
 * chapter navigator on the left tracks which chapter is centered in the viewport
 * (via IntersectionObserver — a decorative highlight only); the chapters on the
 * right reveal with FadeUp as they scroll in. No scroll-jacking or pinning: every
 * chapter's text is always in the DOM (screen-reader / Ctrl+F safe), reveals
 * respect prefers-reduced-motion via FadeUp, and it degrades cleanly to a plain
 * stack on mobile (the stepper is hidden). Robust across viewport heights.
 */

function navLabel(eyebrow) {
  return eyebrow.replace(/^\d+\s*·\s*/, "");
}

export default function NarrativeScroll({ chapters }) {
  const [active, setActive] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.index));
          }
        });
      },
      // Fire when a chapter crosses the vertical middle of the viewport.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="My path" className="mx-auto max-w-5xl px-6">
      <div className="grid gap-8 md:grid-cols-[210px_1fr] md:gap-16">
        {/* Sticky chapter navigator (decorative; chapters carry the real text). */}
        <nav aria-hidden="true" className="hidden md:block">
          <ol className="sticky top-28 list-none space-y-4 pl-0">
            {chapters.map((c, i) => {
              const on = i === active;
              return (
                <li key={c.eyebrow} className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 flex-shrink-0 rounded-full transition-colors duration-300 ${
                      on ? "bg-linear-accent" : "bg-hairline-strong"
                    }`}
                  />
                  <span
                    className={`mono text-xs transition-colors duration-300 ${
                      on ? "text-ink" : "text-ink-tertiary"
                    }`}
                  >
                    {navLabel(c.eyebrow)}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <ol className="list-none space-y-16 border-l border-hairline pl-6 md:space-y-28 md:border-l-0 md:pl-0">
          {chapters.map((c, i) => (
            <li
              key={c.eyebrow}
              data-index={i}
              ref={(el) => (itemRefs.current[i] = el)}
              className="scroll-mt-28"
            >
              <FadeUp whileInView>
                <span className="eyebrow">{c.eyebrow}</span>
                <h3
                  className="mt-2 font-display text-3xl font-semibold text-ink md:text-[2.75rem]"
                  style={{ letterSpacing: "-0.03em", lineHeight: 1.08 }}
                >
                  {c.title}
                </h3>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
                  {c.body}
                </p>
              </FadeUp>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
