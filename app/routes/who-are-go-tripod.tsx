import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '~/api/page.server'

import Header from '~/components/header'
import { mergeMeta } from '~/helpers/seo'

const Contact = () => {
  const { page } = useLoaderData<typeof loader>()
  return (
    <>
      <Header
        title="Contact us"
        cta={
          <Link to="/contact" className="btn-primary-blue my-2">
            Get in touch
          </Link>
        }
        image="/_img/hero-contact.jpg"
        subTitle={
          <>
            We&apos;re located in Cornwall
            <br />
            Our reach is global
          </>
        }
      />{' '}
      <div className="max-w-screen-xl mx-auto">
        <div className="text-xl mb-20 prose" dangerouslySetInnerHTML={{ __html: page.body }}></div>
      </div>
    </>
  )
}

export default Contact

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

export const loader = async () => {
  const page = await getPageBySlug('who-are-go-tripod')

  if (!page) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return json({ page })
}
