const TONES: Record<string, { bg: string; ring: string; text: string }> = {
  error: { bg: "var(--pf-surface-error)", ring: "var(--pf-error-300)", text: "var(--pf-error-700)" },
  success: { bg: "var(--pf-success-100)", ring: "var(--pf-success-300)", text: "var(--pf-success-700)" },
}

export interface InlineAlertProps {
  /** @default 'error' */
  tone?: "error" | "success"
  /** URL of a 28px glyph, e.g. /icons/alert-triangle.svg */
  icon?: string
  children?: React.ReactNode
  style?: React.CSSProperties
}

/** Tinted rounded strip flagging a risk or a resolved point. */
export function InlineAlert({ tone = "error", icon, children, style }: InlineAlertProps) {
  const t = TONES[tone] || TONES.error
  return (
    <div role="note" style={{ borderRadius: 12, background: t.bg, boxShadow: `inset 0 0 0 1px ${t.ring}`,
      display: "flex", flexDirection: "row", gap: 16, padding: 18, alignItems: "center", boxSizing: "border-box", ...style }}>
      {icon && <img src={icon} alt="" width={28} height={28} style={{ flexShrink: 0 }} />}
      <span style={{ flexGrow: 1, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: t.text }}>{children}</span>
    </div>
  )
}
