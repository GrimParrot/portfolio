import { motion, useReducedMotion } from "motion/react"
import { ChartNoAxesColumnIncreasing, GitBranch, Grid3x3, Terminal, type LucideIcon } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"
import { copy, type Product } from "@/copy/codete.copy"
import "@/styles/raporty-ds.css"
import { Badge } from "@/components/ui/badge"
import { ChapterRail } from "@/components/ChapterRail"
import { MetaBar, Section, NdaImage, type NdaImageCrop } from "@/components/raporty-ds"

/** Codete's own accent, standing in for the site's default blue on this page. */
const PRIMARY = "#8B5CF6"

/** One mark per product, in page order. These live here rather than in copy
 *  because they do not translate — the same four glyphs serve both languages. */
const PRODUCT_ICONS: LucideIcon[] = [Grid3x3, GitBranch, Terminal, ChartNoAxesColumnIncreasing]

/** The two pictures the design places by hand instead of fitting to the frame:
 *  a wide strip taken off the top of a tall map, and a small diagram floated in
 *  the middle of a wide band. Percentages are the design's own. Every other
 *  picture matches its frame's ratio and simply covers it. */
const CROPS: Record<string, NdaImageCrop> = {
  "/codete-01-information-architecture.webp": { left: "0.55%", top: "-0.16%", width: "98.91%", height: "197.24%" },
  "/codete-04-data-flow.webp": { left: "20.98%", top: "-11.18%", width: "47.82%", height: "122.64%" },
}

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

