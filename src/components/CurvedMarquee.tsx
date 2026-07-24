import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"

/** Builds an SVG path `d` for a repeating sine wave across the given width. */
function buildWavePath(width: number, amplitude: number, wavelength: number, midY: number) {
  const points: string[] = [`M 0 ${midY}`]
  const step = 4
  for (let x = step; x <= width; x += step) {
    const y = midY + Math.sin((x / wavelength) * Math.PI * 2) * amplitude
    points.push(`L ${x.toFixed(2)} ${y.toFixed(2)}`)
  }
  return points.join(" ")
}

function buildArcPath(width: number, amplitude: number, midY: number) {
  return `M 0 ${midY + amplitude} Q ${width / 2} ${midY - amplitude} ${width} ${midY + amplitude}`
}

type CurvedMarqueeProps = {
  /** Text tiled end-to-end along the path; include a trailing separator (e.g. " • ") so repeats read cleanly. */
  text: string
  /** Preset curve, or a raw SVG path `d` string for a fully custom shape. */
  pathType?: "wave" | "arc" | (string & {})
  /** Wave/arc peak height in px. */
  amplitude?: number
  /** Distance between wave peaks in px (ignored for "arc"). */
  wavelength?: number
  /** Scroll speed in px/second along the path. */
  speed?: number
  fontSize?: number
  /** Any valid CSS color; defaults to the portfolio accent green. */
  color?: string
  /** Separator string to color differently, e.g. " • " (must match what `text` uses between words). */
  separator?: string
  /** Color for `separator` occurrences; defaults to `color` (no distinct coloring). */
  separatorColor?: string
  /** Reverses scroll direction. */
  reversed?: boolean
  className?: string
  /** SVG viewBox height; width is measured from the container. */
  height?: number
}

export function CurvedMarquee({
  text,
  pathType = "wave",
  amplitude = 24,
  wavelength = 300,
  speed = 40,
  fontSize = 32,
  color = "var(--color-accent-green, #0ABA53)",
  separator = " • ",
  separatorColor,
  reversed = false,
  className,
  height = 120,
}: CurvedMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const measureRef = useRef<SVGTextPathElement>(null)
  const textPathRef = useRef<SVGTextPathElement>(null)
  const [width, setWidth] = useState(0)
  const [repeatedText, setRepeatedText] = useState(text)
  const unitLenRef = useRef(0)
  const pathId = useId()
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w) setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The path only defines the baseline; glyphs extend above/below it by roughly
  // one font-size in ascent/descent. Pad the viewBox so peaks near the top/bottom
  // edge don't get clipped by the SVG's default overflow:hidden.
  const svgHeight = Math.max(height, Math.ceil(amplitude * 2 + fontSize * 1.6))
  const midY = svgHeight / 2
  const pathWidth = Math.max(width, 1)
  const d = useMemo(() => {
    if (pathType === "wave") return buildWavePath(pathWidth, amplitude, wavelength, midY)
    if (pathType === "arc") return buildArcPath(pathWidth, amplitude, midY)
    return pathType
  }, [pathType, pathWidth, amplitude, wavelength, midY])

  // Measure one unit of text along the curve, then tile it so the path is always
  // fully covered — a single scrolling copy avoids the overlap/gap that a
  // fixed-percentage two-copy trick produces once text length varies.
  useLayoutEffect(() => {
    if (pathWidth <= 1) return
    const measureEl = measureRef.current
    const pathEl = pathRef.current
    if (!measureEl || !pathEl) return
    const unitLen = measureEl.getComputedTextLength()
    const pathLen = pathEl.getTotalLength()
    if (unitLen <= 0) return
    unitLenRef.current = unitLen
    const repeatCount = Math.max(2, Math.ceil((pathLen * 2) / unitLen) + 1)
    setRepeatedText(text.repeat(repeatCount))
  }, [text, d, pathWidth])

  useEffect(() => {
    if (!visible || reduceMotion || pathWidth <= 1 || unitLenRef.current <= 0) return

    const direction = reversed ? 1 : -1
    let offset = 0
    let last = performance.now()
    let rafId: number

    function tick(now: number) {
      const dt = (now - last) / 1000
      last = now
      offset += dt * speed * direction
      const unit = unitLenRef.current
      const wrapped = ((offset % unit) + unit) % unit
      textPathRef.current?.setAttribute("startOffset", `${-wrapped}`)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [visible, reduceMotion, speed, reversed, pathWidth, repeatedText])

  // Split into words + separators so the separator can render in its own color,
  // while everything still lives inside one <textPath> and flows continuously.
  const segments = useMemo(() => {
    if (!separatorColor) return null
    const words = repeatedText.split(separator)
    if (words[words.length - 1] === "") words.pop()
    return words
  }, [repeatedText, separator, separatorColor])

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", overflow: "hidden" }}>
      <svg width="100%" height={svgHeight} viewBox={`0 0 ${pathWidth} ${svgHeight}`} preserveAspectRatio="none">
        <defs>
          <path ref={pathRef} id={pathId} d={d} fill="none" />
        </defs>
        {/* Invisible: measures the pixel length of one text unit along the curve. */}
        <text fontSize={fontSize} fontWeight={600} opacity={0} aria-hidden="true">
          <textPath ref={measureRef} href={`#${pathId}`}>
            {text}
          </textPath>
        </text>
        <text fill={color} fontSize={fontSize} fontWeight={600} style={{ whiteSpace: "pre" }}>
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
            {segments
              ? segments.map((word, i) => (
                  <tspan key={i}>
                    <tspan fill={color}>{word}</tspan>
                    <tspan fill={separatorColor}>{separator}</tspan>
                  </tspan>
                ))
              : repeatedText}
          </textPath>
        </text>
      </svg>
    </div>
  )
}
