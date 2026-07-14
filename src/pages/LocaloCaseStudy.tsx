import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Frown, FlaskConical, Users, ClipboardCheck } from "lucide-react"

const lessonIcons = [FlaskConical, Users, ClipboardCheck]
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/localo.copy"

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

function StaggerItem({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div className={className} style={style} variants={fadeUp}>
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

function PullQuote({ segments }: { segments: { text: string; accent?: boolean }[] }) {
  const reduce = useReducedMotion()
  return (
    <motion.p
      className="font-light text-[#0F172A] mt-4 mb-12 pl-6 border-l-4 text-4xl md:text-5xl"
      style={{ lineHeight: 1.5, borderColor: PRIMARY }}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          variants={{ hidden: { opacity: reduce ? 1 : 0.22 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
          className={seg.accent ? "font-black" : undefined}
          style={seg.accent ? { color: PRIMARY } : undefined}
        >
          {seg.text}
        </motion.span>
      ))}
    </motion.p>
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

function CrossfadeImage({ images, interval, fill = false }: { images: string[]; interval: number; fill?: boolean }) {
  const [index, setIndex] = useState(0)
  const [next, setNext] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const positions = ["center", "top"]

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (index + 1) % images.length
      setNext(nextIndex)
      setAnimating(false)
      requestAnimationFrame(() => requestAnimationFrame(() => {
        setAnimating(true)
        setTimeout(() => {
          setIndex(nextIndex)
          setNext(null)
          setAnimating(false)
        }, 650)
      }))
    }, interval)
    return () => clearInterval(timer)
  }, [index, images.length, interval])

  const fromRight = next !== null && next % 2 === 1

  return (
    <div className={fill ? "absolute inset-0 overflow-hidden" : "relative w-full rounded-2xl shadow-xl overflow-hidden"} style={fill ? undefined : { aspectRatio: "16/9" }}>
      <img
        src={images[index]}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: positions[index % positions.length], zIndex: 1 }}
      />
      {next !== null && (
        <img
          src={images[next]}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            objectPosition: positions[next % positions.length],
            transform: animating ? "translateX(0)" : `translateX(${fromRight ? "100%" : "-100%"})`,
            transition: animating ? "transform 0.6s ease-in-out" : "none",
            zIndex: 2,
          }}
        />
      )}
    </div>
  )
}

function LaptopMockup({ images, interval = 2000 }: { images: string[]; interval?: number }) {
  return (
    <div className="relative w-full">
      <img src="/localo-laptop-mockup.webp" alt="" className="w-full block" />
      <div className="absolute overflow-hidden" style={{ left: "20.88%", top: "13.16%", width: "60.52%", height: "59.3%" }}>
        <CrossfadeImage images={images} interval={interval} fill />
      </div>
    </div>
  )
}

function StepCard({ step, title, desc, img, imgAlt, contain, height = 420 }: { step: string; title: string; desc: string; img?: string; imgAlt?: string; contain?: boolean; height?: number }) {
  return (
    <div className="group rounded-3xl overflow-hidden pt-10 px-10" style={{ height, backgroundColor: "#94A3B814" }}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-2xl font-bold text-[#0F172A]">{title}</h3>
        <span className="text-[13px] font-medium tracking-widest uppercase flex-shrink-0" style={{ color: PRIMARY }}>{step}</span>
      </div>
      <p className="text-slate-500 leading-relaxed">{desc}</p>
      <div className="mt-10">
        {contain ? (
          <div className="w-full rounded-2xl shadow-xl flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "#F5F5F5" }}>
            <img src={img} alt={imgAlt} className="object-contain" style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </div>
        ) : (
          <img src={img} alt={imgAlt} className="w-full rounded-t-2xl shadow-xl transition-transform duration-500 group-hover:scale-[1.02]" />
        )}
      </div>
    </div>
  )
}

function ImageCard({ img, imgAlt, height = 420 }: { img: string; imgAlt: string; height?: number }) {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ height, backgroundColor: "#0F172A" }}>
      <img src={img} alt={imgAlt} className="w-full h-full object-cover" style={{ objectPosition: "top" }} />
    </div>
  )
}

