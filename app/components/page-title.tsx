// const S = {
//   Wrapper: styled.header<{ slim: boolean }>`
//     position: relative;
//     background: white;
//     border-bottom: 5px solid rgba(0, 0, 0, 0.3);
//     box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
//     text-align: center;
//     padding: ${px2rem(theme.gutter * 4)} 0;
//     z-index: 1;
//     margin: -${px2rem(Theme.gutter * 4)} ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px ${Theme.gutter *
//       4}px ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px;
//     ${Theme.cardFlare}

import { usePageTitles } from '~/hooks/hero'
import Column from './column'
import { useLocation } from '@remix-run/react'

//     ${mqLess(breakpoints.medium)} {
//       margin-top: -${px2rem(Theme.gutter * 6)};
//       margin-left: ${px2rem(theme.gutter)};
//       margin-right: ${px2rem(theme.gutter)};
//     }
//   `
// }

// const P = styled.p`
//   color: #999;
//   margin-top: ${px2rem(theme.gutter)}
// `

const PageTitle = () => {
  const { title, subTitle } = usePageTitles()
  const router = useLocation()
  const isHome = router.pathname == '/'

  return (
    <Column style={{ zIndex: 10 }} className="md:pb-8 md:pt-12">
      <div className={`md:p-0 mx-6 md:mx-0 go-gradient md:block`}>
        <>
          <h1
            className={`text-center text-3xl md:text-5xl font-bold text-gray-175 pt-28 ${
              !isHome ? 'md:pb-24' : ''
            }`}>
            {title}
          </h1>
          {subTitle && (
            <h2
              className="text-center text-xl md:text-4xl font-bold text-gray-175 md:pb-32 md:px-40"
              dangerouslySetInnerHTML={{
                __html: subTitle
              }}></h2>
          )}
        </>
      </div>
    </Column>
  )
}

export default PageTitle
