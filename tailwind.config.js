/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6d1a1a',
        'primary-dark': '#a02c2c',
        'gold': '#e6c177',
        'brand-bg': '#181112',
        'card-bg': '#3a2323',
        'muted': '#f5e9e0',
      },
    },
  },
  plugins: [],
}
