/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
    animation: {
      'spin-finite': 'spin .5s linear 1',
    }
  },
  darkMode: 'selector',
  plugins: [],
}

