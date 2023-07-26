


interface Props {
  title: string
  body: string
}

const Wrapper = styled.div`
  display: flex;
  margin: ${px2rem(theme.gutter * 6)} 0 ${px2rem(theme.gutter * 6)} 0;

  h2 {
    color: ${theme.colours.headingBlue};
    flex-basis: 35%;
    font-size: ${px2rem(30)};
  }

  div {
    flex-basis: 65%;
  }
`

const TitleBlock = ({ title, body }: Props) => {
  return (
    <Wrapper>
      <h2>{title}</h2>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </Wrapper>
  )
}

export default TitleBlock
