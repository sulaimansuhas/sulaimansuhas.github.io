import * as React from "react"
import styled from "styled-components"
import { motion } from "framer-motion"


interface OwnProps {
	children: React.ReactNode,
}


const Container = styled(motion.div)`
display:flex;
flex-direction:column;
`



export default function IconContainer(props: OwnProps): JSX.Element | null{
	return(
		<Container
			  whileHover={{
    scale: 1.2,
			  }}

		>
			{props.children}
		</Container>
	);
}


