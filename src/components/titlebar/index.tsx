import * as React from "react"
import styled from "styled-components"
import { useLocation } from "@reach/router"
import UnstyledLocalLink from "../UnstyledLocalLink"

const Navigation = styled.nav`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 16px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--site-muted);
  font-family: "Work Sans", sans-serif;
  font-size: 16px;

  & a {
    display: flex;
    align-items: center;
    min-height: 44px;
    padding: 8px 4px;
    color: var(--site-muted);
  }
  & a:hover { color: var(--site-ink); }
  & a[aria-current="page"] {
    color: var(--site-ink);
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 6px;
  }
`

const links = [
  ["/", "Home"],
  ["/aboutme", "About"],
  ["/resume", "Resume"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
]

export default function TitleBar() {
  const { pathname } = useLocation()
  const current = pathname.replace(/\/$/, "") || "/"
  return <Navigation aria-label="Main navigation">
    {links.map(([to, label]) => (
      <UnstyledLocalLink key={to} to={to}
        aria-current={current === to || (to === "/blog" && current.startsWith("/blog/")) ? "page" : undefined}>
        {label}
      </UnstyledLocalLink>
    ))}
  </Navigation>
}
