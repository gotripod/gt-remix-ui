import { json } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import type { DivProps } from 'react-html-props'
import { getPageBySlug } from '~/api/page.server'
import { getProjects } from '~/api/projects.server'
import Column from '~/components/column'
import Header from '~/components/header'
import { cardClasses } from '~/components/home/base-card'
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

const Index = () => {
  const { projects } = useLoaderData<typeof loader>()

  return (
    <>
      <Header
        title="Our purpose"
        ctaText="See what we can do for you"
        ctaLink="#services"
        image="/_img/hero-home.jpg"
        subTitle={
          <>
            Let&apos;s create transformative solutions <br />
            to move your business forward
          </>
        }
      />

      <Column className="px-4 md:px-0 -mt-20 md:mt-0">
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
    </>
  )
}

export const meta = mergeMeta<typeof loader>(
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

export const loader = async () => {
  const [projects, page] = await Promise.all([getProjects(), getPageBySlug('work')])

  return json({
    page,
    projects
  })
}

export default Index
