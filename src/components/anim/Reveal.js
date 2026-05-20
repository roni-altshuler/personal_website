'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// Block-level fade-up. `delay` in seconds, `whileInView` for scroll-trigger
// (default false — fires on mount).
export function FadeUp({
  children,
  delay = 0,
  duration = 0.55,
  y = 16,
  whileInView = false,
  className,
  as = 'div',
  ...rest
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  const initial = reduced ? false : { opacity: 0, y };
  const target = { opacity: 1, y: 0 };
  const transition = { duration, delay, ease: EASE };

  if (whileInView) {
    return (
      <MotionTag
        className={className}
        initial={initial}
        whileInView={target}
        viewport={{ once: true, amount: 0.2 }}
        transition={transition}
        {...rest}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={initial}
      animate={target}
      transition={transition}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

// Word-by-word reveal — preserves natural line-wrapping while reading like
// a typing animation. Splits on whitespace; rejoins with the original spaces.
export function TypeIn({
  text,
  delay = 0,
  perWord = 0.05,
  className,
  as = 'p',
}) {
  const reduced = useReducedMotion();
  const Tag = as;

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const words = text.split(/(\s+)/); // keeps whitespace as separate tokens

  return (
    <Tag className={className}>
      {words.map((word, i) => {
        if (/^\s+$/.test(word)) return word;
        return (
          <motion.span
            key={i}
            className="inline-block whitespace-pre"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: delay + i * perWord * 0.5,
              ease: EASE,
            }}
          >
            {word}
          </motion.span>
        );
      })}
    </Tag>
  );
}
