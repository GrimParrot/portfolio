const SURFACES: Record<string, React.CSSProperties> = {
  default: { background: "transparent" },
  subtle: { background: "var(--pf-surface-subtle)" },
  dark: { background: "var(--pf-surface-dark)" },
  accent: { background: "var(--pf-surface-accent)" },
}

export interface SectionProps {
  /** Surface. Non-default variants bleed full width with 80px vertical padding. @default 'default' */
  variant?: "default" | "subtle" | "dark" | "accent"
  /** Anchor id for chapter navigation. */
  id?: string
  /** Vertical gap between direct children. @default 80 */
  gap?: number
  children?: React.ReactNode
  style?: React.CSSProperties
  contentStyle?: React.CSSProperties
}

/** Page section. Bleeds edge-to-edge on non-default surfaces; content stays on the 1200px column. */
export function Section({ variant = "default", gap = 80, id, children, style, contentStyle }: SectionProps) {
  const bleed = variant !== "default"
  return (
    <section id={id} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
      padding: bleed ? "80px 0" : 0, ...SURFACES[variant], ...style }}>
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: "column", gap, alignItems: "flex-start", ...contentStyle }}>
        {children}
      </div>
    </section>
  )
}
