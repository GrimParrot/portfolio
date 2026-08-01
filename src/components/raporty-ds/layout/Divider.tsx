export interface DividerProps {
  style?: React.CSSProperties
}

/** 1px hairline used between chapters. */
export function Divider({ style }: DividerProps) {
  return <hr style={{ width: "100%", height: 1, border: 0, margin: 0, background: "var(--pf-border)", ...style }} />
}
