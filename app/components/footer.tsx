import {
  FaFacebookF as Facebook,
  FaLinkedinIn as Linkedin,
  FaTwitter as Twitter
} from 'react-icons/fa'


import Link from './link'
import { DivProps, FooterProps, NavProps, PProps, ULProps } from 'react-html-props'

const Footer = () => (
  <Foot>
    <Nav>
      <ul className='flex justify-center'>
        <li className='px-6 py-6'>
          {' '}
          <Link to="/">
            <span>Home</span>
          </Link>
        </li>
        <li className='px-6 py-6'>
          {' '}
          <Link to="/work/">
            <span>Work</span>
          </Link>
        </li>
        <li className='px-6 py-6'>
          {' '}
          <Link to="/insights/">
            <span>Insights</span>
          </Link>
        </li>
        <li className='px-6 py-6'>
          {' '}
          <Link to="/contact/">
            <span>Contact</span>
          </Link>
        </li>
      </ul>
    </Nav>
    <div className='bg-footer-texture bg-no-repeat bg-right border-b border-b-[#626262] py-12'>
      <div className='flex max-w-[1140px] justify-between mx-auto'>
        <Link to="/">
          <img

            width="193"
            height="40"
            src="https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-mono-on-black.svg"
            alt="Go Tripod"
          />
        </Link>

        <div className="yus">
          <img
            width="48"
            height="32"
            src="https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/yus-footer.svg"
            alt=""
          />
        </div>
      </div>
    </div>

    <div className='flex justify-between max-w-[1140px] my-12 mx-auto'>
      <address className="flex-1 not-italic text-left">
        Tremough Innovation Centre,
        <br />
        Penryn, Cornwall, TR10 9TA, UK
      </address>

      <address className="flex-1 not-italic">
        <a href="mailto:hello@gotripod.com" className='text-highlightBlue text-center font-bold'>hello@gotripod.com</a>
      </address>

      <a className="flex-1 font-bold text-right text-lg" href="tel:+448454752487">
        0845 475 2487
      </a>
    </div>

    <ul className='list-none p-0 flex lg:justify-start max-w-[1140px] mx-auto mb-4 mt-0 justify-center'>
      <li className='mr-2'>
        <a
          href="https://twitter.com/gotripod"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Go Tripod on Twitter (opens in new window)">
          <Twitter size={18} color={'white'} />
        </a>
      </li>
      <li className='mr-2'>
        <a
          href="https://www.facebook.com/gotripod"
          target="_blank"
          rel="noopener noreferrer"
          title="Like Go Tripod on Facebook (opens in new window)">
          <Facebook size={18} color={'white'} />
        </a>
      </li>
      <li className='mr-2'>
        <a
          href="https://www.linkedin.com/company/go-tripod-ltd"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Go Tripod on LinkedIn (opens in new window)">
          <Linkedin size={18} color={'white'} />
        </a>
      </li>
    </ul>

    <Rights className='bg-zinc-800 text-sm py-4'>
      © {new Date().getFullYear()} Go Tripod. All rights reserved. Registered in the UK company
      number 6912029. VAT No. 972 5228 06. Get with our{' '}
      <Link to="/privacy-policy/">Privacy&nbsp;Policy</Link>.
    </Rights>
  </Foot>
)

export default Footer

const Foot = (props: FooterProps) => (
  <footer className='bg-[#424242] text-neutral-100 text-center' {...props}>{props.children}</footer>
)

const Rights = (props: PProps) => (
  <p {...props}>{props.children}</p>
)


const Nav = (props: NavProps) => (
  <nav className='bg-gradient-to-l from-[#62bead] to-[#86cdc0] text-black uppercase p-1' {...props}>{props.children}</nav>
)
