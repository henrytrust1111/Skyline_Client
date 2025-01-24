/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        custom: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
      },
      colors: {
        "--clr-pumpkin": "#fe6c00",
        "--clr-pumpkin-light": "#fe6e00bb",
        "--clr-primary": "#29221d",
        "--clr-primar-light": "#473b33",
        "--clr-secondary": "#1e1611",
        "--clr-white": "#fff",
        "--clr-light-gray": "#f3f4f6",
        "--clr-black": "#000",
        "--clr-silver": "#a8a5a6",
        "--clr-silver-v1": "#bdbabb",
        "--clr-scarlet": "#fe1e00",
        "--clr-scarlet-v1": "rgb(254, 30, 0, 0.79)",
        "--clr-green": "#00fe93",
        "--clr-yellow": "#fec80a",
        "--clr-jet": "#302924",
        "--clr-peach": "#ffc397",
      },
      // backgroundImage: {
      //   'bg1': "url('/images/bgImage.jpg')",
      // }
    },
  },
  plugins: [],
};
