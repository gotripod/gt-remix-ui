import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import type { DivProps } from 'react-html-props'
import { getPageBySlug, getProjects, getTestimonial } from '~/api'
import Column from '~/components/column'
import { cardClasses } from '~/components/home/base-card'
import Layout from '~/components/layout'
import PageTitle from '~/components/page-title'
import { mergeMeta } from '~/helpers/seo'

const ProjectItemLink = (props: DivProps) => (
  <div
    {...props}
    className={`
    ${cardClasses()} before:hidden ${props.className}
  `}>
    {props.children}
  </div>
)

export const meta = mergeMeta(
  () => {
    return []
  },

  ({ data }) => {
    return [
      { title: data?.page?.yoastTitle || '' },
      {
        name: 'description',
        content: data?.page?.yoast.metaDesc
      }
    ]
  }
)

const Index = () => {
  const { projects, testimonial } = useLoaderData<typeof loader>()

  return (
    <Layout testimonial={testimonial}>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}

      <Column className="px-4 md:px-0 -mt-28 md:mt-0">
        <PageTitle slim title="Work" subTitle="A selection of recent projects" />
        <div className="md:grid grid-cols-3 gap-8 mt-12">
          {projects.map((project) => (
            <Link to={`/work/${project.link}`} key={project.id} className="block mb-8 md:mb-0">
              <ProjectItemLink className="group">
                <img
                  className="block aspect-auto group-hover:hidden"
                  src={project.logoUrl}
                  alt={`Logo for ${project.title}`}
                  title={`View the case study for ${project.title}`}
                />
                <img
                  className="hidden group-hover:block"
                  src={project.logoHoverUrl}
                  alt={`Logo for ${project.title}`}
                  title={`View the case study for ${project.title}`}
                />
              </ProjectItemLink>
            </Link>
          ))}
        </div>
      </Column>
    </Layout>
  )
}

// const ProjectItemLink = styled.a<{ width: number }>`

//   :hover {
//     cursor: pointer;
//     img:nth-child(2) {
//       display: block;
//     }

//     img:nth-child(1) {
//       display: none;
//     }
//   }

//   img:nth-child(1) {
//     object-position: top;
//   }

//   img:nth-child(2) {
//     object-position: bottom;
//     display: none;
//   }

//   img {
//     max-height: ${(props) => props.width / 1.39087947883}px;
//     width: 100%;
//     object-fit: cover;
//     height: ${614 / 2}px;
//   }
// `

export const loader = async () => {
  const [testimonial, projects, page] = await Promise.all([
    getTestimonial(),
    getProjects(),
    getPageBySlug('work')
  ])

  return json({
    page,
    testimonial,
    projects
  })
}

export default Index
