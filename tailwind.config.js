/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        firago: `"FiraGO", sans-serif`,
      },
      colors: {
        lightGray: "#DBDBDB",
        deepBlue: "#021526",
        flameRed: "#F93B1D",
        hoveredFlameRed: "#DF3014",
        softGray: "#F3F3F3",
        charcoalBlack: "#1A1A1F",
        slateGray: "#808A93",
      },
      gridTemplateColumns: {
        autoFillEstateCard: "repeat(auto-fill, 384px)",
      },
    },
  },
  plugins: [],
};
