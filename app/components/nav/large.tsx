import classNames from 'classnames'
import { NavLink } from '@remix-run/react'
import { useMenu } from '~/hooks/menu'

interface Props {
  className?: string
}

const LargeNav = ({ className }: Props) => {
  const menu = useMenu()

  return (
    <nav className={classNames('hidden md:block', className)}>
      <ul className="list-none flex max-w-full px-24 m-0 overflow-x-auto justify-center">
        {menu.map(({ label, url }) => {
          return (
            <li
              className="px-14 mt-12 mb-12 text-gray-150 text-lg font-bold font-['Cabin']"
              key={url}>
              <NavLink
                className={({ isActive, isPending }) =>
                  classNames(
                    isPending ? 'pending' : isActive ? 'border-b-white' : '',
                    'relative inline-block border-b-2 border-b-transparent hover:border-b-white transition-all'
                  )
                }
                to={url}>
                {label}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default LargeNav

// const NavContainer = styled.nav`
//   ${mqLess(breakpoints.medium)} {
//     display: none;
//   }
//   ul {
//     list-style: none;
//     display: flex;
//     max-width: 100%;
//     box-sizing: border-box;
//     padding: 0 24px;
//     margin: 0;
//     overflow-x: auto;
//     justify-content: center;
//   }

//   li {
//     padding: 0 52px;
//     margin: 52px 0;
//     font-size: 1em;
//     color: #f7f7f7;
//     font-family: 'Cabin';

//     & > a {
//       position: relative;
//       display: inline-block;
//       border-bottom: 2px solid;
//       border-bottom-color: transparent;
//     }

//     & > a:after {
//       content: '';
//       background-color: #f7f7f7;
//       position: absolute;
//       bottom: 0;
//       left: 0;
//       right: 0;
//       width: 0;
//       height: 2px;
//       margin: auto;
//       transition: width 0.1s cubic-bezier(0.4, 0, 0.2, 1);
//     }

//     & > a[aria-current='page']:after,
//     & > a:hover:after {
//       width: 100%;
//     }
//   }

//   input {
//     display: none;
//   }

//   li {
//     &:first-of-type {
//       margin-left: 0;
//     }

//     &:last-of-type {
//       margin-right: 0;

//       &:after {
//         content: '';
//         display: inline-block;
//         width: 24px;
//       }
//     }
//   }
// `
