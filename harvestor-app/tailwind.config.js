/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6DDCA',
        secondary: '#546350',
        tertiary: '#5e6e5d'
      }
    },
  },
  plugins: [],
}

