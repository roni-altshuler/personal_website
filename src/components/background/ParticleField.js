'use client';

import { useEffect, useRef } from 'react';

// Grid layout
const SPACING = 32;            // px between dot centers
const MOBILE_BREAKPOINT = 768;

// Wave parameters — ocean-swell feel: slow, mostly horizontal, gentle bob.
const BASE_RADIUS = 0.8;       // smallest dot radius (px)
const RADIUS_RANGE = 2.4;      // peak-to-peak swing on top of BASE_RADIUS (px)
const PULSE_SPEED = 0.0028;    // rad/ms — ~2.2 s swell period
const WAVE_K_X = 0.45;         // wave phase per column — drives right-to-left travel
const WAVE_K_Y = 0.16;         // wave phase per row — small to keep the wave mostly horizontal
const PHASE_JITTER = 0.08;     // light jitter — keeps the wave organic without breaking it
const BOB_AMP = 4;             // vertical bob (px) — dots rise/fall like ocean particles

// Color gradient — hue shifts with the wave so the gradient travels with it.
// Centered on the site's violet accent; range ±HUE_RANGE degrees.
const HUE_BASE = 260;          // violet
const HUE_RANGE = 40;          // ±40° → blue-violet ↔ magenta
const PALETTE_SIZE = 64;       // quantization of wave [-1, 1] into color stops

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
      palette: new Array(PALETTE_SIZE),
      reducedMotion: false,
      rafId: 0,
      running: false,
    };

    const buildPalette = () => {
      const root = document.documentElement;
      const dark =
        root.getAttribute('data-theme') === 'dark' ||
        (!root.getAttribute('data-theme') &&
          window.matchMedia('(prefers-color-scheme: dark)').matches);
      const sat = dark ? 70 : 55;
      const light = dark ? 70 : 38;
      const alpha = dark ? 0.55 : 0.5;
      for (let i = 0; i < PALETTE_SIZE; i++) {
        const w = (i / (PALETTE_SIZE - 1)) * 2 - 1; // [-1, 1]
        const hue = HUE_BASE + w * HUE_RANGE;
        state.palette[i] = `hsla(${hue.toFixed(1)}, ${sat}%, ${light}%, ${alpha})`;
      }
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

      const { cols, rows, offsetX, offsetY, spacing, jitter, palette } = state;
      const t = state.reducedMotion ? 0 : now * PULSE_SPEED;
      const lastIdx = PALETTE_SIZE - 1;

      for (let col = 0; col < cols; col++) {
        const x = offsetX + col * spacing;
        const colPhase = col * WAVE_K_X;
        for (let row = 0; row < rows; row++) {
          const y = offsetY + row * spacing;
          const phase = colPhase + row * WAVE_K_Y + jitter[col * rows + row];
          // Single wave drives size, vertical bob, and color so they crest together.
          const wave = Math.sin(t + phase); // [-1, 1]
          const breath = (wave + 1) * 0.5;  // [0, 1]
          const r = BASE_RADIUS + breath * RADIUS_RANGE;
          const bob = state.reducedMotion ? 0 : -wave * BOB_AMP; // rise at crest
          ctx.fillStyle = palette[(breath * lastIdx) | 0];
          ctx.beginPath();
          ctx.arc(x, y + bob, r, 0, Math.PI * 2);
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

    const themeObserver = new MutationObserver(() => {
      buildPalette();
      if (state.reducedMotion) draw(0);
    });

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

    buildPalette();
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
