/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#777777',
          100: '#666666',
          200: '#555555',
          300: '#474747',
          400: '#3C3C3C',
          500: '#323232',
          600: '#292929',
          700: '#151515',
          800: '#101010',
          900: '#0A0A0A',
          950: '#050505',
        },
        accent: {
          50: '#E50914',
          100: '#F4ECE1',
          200: '#E8D6BF',
          300: '#DDC2A2',
          400: '#D2AF84',
          500: '#C69963',
          600: '#B78343',
          700: '#926835',
          800: '#6C4D28',
          900: '#4B351B',
          950: '#382814',
        },
      },
    },
  },

  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
