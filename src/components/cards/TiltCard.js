'use client';

import React from 'react';
import { motion } from 'framer-motion';
import useCardTilt from './useCardTilt';

export default function TiltCard({
  as = 'a',
  className,
  children,
  ...rest
}) {
  const tilt = useCardTilt();

  if (tilt.reduced) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.a;
  return (
    <MotionTag
      className={className}
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
