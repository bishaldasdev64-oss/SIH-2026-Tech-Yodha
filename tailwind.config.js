/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Same palette as the approved HTML/CSS reference design.
        navy: {
          950: '#050912',
          900: '#0a1120',
          850: '#0d1728',
          800: '#111f36',
          700: '#182c48',
          600: '#233c5e',
        },
        line: '#1c2c47',
        ink: {
          0: '#eef3fb',
          1: '#aebcd6',
          2: '#7186ab',
        },
        cyan: { DEFAULT: '#3fd7e8' },
        sky: { DEFAULT: '#4fa3f7' },
        risk: {
          green: '#33d17a',
          yellow: '#f0c93b',
          orange: '#f3922f',
          red: '#f14e4e',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(63,215,232,0.5), 0 0 24px rgba(63,215,232,0.25)',
      },
      keyframes: {
        pulseRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.12)', opacity: '1' },
        },
        dashRing: {
          '0%, 100%': { opacity: '0.45', transform: 'scale(1)' },
          '50%': { opacity: '0.05', transform: 'scale(1.3)' },
        },
      },
      animation: {
        'pulse-ring': 'pulseRing 3.2s ease-in-out infinite',
        'dash-ring': 'dashRing 2.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
