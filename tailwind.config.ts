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
        primary: {
          DEFAULT: '#0891B2',
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#0891B2',
          600: '#0E7490',
          700: '#155E75',
          800: '#164E63',
          900: '#134E4A',
        },
        background: '#F0FDFA',
        'card-bg': '#FFFFFF',
        'border-default': '#E0F2FE',
        'text-primary': '#134E4A',
        'text-secondary': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-noto-sans)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-figtree)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        clay: '20px',
      },
      boxShadow: {
        clay: '6px 6px 12px rgba(8,145,178,0.06), inset -2px -2px 6px rgba(255,255,255,0.8)',
        'clay-hover': '8px 8px 16px rgba(8,145,178,0.10), inset -2px -2px 6px rgba(255,255,255,0.9)',
        'clay-sm': '4px 4px 8px rgba(8,145,178,0.04), inset -1px -1px 4px rgba(255,255,255,0.7)',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        colors: {
          background: '#F0FDFA',
          foreground: '#134E4A',
          primary: {
            50: '#F0FDFA',
            100: '#CCFBF1',
            200: '#99F6E4',
            300: '#5EEAD4',
            400: '#2DD4BF',
            500: '#0891B2',
            600: '#0E7490',
            700: '#155E75',
            800: '#164E63',
            900: '#134E4A',
            DEFAULT: '#0891B2',
            foreground: '#FFFFFF',
          },
          secondary: {
            DEFAULT: '#E0F2FE',
            foreground: '#134E4A',
          },
        },
      },
    },
  })],
};

export default config;
