/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B4FE8',
        secondary: '#8B85F0',
        accent: '#FF6B6B',
        success: '#4CAF50',
        warning: '#FFA726',
        error: '#EF5350',
        info: '#42A5F5',
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Plus Jakarta Sans', 'Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'pulse-priority': 'pulse 2s infinite',
        'confetti': 'confetti 400ms ease-out',
        'strike-through': 'strike-through 400ms ease-out'
      },
      keyframes: {
        confetti: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(1.2)', opacity: '0' }
        },
        'strike-through': {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        }
      }
    },
  },
  plugins: [],
}