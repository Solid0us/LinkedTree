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
      aspectRatio: {
        "9/16": "9 / 16",
      },
      zIndex: {
        "100": "100",
        "200": "200",
        "300": "300",
        "400": "400",
        "500": "500",
      },
      blur: {
        xs: "2px",
        "2xs": "1px",
      },
      keyframes: {
        "pop-in": {
          "0%": { transform: "scale(.90)", backgroundColor: "#C571F3" },
          "100%": { transform: "scale(1)", backgroundColor: "#FFFFFF" },
        },
        "drawer-up": {
          "0%": { transform: "translateY(50%)", opacity: 0 },
          "100%": { transform: "translateY(0%)", opacity: 1 },
        },
        "drawer-down": {
          "0%": { transform: "translateY(0%)", opacity: 0 },
          "100%": {
            transform: "translateY(100%)",
            opacity: 1,
            "animation-fill-mode": "forwards",
          },
        },
      },
      animation: {
        "pop-in": "pop-in 100ms linear ",
        "drawer-up": "drawer-up 500ms ease-in forwards",
        "drawer-down": "drawer-down 500ms ease-in forwards",
      },
    },
  },
  plugins: [],
};
