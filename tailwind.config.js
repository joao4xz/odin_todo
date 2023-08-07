/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './dist/**/*.{html,js}',
    './src/**/*.{html,js}',
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'container': 'auto 1fr',
      },
      fontFamily: {
        'Roboto': ['Roboto']
      },
    },
  },
  plugins: [],
}