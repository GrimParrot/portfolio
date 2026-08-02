export interface CaseStudyHeroProps {
  /** e.g. "CASE STUDY - LOCALO - REPORT BUILDER" */
  eyebrow?: string
  title: React.ReactNode
  /** Body Large, 22/34. One or two sentences, result first. */
  lead?: React.ReactNode
  style?: React.CSSProperties
}

/** Case-study opener: overline, H1-scale title, lead paragraph. */
export function CaseStudyHero({ eyebrow, title, lead, style }: CaseStudyHeroProps) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%", ...style }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {eyebrow && <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{eyebrow}</span>}
        <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "var(--pf-h1-size)", lineHeight: "var(--pf-h1-lh)", letterSpacing: "var(--pf-h1-ls)", color: "var(--pf-text-primary)" }}>{title}</h1>
        {lead && <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{lead}</p>}
      </div>
    </header>
  )
}
