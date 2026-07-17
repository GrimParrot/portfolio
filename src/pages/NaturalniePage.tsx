import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/naturalnie.copy"

const PRIMARY = "#32685B"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

function HeroStagger({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div initial={reduce ? false : "hidden"} animate="show" variants={staggerParent}>
      {children}
    </motion.div>
  )
}

/**
 * Shrinks font-size (never grows past the CSS-defined size) until the
 * rendered text fits within `maxLines`. Needed because the hero H1 uses a
 * huge fluid clamp() — long translations can wrap past 3 lines at some
 * viewport widths, and there's no pure-CSS way to cap line count by shrinking type.
 *
 * Measures ALL `variants` (e.g. every language) at once, off-screen, and
 * locks the whole heading to the smallest size any variant needs — so
 * switching the active variant (language toggle) never jumps the font size.
 */
function AutoFitHeading({ variants, activeKey, className, style, maxLines = 3, minFontPx = 26, heading = true }: { variants: { key: string; content: ReactNode }[]; activeKey: string; className?: string; style?: React.CSSProperties; maxLines?: number; minFontPx?: number; heading?: boolean }) {
  const refs = useRef<Record<string, HTMLElement | null>>({})
  const naturalFontSize = style?.fontSize as string | undefined

  useLayoutEffect(() => {
    const els = variants.map((v) => refs.current[v.key]).filter((el): el is HTMLElement => !!el)
    if (els.length === 0 || !naturalFontSize) return

    function countLines(node: HTMLElement) {
      const range = document.createRange()
      range.selectNodeContents(node)
      const tops = new Set<number>()
      for (const rect of range.getClientRects()) tops.add(Math.round(rect.top))
      return tops.size
    }

    function fit() {
      const active = refs.current[activeKey]
      if (!active) return
      // Clear any width/max-width pinned by a PREVIOUS fit() call first, so the
      // active element (still in normal flow) reports its true natural layout
      // width for the current viewport rather than a stale pinned value.
      // max-width stays cleared for the rest of this function: a ch-based
      // max-width shrinks in lockstep with font-size, so once it's narrower
      // than the natural width it locks the wrap ratio and no amount of
      // further shrinking can reduce the line count — an infinite floor.
      active.style.width = ""
      active.style.maxWidth = "none"
      const width = active.getBoundingClientRect().width

      // Reset to the CSS clamp() expression (not a px value) so it re-resolves for the current viewport width.
      active.style.fontSize = naturalFontSize!
      let size = parseFloat(getComputedStyle(active).fontSize)

      els.forEach((el) => {
        el.style.width = `${width}px`
        el.style.maxWidth = "none"
        el.style.fontSize = `${size}px`
      })

      let guard = 0
      // Count actual rendered lines rather than approximating via scrollHeight /
      // line-height math — that formula runs a few px short of the true rendered
      // height and the gap compounds, over-shrinking the font past the floor.
      while (els.some((el) => countLines(el) > maxLines) && size > minFontPx && guard < 200) {
        size -= 1
        els.forEach((el) => { el.style.fontSize = `${size}px` })
        guard++
      }
    }

    fit()
    window.addEventListener("resize", fit)
    // Manrope loads via Google Fonts with display=swap; the fallback font's
    // metrics differ, so re-fit once the real font swaps in and reflows.
    document.fonts?.ready?.then(fit)
    return () => window.removeEventListener("resize", fit)
  }, [variants, activeKey, maxLines, minFontPx, naturalFontSize])

  return (
    <>
      {variants.map((v) => {
        const isActive = v.key === activeKey
        return (
          <div
            key={v.key}
            ref={(el) => { refs.current[v.key] = el }}
            className={className}
            style={isActive ? style : { ...style, position: "fixed", top: 0, left: -99999, visibility: "hidden", pointerEvents: "none" }}
            role={isActive && heading ? "heading" : undefined}
            aria-level={isActive && heading ? 1 : undefined}
            aria-hidden={isActive ? undefined : true}
          >
            {v.content}
          </div>
        )
      })}
    </>
  )
}

function ProgressRail({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [active, setActive] = useState(chapters[0]?.id)

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el)
    if (sections.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-40">
      {chapters.map((c) => (
        <button
          key={c.id}
          onClick={() => document.getElementById(c.id)?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="group relative flex items-center justify-center w-4 h-4"
          aria-label={c.label}
        >
          <span
            className="rounded-full transition-all duration-300"
            style={{
              width: active === c.id ? 8 : 6,
              height: active === c.id ? 8 : 6,
              backgroundColor: active === c.id ? PRIMARY : "#CBD5E1",
            }}
          />
          <span className="absolute right-6 whitespace-nowrap text-[11px] font-medium px-2 py-1 rounded-md bg-[#0F172A] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {c.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-bold tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-slate-100 my-0" />
}

export function NaturalniePage() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "hero", label: t.chapters.hero },
    { id: "s01", label: t.chapters.s01 },
    { id: "s02", label: t.chapters.s02 },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />
      <ProgressRail chapters={chapters} />

      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div id="hero" className="py-8 md:py-16">
          <HeroStagger>
            <StaggerItem>
              <div className="flex items-center gap-4">
                <Link
                  to="/"
                  onClick={() => setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)}
                  aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
                  className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 text-[#0F172A] flex-shrink-0 hover:border-slate-300 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 animate-bounce-left" />
                </Link>
                <span className="text-[13px] font-extrabold tracking-[0.28em] uppercase" style={{ color: PRIMARY }}>UI</span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <AutoFitHeading
                className="mt-8 font-extrabold text-[#0F172A]"
                style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                maxLines={3}
                activeKey={lang}
                variants={[
                  { key: "pl", content: <>Naturalnie.pl</> },
                  { key: "en", content: <>Naturalnie.pl</> },
                ]}
              />
            </StaggerItem>

            <StaggerItem>
              <p
                className="mt-10 text-slate-600 font-medium"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", maxWidth: "56ch", lineHeight: 1.5 }}
              >
                {t.desc}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-[20px] border border-[#eef1f5] bg-[#eef1f5] overflow-hidden">
                {t.meta.map((item) => (
                  <div key={item.label} className="bg-white px-6 py-6">
                    <Tag color={PRIMARY}>{item.label}</Tag>
                    <p className="font-extrabold text-lg text-[#0F172A] mt-2 whitespace-pre-line">{item.value}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 rounded-[28px] overflow-hidden shadow-2xl" style={{ aspectRatio: "16/9" }}>
                <img src="/naturalnie-cover.webp" alt="Naturalnie.pl, main view" className="w-full h-full object-cover" />
              </div>
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── SCREENS ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s01.h2}</h2>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <img src="/naturalniepl1.png" alt="Naturalnie.pl, view 1" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/naturalniepl2.png" alt="Naturalnie.pl, view 2" className="w-full block rounded-2xl border border-slate-200" />
          </Reveal>
        </div>

        <Divider />

        {/* ── DESIGN SYSTEM ── */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <img src="/ui-summary-3.png" alt="UI Summary 3" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary.png" alt="UI Summary" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary-1.png" alt="UI Summary 1" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary-2.png" alt="UI Summary 2" className="w-full block rounded-2xl border border-slate-200" />
          </Reveal>
        </div>

        <NextProject currentHref="/ui/naturalnie" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
