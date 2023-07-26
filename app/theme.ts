import { css, DefaultTheme, FlattenSimpleInterpolation, ThemedCssFunction } from 'styled-components'

const px2rem = (px: number): string | number => (Number(px) ? `${Number(px) / 18}rem` : 0)

const mqLess = (bp: Breakpoint) => `@media screen and (max-width:${bp}px)`
const mqMore = (bp: Breakpoint) => `@media screen and (min-width:${bp}px)`

enum Breakpoint {
  small = 576,
  medium = 768,
  large = 992,
  jumbo = 1200
}

let theme = {
  zIndex: {
    backToTop: 103,
    top: 102,
    middle: 101
  },
  colours: {
    linkBlue: '#62bead',
    headingBlue: '#4291ce',
    linkOrange: '#ef7852',
    highlightBlue: '#4eace0'
  },
  gutter: 13,
  fontSize: {
    aside: 14,
    base: 18,
    prominentText: 20,
    h2: 40
  },
  lineHeight: 26,
  cardFlare: css`
    &:before {
      content: '';
      background: linear-gradient(to bottom, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));
      ${mqLess(Breakpoint.medium)} {
        width: ${px2rem(5)};
      }

      ${mqMore(Breakpoint.medium)} {
        width: ${px2rem(13)};
      }
      height: 100%;
      display: block;
      position: absolute;
      top: 0;
      left: 0;
    }
  `,
  greyCardFlare: css`
    border-bottom: 5px solid rgba(200, 200, 200);
  `
}

const t2 = Object.assign<typeof theme, {contentStyles: FlattenSimpleInterpolation}>(theme, { contentStyles: css`
a {
  color: ${theme.colours.linkOrange};
  text-decoration: underline;
}
  h1, h2, h3, h4, h5, h6, p, ul, ol {
    margin: 0 0 ${px2rem(theme.gutter * 2)} 0;

  }

  code {
    background-color: #f7f7f7 !important;
    word-break: break-word;
  }

  ul, ol {
    margin-left: ${px2rem(theme.gutter * 2)};
  }
`})

export default t2

export { Breakpoint as breakpoints, px2rem, mqLess, mqMore }
