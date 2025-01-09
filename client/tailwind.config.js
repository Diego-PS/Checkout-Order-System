/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
  theme: {
    extend: {
      fontFamily: {
        imperial: ['Imperial Script', 'serif'],
      },
      colors: {
        creamWhite: '#FAF3E0', // Background
        richBrown: '#8B4513', // Primary Accent
        oliveGreen: '#A3C293', // Secondary Accent
        rustyRed: '#D97742', // Highlight
        darkCharcoal: '#333333', // Text
        espresso: '#4B2E2B',
      },
    },
  },
}
