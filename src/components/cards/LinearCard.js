"use client";

import { motion } from "framer-motion";
import useCardTilt from "./useCardTilt";

/*
 * LinearCard: surface-1 card with hairline border (Linear surfaces).
 * Interactive variant adds mouse-tracked 3D tilt + lift + violet glow on
 * hover via useCardTilt. Static variant skips all motion. Reduced-motion
 * users get the static variant automatically (useCardTilt returns
 * { reduced: true } in that case).
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
  const tilt = useCardTilt();
  const isLink = !!href;
  const elementType = isLink ? "a" : Tag;

  const base = `relative block rounded-lg border border-hairline bg-surface-1 ${padding} transition-[border-color,box-shadow,background-color] duration-300 ease-out`;
  const hover = interactive
    ? "hover:border-linear-accent hover:bg-surface-2 hover:shadow-glow"
    : "";
  const cls = `${base} ${hover} ${className}`.trim();

  if (!interactive || tilt.reduced) {
    const Plain = elementType;
    return (
      <Plain href={href} className={cls} {...rest}>
        {children}
      </Plain>
    );
  }

  const MotionTag = motion[elementType] || motion.div;
  return (
    <MotionTag
      href={href}
      className={cls}
      onMouseMove={tilt.onMouseMove}
      onMouseEnter={tilt.onMouseEnter}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
