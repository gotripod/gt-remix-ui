import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { AProps, DivProps } from 'react-html-props'
import { getPageBySlug, getProjects, getTestimonial } from '~/api'
import Column from '~/components/column'
import { cardClasses } from '~/components/home/base-card'
import Layout from '~/components/layout'
import PageTitle from '~/components/page-title'



const ProjectItemLink = (props: DivProps) => (
  <div {...props} className={`
    ${cardClasses()} before:hidden
  `}>{props.children}</div>
)

const Index = () => {
  const { projects, testimonial, page } = useLoaderData<typeof loader>()

  return (
    <Layout testimonial={testimonial}>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}

      <Column>
        <PageTitle slim title="Work" subTitle="A selection of recent projects" />
        <div className='md:grid grid-cols-3 gap-8 mt-12'>
          {projects.map((project) => (
              <Link to={`/work/${project.link}`} key={project.id}>
                <ProjectItemLink>
                <img
                  className='block object-cover w-full h-[256px] object-top hover:object-bottom'
                    src={project.logoUrl}
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

export const loader = async (ctx: LoaderArgs) => {
  const testimonial = await getTestimonial()
  const projects = await getProjects()
  const page = await getPageBySlug('work')

  return json({
    page,
    testimonial,
    projects
  })
}

export default Index
