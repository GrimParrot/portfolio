import { Background } from "../decor/Background"

export interface DarkPanelBlock {
  label: string
  text: React.ReactNode
}

export interface DarkPanelProps {
  /** Bricolage 24/37 in white. */
  title?: React.ReactNode
  /** Lead paragraph; \n is honoured. */
  children?: React.ReactNode
  /** Labelled sub-blocks - e.g. "MY SCOPE", "COLLABORATION". */
  blocks?: DarkPanelBlock[]
  /** @default 48 */
  padding?: number
  style?: React.CSSProperties
}

/** Near-black panel over the circle field — context, scope and collaboration notes. */
export function DarkPanel({ title, children, blocks = [], padding = 48, style }: DarkPanelProps) {
  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, background: "var(--pf-primary-700)", boxSizing: "border-box", ...style }}>
      <Background tone="dark" style={{ transform: "matrix(-1,0,0,-1,1521,1057)" }} />
      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: blocks.length ? 32 : 16, padding, boxSizing: "border-box" }}>
        {title && <h4 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 600, fontSize: 24, lineHeight: "37px", color: "var(--pf-text-on-dark)" }}>{title}</h4>}
        {children && <p style={{ margin: 0, whiteSpace: "pre-line", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-body)" }}>{children}</p>}
        {blocks.map((b, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-on-dark)" }}>{b.label}</span>
            <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-muted)" }}>{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
