/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['San Francisco', 'Helvetica', 'Arial', 'sans-serif'],
      'sf': ['San Francisco', 'sans-serif'],
    },
  },
  plugins: [],
}



