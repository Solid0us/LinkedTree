/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "linktr-lime": "#D2E823",
        "linktr-dark-green": "#254F1A",
        "linktre-dark-pink": "#e9c0e9",
      },
      scale: {
        "300": "3.0",
      },
      zIndex: {
        "100": "100",
        "200": "200",
        "300": "300",
        "400": "400",
        "500": "500",
      },
    },
  },
  plugins: [],
};
