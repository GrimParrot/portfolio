import { Background } from "../decor/Background"

export interface ProblemStatementProps {
  /** @default 'PROBLEM STATEMENT' */
  label?: string
  /** Accent keeps the panel in the blue field; dark drops it onto the near-black
   *  wave sheet the other dark panels use. @default 'accent' */
  tone?: "accent" | "dark"
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Centred panel holding the framed problem. */
export function ProblemStatement({ label = "PROBLEM STATEMENT", tone = "accent", children, style }: ProblemStatementProps) {
  const dark = tone === "dark"
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, width: "100%", boxSizing: "border-box",
      // The dark variant carries its own texture, so the circle field behind it
      // would only muddy the waves — it is skipped rather than restyled.
      background: dark ? "var(--pf-primary-700) url(/raporty-ds-bg-panel-2.webp) center / cover no-repeat" : "var(--pf-surface-accent)", ...style }}>
      {!dark && <Background tone="accent" style={{ transform: "matrix(-1,0,0,-1,1325,1057)" }} />}
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 24, padding: "clamp(28px, 6vw, 64px)", alignItems: "center", boxSizing: "border-box" }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: dark ? "var(--pf-text-on-dark-muted)" : "var(--pf-text-accent)" }}>{label}</span>
        <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: "clamp(18px, 3vw, 22px)", lineHeight: "clamp(28px, 4.5vw, 34px)", color: dark ? "var(--pf-text-on-dark-body)" : "var(--pf-text-accent-deep)" }}>{children}</p>
      </div>
    </div>
  )
}
