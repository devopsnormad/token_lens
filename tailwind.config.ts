import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary:{
          50 : "#ce04fa",
          100: "#1610c8",
          200: "#5a0bda",
          300: "#a706f0",
          400: "#f5e6fa",
          500: "#8b06e9",
          600: "8859c7",
          700: "#5d18b4",
          800: "#4f189f",
          900: "#af90e6",
        }
        
      }
    },
  },
  plugins: [],
};
export default config;
