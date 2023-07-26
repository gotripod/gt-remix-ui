


interface Props {
  body: string
}

const IntroBlock = ({ body }: Props) => {
  return <section className="text-md mb-6" dangerouslySetInnerHTML={{ __html: body }} />
}

export default IntroBlock
