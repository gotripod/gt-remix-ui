import styled from 'styled-components'
import { px2rem } from '~/theme'
import Link from '../link'

const Enquire = styled(Link)`
  display: inline-block;

  position: relative;

  text-align: center;

  font-weight: 700;

  cursor: pointer;

  border: 0;

  border-bottom-color: currentcolor;
  border-bottom-style: none;
  border-bottom-width: 0px;

  border-bottom: 3px solid #262626;

  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1);

  padding: ${px2rem(6.5)} ${px2rem(30)};

  color: #fff !important;

  background-color: #62bead;
`

export default Enquire
