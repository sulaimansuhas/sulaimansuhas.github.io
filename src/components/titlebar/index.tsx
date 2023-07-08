import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"

import  UnstyledLocalLink  from "../UnstyledLocalLink"

const ContainingDiv = styled(motion.div)`
width:100%;
height: auto;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: flex-start;
`
const Caption = styled(motion.p)`
color: #263D42;
font-family: "Work Sans";
font-size: 1.3em;
margin-block-end: 0px;
`

export default function TitleBar (): JSX.Element | null {
	return(
		<>
			<ContainingDiv>
				<UnstyledLocalLink to="/"><Caption>Home</Caption></UnstyledLocalLink>
				<UnstyledLocalLink to="/aboutme"><Caption>About</Caption></UnstyledLocalLink>
				<UnstyledLocalLink to="/resume"><Caption>Resume</Caption></UnstyledLocalLink>
				<UnstyledLocalLink to="/contact"><Caption>Contact</Caption></UnstyledLocalLink>
			</ContainingDiv>
			</>
		);
}

