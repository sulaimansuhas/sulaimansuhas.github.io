import * as React from "react"
import styled from "styled-components"
import type { HeadFC, PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import ToolTip from "../components/tooltips";
import UnstyledLink from "../components/UnstyledLink" 
import IconContainment from "../components/icons/icon-container"
import ContentBox from "../components/contentbox/";
import BodyDiv from "../components/BoxBodyDiv/";


import linkedin from "../assets/icons/linkedin.svg"
import github from "../assets/icons/github.svg"
import copy from "../assets/icons/copy_icon.svg"


const BodyDivCentered = styled(BodyDiv)`
align-items:center;
`

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
const ToolTipText = styled.p`
color: #FFFFFF;
font-family: "Work Sans";
text-align: center;
font-size: 10px;
margin-block-start: 0px;
margin-block-end: 0px;
`

const clickToCopyText: string = "Click to copy";

const email: string = "suhasnarreddy@gmail.com";



const ContactPage: React.FC<PageProps> = () => {
	const [CopyTipText,setCopyTipText] = React.useState(clickToCopyText);
	return (
		<BgDiv>
			<ContentBox animate={{ height: "auto" }} transition={{ duration: 1 }}>
				<TitleBar />
				<BodyDivCentered>
					<Copy
					> Find/Contact me at:</Copy>
					<IconTextDiv><UnstyledLink href={"mailto:"+email}><Copy> {email} </Copy></UnstyledLink><ToolTip tip={<ToolTipText>{CopyTipText}</ToolTipText>}><IconContainment><IconNextToText src={copy} onClick={()=>{
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
				</BodyDivCentered>
			</ContentBox>

		</BgDiv>
	)
}

export default ContactPage

export const Head: HeadFC = () => <title>Contact Page</title>
