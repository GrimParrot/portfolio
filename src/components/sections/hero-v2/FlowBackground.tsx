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

    function start() {
      if (startedRef.current) return
      startedRef.current = true
      container!.removeEventListener("pointermove", start)

      WebGLFluid(canvas!, {
        TRIGGER: "hover",
        IMMEDIATE: false,
        AUTO: false,
        SPLAT_RADIUS: 0.11,
        SPLAT_FORCE: 1900,
        DENSITY_DISSIPATION: 2.5,
        VELOCITY_DISSIPATION: 1.2,
        BLOOM: false,
        BACK_COLOR: { r: 11, g: 18, b: 32 },
        TRANSPARENT: false,
        COLORFUL: false,
        SPLAT_COLOR: { r: 0.22, g: 0.15, b: 0.65 },
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
