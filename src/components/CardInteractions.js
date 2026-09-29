'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const SELECTOR = '[data-motion-card]';
const PROFILES = {
  standard: { angle: 6 },
  subtle: { angle: 3 },
  compact: { angle: 4 },
};

/** Enhance server-rendered surfaces without changing their links or reading order. */
export default function CardInteractions() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let active = null;
    let bounds = null;
    let frame = 0;
    let point = null;

    const reset = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      if (active) {
        active.removeAttribute('data-pointer-active');
        // Leave the last light position in place while it fades out.
        for (const key of ['--card-rx', '--card-ry']) active.style.removeProperty(key);
      }
      active = null;
      bounds = null;
      point = null;
    };

    const paint = () => {
      frame = 0;
      if (!active?.isConnected || !bounds || !point || !media.matches) { reset(); return; }
      const x = Math.max(0, Math.min(bounds.width, point.x - bounds.left));
      const y = Math.max(0, Math.min(bounds.height, point.y - bounds.top));
      const profile = PROFILES[active.dataset.motionCard] || PROFILES.subtle;
      // Cap rotation on broad reading panels so their text stays comfortable to read.
      const rx = Math.min(profile.angle, 1600 / bounds.height);
      const ry = Math.min(profile.angle, 1800 / bounds.width);
      active.style.setProperty('--card-rx', `${(-(y / bounds.height * 2 - 1) * rx).toFixed(3)}deg`);
      active.style.setProperty('--card-ry', `${((x / bounds.width * 2 - 1) * ry).toFixed(3)}deg`);
      active.style.setProperty('--spot-x', `${x.toFixed(1)}px`);
      active.style.setProperty('--spot-y', `${y.toFixed(1)}px`);
      active.setAttribute('data-pointer-active', 'true');
    };

    const move = event => {
      if (!media.matches || event.pointerType !== 'mouse' || event.buttons) { reset(); return; }
      const card = event.target instanceof Element ? event.target.closest(SELECTOR) : null;
      if (!card) { reset(); return; }
      if (card !== active) {
        reset();
        active = card;
        // Read once per entry, before applying perspective, to avoid feedback jitter.
        bounds = card.getBoundingClientRect();
      }
      point = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const leave = event => {
      if (active && (!(event.relatedTarget instanceof Node) || !active.contains(event.relatedTarget))) reset();
    };
    const keydown = event => { if (event.key === 'Tab' || event.key === 'Escape') reset(); };

    document.addEventListener('pointerover', move, { passive: true });
    document.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });
    document.addEventListener('pointerdown', reset, { passive: true });
    document.addEventListener('pointercancel', reset, { passive: true });
    document.addEventListener('keydown', keydown);
    document.addEventListener('visibilitychange', reset);
    window.addEventListener('blur', reset);
    window.addEventListener('resize', reset, { passive: true });
    window.addEventListener('scroll', reset, { passive: true, capture: true });
    media.addEventListener('change', reset);

    return () => {
      reset();
      document.removeEventListener('pointerover', move);
      document.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      document.removeEventListener('pointerdown', reset);
      document.removeEventListener('pointercancel', reset);
      document.removeEventListener('keydown', keydown);
      document.removeEventListener('visibilitychange', reset);
      window.removeEventListener('blur', reset);
      window.removeEventListener('resize', reset);
      window.removeEventListener('scroll', reset, true);
      media.removeEventListener('change', reset);
    };
  }, [pathname]);

  return null;
}
