"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

/*
 * V3Hero — Linear-style display hero.
 * Eyebrow + giant display headline + lead paragraph + CTA pair.
 * The rotating "focus" line is the only motion piece — Linear keeps motion
 * scarce, but this preserves the kinetic feel from the previous design.
 */

const FOCI = [
  "single-cell transcriptomics",
  "spatial omics",
  "immunometabolism",
  "computational biology",
];

const CYCLE_MS = 2600;

export default function V3Hero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % FOCI.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const longest = useMemo(
    () => FOCI.reduce((a, b) => (a.length >= b.length ? a : b)),
    []
  );
  const current = FOCI[index];

  return (
    <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-28 md:pb-32 md:pt-36">
      <motion.span
        initial={reduced ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="eyebrow"
      >
        PhD Candidate · Ron-Harel Lab · Technion
      </motion.span>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 max-w-4xl font-display font-semibold text-ink"
        style={{
          fontSize: "clamp(2.75rem, 6.4vw, 5.5rem)",
          lineHeight: 1.02,
          letterSpacing: "-0.045em",
        }}
      >
        Building tools where{" "}
        <span className="text-linear-accent">biology meets code</span>.
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted md:text-xl"
        style={{ letterSpacing: "-0.005em" }}
      >
        I&apos;m Roni — a biomolecular engineer and bioinformatician working
        on how immune and metabolic pathways shape health and disease, with
        a current focus on{" "}
        <span
          className="relative inline-block align-baseline text-ink"
          aria-live="polite"
          style={{ minWidth: `${longest.length * 0.55}ch` }}
        >
          <span className="invisible" aria-hidden="true">
            {longest}
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={current}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 1 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 top-0 whitespace-nowrap text-linear-accent"
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
        .
      </motion.p>

      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10 flex flex-wrap items-center gap-3"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-md bg-linear-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-linear-accent-hover"
        >
          See what I&apos;m building
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-md border border-hairline bg-surface-1 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-hairline-strong hover:bg-surface-2"
        >
          Get in touch
        </Link>
      </motion.div>
    </section>
  );
}
