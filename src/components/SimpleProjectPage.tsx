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

export interface ProjectImage {
  img: string
  alt: string
}

export type ProjectImageRow = ProjectImage | ProjectImage[]

export interface ProjectSection {
  title?: string
  images: ProjectImageRow[]
}

export interface SimpleProjectCopy {
  title: React.ReactNode
  tags: string[]
  cover: ProjectImage
  coverEmbed?: string
  caption: string
  sections: ProjectSection[]
}

export function SimpleProjectPage({ embedded = false, copy, backHref }: { embedded?: boolean; copy: SimpleProjectCopy; backHref: string }) {
  const { lang } = useLang()

  return (
    <div className={embedded ? "bg-white" : "min-h-screen bg-white"} style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {!embedded && <Navbar />}

      <div className={embedded ? "px-6 sm:px-10 pt-14 pb-10" : "max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pb-32"}>
        {!embedded && (
          <Link
            to="/"
            onClick={() => setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)}
            aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
            className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 text-[#0F172A] flex-shrink-0 hover:border-slate-300 transition-colors mb-12"
          >
            <ArrowLeft className="w-4 h-4 animate-bounce-left" />
          </Link>
        )}

        <div className="flex flex-col gap-[60px]">
          <Reveal className="flex flex-col gap-6">
            <FitHeading
              maxLines={2}
              className="font-extrabold text-[#0F172A]"
              style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
            >
              {copy.title}
            </FitHeading>

            <p className="text-slate-600 font-medium" style={{ fontSize: "clamp(1.125rem, 1.8vw, 1.375rem)", maxWidth: "64ch", lineHeight: 1.5 }}>
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
            <img src={copy.cover.img} alt={copy.cover.alt} className="w-full h-full object-cover" />
          </Reveal>

          {copy.coverEmbed && (
            <Reveal className="rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <script async src="https://embed.mckp.live/embed.js" />
              <mockup-player
                mockup-id={copy.coverEmbed}
                aspect-ratio="4 / 3"
                trigger="load"
                trigger-loop="true"
                cursor-affect-page="false"
                cursor-range="3-50-3-50"
                camera-zoom="38"
              />
            </Reveal>
          )}

          {copy.sections.map((section, i) => (
            <Fragment key={i}>
              {section.title && (
                <Reveal>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A]">{section.title}</h2>
                </Reveal>
              )}
              {section.images.map((row, j) =>
                Array.isArray(row) ? (
                  <Reveal key={j} className="grid grid-cols-2 gap-6 items-start">
                    {row.map((image) => (
                      <img key={image.img} src={image.img} alt={image.alt} className="w-full h-auto block rounded-2xl border border-slate-200" />
                    ))}
                  </Reveal>
                ) : (
                  <Reveal key={row.img}>
                    <img src={row.img} alt={row.alt} className="w-full block rounded-2xl border border-slate-200" />
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
