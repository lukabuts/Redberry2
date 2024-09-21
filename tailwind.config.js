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
        errColor: "#F93B1D",
        successColor: "#45A849",
        darkGray: "#676E76",
      },
      gridTemplateColumns: {
        autoFillEstateCard: "repeat(auto-fill, 24rem)",
      },
      width: {
        agentAvatarWidth: "4.5rem",
        estateCardWidth: "24rem",
      },
      maxWidth: {
        detailedEstateImgWidth: "52.5rem",
      },
      height: {
        detailedEstateHeight: "42rem",
        agentAvatarHeight: "4.5rem",
      },
    },
  },
  plugins: [],
};
