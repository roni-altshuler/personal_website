'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const ROLES = [
  'Biomolecular Engineer',
  'Bioinformatician',
  'PhD Researcher',
];

const CYCLE_MS = 2800;

export default function KineticHero() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % ROLES.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [reduced]);

  const currentRole = ROLES[index];

  // Longest role determines the row's reserved height so swaps don't
  // shift surrounding content.
  const longest = useMemo(
    () => ROLES.reduce((a, b) => (a.length >= b.length ? a : b)),
    []
  );

  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-start gap-3 px-6 pt-20 pb-12 md:pt-28 md:pb-16">
      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl font-bold tracking-tight text-text md:text-6xl"
      >
        Roni Altshuler
      </motion.h1>

      <div
        className="relative w-full text-2xl font-medium text-secondary md:text-4xl"
        aria-live="polite"
      >
        <span className="invisible whitespace-pre" aria-hidden="true">
          {longest}
        </span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentRole}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 text-primary"
          >
            {currentRole}
          </motion.span>
        </AnimatePresence>
      </div>
    </section>
  );
}
