/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#070A10",
          card: "#0C101A",
          elevated: "#121826",
          border: "#1E273A",
          hover: "#182032",
        },
        bullish: {
          DEFAULT: "#10B981",
          light: "#34D399",
          dark: "#059669",
          glow: "rgba(16, 185, 129, 0.2)",
        },
        bearish: {
          DEFAULT: "#F43F5E",
          light: "#FB7185",
          dark: "#E11D48",
          glow: "rgba(244, 63, 94, 0.2)",
        },
        ai: {
          cyan: "#06B6D4",
          blue: "#3B82F6",
          purple: "#8B5CF6",
          indigo: "#6366F1",
          gradientStart: "#6366F1",
          gradientEnd: "#06B6D4",
        },
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glass-sm": "0 4px 16px 0 rgba(0, 0, 0, 0.25)",
        "glow-bullish": "0 0 20px -2px rgba(16, 185, 129, 0.35)",
        "glow-bearish": "0 0 20px -2px rgba(244, 63, 94, 0.35)",
        "glow-ai": "0 0 25px -4px rgba(99, 102, 241, 0.4)",
        "glow-cyan": "0 0 25px -4px rgba(6, 182, 212, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite linear",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
