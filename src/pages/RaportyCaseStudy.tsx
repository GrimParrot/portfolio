import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion, type TargetAndTransition } from "motion/react"
import { ArrowLeft } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"
import { copy } from "@/copy/raporty.copy"
import "@/styles/raporty-ds.css"
import {
  CaseStudyHero, MetaBar, Section, SectionHeader, Divider, Figure,
  StatCard, FindingCard, PersonaCard, QuoteBlock, TimelineItem,
  ProblemStatement, GoalBanner, InlineAlert, HypothesisCard,
  LessonCard,
} from "@/components/raporty-ds"

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

function StaggerGroup({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      style={style}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerParent}
    >
      {children}
    </motion.div>
  )
}

function StaggerItem({ children, style, whileHover }: { children: React.ReactNode; style?: React.CSSProperties; whileHover?: TargetAndTransition }) {
  return (
    <motion.div style={style} variants={fadeUp} whileHover={whileHover}>
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
          onClick={() => smoothScrollTo(`#${c.id}`)}
          className="group relative flex items-center justify-center w-4 h-4"
          aria-label={c.label}
        >
          <span
            className="rounded-full transition-all duration-300"
            style={{
              width: active === c.id ? 8 : 6,
              height: active === c.id ? 8 : 6,
              backgroundColor: active === c.id ? "var(--pf-accent-500)" : "#CBD5E1",
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

/** Numbered accent-chip list item, matches the design system's inline numbering pattern
 * (same visual as TimelineItem but a plain ordinal, used outside <ul> contexts too). */
function NumberedRow({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li style={{ listStyle: "none", display: "flex", gap: 24, alignItems: "flex-start" }}>
      <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", background: "var(--pf-surface-accent)", display: "flex", justifyContent: "center", alignItems: "center", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-text-accent)" }}>{n}</span>
      <span style={{ flexGrow: 1, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{children}</span>
    </li>
  )
}

/** Bordered image-over-text card used throughout chapter 07 (Rozwiazanie). */
function ShotCard({ img, alt, title, text, flex, imgStyle }: { img: string; alt: string; title: string; text: string; flex?: boolean; imgStyle?: React.CSSProperties }) {
  return (
    <div style={{ flex: flex ? 1 : undefined, minWidth: 0, border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <img src={img} alt={alt} style={{ width: "100%", height: "auto", display: "block", borderBottom: "1px solid var(--pf-accent-100, #E3E9FE)", ...imgStyle }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box", flex: 1 }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{title}</span>
        <p className="pf-body" style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

export function RaportyCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "skrot", label: t.chapters.skrot },
    { id: "problem", label: t.chapters.problem },
    { id: "discovery", label: t.chapters.discovery },
    { id: "reframing", label: t.chapters.reframing },
    { id: "decyzje", label: t.chapters.decyzje },
    { id: "handoff", label: t.chapters.handoff },
    { id: "rozwiazanie", label: t.chapters.rozwiazanie },
    { id: "wynik", label: t.chapters.wynik },
    { id: "podsumowanie", label: t.chapters.podsumowanie },
  ]

  return (
    <div id="top" className="min-h-screen bg-white">
      <Navbar />
      <ProgressRail chapters={chapters} />

      {/* HERO */}
      <Section gap={80} style={{ paddingTop: 160, paddingLeft: 24, paddingRight: 24, scrollMarginTop: 80 }}>
        <HeroStagger>
          <StaggerItem>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                onClick={() => setTimeout(() => smoothScrollTo("#projects"), 100)}
                aria-label={lang === "pl" ? "Wróć do portfolio" : "Back to portfolio"}
                className="inline-flex items-center justify-center w-8 h-8 rounded-xl border border-slate-200 text-[#0F172A] flex-shrink-0 hover:border-slate-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </Link>
              <span className="pf-eyebrow" style={{ color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
            </div>
          </StaggerItem>
          <StaggerItem style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 80 }}>
            <CaseStudyHero
              title={<>{t.heroTitle} <span style={{ color: "var(--pf-accent-500)" }}>{t.heroTitleAccent}</span></>}
              lead={t.heroLead}
            />
            <MetaBar items={t.metaBar} />
            <img src="/raporty-ds-cover.webp" alt={t.heroTitle} style={{ width: "100%", height: "auto", display: "block" }} />
          </StaggerItem>
        </HeroStagger>
      </Section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 120 }}>

        {/* 01 · SKROT */}
        <Reveal>
          <Section variant="subtle" id="skrot" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.skrot.eyebrow} title={t.skrot.title} />
            <p className="pf-body-bold"><span style={{ fontWeight: "normal" }}><b style={{ color: "#0A0A0A" }}>{t.skrot.introBold}</b>{t.skrot.introRest}</span></p>
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 24, width: "100%", boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-2.webp) center / cover no-repeat", display: "flex", flexDirection: "column", gap: 16, padding: 48 }}>
              <h4 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 600, fontSize: 24, lineHeight: "37px", color: "var(--pf-text-on-dark)" }}>{t.skrot.contextPanel.title}</h4>
              <p style={{ margin: 0, whiteSpace: "pre-line", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-on-dark-body)" }}>{t.skrot.contextPanel.text}<b>{t.skrot.contextPanel.textBold}</b></p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 className="pf-h4" style={{ color: "#0A0A0A" }}>{t.skrot.statsIntroTitle}</h4>
                <p className="pf-body">{t.skrot.statsIntroDesc}</p>
              </div>
              <StaggerGroup style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
                {t.skrot.stats.map((s, i) => (
                  <StaggerItem key={i} style={{ display: "flex", flex: 1 }}>
                    <StatCard tone="white" value={s.value} label={s.label} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
            <div style={{ width: "100%", position: "relative", paddingBottom: 200, boxSizing: "border-box" }}>
              <div style={{ width: "100%", borderRadius: 24, background: "#fff", boxShadow: "var(--pf-ring)", padding: 64, display: "flex", flexDirection: "column", gap: 48, boxSizing: "border-box" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 940 }}>
                  <span className="pf-overline" style={{ color: "var(--pf-text-accent)" }}>{t.skrot.roleOverline}</span>
                  <p className="pf-quote">{t.skrot.roleQuote}</p>
                </div>
                <div style={{ display: "flex", gap: 48, alignItems: "flex-start", width: "100%" }}>
                  <ul className="pf-body" style={{ margin: 0, padding: "0 0 0 20px", listStyle: "disc", flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 0 }}>
                    {t.skrot.roleList.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  <div style={{ width: "50%", flexShrink: 0, marginBottom: -200, overflow: "hidden", borderRadius: 24, boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-1.webp) center / cover no-repeat", display: "flex", flexDirection: "column", gap: 32, padding: 48 }}>
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
          </Section>
        </Reveal>

        {/* 02 · PROBLEM */}
        <Reveal>
          <Section id="problem" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} />
            <p className="pf-body-bold" style={{ whiteSpace: "pre-line", color: "#0A0A0A" }}>
              <b style={{ color: "#0A0A0A" }}>{t.problem.introBold}</b>
              <span style={{ fontWeight: "normal", color: "var(--pf-text-body)" }}>
                {t.problem.introRest}
                <b style={{ color: "#0A0A0A" }}>{t.problem.introBold2}</b>
                {t.problem.introRest2}
              </span>
            </p>
            <div style={{ width: "100%", borderRadius: 32, background: "#fff", boxShadow: "var(--pf-ring)", display: "flex", gap: 80, padding: 64, boxSizing: "border-box" }}>
              <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 className="pf-h3">{t.problem.researchTitle}</h3>
                  <p className="pf-body">{t.problem.researchDesc}</p>
                </div>
                <div style={{ height: 280, background: "url(/raporty-ds-questions.webp) center / cover no-repeat" }} />
              </div>
              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 48 }}>
                <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                  {t.problem.questions.map((q, i) => <TimelineItem key={i} number={i + 1}>{q}</TimelineItem>)}
                </ul>
                <InlineAlert icon="/icons/raporty-ds-warning.svg">{t.problem.alert}</InlineAlert>
              </div>
            </div>
            <p className="pf-body">{t.problem.closingLead}<b>{t.problem.closingBold}</b></p>
            <ProblemStatement>
              <span style={{ fontWeight: 400, color: "var(--pf-text-accent-deep)" }}>
                {t.problem.problemStatement}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.problem.problemStatementBold1}</b>{t.problem.problemStatementMid1}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.problem.problemStatementBold2}</b>{t.problem.problemStatementMid2}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.problem.problemStatementBold3}</b>{t.problem.problemStatementRest}
              </span>
            </ProblemStatement>
          </Section>
        </Reveal>

        {/* 03 · DISCOVERY */}
        <Reveal>
          <Section id="discovery" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.discovery.eyebrow} title={t.discovery.title} />
            <div style={{ display: "flex", gap: 80, width: "100%", alignItems: "flex-start" }}>
              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 30 }}>
                <p className="pf-body" style={{ margin: 0 }}>{t.discovery.intro1Pre}<b>{t.discovery.intro1Bold}</b>{t.discovery.intro1Rest}</p>
                <p className="pf-body" style={{ margin: 0 }}>{t.discovery.intro2Pre}<b>{t.discovery.intro2Bold}</b>{t.discovery.intro2Rest}</p>
              </div>
              <div style={{ width: 336, flexShrink: 0, display: "flex", gap: 24, alignItems: "flex-start" }}>
                {t.discovery.stats.map((s, i) => (
                  <StatCard key={i} value={s.value} label={s.label} style={{ padding: 16, gap: 32 }} />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%" }}>
              <p className="pf-body" style={{ margin: 0 }}><b>{t.discovery.intro3Bold}</b>{t.discovery.intro3Rest}</p>
              <p className="pf-body" style={{ margin: 0 }}>{t.discovery.intro4}</p>
            </div>
            <div style={{ display: "flex", gap: 80, width: "100%" }}>
              <Figure src="/raporty-ds-badania-3.webp" />
              <Figure src="/raporty-ds-badania-2.webp" />
            </div>
          </Section>
        </Reveal>
        <Reveal>
          <Section variant="dark" gap={48}>
            <h3 className="pf-h3" style={{ color: "var(--pf-text-on-dark)" }}>{t.discovery.findingsTitle}</h3>
            <StaggerGroup style={{ display: "flex", gap: 24, width: "100%" }}>
              {t.discovery.findings.map((f) => (
                <StaggerItem key={f.number} style={{ display: "flex", flex: 1 }}>
                  <FindingCard number={f.number} title={f.title}>{f.text}</FindingCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </Section>
        </Reveal>
        <Reveal>
          <Section gap={64} contentStyle={{ alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.discovery.personaTitle}</h3>
              <p className="pf-body"><b>{t.discovery.personaIntroBold}</b>{t.discovery.personaIntroRest}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
              <div style={{ width: 560, height: 740, flexShrink: 0, marginRight: -80, background: "url(/raporty-ds-persona.webp) center / contain no-repeat" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1, maxWidth: 510 }}>
                {t.discovery.personaCards.map((p, i) => (
                  <PersonaCard key={i} title={p.title}>{p.text}</PersonaCard>
                ))}
              </div>
            </div>
          </Section>
        </Reveal>

        <Divider />

        {/* 04 · REFRAMING */}
        <Reveal>
          <Section id="reframing" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.reframing.eyebrow} title={t.reframing.title} />
            <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{t.reframing.text}</p>
            <div style={{ display: "flex", gap: 80, width: "100%" }}>
              <Figure src="/raporty-ds-scope.webp" />
              <Figure src="/raporty-ds-jobs-to-be-done.webp" />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.reframing.shiftTitle}</h3>
              <div style={{ display: "flex", alignItems: "stretch" }}>
                <HypothesisCard state="rejected" title={t.reframing.hypothesisRejected.title} status={t.reframing.hypothesisRejected.status} style={{ flex: 1 }}>{t.reframing.hypothesisRejected.text}</HypothesisCard>
                <img src="/icons/raporty-ds-arrow-blue.svg" alt="" style={{ width: 96, height: 96, flexShrink: 0, margin: "auto -20px", position: "relative", zIndex: 1 }} />
                <HypothesisCard title={t.reframing.hypothesisLive.title} status={t.reframing.hypothesisLive.status} note={t.reframing.hypothesisLive.note} style={{ flex: 1 }}>{t.reframing.hypothesisLive.text}</HypothesisCard>
              </div>
            </div>
          </Section>
        </Reveal>
        <GoalBanner>
          <span style={{ fontWeight: 400, color: "var(--pf-text-accent-deep)" }}>
            {t.reframing.goalLabel}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.reframing.goalBold1}</b>{t.reframing.goalMid}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.reframing.goalBold2}</b>{t.reframing.goalEnd}
          </span>
        </GoalBanner>

        {/* 05 · DECYZJE */}
        <Reveal>
          <Section id="decyzje" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.decyzje.eyebrow} title={t.decyzje.title} />
            <div style={{ width: "100%", marginBottom: -56, borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 48, display: "flex", flexDirection: "column", gap: 64, boxSizing: "border-box" }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.decyzje.mainDecision.title}</span>
              <img src="/raporty-ds-flow.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
              <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000" }}>{t.decyzje.mainDecision.steps[0].label}</span>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{t.decyzje.mainDecision.steps[0].text}</span>
                </div>
                <img src="/icons/raporty-ds-arrow-step.svg" alt="" width={24} height={24} style={{ flexShrink: 0, marginTop: 6 }} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000" }}>{t.decyzje.mainDecision.steps[1].label}</span>
                  <ul style={{ margin: 0, padding: "0 0 0 20px", listStyle: "disc", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>
                    {t.decyzje.mainDecision.steps[1].bullets?.map((b, i) => <li key={i}>{b.text}{b.bold && <b>{b.bold}</b>}</li>)}
                  </ul>
                </div>
                <img src="/icons/raporty-ds-arrow-step.svg" alt="" width={24} height={24} style={{ flexShrink: 0, marginTop: 6 }} />
                <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "30px", color: "#000" }}>{t.decyzje.mainDecision.steps[2].label}</span>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>{t.decyzje.mainDecision.steps[2].text}</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
              {t.decyzje.pair.map((d, i) => (
                <div key={i} style={{ flex: 1, minWidth: 0, borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 32, display: "flex", flexDirection: "column", gap: 64, boxSizing: "border-box" }}>
                  <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
                    <span style={{ flex: 1, minWidth: 0, whiteSpace: "pre-line", fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{d.title}</span>
                    <img src={d.image} alt="" style={{ width: 160, flexShrink: 0, height: "auto", display: "block", borderRadius: 16 }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
                    <p className="pf-body" style={{ margin: 0 }}>{d.text1}{d.text1Bold && <b>{d.text1Bold}</b>}</p>
                    <p className="pf-body" style={{ margin: 0 }}><b>{d.text2Bold}</b><br />{d.text2}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.decyzje.builtTitle}</h3>
              <p className="pf-body" style={{ margin: 0 }}>{t.decyzje.builtText}</p>
              <div style={{ width: "100%", borderRadius: 24, background: "var(--pf-surface-accent)", padding: 48, boxSizing: "border-box" }}>
                <div style={{ width: "100%", height: 540, borderRadius: 12, background: "var(--pf-accent-50)", boxShadow: "inset 0 0 0 1px var(--pf-accent-100)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontSize: 14, color: "var(--pf-text-accent-deep)" }}>{t.decyzje.kreatorPlaceholder}</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.decyzje.testsTitle}</h3>
              <p className="pf-body" style={{ margin: 0 }}>{t.decyzje.testsText}</p>
              <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                {t.decyzje.testsQuestions.map((q, i) => <NumberedRow key={i} n={i + 1}>{q}</NumberedRow>)}
              </ul>
              <div style={{ width: "100%", borderRadius: 24, background: "var(--pf-surface-card-subtle)", overflow: "hidden", boxSizing: "border-box" }}>
                <img src="/raporty-ds-reports-manager.webp" alt="Manager raportów" style={{ width: "100%", height: "auto", display: "block" }} />
              </div>
              <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "flex-start" }}>
                {t.decyzje.testsFindings.map((f, i) => (
                  <div key={i} style={{ flex: 1, minWidth: 0, borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 32, display: "flex", flexDirection: "column", gap: 24, boxSizing: "border-box" }}>
                    <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{f.title}</span>
                    <p className="pf-body" style={{ margin: 0 }}>{f.text1}</p>
                    {f.text2 && <p className="pf-body" style={{ margin: 0 }}>{f.text2}</p>}
                  </div>
                ))}
              </div>
              <p className="pf-body" style={{ margin: 0 }}>{t.decyzje.testsClosing}</p>
            </div>
          </Section>
        </Reveal>

        {/* 06 · HANDOFF */}
        <Reveal>
          <Section id="handoff" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.handoff.eyebrow} title={t.handoff.title} />
            <div style={{ display: "flex", gap: 80, width: "100%", alignItems: "flex-start" }}>
              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 30 }}>
                <p className="pf-body" style={{ margin: 0 }}>{t.handoff.introPre}<b>{t.handoff.introBold}</b>{t.handoff.introMid}<b>{t.handoff.introBold2}</b>{t.handoff.introRest}</p>
                <p className="pf-body" style={{ margin: 0 }}>{t.handoff.intro2Pre}<b>{t.handoff.intro2Bold}</b>{t.handoff.intro2Rest}</p>
              </div>
              <div style={{ width: 360, height: 280, flexShrink: 0, background: "url(/raporty-ds-handoff.webp) center / cover no-repeat" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.handoff.infraTitle}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 30, width: "100%" }}>
                <p className="pf-body" style={{ margin: 0 }}>{t.handoff.infraText1}</p>
                <p className="pf-body" style={{ margin: 0 }}>{t.handoff.infraText2}</p>
              </div>
            </div>
            <div style={{ display: "flex", gap: 80, width: "100%" }}>
              <Figure src="/raporty-ds-maps.webp" />
              <Figure src="/raporty-ds-figma.webp" />
            </div>
          </Section>
        </Reveal>

        <Divider />

        {/* 07 · ROZWIAZANIE */}
        <Reveal>
          <Section id="rozwiazanie" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.rozwiazanie.eyebrow} title={t.rozwiazanie.title} />
            <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.intro}</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.rozwiazanie.s1Title}</h3>
              <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                <div style={{ overflow: "hidden", width: "100%", borderBottom: "1px solid var(--pf-accent-100, #E3E9FE)" }}>
                  <img src="/raporty-ds-lista-raportow.webp" alt="Lista raportów wizytówki" style={{ width: "calc(100% + 24px)", height: "auto", display: "block", margin: "-12px -12px 0" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box" }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.rozwiazanie.s1CardTitle}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s1CardText}</p>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.rozwiazanie.s2Title}</h3>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s2Text}</p>
              <img src="/raporty-ds-raport-full.webp" alt="Raport — widok desktop i mobile" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
              <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
                <ShotCard flex img="/raporty-ds-ustawienia.webp" alt="Wybór sekcji i ustawienia raportu" title={t.rozwiazanie.s2Pair[0].title} text={t.rozwiazanie.s2Pair[0].text} />
                <ShotCard flex img="/raporty-ds-auto-report.webp" alt="Ustawianie reguł auto-raportu" title={t.rozwiazanie.s2Pair[1].title} text={t.rozwiazanie.s2Pair[1].text} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.rozwiazanie.s3Title}</h3>
              <div style={{ width: "100%", border: "1px solid var(--pf-accent-100, #E3E9FE)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
                <img src="/raporty-ds-reports-manager-full.webp" alt="Reports manager — portfolio wizytówek" style={{ width: "100%", height: "auto", display: "block", borderBottom: "1px solid var(--pf-accent-100, #E3E9FE)" }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box" }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "#000" }}>{t.rozwiazanie.s3CardTitle}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s3CardText}</p>
                </div>
              </div>
              <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
                <ShotCard flex img="/raporty-ds-statusy.webp" alt="Statusy raportów" title={t.rozwiazanie.s3Pair[0].title} text={t.rozwiazanie.s3Pair[0].text} />
                <ShotCard flex img="/raporty-ds-bulk-action.webp" alt="Akcja zbiorcza" title={t.rozwiazanie.s3Pair[1].title} text={t.rozwiazanie.s3Pair[1].text} />
              </div>
              <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
                <ShotCard flex img="/raporty-ds-share.webp" alt="Menu udostępniania raportu" title={t.rozwiazanie.s3Triple[0].title} text={t.rozwiazanie.s3Triple[0].text} />
                <ShotCard flex img="/raporty-ds-email-settings.webp" alt="Ustawienia e-mail" title={t.rozwiazanie.s3Triple[1].title} text={t.rozwiazanie.s3Triple[1].text} />
                <ShotCard flex img="/raporty-ds-email-send.webp" alt="Wysyłka raportu mailem" title={t.rozwiazanie.s3Triple[2].title} text={t.rozwiazanie.s3Triple[2].text} />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.rozwiazanie.s4Title}</h3>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s4Text}</p>
              <img src="/raporty-ds-komponenty.webp" alt="Komponenty i stany" style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: 24, width: "100%" }}>
                <img src="/raporty-ds-alert-spec.webp" alt="Alert — dokumentacja komponentu" style={{ gridColumn: 1, gridRow: 1, width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 24 }} />
                <img src="/raporty-ds-stany.webp" alt="Stany: ładowanie, sukces, błąd, empty state" style={{ gridColumn: 1, gridRow: 2, width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 24 }} />
                <img src="/raporty-ds-wariant-maila.webp" alt="Warianty ustawień e-mail" style={{ gridColumn: 2, gridRow: "1 / span 2", width: "100%", height: "100%", objectFit: "cover", display: "block", borderRadius: 24 }} />
              </div>
            </div>
          </Section>
        </Reveal>

        <Divider />

        {/* 08 · WYNIK */}
        <Reveal>
          <Section id="wynik" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.wynik.eyebrow} title={t.wynik.title} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
                <div style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", borderRadius: 24, padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", gap: 32, boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-3.webp) center / cover no-repeat" }}>
                  <span style={{ fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: 80, lineHeight: "108px", letterSpacing: "0.02em", color: "var(--pf-text-on-dark)" }}>{t.wynik.heroStat.value}</span>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-primary-50)" }}>{t.wynik.heroStat.label}</span>
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
                  <div style={{ display: "flex", gap: 24 }}>
                    <StatCard value={t.wynik.smallStats[0].value} label={t.wynik.smallStats[0].label} />
                    <StatCard value={t.wynik.smallStats[1].value} label={t.wynik.smallStats[1].label} />
                  </div>
                  <div style={{ display: "flex", gap: 24 }}>
                    <StatCard value={t.wynik.smallStats[2].value} label={t.wynik.smallStats[2].label} />
                    <StatCard value={t.wynik.smallStats[3].value} label={t.wynik.smallStats[3].label} />
                  </div>
                </div>
              </div>
              <span className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{t.wynik.dataCaption}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.wynik.whatItMeansTitle}</h3>
              <p className="pf-body">{t.wynik.para1}<b>{t.wynik.para1Bold}</b></p>
              <p className="pf-body">{t.wynik.para2}<b>{t.wynik.para2Bold}</b>{t.wynik.para2Rest}</p>
              <p className="pf-body">{t.wynik.para3}<b>{t.wynik.para3Bold}</b>{t.wynik.para3Rest}</p>
              <QuoteBlock attribution={t.wynik.quoteAttribution}>
                {t.wynik.quotePre}<span style={{ color: "var(--pf-text-accent)" }}>{t.wynik.quoteAccent1}</span>{t.wynik.quoteMid}<span style={{ color: "var(--pf-text-accent)" }}>{t.wynik.quoteAccent2}</span>{t.wynik.quoteEnd}
              </QuoteBlock>
            </div>
          </Section>
        </Reveal>

        <Divider />

        {/* 09 · PODSUMOWANIE */}
        <Reveal>
          <Section id="podsumowanie" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.podsumowanie.eyebrow} title={t.podsumowanie.title} />
            <p className="pf-body">{t.podsumowanie.intro}</p>
            <StaggerGroup style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
              <StaggerItem style={{ display: "flex", flex: 1 }}>
                <LessonCard image="/raporty-ds-nie-wiem.webp" title={t.podsumowanie.lessons[0].title}>{t.podsumowanie.lessons[0].text}</LessonCard>
              </StaggerItem>
              <StaggerItem style={{ display: "flex", flex: 1 }}>
                <LessonCard image="/raporty-ds-teamwork.webp" title={t.podsumowanie.lessons[1].title}>{t.podsumowanie.lessons[1].text}</LessonCard>
              </StaggerItem>
            </StaggerGroup>
            <img src="/raporty-ds-thanks.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, width: "100%", alignItems: "start" }}>
              <img src="/raporty-ds-for.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
              <img src="/raporty-ds-watching.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
          </Section>
        </Reveal>
        <Section gap={16} contentStyle={{ alignItems: "center" }} style={{ paddingBottom: 160 }}>
          <a href="#top" className="pf-h2" style={{ textAlign: "center", color: "var(--pf-text-primary)", textDecoration: "none" }}>{t.podsumowanie.nextProjectLabel}</a>
        </Section>

        <NextProject currentHref="/case-study/raporty" />
      </div>

      <Contact />
      <Footer />
    </div>
  )
}
