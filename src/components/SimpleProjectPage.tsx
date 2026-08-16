import { Fragment, useLayoutEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Badge } from "@/components/ui/badge"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

function Reveal({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  )
}

/**
 * Shrinks font-size (never grows past the CSS clamp()) until the rendered
 * title fits within `maxLines`. Titles here combine a project name with a
 * catchy line, so length varies a lot — a fixed clamp alone can't guarantee
 * the "max 2 lines" requirement across every title and viewport width.
 */
function FitHeading({ children, maxLines = 2, minFontPx = 28, className, style }: { children: React.ReactNode; maxLines?: number; minFontPx?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const naturalFontSize = style?.fontSize as string | undefined

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || !naturalFontSize) return

    function countLines(node: HTMLElement) {
      const range = document.createRange()
      range.selectNodeContents(node)
      const tops = new Set<number>()
      for (const rect of range.getClientRects()) tops.add(Math.round(rect.top))
      return tops.size
    }

    function fit() {
      if (!el) return
      el.style.fontSize = naturalFontSize!
      let size = parseFloat(getComputedStyle(el).fontSize)
      let guard = 0
      while (countLines(el) > maxLines && size > minFontPx && guard < 200) {
        size -= 1
        el.style.fontSize = `${size}px`
        guard++
      }
    }

    fit()
    window.addEventListener("resize", fit)
    document.fonts?.ready?.then(fit)
    return () => window.removeEventListener("resize", fit)
  }, [children, maxLines, minFontPx, naturalFontSize])

  return (
    <h1 ref={ref} className={className} style={style}>
      {children}
    </h1>
  )
}

/** Cover video that only plays while hovered — pauses and rewinds on mouse leave. */
function HoverVideoCover({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="auto"
      className="w-full h-full object-cover"
      onMouseEnter={() => ref.current?.play()}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.pause()
        el.currentTime = 0
      }}
    />
  )
}

export interface ProjectImage {
  img: string
  alt: string
}

export interface ProjectVideo {
  video: string
  poster?: string
}

export type ProjectImageRow = ProjectImage | ProjectImage[] | ProjectVideo

export interface ProjectSection {
  title?: string
  images: ProjectImageRow[]
}

export interface SimpleProjectCopy {
  /** Label above the title, e.g. "UI · SKLEP MOBILNY Z KOSMETYKAMI NATURALNYMI".
   *  Required, not optional: every project carries one, and a missing language
   *  variant has to fail the build rather than silently drop the line. */
  heroEyebrow: string
  title: React.ReactNode
  tags: string[]
  cover: ProjectImage
  coverVideo?: { src: string; poster?: string }
  caption: string
  sections: ProjectSection[]
}

/** Gallery project shown inside the homepage modal.
 *
 * It used to double as a standalone route, with an `embedded` flag switching
 * page chrome — navbar, back button, next-project card, footer — on and off.
 * The gallery is modal-only now, so the flag and all of that chrome are gone;
 * the modal supplies its own frame and close button. */
export function SimpleProjectPage({ copy }: { copy: SimpleProjectCopy }) {
  return (
    <div className="bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 pt-14 pb-10">
        <div className="flex flex-col gap-[60px]">
          <Reveal className="flex flex-col gap-6">
            {/* The 24px above the title comes from this column's gap-6 — the
                same distance the case studies set for their eyebrow. Styling
                matches Banneroza, which shares this hero's heading exactly. */}
            <span className="text-[13px] font-extrabold tracking-[0.28em] uppercase text-pf-ink">
              {copy.heroEyebrow}
            </span>
            <FitHeading
              maxLines={2}
              className="font-extrabold text-pf-ink"
              style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              {copy.title}
            </FitHeading>

            <p className="text-pf-700 font-medium" style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)", maxWidth: "64ch", lineHeight: 1.5 }}>
              {copy.caption}
            </p>

            <div className="flex flex-wrap gap-2">
              {copy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                  {tag}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
            {copy.coverVideo ? (
              <HoverVideoCover src={copy.coverVideo.src} poster={copy.coverVideo.poster ?? copy.cover.img} />
            ) : (
              <img src={copy.cover.img} alt={copy.cover.alt} className="w-full h-full object-cover" />
            )}
          </Reveal>

          {copy.sections.map((section, i) => (
            <Fragment key={i}>
              {section.title && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-pf-ink">{section.title}</h2>
                </Reveal>
              )}
              {section.images.map((row, j) =>
                Array.isArray(row) ? (
                  <Reveal key={j} className="grid grid-cols-2 gap-6 items-start">
                    {row.map((image) => (
                      <img key={image.img} src={image.img} alt={image.alt} className="w-full h-auto block rounded-2xl border border-pf-line" />
                    ))}
                  </Reveal>
                ) : "video" in row ? (
                  <Reveal key={row.video} className="rounded-2xl overflow-hidden border border-pf-line" style={{ aspectRatio: "4/3" }}>
                    <HoverVideoCover src={row.video} poster={row.poster} />
                  </Reveal>
                ) : (
                  <Reveal key={row.img}>
                    <img src={row.img} alt={row.alt} className="w-full block rounded-2xl border border-pf-line" />
                  </Reveal>
                )
              )}
            </Fragment>
          ))}
        </div>

      </div>
    </div>
  )
}
