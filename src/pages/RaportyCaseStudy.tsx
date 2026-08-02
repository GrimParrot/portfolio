import { useEffect, useState, type ReactNode } from "react"
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
  StatCard, FindingCard, PersonaCard, LessonCard, QuoteBlock, TimelineItem,
  DarkPanel, ProblemStatement, GoalBanner, InlineAlert, HypothesisCard, DecisionCard,
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

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-bold tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

/** Temporary stand-in for the 10 source images that exceeded the design-tool's
 * 256 KiB single-file read cap. Swap for a Figure once the real asset lands. */
function PlaceholderImage({ label, height, width, radius = 0, style }: { label: string; height?: number | string; width?: number | string; radius?: number; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        width: width ?? "100%", height, borderRadius: radius, background: "var(--pf-surface-subtle)",
        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: width ? 0 : undefined,
        boxShadow: "inset 0 0 0 1px var(--pf-border)", boxSizing: "border-box", ...style,
      }}
    >
      <span style={{ fontFamily: "var(--pf-font-body)", fontSize: 13, color: "var(--pf-text-faint)", textAlign: "center", padding: 16 }}>{label}</span>
    </div>
  )
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

/** Duotone feature card template, carried forward from the pre-redesign page for
 * chapter 07 (product walkthrough) — the design system has no coverage for real
 * product screenshots, see docs/DESIGN_SYSTEM.md and the plan note on chapter 07. */
