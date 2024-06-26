import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        card: '0px 0px 1px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'footer-texture':
          "url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-footer-stripes.svg')",
        'main-dots':
          "url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-dots-tile-v2.svg')"
      },
      fontFamily: {
        sans: 'Noto Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Droid Sans,Helvetica Neue,Helvetica,Arial,sans-serif'
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
    }
  },
  plugins: [forms, typography],
  safelist: ['fancy', 'is-layout-flex']
} satisfies Config
