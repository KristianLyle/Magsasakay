/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'image1': "url('img/img1.jpg')",
        'home_bg': "url('img/home_bg.jpg')",
        'wte_bg': "url('img/wte_bg.jpg')",
        'resto_bg': "url('img/resto_bg.jpg')",
        'resto_but': "url('img/resto_but.png')",
        'ilonight': "url('img/ilonight.jpg')",
        'iloilo1': "url('img/home_bg.png')",
        'slide1bg': "url('img/slide1bg.jpg')"
      },
      screens:{
        "phone": "360px",

      }
    },
    fontFamily: {
      Montserrat: ['Montserrat'],
    },
  },
  plugins: [
    require("flowbite/plugin"),
  ],
};
