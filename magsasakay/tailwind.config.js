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
        'wte_bg': "url('img/wte_bg.jpg')",
        'resto_bg': "url('img/resto_bg.jpg')",
        'resto_but': "url('img/resto_but.png')"
      },
      screens:{
        "phone": "360px",

      }
    },
    fontFamily: {
      Montserrat: ['Montserrat'],
    },
  },
  plugins: [],
};
