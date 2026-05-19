'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

function splitValue(value) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return { num: null, suffix: String(value) };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

export default function MetricCallout({ value, label, from }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const { num, suffix } = splitValue(value);
  const [display, setDisplay] = useState(num == null || reduced ? String(value) : `0${suffix}`);

  useEffect(() => {
    if (!inView || num == null || reduced) {
      if (num == null || reduced) setDisplay(String(value));
      return;
    }
    const controls = animate(0, num, {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const isInteger = Number.isInteger(num);
        const formatted = isInteger ? Math.round(latest) : latest.toFixed(1);
        setDisplay(`${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, num, suffix, reduced, value]);

  return (
    <div
      ref={ref}
      className="my-6 inline-flex flex-col items-start gap-1 rounded-lg border border-border bg-card px-5 py-4 text-card-text shadow-soft"
    >
      <div className="flex items-baseline gap-2">
        {from && (
          <span className="text-secondary text-base font-medium line-through">
            {from}
          </span>
        )}
        <span className="text-primary text-3xl font-bold tracking-tight tabular-nums">
          {display}
        </span>
      </div>
      <span className="text-secondary text-xs uppercase tracking-wider">
        {label}
      </span>
    </div>
  );
}
