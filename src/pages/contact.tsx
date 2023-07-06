import * as React from "react"
import styled, { keyframes } from "styled-components"
import { motion } from "framer-motion"
import type { HeadFC, PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import ToolTip from "../components/tooltips";
import UnstyledLink from "../components/UnstyledLink" 
import IconContainment from "../components/icons/icon-container"


import linkedin from "../assets/icons/linkedin.svg"
import github from "../assets/icons/github.svg"
import copy from "../assets/icons/copy_icon.svg"

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
align-items: center;
flex-grow:1;
`


const Icon = styled.img`
height: 50px;
width: 50px;
margin: 16px;
`

const IconNextToText = styled.img`
height:16px;
width:16px;
margin-left:4px;
`

const IconTextDiv = styled.div`
display:flex;
flex-direction:row;
align-items: center;
`

const clickToCopyText: string = "Click to copy";

const email: string = "suhasnarreddy@gmail.com";



const ContactPage: React.FC<PageProps> = () => {
	const [CopyTipText,setCopyTipText] = React.useState(clickToCopyText);
	return (
		<BgDiv>
			<SmDiv animate={{ height: "30vw" }} transition={{ duration: 1 }}>
				<TitleBar />
				<BodyContainer>
					<Copy
					> Find/Contact me at:</Copy>
					<IconTextDiv><UnstyledLink href={"mailto:"+email}><Copy> {email} </Copy></UnstyledLink><ToolTip tip={CopyTipText}><IconContainment><IconNextToText src={copy} onClick={()=>{
					    setCopyTipText("Copied!");
					    navigator.clipboard.writeText(email);
					}}
					onMouseLeave={()=>{
							setCopyTipText(clickToCopyText);
						}
					}
					/></IconContainment></ToolTip></IconTextDiv>
					<UnstyledLink href="https://www.linkedin.com/in/suhas-narreddy-877702202/"><IconContainment><Icon src={linkedin} alt="this is about icon" /></IconContainment></UnstyledLink>
					<UnstyledLink href="https://github.com/sulaimansuhas"><IconContainment><Icon src={github} alt="this is about icon" /></IconContainment></UnstyledLink>
				</BodyContainer>
			</SmDiv>

		</BgDiv>
	)
}

export default ContactPage

export const Head: HeadFC = () => <title>Contact Page</title>
