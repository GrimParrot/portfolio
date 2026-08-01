export interface FigureProps {
  src: string
  alt?: string
  /** Manrope 16/24, muted grey. */
  caption?: string
  height?: number | string
  /** @default 0 — process artefacts sit square-edged in the source. */
  radius?: number
  style?: React.CSSProperties
}

/** Full-bleed-within-column artefact image with an optional caption. */
export function Figure({ src, alt = "", caption, height, radius = 0, style }: FigureProps) {
  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16, width: "100%", ...style }}>
      <div style={{ width: "100%", height, borderRadius: radius, overflow: "hidden",
        background: `url(${src}) center / cover no-repeat` }} role="img" aria-label={alt} />
      {caption && <figcaption style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-text-muted)" }}>{caption}</figcaption>}
    </figure>
  )
}
