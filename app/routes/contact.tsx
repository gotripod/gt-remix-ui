import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { getPageBySlug } from '~/api/page.server'

import GrowCta from '~/components/grow-cta'
import Header from '~/components/header'
import { mergeMeta } from '~/helpers/seo'
import Map from '../components/contact/map'

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
      <div className="max-w-screen-xl mx-auto mb-20">
        <div className="text-xl mb-10" dangerouslySetInnerHTML={{ __html: page.body }}></div>
        <div className="md:grid grid-cols-[65%_auto] gap-16">
          <div style={{ flex: 1 }}>
            <Map />
          </div>
          <div className="mt-8 md:mt-0">
            <img
              className="md:mt-1"
              height={40}
              width={193}
              src="https://content.gotripod.com/wp-content/themes/go-tripod/WPGulp/assets/img/gt-logo-colour-on-white.svg"
              alt="Go Tripod"
            />
            <ul>
              <li>
                <address className="mb-2 text-lg not-italic">
                  Go Tripod Ltd.
                  <br />
                  Tremough Innovation Centre,
                  <br />
                  Penryn, Cornwall, TR10 9TA,
                  <br />
                  England, UK
                </address>
              </li>
              <li className="highlight text-2xl font-bold text-headingBlue">
                {' '}
                <a href="mailto:hello@gotripod.com">hello@gotripod.com</a>
              </li>
              <li className="highlight text-2xl font-bold text-headingBlue">
                {' '}
                <a href="tel:+448454752487">0845 475 2487</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <GrowCta />
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
  const page = await getPageBySlug('contact')

  if (!page) {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found'
    })
  }

  return json({ page })
}
