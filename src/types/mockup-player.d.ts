import "react"

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "mockup-player": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        "mockup-id"?: string
        "aspect-ratio"?: string
        trigger?: string
        "trigger-loop"?: string
        "cursor-affect-page"?: string
        "cursor-range"?: string
        "camera-zoom"?: string
      }
    }
  }
}
