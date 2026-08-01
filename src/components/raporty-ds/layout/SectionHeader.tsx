export interface SectionHeaderProps {
  /** Overline, e.g. "03 · DISCOVERY". Written in caps in the source. */
  eyebrow?: string
  title: React.ReactNode
  /** @default 'muted' */
  tone?: "muted" | "accent" | "onDark"
  /** @default 'start' */
  align?: "start" | "center"
  style?: React.CSSProperties
}

/** Numbered section opener: overline eyebrow above an H2. */
export function SectionHeader({ eyebrow, title, tone = "muted", align = "start", style }: SectionHeaderProps) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: align === "center" ? "center" : "flex-start", ...style }}>
      {eyebrow && (
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em",
          color: tone === "accent" ? "var(--pf-text-accent)" : tone === "onDark" ? "var(--pf-text-on-dark)" : "var(--pf-text-muted)" }}>{eyebrow}</span>
      )}
      <h2 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: 80, lineHeight: "108px", letterSpacing: "0.02em",
        textAlign: align === "center" ? "center" : "left",
        color: tone === "onDark" ? "var(--pf-text-on-dark)" : "var(--pf-text-primary)" }}>{title}</h2>
    </header>
  )
}
