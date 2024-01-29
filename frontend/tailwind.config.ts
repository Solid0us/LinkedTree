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
    },
  },
  plugins: [],
};
