"use client";

/*
 * Linear-style background: a faint dot grid that sits behind everything
 * and gives the canvas surface a measured technical texture. No drifting
 * particles, no gradients — Linear's DESIGN.md explicitly forbids those
 * on marketing surfaces. Static and tiny; respects reduced-motion by
 * default since nothing animates.
 */
export default function V3Background() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "var(--canvas)",
        backgroundImage:
          "radial-gradient(circle at 1px 1px, var(--hairline-strong) 1px, transparent 0)",
        backgroundSize: "28px 28px",
        backgroundPosition: "0 0",
        opacity: 0.45,
      }}
    >
      {/* Soft mask so the dots fade toward the bottom — keeps content area calm */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--canvas) 90%)",
        }}
      />
    </div>
  );
}
