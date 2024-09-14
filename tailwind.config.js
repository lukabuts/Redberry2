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
      },
      gridTemplateColumns: {
        autoFillEstateCard: "repeat(auto-fill, 384px)",
      },
    },
  },
  plugins: [],
};
