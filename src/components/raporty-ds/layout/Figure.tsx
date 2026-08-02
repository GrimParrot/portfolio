export interface FigureProps {
  src: string
  alt?: string
  /** Manrope 16/24, muted grey. */
  caption?: string
  /** @default 0 — process artefacts sit square-edged in the source. */
  radius?: number
  style?: React.CSSProperties
}

/** Full-bleed-within-column artefact image with an optional caption. Always
 * renders at the image's natural aspect ratio (width: 100%, height: auto) —
 * never cropped. */
export function Figure({ src, alt = "", caption, radius = 0, style }: FigureProps) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16, width: "100%", ...style }}>
      <img src={src} alt={alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: radius }} />
      {caption && <figcaption style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-text-muted)" }}>{caption}</figcaption>}
    </figure>
  )
}
