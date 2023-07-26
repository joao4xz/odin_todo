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
      gridTemplateColumns: {
        'container': '20% 1fr',
      },
      colors: {
        'primary': '#66717E',
        'secundary': '#DADDD8',
        'third': '#160C28',
      }
    },
  },
  plugins: [],
}