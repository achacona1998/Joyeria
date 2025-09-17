/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        Mobile: "390px",
        Tablet: "768px",
        Laptop: "1280px",
        Desktop: "1920px",
        DesktopHd: "2560px",
      },
      backgroundImage: {
        HeroImg: "url('/src/assets/img/Imagen1.png')",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bodoni: ["Bodoni Moda", "serif"],
      },
      colors: {
        primaryRed: "#65080a",
        primaryGreen: "#064b4e",
        primaryGreen2: "#85da0d",
        primaryGray: "#c5cac0",
      },
    },
  },
  plugins: [],
};
