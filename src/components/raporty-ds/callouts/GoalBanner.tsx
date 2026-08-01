export interface GoalBannerProps {
  /** @default 'GOAL' */
  label?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Full-bleed accent band stating the agreed project goal. */
export function GoalBanner({ label = "GOAL", children, style }: GoalBannerProps) {
  return (
    <div style={{ width: "100%", background: "var(--pf-surface-accent)", display: "flex", justifyContent: "center", ...style }}>
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: "column", gap: 24, padding: 48, alignItems: "center", boxSizing: "border-box" }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-accent)" }}>{label}</span>
        <p style={{ margin: 0, textAlign: "center", fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: 36, lineHeight: "48px", letterSpacing: "-0.01em", color: "var(--pf-text-accent-deep)" }}>{children}</p>
      </div>
    </div>
  )
}
