/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: { inter: ['Inter', 'sans-serif'] },
      colors: {
        primary: { light: '#6D83F2', DEFAULT: '#5967E0', dark: '#2E3DB4' },
        accent: { light: '#F2B5DA', DEFAULT: '#E082AD', dark: '#AD417A' },
      },
      boxShadow: { 'lg-soft': '0 10px 25px rgba(0, 0, 0, 0.05)' },
    },
  },
  plugins: [],
}
