import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B2545",
          50: "#F2F5F9",
          100: "#E1E8F0",
          200: "#C3D0E0",
          300: "#94A9C4",
          400: "#5C7799",
          500: "#2E4E77",
          600: "#153560",
          700: "#0B2545",
          800: "#081B33",
          900: "#051122",
        },
        amber: {
          DEFAULT: "#F28C28",
          50: "#FEF6ED",
          100: "#FDE9D2",
          200: "#FAD0A2",
          300: "#F7B36C",
          400: "#F49C45",
          500: "#F28C28",
          600: "#D97113",
          700: "#A85A11",
        },
        ink: "#12202F",
        muted: "#5B6B7C",
        surface: "#F5F7FA",
        line: "#E3E8EF",
      },
      fontFamily: {
        sans: ["var(--font-latin-body)", "system-ui", "sans-serif"],
        display: ["var(--font-latin-display)", "system-ui", "sans-serif"],
        arabic: ["var(--font-arabic)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1rem",
        pill: "9999px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,37,69,0.04), 0 8px 24px rgba(11,37,69,0.06)",
        cardHover: "0 2px 4px rgba(11,37,69,0.06), 0 16px 40px rgba(11,37,69,0.12)",
        header: "0 1px 0 rgba(11,37,69,0.08)",
      },
      maxWidth: {
        content: "1200px",
        prose: "68ch",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
