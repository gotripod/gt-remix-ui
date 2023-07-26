import styled from 'styled-components'
import theme, { breakpoints, mqMore, px2rem } from '~/theme'
import menu from '../../menu'
import Link from '../link'

interface Props {
  className?: string
}

const SmallNav = ({ className }: Props) => (
  <NavContainer className={className}>
    <input type="checkbox" />
    <span></span>
    <span></span>
    <span></span>
    <ul>
      {menu.map(({ text, link }) => {
        const isCurrentPage = false
        return (
          <li key={link}>
            <Link href={link}>{text}</Link>
          </li>
        )
      })}
    </ul>
  </NavContainer>
)

export default SmallNav

const NavContainer = styled.nav`
  ${mqMore(breakpoints.medium)} {
    display: none;
  }
  user-select: none;
  display: block;
  position: fixed;
  top: 16px;
  left: 13px;
  z-index: ${theme.zIndex.top + 1};

  input {
    display: block;
    width: 40px;
    height: 32px;
    position: absolute;
    top: -7px;
    left: -5px;
    cursor: pointer;
    opacity: 0;
    z-index: 2;
  }

  span {
    display: block;
    width: 26px;
    height: 3px;
    margin-bottom: 4px;
    position: relative;
    background: white;
    z-index: 1;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }

  span:first-child {
    transform-origin: 0% 0%;
  }

  span:nth-last-child(2) {
    transform-origin: 0% 50%;
  }

  input:checked ~ span:nth-last-child(4) {
    transform: rotate(-45deg) translate(-5px, 2px) scale(0.7, 1);
  }

  input:checked ~ span:nth-last-child(2) {
    transform: rotate(45deg) translate(-3px, -5px) scale(0.7, 1);
  }

  input:checked ~ ul {
    left: 0;
    box-shadow: 0 15px 24px rgba(0, 0, 0, 0.22), 0 19px 76px rgba(0, 0, 0, 0.3);
  }

  ul {
    left: -200px;
    display: block;
    transition: left 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    background-color: white;
    position: fixed;
    top: 52px;
    color: black;
    height: 100vh;
    width: 200px;
    margin: 0;
    list-style: none;
    padding: 0 24px;
    box-sizing: border-box;
  }

  li {
    color: black;
    display: block;
    margin: 0;
    padding: 0;
    margin: ${px2rem(theme.gutter * 2)};
    font-size: 1em;
    text-align: left;
  }

  li a {
    font-family: 'Cabin';
    float: none;
    padding: 0;
    display: inline-block;
    line-height: 2em;
    border-bottom: 2px solid;
    border-bottom-color: transparent;
    &[aria-current='page'] {
      border-bottom-color: #fff;
    }
  }
`
