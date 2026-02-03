/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'esg-green': '#10B981',
        'esg-blue': '#3B82F6',
        'esg-purple': '#8B5CF6',
        'esg-orange': '#F59E0B',
        'esg-red': '#EF4444',
      }
    },
  },
  plugins: [],
}
