import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useLang } from "@/i18n/LanguageContext"
import { copy, type Product } from "@/copy/codete.copy"
import "@/styles/raporty-ds.css"
import { Badge } from "@/components/ui/badge"
import { ChapterRail } from "@/components/ChapterRail"
import { MetaBar, Section, NdaImage, StatCard, QuoteBlock } from "@/components/raporty-ds"

/** Codete's own accent, standing in for the site's default blue on this page. */
const PRIMARY = "#722ED1"

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

/** aspect strings look like "945 / 242" — the two numbers are that image's own
 *  design width/height. A row's images share one rendered height, so that
 *  same ratio doubles as the column's `fr` weight in the row's grid. */
function ratio(aspect?: string): number {
  if (!aspect) return 1
  const [w, h] = aspect.split("/").map((n) => parseFloat(n))
  return w && h ? w / h : 1
}

/** A row of NDA screenshots sized off their own aspect ratios rather than an
 *  equal grid, so a 945/242 image doesn't get squeezed as wide as a 231/243
 *  one sitting next to it. Collapses to one column below md. */
function ImageRow({ images, ndaLabel }: { images: Product["imagesAfterChallenge"]; ndaLabel: string }) {
  const cols = images.map((im) => `${ratio(im.aspect)}fr`).join(" ")
  return (
    <div
      className="grid grid-cols-1 md:[grid-template-columns:var(--cols)] gap-6"
      style={{ width: "100%", "--cols": cols } as React.CSSProperties}
    >
      {images.map((im, i) => (
        <NdaImage key={i} src={im.src} alt={im.alt} label={ndaLabel} aspect={im.aspect} />
      ))}
    </div>
  )
}

/** One product's full write-up: header, role, optional stats, challenge with
 *  an optional quote, and the before/after image rows. All four products
 *  share this exact rhythm, so they render from one component rather than
 *  four hand-copied blocks. */
function ProductBlock({ product, id, ndaLabel }: { product: Product; id: string; ndaLabel: string }) {
  return (
    <Section id={id}>
      <Reveal style={{ width: "100%" }}>
        <header style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
          <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>
            {product.eyebrow}
          </span>
          <h2 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(32px, 6vw, 56px)", lineHeight: 1.15, color: "var(--pf-text-primary)" }}>
            {product.title}
          </h2>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
                {tag}
              </Badge>
            ))}
          </div>
        </header>
      </Reveal>

      <Reveal style={{ width: "100%" }}>
        <p className="pf-body">{product.intro}</p>
      </Reveal>

      <Reveal style={{ width: "100%" }}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,7fr)_minmax(0,9fr)] gap-10">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h3 style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>
              {product.roleHeading}
            </h3>
            <ul style={{ margin: 0, padding: "0 0 0 20px", listStyle: "disc", fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 18, lineHeight: "30px", color: "var(--pf-text-body)" }}>
              {product.role.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          <NdaImage src={product.heroImage.src} alt={product.heroImage.alt} label={ndaLabel} aspect={product.heroImage.aspect} />
        </div>
      </Reveal>

      {/* Only product 01 ships stats — guard on presence rather than assuming every product has them. */}
      {product.stats && (
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ width: "100%" }}>
          {product.stats.map((stat, i) => (
            <StaggerItem key={i}>
              <StatCard value={<AnimatedStat value={stat.value} />} label={stat.label} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}

      <Reveal style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>
            {product.challengeHeading}
          </h3>
          <p className="pf-body">{product.challenge}</p>
          {/* Only product 02 ships a quote, pulled from user interviews. */}
          {product.quote && <QuoteBlock size="md">{product.quote}</QuoteBlock>}
        </div>
      </Reveal>

      <Reveal style={{ width: "100%" }}>
        <ImageRow images={product.imagesAfterChallenge} ndaLabel={ndaLabel} />
      </Reveal>

      <Reveal style={{ width: "100%" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-primary)" }}>
            {product.solutionHeading}
          </h3>
          <p className="pf-body">{product.solution}</p>
        </div>
      </Reveal>

      <Reveal style={{ width: "100%" }}>
        <ImageRow images={product.imagesAfterSolution} ndaLabel={ndaLabel} />
      </Reveal>
    </Section>
  )
}

export function CodeteCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = CHAPTER_IDS.map((id) => ({ id, label: t.chapters[id] }))

  return (
    // No fixed navbar left to clear, so the top reserve drops from
    // clamp(96px, 14vw, 160px) to about the breathing room Banneroza has.
    <div id="top" style={{ display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)", padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box",
      // Codete's accent is purple, not the site's default blue. Rebinding the
      // accent tokens here rather than hardcoding the hex per element means
      // MetaBar labels and every image border pick it up on their own, and
      // nothing outside this page is touched.
      "--pf-accent-500": PRIMARY,
      "--pf-text-accent": PRIMARY,
    } as React.CSSProperties}>

      <ChapterRail chapters={chapters} accent={PRIMARY} topOffset={24} />

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
            <img src="/codete-cover.webp" alt={t.coverAlt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "var(--pf-hairline)", boxSizing: "border-box" }} />
          </StaggerItem>
        </HeroStagger>
      </Section>

      {/* Four products, one rhythm — CHAPTER_IDS[0] is "intro", so the chapter
          rail id for product i is offset by one. */}
      {t.products.map((product, i) => (
        <ProductBlock key={CHAPTER_IDS[i + 1]} id={CHAPTER_IDS[i + 1]} product={product} ndaLabel={t.ndaLabel} />
      ))}

    </div>
  )
}
