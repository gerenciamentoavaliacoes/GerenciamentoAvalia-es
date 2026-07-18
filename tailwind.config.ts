import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f2f4ff",
          100: "#e6e9fe",
          200: "#c9cffd",
          300: "#a7affb",
          400: "#8683f7",
          500: "#6a5cf0",
          600: "#5641e0",
          700: "#4632bd",
          800: "#392a97",
          900: "#302679",
          950: "#1d1550",
        },
      },
      boxShadow: {
        soft: "0 1px 2px 0 rgb(15 23 42 / 0.04), 0 1px 6px -1px rgb(15 23 42 / 0.06)",
        card: "0 2px 4px -1px rgb(15 23 42 / 0.04), 0 4px 12px -2px rgb(15 23 42 / 0.08)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #6a5cf0 0%, #8683f7 50%, #4632bd 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
