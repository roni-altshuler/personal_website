'use client';

import {
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion';

const SPRING = { stiffness: 280, damping: 22, mass: 0.6 };
const MAX_TILT = 7;
const LIFT_PX = 10;
const SCALE_MAX = 1.035;

// Returns props to spread onto a motion element so it tilts toward the cursor
// and lifts on hover. Returns null when reduced motion is requested. Callers
// should fall back to a static element.
export default function useCardTilt() {
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const lift = useMotionValue(0);

  const sx = useSpring(px, SPRING);
  const sy = useSpring(py, SPRING);
  const slift = useSpring(lift, SPRING);

  const rotateY = useTransform(sx, (v) => v * MAX_TILT);
  const rotateX = useTransform(sy, (v) => -v * MAX_TILT);
  const scale = useTransform(slift, (v) => 1 + v * (SCALE_MAX - 1));
  const z = useTransform(slift, (v) => v * LIFT_PX);

  if (reduced) return { reduced: true };

  const onMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
    const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
    px.set(Math.max(-1, Math.min(1, nx)));
    py.set(Math.max(-1, Math.min(1, ny)));
  };
  const onMouseEnter = () => lift.set(1);
  const onMouseLeave = () => {
    px.set(0);
    py.set(0);
    lift.set(0);
  };

  return {
    reduced: false,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
    style: {
      rotateX,
      rotateY,
      scale,
      z,
      transformPerspective: 900,
      willChange: 'transform',
    },
  };
}
