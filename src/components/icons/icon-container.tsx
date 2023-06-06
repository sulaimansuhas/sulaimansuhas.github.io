import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"


interface OwnProps {
	src : string,
	title: string,
}


const Container = styled(motion.div)`
display:flex;
flex-direction:column;
`
const Caption = styled(motion.p)`
color: #263D42;
font-family: "Work Sans";
`



export default function IconContainer(props: OwnProps): JSX.Element | null{
	const {src, title} = props;
	return(
		<Container
			  whileHover={{
    scale: 1.2,
			  }}

		>
	               <img src={src} alt="this is about icon" />
		       <Caption > {title} </Caption>
		</Container>
	);
}


