/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sweida-green': '#58c322',
        'sweida-dark': '#1a1a1a',
      },
    },
  },
  plugins: [],
}