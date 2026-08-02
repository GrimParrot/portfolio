export interface FindingCardProps {
  /** Two-digit ordinal, drawn at 30% opacity behind the title. */
  number: string
  title: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Research finding on near-black, with a ghosted ordinal behind the title. */
export function FindingCard({ number, title, children, style }: FindingCardProps) {
  return (
    <div style={{ borderRadius: 24, background: "var(--pf-surface-dark-card)", boxShadow: "var(--pf-ring-dark)",
      padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box", flex: 1, minWidth: 0, ...style }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <span style={{ opacity: 0.3, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: 80, lineHeight: "108px",
          letterSpacing: "0.02em", color: "var(--pf-primary-700)" }}>{number}</span>
        <span style={{ position: "relative", zIndex: 1, width: "100%", marginTop: -50, fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px",
          color: "var(--pf-text-on-dark)" }}>{title}</span>
      </div>
      <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px",
        color: "var(--pf-text-on-dark-muted)" }}>{children}</p>
    </div>
  )
}
