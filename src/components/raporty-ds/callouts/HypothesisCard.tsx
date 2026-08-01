import { StatusPill } from "./StatusPill"

export interface HypothesisCardProps {
  title: React.ReactNode
  /** Pill copy - "Rejected" / "New!". */
  status?: string
  /** @default 'live' */
  state?: "live" | "rejected"
  /** Smaller grey line under the body - usually how the hypothesis was tested. */
  note?: React.ReactNode
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Before/after hypothesis card — the rejected one greys out, the live one keeps full contrast. */
export function HypothesisCard({ title, status, state = "live", note, children, style }: HypothesisCardProps) {
  const rejected = state === "rejected"
  return (
    <div style={{ borderRadius: 24, boxShadow: "var(--pf-ring)", background: rejected ? "var(--pf-surface-card-subtle)" : "transparent",
      padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box", flex: 1, minWidth: 0, ...style }}>
      <div style={{ display: "flex", flexDirection: "row", gap: rejected ? 8 : 12, alignItems: "center" }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px",
          color: rejected ? "var(--pf-text-muted)" : "#000" }}>{title}</span>
        {status && <StatusPill tone={rejected ? "neutral" : "accent"}>{status}</StatusPill>}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px",
          color: rejected ? "var(--pf-text-muted)" : "var(--pf-text-primary)" }}>{children}</p>
        {note && <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-text-muted)" }}>{note}</span>}
      </div>
    </div>
  )
}
