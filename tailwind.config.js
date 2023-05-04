/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontSize:{
      "05":"0.5rem",
      "06":"0.6rem",
      "07":"0.7rem",
      "08":"0.8rem",
      "09":"0.9rem",
      "10":"1rem",
      "15":"1.5rem",
      "20":"2rem",
      "25":"2.5rem",
    },
    extend: {
      colors: {
        "hard-blue": "#0832DE",
        "sea-blue": "#2bb7e1",
        "light-blue": "#add9e7",
        "white-blue": "#effcf8",
        "white-purple": "#ced6f8",
        "light-gray": "#f1f1f1",
        "hard-gray": "#343434",
        "def-gray": "#d9d9d9",
        "def-red": "#fb1f1f",
        "def-light-red": "#fc8585",
        
      },
      spacing:{
        "71":"17rem",
        '70rem':'70rem',
      },
    },
  },
  plugins: [],
};
