import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          '"Instrument Serif"',
          'ui-serif',
          'Georgia',
          'serif',
        ],
        mono: [
          '"JetBrains Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      colors: {
        // Warm near-black + cream neutrals
        ink: {
          50: '#FAFAF7',
          100: '#F4F4EF',
          200: '#E7E7DF',
          300: '#CDCDC1',
          400: '#9F9F92',
          500: '#73736A',
          600: '#4D4D47',
          700: '#33332F',
          800: '#1E1E1C',
          900: '#121211',
          950: '#0A0A09',
        },
        // Refined indigo / violet — primary brand
        iris: {
          50: '#F1F1FE',
          100: '#E3E3FD',
          200: '#C8C8FB',
          300: '#A4A4F6',
          400: '#7E7EEF',
          500: '#5B5BD6',
          600: '#4747B3',
          700: '#393992',
          800: '#2A2A6E',
          900: '#1D1D4D',
          950: '#10102B',
        },
      },
      maxWidth: {
        '8xl': '88rem',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'liquid': {
          '0%, 100%': { borderRadius: '60% 40% 50% 50% / 50% 60% 40% 50%' },
          '33%': { borderRadius: '40% 60% 60% 40% / 60% 40% 50% 50%' },
          '66%': { borderRadius: '55% 45% 40% 60% / 45% 55% 60% 40%' },
        },
        'flow': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'fade-in': 'fade-in 0.8s ease-out both',
        'liquid': 'liquid 14s ease-in-out infinite',
        'flow': 'flow 1.4s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
      },
      backgroundImage: {
        'grid-ink':
          'linear-gradient(to right, rgba(10,10,9,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(10,10,9,0.06) 1px, transparent 1px)',
        'dot-ink':
          'radial-gradient(circle at 1px 1px, rgba(10,10,9,0.12) 1px, transparent 0)',
        'dot-cream':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.10) 1px, transparent 0)',
      },
    },
  },
  plugins: [],
} satisfies Config