function ImageMarquee({ images, height = 420, duration = 32, reverse = false }: { images: { img: string; alt: string }[]; height?: number; duration?: number; reverse?: boolean }) {
  const doubled = [...images, ...images]
  return (
    <div className="group relative w-full overflow-hidden" style={{ height }}>
      <div className="marquee-track flex gap-5 h-full" style={{ width: "max-content", animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {doubled.map((im, i) => (
          <img key={i} src={im.img} alt={im.alt} className="h-full w-auto rounded-2xl border border-slate-200 object-contain flex-shrink-0" />
        ))}
      </div>
      <style>{`
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track { animation: marqueeScroll linear infinite; }
        .group:hover .marquee-track { animation-play-state: paused; }
      `}</style>
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

function parseNum(str: string) {
  const prefix = str.startsWith("+") ? "+" : ""
  const s = prefix ? str.slice(1) : str
  const match = s.match(/^([\d,.]+)(.*)$/)
  if (!match) return { prefix, numeric: 0, suffix: str, decimals: 0 }
  const numStr = match[1].replace(",", ".")
  const numeric = parseFloat(numStr)
  const suffix = match[2]
  const decPart = match[1].split(/[,.]/)
  const decimals = decPart.length > 1 ? decPart[1].length : 0
  return { prefix, numeric, suffix, decimals }
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
  const { prefix, numeric, suffix, decimals } = parseNum(num)
  const count = useCountUp(numeric, 1100, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = `${prefix}${formatted}${suffix}`
  const patternColor = dark ? "#FFFFFF" : color
  const textColor = dark ? "#FFFFFF" : "#0F172A"

  return (
    <div className={`relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between h-full transition-transform duration-300 hover:-translate-y-1 ${className}`} style={{ backgroundColor: dark ? "#0F172A" : color + bgAlpha }}>
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
      <p className={`relative z-10 font-black tracking-tight leading-none ${large ? "text-7xl" : "text-5xl"}`} style={{ color: textColor }}>{display}</p>
      <p className="relative z-10 text-sm leading-relaxed mt-5" style={{ color: textColor }}>{caption}</p>
    </div>
  )
}

function MetricsGrid({ metrics }: { metrics: Array<{ num: string; caption: string; color: string; icon: string }> }) {
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
  const [a, b, c, d] = metrics
  const gray = "#94A3B8"
  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] sm:grid-rows-2 gap-6">
      <StatCard num={a.num} caption={a.caption} color={a.color} active={active} className="sm:row-span-2" dark large />
      <StatCard num={b.num} caption={b.caption} color={gray} active={active} className="sm:row-span-2" bgAlpha="14" large />
      <StatCard num={c.num} caption={c.caption} color={gray} active={active} bgAlpha="14" />
      <StatCard num={d.num} caption={d.caption} color={gray} active={active} bgAlpha="14" />
    </div>
  )
}

export function LocaloCaseStudy() {
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

        {/* ── HERO ── */}
        <div id="hero" className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/localo" />
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
                {t.intro}<strong style={{ color: "#0F172A" }}>{t.introProduct}</strong>{t.introSuffix}
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
              <img src="/client-acquisition-cover.webp" alt="Client Acquisition, main view" className="w-full rounded-2xl border border-slate-200 object-cover" />
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── 01 ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">{t.s01.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s01.body}</p>
          </Reveal>

          <Reveal>
            <MetricsGrid metrics={t.s01.metrics} />
          </Reveal>

          <Reveal>
            <p className="text-slate-500 leading-relaxed mt-12">{t.s01.lastPara}</p>
          </Reveal>
        </div>

        <Divider />

        {/* ── 02 ── */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <PullQuote segments={t.s02.pullQuote} />

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <Badge key={m.label} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium bg-[#94A3B814] hover:bg-[#94A3B814] [&>svg]:text-[#466AFA]">
                  {m.icon}{m.label}
                </Badge>
              ))}
            </div>
          </Reveal>

          <Reveal className="rounded-3xl p-10 mt-10" style={{ backgroundColor: "#22C55E14" }}>
            <div className="mb-3">
              <Tag color="#16A34A">{t.s03.goalLabel}</Tag>
            </div>
            <p className="text-2xl font-light" style={{ color: "#16A34A" }}>{t.s03.goalText}</p>
          </Reveal>
        </div>

        <Divider />

        {/* ── 03 ── */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s03.h2}</h2>
          </Reveal>

          <Reveal className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.bodyH3}</h3>
                <p className="text-slate-500 leading-relaxed">{t.s03.body}</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {t.s03.scopeCols.map((col) => (
                  <div key={col.label} className="rounded-xl p-5" style={{ backgroundColor: col.inScope ? "#22C55E14" : "#FFE2E2" }}>
                    <p className="text-[13px] font-medium tracking-widest uppercase text-slate-400 mb-3">{col.label}</p>
                    <ul className="flex flex-col gap-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2 text-[13px]" style={{ color: col.inScope ? "#16A34A" : "#b91c1c" }}>
                          <span className="flex-shrink-0 font-bold text-[13px]" style={{ color: col.inScope ? "#16A34A" : "#ef4444" }}>
                            {col.inScope ? "✓" : "✕"}
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 md:[&>*:first-child]:order-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.flowH3}</h3>
              <p className="text-slate-500 leading-relaxed">{t.s03.flowDesc}</p>
            </div>
            <img src="/flow.png" alt="User flow, Client Acquisition" className="w-full rounded-2xl border border-slate-200" />
          </Reveal>

          <Reveal className="mt-16 mb-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.synthesisH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.synthesisDesc}</p>
            <img src="/summary.png" alt="Research synthesis" className="w-full rounded-2xl border border-slate-200" />
          </Reveal>

          <Reveal className="mt-16 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s03.lofiH3}</h2>
            <div className="flex flex-col gap-5">
              <ImageMarquee images={t.s03.lofiImages.slice(0, 4)} height={280} />
              <ImageMarquee images={t.s03.lofiImages.slice(4, 8)} height={280} reverse />
            </div>
          </Reveal>
        </div>

        <Divider />

        {/* ── 04 ── */}
        <div id="s04" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-6">{t.s04.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>
          </Reveal>

          {t.s04.steps.map((feature, i) => (
            "laptopMockup" in feature && feature.laptopMockup ? (
              <Reveal key={i} className="mb-16">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10">{feature.desc}</p>
                <LaptopMockup images={feature.laptopImages ?? []} />
              </Reveal>
            ) : "smallCards" in feature ? (
              <Reveal key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <div className="grid grid-rows-2 gap-6">
                  {feature.smallCards?.map((c, j) => <StepCard key={j} {...c} height={338} />)}
                </div>
                {feature.bigCard && <StepCard {...feature.bigCard} height={700} />}
              </Reveal>
            ) : "companionImg" in feature && feature.companionImg ? (
              <Reveal key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                <StepCard {...feature} />
                <ImageCard img={feature.companionImg} imgAlt={feature.companionImgAlt ?? ""} height={feature.height} />
              </Reveal>
            ) : "bleedImg" in feature && feature.bleedImg ? (
              <Reveal key={i} className="mb-16">
                <h3 className="text-2xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-10">{feature.desc}</p>
                <img src={feature.img} alt={feature.imgAlt ?? ""} className="w-full" />
              </Reveal>
            ) : (
              <Reveal key={i} className="mb-16">
                <StepCard {...feature} />
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

        {/* ── 05 ── */}
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

        <NextProject currentHref="/case-study/localo" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
