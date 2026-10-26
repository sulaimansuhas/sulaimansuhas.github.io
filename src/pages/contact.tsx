import BgDiv from "../components/page-frame"
import * as React from "react"
import styled from "styled-components"
import type { HeadFC, PageProps } from "gatsby"

import TitleBar from "../components/titlebar/index"
import UnstyledLink from "../components/UnstyledLink" 
import linkedin from "../assets/icons/linkedin.svg"
import github from "../assets/icons/github.svg"
import ContentBox from "../components/contentbox/";
import BodyDiv from "../components/BoxBodyDiv/";


import PixelIcon from "../components/icons/pixel-icon"


const BodyDivCentered = styled(BodyDiv)`
align-items:center;
`


const Copy = styled.p`
font-size: 17px;
line-height: 1.75;
color: var(--site-ink);
font-family: "Work Sans";
text-align: center;
`
const SocialLinks = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
gap: 16px 32px;
margin-top: 12px;
`
const SocialLink = styled(UnstyledLink)`
display: inline-flex;
align-items: center;
gap: 10px;
min-height: 44px;
color: var(--site-ink);
font: 16px/1.5 "Work Sans", sans-serif;
& img {
width: 24px;
height: 24px;
object-fit: contain;
filter: var(--site-icon-filter);
}
&:hover .social-label, &:focus-visible .social-label {
text-decoration: underline;
text-underline-offset: 5px;
text-decoration-thickness: 1px;
}
&:focus-visible {
outline: 2px solid var(--site-ink);
outline-offset: 5px;
}
`

const IconTextDiv = styled.div`
display:flex;
flex-direction:row;
align-items: center;
flex-wrap: wrap;
justify-content: center;
`
const CopyButton = styled.button`
width: 44px;
height: 44px;
flex-shrink: 0;
display: inline-flex;
align-items: center;
justify-content: center;
border: 0;
background: transparent;
color: var(--site-ink);
cursor: pointer;
&:hover { opacity: 0.75; }
&:focus-visible { outline: 2px solid var(--site-ink); outline-offset: 3px; }
`
const CopyStatus = styled.p`
min-height: 1.5em;
margin: 0;
font: 14px/1.5 "Work Sans", sans-serif;
color: var(--site-muted);
text-align: center;
`

const email: string = "suhasnarreddy@gmail.com";



const ContactPage: React.FC<PageProps> = () => {
	const [status, setStatus] = React.useState("");
  const [copying, setCopying] = React.useState(false);
  const resetTimer = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => () => clearTimeout(resetTimer.current), []);
  const copyEmail = async () => {
    clearTimeout(resetTimer.current);
    setStatus("");
    setCopying(true);
    try {
      await navigator.clipboard.writeText(email);
      setStatus("Copied!");
      resetTimer.current = setTimeout(() => setStatus(""), 3000);
    } catch {
      setStatus("Couldn’t copy. Select the email address and copy it manually.");
    } finally {
      setCopying(false);
    }
  };
	return (
		<BgDiv>
			<ContentBox>
				<TitleBar />
				<BodyDivCentered>
					<Copy
					> Find/Contact me at:</Copy>
					<IconTextDiv>
            <UnstyledLink href={"mailto:" + email}><Copy>{email}</Copy></UnstyledLink>
            <CopyButton type="button" aria-label="Copy email address" onClick={copyEmail} disabled={copying}>
              <PixelIcon name="copy" size={32} />
            </CopyButton>
          </IconTextDiv>
          <CopyStatus role="status" aria-live="polite" aria-atomic="true">{status}</CopyStatus>
          <SocialLinks>
            <SocialLink href="https://github.com/sulaimansuhas">
              <img src={github} alt="" width={24} height={24} />
              <span className="social-label">GitHub</span>
            </SocialLink>
            <SocialLink href="https://www.linkedin.com/in/suhas-narreddy-877702202/">
              <img src={linkedin} alt="" width={24} height={24} />
              <span className="social-label">LinkedIn</span>
            </SocialLink>
          </SocialLinks>
				</BodyDivCentered>
			</ContentBox>

		</BgDiv>
	)
}

export default ContactPage

export const Head: HeadFC = () => <title>Contact · Suhas Narreddy</title>
