'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

const SPRING = { stiffness: 250, damping: 18, mass: 0.4 };
const MAX_PULL = 8;

export default function MagneticButton({
  as: Tag = 'a',
  className = '',
  children,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  function handleMove(e) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    x.set(Math.max(-1, Math.min(1, dx)) * MAX_PULL);
    y.set(Math.max(-1, Math.min(1, dy)) * MAX_PULL);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const MotionTag = motion[Tag] || motion.a;

  return (
    <MotionTag
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
