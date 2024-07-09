import { useLocation } from '@remix-run/react'
import React, { useState } from 'react'

import { useHero } from '~/hooks/wp'

const Header = React.memo(() => {
  const hero = useHero()
  const router = useLocation()
  const isHome = router.pathname == '/'
  const [loaded, setLoaded] = useState(!isHome)
  const isWorkSubpage = router.pathname.startsWith('/work/')

  return (
    <nav
      className="
    w-full
    p-6
    text-gray-100
    bg-black
    bg-opacity-60
    md:bg-opacity-30 
    z-10 
    relative
  ">
      <div
        className="
      flex 
      flex-wrap
      items-center
      justify-between
      max-w-screen-xl mx-auto 
    ">
        <div>
          <a href="index.asp">
            <img
              src="_img/gotripod-logo.png"
              alt="Go Tripod"
              width="200px"
              className="max-w-[200px] mr-6"
            />
          </a>
        </div>

        <a href="#" id="menu-button" className="md:hidden block">
          <span className="sr-only">Open or close menu</span>
          <svg
            id="menu-button"
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </a>

        <div id="menu" className="hidden w-full md:w-auto md:flex md:items-center">
          <ul
            className="
          pt-4
          text-gray-100
          font-Raleway font-semibold text-sm uppercase my-auto
          md:flex
          md:justify-between 
          md:pt-0
        ">
            <li>
              <a
                className="py-1 mx-2 md:mr-5 inline-block hover:text-gt-green-lt"
                href="solutions.asp">
                Solutions
              </a>
            </li>
            <li>
              <a className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt" href="work.asp">
                Work
              </a>
            </li>
            <li>
              <a className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt" href="#">
                Insights
              </a>
            </li>
            <li>
              <a className="py-1 mx-2 md:mx-5 inline-block hover:text-gt-green-lt" href="#">
                About
              </a>
            </li>
            <li>
              <a
                className="py-1 mx-2 md:ml-5 inline-block hover:text-gt-green-lt"
                href="contact.asp">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
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
