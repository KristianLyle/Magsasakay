/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {backgroundImage: {'image1':"url('img/img1.jpg')",},},
    fontFamily: {Montserrat: ['Montserrat']},
  },
  plugins: [],
}