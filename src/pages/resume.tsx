import BgDiv from "../components/page-frame"
import * as React from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import styled from "styled-components"

import BodyDiv from "../components/BoxBodyDiv"
import ContentBox from "../components/contentbox"
import TitleBar from "../components/titlebar"

type ResumeData = {
  markdownRemark: {
    html: string
    frontmatter: {
      title: string | null
    }
  } | null
}



const ResumeBody = styled.article`
font-family: "Work Sans";
color: var(--site-ink);
line-height: 1.75;
margin-top: 0;

& h1 {
  font-size: 36px;
  font-weight: 400;
  margin: 0 0 36px;
}

& h2 {
  font-size: 26px;
  font-weight: 400;
  margin: 40px 0 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--site-muted);
}

& h3 {
  font-size: 18px;
  font-weight: 400;
  margin: 28px 0 12px;
}

& p,
& li {
  font-size: 16px;
}

& li + li { margin-top: 10px; }

& ul {
  margin-block-start: 0;
  margin-block-end: 0.5em;
  padding-left: 24px;
  text-align: left;
}
`

const MissingResume = styled.p`
font-family: "Work Sans";
color: var(--site-ink);
text-align: center;
`

const ResumePage: React.FC<PageProps<ResumeData>> = ({ data }) => {
  const resume = data.markdownRemark

  return (
    <BgDiv>
      <ContentBox>
        <TitleBar />
        <BodyDiv>
          {resume ? (
            <ResumeBody dangerouslySetInnerHTML={{ __html: resume.html }} />
          ) : (
            <MissingResume>Add resume Markdown at content/resume/resume.md.</MissingResume>
          )}
        </BodyDiv>
      </ContentBox>
    </BgDiv>
  )
}

export default ResumePage

export const query = graphql`
  {
    markdownRemark(frontmatter: { page: { eq: "resume" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export const Head: HeadFC<ResumeData> = ({ data }) => (
  <title>{data.markdownRemark?.frontmatter.title || "Resume"} · Suhas Narreddy</title>
)
