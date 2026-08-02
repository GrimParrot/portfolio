import { Background } from "../decor/Background"

export interface ProblemStatementProps {
  /** @default 'PROBLEM STATEMENT' */
  label?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Centred accent panel holding the framed problem. */
export function ProblemStatement({ label = "PROBLEM STATEMENT", children, style }: ProblemStatementProps) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, background: "var(--pf-surface-accent)", width: "100%", boxSizing: "border-box", ...style }}>
      <Background tone="accent" style={{ transform: "matrix(-1,0,0,-1,1325,1057)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24, padding: "clamp(28px, 6vw, 64px)", alignItems: "center", boxSizing: "border-box" }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-accent)" }}>{label}</span>
        <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: "clamp(18px, 3vw, 22px)", lineHeight: "clamp(28px, 4.5vw, 34px)", color: "var(--pf-text-accent-deep)" }}>{children}</p>
      </div>
    </div>
  )
}
