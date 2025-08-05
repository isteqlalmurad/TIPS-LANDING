import type { Config } from "tailwindcss";
import { heroui } from "@heroui/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0C0934',
        'hero-box': '#363766',
        'primary-text': '#FFFFFF',
        'secondary-text': '#DADCF0',
        'accent-purple': '#A5A9FF',
        'button-border': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: '#0C0934',
          foreground: '#FFFFFF',
          primary: {
            50: '#f0f0ff',
            100: '#e5e5ff',
            200: '#d4d4ff',
            300: '#b8b8ff',
            400: '#A5A9FF',
            500: '#8b8eff',
            600: '#7a7aff',
            700: '#6b6bff',
            800: '#5c5cff',
            900: '#4d4dff',
            DEFAULT: '#A5A9FF',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#363766',
            foreground: '#DADCF0',
          },
        },
      },
    },
  })],
};

export default config;