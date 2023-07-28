import { LoaderArgs } from '@remix-run/cloudflare'
import { useLoaderData } from '@remix-run/react'

import { getPageBySlug } from '~/api'
import BaseCard from '~/components/home/base-card'

import Column from '../components/column'
import Layout from '../components/layout'
import PageTitle from '../components/page-title'

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

const Privacy = () => {

const {page} = useLoaderData()

  const date = new Date(page.date)
  return (
    <Layout>
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
      <Column>
        <BaseCard>
          <main dangerouslySetInnerHTML={{ __html: page.body }}></main>
        </BaseCard>
      </Column>
    </Layout>
  )
}

// const Main = styled.div`
//   ${theme.contentStyles}
// `

export const loader = async ({}: LoaderArgs) => {
  const page = await getPageBySlug('privacy-policy')
  console.log(page)
  return {
      page
  }
}

export default Privacy
