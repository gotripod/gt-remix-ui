import Link from 'components/link'
import React from 'react'
import styled from 'styled-components'
import theme, { px2rem } from 'theme'
import Column from '../column'

interface Props {
  technologies: any[]
  services: any[]
  links: {itemBody:string, itemLink:string}[]
}

const PrecisBlock = ({ technologies, services, links }: Props) => {
  return (
    <SColumn>
      <Grid  gap='1em' columns="repeat(auto-fit, minmax(250px, 1fr))">
      <div>
        <p>Our involvement in this project included the following:</p>
        <ul>
          {services.map((t, i) => (
            <li key={i}>{t.itemBody}</li>
          ))}
        </ul>
      </div>

      <div>
        <p>We made use of these technologies along the way:</p>
        <ul>
          {technologies.map((t, i) => (
            <li key={i}>{t.itemBody}</li>
          ))}
        </ul>
      </div>

      <div className={'next'}>
        <p>So, what would you like to do next?</p>
        <ul className="list">
          {
            links && links.map(link => <li key={link.itemLink}><Link href={link.itemLink} target="_blank">{link.itemBody}</Link><svg viewBox="0 0 24 24" width="1em" height="1em"><g><path fill="#4291ce" d="M 5 3 C 3.898438 3 3 3.898438 3 5 L 3 19 C 3 20.101563 3.898438 21 5 21 L 19 21 C 20.101563 21 21 20.101563 21 19 L 21 13 L 19 11 L 19 19 L 5 19 L 5 5 L 13 5 L 11 3 Z M 14 3 L 16.65625 5.65625 L 9.15625 13.15625 L 10.84375 14.84375 L 18.34375 7.34375 L 21 10 L 21 3 Z "></path></g></svg></li>)
          }
          <li>
            <Link href="/work/curious-ways/">See another example of our work</Link>
          </li>
          <li>
            <Link href="/work/">Go back to the Work overview page</Link>
          </li>
          <li>
            <Link href="/contact/">Contact us</Link>
          </li>
        </ul>
      </div>
      </Grid>
    </SColumn>
  )
}

const Grid = styled.div`
display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1em;
`
const SColumn = styled(Column)`

  font-size: 90%;

  p {
    margin-bottom: ${px2rem(theme.gutter)};
  }

  li {
  }

  li:before {
    top: 8px;
    left: 0;
    position: relative;
    content: '⋆';
    color: orange;
    font-size: 50px;
    line-height: 0;
  }

  ul {
    padding: 0;
    list-style: none;
  }

  .next ul {
    padding: 0;
    list-style: none;
  }

  .next li:before {
    content: ''
  }

  .next li {
    position: relative;
    svg {
      position: absolute;
      top: 4px;
      margin-left: 5px;
      display: inline-block;
    }
  }

  .next a {
    color: ${theme.colours.headingBlue};

  }
`
export default PrecisBlock
