/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // CRITICAL: This allows Tailwind to scan your Angular files
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // A standard Indigo palette for the "primary" brand color
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1', // Main brand color
          600: '#4f46e5', // Hover state
          700: '#4338ca',
        },
        // Semantic backgrounds for the app
        dark: {
          bg: '#0f172a',      // Very dark blue/slate for main background
          surface: '#1e293b', // Slightly lighter for cards/sidebars
          border: '#334155'   // Border color
        }
      },
    },
  },
  plugins: [],
};