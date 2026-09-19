/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "zentry-danish", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        brand: {
          DEFAULT: "#459cce",
          50: "#f0f8fc",
          100: "#e0f0f9",
          200: "#bae1f3",
          300: "#7fc9ea",
          400: "#459cce",
          500: "#2b84b7",
          600: "#1e6894",
          700: "#1a5477",
          800: "#194763",
          900: "#1a3c53",
        },
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#459cce",
        },
        violet: {
          300: "#459cce",
        },
        yellow: {
          100: "#8e983f",
          300: "#459cce",
        },
      },
    },
  },
  plugins: [],
};
