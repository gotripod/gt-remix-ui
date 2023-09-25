import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'

import Column from '../components/column'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import { mergeMeta } from '~/helpers/seo'
import type { LoaderArgs } from '@remix-run/cloudflare'
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

const PageUI = () => {
  const { page } = useLoaderData()

  return (
    <Layout>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}
      <Column slim>
        <PageTitle
          title={page.title}
          // subTitle={`Last updated on ${date.getUTCDate()}${nth(
          //   date.getUTCDate()
          // )} ${date.toLocaleDateString(undefined, { month: 'short' })} ${date.getFullYear()}`}
        />
      </Column>
      <Column className="mt-16">
        <main dangerouslySetInnerHTML={{ __html: page.body }}></main>
      </Column>
    </Layout>
  )
}

// const Main = styled.div`
//   ${theme.contentStyles}
// `

export const loader = async ({ params }: LoaderArgs) => {
  const filePath = params['*']

  if (!filePath) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  const page = await getPageBySlug(filePath)
  return json({
    page
  })
}

export default PageUI
