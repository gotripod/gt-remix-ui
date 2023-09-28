interface Props {
  body: string
}

const IntroBlock = ({ body }: Props) => {
  return (
    <section
      className="px-6 pt-10 md:pt-0 md:px-28 text-lg md:text-xl mb-6"
      dangerouslySetInnerHTML={{ __html: body }}
    />
  )
}

export default IntroBlock
