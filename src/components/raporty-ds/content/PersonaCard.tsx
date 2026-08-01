export interface PersonaCardProps {
  /** Short question or facet - "Who they are", "What they want", "How they read". */
  title: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Grey card with a Bricolage H4 label and one plain-language answer. */
export function PersonaCard({ title, children, style }: PersonaCardProps) {
  return (
    <div style={{ borderRadius: 24, background: "var(--pf-surface-card-subtle)", boxShadow: "var(--pf-ring)",
      padding: 32, display: "flex", flexDirection: "column", gap: 16, boxSizing: "border-box", ...style }}>
      <h4 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 600, fontSize: 24, lineHeight: "37px", color: "var(--pf-text-primary)" }}>{title}</h4>
      <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "#000" }}>{children}</p>
    </div>
  )
}
