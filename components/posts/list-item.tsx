import React, { ReactElement } from 'react'
import styled from 'styled-components'
import Theme, { mqLess, breakpoints, px2rem } from '../../theme'
import Link, { BlueLink } from '../link'
import theme from '../../theme'
import { Post } from 'types'

interface Props {
  post: Post
}

const Item = ({ post }: Props): ReactElement => {
  const date = new Date(post.date)

  return (
    <Li>
      <Article>
        <PublishDate>{date.toLocaleDateString()}</PublishDate>

        <Title>{post.title}</Title>

        <BlueLink href={post.slug}>Read More</BlueLink>
      </Article>
    </Li>
  )
}

export default Item


const Li = styled.li`
  flex-basis: 33.3333333333%;
  padding: 13px;
  list-style: none;
  max-width: 33.3333333333%;
  box-sizing: border-box;

  ${mqLess(breakpoints.medium)} {
    flex-basis: 1;
    max-width: 100%;
    margin: 0 ${px2rem(theme.gutter)};
  }
`

const Article = styled.article`
  background-color: #fff;
  line-height: 26px;
  box-sizing: border-box;
  display: block;
  padding: 26px;
  height: 100%;

  border-bottom: 5px solid rgba(0, 0, 0, 0.3);

  box-shadow: 0 0 1px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 1.1111111111rem;
  line-height: 26px;
  line-height: 1.4444444444rem;
  margin: ${px2rem(Theme.gutter * 2)} 0;
`

const PublishDate = styled.span`
  color: #999;
`
