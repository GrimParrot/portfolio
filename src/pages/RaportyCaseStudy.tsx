import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence, useReducedMotion, type TargetAndTransition } from "motion/react"
import { Target, AlertTriangle, TrendingUp, Search, Mail, Zap, ArrowLeft, Layers, Clock, GraduationCap } from "lucide-react"

const lessonIcons = [Search, Mail, Zap]
const findingIcons = [Layers, Clock, GraduationCap]
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"
import { copy } from "@/copy/raporty.copy"

const PRIMARY = "var(--accent-500)"
const ACCENT_DARK = "var(--accent-300)"
const PRIMARY_TINT_10 = "color-mix(in srgb, var(--accent-500) 10%, transparent)"
const PRIMARY_TINT_7 = "color-mix(in srgb, var(--accent-500) 7%, transparent)"

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
    <div className="hidden lg:flex fixed right-l top-1/2 -translate-y-1/2 flex-col items-center gap-s z-40">
      {chapters.map((c) => (
        <button
          key={c.id}
          onClick={() => smoothScrollTo(`#${c.id}`)}
          className="group relative flex items-center justify-center w-s h-s"
          aria-label={c.label}
        >
          <span
            className="rounded-full transition-all duration-300"
            style={{
              width: active === c.id ? 8 : 6,
              height: active === c.id ? 8 : 6,
              backgroundColor: active === c.id ? PRIMARY : "var(--primary-300)",
            }}
          />
          <span className="absolute right-m whitespace-nowrap font-body text-caption font-medium px-xs py-micro rounded-md bg-primary-900 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {c.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="font-body text-overline uppercase text-primary-500" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-primary-100 my-0" />
}

function SidebarSettingsSwap({ base, overlay, overlayRect }: { base: string; overlay: string; overlayRect: { top: number; left: number; width: number; height: number } }) {
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setShowOverlay((v) => !v), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative w-full rounded-2xl shadow-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img src={base} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "top" }} />
      <img
        src={overlay}
        alt=""
        className="absolute object-cover"
        style={{
          top: `${overlayRect.top}%`,
          left: `${overlayRect.left}%`,
          width: `${overlayRect.width}%`,
          height: `${overlayRect.height}%`,
          opacity: showOverlay ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
      />
    </div>
  )
}

function AutoScrollImage({ src, imageAspect }: { src: string; imageAspect: number }) {
  const containerAspect = 16 / 9
  const scrollPct = (1 - imageAspect / containerAspect) * 100

  return (
    <div className="relative w-full rounded-2xl shadow-xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
      <img
        src={src}
        alt=""
        className="w-full"
        style={{ animation: "raportyAutoscroll 14s ease-in-out infinite", ["--scroll-pct" as string]: `-${scrollPct}%` }}
      />
      <style>{`
        @keyframes raportyAutoscroll {
          0% { transform: translateY(0%); }
          55% { transform: translateY(var(--scroll-pct)); }
          62% { transform: translateY(var(--scroll-pct)); }
          92% { transform: translateY(0%); }
          100% { transform: translateY(0%); }
        }
      `}</style>
    </div>
  )
}

function MiniCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)
  const n = images.length

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 2800)
    return () => clearInterval(id)
  }, [n])

  const prevIndex = (index - 1 + n) % n

  return (
    <div className="relative w-full h-full">
      {images.map((src, i) => {
        const isCurrent = i === index
        const isPrev = i === prevIndex
        const translate = isCurrent ? "0%" : isPrev ? "-100%" : "100%"
        return (
          <img
            key={src}
            src={src}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              transition: isCurrent || isPrev ? "transform 0.6s ease" : "none",
              transform: `translateX(${translate})`,
              zIndex: isCurrent ? 1 : 0,
            }}
          />
        )
      })}
    </div>
  )
}

