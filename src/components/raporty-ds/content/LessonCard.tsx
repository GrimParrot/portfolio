export interface LessonCardProps {
  /** Illustration URL, rendered at its natural aspect ratio (full card width). */
  image?: string
  title: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Closing takeaway: illustration, bold Manrope title, body. */
export function LessonCard({ image, title, children, style }: LessonCardProps) {
  return (
    <div style={{ borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 32, display: "flex", flexDirection: "column",
      gap: 32, boxSizing: "border-box", flex: 1, minWidth: 0, ...style }}>
      {image && <img src={image} alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />}
      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{title}</span>
      <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "rgba(0,0,0,0.8)" }}>{children}</p>
    </div>
  )
}
