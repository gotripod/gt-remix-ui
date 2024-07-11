import useMouse from '@react-hook/mouse-position'
import { Link, NavLink } from '@remix-run/react'
import { useRef, type ReactNode } from 'react'

const Header = ({
  image,
  title,
  subTitle,
  cta
}: {
  image?: string
  title: string
  subTitle: string | ReactNode
  cta: ReactNode
}) => {
  const ref = useRef(null)
  const mouse = useMouse(ref)

  let x,
    y = 0

  if (mouse) {
    const sx = mouse.screenX || 0
    const sy = mouse.screenY || 0
    const ew = mouse.elementWidth || 0
    const eh = mouse.elementHeight || 0

    x = (sx / ew) * 5
    y = (sy / eh) * 5
  }

  return (
    <header ref={ref}>
      <div className="relative min-h-[75vh] overflow-hidden bg-black">
        <div className="min-h-[75vh] flex flex-col justify-between">
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
                <Link to="/">
                  <img
                    src="_img/gotripod-logo.png"
                    alt="Go Tripod"
                    width="200px"
                    className="max-w-[200px] mr-6"
                  />
                </Link>
              </div>

              <Link to="#" id="menu-button" className="md:hidden block">
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
              </Link>

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
                  {[
                    ['/', 'Home'],
                    ['/solutions', 'Solutions'],
                    ['/work', 'Work'],
                    ['/insights', 'Insights'],
                    ['/about', 'About'],
                    ['/contact', 'Contact']
                  ].map(([link, text]) => (
                    <li key={link}>
                      <NavLink
                        className={({ isActive, isPending }) => {
                          const base = isPending ? '' : isActive ? 'text-gt-green-lt' : ''

                          return `py-1 mx-2 md:mr-5 inline-block hover:text-gt-green-lt ${base}`
                        }}
                        to={link}>
                        {text}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>
          <div className="relative z-10">
            <div className="bg-slope-bl-white bg-bottom bg-no-repeat bg-contain p-6 pb-24">
              <div className="max-w-screen-xl mx-auto pb-4 md:pb-12">
                <h1 className="text-3xl font-bold text-gt-green pb-2 border-b border-white bg-black bg-opacity-50 p-2 md:bg-transparent">
                  {title}
                </h1>
                <p className="font-Raleway text-4xl font-bold text-white mb-14 bg-black bg-opacity-50 p-2 md:bg-transparent">
                  {subTitle}
                </p>
                {cta}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 border-2 border-red-400">
          <div
            className="perspective-hero transform transition-transform duration-600 ease-out"
            style={{
              transform: `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`
            }}>
            <div
              style={
                image
                  ? {
                      backgroundImage: `url(${image})`
                    }
                  : {}
              }
              className=" bg-white scale-125 bg-[center_40%] bg-no-repeat bg-cover min-h-[75vh] z-0"></div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