function FeatureCard({ title, desc, img, imgAlt, height = 420 }: { title: string; desc: ReactNode; img: string; imgAlt: string; height?: number }) {
  return (
    <div className="group rounded-3xl overflow-hidden pt-10 px-10" style={{ height, backgroundColor: "#94A3B814" }}>
      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl mt-10 transition-transform duration-500 group-hover:scale-[1.02]" />
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
            <Figure src="/raporty-cover.webp" height={560} alt={t.heroTitle} />
          </StaggerItem>
        </HeroStagger>
      </Section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 120 }}>

        {/* 01 · SKROT */}
        <Reveal>
          <Section variant="subtle" id="skrot" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.skrot.eyebrow} title={t.skrot.title} />
            <p className="pf-body-bold">{t.skrot.intro}</p>
            <DarkPanel title={t.skrot.contextPanel.title} style={{ width: "100%" }}>{t.skrot.contextPanel.text}</DarkPanel>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <h4 className="pf-h4">{t.skrot.statsIntroTitle}</h4>
                <p className="pf-body">{t.skrot.statsIntroDesc}</p>
              </div>
              <StaggerGroup style={{ display: "flex", gap: 24 }}>
                {t.skrot.stats.map((s, i) => (
                  <StaggerItem key={i} style={{ display: "flex", flex: 1 }}>
                    <StatCard tone="white" value={s.value} label={s.label} />
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>
            <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
              <div style={{ flex: 1, borderRadius: 24, background: "#fff", boxShadow: "var(--pf-ring)", padding: 64, display: "flex", flexDirection: "column", gap: 48, boxSizing: "border-box" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <span className="pf-overline" style={{ color: "var(--pf-text-accent)" }}>{t.skrot.roleOverline}</span>
                  <p className="pf-quote">{t.skrot.roleQuote}</p>
                </div>
                <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{t.skrot.roleList.join("\n")}</p>
              </div>
              <DarkPanel style={{ width: 520, flexShrink: 0 }} padding={64} title={t.skrot.scopePanel.title} blocks={t.skrot.scopePanel.blocks} />
            </div>
          </Section>
        </Reveal>

        {/* 02 · PROBLEM */}
        <Reveal>
          <Section id="problem" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.problem.eyebrow} title={t.problem.title} />
            <p className="pf-body-bold" style={{ whiteSpace: "pre-line" }}>{t.problem.intro}</p>
            <div style={{ width: "100%", borderRadius: 32, background: "#fff", boxShadow: "var(--pf-ring)", display: "flex", gap: 80, padding: 64, boxSizing: "border-box" }}>
              <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 className="pf-h3">{t.problem.researchTitle}</h3>
                  <p className="pf-body">{t.problem.researchDesc}</p>
                </div>
                <div style={{ height: 280, borderRadius: 0, background: "url(/raporty-ds-questions.webp) center / cover no-repeat" }} />
              </div>
              <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 48 }}>
                <ul style={{ margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 32 }}>
                  {t.problem.questions.map((q, i) => <TimelineItem key={i} number={i + 1}>{q}</TimelineItem>)}
                </ul>
                <InlineAlert icon="/icons/raporty-ds-alert-triangle.svg">{t.problem.alert}</InlineAlert>
              </div>
            </div>
            <p className="pf-body">{t.problem.closing}</p>
            <ProblemStatement>{t.problem.problemStatement}</ProblemStatement>
          </Section>
        </Reveal>

        {/* 03 · DISCOVERY */}
        <Reveal>
          <Section id="discovery" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.discovery.eyebrow} title={t.discovery.title} />
            <div style={{ display: "flex", gap: 80, width: "100%", alignItems: "flex-start" }}>
              <p className="pf-body" style={{ flexGrow: 1, whiteSpace: "pre-line" }}>{t.discovery.intro1}</p>
              <div style={{ width: 336, flexShrink: 0, display: "flex", gap: 24 }}>
                {t.discovery.stats.map((s, i) => (
                  <StatCard key={i} value={s.value} label={s.label} style={{ padding: 16, gap: 32 }} />
                ))}
              </div>
            </div>
            <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{t.discovery.intro2}</p>
            <div style={{ display: "flex", gap: 80, width: "100%" }}>
              <Figure src="/raporty-ds-badania-3.webp" height={342} />
              <Figure src="/raporty-ds-badania-2.webp" height={342} />
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
              <p className="pf-body-bold">{t.discovery.personaIntro}</p>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center", width: "100%" }}>
              <PlaceholderImage label="persona.png" width={560} height={740} />
              <div style={{ display: "flex", flexDirection: "column", gap: 32, flex: 1 }}>
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
              <PlaceholderImage label="scope.png" height={523} />
              <Figure src="/raporty-ds-jobs-to-be-done.webp" height={523} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.reframing.shiftTitle}</h3>
              <div style={{ display: "flex", gap: 80, alignItems: "stretch" }}>
                <HypothesisCard state="rejected" title={t.reframing.hypothesisRejected.title} status={t.reframing.hypothesisRejected.status}>{t.reframing.hypothesisRejected.text}</HypothesisCard>
                <HypothesisCard title={t.reframing.hypothesisLive.title} status={t.reframing.hypothesisLive.status} note={t.reframing.hypothesisLive.note}>{t.reframing.hypothesisLive.text}</HypothesisCard>
              </div>
            </div>
          </Section>
        </Reveal>
        <GoalBanner>{t.reframing.goal}</GoalBanner>

        {/* 05 · DECYZJE */}
        <Reveal>
          <Section id="decyzje" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.decyzje.eyebrow} title={t.decyzje.title} />
            <DecisionCard
              title={t.decyzje.mainDecision.title}
              arrowIcon="/icons/raporty-ds-arrow-right.svg"
              steps={t.decyzje.mainDecision.steps}
            >
              <PlaceholderImage label="figma.png" height={293} />
            </DecisionCard>
            <div style={{ display: "flex", gap: 24, width: "100%", alignItems: "stretch" }}>
              {t.decyzje.pair.map((d, i) => (
                <DecisionCard key={i} padding={32} style={{ flex: 1 }} title={d.title}>
                  <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{d.text}</p>
                </DecisionCard>
              ))}
            </div>
          </Section>
        </Reveal>

        {/* 06 · HANDOFF */}
        <Reveal>
          <Section id="handoff" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.handoff.eyebrow} title={t.handoff.title} />
            <div style={{ display: "flex", gap: 80, width: "100%", alignItems: "flex-start" }}>
              <p className="pf-body-bold" style={{ flexGrow: 1, whiteSpace: "pre-line" }}>{t.handoff.intro}</p>
              <div style={{ width: 360, height: 280, flexShrink: 0, borderRadius: 0, background: "url(/raporty-ds-handoff.webp) center / cover no-repeat" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
              <h3 className="pf-h3">{t.handoff.infraTitle}</h3>
              <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{t.handoff.infraText}</p>
            </div>
            <div style={{ display: "flex", gap: 80, width: "100%" }}>
              <PlaceholderImage label="maps.png" height={574} />
              <PlaceholderImage label="figma.png" height={574} />
            </div>
          </Section>
        </Reveal>

        {/* 07 · ROZWIAZANIE (product walkthrough, ported from the pre-redesign page) */}
        <Reveal>
          <Section id="rozwiazanie" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.rozwiazanie.eyebrow} title={t.rozwiazanie.title} />
            <div style={{ width: "100%" }}>
              {t.rozwiazanie.steps.map((feature, i) => (
                feature.cards ? (
                  <div key={i} className={`grid grid-cols-1 ${feature.cards.length > 1 ? "md:grid-cols-2" : ""} gap-6 mb-6`}>
                    {feature.cards.map((c, j) => <FeatureCard key={j} {...c} />)}
                  </div>
                ) : (
                  <div key={i} className="rounded-3xl overflow-hidden pt-10 px-10 mb-6" style={{ height: feature.height ?? 700, backgroundColor: "#94A3B814" }}>
                    <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                    <div className="mt-10">
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
                  </div>
                )
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--pf-border)", paddingTop: 32, width: "100%" }}>
              <Tag color="var(--pf-text-muted)">{t.rozwiazanie.rejectedTag}</Tag>
              <div className="flex flex-col divide-y divide-slate-100 mt-4">
                {t.rozwiazanie.rejected.map((r) => (
                  <div key={r.title} className="flex items-start gap-3 py-4">
                    <span className="text-slate-300 font-medium flex-shrink-0 mt-0.5">✕</span>
                    <p className="text-[15px]">
                      <span className="line-through decoration-slate-300 text-slate-400 font-semibold">{r.title}</span>
                      <span className="block text-slate-500 mt-1">{r.reason}</span>
                    </p>
                  </div>
                ))}
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
                <StatCard tone="dark" value={t.wynik.heroStat.value} label={t.wynik.heroStat.label} />
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
              {t.wynik.paras.map((p, i) => <p key={i} className="pf-body">{p}</p>)}
              <QuoteBlock attribution={t.wynik.quoteAttribution}>{t.wynik.quote}</QuoteBlock>
            </div>
          </Section>
        </Reveal>

        <Divider />

        {/* 09 · PODSUMOWANIE */}
        <Reveal>
          <Section id="podsumowanie" style={{ scrollMarginTop: 80 }}>
            <SectionHeader eyebrow={t.podsumowanie.eyebrow} title={t.podsumowanie.title} />
            <p className="pf-body">{t.podsumowanie.intro}</p>
            <StaggerGroup style={{ display: "flex", gap: 24, width: "100%" }}>
              <StaggerItem style={{ display: "flex", flex: 1 }}>
                <LessonCard title={t.podsumowanie.lessons[0].title}>
                  {t.podsumowanie.lessons[0].text}
                </LessonCard>
              </StaggerItem>
              <StaggerItem style={{ display: "flex", flex: 1 }}>
                <LessonCard title={t.podsumowanie.lessons[1].title}>
                  {t.podsumowanie.lessons[1].text}
                </LessonCard>
              </StaggerItem>
            </StaggerGroup>
            <PlaceholderImage label="thanks.png" height={700} />
            <div style={{ display: "flex", gap: 48, width: "100%" }}>
              <PlaceholderImage label="for.png" height={403} />
              <PlaceholderImage label="watching.png" height={403} />
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
