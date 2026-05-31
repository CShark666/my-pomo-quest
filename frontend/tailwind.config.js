// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        drain: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
      },
      animation: {
        drain: 'drain 5s linear forwards',
      },
    },
  },
  plugins: [require("daisyui")],
};
