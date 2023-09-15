import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'card': '0px 0px 1px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'footer-texture': "url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-footer-stripes.svg')",
        'main-dots': "url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-dots-tile-v2.svg')"
      },
      colors: {
        gray: {
          150: '#f7f7f7',
          175: '#ededed'
        },
        linkBlue: '#62bead',
        headingBlue: '#4291ce',
        linkOrange: '#ef7852',
        highlightBlue: '#4eace0'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config

