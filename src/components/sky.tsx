import * as React from "react"
import styled, { keyframes } from "styled-components"

const cloudDrift = keyframes`
  from { transform: translateX(-160px); }
  to { transform: translateX(calc(100vw + 160px)); }
`

const SkyLayer = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  /* Decorative layers never intercept links or extend the page width. */
  &::before, &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 18vh;
    width: 128px;
    height: 48px;
    z-index: 0;
    pointer-events: none;
    background: var(--site-muted);
    opacity: 0.14;
    clip-path: polygon(0 67%, 12.5% 67%, 12.5% 33%, 25% 33%,
      25% 16.67%, 37.5% 16.67%, 37.5% 0, 62.5% 0,
      62.5% 16.67%, 75% 16.67%, 75% 50%, 87.5% 50%,
      87.5% 67%, 100% 67%, 100% 100%, 0 100%);
    transform: translateX(-160px);
    animation: ${cloudDrift} 75s linear 20s infinite;
  }
  &::after {
    top: 76vh;
    width: 96px;
    height: 36px;
    opacity: 0.10;
    animation-duration: 95s;
    animation-delay: 38s;
  }
  @media (prefers-reduced-motion: reduce), print {
    &::before, &::after { display: none; animation: none; }
  }

`

const revealStars = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`
const twinkle = keyframes`
  0%, 100% { opacity: 0.15; }
  50% { opacity: 0.65; }
`
const Stars = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  visibility: var(--night-stars, hidden);
  opacity: 0;
  animation: ${revealStars} 2s ease-out 20s forwards;
  span {
    position: absolute;
    width: 6px;
    height: 6px;
    background: var(--site-ink);
    clip-path: polygon(33.33% 0, 66.67% 0, 66.67% 33.33%,
      100% 33.33%, 100% 66.67%, 66.67% 66.67%, 66.67% 100%,
      33.33% 100%, 33.33% 66.67%, 0 66.67%, 0 33.33%, 33.33% 33.33%);
    animation: ${twinkle} 6s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce), print {
    display: none;
    animation: none;
    span { animation: none; }
  }
`
const starPositions = [
  [9, 13], [28, 9], [53, 17], [77, 11], [91, 28],
  [6, 49], [94, 64], [15, 83], [38, 91], [65, 85], [84, 92],
]

export default function Sky() {
  return <SkyLayer aria-hidden="true">
    <Stars aria-hidden="true">
      {starPositions.map(([left, top], index) => <span key={index} style={{
        left: `${left}%`, top: `${top}%`,
        animationDelay: `${-index * 1.7}s`,
        animationDuration: `${5 + index % 4}s`,
      }} />)}
    </Stars>
  </SkyLayer>
}
