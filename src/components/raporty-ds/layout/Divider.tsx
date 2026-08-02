export interface DividerProps {
  style?: React.CSSProperties
}

/** 1px hairline used between chapters. Capped at the 1200px content
 * column and centered — it isn't wrapped in a Section, so without this
 * it would stretch to the full viewport width. */
export function Divider({ style }: DividerProps) {
  return <hr style={{ width: "100%", maxWidth: 1200, height: 1, border: 0, margin: "0 auto", background: "var(--pf-border)", ...style }} />
}
