import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'

import type { LoaderFunctionArgs } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { mergeMeta } from '~/helpers/seo'
import Column from '../components/column'

export const meta = mergeMeta<typeof loader>(
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
  const { page } = useLoaderData<typeof loader>()

  return (
    <Column className="mt-8">
      <main className="card-base cardflare">
        <div
          className="card-inner prose max-w-none"
          dangerouslySetInnerHTML={{ __html: page.body }}></div>
      </main>
    </Column>
  )
}

// const Main = styled.div`
//   ${theme.contentStyles}
// `

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const filePath = params['*']

  if (!filePath) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  const page = await getPageBySlug(filePath)

  if (!page) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return json({
    page
  })
}

export default PageUI
