import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#070D1E',
          surface: '#0E172F',
          card: '#14203D',
          border: '#1F2E54',
          aqua: '#00BFD8',
          'aqua-glow': '#06B6D4',
          violet: '#7C3AED',
          'violet-deep': '#6B21A8',
          lavender: '#A78BFA',
          light: '#F8FAFC',
          gray: '#94A3B8'
        },
        pilar: {
          litio: '#00BFD8',
          solar: '#F59E0B',
          agro: '#10B981',
          logistica: '#F97316',
          tech: '#8B5CF6'
        }
      },
      fontFamily: {
        sans: ['Ambit', 'var(--font-inter)', 'sans-serif'],
        heading: ['Ambit', 'var(--font-jakarta)', 'sans-serif'],
        ambit: ['Ambit', 'sans-serif'],
        mono: ['Ambit', 'var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-aqua': '0 0 25px -5px rgba(0, 191, 216, 0.35)',
        'glow-violet': '0 0 25px -5px rgba(124, 58, 237, 0.35)',
      }
    },
  },
  plugins: [],
} satisfies Config;
