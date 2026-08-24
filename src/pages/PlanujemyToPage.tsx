import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/planujemyto.copy"
import "@/styles/raporty-ds.css"
import { motion, useReducedMotion } from "motion/react"
import { Section, SectionHeader, Divider } from "@/components/raporty-ds"

// This project has its own brand colour. Rebinding the accent tokens on the
// page root (instead of writing the hex onto elements) means every
// var(--pf-accent-500)/var(--pf-text-accent) read inside this page — including
// the coloured span already baked into t.heroTitle — follows automatically,
// and nothing outside this page is affected.
const PRIMARY = "#8585FF"

/** Artwork that already carries its own card edges in the pixels. The mono
 *  pair is two rounded panels with a gutter between them, and the icon strip
 *  is four rounded tiles standing on white. Putting either inside a bordered
 *  card draws a frame around a frame — the design has neither in one. */
const SELF_FRAMED = new Set([
  "/planujemyto-mono.webp",
  "/planujemyto-icons.webp",
])

/** Scroll-reveal motion, copied from RaportyCaseStudy/ClientAcquisitionCaseStudy
 * per DESIGN_SYSTEM.md §6 — only the helpers this page actually uses. */
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
function StaggerGroup({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div style={style} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={staggerParent}>
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

/** Brand artwork in a card. The image fills the card edge to edge and the card
 * takes the file's own proportions — no fixed frame, no inset.
 *
 * These exports already carry their margins in the pixels: the lockup sits on
 * its watermark field, the mark strip has its own spacing around the icons.
 * Boxing them again in a 3:2 frame and insetting them inside it left the
 * artwork floating in a mostly empty card — the icon strip drew 943x257 inside
 * a 1152x768 box, so two thirds of it was blank. */
function ContainedFigure({ img, alt, style }: { img: string; alt: string; style?: React.CSSProperties }) {
  return (
    <div style={{ width: "100%", borderRadius: 24, border: "var(--pf-hairline)", background: "var(--pf-primary-50)", boxSizing: "border-box", overflow: "hidden", ...style }}>
      <img src={img} alt={alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  )
}

/** Perceived brightness (ITU-R BT.601 luma) of a hex colour. Used to flip a
 * palette swatch's label between near-black and light text so the five
 * swatches don't need five hand-picked label colours. */
function isLight(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5
}

function PaletteSwatch({ hex, name, className }: { hex: string; name: string; className?: string }) {
  const light = isLight(hex)
  return (
    <div className={`pmt-swatch${className ? ` ${className}` : ""}`} style={{ background: hex, border: "var(--pf-hairline)", boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 4, padding: 24 }}>
      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 700, fontSize: 18, lineHeight: "24px", color: light ? "var(--pf-primary-900)" : "var(--pf-white)" }}>{hex}</span>
      <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 16, lineHeight: "24px", color: light ? "var(--pf-text-body)" : "var(--pf-primary-200)" }}>{name}</span>
    </div>
  )
}

/** Palette bento from spec §6: Violet large beside a stacked Lavender/Deep
 * Purple column (row 1), then White beside Near Black (row 2). The `fr`-style
 * flex-grow values below mirror the source frame's 800:376 and roughly-even
 * 593:583 ratios while staying proportional, and collapse to one column below
 * `md`. Every swatch gets the same hairline border, which also solves the
 * White swatch's "invisible on a white page" problem without special-casing it. */
function PaletteGrid({ entries }: { entries: { hex: string; name: string }[] }) {
  const [violet, lavender, deepPurple, white, nearBlack] = entries
  return (
    <div className="pmt-palette">
      <div className="pmt-row pmt-row-1">
        <PaletteSwatch {...violet} className="pmt-cell-violet" />
        <div className="pmt-stack">
          <PaletteSwatch {...lavender} />
          <PaletteSwatch {...deepPurple} />
        </div>
      </div>
      <div className="pmt-row pmt-row-2">
        <PaletteSwatch {...white} />
        <PaletteSwatch {...nearBlack} />
      </div>
      <style>{`
        .pmt-palette { display: flex; flex-direction: column; gap: 24px; width: 100%; }
        .pmt-row, .pmt-stack { display: flex; flex-direction: column; gap: 24px; width: 100%; }
        .pmt-swatch { width: 100%; aspect-ratio: 5 / 2; border-radius: 24px; overflow: hidden; }
        @media (min-width: 768px) {
          .pmt-row { flex-direction: row; align-items: stretch; }
          .pmt-row-1 { height: clamp(220px, 22vw, 320px); }
          .pmt-row-2 { height: clamp(160px, 14vw, 200px); }
          .pmt-row-1 > .pmt-cell-violet { flex: 800 1 0%; }
          .pmt-row-1 > .pmt-stack { flex: 376 1 0%; }
          .pmt-row-2 > .pmt-swatch { flex: 1 1 0%; }
          .pmt-swatch, .pmt-stack { height: 100%; }
          .pmt-swatch { aspect-ratio: auto; }
        }
      `}</style>
    </div>
  )
}

