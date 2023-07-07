import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import styled from "styled-components"
import { motion } from "framer-motion"

import TitleBar from "../components/titlebar/index"
import ToolTip from "../components/tooltips";

import typescript from "../assets/icons/typescript.svg"
import stripe from "../assets/icons/stripe.png"
import vim from "../assets/icons/vim.png"
import docker from "../assets/icons/docker-svgrepo-com.svg"
import kubernetes from "../assets/icons/kubernetes-svgrepo-com.svg"
import java from "../assets/icons/java-svgrepo-com.svg"
import python from "../assets/icons/python-svgrepo-com.svg"
import react from "../assets/icons/react-svgrepo-com.svg"
import spring from "../assets/icons/spring-svgrepo-com.svg"

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
overflow: scroll;
`

const BodyContainer = styled.div`
width: 90%;
display: flex;
flex-direction:column;
justify-content: flex-start;
align-items: center;
flex-grow:1;
`
const HeaderCopy = styled.p`
color: #263D42;
font-family: "Work Sans";
text-align: start;
font-size: 20px;
margin-block-start:1em;
margin-block-end:.5em;
`

const HeaderDiv = styled.div`
display:flex;
width: 100%;
flex-direction:row;
justify-content: flex-start;
`
const SubHeaderCopy = styled.p`
color: #263D42;
font-family: "Work Sans";
text-align: start;
font-size: 16px;
margin-block-start:0em;
margin-block-end:.5em;
`

const SubHeaderDiv = styled.div`
display:flex;
width: 100%;
flex-direction:row;
justify-content: flex-start;
`
const TextCopy = styled.p`
color: #263D42;
font-family: "Work Sans";
text-align: start;
font-size: 12px;
margin-block-start:0em;
margin-block-end:.5em;
`

const TextDiv = styled.div`
display:flex;
width: 100%;
flex-direction:row;
justify-content: flex-start;
`

const CustomList = styled.ul`
margin-block-start:0em;
margin-block-end:.5em;
color: #263D42;
text-align:left;

& > li {
}
`

const ToolTipIcon = styled.img`
height:16px;
width:16px;
`

const ResumePage: React.FC<PageProps> = () => {
	return (
		<BgDiv>
			<SmDiv animate={{ height: "auto" }} transition={{ duration: 1 }}>
				<TitleBar />
				<BodyContainer>
                                  <HeaderDiv><HeaderCopy>Work - </HeaderCopy></HeaderDiv>
                                  <SubHeaderDiv><SubHeaderCopy>CALA Fashion</SubHeaderCopy></SubHeaderDiv>
                                    <CustomList>
                                      <li><TextCopy>Worked extensively in <ToolTip tip={<ToolTipIcon src={typescript}/>}>TypeScript</ToolTip> touching most parts of the front and back-end pushing out 30+ tickets to production along with implementing rigorous unit and integration tests.</TextCopy></li>
                                      <li><TextCopy>Implemented <ToolTip tip={<ToolTipIcon src={vim}/>}>Vim</ToolTip>-style Keyboard shortcut 'melodies' enhancing user-experience</TextCopy></li>
                                      <li><TextCopy>Implemented <ToolTip tip={<ToolTipIcon src={stripe}/>}>Stripe</ToolTip> Webhooks to improve subscription management</TextCopy></li>
                                      <li><TextCopy>Took product ownership for automatically generating product barcodes within the Web App. I was involved with everything from initial product management to the finally deployment to production. </TextCopy></li>
                                    </CustomList>
                                  <SubHeaderDiv><SubHeaderCopy>JP Morgan and Chase</SubHeaderCopy></SubHeaderDiv>
                                    <CustomList>
                                      <li><TextCopy>Migrated an Enterprise Finance (<ToolTip tip ={<ToolTipIcon src={spring}/>}>Spring </ToolTip>Boot) Application from the Corporate Investment Bank
                                      onto JP Morgans internally hosted cloud using <ToolTip tip ={<ToolTipIcon src={docker}/>}>Docker</ToolTip> and <ToolTip tip ={<ToolTipIcon src={kubernetes}/>}>Kubernetes</ToolTip></TextCopy></li>
                                      <li><TextCopy>Tracked and Managed the docker build on the cloud with Skaffold and Kaniko</TextCopy></li>
                                      <li><TextCopy>Wrote extensive documentation to support future migration to the cloud in the whole middle-office division</TextCopy></li>
                                    </CustomList>
                                  <HeaderDiv><HeaderCopy>Education - </HeaderCopy></HeaderDiv>
                                  <SubHeaderDiv><SubHeaderCopy>University of Edinburgh: MRes Computer Science, 2023-2024</SubHeaderCopy></SubHeaderDiv>
                                  <CustomList>
                                  <li><TextCopy>Working on implementing the Homa protocol over NVMe/TCP with Michio Honda in the ICSA department </TextCopy></li>
                                  </CustomList>
                                  <SubHeaderDiv><SubHeaderCopy>University of Edinburgh: BSc AI & CS, 2018-2022</SubHeaderCopy></SubHeaderDiv>
                                  <CustomList>
                                  <li><TextCopy>Dissertation: Extensive evaluation of state-of-the-art networking stacks, supervised by Michio Honda</TextCopy></li>
                                  </CustomList>
                                  <HeaderDiv><HeaderCopy>Projects - </HeaderCopy></HeaderDiv>
                                  <SubHeaderDiv><SubHeaderCopy>Re-Search - An Academic Search Engine | <ToolTip tip ={<ToolTipIcon src={react}/>}>React</ToolTip>, <ToolTip tip ={<ToolTipIcon src={python}/>}>Python</ToolTip></SubHeaderCopy></SubHeaderDiv>
                                  <CustomList>
                                  <li><TextCopy> A class-prize winning (awarded to the top 3 out of 50+ groups)  project for the University of Edinburghs TTDS course. I took on the role of front and back-end lead, single handedly writing most of the front end and planning the architecture of the backend with the team lead.</TextCopy></li>
                                  </CustomList>
                                  <SubHeaderDiv><SubHeaderCopy>Air Pollution Tracker | <ToolTip tip ={<ToolTipIcon src={java}/>}>Java</ToolTip></SubHeaderCopy></SubHeaderDiv>
                                  <CustomList>
                                  <li><TextCopy>For the University of Edinburgh's ILP course I created a drone navigation program for traversing a defined area, collecting data from air sensors. The program utilizes Java Geometry Packages to abstract the route and generates a GeoJson file to visualize the drone's path. Extensive documentation accompanies the code for clarity and ease of future maintenance.</TextCopy></li>
                                  </CustomList>
				</BodyContainer>
			</SmDiv>
		</BgDiv>
	)
}

export default ResumePage 

export const Head: HeadFC = () => <title>Resume Page</title>
