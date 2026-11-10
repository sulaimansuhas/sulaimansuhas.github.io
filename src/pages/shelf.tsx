import * as React from "react"
import { type HeadFC } from "gatsby"
import styled from "styled-components"
import PageFrame from "../components/page-frame"
import ContentBox from "../components/contentbox"
import BodyDiv from "../components/BoxBodyDiv"
import TitleBar from "../components/titlebar"
import entries from "../data/shelf"

const ShelfBody = styled(BodyDiv)`
  font-family: "Work Sans", sans-serif;
  color: var(--site-ink);
`
const ShelfHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--site-muted);
  h1 { font-size: 20px; font-weight: 400; letter-spacing: -0.03em; margin: 0; }
`
const Filters = styled.div`
  display: flex;
  gap: 20px;
  button {
    color: var(--site-muted); font: 13px "Work Sans", sans-serif; background: transparent;
    border: 0; border-bottom: 2px solid transparent; padding: 14px 0;
    cursor: pointer; min-height: 44px;
  }
  button[aria-pressed="true"] { color: var(--site-ink); border-bottom-color: var(--site-ink); }
  button:focus-visible { outline: 2px solid var(--site-ink); outline-offset: 4px; }
`
const Collection = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 24px 16px;
  align-items: start;
  list-style: none; padding: 0; margin: 0;
  @media (max-width: 420px) { grid-template-columns: repeat(2, minmax(0, 1fr)); }
`
const Item = styled.li`
  min-width: 0;
  button {
    position: relative; display: block; width: 100%; aspect-ratio: 2 / 3;
    padding: 0; border: 0; border-radius: 8px; overflow: hidden;
    background: var(--site-surface); color: var(--site-ink);
    font: inherit; text-align: left; cursor: pointer;
  }
  button:focus-visible { outline: 2px solid var(--site-ink); outline-offset: 5px; }
  img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .overlay {
    position: absolute; inset: 0; padding: 12px;
    display: flex; flex-direction: column; justify-content: flex-end;
    background: rgba(15, 25, 30, 0.88); color: #f1f5f2;
    opacity: 0; transition: opacity 160ms ease-out;
  }
  @media (hover: hover) { button:hover .overlay { opacity: 1; } }
  button:focus-visible .overlay, button[aria-expanded="true"] .overlay { opacity: 1; }
  .title { font-size: 13px; line-height: 1.4; }
  .meta, .rating { font-size: 11px; line-height: 1.5; margin-top: 6px; }
  .meta { color: #c5d3d3; }
  .notes { white-space: pre-wrap; font-size: 12px; line-height: 1.6; }
  @media (prefers-reduced-motion: reduce) { .overlay { transition: none; } }

`

export default function ShelfPage() {
  const [kind, setKind] = React.useState("book")
  const [selected, setSelected] = React.useState<string | null>(null)
  const items = entries.filter(entry => entry.kind === kind)
  return <PageFrame><ContentBox><TitleBar /><ShelfBody>
    <ShelfHeader>
      <h1>Shelf</h1>
      <Filters role="group" aria-label="Shelf collection">
        <button type="button" aria-pressed={kind === "book"} onClick={() => setKind("book")}>Books</button>
        <button type="button" aria-pressed={kind === "film"} onClick={() => setKind("film")}>Films</button>
      </Filters>
    </ShelfHeader>
    <Collection aria-label={kind === "book" ? "Books" : "Films"}>
      {items.map(item => <Item key={`${item.kind}-${item.title}`}>
        <button type="button" aria-label={item.title}
          aria-expanded={selected === item.title}
          onClick={() => setSelected(selected === item.title ? null : item.title)}>
          {item.image && <img src={item.image} alt="" width={180} height={270} />}
          <span className="overlay">
            <span className="title">{item.title}</span>
            <span className="meta">{[item.creator, item.year].filter(Boolean).join(" · ")}</span>
            {item.status && <span className="meta">{item.status}</span>}
            {item.rating && <span className="rating" aria-label={`Rated ${item.rating}`}><span aria-hidden="true">★ </span>{item.rating}</span>}
          </span>
        </button>
        {selected === item.title && item.notes && <p className="notes">{item.notes}</p>}
      </Item>)}
    </Collection>
    {!items.length && <p>Nothing on this shelf yet.</p>}
  </ShelfBody></ContentBox></PageFrame>
}

export const Head: HeadFC = () => <>
  <title>The shelf · Suhas Narreddy</title>
  <meta name="robots" content="noindex" />
</>
