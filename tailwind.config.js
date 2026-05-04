/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0B0F',
        panel: '#1A1A1F',
        accent: '#00FFB3',
        blue: '#3B82F6',
        border: '#2A2A32',
        muted: '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 255, 179, 0.15)',
        'glow-lg': '0 0 40px rgba(0, 255, 179, 0.2)',
        window: '0 25px 50px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
