const TONES: Record<string, string[]> = {
  dark: ["var(--pf-primary-900)", "var(--pf-primary-900)", "var(--pf-primary-900)", "var(--pf-primary-900)", "var(--pf-primary-900)"],
  accent: ["var(--pf-accent-100)", "var(--pf-accent-300)", "var(--pf-accent-300)", "var(--pf-accent-300)", "var(--pf-accent-300)"],
  brand: ["var(--pf-accent-300)", "var(--pf-accent-500)", "var(--pf-accent-900)", "var(--pf-accent-500)", "var(--pf-accent-900)"],
}

export interface BackgroundProps {
  /** Preset fill set. @default 'brand' */
  tone?: "dark" | "accent" | "brand"
  /** Five explicit circle fills, outermost first. Overrides `tone`. */
  fills?: string[]
  style?: React.CSSProperties
}

/** Decorative concentric-circle field used behind dark and accent panels. */
export function Background({ tone = "brand", fills, style }: BackgroundProps) {
  const c = fills || TONES[tone] || TONES.brand
  const circle = (w: number, tx: number, ty: number, fill: string): React.CSSProperties => ({
    position: "absolute", left: 0, top: 0, width: w, height: w, borderRadius: "50%",
    background: fill, transform: `matrix(-1,0,0,-1,${tx},${ty})`, transformOrigin: "0 0",
  })
  return (
    <div aria-hidden="true" style={{ position: "absolute", left: 0, top: 0, width: 1800, height: 1350, overflow: "hidden", pointerEvents: "none", ...style }}>
      <div style={{ position: "absolute", left: 604, top: -413, width: 1583, height: 1583, overflow: "hidden" }}>
        <div style={circle(1583, 1583, 1583, c[0])} />
        <div style={circle(893, 1238, 1238, c[1])} />
        <div style={circle(489, 1028, 1036, c[2])} />
      </div>
      <div style={{ position: "absolute", left: -404, top: 539, width: 893, height: 893, overflow: "hidden" }}>
        <div style={circle(893, 893, 893, c[3])} />
        <div style={circle(489, 691, 691, c[4])} />
      </div>
    </div>
  )
}
