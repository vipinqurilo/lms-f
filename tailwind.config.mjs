/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/container/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e36760",
        secondary: "#F79902",
        dark: "#392b3c",
        light: "#ede8ec",
        background: "#0f2138",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      transitionProperty: {
        custom: "all ease-in-out 0.5s",
      },
      textColor: {
        light: "rgb(0 0 0 / 0.75)",
      },
    },
  },
  plugins: [],
};
