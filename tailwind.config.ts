import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'gt-green': '#58C2B3',
        'gt-green-lt': '#92D5CB',
        'gt-green-dk': '#01A690',

        'gt-blue': '#359CD1',
        'gt-blue-lt': '#3399CF',
        'gt-blue-dk': '#005293',

        'gt-gray': '#F5F4F4'
      },

      backgroundImage: {
        'box-corner-blue': "url('/_img/trim-box-bg-blue.png')",
        'box-corner-green': "url('/_img/trim-box-bg-green.png')",

        'hero-solutions': "url('/_img/hero-solutions.jpg')",
        'hero-contact': "url('/_img/hero-contact.jpg')",

        'slope-tl-white': "url('/_img/trim-slope-tl-white.png')",
        'slope-br-white': "url('/_img/trim-slope-br-white.png')",
        'slope-bl-white': "url('/_img/trim-slope-bl-white.png')",
        'slope-tr-grey': "url('/_img/trim-slope-tr-grey.png')",
        'slope-br-grey': "url('/_img/trim-slope-br-grey.png')",
        'slope-bl-grey': "url('/_img/trim-slope-bl-grey.png')",

        'quote-bg': "url('/_img/bg-quote.jpg')",
        'stripes-bg': "url('/_img/trim-bg-gt-stripes.png')",

        'wall-green-bg': "url('/_img/bg-wall-green-temp.jpg')",
        'wall-blue-bg': "url('/_img/bg-wall-blue-temp.jpg')",

        postits: "url('/_img/hero-work-temp.jpg')"
      },

      fontFamily: {
        Raleway: [
          'Raleway',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ],
        Texgyre: [
          'Tex Gyre Heros',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji'
        ]
      }
    }
  },
  plugins: [forms, typography],
  safelist: ['fancy', 'is-layout-flex']
} satisfies Config
