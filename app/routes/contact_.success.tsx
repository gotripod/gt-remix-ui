import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'
import BaseCard from '~/components/home/base-card'

import Column from '../components/column'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import { mergeMeta } from '~/helpers/seo'

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

const Contact = () => {
  const { page } = useLoaderData<typeof loader>()
  return (
    <Layout>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}

      <Column slim className="-mt-28 md:mt-0">
        <div className="mx-4 md:mx-0">
          <PageTitle title={page.section.title} subTitle={page.section.subtitle} />
        </div>
      </Column>
      <Column className="mt-12">
        <BaseCard cardflare={false} className="py-12 px-8">
          <div className="text-xl" dangerouslySetInnerHTML={{ __html: page.section.body }}></div>
        </BaseCard>
      </Column>
    </Layout>
  )
}

export default Contact

export const loader = async () => {
  const page = await getPageBySlug('contact/success')
  return json({ page })
}
