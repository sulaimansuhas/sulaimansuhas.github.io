import BgDiv from "../components/page-frame"
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import styled from "styled-components"

import BodyDiv from "../components/BoxBodyDiv"
import ContentBox from "../components/contentbox"
import TitleBar from "../components/titlebar"

// Shape of resume.json, produced by the resume-repo build for its main recipe.
type DateValue = string | number
type Job = { id: string; role: string; org: string; location: string; start: DateValue; end?: DateValue; bullets: string[] }
type Degree = { id: string; institution: string; location: string; degree: string; start: DateValue; end?: DateValue; thesis?: string; bullets: string[] }
type Project = { id: string; name: string; tech: string[]; start: DateValue; end?: DateValue; bullets: string[] }
type OpenSource = { id: string; text: string }
type Publication = { id: string; title: string; authors: string; venue: string; date: DateValue; award?: string; url?: string }
type SkillGroup = { id: string; group: string; items: string[] }
type Extra = { id: string; title: string; text: string }

type Resume = {
  name: string
  email: string
  links: Array<{ label: string; url: string }>
  sections: string[]
  experience?: Job[]
  education?: Degree[]
  projects?: Project[]
  publications?: Publication[]
  open_source?: OpenSource[]
  skills?: SkillGroup[]
  extracurriculars?: Extra[]
}

type ResumeContext = { resume: Resume | null }

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const fmtDate = (d: DateValue): string => {
  const s = String(d)
  const m = /^(\d{4})-(\d{2})$/.exec(s)
  return m ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : s
}

const dates = (item: { start: DateValue; end?: DateValue }): string =>
  item.end === undefined || item.end === null ? fmtDate(item.start) : `${fmtDate(item.start)} – ${fmtDate(item.end)}`

const Toolbar = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: space-between;
gap: 12px 24px;
width: 100%;
margin-bottom: 28px;
font-family: "Work Sans";
color: var(--site-ink);
`

const PageTitle = styled.h1`
font-size: 36px;
font-weight: 400;
margin: 0;
`

const PdfLink = styled.a`
display: inline-flex;
align-items: center;
gap: 8px;
padding: 10px 18px;
border: 1px solid var(--site-ink);
text-decoration: none;
font-size: 15px;
transition: background 160ms ease-out, color 160ms ease-out;

&:hover,
&:focus-visible {
  background: var(--site-ink);
  color: var(--site-bg);
}
`

const Article = styled.article`
width: 100%;
font-family: "Work Sans";
color: var(--site-ink);
line-height: 1.7;
text-align: left;

& h2 {
  font-size: 24px;
  font-weight: 400;
  margin: 36px 0 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--site-muted);
}

& h3 {
  font-size: 18px;
  font-weight: 400;
  margin: 22px 0 4px;
}

& p { margin: 0; font-size: 16px; }
& .meta { color: var(--site-muted); font-size: 15px; }
& ul { margin: 8px 0 0; padding-left: 22px; }
& li { font-size: 16px; }
& li + li { margin-top: 6px; }
`

// Printing the page gives a clean copy of the text version: no navigation,
// no button, no theme colours.
const PrintRoot = styled.div`
display: contents;

@media print {
  & nav,
  & [data-no-print] {
    display: none !important;
  }

  & ${Article} {
    color: #000;
    line-height: 1.4;
  }
  & ${Article} h2 { font-size: 15pt; margin: 14pt 0 6pt; border-color: #000; page-break-after: avoid; }
  & ${Article} h3 { font-size: 12pt; margin: 10pt 0 2pt; page-break-after: avoid; }
  & ${Article} p, & ${Article} li { font-size: 10.5pt; }
  & ${Article} .meta { color: #333; }
  & ${Article} li + li { margin-top: 2pt; }
  & ${Article} section { page-break-inside: avoid; }
}
`

const Unavailable = styled.p`
font-family: "Work Sans";
color: var(--site-ink);
text-align: center;
`

const Bullets: React.FC<{ items: string[] }> = ({ items }) =>
  items.length ? <ul>{items.map((b, i) => <li key={i}>{b}</li>)}</ul> : null

const renderSection = (name: string, r: Resume): React.ReactNode => {
  switch (name) {
    case "experience":
      return (
        <section key={name}>
          <h2>Experience</h2>
          {r.experience?.map(j => (
            <div key={j.id}>
              <h3>{j.role}</h3>
              <p className="meta">{j.org} · {j.location} · {dates(j)}</p>
              <Bullets items={j.bullets} />
            </div>
          ))}
        </section>
      )
    case "education":
      return (
        <section key={name}>
          <h2>Education</h2>
          {r.education?.map(e => (
            <div key={e.id}>
              <h3>{e.degree}</h3>
              <p className="meta">{e.institution} · {e.location} · {dates(e)}</p>
              {e.thesis && <p>{e.thesis}</p>}
              <Bullets items={e.bullets} />
            </div>
          ))}
        </section>
      )
    case "projects":
      return (
        <section key={name}>
          <h2>Projects</h2>
          {r.projects?.map(p => (
            <div key={p.id}>
              <h3>{p.name}</h3>
              <p className="meta">{p.tech.join(", ")} · {dates(p)}</p>
              <Bullets items={p.bullets} />
            </div>
          ))}
        </section>
      )
    case "publications":
      return r.publications?.length ? (
        <section key={name}>
          <h2>Publications</h2>
          {r.publications.map(p => (
            <div key={p.id}>
              <h3>{p.title}</h3>
              <p className="meta">{p.authors}. {p.venue}, {fmtDate(p.date)}.</p>
              {p.award && <p>{p.url ? <a href={p.url}>{p.award}</a> : p.award}</p>}
            </div>
          ))}
        </section>
      ) : null
    case "open_source":
      return r.open_source?.length ? (
        <section key={name}>
          <h2>Open Source Contributions</h2>
          <Bullets items={r.open_source.map(o => o.text)} />
        </section>
      ) : null
    case "skills":
      return (
        <section key={name}>
          <h2>Technical Skills</h2>
          <ul>
            {r.skills?.map(s => (
              <li key={s.id}><strong>{s.group}:</strong> {s.items.join(", ")}</li>
            ))}
          </ul>
        </section>
      )
    case "extracurriculars":
      return r.extracurriculars?.length ? (
        <section key={name}>
          <h2>Extra-curriculars</h2>
          <ul>
            {r.extracurriculars.map(x => (
              <li key={x.id}><strong>{x.title}:</strong> {x.text}</li>
            ))}
          </ul>
        </section>
      ) : null
    default:
      return null
  }
}

const ResumePage: React.FC<PageProps<object, ResumeContext>> = ({ pageContext }) => {
  const resume = pageContext.resume

  return (
    <BgDiv>
      <ContentBox>
        <PrintRoot>
        <TitleBar />
        <BodyDiv>
          {resume ? (
            <>
              <Toolbar>
                <PageTitle>Resume</PageTitle>
                <PdfLink href="/resume.pdf" target="_blank" rel="noopener noreferrer" data-no-print>
                  Open PDF
                </PdfLink>
              </Toolbar>
              <Article>
                {resume.sections.map(s => renderSection(s, resume))}
              </Article>
            </>
          ) : (
            <Unavailable>The resume is not available right now.</Unavailable>
          )}
        </BodyDiv>
        </PrintRoot>
      </ContentBox>
    </BgDiv>
  )
}

export default ResumePage

export const Head: HeadFC = () => <title>Resume · Suhas Narreddy</title>
