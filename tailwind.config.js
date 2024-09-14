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
      },
    },
  },
  plugins: [],
};
