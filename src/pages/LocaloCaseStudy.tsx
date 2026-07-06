import { useEffect, useRef, useState } from "react"
import { Lightbulb, GraduationCap } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/localo.copy"

function CrossfadeImage({ images, interval }: { images: string[]; interval: number }) {
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
    <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
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

function StatCard({ num, caption, color, active }: { num: string; caption: string; color: string; active: boolean }) {
  const { prefix, numeric, suffix, decimals } = parseNum(num)
  const count = useCountUp(numeric, 1100, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = `${prefix}${formatted}${suffix}`

  return (
    <div className="relative overflow-hidden rounded-2xl p-6 flex flex-col" style={{ backgroundColor: color + "0D" }}>
      <div
        className="absolute top-0 right-0 w-40 h-40"
        style={{
          backgroundImage: [
            `repeating-linear-gradient(0deg, ${color}30 0px, ${color}30 1px, transparent 1px, transparent 22px)`,
            `repeating-linear-gradient(90deg, ${color}30 0px, ${color}30 1px, transparent 1px, transparent 22px)`,
          ].join(", "),
          WebkitMaskImage: "radial-gradient(circle at 100% 0%, black 0%, transparent 75%)",
          maskImage: "radial-gradient(circle at 100% 0%, black 0%, transparent 75%)",
        }}
      />
      <div className="relative z-10 flex flex-col">
        <p className="text-5xl font-black tracking-tight leading-none" style={{ color }}>{display}</p>
        <p className="text-sm text-[#0F172A] leading-relaxed mt-5">{caption}</p>
      </div>
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
  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((m) => (
        <StatCard key={m.caption} num={m.num} caption={m.caption} color={m.color} active={active} />
      ))}
    </div>
  )
}


const PRIMARY = "#466AFA"

export function LocaloCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/localo" />
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            {t.h1}
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0ABA53] text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-10">
            {t.intro}<strong style={{ color: "#0F172A" }}>{t.introProduct}</strong>{t.introSuffix}
          </p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#EEF2FF" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
            <p style={{ color: PRIMARY }}>
              <strong className="font-semibold">{t.roleLabel}</strong> — {t.roleText}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {t.meta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/Sales mode.png" alt="Client Acquisition — main view" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── 01 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-4">{t.s01.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s01.body}</p>

          <MetricsGrid metrics={t.s01.metrics} />

          <p className="text-slate-500 leading-relaxed mt-12">{t.s01.lastPara}</p>
        </div>

        <Divider />

        {/* ── 02 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <p className="font-light text-[#0F172A] mt-4 mb-12 pl-6 border-l-4" style={{ fontSize: "22px", lineHeight: 1.5, borderColor: PRIMARY }}>
            {t.s02.pullQuote}
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">{t.s02.insightsH3}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.s02.insights.map((item) => (
              <div key={item.n} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: "#F97316" }} />
                <p className="font-semibold text-slate-900 mt-3 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Tag>{t.s02.methodsLabel}</Tag>
            <div className="flex flex-wrap gap-3 mt-3">
              {t.s02.methods.map((m) => (
                <Badge key={m.label} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium [&>svg]:text-[#466AFA]">
                  {m.icon}{m.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 03 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s03.h2}</h2>

          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start mb-6">
              <div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.bodyH3}</h3>
                <p className="text-slate-500 leading-relaxed">{t.s03.body}</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5 grid grid-cols-2 gap-6">
                {t.s03.scopeCols.map((col) => (
                  <div key={col.label}>
                    <p className="text-[13px] font-medium tracking-widest uppercase text-slate-400 mb-3">{col.label}</p>
                    <ul className="flex flex-col gap-2">
                      {col.items.map((item) => (
                        <li key={item} className="flex gap-2 text-slate-500 text-[13px]">
                          <span className="flex-shrink-0 font-bold text-[13px]" style={{ color: col.inScope ? "#22c55e" : "#ef4444" }}>
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

            <div className="flex gap-3 items-start rounded-lg px-6 py-5 mt-10" style={{ background: "#EEF2FF" }}>
              <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
              <p style={{ color: PRIMARY }}>
                <strong className="font-semibold">{t.s03.goalLabel}</strong> — {t.s03.goalText}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-12 md:[&>*:first-child]:order-2">
            <div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.flowH3}</h3>
              <p className="text-slate-500 leading-relaxed">{t.s03.flowDesc}</p>
            </div>
            <img src="/flow.png" alt="User flow — Client Acquisition" className="w-full rounded-2xl border border-slate-200" />
          </div>

          <div className="mt-16 mb-6">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.synthesisH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.synthesisDesc}</p>
            <img src="/summary.png" alt="Research synthesis" className="w-full rounded-2xl border border-slate-200" />
          </div>

          <div className="mt-16 mb-8">
            <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{t.s03.lofiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.lofiDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <img src="/content.png" alt="Lo-fi — Content" className="w-full rounded-2xl border border-slate-200" />
              <img src="/content-1.png" alt="Lo-fi — Content 1" className="w-full rounded-2xl border border-slate-200" />
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 04 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s04.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-6">{t.s04.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>

          {t.s04.steps.map((feature, i) => (
            "fullWidthTextTop" in feature && feature.fullWidthTextTop ? (
              <div key={i} className="mb-16">
                <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8">{feature.desc}</p>
                <img src={feature.img} alt={feature.title} className="w-full rounded-2xl border border-slate-200 object-cover" />
              </div>
            ) : "fullWidth" in feature && feature.fullWidth ? (
              <div key={i} className="mb-16">
                <CrossfadeImage images={["/modal.png", "/lead list.png"]} interval={2000} />
                <span className="text-[13px] font-medium tracking-widest uppercase mt-8 mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ) : (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${feature.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <span className="text-[13px] font-medium tracking-widest uppercase mb-2 block" style={{ color: PRIMARY }}>{feature.step}</span>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
                <img src={feature.img} alt={feature.imgAlt} className={`w-full rounded-2xl border border-slate-200 ${"contain" in feature && feature.contain ? "object-contain bg-secondary" : "object-cover"}`} style={"contain" in feature && feature.contain ? {} : { aspectRatio: "16/9" }} />
              </div>
            )
          ))}

          <div className="border-t border-slate-100 pt-10">
            <Tag color="#64748b">{t.s04.rejectedTag}</Tag>
            <div className="flex flex-col gap-3 mt-6">
              {t.s04.rejected.map((r) => (
                <div key={r.title} className="flex gap-3 items-center bg-red-50 rounded-lg px-6 py-5">
                  <span className="text-red-400 font-medium flex-shrink-0">✕</span>
                  <p className="text-red-900 text-[15px]">
                    <strong className="font-semibold">{r.title}</strong> — {r.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* ── 05 ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s05.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-4">{t.s05.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s05.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.s05.items.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-6">
                <GraduationCap style={{ width: 24, height: 24, color: "#F97316" }} />
                <p className="font-semibold text-slate-900 mt-3">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <NextProject currentHref="/case-study/localo" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
