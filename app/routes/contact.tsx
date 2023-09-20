import type { V2_MetaFunction } from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'
import BaseCard from '~/components/home/base-card'

import Column from '../components/column'
import Map from '../components/contact/map'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'
import type { AddressProps, ULProps } from 'react-html-props'

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  {
    title: data ? data.page.yoastTitle : 'beans'
  }
]

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
          <PageTitle title="Want the internet to work for you?" subTitle="Let's talk" />
        </div>
      </Column>
      <Column className="mt-12">
        <BaseCard cardflare={false} className="py-12 px-8">
          <div className="text-xl mb-20" dangerouslySetInnerHTML={{ __html: page.body }}></div>
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
              <AddressList>
                <li>
                  <PostalAddress>
                    Go Tripod Ltd.
                    <br />
                    Tremough Innovation Centre,
                    <br />
                    Penryn, Cornwall, TR10 9TA,
                    <br />
                    England, UK
                  </PostalAddress>
                </li>
                <li className="highlight text-2xl font-bold text-headingBlue">
                  {' '}
                  <a href="mailto:hello@gotripod.com">hello@gotripod.com</a>
                </li>
                <li className="highlight text-2xl font-bold text-headingBlue">
                  {' '}
                  <a href="tel:+448454752487">0845 475 2487</a>
                </li>
              </AddressList>
            </div>
          </div>
        </BaseCard>
      </Column>
    </Layout>
  )
}

export default Contact

export const loader = async () => {
  const page = await getPageBySlug('contact')
  return json({ page })
}

// const StyledImage = styled.img`
//   margin-left: ${px2rem(theme.gutter * 4)};

//   ${mqLess(breakpoints.medium)} {
//     margin-top: ${px2rem(theme.gutter)};
//   }
// `

const AddressList = (props: ULProps) => <ul {...props}>{props.children}</ul>

// const AddressList = styled.ul`
//   list-style: none;
//   margin-left: ${px2rem(theme.gutter * 4)};
//   padding: 0;

//   .highlight {
//     color: ${theme.colours.highlightBlue};
//     font-size: ${px2rem(theme.fontSize.base * 1.5)};
//     font-weight: bold;
//   }

//   ${mqLess(breakpoints.medium)} {
//     margin-left: 0;
//   }
// `

const PostalAddress = (props: AddressProps) => (
  <address className="mb-2 text-lg not-italic" {...props}>
    {props.children}
  </address>
)

// const PostalAddress = styled.address`
//   font-style: normal;
//   margin-bottom: ${px2rem(theme.gutter * 2)};
// `

// const Card = styled(BaseCard)`
//   padding: ${px2rem(theme.gutter * 8)};
//   margin-bottom: ${px2rem(theme.gutter * 6)};

//   ${mqLess(breakpoints.medium)} {
//     padding: ${px2rem(theme.gutter * 2)};
//     margin-bottom: ${px2rem(theme.gutter * 2)};
//   }
// `

// const Main = styled.div`
//   ${mqMore(breakpoints.medium)} {
//     display: flex;
//     flex-wrap: wrap;
//   }
// `

// const Intro = styled.p`
//   margin: 0 0 ${px2rem(theme.gutter * 6)};
//   font-size: ${px2rem(20)};
//   line-height: ${px2rem(26)};

//   ${mqLess(breakpoints.medium)} {
//     margin: 0 0 ${px2rem(theme.gutter * 2)};
//   }
// `
