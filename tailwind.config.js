/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        glowPulse: {
          "0%, 100%": {
            opacity: "0.25",
            transform: "scale(1.05)",
            filter: "blur(40px)",
          },
          "50%": {
            opacity: "0.6",
            transform: "scale(1.15)",
            filter: "blur(60px)",
          },
        },
      },

      animation: {
        glowPulse: "glowPulse 4s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};