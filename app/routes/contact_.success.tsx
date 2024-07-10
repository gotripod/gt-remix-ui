import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api/page.server'
import BaseCard from '~/components/home/base-card'

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

const Contact = () => {
  const { page } = useLoaderData<typeof loader>()
  return (
    <>
      <Column className="mt-12">
        <BaseCard cardflare={false} className="py-12 px-8">
          <div className="text-xl" dangerouslySetInnerHTML={{ __html: page.section.body }}></div>
        </BaseCard>
      </Column>
    </>
  )
}

export default Contact

export const loader = async () => {
  const page = await getPageBySlug('contact/success')

  if (!page) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return json({ page })
}
