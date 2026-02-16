import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "var(--brand-bg)",
          surface: "var(--brand-surface)",
          card: "var(--brand-card)",
          border: "var(--brand-border)",
          gold: "var(--brand-gold)",
          gold2: "var(--brand-gold-2)",
          muted: "var(--brand-muted)",
        },
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
