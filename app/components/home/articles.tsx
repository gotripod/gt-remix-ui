import { Link } from '@remix-run/react'

import { LinkButton } from '~/components/button'

import { Article } from '~/types'
import Column from '../column'
import BaseCard from './base-card'

interface Props {
  articles: Article[]
}

const formatDate = (stringDate: string): string => {
  const date = new Date(stringDate)
  const dtf = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'numeric',
    day: '2-digit'
  })
  const [{ value: mo }, , { value: da }, , { value: ye }] = dtf.formatToParts(date)
  return `${da}/${mo}/${ye}`
}

const Articles = ({ articles }: Props) => (
  <Column>
    <BaseCard>
      <>
        <h1>Here&apos;s what we&apos;ve been up to recently...</h1>
        <div className="grid articles">
          {articles.map((article: Article) => {
            return (
              <article key={`article-${article.id}`}>
                <div className="date">{formatDate(article.date)}</div>
                <h2>
                  <Link to={article.link}>{article.title}</Link>
                </h2>
                  <Link to={article.link}>Read More</Link>
              </article>
            )
          })}
        </div>
        <LinkButton to="/insights">See them all</LinkButton>
      </>
    </BaseCard>
  </Column>
)

export default Articles

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(25ch, 1fr));
//   gap: 2em;
// `

// const SButton = styled(LinkButton)`
//   font-size: 18px;
//   background-color: ${theme.colours.headingBlue};
//   color: white !important;
// `

// const Slink = styled.span`
//   color: #62bead;
//   text-decoration: underline;

//   &:visited {
//     color: #62bead;
//   }

//   ${mqLess(breakpoints.medium)} {
//     display: inline-block;
//     margin-bottom: ${px2rem(theme.gutter * 2)};
//   }
// `

// const StyledArticleList = styled(BaseCard)`
//   text-align: center;
//   margin: ${px2rem(theme.gutter * 6)} 0;
//   padding: ${px2rem(theme.gutter * 4)};

//   .articles {
//     margin: ${px2rem(theme.gutter * 4)} 0;
//   }

//   article {
//   }

//   div.date {
//     color: #999;
//   }
//   h2 {
//     font-size: ${px2rem(20)};
//     margin: ${px2rem(theme.gutter * 2)} 0;
//   }

//   h1 {
//     font-size: ${px2rem(36)};
//   }

//   ${mqLess(breakpoints.medium)} {
//     h1 {
//       font-size: ${px2rem(30)};
//     }

//     margin: ${px2rem(theme.gutter * 2)} ${px2rem(theme.gutter * 2)};
//     padding: ${px2rem(theme.gutter * 2)};

//     .articles {
//       display: block;
//       margin-bottom: 0;
//     }

//     article {
//       border-bottom: 1px solid #ededed;
//       padding: 0;
//       padding-top: ${px2rem(theme.gutter)};
//     }

//     article:last-child {
//       border-bottom: 1px solid white;
//     }

//     .item {
//       width: 100%;
//       display: block;
//       padding: 0 0;
//     }

//     article h2 {
//       margin-top: 0;
//     }
//   }
// `
