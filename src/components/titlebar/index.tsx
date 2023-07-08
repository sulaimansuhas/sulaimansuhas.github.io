import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import { useLocation } from '@reach/router';

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
font-weight: lighter;
`
const SelectedCaption = styled(motion.p)`
color: #263D42;
font-family: "Work Sans";
font-size: 1.3em;
margin-block-end: 0px;
font-weight: bolder;
`


export default function TitleBar (): JSX.Element | null {
  const location = useLocation();

  console.log(location.pathname); // Current page route
	return(
		<>
			<ContainingDiv>
				<UnstyledLocalLink to="/"><Caption>Home</Caption></UnstyledLocalLink>
				<UnstyledLocalLink to="/aboutme">{location.pathname === "/aboutme/"?<SelectedCaption>About</SelectedCaption> : <Caption>About</Caption>}</UnstyledLocalLink>
				<UnstyledLocalLink to="/resume">{location.pathname === "/resume/"?<SelectedCaption>Resume</SelectedCaption> : <Caption>Resume</Caption>}</UnstyledLocalLink>
				<UnstyledLocalLink to="/contact">{location.pathname === "/contact/"?<SelectedCaption>Contact</SelectedCaption> : <Caption>Contact</Caption>}</UnstyledLocalLink>
			</ContainingDiv>
			</>
		);
}

