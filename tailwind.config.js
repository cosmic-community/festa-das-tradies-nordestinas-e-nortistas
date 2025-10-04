/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B35',
          light: '#FF8C5A',
          dark: '#E54D1A',
        },
        secondary: {
          DEFAULT: '#00A8CC',
          light: '#1FC2E0',
          dark: '#008CAB',
        },
        accent: {
          DEFAULT: '#F7B801',
          light: '#FFC933',
          dark: '#D69D00',
        },
        festival: {
          orange: '#FF6B35',
          blue: '#00A8CC',
          yellow: '#F7B801',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}