/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/index.html',
    './src/**/*.{html,js,vue}'
  ],
  theme: {
    extend: {
      fontSize: {
        title: ['1.5rem', '4rem']
      }
    },
  },
  plugins: [],
}
