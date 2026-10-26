import BgDiv from "../components/page-frame"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import styled from "styled-components"

import BodyDiv from "../components/BoxBodyDiv"
import ContentBox from "../components/contentbox"
import TitleBar from "../components/titlebar"
import UnstyledLocalLink from "../components/UnstyledLocalLink"

type BlogPostContext = {
  html: string
  title: string
  date: string | null
}



const ArticleHeader = styled.header`
width: 100%;
margin-bottom: 24px;
`

const BackLink = styled.p`
font-family: "Work Sans";
color: var(--site-ink);
margin: 0 0 16px;
`

const Title = styled.h1`
font-family: "Work Sans";
font-size: 2rem;
font-weight: 300;
line-height: 1.2;
color: var(--site-ink);
margin: 0 0 8px;
`

const DateText = styled.p`
font-family: "Work Sans";
font-size: 0.95rem;
color: var(--site-muted);
margin: 0;
`

const ArticleBody = styled.article`
font-family: "Open Sans";
line-height: 1.7;
color: var(--site-ink);

& h2,
& h3,
& h4 {
  font-family: "Work Sans";
  font-weight: 400;
  line-height: 1.25;
  margin-top: 28px;
}

& a {
  color: var(--site-ink);
  font-weight: 700;
}

& img {
  max-width: 100%;
}

& pre {
  overflow: auto;
  padding: 16px;
  background: var(--site-surface);
}

& code {
  font-size: 0.95em;
}
`

const BlogPostTemplate: React.FC<PageProps<object, BlogPostContext>> = ({
  pageContext,
}) => {
  return (
    <BgDiv>
      <ContentBox>
        <TitleBar />
        <BodyDiv>
          <ArticleHeader>
            <UnstyledLocalLink to="/blog">
              <BackLink>Back to Blog</BackLink>
            </UnstyledLocalLink>
            <Title>{pageContext.title}</Title>
            {pageContext.date && <DateText>{pageContext.date}</DateText>}
          </ArticleHeader>
          <ArticleBody dangerouslySetInnerHTML={{ __html: pageContext.html }} />
        </BodyDiv>
      </ContentBox>
    </BgDiv>
  )
}

export default BlogPostTemplate

export const Head: HeadFC<object, BlogPostContext> = ({ pageContext }) => (
  <title>{pageContext.title} · Suhas Narreddy</title>
)