/** Same as Reveal but plays immediately on mount instead of waiting for scroll — used for the hero, which is already in view on load. */
function HeroStagger({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const reduce = useReducedMotion()
  return (
    <motion.div style={style} initial={reduce ? false : "hidden"} animate="show" variants={staggerParent}>
      {children}
    </motion.div>
  )
}

/** Reads "916 / 169" as the number the CSS grid wants. A row's pictures share
 *  one rendered height, so that ratio doubles as the column's `fr` weight. */
function ratio(aspect?: string): number {
  if (!aspect) return 1
  const [w, h] = aspect.split("/").map((n) => parseFloat(n))
  return w && h ? w / h : 1
}

/** The one or two pictures closing a product card, sized off their own aspect
 *  ratios rather than an equal split — so the wide diagram beside a narrow one
 *  keeps the proportions the design gives it. Collapses to one column below md. */
function ImageRow({ images, ndaLabel }: { images: Product["images"]; ndaLabel: string }) {
  const cols = images.map((im) => `${ratio(im.aspect)}fr`).join(" ")
  return (
    <div
      className="grid grid-cols-1 md:[grid-template-columns:var(--cols)] gap-6"
      style={{ width: "100%", "--cols": cols } as React.CSSProperties}
    >
      {images.map((im, i) => (
        <NdaImage key={i} src={im.src} alt={im.alt} label={ndaLabel} aspect={im.aspect} crop={CROPS[im.src]} />
      ))}
    </div>
  )
}

/** One product, as a card beside its number. Everything the reader needs about
 *  that product is inside the one bordered box: what it was, what I did on it,
 *  and the one or two pictures NDA leaves room to show. All four products share
 *  this shape, so they render from one component rather than four hand-copied
 *  blocks. */
function ProductCard({ product, id, index, ndaLabel, imageNote }: { product: Product; id: string; index: number; ndaLabel: string; imageNote: string }) {
  const Icon = PRODUCT_ICONS[index]
  return (
    <Section id={id}>
      <Reveal style={{ width: "100%" }}>
        <div className="pf-product-row">
          <span className="pf-product-label pf-overline">{product.eyebrow}</span>

          <article
            style={{
              flex: "1 1 0", minWidth: 0, boxSizing: "border-box",
              display: "flex", flexDirection: "column", gap: 32,
              background: "var(--pf-surface-card)",
              border: "var(--pf-hairline)",
              borderRadius: 24,
              padding: "clamp(20px, 3vw, 32px)",
            }}
          >
            <span
              aria-hidden
              style={{
                width: 32, height: 32, flexShrink: 0, borderRadius: 8,
                background: "var(--pf-accent-500)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <Icon size={19} strokeWidth={1.75} color="#fff" />
            </span>

            <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
              <h3 className="pf-h4">{product.title}</h3>
              <div className="flex flex-wrap gap-2">
                {/* The card's own chip, not the site's secondary Badge: the design
                    gives these a full pill on the line colour, a step darker than
                    Badge's surface. `border-0` keeps the box at the 36px the
                    design draws — Badge's transparent border would add two. */}
                {product.tags.map((tag) => (
                  <Badge key={tag} className="rounded-full border-0 bg-[var(--pf-primary-100)] px-3 py-1.5 text-base font-normal leading-6 text-[color:var(--pf-text-primary)] hover:bg-[var(--pf-primary-100)]">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="pf-body">{product.intro}</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <h4 className="pf-h4">{product.roleHeading}</h4>
              {/* One list in two balanced columns rather than two lists side by
                  side: the design splits it visually, but a screen reader should
                  still hear a single run of scope items. */}
              <ul className="pf-role-list">
                {product.role.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <ImageRow images={product.images} ndaLabel={ndaLabel} />

            <p className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{imageNote}</p>
          </article>
        </div>
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
      // MetaBar labels and the card marks pick it up on their own, and nothing
      // outside this page is touched.
      "--pf-accent-500": PRIMARY,
      "--pf-text-accent": PRIMARY,
    } as React.CSSProperties}>

      <ChapterRail chapters={chapters} accent={PRIMARY} topOffset={24} />

      {/* HERO / INTRO */}
      <Section gap={80} id="intro">
        <HeroStagger style={{ display: "flex", flexDirection: "column", gap: 80, width: "100%" }}>
          <StaggerItem style={{ width: "100%" }}>
            {/* Eyebrow and title are one unit, 24px apart. Tags, lead and NDA note
                then sit 40px below it and below each other. */}
            <header style={{ display: "flex", flexDirection: "column", gap: 40, width: "100%", padding: 0, boxSizing: "border-box" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <span style={{ fontFamily: "var(--pf-font-body)", fontWeight: 600, fontSize: 16, lineHeight: "22px", letterSpacing: "0.1em", color: "var(--pf-text-muted)" }}>{t.heroEyebrow}</span>
                <h1 style={{ margin: 0, fontFamily: "var(--pf-font-display)", fontWeight: 700, fontSize: "clamp(40px, 10vw, 126px)", lineHeight: "clamp(44px, 10.5vw, 136px)", letterSpacing: "0em", color: "var(--pf-text-primary)", textWrap: "pretty" }}>
                  {t.heroTitle} <span style={{ color: "var(--pf-accent-500)" }}>{t.heroTitleAccent}</span>
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
              <p style={{ margin: 0, fontFamily: "var(--pf-font-body)", fontWeight: 400, fontSize: 22, lineHeight: "34px", color: "var(--pf-text-body)" }}>{t.ndaNote}</p>
            </header>
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <MetaBar items={t.metaBar} />
          </StaggerItem>
          <StaggerItem style={{ width: "100%" }}>
            <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 24, width: "100%" }}>
              <img src="/codete-cover.webp" alt={t.coverAlt} style={{ width: "100%", height: "auto", display: "block", borderRadius: 24, border: "var(--pf-hairline)", boxSizing: "border-box" }} />
              <figcaption className="pf-caption" style={{ color: "var(--pf-text-muted)" }}>{t.coverCaption}</figcaption>
            </figure>
          </StaggerItem>
        </HeroStagger>
      </Section>

      {/* PRODUCTS */}
      <Section>
        <Reveal style={{ width: "100%" }}>
          <h2 className="pf-h3">{t.productsHeading}</h2>
        </Reveal>
      </Section>

      {/* Four products, one rhythm — CHAPTER_IDS[0] is "intro", so the chapter
          rail id for product i is offset by one. */}
      {t.products.map((product, i) => (
        <ProductCard key={CHAPTER_IDS[i + 1]} id={CHAPTER_IDS[i + 1]} index={i} product={product} ndaLabel={t.ndaLabel} imageNote={t.imageNote} />
      ))}

    </div>
  )
}
