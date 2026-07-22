import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react"
import { FlaskConical, Users, ClipboardCheck, ArrowLeft, ExternalLink, DoorClosed, Unlink } from "lucide-react"

const lessonIcons = [FlaskConical, Users, ClipboardCheck]
const findingIcons = [ExternalLink, DoorClosed, Unlink]
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/localo.copy"

const PRIMARY = "#466AFA"
const ACCENT_DARK = "#6F8BFB"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
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

function StaggerGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, className, style, whileHover }: { children: React.ReactNode; className?: string; style?: React.CSSProperties; whileHover?: TargetAndTransition }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp} whileHover={whileHover}>
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

function CrossfadeImage({ images, interval, fill = false }: { images: string[]; interval: number; fill?: boolean }) {
  const [index, setIndex] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const positions = ["center", "top"]

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length
      setNext(nextIndex)
      setAnimating(false)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimating(true)
        setTimeout(() => {
          setIndex(nextIndex)
          setNext(null)
          setAnimating(false)
        }, 650)
      }))
    }, interval)
    return () => clearInterval(timer)
  }, [index, images.length, interval])

  const fromRight = next !== null && next % 2 === 1

  return (
    <div className={fill ? "absolute inset-0 overflow-hidden" : "relative w-full rounded-2xl shadow-xl overflow-hidden"} style={fill ? undefined : { aspectRatio: "16/9" }}>
      <img
        src={images[index]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: positions[index % positions.length], zIndex: 1 }}
      />
      {next !== null && (
        <img
          src={images[next]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: positions[next % positions.length],
            transform: animating ? "translateX(0)" : `translateX(${fromRight ? "100%" : "-100%"})`,
            transition: animating ? "transform 0.6s ease-in-out" : "none",
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}

function LaptopMockup({ images, interval = 2000 }: { images: string[]; interval?: number }) {
  return (
    <div className="relative w-full">
      <img src="/localo-laptop-mockup.webp" alt="" className="w-full block" />
      <div className="absolute overflow-hidden" style={{ left: "20.88%", top: "13.16%", width: "60.52%", height: "59.3%" }}>
        <CrossfadeImage images={images} interval={interval} fill />
      </div>
    </div>
  )
}

function StepCard({ step, title, desc, img, imgAlt, contain, height = 420 }: { step: string; title: string; desc: string; img?: string; imgAlt?: string; contain?: boolean; height?: number }) {
  return (
    <div className="group rounded-3xl overflow-hidden pt-10 px-10" style={{ height, backgroundColor: "#94A3B814" }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-2xl font-bold text-[#0F172A]">{title}</h3>
        <span className="text-[13px] font-medium tracking-widest uppercase flex-shrink-0" style={{ color: PRIMARY }}>{step}</span>
      </div>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <div className="mt-10">
        {contain ? (
          <div className="w-full rounded-2xl shadow-xl flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "#F5F5F5" }}>
            <img src={img} alt={imgAlt} className="object-contain" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
        ) : (
          <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" />
        )}
      </div>
    </div>
  )
}

function ImageCard({ img, imgAlt, height = 420 }: { img: string; imgAlt: string; height?: number }) {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ height, backgroundColor: "#0F172A" }}>
      <img src={img} alt={imgAlt} className="w-full h-full object-cover" style={{ objectPosition: "top" }} />
    </div>
  )
}

function ImageMarquee({ images, height = 420, duration = 32, reverse = false }: { images: { img: string; alt: string }[]; height?: number; duration?: number; reverse?: boolean }) {
  const doubled = [...images, ...images]
  return (
    <div className="group relative w-full overflow-hidden" style={{ height }}>
      <div className="marquee-track flex gap-5 h-full" style={{ width: "max-content", animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {doubled.map((im, i) => (
          <img key={i} src={im.img} alt={im.alt} className="h-full w-auto rounded-2xl border border-slate-200 object-contain flex-shrink-0" />
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marqueeScroll linear infinite; }
        .group:hover .marquee-track { animation-play-state: paused; }
      `}</style>
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

function parseNum(str: string) {
  const prefix = str.startsWith("+") ? "+" : ""
  const s = prefix ? str.slice(1) : str
  const match = s.match(/^([\d,.]+)(.*)$/)
  if (!match) return { prefix, numeric: 0, suffix: str, decimals: 0 }
  const numStr = match[1].replace(",", ".")
  const numeric = parseFloat(numStr)
  const suffix = match[2]
  const decPart = match[1].split(/[,.]/)
  const decimals = decPart.length > 1 ? decPart[1].length : 0
  return { prefix, numeric, suffix, decimals }
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!active) return
    setValue(0)
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(target * eased)
      if (t < 1) requestAnimationFrame(tick)
      else setValue(target)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return value
}

function StatCard({ num, caption, active, className = "", dark = false, large = false, image }: { num: string; caption: string; active: boolean; className?: string; dark?: boolean; large?: boolean; image?: string }) {
  const { prefix, numeric, suffix, decimals } = parseNum(num)
  const count = useCountUp(numeric, 1400, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = `${prefix}${formatted}${suffix}`
  const numberColor = dark ? "#FFFFFF" : "#16181D"
  const captionColor = dark ? "rgba(255,255,255,.7)" : "#0F172A"

  return (
    <div
      className={`relative overflow-hidden rounded-[18px] flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1 ${className}`}
      style={{
        backgroundColor: dark ? "#0F172A" : "#94A3B814",
        padding: large ? "40px 42px" : "26px 28px",
        ...(image ? { backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
      }}
    >
      <p
        className={`relative font-extrabold tabular-nums ${large ? "text-[72px] sm:text-[110px] md:text-[150px]" : "text-[64px]"}`}
        style={{ color: numberColor, lineHeight: large ? 0.82 : 0.9, letterSpacing: large ? "-0.05em" : "-0.04em" }}
      >
        {display}
      </p>
      <p className="relative" style={{ color: captionColor, fontSize: large ? 16 : 13.5, lineHeight: large ? 1.5 : 1.4, marginTop: large ? 20 : 0 }}>{caption}</p>
    </div>
  )
}

function MetricsGrid({ metrics }: { metrics: Array<{ num: string; caption: string; color: string; icon: string }> }) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const [a, b, c, d] = metrics
  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] sm:grid-rows-[repeat(2,minmax(168px,auto))] gap-6">
      <StatCard num={a.num} caption={a.caption} active={active} className="sm:row-span-2" dark large image="/localo-metrics-hero-bg.webp" />
      <StatCard num={b.num} caption={b.caption} active={active} className="sm:row-span-2" />
      <StatCard num={c.num} caption={c.caption} active={active} />
      <StatCard num={d.num} caption={d.caption} active={active} />
    </div>
  )
}

export function LocaloCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "hero", label: t.chapters.hero },
    { id: "s01", label: t.chapters.s01 },
    { id: "s02", label: t.chapters.s02 },
    { id: "s04", label: t.chapters.s04 },
    { id: "s03", label: t.chapters.s03 },
    { id: "s05", label: t.chapters.s05 },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />
      <ProgressRail chapters={chapters} />

      <div className="max-w-[1200px] mx-auto px-6 pt-24">

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
                <span className="text-[13px] font-extrabold tracking-[0.28em] uppercase text-[#0F172A]">
                  Case Study<span className="mx-2 opacity-40">—</span>
                  <span style={{ color: PRIMARY }}>{t.heroEyebrow}</span>
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <AutoFitHeading
                className="mt-8 font-extrabold text-[#0F172A]"
                style={{ fontSize: "clamp(3rem, 10vw, 8.25rem)", lineHeight: 1.05, letterSpacing: "-0.04em" }}
                maxLines={3}
                activeKey={lang}
                variants={[
                  { key: "pl", content: <>{copy.pl.h1} <span style={{ color: PRIMARY }}>{copy.pl.h1Accent}</span>{copy.pl.h1Suffix}</> },
                  { key: "en", content: <>{copy.en.h1} <span style={{ color: PRIMARY }}>{copy.en.h1Accent}</span>{copy.en.h1Suffix}</> },
                ]}
              />
            </StaggerItem>

            <StaggerItem>
              <p
                className="mt-10 text-slate-600 font-medium"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", maxWidth: "56ch", lineHeight: 1.5 }}
              >
                {t.intro}<strong className="text-slate-700">{t.introProduct}</strong>{t.introSuffix}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-px rounded-[20px] border border-[#eef1f5] bg-[#eef1f5] overflow-hidden">
                {t.meta.map((item) => (
                  <div key={item.label} className="bg-white px-6 py-6">
                    <Tag color={PRIMARY}>{item.label}</Tag>
                    <p className="font-extrabold text-lg text-[#0F172A] mt-2">{item.value}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-10 rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src="/client-acquisition-cover.webp" alt="Client Acquisition, main view" className="w-full h-full object-cover" />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-14 rounded-3xl p-10 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-8 md:gap-16 items-center" style={{ backgroundColor: "#94A3B814" }}>
                <div className="order-2 md:order-none">
                  <span className="block text-[13px] font-extrabold tracking-[0.24em] uppercase mb-3.5" style={{ color: PRIMARY }}>{t.roleLabel}</span>
                  <p className="font-medium text-slate-500" style={{ fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", lineHeight: 1.6 }}>
                    <strong className="font-bold text-[#0F172A]">{t.roleLead}</strong> {t.roleDesc}
                  </p>
                </div>
                <AutoFitHeading
                  className="font-extrabold text-[#0F172A] order-1 md:order-none"
                  style={{ fontSize: "clamp(2.375rem, 6vw, 4.25rem)", lineHeight: 1, letterSpacing: "-0.035em" }}
                  maxLines={2}
                  heading={false}
                  activeKey={lang}
                  variants={[
                    { key: "pl", content: <>{copy.pl.roleTitle} <span style={{ color: PRIMARY }}>{copy.pl.roleTitleAccent}</span></> },
                    { key: "en", content: <>{copy.en.roleTitle} <span style={{ color: PRIMARY }}>{copy.en.roleTitleAccent}</span></> },
                  ]}
                />
              </div>
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── 01 ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s01.h2}</h2>
          </Reveal>

          <Reveal>
            <MetricsGrid metrics={t.s01.metrics} />
          </Reveal>

          <Reveal>
            <p className="text-slate-500 leading-relaxed mt-12">{t.s01.lastPara}</p>
          </Reveal>
        </div>
      </div>

      {/* ── 02: THE FINDING (full-bleed dark) ── */}
      <div id="s02" className="text-white" style={{ backgroundColor: "#111112" }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-28">
          <Reveal>
            <Tag color={ACCENT_DARK}>{t.s02.h2}</Tag>
          </Reveal>
          <Reveal>
            <h2 className="font-extrabold mt-7" style={{ fontSize: "clamp(2.5rem, 9vw, 7.75rem)", lineHeight: 1.1, letterSpacing: "-0.04em", maxWidth: "14ch" }}>
              {t.s02.findingTitle} <span style={{ color: ACCENT_DARK }}>{t.s02.findingTitleAccent}</span>{t.s02.findingTitleSuffix}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-8 text-zinc-400" style={{ fontSize: "clamp(1.1875rem, 2.2vw, 1.5rem)", maxWidth: "50ch", lineHeight: 1.55 }}>
              {t.s02.findingLead}
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {t.s02.insights.map((item, i) => {
              const Icon = findingIcons[i % findingIcons.length]
              return (
                <StaggerItem
                  key={item.n}
                  className="rounded-[20px] p-8 bg-[#1c1c1f] border border-[#2e2e33]"
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                >
                  <div className="inline-flex items-center justify-center rounded-2xl" style={{ width: 52, height: 52, backgroundColor: "rgba(111,139,251,.16)" }}>
                    <Icon style={{ width: 26, height: 26, color: ACCENT_DARK }} />
                  </div>
                  <p className="font-extrabold text-white mt-5 mb-2.5" style={{ fontSize: 21, letterSpacing: "-0.01em" }}>{item.title}</p>
                  <p className="text-zinc-400 text-[15px] leading-relaxed">{item.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerGroup>

          <Reveal className="mt-14 flex flex-wrap items-center gap-3 pt-8" style={{ borderTop: "1px solid #2e2e33" }}>
            <span className="font-extrabold text-xs uppercase mr-2" style={{ letterSpacing: "0.2em", color: ACCENT_DARK }}>{t.s02.methodsLabel}</span>
            {t.s02.methods.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-2 rounded-2xl px-[18px] py-[9px] font-bold text-[15px] text-white [&>svg]:text-[#6F8BFB]" style={{ border: "1px solid #2e2e33" }}>
                {m.icon}{m.label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      {/* ── THE GOAL (full-bleed accent) ── */}
      <div className="text-white" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-[1200px] mx-auto px-6 py-24 md:py-28 text-center">
          <Reveal>
            <Tag color="rgba(255,255,255,.75)">{t.s03.goalLabel}</Tag>
          </Reveal>
          <Reveal>
            <p className="mt-7 mx-auto" style={{ fontSize: "clamp(1.625rem, 3.4vw, 2.75rem)", lineHeight: 1.3, letterSpacing: "-0.02em", maxWidth: "34ch" }}>
              {t.s03.goalText}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 pb-16 md:pb-32">
        <Divider />

        {/* ── 04 ── */}
        <div id="s04" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s04.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>
          </Reveal>

          {t.s04.steps.map((feature, i) => (
            "laptopMockup" in feature && feature.laptopMockup ? (
              <Reveal key={i} className="mb-16">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10">{feature.desc}</p>
                <LaptopMockup images={feature.laptopImages ?? []} />
              </Reveal>
            ) : "smallCards" in feature ? (
              <Reveal key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="grid grid-rows-2 gap-6">
                  {feature.smallCards?.map((c, j) => <StepCard key={j} {...c} height={338} />)}
                </div>
                {feature.bigCard && <StepCard {...feature.bigCard} height={700} />}
              </Reveal>
            ) : "companionImg" in feature && feature.companionImg ? (
              <Reveal key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <StepCard {...feature} />
                <ImageCard img={feature.companionImg} imgAlt={feature.companionImgAlt ?? ""} height={feature.height} />
              </Reveal>
            ) : "bleedImg" in feature && feature.bleedImg ? (
              <Reveal key={i} className="mb-16">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10">{feature.desc}</p>
                <img src={feature.img} alt={feature.imgAlt ?? ""} className="w-full" />
              </Reveal>
            ) : (
              <Reveal key={i} className="mb-16">
                <StepCard {...feature} />
              </Reveal>
            )
          ))}
        </div>

        <Divider />

        {/* ── 03 ── */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s03.h2}</h2>
          </Reveal>

          <Reveal className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.bodyH3}</h3>
                <p className="text-slate-500 leading-relaxed">{t.s03.body}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {t.s03.scopeCols.map((col) => (
                  <div key={col.label} className="rounded-xl p-5" style={{ backgroundColor: col.inScope ? "#22C55E14" : "#FFE2E2" }}>
                    <p className="text-[13px] font-medium tracking-widest uppercase text-slate-400 mb-3">{col.label}</p>
                    <ul className="flex flex-col gap-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2 text-[13px]" style={{ color: col.inScope ? "#16A34A" : "#b91c1c" }}>
                          <span className="flex-shrink-0 font-bold text-[13px]" style={{ color: col.inScope ? "#16A34A" : "#ef4444" }}>
                            {col.inScope ? "✓" : "✕"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 md:[&>*:first-child]:order-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.flowH3}</h3>
              <p className="text-slate-500 leading-relaxed">{t.s03.flowDesc}</p>
            </div>
            <img src="/flow.png" alt="User flow, Client Acquisition" className="w-full rounded-2xl border border-slate-200" />
          </Reveal>

          <Reveal className="mt-16 mb-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.synthesisH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.synthesisDesc}</p>
            <img src="/summary.png" alt="Research synthesis" className="w-full rounded-2xl border border-slate-200" />
          </Reveal>

          <Reveal className="mt-16 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s03.lofiH3}</h2>
            <div className="flex flex-col gap-5">
              <ImageMarquee images={t.s03.lofiImages.slice(0, 4)} height={280} />
              <ImageMarquee images={t.s03.lofiImages.slice(4, 8)} height={280} reverse />
            </div>
          </Reveal>

          <Reveal className="border-t border-slate-100 pt-10">
            <Tag color="#64748b">{t.s04.rejectedTag}</Tag>
            <div className="flex flex-col divide-y divide-slate-100 mt-6">
              {t.s04.rejected.map((r) => (
                <div key={r.title} className="flex items-start gap-3 py-5">
                  <span className="text-slate-300 font-medium flex-shrink-0 mt-0.5">✕</span>
                  <p className="text-[15px]">
                    <span className="line-through decoration-slate-300 text-slate-400 font-semibold">{r.title}</span>
                    <span className="block text-slate-500 mt-1">{r.reason}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 05 ── */}
        <div id="s05" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s05.h2}</h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.s05.items.map((item, i) => {
              const Icon = lessonIcons[i % lessonIcons.length]
              return (
                <StaggerItem key={i} className="border border-slate-200 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl" style={{ backgroundColor: PRIMARY + "1A" }}>
                    <Icon style={{ width: 28, height: 28, color: PRIMARY }} />
                  </div>
                  <p className="font-semibold text-slate-900 mt-3">{item.title}</p>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>

        <NextProject currentHref="/case-study/localo" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
