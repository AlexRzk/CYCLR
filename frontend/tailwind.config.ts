import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core Palette - Bioluminescent against the void
        void: {
          DEFAULT: "#050505",
          deep: "#020202",
          surface: "#0A0A0A",
          elevated: "#111111",
        },
        holographic: {
          DEFAULT: "#E2E8F0",
          bright: "#F8FAFC",
          muted: "#94A3B8",
          dim: "#64748B",
        },
        chlorophyll: {
          DEFAULT: "#00FF94",
          bright: "#4DFFC0",
          muted: "#00CC77",
          dark: "#009959",
          glow: "rgba(0, 255, 148, 0.5)",
        },
        cyber: {
          DEFAULT: "#2563EB",
          bright: "#60A5FA",
          muted: "#1D4ED8",
          dark: "#1E3A8A",
          glow: "rgba(37, 99, 235, 0.5)",
        },
        // Glass panel system
        glass: {
          DEFAULT: "rgba(0, 0, 0, 0.2)",
          light: "rgba(255, 255, 255, 0.05)",
          border: "rgba(255, 255, 255, 0.05)",
          highlight: "rgba(255, 255, 255, 0.1)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 10vw, 8rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
      },
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fade-in 0.6s ease-out forwards",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "scale-in": "scale-in 0.4s ease-out forwards",
        "blur-in": "blur-in 0.8s ease-out forwards",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.8", filter: "brightness(1.2)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "blur-in": {
          "0%": { opacity: "0", filter: "blur(20px)" },
          "100%": { opacity: "1", filter: "blur(0)" },
        },
      },
      backdropBlur: {
        xs: "2px",
        "2xl": "40px",
        "3xl": "64px",
      },
      boxShadow: {
        "glow-sm": "0 0 20px rgba(0, 255, 148, 0.15)",
        glow: "0 0 40px rgba(0, 255, 148, 0.2)",
        "glow-lg": "0 0 60px rgba(0, 255, 148, 0.3)",
        "glow-cyber": "0 0 40px rgba(37, 99, 235, 0.3)",
        "inner-glow": "inset 0 0 60px rgba(0, 255, 148, 0.1)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        "glass-lg": "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-expo": "cubic-bezier(0.7, 0, 0.84, 0)",
        "in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
    },
  },
  plugins: [],
};

export default config;
