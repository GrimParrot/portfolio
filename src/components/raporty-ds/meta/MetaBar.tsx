export interface MetaBarItem {
  label: string
  value: React.ReactNode
}

export interface MetaBarProps {
  /** Typically four: PRODUCT, ROLE, TEAM, SCALE. */
  items?: MetaBarItem[]
  style?: React.CSSProperties
}

/** Four-cell fact strip under a case-study hero. */
export function MetaBar({ items = [], style }: MetaBarProps) {
  return (
    <div style={{ width: "100%", borderRadius: 16, boxShadow: "var(--pf-ring)", display: "flex", flexDirection: "row", flexWrap: "wrap",
      justifyContent: "space-between", alignItems: "center", overflow: "hidden", ...style }}>
      {items.map((it, i) => (
        <div key={i} style={{ flex: "1 1 140px", minWidth: 0, border: "1px solid var(--pf-border)", boxSizing: "border-box",
          display: "flex", flexDirection: "column", gap: 4, padding: 24 }}>
          <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-accent)" }}>{it.label}</span>
          <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-primary)" }}>{it.value}</span>
        </div>
      ))}
    </div>
  )
}
