import type React from 'react'

import type { Testimonial } from '~/types'
import Column from './column'
import Header from './header'
import SmallNav from './nav/small'
import ToTop from './to-top'

import { useLocation } from '@remix-run/react'
import Contact from './contact'
import Footer from './footer'
import Testimonials from './home/testimonials'
import LargeNav from './nav/large'

interface Props {
  testimonial?: Testimonial
  children: React.ReactNode
}

const Layout = ({ children, testimonial }: Props) => {
  const route = useLocation()
  return (
    <>
      <main className="bg-main-dots">
        <LargeNav />
        <ToTop />
        <SmallNav />
        <Header />

        <div className="relative z-50">{children}</div>

        <Contact />
        {testimonial && route.pathname === '/' && (
          <Column>
            <Testimonials testimonial={testimonial} />
          </Column>
        )}
        <Footer />
      </main>
    </>
  )
}

export default Layout

// const Logo = styled.div`
// z-index: ${Theme.zIndex.top};

// position: absolute;
// top:0;
//     width: 100%;

//   ${mqMore(breakpoints.medium)} {
//       width: 100%;
//       position: absolute;
//       height: 160px;

//       display: flex;
//       align-items: stretch;

//       div {
//         background: rgba(0, 0, 0, 0.5);
//       }

//       div:nth-child(1) {
//         flex: 1;
//         height: 255px;
//       }

//       div:nth-child(2) {
//         width: 1140px;
//         height: 160px;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       div:nth-child(3) {
//         flex: 1;
//         height: 255px;
//       }

//       img {
//         height: 100%;

//       }
//   }

//   ${mqLess(breakpoints.medium)} {
//     background: linear-gradient(to right, rgba(98, 190, 173, 0.9), rgba(66, 145, 206, 0.9));
//     height: 52px;
//     position: fixed;
//     padding: 0;

//     img {
//       width: 150px;
//     }

//       a{
//         padding: 2px 15px;
//       float: right;
//       }

//   }
// `

// const Floater = styled.div`
//   z-index: ${Theme.zIndex.middle};
//   position: relative;
// `

// const STestimonials = styled(Testimonials)`
//   margin-bottom: ${Theme.gutter * 6}px;
// `

// const MainContainer = styled.main`
//   background-color: #ededed;
//   background-image: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-dots-tile-v2.svg');
//   background-attachment: fixed;
//   position: relative;

//   &:before {
//     content: '';
//     background-image: url(https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-stripes.svg);
//     background-repeat: no-repeat;
//     background-position: -3px -20px;
//     height: 1500px;
//     display: block;
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     width: 100%;
//   }

//   abbr {
//     text-decoration: none;
//     border-bottom: 1px dotted;
//   }

//   [data-tooltip] {
//     position: relative;
//     text-shadow: none;
//   }

//   [data-tooltip]::before {
//     content: "";
// left: 6.5px;
// width: 0;
// height: 0;
// border-width: 6.5px;
// border-style: solid;
// border-color: #62bead transparent transparent transparent;
// z-index: 2;
// margin-bottom: -6.5px;
// margin-bottom: -.3611111111rem;
//   }

// [data-tooltip]::after {

//   color: #fff;
//   background: -webkit-linear-gradient(left,#62bead,#4291ce);
//   background: linear-gradient(to right,#62bead,#4291ce);
//   content: attr(data-tooltip);
//   display: inline-table;
//   border-radius: 6.5px;
//   font-weight: 700;
//   z-index: 1;
//   font-size: 13px;
//   font-size: .7222222222rem;
//   padding: 3.25px 13px;
//   padding: .1805555556rem .7222222222rem;
//   box-shadow: 0 1.5px 4px rgba(0,0,0,.24),0 1.5px 6px rgba(0,0,0,.12);

// }

//   [data-tooltip]::before, [data-tooltip]::after {
//     position: absolute;
//     bottom: 50%;
//     left: 0;
//     z-index: 300;
//     opacity: 0;
//     visibility: hidden;
//     transition: opacity .1s cubic-bezier(.4,0,.2,1),visibility .1s cubic-bezier(.4,0,.2,1),bottom .1s cubic-bezier(.4,0,.2,1);
//   }

//   [data-tooltip]:hover::before, [data-tooltip]:hover::after {
//       visibility: visible;
//       opacity: 1;
//       bottom: 100%;
//   }
// `
