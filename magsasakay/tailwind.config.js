/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image1': "url('img/img1.jpg')",
        'home_bg': "url('img/home_bg.jpg')",
        'wte_bg': "url('img/wte_bg.jpg')"
      },
    },
    fontFamily: {
      Montserrat: ['Montserrat'],
    },
  },
  plugins: [],
};
