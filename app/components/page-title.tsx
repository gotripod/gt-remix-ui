import { usePageTitles } from '~/hooks/wp'
import Column from './column'

const PageTitle = () => {
  const titles = usePageTitles()
  const { title, subTitle } = titles || { title: '', subTitle: '' }

  if (!title && !subTitle) return <div className="pt-20"></div>

  return (
    <Column style={{ zIndex: 10 }} className="md:pb-8 pt-20 md:pt-12">
      <div
        className={`md:p-0 mx-6 md:mx-0 go-gradient md:block py-8 ${
          subTitle ? 'md:pb-20' : 'md:pb-24'
        }`}>
        <>
          <h1 className={`text-center text-3xl md:text-5xl font-bold text-gray-175 md:pt-28`}>
            {title}
          </h1>
          {subTitle && (
            <h2
              className="text-center text-xl md:text-4xl font-bold text-gray-175 md:pb-8 md:px-40"
              dangerouslySetInnerHTML={{
                __html: subTitle
              }}></h2>
          )}
        </>
      </div>
    </Column>
  )
}

export default PageTitle
