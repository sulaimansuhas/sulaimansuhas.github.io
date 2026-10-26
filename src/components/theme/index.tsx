import * as React from "react"
import type { GatsbyBrowser } from "gatsby"
import "./theme.css"

const storageKey = "chez-moi-theme"
type Theme = "light" | "dark"

const sunPixels = [
  "0000000000000000",
  "0000000110000000",
  "0000000110000000",
  "0001000000001000",
  "0000100000010000",
  "0000001111000000",
  "0000011111100000",
  "0110011111100110",
  "0110011111100110",
  "0000011111100000",
  "0000001111000000",
  "0000100000010000",
  "0001000000001000",
  "0000000110000000",
  "0000000110000000",
  "0000000000000000",
]

const moonPixels = [
  "0000000000000000",
  "0000001111000000",
  "0000111110000000",
  "0001111100000000",
  "0011111000000000",
  "0011111000000000",
  "0111110000000000",
  "0111110000000000",
  "0111111000000000",
  "0111111000000100",
  "0011111100001100",
  "0011111111111100",
  "0001111111111000",
  "0000111111110000",
  "0000001111000000",
  "0000000000000000",
]

function ThemeControl({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState<Theme | null>(null)

  React.useEffect(() => {
    if (!theme) return
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    if (meta) meta.content = theme === "dark" ? "#192A32" : "#DCE6D5"
  }, [theme])

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const sync = () => {
      let saved: string | null = null
      try { saved = localStorage.getItem(storageKey) } catch { /* Storage is optional. */ }
      const next = saved === "light" || saved === "dark" ? saved : media.matches ? "dark" : "light"
      document.documentElement.dataset.theme = next
      setTheme(next)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === storageKey || event.key === null) sync()
    }
    sync()
    media.addEventListener("change", sync)
    window.addEventListener("storage", onStorage)
    return () => {
      media.removeEventListener("change", sync)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  const toggle = () => {
    document.documentElement.dataset.themeReady = "true"
    const next = theme === "dark" ? "light" : "dark"
    document.documentElement.dataset.theme = next
    setTheme(next)
    try { localStorage.setItem(storageKey, next) } catch { /* Keep the in-memory choice. */ }
  }

  return <>
    {children}
    <button className="theme-toggle" type="button" onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      style={{ visibility: theme ? "visible" : "hidden" }}>
      <svg width="32" height="32" viewBox="0 0 16 16" fill="currentColor"
        shapeRendering="crispEdges" aria-hidden="true" focusable="false">
        {(theme === "dark" ? moonPixels : sunPixels).flatMap((row, y) =>
          [...row].map((pixel, x) => pixel === "1"
            ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
            : null)
        )}
      </svg>
    </button>
  </>
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => (
  <ThemeControl>{element}</ThemeControl>
)
