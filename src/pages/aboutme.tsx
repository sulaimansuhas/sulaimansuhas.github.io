import * as React from "react"
import styled from "styled-components"
import type { HeadFC, PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import ToolTip from "../components/tooltips";
import ContentBox from "../components/contentbox/";
import BodyDiv from "../components/BoxBodyDiv/";

const BgDiv = styled.div`
height: 100%;
width: 100%;
position: fixed;
top:0;
left: 0;
background-color: #80CED7;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Copy = styled.p`
color: #263D42;
font-family: "Work Sans";
text-align: center;
`
const EmojiStyling = styled.p`
margin-block-start: 0px;
margin-block-end: 0px;
`
const AboutPage: React.FC<PageProps> = () => {
  return (
	  <BgDiv>
		  <ContentBox animate = {{height:"auto"}} transition = {{duration:1}}>
			  <TitleBar/>
			  <BodyDiv>

				  <Copy>Currently in <ToolTip tip={<EmojiStyling>&#x1F3F4;&#xE0067;&#xE0062;&#xE0073;&#xE0063;&#xE0074;&#xE007F;</EmojiStyling>}>Edinburgh, Scotland</ToolTip></Copy>
				  <Copy>
	  I am a full stack developer currently learning about low-latency networking and storage. Any discussions about team planning, optimisation, and management are welcome! </Copy>
			  <Copy> Outside of work you can find me <ToolTip tip={<EmojiStyling>&#x1F94A;</EmojiStyling>}>Kickboxing</ToolTip>, dancing <ToolTip tip={<EmojiStyling>&#x1F483;</EmojiStyling>}>Bachata</ToolTip> & <ToolTip tip={<EmojiStyling>&#x1F483;</EmojiStyling>}>Salsa</ToolTip>.</Copy>

			  </BodyDiv>
		  </ContentBox>

	  </BgDiv>
  )
}

export default AboutPage 

export const Head: HeadFC = () => <title>About Page</title>
