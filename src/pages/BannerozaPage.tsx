import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { Lightbulb, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/banneroza.copy"

const PRIMARY = "#DD8100"

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

export function BannerozaPage({ embedded = false }: { embedded?: boolean } = {}) {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "hero", label: t.chapters.hero },
    { id: "s01", label: t.chapters.s01 },
    { id: "s02", label: t.chapters.s02 },
    { id: "s03", label: t.chapters.s03 },
    { id: "s04", label: t.chapters.s04 },
    { id: "s05", label: t.chapters.s05 },
    { id: "s06", label: t.chapters.s06 },
  ]

  return (
    <div className={embedded ? "bg-white" : "min-h-screen bg-white"} style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      {!embedded && <Navbar />}
      {!embedded && <ProgressRail chapters={chapters} />}

      <div className={embedded ? "px-6 sm:px-10 pt-14 pb-10" : "max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pb-32"}>

        {/* ── HERO ── */}
        <div id="hero" className="py-8 md:py-16">
          <HeroStagger>
            <StaggerItem>
              <div className="flex items-center gap-4">
                {!embedded && (
                  <Link
                    to="/"
                    onClick={() => setTimeout(() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" }), 100)}
                    aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 text-[#0F172A] flex-shrink-0 hover:border-slate-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 animate-bounce-left" />
                  </Link>
                )}
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
                  { key: "pl", content: <>{copy.pl.h1} <span style={{ color: PRIMARY }}>{copy.pl.h1Accent}</span></> },
                  { key: "en", content: <>{copy.en.h1} <span style={{ color: PRIMARY }}>{copy.en.h1Accent}</span></> },
                ]}
              />
            </StaggerItem>

            <StaggerItem>
              <p
                className="mt-10 text-slate-600 font-medium"
                style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", maxWidth: "56ch", lineHeight: 1.5 }}
              >
                {t.body}
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
                <img src="/banneroza/cover2.jpg" alt="Banneroza, cover" className="w-full h-full object-cover" />
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="mt-14 rounded-3xl p-10" style={{ backgroundColor: "#94A3B814" }}>
                <span className="block text-[13px] font-extrabold tracking-[0.24em] uppercase mb-3.5" style={{ color: PRIMARY }}>{t.roleLabel}</span>
                <p className="font-medium text-slate-500" style={{ fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", lineHeight: 1.6 }}>
                  <strong className="font-bold text-[#0F172A]">{t.roleLead}</strong> {t.roleDesc}
                </p>
              </div>
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s01.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s01.p1}</p>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s01.p2}</p>
          </Reveal>
          <Reveal>
            <img src="/banneroza/1.jpg" alt="Problem, banners in cities" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── SOLUTION ── */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p1}</p>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p2}</p>
              <p className="text-slate-500 leading-relaxed">{t.s02.p3}</p>
            </div>
            <img src="/banneroza/3.jpg" alt="Szyldowe Rewolucje, solution" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── DISCOVERY ── */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s03.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.p1}</p>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s03.p2}</p>
          </Reveal>

          <Reveal className="rounded-xl px-6 py-5 mb-12" style={{ background: "#FFF3E0" }}>
            <p className="text-[13px] font-medium tracking-widest uppercase mb-4" style={{ color: PRIMARY }}>{t.s03.questionsLabel}</p>
            <ul className="flex flex-col gap-2">
              {t.s03.questions.map((q) => (
                <li key={q} className="flex gap-3 text-[15px]" style={{ color: "#6b3a00" }}>
                  <span style={{ color: PRIMARY }} className="flex-shrink-0 font-bold">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <img src="/banneroza/4.jpg" alt="Research, quantitative data" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.insightsH3}</h3>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.s03.insights.map((item) => (
              <StaggerItem key={item.title} className="border border-slate-200 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <Lightbulb style={{ width: 24, height: 24, color: PRIMARY }} className="mb-3" />
                <p className="font-semibold text-slate-900 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.personaH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s03.personaDesc}</p>
            <img src="/banneroza/5.jpg" alt="Persona" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── PROCES ── */}
        <div id="s04" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s04.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s04.p}</p>
          </Reveal>
          <Reveal>
            <img src="/banneroza/6.jpg" alt="Information architecture" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── DESIGN ── */}
        <div id="s05" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s05.h2}</h2>
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.lofiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s05.lofiP}</p>
            <img src="/banneroza/7.jpg" alt="Low fidelity wireframes" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.hifiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s05.hifiP}</p>
            <img src="/banneroza/8.jpg" alt="High fidelity mockup" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── WNIOSKI ── */}
        <div id="s06" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">{t.s06.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s06.intro}</p>
          </Reveal>

          <Reveal className="border border-slate-200 rounded-xl divide-y divide-slate-100 mb-12">
            {t.s06.items.map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        {!embedded && <NextProject currentHref="/case-study/banneroza" />}

      </div>
      {!embedded && <Contact />}
      {!embedded && <Footer />}
    </div>
  )
}
