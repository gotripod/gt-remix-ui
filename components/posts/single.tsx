import Column from '../../components/column'
import React from 'react'
import PageTitle from 'components/page-title'
import styled from 'styled-components'
import theme, { mqLess, breakpoints, px2rem } from 'theme'
import parse, { domToReact } from 'html-react-parser'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'
import { CaptionStyles } from 'components/common'
import Link from 'components/link'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaGooglePlusG } from 'react-icons/fa'
import { AiOutlineMail } from 'react-icons/ai'
import { SinglePostProps } from 'pages/insights/[[...slug]]'
import Head from 'next/head'

const Single = ({ post }: SinglePostProps) => {
  const link = encodeURIComponent(post.link)

  return (
    <>
      <Head>
        <title>{post.title} - Go Tripod</title>
        {parse(post.yoastHtml)}
      </Head>
      <Column slim>
        <PageTitle title={post.title} subTitle={new Date(post.date).toDateString()} />
      </Column>
      <Column>
        {
          <>
            <Content>
              {parse(post.content, { replace: replaceCode })}

              <Social>
                Sharing is caring:
                <ul>
                  <li>
                    <a
                      href={`https://twitter.com/intent/tweet/?url=${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share this article on Twitter (opens in new window)">
                      <FaTwitter size={18} color={'black'} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share this article on Facebook (opens in new window)">
                      <FaFacebookF size={18} color={'black'} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share this article on LinkedIn (opens in new window)">
                      <FaLinkedinIn size={18} color={'black'} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://plus.google.com/share?url=${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share this article on Google+ (opens in new window)">
                      <FaGooglePlusG size={18} color={'black'} />
                    </a>
                  </li>
                  <li>
                    <a
                      href={`mailto:?subject=I thought you might be interested in this article on the Go Tripod website&body=${link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Share this article by email (opens in new window)">
                      <AiOutlineMail size={18} color={'black'} />
                    </a>
                  </li>
                </ul>
              </Social>

              {post.teamMember && (
                <TeamMember>
                  <AuthorAvatar src={post.teamMember.imageUrl} width={100} height={100} />
                  <AuthorDetails>
                    By {post.teamMember.name}, {post.teamMember.position}
                    <br />
                    Filed under:{' '}
                    {post.taxonomies
                      .filter((t) => t.taxonomy === 'category')
                      .map((t, idx, arr) => (
                        <React.Fragment key={t.slug}>
                          <Link href={`/insights/category/${t.slug}/`}>
                            {t.name}
                          </Link>
                          {idx < arr.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                    <br />
                    Topics:{' '}
                    {post.taxonomies
                      .filter((t) => t.taxonomy === 'post_tag')
                      .map((t, idx, arr) => (
                        <React.Fragment key={t.slug}>
                          <Link key={t.slug} href={`/insights/topic/${t.slug}/`}>
                            {t.name}
                          </Link>
                          {idx < arr.length - 1 ? ', ' : ''}
                        </React.Fragment>
                      ))}
                  </AuthorDetails>
                </TeamMember>
              )}
            </Content>
          </>
        }
      </Column>
    </>
  )
}

const Social = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 15px;
  color: #999;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0 0 0 ${px2rem(theme.gutter)} !important;
  }

  li {
    padding-right: 10px;
    font-size: 0;
  }

  a {
    font-size: 0;
  }

  a:visited {
    color: #333;
  }

  a:hover {
    opacity: 0.5;
  }
`

const AuthorDetails = styled.p`
  margin-left: 20px !important;
  color: #999;
`

const TeamMember = styled.div`
  display: flex;
  justify-content: center;
  margin: ${px2rem(theme.gutter * 4)} 0 0 0;
`

const AuthorAvatar = styled(Image)`
  border-radius: 50%;
  margin-right: 20px;
  display: block;
`

const Content = styled.div`
  margin: 0 auto ${px2rem(theme.gutter * 6)} auto;
  max-width: 1000px;
  width: 100%;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
  padding: ${px2rem(theme.gutter * 4)};

  .wp-caption {
    max-width: 100%;
    height: auto;
  }

  .wp-caption-text {
    ${CaptionStyles}
  }

  blockquote {
    color: #62bead;
    position: relative;
    font-weight: bold;
    padding: 0 ${px2rem(theme.gutter * 2)};
    ${theme.cardFlare};
  }

  img {
    height: auto;
  }

  code[class^='language-'] {
    background-color: #f7f7f7 !important;
    padding: ${px2rem(theme.gutter * 2)} !important;
  }

  ${theme.contentStyles}
  ${theme.greyCardFlare}
 
   ${mqLess(breakpoints.medium)} {
    padding: ${px2rem(theme.gutter * 2)};
  }
`

const getLanguage = (node) => {
  if (node.children[0].attribs.class != null) {
    return node.children[0].attribs.class.replace('language-', '')
  }
  return null
}

const getCode = (node) => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children
  } else {
    return node.children
  }
}

const replaceCode = (node) => {
  try {
  if (node.name === 'pre' && node.children[0].attribs.class.indexOf('language-') > -1) {
    const code = getCode(node)
    const language = getLanguage(node)

    return (
      node.children.length > 0 && (
        <SyntaxHighlighter style={coy} language={language}>
          {domToReact(code)}
        </SyntaxHighlighter>
      )
    )
  }
} catch {
  return null
}
}

export default Single
