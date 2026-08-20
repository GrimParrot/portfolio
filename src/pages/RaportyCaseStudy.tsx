import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/raporty.copy"
import "@/styles/raporty-ds.css"
import { Badge } from "@/components/ui/badge"
import { ChapterRail } from "@/components/ChapterRail"
import {
  MetaBar, Section, SectionHeader, Divider,
  StatCard, FindingCard, PersonaCard,
  ProblemStatement, GoalBanner, HypothesisCard,
  LessonCard,
} from "@/components/raporty-ds"

const CHAPTER_IDS = ["kontekst", "discovery", "reframing", "rozwiazanie", "decyzje", "wynik", "podsumowanie"] as const

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

/** Bordered image-over-text card used throughout chapter 04 (Rozwiazanie). */
function ShotCard({ img, alt, title, text }: { img: string; alt: string; title: string; text: string }) {
  return (
    <div style={{ flex: 1, minWidth: 0, border: "1px solid var(--pf-accent-100)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
      <img src={img} alt={alt} style={{ width: "100%", height: "auto", display: "block", borderBottom: "1px solid var(--pf-accent-100)" }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box", flex: 1 }}>
        <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{title}</span>
        <p className="pf-body" style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

/** Text-only card — the shape the decisions chapter uses for findings that carry
 * no screenshot of their own. */
function TextCard({ title, text }: { title: string; text: string }) {
  return (
    <div style={{ width: "100%", height: "100%", borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 32, display: "flex", flexDirection: "column", gap: 24, boxSizing: "border-box" }}>
      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{title}</span>
      <p className="pf-body" style={{ margin: 0 }}>{text}</p>
    </div>
  )
}

export function RaportyCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = CHAPTER_IDS.map((id) => ({ id, label: t.chapters[id] }))

  return (
    // No fixed navbar left to clear, so the top reserve drops from
    // clamp(96px, 14vw, 160px) to about the breathing room Banneroza has.
    <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

      <ChapterRail chapters={chapters} topOffset={24} />

      {/* HERO */}
      <Section gap={80}>
        <HeroStagger style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%" }}>
          <StaggerItem style={{ width: "100%" }}>
            {/* Eyebrow and title are one unit, 24px apart. Tags and lead then sit
                40px below it and below each other — the hero has its own rhythm,
                tighter than the 80px between hero blocks. */}
            <header style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", padding: 0, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 10vw, 126px)", lineHeight: "clamp(44px, 10.5vw, 136px)", letterSpacing: "0em", color: "var(--pf-text-primary)", textWrap: "pretty" }}>
                  {t.heroTitle}
                </h1>
              </div>
              <div className="flex flex-wrap gap-2">
                {t.heroTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.heroLead}</p>
            </header>
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <MetaBar items={t.metaBar} />
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <img src="/raporty-ds-cover.webp" alt={t.heroTitle} style={{ width: "100%", height: "auto", display: "block" }} />
          </StaggerItem>
        </HeroStagger>
      </Section>

      {/* 01 · KONTEKST */}
      <Section variant="subtle" id="kontekst">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={t.kontekst.eyebrow} title={t.kontekst.title} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <p className="pf-body">
            {t.kontekst.introPre}
            <b style={{ color: "var(--pf-primary-900)" }}>{t.kontekst.introBold}</b>
            {t.kontekst.introRest}
          </p>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <ProblemStatement tone="dark" label={t.kontekst.problemLabel}>
            <span style={{ fontWeight: 400 }}>
              {t.kontekst.problemStatement}<b style={{ fontWeight: 700, color: "var(--pf-text-on-dark)" }}>{t.kontekst.problemStatementBold1}</b>{t.kontekst.problemStatementMid1}<b style={{ fontWeight: 700, color: "var(--pf-text-on-dark)" }}>{t.kontekst.problemStatementBold2}</b>{t.kontekst.problemStatementMid2}<b style={{ fontWeight: 700, color: "var(--pf-text-on-dark)" }}>{t.kontekst.problemStatementBold3}</b>{t.kontekst.problemStatementRest}
            </span>
          </ProblemStatement>
        </Reveal>
      </Section>

      {/* 02 · DISCOVERY */}
      <Section id="discovery">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={t.discovery.eyebrow} title={t.discovery.title} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, width: "100%", alignItems: "flex-start" }}>
            <p className="pf-body" style={{ margin: 0, flex: "1 1 260px" }}>{t.discovery.introLead}<b>{t.discovery.introBold}</b></p>
            <StaggerGroup style={{ flex: "2 1 420px", display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
              {t.discovery.stats.map((s, i) => (
                <StaggerItem key={i} style={{ flex: "1 1 140px" }}>
                  <StatCard value={s.value} label={s.label} style={{ width: "100%", height: "100%", padding: 24, gap: 48 }} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <p className="pf-body" style={{ margin: 0 }}>{t.discovery.aiPre}<b>{t.discovery.aiBold1}</b>{t.discovery.aiMid}<b>{t.discovery.aiBold2}</b>{t.discovery.aiRest}</p>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          {/* One crop box per artefact rather than three natural aspect ratios:
              the user-stories board is far wider than the survey and the matrix,
              so left to themselves the three columns end at different heights. */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%" }}>
            {["/raporty-ds-badania-3.webp", "/raporty-ds-badania-2.webp", "/raporty-user-stories.webp"].map((src) => (
              <div key={src} style={{ flex: "1 1 240px", aspectRatio: "1000 / 611", borderRadius: 16, background: `url(${src}) center / cover no-repeat` }} />
            ))}
          </div>
        </Reveal>
      </Section>

      <Section variant="dark" gap={48}>
        <Reveal style={{ width: "100%" }}>
          <h3 className="pf-h3" style={{ color: "var(--pf-text-on-dark)" }}>{t.discovery.findingsTitle}</h3>
        </Reveal>
        <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
          {t.discovery.findings.map((f) => (
            <StaggerItem key={f.number} style={{ flex: "1 1 240px" }}>
              <FindingCard number={f.number} title={f.title} style={{ width: "100%", height: "100%", boxSizing: "border-box" }}>{f.text}</FindingCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section gap={64} contentStyle={{ alignItems: "center" }}>
        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
            <h3 className="pf-h3">{t.discovery.personaTitle}</h3>
            <p className="pf-body"><b>{t.discovery.personaIntroBold}</b>{t.discovery.personaIntroRest}</p>
          </div>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", width: "100%" }}>
            <div style={{ flex: "1 1 280px", maxWidth: 560, aspectRatio: "560 / 740", marginRight: "clamp(-80px, -6.67vw, 0px)", background: "url(/raporty-ds-persona.webp) center / contain no-repeat" }} />
            <StaggerGroup style={{ display: "flex", flexDirection: "column", gap: 32, flex: "1 1 280px", maxWidth: 510 }}>
              {t.discovery.personaCards.map((p, i) => (
                <StaggerItem key={i}>
                  <PersonaCard title={p.title}>{p.text}</PersonaCard>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 03 · RE-FRAMING */}
      <Section id="reframing">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={t.reframing.eyebrow} title={t.reframing.title} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <p className="pf-body" style={{ whiteSpace: "pre-line" }}>{t.reframing.text}</p>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "stretch", justifyContent: "center" }}>
            <HypothesisCard state="rejected" title={t.reframing.hypothesisRejected.title} status={t.reframing.hypothesisRejected.status} style={{ flex: "1 1 280px" }}>
              <span style={{ whiteSpace: "pre-line" }}>{t.reframing.hypothesisRejected.text}</span>
            </HypothesisCard>
            <img src="/icons/raporty-ds-arrow-blue.svg" alt="" style={{ width: 96, height: 96, flexShrink: 0, margin: "auto clamp(-20px, -2vw, 0px)", position: "relative", zIndex: 1 }} />
            <HypothesisCard title={t.reframing.hypothesisLive.title} status={t.reframing.hypothesisLive.status} note={t.reframing.hypothesisLive.note} style={{ flex: "1 1 280px" }}>{t.reframing.hypothesisLive.text}</HypothesisCard>
          </div>
        </Reveal>
      </Section>

      <Reveal style={{ width: "100%" }}>
        <GoalBanner>
          <span style={{ fontWeight: 400, color: "var(--pf-text-accent-deep)" }}>
            {t.reframing.goalLabel}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.reframing.goalBold1}</b>{t.reframing.goalMid}<b style={{ fontWeight: 700, color: "var(--pf-text-accent-deep)" }}>{t.reframing.goalBold2}</b>{t.reframing.goalEnd}
          </span>
        </GoalBanner>
      </Reveal>

      {/* 04 · ROZWIAZANIE */}
      <Section id="rozwiazanie">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={t.rozwiazanie.eyebrow} title={t.rozwiazanie.title} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.intro}</p>
        </Reveal>

        <Reveal style={{ width: "100%" }}>
          <div style={{ width: "100%", border: "1px solid var(--pf-accent-100)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
            <div style={{ overflow: "hidden", width: "100%", borderBottom: "1px solid var(--pf-accent-100)" }}>
              <img src="/raporty-ds-lista-raportow.webp" alt={t.rozwiazanie.s1CardTitle} style={{ width: "calc(100% + 24px)", height: "auto", display: "block", margin: "-12px -12px 0" }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box" }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{t.rozwiazanie.s1CardTitle}</span>
              <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s1CardText}</p>
            </div>
          </div>
        </Reveal>

        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
            <h3 className="pf-h3">{t.rozwiazanie.s2Title}</h3>
            <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s2Text}</p>
            <img src="/raporty-ds-raport-full.webp" alt={t.rozwiazanie.s2Title} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
              <StaggerItem style={{ flex: "1 1 260px" }}>
                <ShotCard img="/raporty-ds-ustawienia.webp" alt={t.rozwiazanie.s2Pair[0].title} title={t.rozwiazanie.s2Pair[0].title} text={t.rozwiazanie.s2Pair[0].text} />
              </StaggerItem>
              <StaggerItem style={{ flex: "1 1 260px" }}>
                <ShotCard img="/raporty-ds-auto-report.webp" alt={t.rozwiazanie.s2Pair[1].title} title={t.rozwiazanie.s2Pair[1].title} text={t.rozwiazanie.s2Pair[1].text} />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Reveal>

        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
            <h3 className="pf-h3">{t.rozwiazanie.s3Title}</h3>
            <div style={{ width: "100%", border: "1px solid var(--pf-accent-100)", borderRadius: 24, overflow: "hidden", boxSizing: "border-box", display: "flex", flexDirection: "column" }}>
              <img src="/raporty-ds-reports-manager-full.webp" alt={t.rozwiazanie.s3Title} style={{ width: "100%", height: "auto", display: "block", borderBottom: "1px solid var(--pf-accent-100)" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 16, padding: 32, boxSizing: "border-box" }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{t.rozwiazanie.s3CardTitle}</span>
                <p className="pf-body" style={{ margin: 0 }}>{t.rozwiazanie.s3CardText}</p>
              </div>
            </div>
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
              <StaggerItem style={{ flex: "1 1 260px" }}>
                <ShotCard img="/raporty-ds-statusy.webp" alt={t.rozwiazanie.s3Pair[0].title} title={t.rozwiazanie.s3Pair[0].title} text={t.rozwiazanie.s3Pair[0].text} />
              </StaggerItem>
              <StaggerItem style={{ flex: "1 1 260px" }}>
                <ShotCard img="/raporty-ds-bulk-action.webp" alt={t.rozwiazanie.s3Pair[1].title} title={t.rozwiazanie.s3Pair[1].title} text={t.rozwiazanie.s3Pair[1].text} />
              </StaggerItem>
            </StaggerGroup>
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
              <StaggerItem style={{ flex: "1 1 220px" }}>
                <ShotCard img="/raporty-ds-share.webp" alt={t.rozwiazanie.s3Triple[0].title} title={t.rozwiazanie.s3Triple[0].title} text={t.rozwiazanie.s3Triple[0].text} />
              </StaggerItem>
              <StaggerItem style={{ flex: "1 1 220px" }}>
                <ShotCard img="/raporty-ds-email-settings.webp" alt={t.rozwiazanie.s3Triple[1].title} title={t.rozwiazanie.s3Triple[1].title} text={t.rozwiazanie.s3Triple[1].text} />
              </StaggerItem>
              <StaggerItem style={{ flex: "1 1 220px" }}>
                <ShotCard img="/raporty-ds-email-send.webp" alt={t.rozwiazanie.s3Triple[2].title} title={t.rozwiazanie.s3Triple[2].title} text={t.rozwiazanie.s3Triple[2].text} />
              </StaggerItem>
            </StaggerGroup>
          </div>
        </Reveal>
      </Section>

      <Divider />

      {/* 05 · DECYZJE */}
      <Section id="decyzje">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={t.decyzje.eyebrow} title={t.decyzje.title} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <div style={{ width: "100%", borderRadius: 24, boxShadow: "var(--pf-ring)", padding: "clamp(24px, 5vw, 48px)", display: "flex", flexDirection: "column", gap: 48, boxSizing: "border-box" }}>
            <img src="/raporty-ds-flow.webp" alt="" style={{ width: "100%", height: "auto", display: "block", borderRadius: 16 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{t.decyzje.mainDecision.title}</span>
              <ul style={{ margin: 0, padding: "0 0 0 20px", listStyle: "disc", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>
                {t.decyzje.mainDecision.bullets.map((b, i) => (
                  <li key={i}>{b.text}{b.bold && <b>{b.bold}</b>}{b.rest}</li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
        <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
          {t.decyzje.pair.map((d, i) => (
            <StaggerItem key={i} style={{ flex: "1 1 280px" }}>
              <div style={{ width: "100%", height: "100%", borderRadius: 24, boxShadow: "var(--pf-ring)", padding: 32, display: "flex", flexDirection: "column", gap: 32, boxSizing: "border-box" }}>
                <img src={d.image} alt="" style={{ width: 160, height: "auto", display: "block", borderRadius: 16 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>{d.title}</span>
                  <p className="pf-body" style={{ margin: 0 }}>{d.text}<b>{d.textBold}</b>{d.textRest}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
            <h3 className="pf-h3">{t.decyzje.testsTitle}</h3>
            <div style={{ width: "100%", borderRadius: 24, background: "var(--pf-surface-card-subtle)", overflow: "hidden", boxSizing: "border-box" }}>
              <img src="/raporty-ds-reports-manager.webp" alt={t.decyzje.testsTitle} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
              {t.decyzje.testsFindings.map((f, i) => (
                <StaggerItem key={i} style={{ flex: "1 1 260px" }}>
                  <TextCard title={f.title} text={f.text} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </Reveal>

        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 48, width: "100%" }}>
            <h3 className="pf-h3">{t.decyzje.infraTitle}</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 48, width: "100%", alignItems: "flex-start" }}>
              <div style={{ flex: "1 1 240px", maxWidth: 360, aspectRatio: "360 / 280", background: "url(/raporty-ds-maps.webp) center / cover no-repeat", borderRadius: 16 }} />
              <p className="pf-body" style={{ margin: 0, flex: "2 1 320px" }}>{t.decyzje.infraText}</p>
            </div>
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
          <p className="pf-body" style={{ margin: 0 }}>{t.wynik.intro}</p>
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
            <StaggerGroup style={{ display: "flex", flexWrap: "wrap", gap: 24, alignItems: "stretch" }}>
              <StaggerItem style={{ flex: "2 1 320px" }}>
                <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 24, padding: "clamp(24px, 5vw, 48px)", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", gap: 32, boxSizing: "border-box", background: "var(--pf-primary-700) url(/raporty-ds-bg-panel-3.webp) center / cover no-repeat" }}>
                  <span style={{ fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 8vw, 80px)", lineHeight: "clamp(48px, 9vw, 108px)", letterSpacing: "0.02em", color: "var(--pf-text-on-dark)" }}><AnimatedStat value={t.wynik.heroStat.value} /></span>
                  <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: "var(--pf-primary-50)" }}>{t.wynik.heroStat.label}</span>
                </div>
              </StaggerItem>
              {t.wynik.smallStats.map((s, i) => (
                <StaggerItem key={i} style={{ flex: "1 1 200px" }}>
                  <StatCard value={<AnimatedStat value={s.value} />} label={s.label} style={{ width: "100%", height: "100%" }} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <span className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{t.wynik.dataCaption}</span>
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
            <LessonCard image="/raporty-ds-nie-wiem.webp" title={t.podsumowanie.lessons[0].title}>{t.podsumowanie.lessons[0].text}</LessonCard>
          </StaggerItem>
          <StaggerItem style={{ flex: "1 1 260px" }}>
            <LessonCard image="/raporty-ds-teamwork.webp" title={t.podsumowanie.lessons[1].title}>{t.podsumowanie.lessons[1].text}</LessonCard>
          </StaggerItem>
        </StaggerGroup>
      </Section>

      <Section>
        <Reveal style={{ width: "100%" }}>
          <img src="/raporty-ds-thanks.webp" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
        </Reveal>
      </Section>

    </div>
  )
}
