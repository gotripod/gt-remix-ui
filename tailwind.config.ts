import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        gray: {
          150: '#f7f7f7'
        },
        linkBlue: '#62bead',
        headingBlue: '#4291ce',
        linkOrange: '#ef7852',
        highlightBlue: '#4eace0'
      }
    },
  },
  plugins: [],
} satisfies Config

