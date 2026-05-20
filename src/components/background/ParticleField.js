'use client';

import { useEffect, useRef } from 'react';

// Grid layout
const SPACING = 32;            // px between dot centers
const MOBILE_BREAKPOINT = 768;

// Pulse parameters
const BASE_RADIUS = 0.8;       // smallest dot radius (px)
const RADIUS_RANGE = 2.4;      // peak-to-peak swing on top of BASE_RADIUS (px)
const PULSE_SPEED = 0.0026;    // rad per ms — quicker breathing, ~2.4 s cycle
const WAVE_K_X = 0.45;         // wave phase increment per column
const WAVE_K_Y = 0.28;         // wave phase increment per row
const PHASE_JITTER = 0.25;     // lower jitter so the diagonal wave reads cleanly

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const state = {
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      width: 0,
      height: 0,
      cols: 0,
      rows: 0,
      offsetX: 0,
      offsetY: 0,
      spacing: SPACING,
      jitter: new Float32Array(0),
      dotColor: 'rgba(31, 41, 55, 0.45)',
      reducedMotion: false,
      rafId: 0,
      running: false,
    };

    const readThemeColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const a = styles.getPropertyValue('--particle-color').trim();
      if (a) state.dotColor = a;
    };

    const layout = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      state.width = w;
      state.height = h;
      canvas.width = Math.floor(w * state.dpr);
      canvas.height = Math.floor(h * state.dpr);
      ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);

      state.spacing = window.innerWidth < MOBILE_BREAKPOINT ? 26 : SPACING;
      const s = state.spacing;
      state.cols = Math.ceil(w / s) + 1;
      state.rows = Math.ceil(h / s) + 1;
      // Center the grid so dots sit on a margin from the edges.
      state.offsetX = (w - (state.cols - 1) * s) / 2;
      state.offsetY = (h - (state.rows - 1) * s) / 2;

      const total = state.cols * state.rows;
      if (state.jitter.length !== total) {
        state.jitter = new Float32Array(total);
        for (let i = 0; i < total; i++) {
          state.jitter[i] = (Math.random() - 0.5) * 2 * PHASE_JITTER;
        }
      }
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, state.width, state.height);
      ctx.fillStyle = state.dotColor;

      const { cols, rows, offsetX, offsetY, spacing, jitter } = state;
      const t = state.reducedMotion ? 0 : now * PULSE_SPEED;

      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing;
        const colPhase = col * WAVE_K_X;
        for (let row = 0; row < rows; row++) {
          const y = offsetY + row * spacing;
          const phase = colPhase + row * WAVE_K_Y + jitter[col * rows + row];
          // sin -> [-1, 1] -> [0, 1]
          const breath = (Math.sin(t + phase) + 1) * 0.5;
          const r = BASE_RADIUS + breath * RADIUS_RANGE;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now) => {
      draw(now);
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

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (!state.reducedMotion) start();
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (state.reducedMotion) draw(0);
    });

    const themeObserver = new MutationObserver(() => readThemeColors());

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      const reduce = motionQuery.matches;
      state.reducedMotion = reduce;
      if (reduce) {
        stop();
        draw(0);
      } else {
        start();
      }
    };

    readThemeColors();
    layout();

    state.reducedMotion = motionQuery.matches;
    if (state.reducedMotion) {
      draw(0);
    } else {
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
