import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0F172A',
          900: '#1E293B',
          800: '#334155',
        },
        sand: {
          50: '#FDFCF8',
          100: '#F6F1E7',
          200: '#E8DFCB',
        },
        solar: {
          50: '#FEF7E6',
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        leaf: {
          500: '#10B981',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
};

export default config;
