import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import WebGLFluid from "webgl-fluid"

function getIsHoverCapable() {
  if (typeof window === "undefined") return true
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startedRef = useRef(false)
  const [isHoverCapable] = useState(getIsHoverCapable)
  const skipCanvas = reduceMotion || !isHoverCapable

  useEffect(() => {
    if (skipCanvas) return
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    function init(overrides: { IMMEDIATE: boolean; AUTO: boolean }) {
      if (startedRef.current) return
      startedRef.current = true

      WebGLFluid(canvas!, {
        TRIGGER: "hover",
        SIM_RESOLUTION: 48,
        SPLAT_RADIUS: 0.2,
        SPLAT_FORCE: 450,
        DENSITY_DISSIPATION: 0.6,
        VELOCITY_DISSIPATION: 0.08,
        CURL: 0,
        BLOOM: false,
        SHADING: false,
        SUNRAYS: false,
        BACK_COLOR: { r: 10, g: 10, b: 10 },
        TRANSPARENT: false,
        COLORFUL: false,
        SPLAT_COLOR: { r: 0.16, g: 0.1, b: 0.48 },
        ...overrides,
      })
    }

    function start(e: PointerEvent) {
      if (startedRef.current) return
      // Ignore the "phantom" pointermove browsers fire on load/hover-state
      // reconciliation when the cursor already happens to rest over the
      // section — only a genuine movement delta should trigger the fluid.
      if (Math.abs(e.movementX) < 2 && Math.abs(e.movementY) < 2) return
      container!.removeEventListener("pointermove", start)
      init({ IMMEDIATE: false, AUTO: false })
    }

    container.addEventListener("pointermove", start)
    return () => container.removeEventListener("pointermove", start)
  }, [skipCanvas])

  // The webgl-fluid library attaches its own touchstart/touchmove listeners
  // with preventDefault(), which blocks native page scrolling — there's no
  // CSS way around that. So touch/no-hover devices never get the canvas at
  // all and fall back to a static gradient instead.
  if (skipCanvas) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 75%, rgba(139,92,246,0.22), transparent 60%), #0A0A0A",
        }}
      />
    )
  }

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
