import { Fragment, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"
import { copy } from "@/copy/client-acquisition.copy"
import "@/styles/raporty-ds.css"
import {
  MetaBar, Section, SectionHeader, Divider,
  StatCard, FindingCard,
  GoalBanner,
  LessonCard,
} from "@/components/raporty-ds"

const CHAPTER_IDS = ["skrot", "problem", "discovery", "rozwiazanie", "handoff", "wynik", "podsumowanie"] as const

const AUDIT_ICONS = [
  "/icons/client-acquisition-icon-experience.svg",
  "/icons/client-acquisition-icon-heuristics.svg",
  "/icons/client-acquisition-icon-guidelines.svg",
  "/icons/client-acquisition-icon-accessibility.svg",
]

const SCOPE_OUT_ICONS = [
  "/icons/client-acquisition-icon-scope-keywords.svg",
  "/icons/client-acquisition-icon-scope-history.svg",
  "/icons/client-acquisition-icon-scope-credits.svg",
]

const SOURCE_CARD_ICONS = [
  "/icons/client-acquisition-icon-source-clarity.svg",
  "/icons/client-acquisition-icon-source-cs.svg",
  "/icons/client-acquisition-icon-source-tickets.svg",
  "/icons/client-acquisition-icon-source-devs.svg",
]

/** Same early lo-fi Prospect finder screenshots already used on the live
 * Localo case study page (LocaloCaseStudy.tsx / localo.copy.tsx lofiImages). */
const LOFI_IMAGES = [
  { img: "/localo-lofi-1.webp", alt: "Prospect finder: lista" },
  { img: "/localo-lofi-2.webp", alt: "Prospect finder: tabela z filtrami" },
  { img: "/localo-lofi-3.webp", alt: "Prospect finder: widok pełny" },
  { img: "/localo-lofi-4.webp", alt: "Business list" },
  { img: "/localo-lofi-5.webp", alt: "Grid research" },
  { img: "/localo-lofi-6.webp", alt: "Ongoing / Archived" },
  { img: "/localo-lofi-7.webp", alt: "Discover new clients: modal" },
  { img: "/localo-lofi-8.webp", alt: "Grid research: pusty stan" },
]

/** Scroll-reveal motion, same values as the fade-up used on the Localo case study page. */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

/** Fades a whole block up into place once it scrolls into view. */
function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div style={style} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Wraps a row of cards so its StaggerItem children fade up one after another. */
function StaggerGroup({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div className={className} style={style} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerParent}>
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div style={style} variants={fadeUp}>
      {children}
    </motion.div>
  )
}

/** Same as Reveal but plays immediately on mount instead of waiting for scroll — used for the hero, which is already in view on load. */
function HeroStagger({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div style={style} initial={reduce ? false : "hidden"} animate="show" variants={staggerParent}>
      {children}
    </motion.div>
  )
}

/** Locates every number inside a stat string (e.g. "11–13%", "~20x") so each one
 * can be counted up independently while the surrounding characters stay put. */
function parseNumberTokens(str: string) {
  const regex = /\d+(?:[.,]\d+)?/g
  const tokens: { value: number; decimals: number; index: number; length: number }[] = []
  let m: RegExpExecArray | null
  while ((m = regex.exec(str))) {
    const normalized = m[0].replace(",", ".")
    const decimals = normalized.includes(".") ? normalized.split(".")[1].length : 0
    tokens.push({ value: parseFloat(normalized), decimals, index: m.index, length: m[0].length })
  }
  return tokens
}

/** Stat value that counts up from 0 once scrolled into view. Animates every number
 * found in the string (so ranges like "11-13%" count both ends), leaving prefixes/
 * suffixes ("~", "%", "x") untouched. */
