

const S = {
  Wrapper: styled.header<{ slim: boolean }>`
    position: relative;
    background: white;
    border-bottom: 5px solid rgba(0, 0, 0, 0.3);
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: ${px2rem(theme.gutter * 4)} 0;
    z-index: 1;
    margin: -${px2rem(Theme.gutter * 4)} ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px ${Theme.gutter *
      4}px ${(props) => (props.slim ? Theme.gutter * 6 : 0)}px;
    ${Theme.cardFlare}

    ${mqLess(breakpoints.medium)} {
      margin-top: -${px2rem(Theme.gutter * 6)};
      margin-left: ${px2rem(theme.gutter)};
      margin-right: ${px2rem(theme.gutter)};
    }
  `
}

const P = styled.p`
  color: #999;
  margin-top: ${px2rem(theme.gutter)}
`

interface Props {
  title: string
  subTitle?: string
  slim?: boolean
}

const PageTitle = ({ slim, title, subTitle }: Props) => (
  <S.Wrapper slim={slim === true ? true : false}>
    <h1>{title}</h1>
    {subTitle && <P>{subTitle}</P>}
  </S.Wrapper>
)

export default PageTitle
