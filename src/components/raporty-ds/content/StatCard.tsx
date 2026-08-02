import { Background } from "../decor/Background"

export interface StatCardProps {
  /** Headline figure - "44%", "~20x", "11-13%". */
  value: React.ReactNode
  /** One supporting sentence, Manrope 16/24. */
  label: React.ReactNode
  /** @default 'subtle' — 'dark' renders the 80px hero variant on the circle field. */
  tone?: "subtle" | "white" | "dark"
  style?: React.CSSProperties
  labelStyle?: React.CSSProperties
}

/** Single headline number with a supporting line. */
export function StatCard({ value, label, tone = "subtle", style, labelStyle }: StatCardProps) {
  const dark = tone === "dark"
  const base: React.CSSProperties = {
    position: "relative", overflow: "hidden", borderRadius: 24, padding: dark ? 48 : 32,
    display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start",
    gap: 32, boxSizing: "border-box", flex: 1, minWidth: 0,
  }
  const surface: React.CSSProperties = dark
    ? { background: "var(--pf-primary-700)" }
    : { background: tone === "white" ? "var(--pf-surface-card)" : "var(--pf-surface-card-subtle)", boxShadow: "var(--pf-ring)" }
  return (
    <div style={{ ...base, ...surface, ...style }}>
      {dark && <Background tone="dark" style={{ transform: "matrix(-1,0,0,-1,1521,1057)" }} />}
      <span style={{ position: "relative", fontFamily: "var(--pf-font-display)",
        fontWeight: dark ? 700 : 600, fontSize: dark ? 80 : 48, lineHeight: dark ? "108px" : "72px",
        letterSpacing: "0.02em", color: dark ? "var(--pf-text-on-dark)" : "var(--pf-text-primary)" }}>{value}</span>
      <span style={{ position: "relative", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px",
        color: dark ? "var(--pf-primary-50)" : "var(--pf-text-body)", ...labelStyle }}>{label}</span>
    </div>
  )
}
