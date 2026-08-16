import { Fragment } from "react"

export interface DecisionStep {
  label: string
  text: React.ReactNode
}

export interface DecisionCardProps {
  /** Manrope 22/34 bold — states the decision, not the feature. */
  title: React.ReactNode
  /** Flow diagram or screen shown above the reasoning, at its natural aspect ratio. */
  image?: string
  /** Usually three: "Rejected option:", "Reason:", "Effect:". */
  steps?: DecisionStep[]
  /** URL of the 24px connector arrow; falls back to a -> glyph. */
  arrowIcon?: string
  /** @default 48 */
  padding?: number
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** A design decision laid out as rejected option -> reason -> effect. */
export function DecisionCard({ title, image, steps = [], arrowIcon, padding = 48, children, style }: DecisionCardProps) {
  return (
    <div style={{ borderRadius: 24, boxShadow: "var(--pf-ring)", padding, display: "flex", flexDirection: "column",
      gap: 64, boxSizing: "border-box", width: "100%", ...style }}>
      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{title}</span>
      {image && <img src={image} alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 12 }} />}
      {children}
      {steps.length > 0 && (
        <div style={{ display: "flex", flexDirection: "row", gap: 32, alignItems: "center" }}>
          {steps.map((s, i) => (
            <Fragment key={i}>
              {i > 0 && (arrowIcon
                ? <img src={arrowIcon} alt="" width={24} height={24} style={{ flexShrink: 0 }} />
                : <span aria-hidden="true" style={{ flexShrink: 0, color: "var(--pf-text-muted)", fontSize: 18 }}>{"→"}</span>)}
              <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-primary)" }}>{s.label}</span>
                <span style={{ whiteSpace: "pre-line", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{s.text}</span>
              </div>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
