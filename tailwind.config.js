/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Cairo', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'Cairo', 'monospace'],
      },
      screens: {
        xs: '390px',
      },
      transitionTimingFunction: {
        tallyo: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
