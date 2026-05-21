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
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 4px 12px var(--shadow-color)",
        hover: "0 8px 24px var(--shadow-hover)",
        glow:
          "0 16px 32px var(--shadow-hover), 0 0 0 1px var(--primary-color), 0 0 36px var(--accent-glow)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
