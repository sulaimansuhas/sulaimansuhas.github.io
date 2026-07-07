import styled from "styled-components"
import { motion } from "framer-motion"

const ContentBox = styled(motion.div)`
height: 0%;
width: 50%;
border: 5px solid #263D42;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
overflow: hidden;
`

export default ContentBox
