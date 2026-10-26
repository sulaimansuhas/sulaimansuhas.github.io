import * as React from "react"
import { motion, useAnimationControls, useReducedMotion } from "framer-motion"
import { useLocation } from "@reach/router"

const EXPANSION_PIXELS_PER_SECOND = 800
const RAMP_SECONDS = 0.12

type OpeningBoxProps = {
  children: React.ReactNode
  className?: string
}

function AnimatedBox({ children, className }: OpeningBoxProps) {
  const reducedMotion = useReducedMotion()
  const content = React.useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  React.useEffect(() => {
    if (!content.current) return
    const height = content.current.getBoundingClientRect().height
    if (reducedMotion || height === 0) {
      controls.set({ height: "auto", overflow: "visible" })
      return
    }

    // Start at full speed and decelerate only at the end. Larger boxes get
    // more travel time, not a faster speed.
    const ramp = Math.min(RAMP_SECONDS, height / EXPANSION_PIXELS_PER_SECOND)
    const duration = height / EXPANSION_PIXELS_PER_SECOND + ramp / 2
    const rampDistance = EXPANSION_PIXELS_PER_SECOND * ramp / 2
    void controls.start({
      height: [0, height - rampDistance, height],
      overflow: "hidden",
      transition: {
        duration,
        times: [0, 1 - ramp / duration, 1],
        ease: ["linear", [1 / 3, 2 / 3, 2 / 3, 1]],
      },
      transitionEnd: { height: "auto", overflow: "visible" },
    })
    return () => controls.stop()
  }, [controls, reducedMotion])

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { height: 0 }}
      animate={controls}
      style={{ overflow: "hidden" }}
    >
      <div ref={content}>{children}</div>
    </motion.div>
  )
}

export default function OpeningBox(props: OpeningBoxProps) {
  const { pathname } = useLocation()
  return <AnimatedBox key={pathname} {...props} />
}
