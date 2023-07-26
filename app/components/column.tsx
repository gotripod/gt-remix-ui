import styled from 'styled-components'

const Column = styled.div<{ slim?: boolean }>`
  max-width: ${(props) => (props.slim ? 1000 : 1140)}px;
  margin: 0 auto;
  position: relative;

  img {
    max-width: 100%;
  }
`

export default Column
