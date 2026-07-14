import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Target, AlertTriangle, TrendingUp, Frown, Search, Mail, Zap } from "lucide-react"

const lessonIcons = [Search, Mail, Zap]
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/raporty.copy"

const PRIMARY = "#466AFA"

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

function ProfileBox({ box, rotate }: { box: { icon: string; title: string; tags: string[] }; rotate: number }) {
  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm" style={{ transform: `rotate(${rotate}deg)`, minHeight: 230 }}>
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl" style={{ backgroundColor: PRIMARY + "1A" }}>
        {box.icon === "target" && <Target style={{ width: 28, height: 28, color: PRIMARY }} />}
        {box.icon === "warning" && <AlertTriangle style={{ width: 28, height: 28, color: PRIMARY }} />}
        {box.icon === "trending" && <TrendingUp style={{ width: 28, height: 28, color: PRIMARY }} />}
      </div>
      <p className="font-semibold text-slate-900 text-lg mt-4 mb-4">{box.title}</p>
      <div className="flex flex-wrap gap-2">
        {box.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-[#94A3B814] hover:bg-[#94A3B814]">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  )
}

function ImageCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0)
  const n = images.length

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % n), 2800)
    return () => clearInterval(id)
  }, [n])

  const prevIndex = (index - 1 + n) % n

  return (
    <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "1440/802" }}>
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
              objectPosition: "center top",
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

/**
 * Duotone feature card template — reuse for any "flat gray box, title, desc,
 * image cut off at the bottom" section. Only swap title/desc/img/imgAlt (and
 * height for a single full-width card that needs more image visible).
 * The text block always sizes to its own content — no min-height — so the
 * gap to the image (mt-10) is always exactly 40px, no exceptions. In a
 * two-card pair with different desc lengths, this means the images may
 * start at slightly different Y — that's the accepted trade-off; the fixed
 * 40px gap under the text takes priority over cross-card image alignment.
 */