function ProfileBox({ box, rotate }: { box: { icon: string; title: string; tags: string[] }; rotate: number }) {
  return (
    <div className="border border-primary-100 rounded-2xl p-m bg-white shadow-sm" style={{ transform: `rotate(${rotate}deg)`, minHeight: 230 }}>
      <div className="inline-flex items-center justify-center w-2xl h-2xl rounded-xl" style={{ backgroundColor: PRIMARY_TINT_10 }}>
        {box.icon === "target" && <Target style={{ width: 32, height: 32, color: PRIMARY }} />}
        {box.icon === "warning" && <AlertTriangle style={{ width: 32, height: 32, color: PRIMARY }} />}
        {box.icon === "trending" && <TrendingUp style={{ width: 32, height: 32, color: PRIMARY }} />}
      </div>
      <p className="font-body font-semibold text-primary-900 text-body mt-s mb-s">{box.title}</p>
      <div className="flex flex-wrap gap-xs">
        {box.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-s py-xs font-body text-caption font-medium bg-primary-50 hover:bg-primary-50">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function PersonaTags({ boxes }: { boxes: { icon: string; title: string; tags: string[] }[] }) {
  // boxes come in as [Goal, Pain points, Behaviours]; Pain points has the most
  // chips, so it goes on top full-width and the other two sit below it.
  const [goal, painPoints, behaviours] = boxes
  const rotations = [2, -2]
  return (
    <div className="flex flex-col gap-xl mt-m px-xs">
      {painPoints && <ProfileBox box={painPoints} rotate={-2} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-l">
        {[goal, behaviours].map((box, i) => box && (
          <ProfileBox key={box.title} box={box} rotate={rotations[i % rotations.length]} />
        ))}
      </div>
    </div>
  )
}

interface ProcessStep {
  n: number
  title: string
  navDesc: string
  desc: string
  images?: string[]
  imagesLayout?: "carousel" | "stack" | "columns"
}

/**
 * Sticky-pinned step list + content panel: the whole block pins in place
 * (CSS position:sticky) while the page scrolls through a tall track behind
 * it, and scroll progress through that track picks the active step — same
 * idea as the earlier wheel-hijacking version, but driven by real scroll
 * position instead of intercepting wheel events. That earlier approach
 * needed `preventDefault()` on every wheel tick to stop the page slipping
 * through, which was fragile (fast scrolls could still leak through, and it
 * fought with the fixed navbar). Plain scroll + sticky has neither problem:
 * nothing is prevented, so native/momentum scrolling and fixed elements
 * behave normally regardless of scroll speed or cursor position.
 */
function DesignProcess({ eyebrow, title, steps, extras, rejectedTag, rejected }: { eyebrow: string; title: ReactNode; steps: ProcessStep[]; extras?: Record<number, ReactNode>; rejectedTag: string; rejected: { title: string; reason: string }[] }) {
  const [active, setActive] = useState(0)
  const step = steps[active]
  const trackRef = useRef<HTMLDivElement>(null)
  const STICKY_TOP = 110

  useEffect(() => {
    let raf = 0
    const pick = () => {
      const track = trackRef.current
      if (!track) return
      const rect = track.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable))
      const idx = Math.min(steps.length - 1, Math.floor(progress * steps.length))
      setActive(idx)
    }
    const onScroll = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pick) }
    window.addEventListener("scroll", onScroll, { passive: true })
    pick()
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf) }
  }, [steps.length])

  const scrollToStep = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const rect = track.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    if (scrollable <= 0) return
    const targetProgress = (i + 0.5) / steps.length
    window.scrollTo({ top: window.scrollY + rect.top + targetProgress * scrollable, behavior: "smooth" })
  }

  return (
    <div ref={trackRef} style={{ height: `${steps.length * 45}vh` }}>
      <div style={{ position: "sticky", top: STICKY_TOP }}>
        <div className="bg-white" style={{ paddingTop: 8, paddingBottom: 64 }}>
          <p className="font-body text-overline uppercase mb-s" style={{ color: PRIMARY }}>{eyebrow}</p>
          <h2 className="font-heading text-h2 text-primary-900">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-xl md:gap-2xl items-start" style={{ minHeight: 600 }}>
      <nav className="flex flex-col gap-xs">
        {steps.map((s, i) => {
          const isActive = i === active
          return (
            <div
              key={s.n}
              onClick={() => scrollToStep(i)}
              className="cursor-pointer rounded-[14px] border"
              style={{
                borderColor: isActive ? PRIMARY : "var(--primary-100)",
                backgroundColor: isActive ? PRIMARY_TINT_7 : "transparent",
                padding: isActive ? "24px 24px" : "16px 24px",
                transition: "border-color .3s, background-color .3s, padding .3s",
              }}
            >
              <div className="flex items-baseline gap-s font-body text-caption font-extrabold" style={{ color: isActive ? "var(--primary-900)" : "var(--primary-500)", transition: "color .3s" }}>
                <span className="font-body text-caption font-extrabold" style={{ color: isActive ? PRIMARY : "var(--primary-500)" }}>{String(s.n).padStart(2, "0")}</span>
                {s.title}
              </div>
              <div
                className="overflow-hidden font-body text-caption font-medium text-primary-700"
                style={{
                  maxHeight: isActive ? 110 : 0,
                  opacity: isActive ? 1 : 0,
                  marginTop: isActive ? 8 : 0,
                  transition: "max-height .35s cubic-bezier(.16,1,.3,1), opacity .3s, margin-top .35s",
                }}
              >
                {s.navDesc}
              </div>
            </div>
          )
        })}
      </nav>

      <motion.div layout transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}>
        <div className="flex items-center gap-xs">
          {steps.map((_, di) => (
            <span
              key={di}
              className="rounded-full flex-shrink-0"
              style={
                di === active
                  ? { width: 22, height: 6, borderRadius: 3, backgroundColor: PRIMARY, transition: "background-color .3s" }
                  : { width: 6, height: 6, backgroundColor: di < active ? PRIMARY : "var(--primary-100)", transition: "background-color .3s" }
              }
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step.n}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="mt-xs font-heading text-h3 text-primary-900">{step.title}</h3>
            <p className="mt-s font-body text-body text-primary-700">{step.desc}</p>
            {extras?.[step.n]}
            {step.images && step.images.length > 0 && (
              step.imagesLayout === "stack" ? (
                <div className="mt-m flex flex-col gap-s">
                  {step.images.map((src) => (
                    <div key={src} className="rounded-[20px] overflow-hidden border border-primary-100" style={{ height: 380, backgroundColor: "var(--primary-50)" }}>
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : step.imagesLayout === "columns" ? (
                <div className="mt-m grid grid-cols-2 gap-s">
                  {step.images.map((src) => (
                    <div key={src} className="rounded-[20px] overflow-hidden border border-primary-100" style={{ height: 380, backgroundColor: "var(--primary-50)" }}>
                      <img src={src} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              ) : step.images.length === 1 ? (
                <div className="mt-m rounded-[20px] overflow-hidden border border-primary-100" style={{ height: 380, backgroundColor: "var(--primary-50)" }}>
                  <img src={step.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
              ) : (
                // Fixed height (like the other layouts) crops these screenshots
                // hard — they're all a consistent 1000×557, so match that ratio
                // instead of forcing a taller box and cutting off top/bottom.
                <div className="mt-m rounded-[20px] overflow-hidden border border-primary-100" style={{ aspectRatio: "1000/557", backgroundColor: "var(--primary-50)" }}>
                  <MiniCarousel images={step.images} />
                </div>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
        </div>

        <div className="border-t border-primary-100 pt-l mt-xl">
          <Tag color="var(--primary-700)">{rejectedTag}</Tag>
          <div className="flex flex-col divide-y divide-primary-100 mt-s">
            {rejected.map((r) => (
              <div key={r.title} className="flex items-start gap-s py-s">
                <span className="text-primary-300 font-medium flex-shrink-0 mt-micro">✕</span>
                <p className="font-body text-caption">
                  <span className="line-through decoration-primary-300 text-primary-500 font-semibold">{r.title}</span>
                  <span className="block text-primary-700 mt-micro">{r.reason}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Duotone feature card template — reuse for any "flat gray box, title, desc,
 * image cut off at the bottom" section. Only swap title/desc/img/imgAlt (and
 * height for a single full-width card that needs more image visible).
 * The text block always sizes to its own content — no min-height — so the
 * gap to the image (mt-xl) is always exactly 48px, no exceptions. In a
 * two-card pair with different desc lengths, this means the images may
 * start at slightly different Y — that's the accepted trade-off; the fixed
 * 48px gap under the text takes priority over cross-card image alignment.
 */
function FeatureCard({ title, desc, img, imgAlt, height = 420 }: { title: string; desc: ReactNode; img: string; imgAlt: string; height?: number }) {
  return (
    <div className="group rounded-3xl overflow-hidden pt-xl px-xl" style={{ height, backgroundColor: "var(--primary-50)" }}>
      <h3 className="font-heading text-h4 text-primary-900 mb-s">{title}</h3>
      <p className="font-body text-body text-primary-700 leading-relaxed">{desc}</p>
      <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl mt-xl transition-transform duration-500 group-hover:scale-[1.02]" />
    </div>
  )
}

function parseNum(str: string) {
  const tilde = str.startsWith("~") ? "~" : ""
  const s0 = tilde ? str.slice(1) : str
  const plus = s0.startsWith("+") ? "+" : ""
  const s = plus ? s0.slice(1) : s0
  const match = s.match(/^([\d,.]+)(.*)$/)
  if (!match) return { prefix: "", numeric: 0, suffix: "", decimals: 0, staticDisplay: str }
  const numStr = match[1].replace(",", ".")
  const numeric = parseFloat(numStr)
  const suffix = match[2]
  const decPart = match[1].split(/[,.]/)
  const decimals = decPart.length > 1 ? decPart[1].length : 0
  return { prefix: tilde + plus, numeric, suffix, decimals, staticDisplay: undefined }
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

function AnimatedNum({ num, active, className, style }: { num: string; active: boolean; className?: string; style?: React.CSSProperties }) {
  const { prefix, numeric, suffix, decimals, staticDisplay } = parseNum(num)
  const count = useCountUp(numeric, 1400, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = staticDisplay ?? `${prefix}${formatted}${suffix}`
  return (
    <p className={`relative font-extrabold tabular-nums tracking-tight ${className ?? ""}`} style={style}>{display}</p>
  )
}

function SmallMetricTile({ areaClass, metric, active }: { areaClass: string; metric: { num: string; caption: string }; active: boolean }) {
  return (
    <div className={`${areaClass} relative overflow-hidden rounded-[18px] flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1`} style={{ backgroundColor: "var(--primary-50)", padding: "24px 32px" }}>
      <AnimatedNum num={metric.num} active={active} className="leading-[0.9]" style={{ fontSize: 64, letterSpacing: "-0.04em", color: "var(--primary-900)" }} />
      <p className="relative font-body text-caption" style={{ color: "var(--primary-900)" }}>{metric.caption}</p>
    </div>
  )
}

function MetricsBento({ metrics, heroTag }: { metrics: Array<{ num: string; caption: string }>; heroTag: string }) {
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
  const [hero, m12, m20, m60, m44] = metrics
  return (
    <div ref={ref} className="metrics-bento">
      <div
        className="tile-hero relative overflow-hidden rounded-[18px] flex flex-col justify-between text-white transition-transform duration-300 hover:-translate-y-1"
        style={{ backgroundColor: "var(--primary-900)", backgroundImage: "url(/raporty-metrics-hero-bg.webp)", backgroundSize: "cover", backgroundPosition: "center", padding: "48px 48px" }}
      >
        <span
          className="relative inline-flex items-center gap-xs self-start rounded-full font-body text-caption font-extrabold uppercase"
          style={{ letterSpacing: "0.14em", color: "rgba(255,255,255,.85)", backgroundColor: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.18)", padding: "8px 16px" }}
        >
          <span className="rounded-full flex-shrink-0" style={{ width: 6, height: 6, backgroundColor: "#6AA0FF", boxShadow: "0 0 8px 1px rgba(106,160,255,.8)" }} />
          {heroTag}
        </span>
        <AnimatedNum num={hero.num} active={active} className="text-white text-[72px] sm:text-[110px] md:text-[150px]" style={{ lineHeight: 0.82, letterSpacing: "-0.05em" }} />
        <p className="relative font-body text-caption" style={{ maxWidth: 380, color: "rgba(255,255,255,.7)" }}>{hero.caption}</p>
      </div>
      <SmallMetricTile areaClass="tile-m12" metric={m12} active={active} />
      <SmallMetricTile areaClass="tile-m20" metric={m20} active={active} />
      <SmallMetricTile areaClass="tile-m60" metric={m60} active={active} />
      <SmallMetricTile areaClass="tile-m44" metric={m44} active={active} />
      <style>{`
        .metrics-bento { display: grid; gap: 16px; grid-template-columns: 1fr; }
        @media (min-width: 768px) {
          .metrics-bento {
            grid-template-columns: repeat(4, 1fr);
            grid-auto-rows: minmax(175px, auto);
            grid-template-areas: "m12 m20 hero hero" "m60 m44 hero hero";
          }
          .tile-hero { grid-area: hero; }
          .tile-m12 { grid-area: m12; }
          .tile-m20 { grid-area: m20; }
          .tile-m60 { grid-area: m60; }
          .tile-m44 { grid-area: m44; }
        }
      `}</style>
    </div>
  )
}

export function RaportyCaseStudy() {
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

      <div className="max-w-container mx-auto px-m pt-3xl">

        {/* HERO */}
        <div id="hero" className="py-s md:py-2xl">
          <HeroStagger>
            <StaggerItem>
              <div className="flex items-center gap-s">
                <Link
                  to="/"
                  onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
                  aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
                  className="inline-flex items-center justify-center w-l h-l rounded-xl border border-primary-100 text-primary-900 flex-shrink-0 hover:border-primary-300 transition-colors"
                >
                  <ArrowLeft className="w-s h-s animate-bounce-left" />
                </Link>
                <span className="font-body text-overline uppercase text-primary-900">
                  Case Study<span className="mx-xs opacity-40">—</span>
                  <span style={{ color: PRIMARY }}>{t.heroEyebrow}</span>
                </span>
              </div>
            </StaggerItem>

            <StaggerItem>
              <AutoFitHeading
                className="mt-l font-heading text-h1 text-primary-900"
                maxLines={3}
                activeKey={lang}
                variants={[
                  { key: "pl", content: <>{copy.pl.h1} <span style={{ color: PRIMARY }}>{copy.pl.h1Accent}</span></> },
                  { key: "en", content: <>{copy.en.h1} <span style={{ color: PRIMARY }}>{copy.en.h1Accent}</span></> },
                ]}
              />
            </StaggerItem>

            <StaggerItem>
              <p
                className="mt-xl font-body text-body-lg text-primary-700"
                style={{ maxWidth: "56ch" }}
              >
                {t.intro}<strong className="text-primary-900">{t.introProduct}</strong>{t.introSuffix}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-xl grid grid-cols-2 md:grid-cols-4 gap-px rounded-[20px] border border-primary-100 bg-primary-50 overflow-hidden">
                {t.meta.map((item) => (
                  <div key={item.label} className="bg-white px-m py-m">
                    <Tag color={PRIMARY}>{item.label}</Tag>
                    <p className="font-body text-body font-extrabold text-primary-900 mt-xs">{item.value}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-xl rounded-[28px] overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img src="/raporty-cover.webp" alt="Kreator Raportów" className="w-full h-full object-cover" />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-2xl rounded-3xl p-xl grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-l md:gap-2xl items-center" style={{ backgroundColor: "var(--primary-50)" }}>
                <div className="order-2 md:order-none">
                  <span className="block font-body text-overline uppercase mb-s" style={{ color: PRIMARY }}>{t.roleLabel}</span>
                  <p className="font-body text-body text-primary-700">
                    <strong className="font-bold text-primary-900">{t.roleLead}</strong> {t.roleDesc}
                  </p>
                </div>
                <AutoFitHeading
                  className="font-heading text-h3 text-primary-900 order-1 md:order-none"
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

        {/* 01 */}
        <div id="s01" className="py-3xl md:py-4xl">
          <Reveal>
            {t.s01.h2 && <h2 className="font-heading text-h2 text-primary-900 mb-2xl">{t.s01.h2}</h2>}
          </Reveal>
          <Reveal>
            <MetricsBento metrics={t.s01.metrics} heroTag={t.s01.heroTag} />
          </Reveal>
          <Reveal>
            <p className="font-body text-body text-primary-700 leading-relaxed mt-xl">{t.s01.lastPara}</p>
          </Reveal>
          <Reveal className="mt-2xl flex gap-s items-start">
            <blockquote className="flex gap-s items-start">
              <span className="text-8xl leading-none select-none font-serif flex-shrink-0" style={{ color: PRIMARY }}>&ldquo;</span>
              <p className="font-heading text-quote text-primary-700 flex-1">{t.s01.quote}</p>
              <span className="text-8xl leading-none select-none font-serif flex-shrink-0 self-end" style={{ color: PRIMARY }}>&rdquo;</span>
            </blockquote>
          </Reveal>
        </div>
      </div>

      {/* 02 — THE FINDING (full-bleed dark) */}
      <div id="s02" className="text-white" style={{ backgroundColor: "var(--primary-900)" }}>
        <div className="max-w-container mx-auto px-m py-3xl md:py-4xl">
          <Reveal>
            <Tag color={ACCENT_DARK}>{t.s02.h2}</Tag>
          </Reveal>
          <Reveal>
            <h2 className="font-heading text-h2 mt-l" style={{ maxWidth: "14ch" }}>
              {t.s02.findingTitle} <span style={{ color: ACCENT_DARK }}>{t.s02.findingTitleAccent}</span>{t.s02.findingTitleSuffix}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-l font-body text-body-lg text-white/70" style={{ maxWidth: "50ch" }}>
              {t.s02.findingLead}
            </p>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-m mt-2xl">
            {t.s02.insights.map((item, i) => {
              const Icon = findingIcons[i % findingIcons.length]
              return (
                <StaggerItem
                  key={item.n}
                  className="rounded-[20px] p-l border"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)" }}
                  whileHover={{ y: -4, transition: { duration: 0.2, ease: "easeOut" } }}
                >
                  <div className="inline-flex items-center justify-center rounded-2xl w-xl h-xl" style={{ backgroundColor: "rgba(111,139,251,.16)" }}>
                    <Icon className="w-m h-m" style={{ color: ACCENT_DARK }} />
                  </div>
                  <p className="font-heading text-h4 text-white mt-m mb-xs">{item.title}</p>
                  <p className="font-body text-caption text-white/70 leading-relaxed">{item.desc}</p>
                </StaggerItem>
              )
            })}
          </StaggerGroup>

          <Reveal className="mt-2xl flex flex-wrap items-center gap-s pt-l" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
            <span className="font-body text-overline uppercase mr-xs" style={{ color: ACCENT_DARK }}>{t.s02.methodsLabel}</span>
            {t.s02.methods.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-xs rounded-2xl px-s py-xs font-body text-caption font-bold text-white [&>svg]:text-[var(--accent-300)]" style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
                {m.icon}{m.label}
              </span>
            ))}
          </Reveal>
        </div>
      </div>

      {/* THE GOAL (full-bleed accent) */}
      <div className="text-white" style={{ backgroundColor: PRIMARY }}>
        <div className="max-w-container mx-auto px-m py-3xl md:py-4xl text-center">
          <Reveal>
            <Tag color="rgba(255,255,255,.75)">{t.s03.pivotGoalTitle}</Tag>
          </Reveal>
          <Reveal>
            <p className="mt-l mx-auto font-heading text-quote" style={{ maxWidth: "34ch" }}>
              {t.s03.pivotGoalDesc}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-container mx-auto px-m pb-2xl md:pb-4xl">
        <Divider />

        {/* 04 */}
        <div id="s04" className="py-3xl md:py-4xl">
          <Reveal>
            <h2 className="font-heading text-h2 text-primary-900 mb-m">{t.s04.h2}</h2>
            <p className="font-body text-body text-primary-700 leading-relaxed mb-xl">{t.s04.intro}</p>
          </Reveal>

          {t.s04.steps.map((feature, i) => (
            feature.cards ? (
              <Reveal key={i} className={`grid grid-cols-1 ${feature.cards.length > 1 ? "md:grid-cols-2" : ""} gap-m mb-2xl`}>
                {feature.cards.map((c, j) => <FeatureCard key={j} {...c} />)}
              </Reveal>
            ) : (
              <Reveal key={i} className="rounded-3xl overflow-hidden pt-xl px-xl mb-2xl" style={{ height: feature.height ?? 700, backgroundColor: "var(--primary-50)" }}>
                <h3 className="font-heading text-h4 text-primary-900 mb-s">{feature.title}</h3>
                <p className="font-body text-body text-primary-700 leading-relaxed">{feature.desc}</p>
                <div className="mt-xl">
                  {feature.visual === "sidebarSwap" ? (
                    <SidebarSettingsSwap
                      base="/raporty-section.webp"
                      overlay="/raporty-settings.webp"
                      overlayRect={{ top: 6.91, left: 0, width: 17.78, height: 109.6 }}
                    />
                  ) : (
                    <AutoScrollImage src="/raporty-raport.webp" imageAspect={1440 / 3795} />
                  )}
                </div>
              </Reveal>
            )
          ))}
        </div>

        <Divider />

        {/* 03 */}
        <div id="s03" className="py-3xl md:py-4xl">
          <Reveal>
            <DesignProcess
              eyebrow={t.chapters.s03}
              title={t.s03.h2}
              steps={t.s03.steps}
              extras={{
                1: <PersonaTags boxes={t.s03.profileBoxes} />,
              }}
              rejectedTag={t.s04.rejectedTag}
              rejected={t.s04.rejected}
            />
          </Reveal>
        </div>

        <Divider />

        {/* 05 */}
        <div id="s05" className="py-3xl md:py-4xl">
          <Reveal>
            <h2 className="font-heading text-h2 text-primary-900 mb-xl">{t.s05.h2}</h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-m">
            {t.s05.items.map((item, i) => {
              const Icon = lessonIcons[i % lessonIcons.length]
              return (
                <StaggerItem key={i} className="border border-primary-100 rounded-xl p-m transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-2xl h-2xl rounded-xl" style={{ backgroundColor: PRIMARY_TINT_10 }}>
                    <Icon style={{ width: 32, height: 32, color: PRIMARY }} />
                  </div>
                  <p className="font-body font-semibold text-primary-900 mt-s">{item.title}</p>
                </StaggerItem>
              )
            })}
          </StaggerGroup>
        </div>

        <NextProject currentHref="/case-study/raporty" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
