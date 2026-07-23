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
}

const BLOBS: Blob[] = [
  { color: "#3B4A7A", opacity: 0.35, size: 520, baseX: 28, baseY: 38, driftRadius: 60, speedX: 0.00018, speedY: 0.00014, phase: 0 },
  { color: "#2E5F5A", opacity: 0.35, size: 480, baseX: 68, baseY: 30, driftRadius: 50, speedX: 0.00021, speedY: 0.00017, phase: 2.1 },
  { color: "#4A3B6B", opacity: 0.35, size: 460, baseX: 52, baseY: 68, driftRadius: 70, speedX: 0.00016, speedY: 0.0002, phase: 4.2 },
  { color: "#0ABA53", opacity: 0.18, size: 380, baseX: 78, baseY: 72, driftRadius: 45, speedX: 0.00023, speedY: 0.00019, phase: 1.3 },
]

export function FlowBackground() {
  const reduceMotion = useReducedMotion()
  const blobRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return

    let raf = 0
    const start = performance.now()

    function tick(now: number) {
      const t = now - start
      BLOBS.forEach((blob, i) => {
        const el = blobRefs.current[i]
        if (!el) return
        const driftX = Math.sin(t * blob.speedX + blob.phase) * blob.driftRadius
        const driftY = Math.cos(t * blob.speedY + blob.phase) * blob.driftRadius
        el.style.transform = `translate(${driftX}px, ${driftY}px)`
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => cancelAnimationFrame(raf)
  }, [reduceMotion])

  return (
    <div className="absolute inset-0 overflow-hidden">
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
    </div>
  )
}
