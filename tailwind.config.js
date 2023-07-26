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
        'container': 'minmax(20%, auto), 1fr',
        'auto-container': 'auto, 1fr',
      },
    },
  },
  plugins: [],
}