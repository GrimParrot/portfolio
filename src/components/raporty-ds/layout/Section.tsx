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
  const fluidGap = `clamp(${Math.round(gap * 0.4)}px, ${(gap * 0.09).toFixed(2)}vw, ${gap}px)`
  return (
    <section id={id} style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center",
      padding: bleed ? "clamp(40px, 8vw, 80px) 0" : 0, ...SURFACES[variant], ...style }}>
      <div style={{ width: "100%", maxWidth: 1200, display: "flex", flexDirection: "column", gap: fluidGap, alignItems: "flex-start",
        padding: "0 24px", boxSizing: "border-box", ...contentStyle }}>
        {children}
      </div>
    </section>
  )
}
