/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", // Agrega esta línea
  ],
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
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        bodoni: ["Bodoni Moda", "serif"],
      },
      backgroundImage: {
        ImgLogin: "url('/src/assets/img/Imagen6.png')",
      },
    },
  },
  plugins: [],
};
