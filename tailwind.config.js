/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./ai-*/**/*.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'orange-avenue': ['Orange Avenue', 'serif'],
      },
      colors: {
        paper: '#FDFCF8',
        ink: '#1C1917',
        sepia: '#78350F',
        stone: '#E7E5E4',
        rust: '#9A3412',
        dark: '#0A0A0A',
        gold: '#D4AF37'
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
