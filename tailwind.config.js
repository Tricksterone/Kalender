/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}",
  './public/index.html',
],
  theme: {
    extend: {
      colors: {
        'dark-cyan': '#3B6FAB',
        'light-cyan': '#6396D3',
      },
    },
  },
  plugins: [],
}