import { motion, useReducedMotion } from "motion/react"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/codete.copy"
import "@/styles/raporty-ds.css"
import { ChapterRail } from "@/components/ChapterRail"
import { MetaBar, Section } from "@/components/raporty-ds"

const CHAPTER_IDS = ["intro", "management", "reconciliation", "devtools", "analytics"] as const

/** Scroll-reveal motion, same values as the fade-up used on the Localo case study page. */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
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

export function CodeteCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = CHAPTER_IDS.map((id) => ({ id, label: t.chapters[id] }))

  return (
    // No fixed navbar left to clear, so the top reserve drops from
    // clamp(96px, 14vw, 160px) to about the breathing room Banneroza has.
    <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box" }}>

      <ChapterRail chapters={chapters} topOffset={24} />

      {/* HERO / INTRO */}
      <Section gap={80} id="intro">
        <HeroStagger style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%" }}>
          <StaggerItem style={{ width: "100%" }}>
            {/* Eyebrow and title are one unit, 24px apart. Lead and NDA note then
                sit 40px below it and below each other. */}
            <header style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", padding: 0, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 10vw, 126px)", lineHeight: "clamp(44px, 10.5vw, 136px)", letterSpacing: "0em", color: "var(--pf-text-primary)", textWrap: "pretty" }}>
                  {t.heroTitle}
                </h1>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.heroLead}</p>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.ndaNote}</p>
            </header>
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <MetaBar items={t.metaBar} />
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <img src="/codete-cover.webp" alt={t.coverAlt} style={{ width: "100%", height: "auto", display: "block" }} />
          </StaggerItem>
        </HeroStagger>
      </Section>

      {/* Product blocks (management, reconciliation, devtools, analytics) land here in a later task. */}

    </div>
  )
}
