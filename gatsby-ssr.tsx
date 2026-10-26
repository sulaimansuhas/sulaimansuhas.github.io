import * as React from "react"
import type { GatsbySSR } from "gatsby"
export { wrapRootElement } from "./src/components/theme"

// Restore the saved palette before the body paints to avoid a theme flash.
export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: "en" })
  setHeadComponents([
    <meta key="theme-color" name="theme-color" content="#DCE6D5" />,
    <script key="initial-theme" dangerouslySetInnerHTML={{ __html:
      `(function(){var t;try{t=localStorage.getItem('chez-moi-theme');}catch(e){}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==='dark'?'#192A32':'#DCE6D5';})();`
    }} />,
  ])
}
