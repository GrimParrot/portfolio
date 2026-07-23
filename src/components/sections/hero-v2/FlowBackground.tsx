import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"
import WebGLFluid from "webgl-fluid"

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (reduceMotion) return
    if (startedRef.current) return
    const canvas = canvasRef.current
    if (!canvas) return
    startedRef.current = true

    WebGLFluid(canvas, {
      TRIGGER: "hover",
      IMMEDIATE: true,
      AUTO: true,
      INTERVAL: 4000,
      BACK_COLOR: { r: 11, g: 18, b: 32 },
      TRANSPARENT: false,
      COLORFUL: true,
    })
  }, [reduceMotion])

  if (reduceMotion) {
    return <div className="absolute inset-0" style={{ background: "#0B1220" }} />
  }

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
