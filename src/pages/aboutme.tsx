import BgDiv from "../components/page-frame"
import * as React from "react"
import styled from "styled-components"
import { Link, type HeadFC, type PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import ContentBox from "../components/contentbox/";
import BodyDiv from "../components/BoxBodyDiv/";


const Copy = styled.p`
font-size: 17px;
line-height: 1.75;
color: var(--site-ink);
font-family: "Work Sans";
text-align: center;
`
const ShelfLink = styled(Link)`
color: var(--site-muted);
font: 14px/1.6 "Work Sans", sans-serif;
text-align: center;
align-self: center;
margin-top: 16px;
text-decoration: none;
&:hover { text-decoration: underline; text-underline-offset: 4px; }
`
const AboutPage: React.FC<PageProps> = () => {
  return (
	  <BgDiv>
		  <ContentBox>
			  <TitleBar/>
			  <BodyDiv>

				  <Copy>Currently in Edinburgh, Scotland</Copy>
				  <Copy>
	  I am a full stack developer currently learning about low-latency networking and storage. Any discussions about team planning, optimisation, and management are welcome! </Copy>
			  <Copy> Outside of work you can find me Kickboxing, dancing Bachata & Salsa.</Copy>

			  <ShelfLink to="/shelf/">A little shelf of books & films.</ShelfLink>
			  </BodyDiv>
		  </ContentBox>

	  </BgDiv>
  )
}

export default AboutPage 

export const Head: HeadFC = () => <title>About · Suhas Narreddy</title>
