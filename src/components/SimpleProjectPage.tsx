import { Fragment, useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"

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
  title: React.ReactNode
  tags: string[]
  cover: ProjectImage
  coverVideo?: { src: string; poster?: string }
  caption: string
  sections: ProjectSection[]
}

export function SimpleProjectPage({ embedded = false, copy, backHref }: { embedded?: boolean; copy: SimpleProjectCopy; backHref: string }) {
  const { lang } = useLang()

  return (
    <div className={embedded ? "bg-white" : "min-h-screen bg-white"} style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {!embedded && <Navbar />}

      <div className={embedded ? "px-m sm:px-xl pt-2xl pb-xl" : "max-w-container mx-auto px-m pt-3xl pb-2xl md:pb-4xl"}>
        {!embedded && (
          <Link
            to="/"
            onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
            aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
            className="inline-flex items-center justify-center w-l h-l rounded-xl border border-primary-100 text-primary-900 flex-shrink-0 hover:border-primary-300 transition-colors mb-xl"
          >
            <ArrowLeft className="w-s h-s animate-bounce-left" />
          </Link>
        )}

        <div className="flex flex-col gap-2xl">
          <Reveal className="flex flex-col gap-m">
            <FitHeading
              maxLines={2}
              className="font-heading text-h1 text-primary-900"
            >
              {copy.title}
            </FitHeading>

            <p className="font-body text-body-lg text-primary-700" style={{ maxWidth: "64ch" }}>
              {copy.caption}
            </p>

            <div className="flex flex-wrap gap-xs">
              {copy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-s py-xs font-body text-caption font-medium">
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
                  <h2 className="font-heading text-h2 text-primary-900">{section.title}</h2>
                </Reveal>
              )}
              {section.images.map((row, j) =>
                Array.isArray(row) ? (
                  <Reveal key={j} className="grid grid-cols-2 gap-m items-start">
                    {row.map((image) => (
                      <img key={image.img} src={image.img} alt={image.alt} className="w-full h-auto block rounded-2xl border border-primary-100" />
                    ))}
                  </Reveal>
                ) : "video" in row ? (
                  <Reveal key={row.video} className="rounded-2xl overflow-hidden border border-primary-100" style={{ aspectRatio: "4/3" }}>
                    <HoverVideoCover src={row.video} poster={row.poster} />
                  </Reveal>
                ) : (
                  <Reveal key={row.img}>
                    <img src={row.img} alt={row.alt} className="w-full block rounded-2xl border border-primary-100" />
                  </Reveal>
                )
              )}
            </Fragment>
          ))}
        </div>

        {!embedded && <NextProject currentHref={backHref} />}
      </div>
      {!embedded && <Contact />}
      {!embedded && <Footer />}
    </div>
  )
}
