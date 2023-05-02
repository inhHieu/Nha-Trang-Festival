/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize:{
      "05":"0.5rem",
      "06":"0.6rem"
    },
    extend: {
      colors: {
        "light-blue": "#2bb7e1",
      },
      spacing:{
        "71":"17rem"
      }
    },
  },
  plugins: [],
};
