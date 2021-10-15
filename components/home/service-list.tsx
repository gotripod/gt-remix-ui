import React from 'react'
import styled from 'styled-components'
import Theme, { breakpoints, mqLess, px2rem } from '../../theme'
import { Service } from '../../types'
import BaseCard from './base-card'
import Enquire from './enquire'

interface Props {
  services: Service[]
}

const ServiceList = ({ services }: Props) => {
  return (
    <StyledServiceList>
      {services.map((service, idx) => (
        <li key={idx}>
          <Item {...(idx % 2 !== 0 && {alternate: true})}>
            <div className="contentWrap">
              {idx === 0 && <h1>We are Go Tripod.</h1>}
              <h2>{service.title}</h2>
              <div className="body" dangerouslySetInnerHTML={{ __html: service.body }} />
              <Enquire href="/contact">Enquire</Enquire>
            </div>

            <img src={service.imageUrl} loading="lazy" />
          </Item>
        </li>
      ))}
    </StyledServiceList>
  )
}

export default ServiceList

const StyledServiceList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: -${px2rem(Theme.gutter * 4)};
  z-index: 1;
  position: relative;
`

const Item = styled(BaseCard)<{alternate?: boolean}>`
  ${Theme.cardFlare}

  &:before {
    ${props => props.alternate ? 'right: 0; left: auto;' : '' };
  }
  overflow: hidden;
  position: relative;
  padding: ${px2rem(Theme.gutter * 4)} ${px2rem(Theme.gutter * 5)};
  margin-bottom: ${px2rem(Theme.gutter * 5)};

  .contentWrap {
    width: 60%;
  }

  img {
    width: 60%;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  h1 {
    color: ${Theme.colours.headingBlue};
    font-size: ${px2rem(40)};
    margin: 0;
    position: relative;
    z-index: 10;
  }

  h2 {
    margin-top: 0;
    position: relative;
    z-index: 10;
    font-size: ${Theme.fontSize.h2}px;
  }

  .body {
    position: relative;
    z-index: 10;

    color: #999;
    width: 60%;
    line-height: 150%;
    margin: ${px2rem(Theme.gutter * 2)} 0 ${px2rem(Theme.gutter * 3)} 0;
  }

  ${mqLess(breakpoints.medium)} {
    margin: ${px2rem(Theme.gutter * 2)} 0;
    padding: ${px2rem(Theme.gutter * 2)};
    img {
      display: none;
    }

    .contentWrap,
    .body,
    h2 {
      width: 100%;
    }

    h1,
    h2 {
      text-align: center;
      font-size: ${36}px;
    }

    .body {
      margin-bottom: ${Theme.gutter * 2}px;
    }
  }
`
