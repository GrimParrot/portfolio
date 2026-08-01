const TONES: Record<string, React.CSSProperties> = {
  neutral: { background: "var(--pf-primary-100)", color: "var(--pf-text-muted)" },
  accent: { background: "var(--pf-accent-500)", color: "var(--pf-white)" },
}

export interface StatusPillProps {
  /** @default 'neutral' */
  tone?: "neutral" | "accent"
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Small rounded label - "Rejected", "New!". */
export function StatusPill({ tone = "neutral", children, style }: StatusPillProps) {
  return (
    <span style={{ borderRadius: 10, padding: "2px 12px", display: "inline-flex", justifyContent: "center", alignItems: "center",
      fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", whiteSpace: "nowrap",
      ...(TONES[tone] || TONES.neutral), ...style }}>{children}</span>
  )
}
