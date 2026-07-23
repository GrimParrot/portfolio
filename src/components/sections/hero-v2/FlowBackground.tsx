import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"
import WebGLFluid from "webgl-fluid"

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (reduceMotion) return
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    function start(e: PointerEvent) {
      if (startedRef.current) return
      // Ignore the "phantom" pointermove browsers fire on load/hover-state
      // reconciliation when the cursor already happens to rest over the
      // section — only a genuine movement delta should trigger the fluid.
      if (Math.abs(e.movementX) < 2 && Math.abs(e.movementY) < 2) return
      startedRef.current = true
      container!.removeEventListener("pointermove", start)

      WebGLFluid(canvas!, {
        TRIGGER: "hover",
        IMMEDIATE: false,
        AUTO: false,
        SIM_RESOLUTION: 48,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 450,
        DENSITY_DISSIPATION: 0.6,
        VELOCITY_DISSIPATION: 0.08,
        CURL: 0,
        BLOOM: false,
        SHADING: false,
        SUNRAYS: false,
        BACK_COLOR: { r: 11, g: 18, b: 32 },
        TRANSPARENT: false,
        COLORFUL: false,
        SPLAT_COLOR: { r: 0.16, g: 0.1, b: 0.48 },
      })
    }

    container.addEventListener("pointermove", start)
    return () => container.removeEventListener("pointermove", start)
  }, [reduceMotion])

  if (reduceMotion) {
    return <div className="absolute inset-0" style={{ background: "#0B1220" }} />
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
