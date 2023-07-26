import { json, LoaderArgs } from '@remix-run/cloudflare'
import { Link, useLoaderData } from '@remix-run/react'
import { useLayoutEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { getPageBySlug, getProjects, getTestimonial } from '~/api'
import Column from '~/components/column'
import Layout from '~/components/layout'
import PageTitle from '~/components/page-title'
import theme, { breakpoints, mqLess } from '~/theme'


const Index = () => {
  const { projects, testimonial, page } = useLoaderData<typeof loader>()
  const [pageWidth, setPageWidth] = useState<number>(0)
  const ref = useRef<HTMLImageElement>(null)

  useLayoutEffect(() => {
    if (ref.current) {
      setPageWidth(ref.current.clientWidth)
    }
  }, [ref])

  return (
    <Layout testimonial={testimonial}>
      {/* <Head>
        <title>{page.yoastTitle}</title>
        {parse(page.yoastHtml)}
      </Head> */}

      <Column>
        <PageTitle slim title="Work" subTitle="A selection of recent projects" />
        <Wrapper>
          {projects.map((project) => (
            <div key={project.id}>
              <Link to={`/work/${project.link}`}>
                <ProjectItemLink width={pageWidth}>
                  <img
                    src={project.logoUrl}
                    alt={`Logo for ${project.title}`}
                    title={`View the case study for ${project.title}`}
                    ref={ref}
                  />
                  <img
                    src={project.logoUrl}
                    alt={`Logo for ${project.title}`}
                    title={`View the case study for ${project.title}`}
                  />
                </ProjectItemLink>
              </Link>
            </div>
          ))}
        </Wrapper>
      </Column>
    </Layout>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));

  margin: 0 0 ${theme.gutter * 4}px 0;

  div {
    padding: 13px;
    box-sizing: border-box;
  }

  ${mqLess(breakpoints.medium)} {
    display: block;

    div {
      flex-basis: 100%;
      max-width: 100%;
    }
  }
`

const ProjectItemLink = styled.a<{ width: number }>`
  display: block;
  ${theme.greyCardFlare}

  font-size: 0;
  line-height: 0;

  :hover {
    cursor: pointer;
    img:nth-child(2) {
      display: block;
    }

    img:nth-child(1) {
      display: none;
    }
  }

  img:nth-child(1) {
    object-position: top;
  }

  img:nth-child(2) {
    object-position: bottom;
    display: none;
  }

  img {
    max-height: ${(props) => props.width / 1.39087947883}px;
    width: 100%;
    object-fit: cover;
    height: ${614 / 2}px;
  }
`

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
