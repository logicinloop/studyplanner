// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fall: {
          "0%": { transform: "translate(-50%, 0)" },
          "100%": { transform: "translate(-50%, 160px)" },
        },
      },
      animation: {
        fall: "fall 2s linear forwards",
      },
    },
  },
  plugins: [],
};
module.exports = {
  darkMode: 'class', // not 'media'
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
