


interface Props {
  body: string
}

const IntroBlock = ({ body }: Props) => {
  return <section className="px-6 md:px-28 text-xl mb-6" dangerouslySetInnerHTML={{ __html: body }} />
}

export default IntroBlock
