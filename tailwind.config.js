/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-33': 'repeat(auto-fit, 33%)',
      }
    },
  },
  plugins: {
    "@tailwindcss/postcss": {},
  }
}

