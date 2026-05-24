/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/content/**/*.{md,mdx}",
  ],
  darkMode: ['selector', 'html[data-theme="dark"]'],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        bg: "var(--background-color)",
        "bg-secondary": "var(--background-secondary)",
        card: "var(--card-background-color)",
        text: "var(--text-color)",
        "card-text": "var(--card-text-color)",
        primary: "var(--primary-color)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary-color)",
        border: "var(--border-color)",

        // Linear ladder
        canvas: "var(--canvas)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        "surface-4": "var(--surface-4)",
        hairline: "var(--hairline)",
        "hairline-strong": "var(--hairline-strong)",
        "hairline-tertiary": "var(--hairline-tertiary)",
        ink: "var(--ink)",
        "ink-muted": "var(--ink-muted)",
        "ink-subtle": "var(--ink-subtle)",
        "ink-tertiary": "var(--ink-tertiary)",
        "linear-accent": "var(--linear-accent)",
        "linear-accent-hover": "var(--linear-accent-hover)",
        "linear-accent-focus": "var(--linear-accent-focus)",
        "linear-success": "var(--linear-success)",
      },
      fontFamily: {
        sans: [
          "var(--font-display)",
          "Inter Display",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "var(--font-display)",
          "Inter Display",
          "Inter",
          "-apple-system",
          "SF Pro Display",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "JetBrains Mono",
          "SF Mono",
          "Menlo",
          "ui-monospace",
          "monospace",
        ],
      },
      borderRadius: {
        xs: "4px",
        sm: "6px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      spacing: {
        // Linear spacing tokens (in addition to Tailwind defaults)
        "section": "96px",
      },
      boxShadow: {
        soft: "0 1px 0 var(--hairline), 0 1px 2px var(--shadow-color)",
        hover: "0 1px 0 var(--hairline), 0 8px 24px var(--shadow-hover)",
        glow:
          "0 1px 0 var(--hairline-strong), 0 0 0 1px var(--linear-accent-focus), 0 0 48px -8px var(--accent-glow)",
        "ring-accent": "0 0 0 1px var(--linear-accent-focus), 0 0 0 4px var(--accent-glow)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "linear-spring": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      letterSpacing: {
        "display-xl": "-0.045em",
        "display-lg": "-0.032em",
        "display-md": "-0.025em",
        "display-sm": "-0.015em",
        "body-tight": "-0.005em",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(2%, -3%, 0) rotate(0.5deg)" },
        },
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "aurora-drift": "aurora-drift 24s ease-in-out infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
