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
      <ul>
        <li>
          {' '}
          <Link to="/">
            <span>Home</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/work/">
            <span>Work</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/insights/">
            <span>Insights</span>
          </Link>
        </li>
        <li>
          {' '}
          <Link to="/contact/">
            <span>Contact</span>
          </Link>
        </li>
      </ul>
    </Nav>
    <Top>
      <div>
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
    </Top>

    <ContactDetails>
      <address className="postal">
        Tremough Innovation Centre,
        <br />
        Penryn, Cornwall, TR10 9TA, UK
      </address>

      <address className="email">
        <a href="mailto:hello@gotripod.com">hello@gotripod.com</a>
      </address>

      <a className="phone" href="tel:+448454752487">
        0845 475 2487
      </a>
    </ContactDetails>

    <Social>
      <li>
        <a
          href="https://twitter.com/gotripod"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Go Tripod on Twitter (opens in new window)">
          <Twitter size={18} color={'white'} />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/gotripod"
          target="_blank"
          rel="noopener noreferrer"
          title="Like Go Tripod on Facebook (opens in new window)">
          <Facebook size={18} color={'white'} />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/company/go-tripod-ltd"
          target="_blank"
          rel="noopener noreferrer"
          title="Follow Go Tripod on LinkedIn (opens in new window)">
          <Linkedin size={18} color={'white'} />
        </a>
      </li>
    </Social>

    <Rights>
      © {new Date().getFullYear()} Go Tripod. All rights reserved. Registered in the UK company
      number 6912029. VAT No. 972 5228 06. Get with our{' '}
      <Link to="/privacy-policy/">Privacy&nbsp;Policy</Link>.
    </Rights>
  </Foot>
)

export default Footer

// const SLink = styled(Link)`
//   text-decoration: underline;

//   &:hover {
//     text-decoration: none;
//   }
// `


const Social = (props: ULProps) => (
  <ul {...props}>{props.children}</ul>
)

// const Social = styled.ul`
//   list-style: none;
//   padding: 0;
//   display: flex;
//   justify-content: flex-start;
//   max-width: 1140px;
//   margin: 0 auto ${px2rem(theme.gutter * 4)} auto;

//   li {
//     margin-right: ${px2rem(Theme.gutter * 2)};
//   }

//   ${mqLess(breakpoints.medium)} {
//     justify-content: center;
//   }
// `


const ContactDetails = (props: DivProps) => (
  <div {...props}>{props.children}</div>
)

// const ContactDetails = styled.div`
//   display: flex;
//   justify-content: space-between;
//   max-width: 1140px;
//   margin: 50px auto;

//   address,
//   a {
//     flex: 1;
//     font-style: normal;
//   }

//   .phone {
//     text-align: right;
//     font-size: ${px2rem(30)};
//     font-weight: bold;
//   }

//   .email {
//     text-align: center;
//     color: #4eace0;
//     font-size: ${px2rem(30)};
//     font-weight: bold;
//   }

//   ${mqLess(breakpoints.medium)} {
//     display: block;
//     text-align: center;
//   }
// `


const Foot = (props: FooterProps) => (
  <footer {...props}>{props.children}</footer>
)

// const Foot = styled.footer`
//   background: #424242;
//   color: #f7f7f7;
// `


const Rights = (props: PProps) => (
  <p {...props}>{props.children}</p>
)

// const Rights = styled.p`
//   padding: 20px;
//   text-align: center;
//   background: #2c2c2c;
//   font-size: 13px;
// `


const Nav = (props: NavProps) => (
  <nav {...props}>{props.children}</nav>
)

// const Nav = styled.nav`
//   background: linear-gradient(to left, #62bead, #86cdc0);
//   font-size: 16px;
//   color: black;
//   text-transform: uppercase;
//   padding: ${px2rem(Theme.gutter)};

//   ul {
//     list-style: none;
//     display: flex;
//     padding: 0;
//     justify-content: center;
//   }

//   li {
//     padding: ${px2rem(theme.gutter)} ${px2rem(theme.gutter * 2)};
//   }

//   ${mqLess(breakpoints.medium)} {
//     ul {
//       flex-wrap: wrap;
//     }
//   }
// `


const Top = (props: DivProps) => (
  <div {...props}>{props.children}</div>
)

// const Top = styled.div`
//   background-image: url('https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/bg-footer-stripes.svg');

//   border-bottom: 1px solid #626262;

//   background-repeat: no-repeat;

//   background-position: right;

//   padding: 39px;

//   > div {
//     max-width: 1140px;
//     margin: 0 auto;
//     display: flex;
//     justify-content: space-between;

//     ${mqLess(breakpoints.medium)} {
//       justify-content: center;
//     }
//   }

//   .yus {
//     ${mqLess(breakpoints.medium)} {
//       display: none;
//     }
//   }
// `