export function PlanujemyToPage() {
  const { lang } = useLang()
  const t = copy[lang]

  const brand = t.sections[0]
  const kolory = t.sections[1]
  const produkt = t.sections[2]

  return (
    // No fixed navbar left to clear, same top reserve as the other case studies.
    <div
      style={{
        display: "flex", flexDirection: "column", gap: "clamp(56px, 10vw, 120px)",
        padding: "clamp(56px, 8vw, 96px) 0", alignItems: "center", width: "100%", boxSizing: "border-box",
        "--pf-accent-500": PRIMARY,
        "--pf-text-accent": PRIMARY,
      } as React.CSSProperties}
    >
      {/* HERO */}
      <Section gap={80}>
        <HeroStagger style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%" }}>
          <StaggerItem style={{ width: "100%" }}>
            <header style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", padding: 0, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 10vw, 126px)", lineHeight: "clamp(44px, 10.5vw, 136px)", letterSpacing: "0em", color: "var(--pf-text-primary)", textWrap: "pretty" }}>
                  {t.heroTitle}
                </h1>
              </div>
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.heroLead}</p>
            </header>
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            {/* Two-column cover per spec §4: the app screenshot takes the wide
                column, the mark and full logo stack narrower beside it.
                coverImages is ordered [mark, logo, app] in the copy file. */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 24, width: "100%", alignItems: "stretch" }}>
              <div style={{ flex: "1.4 1 320px", minHeight: 360, borderRadius: 24, border: "var(--pf-hairline)", overflow: "hidden", boxSizing: "border-box" }}>
                <img src={t.coverImages[2].src} alt={t.coverImages[2].alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              {/* No flex:1 on these two: the mark is 427x651 and the logo panel
                  427x242, so stretching them to equal heights would crop one of
                  them. At their own proportions they stack to roughly the
                  screenshot's height beside them, which is how the design has it. */}
              <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 24 }}>
                <ContainedFigure img={t.coverImages[0].src} alt={t.coverImages[0].alt} />
                <ContainedFigure img={t.coverImages[1].src} alt={t.coverImages[1].alt} />
              </div>
            </div>
          </StaggerItem>
        </HeroStagger>
      </Section>

      <Divider />

      {/* 01 · BRAND */}
      <Section id="brand">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={brand.eyebrow} title={brand.title} />
        </Reveal>
        {brand.paragraphs.map((p, i) => (
          <Reveal key={i} style={{ width: "100%" }}>
            <p className="pf-body">{p}</p>
          </Reveal>
        ))}
        {/* All four full width, stacked, in the order the spec lists them:
            lockup, idea, mono, icons. That is how the design has them — and
            these files are wide strips (1200x350, 1200x468, 1200x327), so
            pairing any two side by side would shrink them to a sliver. */}
        {brand.images.map((image, i) => (
          <Reveal key={i} style={{ width: "100%" }}>
            {SELF_FRAMED.has(image.src) ? (
              <img src={image.src} alt={image.alt} style={{ width: "100%", height: "auto", display: "block" }} />
            ) : (
              <ContainedFigure img={image.src} alt={image.alt} />
            )}
          </Reveal>
        ))}
      </Section>

      <Divider />

      {/* 02 · KOLORY */}
      <Section id="kolory">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={kolory.eyebrow} title={kolory.title} />
        </Reveal>
        {kolory.paragraphs.map((p, i) => (
          <Reveal key={i} style={{ width: "100%" }}>
            <p className="pf-body">{p}</p>
          </Reveal>
        ))}
        <Reveal style={{ width: "100%" }}>
          <PaletteGrid entries={t.palette} />
        </Reveal>
      </Section>

      <Divider />

      {/* 03 · PRODUKT */}
      <Section id="produkt">
        <Reveal style={{ width: "100%" }}>
          <SectionHeader eyebrow={produkt.eyebrow} title={produkt.title} />
        </Reveal>
        {produkt.paragraphs.map((p, i) => (
          <Reveal key={i} style={{ width: "100%" }}>
            <p className="pf-body">{p}</p>
          </Reveal>
        ))}
        <StaggerGroup style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
          {produkt.images.map((image, i) => (
            <StaggerItem key={i} style={{ width: "100%" }}>
              <img src={image.src} alt={image.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "var(--pf-hairline)", boxSizing: "border-box" }} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      {/* ZAMKNIECIE — the wordmark panel, then the mark on the brand field */}
      <Section>
        <Reveal style={{ width: "100%" }}>
          <img src={t.closingLogo.src} alt={t.closingLogo.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
        </Reveal>
        <Reveal style={{ width: "100%" }}>
          <img src={t.closingImage.src} alt={t.closingImage.alt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24 }} />
        </Reveal>
      </Section>
    </div>
  )
}
