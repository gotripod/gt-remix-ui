import styled, { css } from 'styled-components'
import Link from './link'

const ButtonStyles = css`
  display: inline-block;
  position: relative;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  border: 0;
  border-bottom: 3px solid #262626;
  transition: background-color 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 6.5px 30px;
  padding: 0.3611111111rem 1.6666666667rem;
  color: #fff;
  background-color: #62bead;
`

const LinkButton = styled(Link)`
  ${ButtonStyles}
`

const Button = styled.button`
  ${ButtonStyles}
`

export { LinkButton, Button }