function AnimatedStat({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [active, setActive] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    const duration = 1400
    const start = performance.now()
    let raf: number
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setProgress(1 - Math.pow(1 - t, 3))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  const tokens = parseNumberTokens(value)
  if (tokens.length === 0) return <span ref={ref}>{value}</span>

  let out = ""
  let cursor = 0
  for (const tok of tokens) {
    out += value.slice(cursor, tok.index)
    const current = tok.value * progress
    out += tok.decimals > 0 ? current.toFixed(tok.decimals) : Math.round(current).toString()
    cursor = tok.index + tok.length
  }
  out += value.slice(cursor)

  return <span ref={ref}>{out}</span>
}

/** Exact port of the .dc.html chapter nav (DCLogic go/enter/leave/renderVals): a
 * fixed pill-shaped rail, top:50% right:32px, each button expanding on hover/active
 * to reveal its label next to the dot with a blurred white background. */
function ChapterNav({ chapters }: { chapters: { id: string; label: string }[] }) {
  const [active, setActive] = useState(chapters[0]?.id)
  const [hovered, setHovered] = useState<string | null>(null)

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
      { rootMargin: "-40% 0px -55% 0px" }
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [chapters])

  const go = (id: string) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" })
  }

  return (
    <nav className="pf-chapter-nav" style={{ position: "fixed", top: "50%", right: 32, transform: "translateY(-50%)", zIndex: 50, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2 }}>
      {chapters.map((c) => {
        const isActive = active === c.id
        const hot = hovered === c.id
        const on = hot || isActive
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => go(c.id)}
            onMouseEnter={() => setHovered(c.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              border: 0, cursor: "pointer", background: "transparent",
              display: "flex", alignItems: "center", justifyContent: "flex-end", gap: on ? 10 : 0,
              padding: on ? "7px 14px 7px 16px" : "7px 8px",
              borderRadius: 999,
              backgroundColor: on ? "rgba(255,255,255,.86)" : "transparent",
              backdropFilter: on ? "blur(12px)" : "none",
              boxShadow: on ? "var(--pf-ring)" : "none",
              transition: "all 180ms cubic-bezier(.2,.6,.2,1)",
            }}
          >
            <span
              style={{
                font: "600 13px/1 var(--pf-font-body)", letterSpacing: ".04em", whiteSpace: "nowrap",
                color: isActive ? "var(--pf-primary-900)" : "var(--pf-text-muted)",
                maxWidth: on ? 200 : 0, opacity: on ? 1 : 0, overflow: "hidden",
                transition: "max-width 180ms cubic-bezier(.2,.6,.2,1), opacity 180ms cubic-bezier(.2,.6,.2,1)",
              }}
            >
              {c.label}
            </span>
            <span
              style={{
                width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                background: isActive ? "var(--pf-primary-900)" : hot ? "var(--pf-text-muted)" : "var(--pf-primary-200, #C9C9C9)",
                transition: "var(--pf-transition)",
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}

/** Ported from LocaloCaseStudy.tsx (prod) — an infinite horizontal marquee of
 * screenshots at natural aspect ratio (never cropped), doubled for a seamless
 * loop, pausing on hover. Pair two of these with opposite `reverse` for the
 * "two lanes drifting past each other" look used for early lo-fi explorations. */
function ImageMarquee({ images, height = 420, duration = 32, reverse = false }: { images: { img: string; alt: string }[]; height?: number; duration?: number; reverse?: boolean }) {
  const doubled = [...images, ...images]
  return (
    <div className="ca-marquee-group relative w-full overflow-hidden" style={{ height }}>
      <div className="ca-marquee-track flex gap-5 h-full" style={{ width: "max-content", animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {doubled.map((im, i) => (
          <img key={i} src={im.img} alt={im.alt} className="h-full w-auto rounded-2xl border border-slate-200 object-contain flex-shrink-0" />
        ))}
      </div>
      <style>{`
        @keyframes clientAcquisitionMarqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .ca-marquee-track { animation: clientAcquisitionMarqueeScroll linear infinite; }
        .ca-marquee-group:hover .ca-marquee-track { animation-play-state: paused; }
      `}</style>
    </div>
  )
}

/** Bordered image-over-text card used throughout chapter 07 (Rozwiazanie). */
function ShotCard({ img, alt, title, text }: { img: string; alt: string; title: string; text: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <img src={img} alt={alt} style={{ width: "100%", height: "auto", display: "block", borderBottom: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box", flex: 1 }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{title}</span>
        <p className="pf-body" style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

export function ClientAcquisitionCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = CHAPTER_IDS.map((id) => ({ id, label: t.chapters[id] }))

  return (
    <>
      <Navbar />
      <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(96px, 14vw, 160px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

        <ChapterNav chapters={chapters} />

        {/* HERO */}
        <Section gap={80}>
          <HeroStagger style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%" }}>
            <StaggerItem style={{ width: "100%" }}>
              <header style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%", padding: 0, boxSizing: "border-box" }}>
                <div className="flex items-center gap-4">
                  <Link
                    to="/"
                    onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
                    aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 text-[#0F172A] flex-shrink-0 hover:border-slate-300 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4 animate-bounce-left" />
                  </Link>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                </div>
                <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 10vw, 126px)", lineHeight: "clamp(44px, 10.5vw, 136px)", letterSpacing: "0em", color: "var(--pf-text-primary)", textWrap: "pretty" }}>
                  <span style={{ color: "var(--pf-accent-500)" }}>{t.heroTitleAccent}</span> {t.heroTitle}
                </h1>
                <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.heroLead}</p>
              </header>
            </StaggerItem>
            <StaggerItem style={{ width: "100%" }}>
              <MetaBar items={t.metaBar} />
            </StaggerItem>
            <StaggerItem style={{ width: "100%" }}>
              <img src="/client-acquisition-cover.webp" alt={t.heroTitle} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
            </StaggerItem>
          </HeroStagger>
        </Section>

        {/* 01 · SKROT */}
        <Section variant="subtle" id="skrot">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.skrot.eyebrow} title={t.skrot.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body-bold"><span style={{ fontWeight: "normal" }}><b style={{ color: "#0A0A0A" }}>{t.skrot.introBold}</b>{t.skrot.introRest}</span></p>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, width: "100%", boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-2.webp) center / cover no-repeat", display: "flex", flexDirection: "column", gap: 16, padding: 48 }}>
              <h4 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 600, fontSize: 24, lineHeight: "37px", color: "var(--pf-text-on-dark)" }}>{t.skrot.contextPanel.title}</h4>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-body)" }}>{t.skrot.contextPanel.text1}</p>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-body)" }}>{t.skrot.contextPanel.text2}</p>
            </div>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.skrot.closingLead}<b>{t.skrot.closingBold}</b></p>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.skrot.statsIntroTitle}</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                <StaggerGroup className="pf-skrot-stats" style={{ gap: 24, width: "100%" }}>
                  {t.skrot.stats.map((s, i) => (
                    <StaggerItem key={i}>
                      <StatCard tone="white" value={<AnimatedStat value={s.value} />} label={s.label} style={{ width: "100%", height: "100%" }} />
                    </StaggerItem>
                  ))}
                </StaggerGroup>
                <span className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{t.skrot.statsCaption}</span>
              </div>
            </div>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ width: "100%", position: "relative", paddingBottom: "clamp(40px, 12vw, 200px)", boxSizing: "border-box" }}>
              <div style={{ width: "100%", borderRadius: 24, background: "#fff", boxShadow: "var(--pf-ring)", padding: "clamp(24px, 6vw, 64px)", display: "flex", flexDirection: "column", gap: 48, boxSizing: "border-box" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 940 }}>
                  <span className="pf-overline" style={{ color: "var(--pf-text-accent)" }}>{t.skrot.roleOverline}</span>
                  <p className="pf-quote">{t.skrot.roleQuote}</p>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 48, alignItems: "flex-start", width: "100%" }}>
                  <ul className="pf-body" style={{ margin: 0, padding: "0 0 0 20px", listStyle: "disc", flex: "1 1 280px", minWidth: 0, display: "flex", flexDirection: "column", gap: 0 }}>
                    {t.skrot.roleList.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <div style={{ flex: "1 1 280px", marginBottom: "clamp(-200px, -12vw, -40px)", overflow: "hidden", borderRadius: 24, boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-1.webp) center / cover no-repeat", display: "flex", flexDirection: "column", gap: 32, padding: "clamp(24px, 6vw, 48px)" }}>
                    <h4 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 600, fontSize: 24, lineHeight: "37px", color: "var(--pf-text-on-dark)" }}>{t.skrot.scopePanel.title}</h4>
                    {t.skrot.scopePanel.blocks.map((b, i) => (
                      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-on-dark)" }}>{b.label}</span>
                        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-muted)" }}>{b.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Section>

        {/* 02 · KNOWLEDGE GATHERING */}
        <Section id="problem">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body-bold" style={{ color: "#0A0A0A" }}>
              <span style={{ fontWeight: "normal", color: "var(--pf-text-body)" }}>{t.problem.introPre}</span>
              <b style={{ color: "#0A0A0A" }}>{t.problem.introBold}</b>
              <span style={{ fontWeight: "normal", color: "var(--pf-text-body)" }}>{t.problem.introRest}</span>
            </p>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E7E7E7)", borderRadius: 32, display: "flex", flexWrap: "wrap", gap: 80, padding: "clamp(24px, 6vw, 64px)", boxSizing: "border-box" }}>
              <div style={{ flex: "1 1 320px", display: "flex", flexDirection: "column", gap: 32 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "#0A0A0A" }}>{t.problem.persona.overline}</span>
                <p className="pf-quote">{t.problem.persona.quote}</p>
                <p className="pf-body-lg" style={{ margin: 0 }}><b>{t.problem.persona.commonBold}</b>{t.problem.persona.commonText}</p>
              </div>
              <div style={{ width: 360, flexShrink: 0, alignSelf: "stretch", overflow: "hidden", borderRadius: 24, background: "#F5F5F5", position: "relative" }}>
                <img src="/client-acquisition-persona-illustration.svg" alt="" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "155%", height: "auto" }} />
              </div>
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <h3 className="pf-h3">{t.problem.sourcesTitle}</h3>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.problem.sourcesIntro}<b>{t.problem.sourcesIntroBold}</b></p>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E7E7E7)", borderRadius: 24, padding: "clamp(24px, 6vw, 64px)", display: "flex", flexDirection: "column", gap: 64, alignItems: "center", boxSizing: "border-box" }}>
              <p className="pf-h3" style={{ textAlign: "center", margin: 0 }}>{t.problem.auditTitle}</p>
              <div style={{ display: "flex", gap: 48, alignItems: "center", width: "100%" }}>
                {t.problem.auditItems.map((label, i) => (
                  <Fragment key={i}>
                    {i > 0 && <img src="/icons/client-acquisition-icon-connector.svg" alt="" width={30} height={30} style={{ flexShrink: 0 }} />}
                    <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
                      <img src={AUDIT_ICONS[i]} alt="" width={120} height={120} />
                      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000", textAlign: "center" }}>{label}</span>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.problem.moreSourcesLead}</p>
          </Reveal>
          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            {t.problem.sourceCards.map((c, i) => (
              <StaggerItem key={i} style={{ flex: "1 1 460px" }}>
                <div style={{ width: "100%", height: "100%", border: "1px solid var(--pf-accent-100, #E7E7E7)", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
                  <img src={SOURCE_CARD_ICONS[i]} alt="" width={30} height={30} />
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{c.title}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{c.text}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4">{t.problem.aiSynthesisTitle}</h4>
              <p className="pf-body">{t.problem.aiSynthesisText}</p>
            </div>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <img src="/client-acquisition-ai-synthesis.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
          </Reveal>
        </Section>

        <Section variant="dark" gap={48}>
          <Reveal style={{ width: "100%" }}>
            <h3 className="pf-h3" style={{ color: "var(--pf-text-on-dark)", width: "100%", textAlign: "center" }}>{t.problem.findingsTitle}</h3>
          </Reveal>
          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            {t.problem.findings.map((f) => (
              <StaggerItem key={f.number} style={{ flex: "1 1 340px" }}>
                <FindingCard number={f.number} title={f.title} style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>{f.text}</FindingCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Section>

        <Section>
          <Reveal style={{ width: "100%" }}>
            <h3 className="pf-h3">{t.problem.scopeTitle}</h3>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.problem.scopeIntro}<b>{t.problem.scopeIntroBold}</b>{t.problem.scopeIntroEnd}</p>
          </Reveal>
          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            {t.problem.scopeOut.map((item, i) => (
              <StaggerItem key={i} style={{ flex: "1 1 280px" }}>
                <div style={{ width: "100%", height: "100%", border: "1px solid var(--pf-accent-100, #E7E7E7)", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
                  <img src={SCOPE_OUT_ICONS[i]} alt="" width={30} height={30} />
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{item.title}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{item.text}<b>{item.textBold}</b></p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.problem.scopeClosing1Pre}<b>{t.problem.scopeClosing1Bold}</b>{t.problem.scopeClosing1Rest}</p>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.problem.scopeClosing2}</p>
          </Reveal>
        </Section>

        <Reveal style={{ width: "100%" }}>
          <GoalBanner label={t.problem.goalOverline}>
            <span className="pf-quote" style={{ color: "inherit" }}>{t.problem.goalPre}<b style={{ color: "inherit" }}>{t.problem.goalBold}</b>{t.problem.goalRest}</span>
          </GoalBanner>
        </Reveal>

        {/* 03 · PROCES */}
        <Section id="discovery">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.discovery.eyebrow} title={t.discovery.title} />
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.discovery.flow.title}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
                <p className="pf-body" style={{ margin: 0 }}>{t.discovery.flow.text1}</p>
                <p className="pf-body" style={{ margin: 0 }}>{t.discovery.flow.text2}</p>
              </div>
              <img src="/client-acquisition-flowmap.webp" alt="" style={{ width: "100%", height: 415, objectFit: "cover", display: "block", borderRadius: 24, border: "1px solid var(--pf-accent-100, #E3E9FE)", boxSizing: "border-box" }} />
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.discovery.lowfiTitle}</span>
              <p className="pf-body" style={{ margin: 0 }}>{t.discovery.lowfiIntro}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>
                <ImageMarquee images={LOFI_IMAGES.slice(0, 4)} height={280} />
                <ImageMarquee images={LOFI_IMAGES.slice(4, 8)} height={280} reverse />
              </div>
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <h3 className="pf-h3">{t.discovery.decisionsTitle}</h3>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, padding: "clamp(24px, 5vw, 48px)", display: "flex", flexDirection: "column", gap: 64, boxSizing: "border-box" }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.discovery.decision1.title}</span>
              <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 16, overflow: "hidden", boxSizing: "border-box" }}>
                <img src="/client-acquisition-decision-flow.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "flex-start", width: "100%" }}>
                <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000" }}>{t.discovery.decision1.rejectedLabel}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{t.discovery.decision1.rejectedPre}<b>{t.discovery.decision1.rejectedBold}</b>{t.discovery.decision1.rejectedRest}</p>
                </div>
                <img src="/icons/client-acquisition-icon-arrow-step.svg" alt="" width={24} height={24} style={{ flexShrink: 0, marginTop: 3 }} />
                <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000" }}>{t.discovery.decision1.reasonLabel}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{t.discovery.decision1.reasonText}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <div style={{ width: "100%", height: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
                <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 16, overflow: "hidden", boxSizing: "border-box" }}>
                  <img src="/client-acquisition-naming.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
                </div>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.discovery.namingCard.title}</span>
                <p className="pf-body" style={{ margin: 0 }}>{t.discovery.namingCard.text}</p>
              </div>
            </StaggerItem>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <div style={{ width: "100%", height: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <img src="/client-acquisition-growth-pills.webp" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
                </div>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.discovery.resultCard.title}</span>
                <p className="pf-body" style={{ margin: 0 }}>
                  {t.discovery.resultCard.para1}
                  <br /><br />
                  <b>{t.discovery.resultCard.reasonLabel}</b>{t.discovery.resultCard.para2}<b>{t.discovery.resultCard.reasonBold}</b>{t.discovery.resultCard.para3}
                </p>
              </div>
            </StaggerItem>
          </StaggerGroup>
        </Section>

        <Divider />

        {/* 04 · ROZWIAZANIE */}
        <Section id="rozwiazanie">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.rozwiazanie.eyebrow} title={t.rozwiazanie.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.intro}</p>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", justifyContent: "center" }}>
              <img src="/client-acquisition-s04-hero-1.webp" alt="" style={{ flex: "1 1 280px", maxWidth: 340, width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
              <img src="/client-acquisition-s04-hero-2.webp" alt="" style={{ flex: "1 1 280px", maxWidth: 340, width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
              <img src="/client-acquisition-s04-hero-3.webp" alt="" style={{ flex: "1 1 280px", maxWidth: 340, width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <h3 className="pf-h3">{t.rozwiazanie.leadsFinderTitle}</h3>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.rozwiazanie.b1.title}</h4>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.b1.text}</p>
              <img src="/client-acquisition-s04-lista.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
            </div>
          </Reveal>

          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-legacy.webp" alt="" title={t.rozwiazanie.b2[0].title} text={t.rozwiazanie.b2[0].text} />
            </StaggerItem>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-generate-modal.webp" alt="" title={t.rozwiazanie.b2[1].title} text={t.rozwiazanie.b2[1].text} />
            </StaggerItem>
          </StaggerGroup>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.rozwiazanie.b3.title}</h4>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.b3.text}</p>
              <img src="/client-acquisition-s04-leads-list.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
            </div>
          </Reveal>

          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-growth-potential.webp" alt="" title={t.rozwiazanie.b4[0].title} text={t.rozwiazanie.b4[0].text} />
            </StaggerItem>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-map.webp" alt="" title={t.rozwiazanie.b4[1].title} text={t.rozwiazanie.b4[1].text} />
            </StaggerItem>
          </StaggerGroup>

          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-notes.webp" alt="" title={t.rozwiazanie.b5[0].title} text={t.rozwiazanie.b5[0].text} />
            </StaggerItem>
            <StaggerItem style={{ flex: "1 1 460px" }}>
              <ShotCard img="/client-acquisition-s04-statuses.webp" alt="" title={t.rozwiazanie.b5[1].title} text={t.rozwiazanie.b5[1].text} />
            </StaggerItem>
          </StaggerGroup>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.rozwiazanie.b6.title}</h4>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.b6.text}</p>
              <img src="/client-acquisition-s04-visibility-scans.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
            </div>
          </Reveal>

          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.rozwiazanie.b7.title}</h4>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.b7.text}</p>
            </div>
          </Reveal>
        </Section>

        <Divider />

        {/* 05 · HANDOFF */}
        <Section id="handoff">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.handoff.eyebrow} title={t.handoff.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <p className="pf-body" style={{ margin: 0 }}>{t.handoff.introPre}<b>{t.handoff.introBold}</b>{t.handoff.introRest}</p>
              <p className="pf-body" style={{ margin: 0 }}>{t.handoff.intro2Pre}<b>{t.handoff.intro2Bold}</b>{t.handoff.intro2Rest}</p>
            </div>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 32, width: "100%", alignItems: "flex-start" }}>
              <img src="/client-acquisition-handoff-illustration.webp" alt="" style={{ height: 550, width: "auto", maxWidth: "100%", display: "block", borderRadius: 24 }} />
              <img src="/client-acquisition-handoff-flow-blurred.webp" alt={t.handoff.blurCaption} style={{ height: 550, width: "auto", maxWidth: "100%", display: "block", borderRadius: 24, border: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
            </div>
          </Reveal>
        </Section>

        <Divider />

        {/* 06 · WYNIK */}
        <Section id="wynik">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.wynik.eyebrow} title={t.wynik.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
                <StaggerItem style={{ flex: "1 1 320px" }}>
                  <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 24, padding: "clamp(24px, 5vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", gap: 32, boxSizing: "border-box", background: "var(--pf-primary-700) url(/client-acquisition-wynik-hero-bg.webp) center / cover no-repeat" }}>
                    <span style={{ fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 8vw, 80px)", lineHeight: "clamp(48px, 9vw, 108px)", letterSpacing: "0.02em", color: "var(--pf-text-on-dark)" }}><AnimatedStat value={t.wynik.heroStat.value} /></span>
                    <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-primary-50)" }}>{t.wynik.heroStat.label}</span>
                  </div>
                </StaggerItem>
                <StaggerItem style={{ flex: "1 1 320px" }}>
                  <StatCard tone="subtle" value={t.wynik.sessionsStat.value} label={t.wynik.sessionsStat.label} style={{ width: "100%", height: "100%" }} />
                </StaggerItem>
                <StaggerItem style={{ flex: "0 1 296px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 24, height: "100%" }}>
                    <StatCard tone="subtle" value={<AnimatedStat value={t.wynik.smallStats[0].value} />} label={t.wynik.smallStats[0].label} style={{ width: "100%" }} />
                    <StatCard tone="subtle" value={<AnimatedStat value={t.wynik.smallStats[1].value} />} label={t.wynik.smallStats[1].label} style={{ width: "100%" }} />
                  </div>
                </StaggerItem>
              </StaggerGroup>
              <span className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{t.wynik.dataCaption}</span>
            </div>
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.wynik.whatItMeansTitle}</h3>
              <p className="pf-body">{t.wynik.para1Pre}<b>{t.wynik.para1Bold}</b>{t.wynik.para1Rest}</p>
              <p className="pf-body"><b>{t.wynik.para2Bold}</b>{t.wynik.para2Rest}</p>
              <p className="pf-body">{t.wynik.para3Pre}<b>{t.wynik.para3Bold}</b>{t.wynik.para3Rest}</p>
              <p className="pf-body">{t.wynik.para4}</p>
            </div>
          </Reveal>
        </Section>

        <Divider />

        {/* 07 · PODSUMOWANIE */}
        <Section id="podsumowanie">
          <Reveal style={{ width: "100%" }}>
            <SectionHeader eyebrow={t.podsumowanie.eyebrow} title={t.podsumowanie.title} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <p className="pf-body">{t.podsumowanie.intro}</p>
          </Reveal>
          <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
            <StaggerItem style={{ flex: "1 1 260px" }}>
              <LessonCard image="/client-acquisition-lesson-devs.webp" title={t.podsumowanie.lessons[0].title}>{t.podsumowanie.lessons[0].text}</LessonCard>
            </StaggerItem>
            <StaggerItem style={{ flex: "1 1 260px" }}>
              <LessonCard image="/client-acquisition-lesson-different.webp" title={t.podsumowanie.lessons[1].title}>{t.podsumowanie.lessons[1].text}</LessonCard>
            </StaggerItem>
          </StaggerGroup>
        </Section>

        <Divider />

        <Section>
          <Reveal style={{ width: "100%" }}>
            <img src="/client-acquisition-thanks-tablet.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <img src="/client-acquisition-thanks-laptop.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
          </Reveal>
          <Reveal style={{ width: "100%" }}>
            <div style={{ position: "relative", width: "100%", aspectRatio: "1200 / 548" }}>
              <img src="/client-acquisition-thanks-phone.webp" alt="" style={{ position: "absolute", left: "0%", top: "0%", width: "31.42%", aspectRatio: "377 / 415", height: "auto", display: "block", borderRadius: 24 }} />
              <img src="/client-acquisition-thanks-laptop-small.webp" alt="" style={{ position: "absolute", left: "36.17%", top: "31.19%", width: "44.92%", aspectRatio: "539 / 377", height: "auto", display: "block", borderRadius: 24 }} />
              <img src="/client-acquisition-thanks-crop.webp" alt="" style={{ position: "absolute", left: "85.33%", top: "20.81%", width: "14.67%", aspectRatio: "1 / 1", height: "auto", display: "block", borderRadius: 24 }} />
            </div>
          </Reveal>
        </Section>

        <Section gap={16} contentStyle={{ alignItems: "center" }}>
          <Reveal style={{ width: "100%" }}>
            <a href="#top" className="pf-h2" style={{ textAlign: "center", color: "var(--pf-text-primary)", textDecoration: "none", display: "block" }}>{t.podsumowanie.nextProjectLabel}</a>
          </Reveal>
        </Section>

      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 128px", boxSizing: "border-box" }}>
        <NextProject currentHref="/case-study/client-acquisition" />
      </div>
      <Contact />
      <Footer />
    </>
  )
}
