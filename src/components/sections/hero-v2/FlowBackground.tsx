import { useEffect, useRef } from "react"
import { useReducedMotion } from "motion/react"

type Blob = {
  color: string
  opacity: number
  size: number
  baseX: number
  baseY: number
  driftRadius: number
  speedX: number
  speedY: number
  phase: number
  parallax: number
}

const BLOBS: Blob[] = [
  { color: "#3B4A7A", opacity: 0.35, size: 520, baseX: 28, baseY: 38, driftRadius: 60, speedX: 0.00018, speedY: 0.00014, phase: 0, parallax: 0.06 },
  { color: "#2E5F5A", opacity: 0.35, size: 480, baseX: 68, baseY: 30, driftRadius: 50, speedX: 0.00021, speedY: 0.00017, phase: 2.1, parallax: 0.05 },
  { color: "#4A3B6B", opacity: 0.35, size: 460, baseX: 52, baseY: 68, driftRadius: 70, speedX: 0.00016, speedY: 0.0002, phase: 4.2, parallax: 0.07 },
  { color: "#0ABA53", opacity: 0.18, size: 380, baseX: 78, baseY: 72, driftRadius: 45, speedX: 0.00023, speedY: 0.00019, phase: 1.3, parallax: 0.04 },
]

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])
  const spotlightRef = useRef<HTMLDivElement>(null)
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 })

  useEffect(() => {
    if (reduceMotion) return
    const container = containerRef.current
    if (!container) return

    function handlePointerMove(e: PointerEvent) {
      const rect = container!.getBoundingClientRect()
      pointer.current.targetX = (e.clientX - rect.left) / rect.width - 0.5
      pointer.current.targetY = (e.clientY - rect.top) / rect.height - 0.5

      if (spotlightRef.current) {
        spotlightRef.current.style.setProperty("--mx", `${e.clientX - rect.left}px`)
        spotlightRef.current.style.setProperty("--my", `${e.clientY - rect.top}px`)
      }
    }

    container.addEventListener("pointermove", handlePointerMove)

    let raf = 0
    const start = performance.now()

    function tick(now: number) {
      const t = now - start
      pointer.current.x += (pointer.current.targetX - pointer.current.x) * 0.05
      pointer.current.y += (pointer.current.targetY - pointer.current.y) * 0.05

      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        const driftX = Math.sin(t * blob.speedX + blob.phase) * blob.driftRadius
        const driftY = Math.cos(t * blob.speedY + blob.phase) * blob.driftRadius
        const parallaxX = pointer.current.x * blob.parallax * 200
        const parallaxY = pointer.current.y * blob.parallax * 200
        el.style.transform = `translate(${driftX + parallaxX}px, ${driftY + parallaxY}px)`
      })

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      container.removeEventListener("pointermove", handlePointerMove)
      cancelAnimationFrame(raf)
    }
  }, [reduceMotion])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          ref={(el) => { blobRefs.current[i] = el }}
          className="absolute rounded-full"
          style={{
            left: `${blob.baseX}%`,
            top: `${blob.baseY}%`,
            width: blob.size,
            height: blob.size,
            marginLeft: -blob.size / 2,
            marginTop: -blob.size / 2,
            background: blob.color,
            opacity: blob.opacity,
            filter: "blur(90px)",
            mixBlendMode: "screen",
          }}
        />
      ))}

      {!reduceMotion && (
        <div
          ref={spotlightRef}
          className="absolute inset-0"
          style={{
            background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.10), transparent 70%)",
            mixBlendMode: "soft-light",
          }}
        />
      )}
    </div>
  )
}
