// /** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");


export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E6DDCA',
        secondary: '#2beb28',
        tertiary: '#7f946d',
        quaternary: '#d9d9d7',
        quinary: '#546350',
        warning: '#f7de52',
        fail: '#fa0905',
      }
    },
  },
  plugins: [],
}

