/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary:'#e36760',
        secondary:'#eda256',
        dark:'#392b3c',
        light:'#ede8ec',
        light_bg:'#F2F2F2',
        dark_text:'#333333',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
