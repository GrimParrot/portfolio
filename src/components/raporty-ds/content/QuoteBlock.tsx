export interface QuoteBlockProps {
  children?: React.ReactNode
  /** Who said it. Manrope 18/30, grey. */
  attribution?: string
  /** 'lg' = 48/72 SemiBold, 'md' = 36/48 Regular. @default 'lg' */
  size?: "lg" | "md"
  style?: React.CSSProperties
}

/** Pull quote at H3 scale with a quiet attribution line. */
export function QuoteBlock({ children, attribution, size = "lg", style }: QuoteBlockProps) {
  const lg = size === "lg"
  return (
    <blockquote style={{ margin: 0, display: "flex", flexDirection: "column", gap: 16, ...style }}>
      <p style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: lg ? 600 : 400,
        fontSize: lg ? "clamp(28px, 5vw, 48px)" : "clamp(22px, 4vw, 36px)", lineHeight: lg ? "clamp(36px, 6vw, 72px)" : "clamp(30px, 5vw, 48px)", letterSpacing: "-0.01em", color: "var(--pf-text-primary)" }}>{children}</p>
      {attribution && <cite style={{ fontStyle: "normal", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{attribution}</cite>}
    </blockquote>
  )
}
