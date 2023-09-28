interface Props {
  title: string
  body: string
}

// const Wrapper = styled.div`
//   display: flex;
//   margin: ${px2rem(theme.gutter * 6)} 0 ${px2rem(theme.gutter * 6)} 0;

//   h2 {
//     color: ${theme.colours.headingBlue};
//     flex-basis: 35%;
//     font-size: ${px2rem(30)};
//   }

//   div {
//     flex-basis: 65%;
//   }
// `

const TitleBlock = ({ title, body }: Props) => {
  return (
    <div className="md:grid grid-cols-[30%_auto] md:grid-cols-[40%_auto] px-6 md:px-28 my-12 gap-4 md:gap-0">
      <h2 className="text-headingBlue text-3xl font-bold">{title}</h2>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}

export default TitleBlock
