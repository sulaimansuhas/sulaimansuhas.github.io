import * as React from "react"
import styled, { createGlobalStyle} from "styled-components"
import { motion } from "framer-motion"
import type { HeadFC, PageProps } from "gatsby"

import IconContainment from "../components/icons/icon-container"
import PixelIcon from "../components/icons/pixel-icon"
import OpeningBox from "../components/opening-box"
import UnstyledLocalLink from "../components/UnstyledLocalLink" 




const BgDiv = styled.main`
min-height: 100svh;
display: flex;
align-items: center;
justify-content: center;
padding: 100px 24px 64px;
`
const SmDiv = styled(OpeningBox)`
width: 100%;
max-width: 760px;
border: 1px solid var(--site-muted);
text-align: center;
& > div {
  padding: clamp(40px, 8vw, 80px) clamp(20px, 5vw, 56px);
}
`
const IconContainer = styled(motion.nav)`
display: grid;
grid-template-columns: repeat(4, 1fr);
gap: 24px;
max-width: 440px;
margin: 0 auto;
justify-items: center;
@media (max-width: 420px) {
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}
& a { padding: 8px; border-radius: 8px; }
`
const HeaderFont = styled(motion.h1)`
margin: 0 0 20px;
color: var(--site-ink);
font-family: "Work Sans", sans-serif;
font-size: clamp(32px, 5vw, 48px);
font-weight: 400;
letter-spacing: -0.04em;
line-height: 1.15;
`
const Introduction = styled.p`
max-width: 410px;
margin: 0 auto 40px;
color: var(--site-muted);
font-family: "Work Sans", sans-serif;
font-size: 18px;
line-height: 1.65;
`
const GlobalStyle = createGlobalStyle`
  body {
    background: var(--site-bg);
  }
`;

const Caption = styled(motion.p)`
color: var(--site-ink);
font-family: "Work Sans";
margin: 8px 0 0;
text-align: center;
`



const IndexPage: React.FC<PageProps> = () => {
  return (
	  <>
		  <GlobalStyle/>
	  <BgDiv>
		  <SmDiv>
  <HeaderFont>Suhas Narreddy</HeaderFont>
  <Introduction>Software developer exploring networking and storage.</Introduction>
  <IconContainer aria-label="Main navigation"
	  initial = {{ opacity: 1 }}
	  animate = {{ opacity: 1 }}>
       <UnstyledLocalLink to="/aboutme">
	       <IconContainment>
		       <PixelIcon name="about" />
		       <Caption > about </Caption>
	       </IconContainment>
	  </UnstyledLocalLink>
	<UnstyledLocalLink to="/resume">
	       <IconContainment>
		       <PixelIcon name="resume" />
		       <Caption > resume </Caption>
	       </IconContainment>
       </UnstyledLocalLink>
	<UnstyledLocalLink to="/blog">
	       <IconContainment>
		       <PixelIcon name="blog" />
		       <Caption > blog </Caption>
	       </IconContainment>
	</UnstyledLocalLink>
	<UnstyledLocalLink to="/contact">
	       <IconContainment>
		       <PixelIcon name="contact" />
		       <Caption > contact </Caption>
	       </IconContainment>
	</UnstyledLocalLink>
  </IconContainer>
</SmDiv>

	  </BgDiv>
</>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>Suhas Narreddy</title>
