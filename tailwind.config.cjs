/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: '#FBFCFD',
        card: '#FFFFFF',
        text: '#0F1724',
        muted: '#475569',
        accent: '#0066FF',
        accent2: '#00B894',
        ui: 'rgba(15,23,36,0.06)'
      },
      maxWidth: {
        site: '1100px'
      }
    }
  },
  plugins: []
};