export interface TimelineItemProps {
  /** 1-based index shown in the accent chip. */
  number: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Numbered research question — accent chip plus one line. */
export function TimelineItem({ number, children, style }: TimelineItemProps) {
  return (
    <li style={{ listStyle: "none", display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start", ...style }}>
      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--pf-surface-accent)",
        display: "flex", justifyContent: "center", alignItems: "center",
        fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-text-accent)" }}>{number}</span>
      <span style={{ flexGrow: 1, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{children}</span>
    </li>
  )
}
