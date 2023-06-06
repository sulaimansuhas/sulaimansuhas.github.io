import * as React from "react"
import styled from "styled-components"



const TextSpan = styled.span`
`
const FloatingTip = styled.span`
z-index: 1;
border-radius: 6px;
background-color: rgba(0,0,0,0.75);
text-align: center;
padding: 5px 5px;
position: absolute;
top: 110%;
left: 50%;
transform: translateX(-50%);
opacity:0;
visibility:hidden;
transition: opacity .3s ease;


${TextSpan}:hover + &{
opacity:1;
visibility: visible;
transition: opacity .3s ease;
}


&:after{
 content: "";
 position: absolute;
 top: -30%;
 left: 30%;
 border-width: 5px;
  border-style: solid;
  border-color:transparent transparent rgba(0,0,0,0.75) transparent;
  }
`
const ParentSpan = styled.span`
position:relative;
`

interface OwnProps {
	tip : String;
	children : React.ReactNode; 
}

export default function ToolTip(props: OwnProps): JSX.Element | null{
	const {children, tip} = props;



	return(
		<ParentSpan>
			<TextSpan>{children}</TextSpan>
		<FloatingTip>{tip}</FloatingTip>
		</ParentSpan>
	);
}
