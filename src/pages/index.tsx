import * as React from "react"
import styled, { createGlobalStyle} from "styled-components"
import { motion } from "framer-motion"
import type { HeadFC, PageProps } from "gatsby"

import IconContainment from "../components/icons/icon-container"
import UnstyledLocalLink from "../components/UnstyledLocalLink" 


import resume from "../assets/icons/description_FILL0_wght400_GRAD0_opsz48.svg"
import about from "../assets/icons/conditions_FILL0_wght400_GRAD0_opsz48.svg"
import contact from "../assets/icons/connect_without_contact_FILL0_wght400_GRAD0_opsz48.svg"


const BgDiv = styled.div`
height: 100%;
width: 100%;
position: fixed;
top:0;
left: 0;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const SmDiv = styled.div`
height: 50%;
width: 50%;
border: 5px solid #263D42;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const IconContainer = styled(motion.div)`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-evenly;
`

const HeaderFont = styled(motion.h1)`
margin-bottom: 0%;
color: #263D42;
font-family: "Work Sans";
`
const GlobalStyle = createGlobalStyle`
  body {
    background: #80CED7;
  }
`;

const Caption = styled(motion.p)`
color: #263D42;
font-family: "Work Sans";
`



const IndexPage: React.FC<PageProps> = () => {
	const [activeMainPageAnimation, activateMainPageAnimation] = React.useState(false);
	console.log(activeMainPageAnimation);
  return (
	  <>
		  <GlobalStyle/>
	  <BgDiv>
		  <SmDiv 
			onMouseEnter={()=> activateMainPageAnimation(true)}
			onMouseLeave={()=> activateMainPageAnimation(false)}
		  >
  <HeaderFont animate = {{y : activeMainPageAnimation ? -100 : 0}}>Suhas Narreddy</HeaderFont>
  <IconContainer 
	  initial = {{ opacity: 0 }}
	  animate = {{ 
		       opacity: activeMainPageAnimation ? 1 : 0
  }}>
       <UnstyledLocalLink to="/aboutme">
	       <IconContainment>
		       <img src={about} alt="this is about icon" />
		       <Caption > about </Caption>
	       </IconContainment>
	  </UnstyledLocalLink>
	<UnstyledLocalLink>
	       <IconContainment>
		       <img src={resume} alt="this is resume icon" />
		       <Caption > resume </Caption>
	       </IconContainment>
       </UnstyledLocalLink>
	<UnstyledLocalLink to="/contact">
	       <IconContainment>
		       <img src={contact} alt="this is contact icon" />
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

export const Head: HeadFC = () => <title>Home Page</title>
