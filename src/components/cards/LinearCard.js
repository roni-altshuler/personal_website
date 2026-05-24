"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
 * LinearCard — surface-lift card per Linear DESIGN.md.
 * Default: surface-1 background, 1px hairline border, 12px radius.
 * Hover: lifts 1px, swaps border to linear-accent-focus, soft glow.
 * No 3D tilt (Linear doesn't do it). Works inside <FadeUp> for entry stagger.
 */
export default function LinearCard({
  as: Tag = "div",
  href,
  className = "",
  children,
  padding = "p-6",
  interactive = true,
  ...rest
}) {
  const reduced = useReducedMotion();
  const isLink = !!href;
  const MotionTag = motion(isLink ? "a" : Tag);

  const base = `relative block rounded-lg border border-hairline bg-surface-1 ${padding} transition-colors duration-200`;
  const hover = interactive
    ? "hover:border-linear-accent-focus hover:bg-surface-2"
    : "";
  const cls = `${base} ${hover} ${className}`.trim();

  if (reduced || !interactive) {
    const Plain = isLink ? "a" : Tag;
    return (
      <Plain href={href} className={cls} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <MotionTag
      href={href}
      className={cls}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
