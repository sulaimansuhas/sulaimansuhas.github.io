import * as React from "react"
import styled from "styled-components"


interface OwnProps {
	children: React.ReactNode,
}


const Container = styled.div`
display:flex;
flex-direction:column;
align-items:center;
width: 72px;
transition: transform 160ms ease-out;

&:hover,
a:focus-visible & {
transform: translateY(-3px);
}

@media (prefers-reduced-motion: reduce) {
transition: none;
&:hover,
a:focus-visible & {
transform: none;
}
}

& img {
height: 48px;
width: 48px;
object-fit: contain;
filter: var(--site-icon-filter);
display: block;
}
`



export default function IconContainer(props: OwnProps): JSX.Element | null{
	return(
		<Container>
			{props.children}
		</Container>
	);
}
