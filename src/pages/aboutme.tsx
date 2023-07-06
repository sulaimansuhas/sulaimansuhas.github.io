import * as React from "react"
import styled, {keyframes} from "styled-components"
import { motion } from "framer-motion"
import type { HeadFC, PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import ToolTip from "../components/tooltips";




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
const SmDiv = styled(motion.div)`
height: 0%;
width: 50%;
border: 5px solid #263D42;
display:flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
overflow: hidden;
`
const Copy = styled.p`
color: #263D42;
font-family: "Work Sans";
text-align: center;
`
const BodyContainer = styled.div`
width: 90%;
display: flex;
flex-direction:column;
justify-content: flex-start;
flex-grow:1;
`

const TitleDiv = styled.div`
width: 100%;
`


interface EmptyDivProps {
  readonly height: number;
}

const EmptySpaceDiv = styled.div<EmptyDivProps>`
  height: ${(props  : EmptyDivProps) => props.height}px;
`



const AboutPage: React.FC<PageProps> = () => {
  return (
	  <BgDiv>
		  <SmDiv animate = {{height:"30vw"}} transition = {{duration:1}}>
			  <TitleBar/>
			  <BodyContainer>

				  <Copy>Currently in <ToolTip tip="&#x1F3F4;&#xE0067;&#xE0062;&#xE0073;&#xE0063;&#xE0074;&#xE007F;">Edinburgh, Scotland</ToolTip></Copy>
				  <Copy>
	  I have extensive experience in full stack development and am currently learning about low-latency networking and storage. Any discussions about team planning, optimisation, and management are welcome! </Copy>
			  <Copy> Outside of work you can find <ToolTip tip="&#x1F94A;">kickboxing</ToolTip>, dancing <ToolTip tip="&#x1F483;">bachata & sala</ToolTip>, or <ToolTip tip="&#x1F440;">people watching.</ToolTip> </Copy>
			  <EmptySpaceDiv height={66}/>

			  </BodyContainer>
		  </SmDiv>

	  </BgDiv>
  )
}

export default AboutPage 

export const Head: HeadFC = () => <title>About Page</title>