function FeatureCard({ title, desc, img, imgAlt, height = 420 }: { title: string; desc: ReactNode; img: string; imgAlt: string; height?: number }) {
  return (
    <div className="group rounded-3xl overflow-hidden pt-10 px-10" style={{ height, backgroundColor: "#94A3B814" }}>
      <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{title}</h3>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl mt-10 transition-transform duration-500 group-hover:scale-[1.02]" />
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

function StatCard({ num, caption, color, active, className = "", bgAlpha = "0D", dark = false, large = false }: { num: string; caption: string; color: string; active: boolean; className?: string; bgAlpha?: string; dark?: boolean; large?: boolean }) {
  const { prefix, numeric, suffix, decimals, staticDisplay } = parseNum(num)
  const count = useCountUp(numeric, 1100, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = staticDisplay ?? `${prefix}${formatted}${suffix}`
  const patternColor = dark ? "#FFFFFF" : color
  const textColor = dark ? "#FFFFFF" : "#0F172A"

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${className}`} style={{ backgroundColor: dark ? "#0F172A" : color + bgAlpha }}>
      <div
        className={`absolute top-0 right-0 ${large ? "w-full h-full" : "w-40 h-40"}`}
        style={{
          backgroundImage: [
            `repeating-linear-gradient(0deg, ${patternColor}30 0px, ${patternColor}30 1px, transparent 1px, transparent 22px)`,
            `repeating-linear-gradient(90deg, ${patternColor}30 0px, ${patternColor}30 1px, transparent 1px, transparent 22px)`,
          ].join(", "),
          WebkitMaskImage: `radial-gradient(circle at 100% 0%, black 0%, transparent ${large ? 100 : 75}%)`,
          maskImage: `radial-gradient(circle at 100% 0%, black 0%, transparent ${large ? 100 : 75}%)`,
        }}
      />
      <div className="relative z-10 flex flex-col">
        <p className={`font-black tracking-tight leading-none ${large ? "text-[148px]" : "text-6xl"}`} style={{ color: textColor }}>{display}</p>
        <p className="text-sm leading-relaxed mt-5" style={{ color: textColor }}>{caption}</p>
      </div>
    </div>
  )
}

function MetricsGrid5({ metrics }: { metrics: Array<{ num: string; caption: string; color: string; icon: string }> }) {
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
  const [a, b, c, d, e] = metrics
  const gray = "#94A3B8"
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <StatCard num={a.num} caption={a.caption} color={a.color} active={active} className="h-full" dark large />
      <div className="grid grid-cols-2 gap-6">
        <StatCard num={b.num} caption={b.caption} color={gray} active={active} bgAlpha="14" />
        <StatCard num={c.num} caption={c.caption} color={gray} active={active} bgAlpha="14" />
        <StatCard num={d.num} caption={d.caption} color={gray} active={active} dark />
        <StatCard num={e.num} caption={e.caption} color={gray} active={active} bgAlpha="14" />
      </div>
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
    { id: "s03", label: t.chapters.s03 },
    { id: "s04", label: t.chapters.s04 },
    { id: "s05", label: t.chapters.s05 },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />
      <ProgressRail chapters={chapters} />

      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* HERO */}
        <div id="hero" className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/raporty" />
          <HeroStagger>
            <StaggerItem>
              <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.15 }}>
                {t.h1}<br className="hidden md:block" />{" "}
                <span style={{ color: PRIMARY }}>{t.h1Accent}</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0ABA53] text-white">Case Study</span>
            </StaggerItem>

            <StaggerItem>
              <p className="text-slate-500 leading-relaxed mb-10">
                {t.intro}<strong className="text-slate-700">{t.introProduct}</strong>{t.introSuffix}
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#EEF2FF" }}>
                <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
                <p style={{ color: PRIMARY }}>
                  <strong className="font-semibold">{t.roleLabel}:</strong> {t.roleText}
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
                {t.meta.map((item) => (
                  <div key={item.label} className="flex flex-col">
                    <Tag>{item.label}</Tag>
                    <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
                  </div>
                ))}
              </div>
            </StaggerItem>

            <StaggerItem>
              <img src="/raporty-cover.webp" alt="Kreator Raportów" className="w-full rounded-2xl border border-slate-200 object-cover" />
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* 01 */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            {t.s01.h2 && <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s01.h2}</h2>}
            <p className="text-slate-500 leading-relaxed mb-16">{t.s01.body}</p>
          </Reveal>
          <Reveal>
            <MetricsGrid5 metrics={t.s01.metrics} />
          </Reveal>
          <Reveal>
            <p className="text-slate-500 leading-relaxed mt-12">{t.s01.lastPara}</p>
          </Reveal>
          <Reveal className="mt-16 flex gap-4 items-start">
            <blockquote className="flex gap-4 items-start">
              <span className="text-8xl leading-none select-none font-serif flex-shrink-0" style={{ color: PRIMARY }}>&ldquo;</span>
              <p className="text-slate-700 font-light text-4xl md:text-5xl flex-1" style={{ lineHeight: 1.5 }}>{t.s01.quote}</p>
              <span className="text-8xl leading-none select-none font-serif flex-shrink-0 self-end" style={{ color: PRIMARY }}>&rdquo;</span>
            </blockquote>
          </Reveal>
        </div>

        <Divider />

        {/* 02 */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.s02.insights.map((item) => (
              <StaggerItem key={item.n} className="border border-slate-200 rounded-xl p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl" style={{ backgroundColor: "#ef44441A" }}>
                  <Frown style={{ width: 28, height: 28, color: "#ef4444" }} />
                </div>
                <p className="font-semibold text-slate-900 text-lg mt-4 mb-4">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal className="mt-12">
            <Tag>{t.s02.methodsLabel}</Tag>
            <div className="flex flex-wrap gap-3 mt-3">
              {t.s02.methods.map((m) => (
                <Badge key={m.label} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#94A3B814] hover:bg-[#94A3B814] [&>svg]:text-[#6366F1]">
                  {m.icon}{m.label}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="md:col-span-2 rounded-3xl p-10" style={{ backgroundColor: "#22C55E14" }}>
              <div className="mb-3">
                <Tag color="#16A34A">{t.s03.pivotGoalTitle}</Tag>
              </div>
              <p className="text-2xl font-light" style={{ color: "#16A34A" }}>{t.s03.pivotGoalDesc}</p>
            </div>
            <img src="/raporty-direction.webp" alt="" className="w-full h-full rounded-3xl object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* 03 */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s03.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-14">{t.s03.intro}</p>
          </Reveal>

          <div className="flex flex-col gap-12">
            {t.s03.steps.map((step) => (
              <Reveal key={step.n}>
                {step.visual === "pivot" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <img src="/raporty-user-stories.webp" alt="User stories" className="w-full rounded-2xl border border-slate-200 object-cover" />
                  </div>
                ) : step.visual === "profile" ? (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8" style={{ marginTop: 60, marginBottom: 12 }}>
                      <ProfileBox box={t.s03.profileBoxes[0]} rotate={-4} />
                      <ProfileBox box={t.s03.profileBoxes[1]} rotate={3} />
                      <ProfileBox box={t.s03.profileBoxes[2]} rotate={-3} />
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                )}

                {step.visual === "scope" && (
                  <img src="/raporty-scope.webp" alt="Zakres projektu" className="w-full rounded-2xl border border-slate-200 mt-10 object-cover" />
                )}

                {step.visual === "flow" && (
                  <div className="mt-10">
                    <ImageCarousel images={["/raporty-flow-1.webp", "/raporty-flow-2.webp", "/raporty-flow-3.webp"]} />
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>

        <Divider />

        {/* 04 */}
        <div id="s04" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s04.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>
          </Reveal>

          {t.s04.steps.map((feature, i) => (
            feature.cards ? (
              <Reveal key={i} className={`grid grid-cols-1 ${feature.cards.length > 1 ? "md:grid-cols-2" : ""} gap-6 mb-16`}>
                {feature.cards.map((c, j) => <FeatureCard key={j} {...c} />)}
              </Reveal>
            ) : (
              <Reveal key={i} className="rounded-3xl overflow-hidden pt-10 px-10 mb-16" style={{ height: feature.height ?? 700, backgroundColor: "#94A3B814" }}>
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
              </Reveal>
            )
          ))}

          <Reveal className="border-t border-slate-100 pt-10">
            <Tag color="#64748b">{t.s04.rejectedTag}</Tag>
            <div className="flex flex-col divide-y divide-slate-100 mt-6">
              {t.s04.rejected.map((r) => (
                <div key={r.title} className="flex items-start gap-3 py-5">
                  <span className="text-slate-300 font-medium flex-shrink-0 mt-0.5">✕</span>
                  <p className="text-[15px]">
                    <span className="line-through decoration-slate-300 text-slate-400 font-semibold">{r.title}</span>
                    <span className="block text-slate-500 mt-1">{r.reason}</span>
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* 05 */}
        <div id="s05" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s05.h2}</h2>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.s05.items.map((item, i) => {
              const Icon = lessonIcons[i % lessonIcons.length]
              return (
                <StaggerItem key={i} className="border border-slate-200 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl" style={{ backgroundColor: PRIMARY + "1A" }}>
                    <Icon style={{ width: 28, height: 28, color: PRIMARY }} />
                  </div>
                  <p className="font-semibold text-slate-900 mt-3">{item.title}</p>
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
