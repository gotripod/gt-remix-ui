import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'
import BaseCard from '~/components/home/base-card'

import Column from '../components/column'
import PageTitle from '../components/page-title'
import { mergeMeta } from '~/helpers/seo'
import { json } from '@remix-run/cloudflare'

const nth = function (d: number) {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const meta = mergeMeta(
  () => [],
  ({ data }) => {
    return [
      {
        name: 'description',
        content: data?.page?.yoast.metaDesc
      },
      { title: data?.page?.yoastTitle || '' }
    ]
  }
)

const Privacy = () => {
  const { page } = useLoaderData()

  const date = new Date(page.date)
  return (
    <>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}
      <Column slim>
        <PageTitle
          title={page.title}
          subTitle={`Last updated on ${date.getUTCDate()}${nth(
            date.getUTCDate()
          )} ${date.toLocaleDateString(undefined, { month: 'short' })} ${date.getFullYear()}`}
        />
      </Column>
      <Column className="mt-16">
        <BaseCard>
          <main className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.body }}></main>
        </BaseCard>
      </Column>
    </>
  )
}

// const Main = styled.div`
//   ${theme.contentStyles}
// `

export const loader = async () => {
  const page = await getPageBySlug('privacy-policy')
  return json({
    page
  })
}

export default Privacy
