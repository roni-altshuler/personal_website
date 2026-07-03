'use client';

import { useEffect, useRef } from 'react';

/*
 * NetworkField: an abstract force-directed node/network field evoking a
 * gene/protein interaction graph — synthetic nodes only, never real data.
 * Canvas 2D (a ~120-node graph is trivially 60fps; WebGL would add bundle +
 * shader surface for no visible gain at this scale).
 *
 * Reuses the ParticleField lifecycle discipline: DPR capped at 2, rAF paused on
 * hidden tab, relayout via ResizeObserver, and a single static frame under
 * prefers-reduced-motion (no loop). Colors read from --linear-accent so the
 * accent cascades. Cursor listener lives on window (the canvas is
 * pointer-events:none so hero CTAs stay clickable) and is disabled on coarse
 * pointers.
 */

const MOBILE_BREAKPOINT = 768;
const DENSITY = 14000;        // px² of viewport per node
const MAX_NODES = 120;
const MIN_NODES = 20;
const LINK_DIST = 150;        // px — draw an edge below this (scaled on mobile)
const DRIFT = 0.12;           // base node speed (px/frame)
const NODE_R = 1.6;           // base node radius (px)
const CURSOR_R = 170;         // repulsion radius (px)
const CURSOR_PUSH = 26;       // peak displacement at the cursor (px)
const EASE = 0.12;            // pointer strength ease-in/out per frame

function readAccent() {
  const raw =
    getComputedStyle(document.documentElement)
      .getPropertyValue('--linear-accent')
      .trim() || '#a78bfa';
  let hex = raw.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
  const n = parseInt(hex, 16);
  return {
    r: (n >> 16) & 255,
    g: (n >> 8) & 255,
    b: n & 255,
  };
}

export default function NetworkField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;

    const state = {
      dpr: Math.min(window.devicePixelRatio || 1, 2),
      width: 0,
      height: 0,
      nodes: [],
      linkDist: LINK_DIST,
      accent: readAccent(),
      // Pointer: target is where the cursor is; strength eases 0→1 while present.
      pointerX: 0,
      pointerY: 0,
      pointerActive: false,
      strength: 0,
      reducedMotion: false,
      rafId: 0,
      running: false,
    };

    const seed = () => {
      const area = state.width * state.height;
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      const target = Math.round(area / DENSITY);
      const count = Math.max(MIN_NODES, Math.min(mobile ? 56 : MAX_NODES, target));
      state.linkDist = mobile ? 120 : LINK_DIST;
      state.nodes = new Array(count);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = DRIFT * (0.4 + Math.random() * 0.8);
        state.nodes[i] = {
          x: Math.random() * state.width,
          y: Math.random() * state.height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          r: NODE_R + Math.random() * 1.4,
        };
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
      seed();
    };

    const draw = () => {
      const { width, height, nodes, accent, linkDist } = state;
      ctx.clearRect(0, 0, width, height);

      if (!state.reducedMotion) {
        // Integrate drift + bounce off edges.
        for (let i = 0; i < nodes.length; i++) {
          const p = nodes[i];
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
          p.x = Math.max(0, Math.min(width, p.x));
          p.y = Math.max(0, Math.min(height, p.y));
        }

        // Ease cursor strength toward present/absent.
        const targetStrength = state.pointerActive ? 1 : 0;
        state.strength += (targetStrength - state.strength) * EASE;
      }

      // Render positions apply cursor repulsion on top of drift positions.
      const strength = state.strength;
      const useCursor = !state.reducedMotion && !coarsePointer && strength > 0.001;
      const rx = new Float32Array(nodes.length);
      const ry = new Float32Array(nodes.length);
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        let x = p.x;
        let y = p.y;
        if (useCursor) {
          const dx = x - state.pointerX;
          const dy = y - state.pointerY;
          const d2 = dx * dx + dy * dy;
          if (d2 < CURSOR_R * CURSOR_R) {
            const d = Math.sqrt(d2) || 0.001;
            const f = 1 - d / CURSOR_R;
            const push = f * f * CURSOR_PUSH * strength;
            x += (dx / d) * push;
            y += (dy / d) * push;
          }
        }
        rx[i] = x;
        ry[i] = y;
      }

      // Edges: distance-culled all-pairs (N≤120 → cheap; d2 compared before sqrt).
      const { r, g, b } = accent;
      const maxD2 = linkDist * linkDist;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = rx[i] - rx[j];
          const dy = ry[i] - ry[j];
          const d2 = dx * dx + dy * dy;
          if (d2 >= maxD2) continue;
          const t = 1 - Math.sqrt(d2) / linkDist;
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${(t * 0.32).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(rx[i], ry[i]);
          ctx.lineTo(rx[j], ry[j]);
          ctx.stroke();
        }
      }

      // Nodes.
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.85)`;
      for (let i = 0; i < nodes.length; i++) {
        ctx.beginPath();
        ctx.arc(rx[i], ry[i], nodes[i].r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      state.rafId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (state.running || state.reducedMotion) return;
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

    const handlePointerMove = (e) => {
      state.pointerX = e.clientX;
      state.pointerY = e.clientY;
      state.pointerActive = true;
    };
    const handlePointerLeave = () => {
      state.pointerActive = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      layout();
      if (state.reducedMotion) draw();
    });

    const themeObserver = new MutationObserver(() => {
      state.accent = readAccent();
      if (state.reducedMotion) draw();
    });

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => {
      state.reducedMotion = motionQuery.matches;
      if (state.reducedMotion) {
        stop();
        draw();
      } else {
        start();
      }
    };

    layout();
    state.reducedMotion = motionQuery.matches;
    if (state.reducedMotion) {
      draw();
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
    if (!coarsePointer) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
      document.addEventListener('pointerleave', handlePointerLeave);
    }

    return () => {
      stop();
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (!coarsePointer) {
        window.removeEventListener('pointermove', handlePointerMove);
        document.removeEventListener('pointerleave', handlePointerLeave);
      }
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
      }}
    />
  );
}
