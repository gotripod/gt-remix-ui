import { useLocation } from '@remix-run/react'
import React, { useState } from 'react'

import Column from '../column'
import LargeNav from '../nav/large'
import heroImage from './hero-min.jpg'

const Header = React.memo(() => {
  const router = useLocation()
  const isHome = router.pathname == '/'
  const [loaded, setLoaded] = useState(!isHome)

  return (
    <header className="bg-black text-center relative overflow-hidden pb-28 z-50">
      <img
        style={{
          objectFit: 'cover',
          position: 'absolute',
          boxSizing: 'border-box',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        data-loaded={loaded}
        onLoad={() => {
          // console.log('hero image loaded')
          setLoaded(true)
        }}
        alt=""
        src={heroImage}
      />
      <Column style={{ zIndex: 10 }} className="mt-[80px] md:mt-[155px]">
        <div
          className={`p-8 md:p-0 md:mt-16 mx-6 md:mx-0 go-gradient ${
            !isHome ? 'hidden' : ''
          } md:block`}>
          <LargeNav />
          {isHome && (
            <>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-175 mb-3 md:mt-8">
                Leave the tech to us
              </h1>
              <h2 className="hidden md:block text-4xl font-bold text-gray-175 pb-32 px-40">
                We craft bespoke,{' '}
                <span className="relative">
                  <span className="fancy">innovative software</span>
                </span>{' '}
                that delivers solutions to your problems
              </h2>
            </>
          )}
        </div>
      </Column>
    </header>
  )
})

Header.displayName = 'Header'

// const StyledImage = styled.img<{ $loaded: boolean }>`
//   opacity: ${(props) => (props.$loaded ? 1 : 0.01)};
//   transition: opacity 0.2s;
// `

// const StyledHeader = styled.header`

//   .gradient {
//     margin-top: ${px2rem(160)};
//     background: linear-gradient(to right, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));

//     h1,
//     h2 {
//       padding: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 12)} 0;
//       color: #ededed;
//       font-size: ${px2rem(44)};
//       font-weight: bold;
//       width: ${px2rem(900)};

//       margin: 0 auto 0 auto;
//     }

//     h1 {
//       padding-bottom: ${px2rem(Theme.gutter)};
//     }

//     h2 {
//       padding-top: 0;
//     }
//   }

//   ${mqLess(breakpoints.medium)} {
//     padding-bottom: ${px2rem(Theme.gutter * 5)};
//     .gradient {
//       margin-top: ${px2rem(Theme.gutter * 3 + 52)};
//       margin-left: ${px2rem(Theme.gutter * 2)};
//       margin-right: ${px2rem(Theme.gutter * 2)};

//       h1,
//       h2 {
//         width: auto;
//         font-size: ${px2rem(33)};
//         padding: ${px2rem(Theme.gutter * 3)} ${px2rem(Theme.gutter * 2)} ${px2rem(Theme.gutter * 4)}
//           ${px2rem(Theme.gutter * 2)};
//       }

//       h2 {
//         display: none;
//       }
//     }
//     a {
//       height: 30px;
//       float: right;
//       padding: ${px2rem(13)};
//     }

//     picture,
//     picture img {
//       height: 100vh;
//     }
//   }
// `

export default Header
