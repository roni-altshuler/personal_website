'use client';

import { useEffect, useRef } from 'react';

const DESKTOP_PARTICLE_COUNT = 70;
const MOBILE_PARTICLE_COUNT = 25;
const LINK_DISTANCE = 130;
const CURSOR_RADIUS = 120;
const CURSOR_FORCE = 0.06;
const MAX_SPEED = 0.35;
const MOBILE_BREAKPOINT = 768;

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = {
      particles: [],
      mouse: { x: -9999, y: -9999, active: false },
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      width: 0,
      height: 0,
      isMobile: window.innerWidth < MOBILE_BREAKPOINT,
      particleColor: 'rgba(31, 41, 55, 0.45)',
      lineColor: 'rgba(124, 58, 237, 0.18)',
      reducedMotion: false,
      rafId: 0,
      running: false,
    };

    const readThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const p = styles.getPropertyValue('--particle-color').trim();
      const l = styles.getPropertyValue('--particle-line-color').trim();
      if (p) state.particleColor = p;
      if (l) state.lineColor = l;
    };

    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      state.width = w;
      state.height = h;
      canvas.width = Math.floor(w * state.dpr);
      canvas.height = Math.floor(h * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
    };

    const seedParticles = () => {
      const count = state.isMobile ? MOBILE_PARTICLE_COUNT : DESKTOP_PARTICLE_COUNT;
      state.particles = Array.from({ length: count }, () => ({
        x: Math.random() * state.width,
        y: Math.random() * state.height,
        vx: (Math.random() - 0.5) * MAX_SPEED,
        vy: (Math.random() - 0.5) * MAX_SPEED,
      }));
    };

    const drawDots = () => {
      ctx.fillStyle = state.particleColor;
      for (const p of state.particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawLines = () => {
      const threshold = LINK_DISTANCE;
      const base = state.lineColor;
      const rgbaMatch = base.match(/rgba?\(([^)]+)\)/);
      let r = 124, g = 58, b = 237, baseAlpha = 0.18;
      if (rgbaMatch) {
        const parts = rgbaMatch[1].split(',').map((s) => s.trim());
        r = parseFloat(parts[0]);
        g = parseFloat(parts[1]);
        b = parseFloat(parts[2]);
        if (parts[3] !== undefined) baseAlpha = parseFloat(parts[3]);
      }
      for (let i = 0; i < state.particles.length; i++) {
        for (let j = i + 1; j < state.particles.length; j++) {
          const a = state.particles[i];
          const c = state.particles[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < threshold * threshold) {
            const dist = Math.sqrt(dist2);
            const alpha = baseAlpha * (1 - dist / threshold);
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, state.width, state.height);
      const { mouse, particles, width, height, isMobile } = state;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += width;
        else if (p.x > width) p.x -= width;
        if (p.y < 0) p.y += height;
        else if (p.y > height) p.y -= height;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_RADIUS * CURSOR_RADIUS && d2 > 1) {
            const d = Math.sqrt(d2);
            const force = ((CURSOR_RADIUS - d) / CURSOR_RADIUS) * CURSOR_FORCE;
            p.vx += (dx / d) * force;
            p.vy += (dy / d) * force;
          }
        }

        const speed = Math.hypot(p.vx, p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
      }
      if (!isMobile) drawLines();
      drawDots();
    };

    const loop = () => {
      step();
      state.rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (state.running) return;
      state.running = true;
      state.rafId = requestAnimationFrame(loop);
    };

    const stop = () => {
      state.running = false;
      cancelAnimationFrame(state.rafId);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      state.mouse.x = e.clientX - rect.left;
      state.mouse.y = e.clientY - rect.top;
      state.mouse.active = true;
    };

    const handleMouseLeave = () => {
      state.mouse.active = false;
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (!state.reducedMotion) start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      state.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
      seedParticles();
      if (state.reducedMotion) {
        ctx.clearRect(0, 0, state.width, state.height);
        drawDots();
      }
    });

    const themeObserver = new MutationObserver(() => readThemeColors());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      const reduce = motionQuery.matches;
      state.reducedMotion = reduce;
      if (reduce) {
        stop();
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        ctx.clearRect(0, 0, state.width, state.height);
        drawDots();
      } else {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mouseleave', handleMouseLeave);
        start();
      }
    };

    readThemeColors();
    resize();
    seedParticles();

    state.reducedMotion = motionQuery.matches;
    if (state.reducedMotion) {
      drawDots();
    } else {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseleave', handleMouseLeave);
      start();
    }

    resizeObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    motionQuery.addEventListener('change', handleMotionChange);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      stop();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionChange);
      themeObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: -1,
        transition: 'none',
      }}
    />
  );
}
