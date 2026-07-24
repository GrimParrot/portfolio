import { useRef, type PointerEvent, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"

/** Wraps children in a magnetic hover effect: the element eases toward the cursor while hovered, and springs back on pointerleave. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  function handlePointerLeave() {
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
  }

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)", willChange: "transform" }}
    >
      {children}
    </div>
  )
}
