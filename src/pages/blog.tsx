import BgDiv from "../components/page-frame"
import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import styled from "styled-components"

import BodyDiv from "../components/BoxBodyDiv"
import ContentBox from "../components/contentbox"
import TitleBar from "../components/titlebar"
import UnstyledLocalLink from "../components/UnstyledLocalLink"

type BlogIndexData = {
  allMarkdownRemark: {
    nodes: Array<{
      id: string
      excerpt: string
      fields: {
        slug: string
        title: string
      }
      frontmatter: {
        title: string | null
        date: string | null
        description: string | null
      }
    }>
  }
}



const EmptyText = styled.p`
color: var(--site-ink);
font-family: "Work Sans";
text-align: center;
`

const PostList = styled.ul`
width: 100%;
display: flex;
flex-direction: column;
gap: 20px;
padding: 0;
margin: 28px 0 32px;
list-style: none;
`

const PostItem = styled.li`
padding-top: 4px;
`

const PostTitle = styled.h2`
font-family: "Work Sans";
font-size: 1.35rem;
font-weight: 400;
color: var(--site-ink);
margin: 0 0 8px;
`

const PostMeta = styled.p`
font-family: "Work Sans";
font-size: 0.9rem;
color: var(--site-muted);
margin: 0 0 8px;
`

const PostSummary = styled.p`
font-family: "Open Sans";
line-height: 1.6;
color: var(--site-ink);
margin: 0;
`

const BlogPage: React.FC<PageProps<BlogIndexData>> = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <BgDiv>
      <ContentBox>
        <TitleBar />
        <BodyDiv>
          {posts.length === 0 ? (
            <EmptyText>Add Markdown files to content/blog to publish posts.</EmptyText>
          ) : (
            <PostList>
              {posts.map(post => {
                const title = post.frontmatter.title || post.fields.title
                const summary = post.frontmatter.description || post.excerpt

                return (
                  <PostItem key={post.id}>
                    <UnstyledLocalLink to={post.fields.slug}>
                      <PostTitle>{title}</PostTitle>
                    </UnstyledLocalLink>
                    {post.frontmatter.date && (
                      <PostMeta>{post.frontmatter.date}</PostMeta>
                    )}
                    <PostSummary>{summary}</PostSummary>
                  </PostItem>
                )
              })}
            </PostList>
          )}
        </BodyDiv>
      </ContentBox>
    </BgDiv>
  )
}

export default BlogPage

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { slug: { ne: null } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 180)
        fields {
          slug
          title
        }
        frontmatter {
          title
          date(formatString: "MMMM D, YYYY")
          description
        }
      }
    }
  }
`

export const Head: HeadFC = () => <title>Blog · Suhas Narreddy</title>
