import styled from "styled-components"

const PageFrame = styled.main`
  min-height: 100svh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 96px 24px 64px;
  @media (max-width: 480px) {
    padding: 88px 16px 32px;
  }
`
export default PageFrame
