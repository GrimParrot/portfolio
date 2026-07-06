import { useEffect, useRef, useState } from "react"
import { Lightbulb, ArrowLeftRight, AlertTriangle, GraduationCap, Target, TrendingUp } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { Badge } from "@/components/ui/badge"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/raporty.copy"

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
    <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
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
    <div className="relative w-full rounded-2xl border border-slate-200 overflow-hidden" style={{ aspectRatio: "16/9" }}>
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

function StatCard({ num, caption, color, active, className = "" }: { num: string; caption: string; color: string; active: boolean; className?: string }) {
  const { prefix, numeric, suffix, decimals, staticDisplay } = parseNum(num)
  const count = useCountUp(numeric, 1100, active)
  const formatted = decimals > 0
    ? count.toFixed(decimals).replace(".", ",")
    : Math.round(count).toString()
  const display = staticDisplay ?? `${prefix}${formatted}${suffix}`

  return (
    <div className={`relative overflow-hidden rounded-2xl p-6 flex flex-col ${className}`} style={{ backgroundColor: color + "0D" }}>
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
        <p className="text-6xl font-black tracking-tight leading-none" style={{ color }}>{display}</p>
        <p className="text-sm text-[#0F172A] leading-relaxed mt-5">{caption}</p>
      </div>
    </div>
  )
}

function MetricsGrid3({ metrics }: { metrics: Array<{ num: string; caption: string; color: string; icon: string }> }) {
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
  const [a, b, c] = metrics
  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "1.5rem" }}>
      <StatCard num={a.num} caption={a.caption} color={a.color} active={active} />
      <div style={{ gridColumn: "2", gridRow: "1 / 3", display: "flex", flexDirection: "column" }}>
        <StatCard num={c.num} caption={c.caption} color={c.color} active={active} className="h-full" />
      </div>
      <StatCard num={b.num} caption={b.caption} color={b.color} active={active} />
    </div>
  )
}

const PRIMARY = "#466AFA"

export function RaportyCaseStudy() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* HERO */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/raporty" />
          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            {t.h1}
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0ABA53] text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-10">
            {t.intro}<strong className="text-slate-700">{t.introProduct}</strong>{t.introSuffix}
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

          <img src="/raporty-cover.webp" alt="Kreator Raportów" className="w-full rounded-2xl border border-slate-200 object-cover" style={{ aspectRatio: "16/9" }} />
        </div>

        <Divider />

        {/* 01 */}
        <div className="py-20">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          {t.s01.h2 && <h2 className="text-3xl font-bold text-[#0F172A] mt-6 mb-8">{t.s01.h2}</h2>}
          <p className="text-slate-500 leading-relaxed mb-16">{t.s01.body}</p>
          <MetricsGrid3 metrics={t.s01.metrics} />
          <p className="text-slate-500 leading-relaxed mt-12">{t.s01.lastPara}</p>
          <blockquote className="mt-16 flex gap-4 items-start">
            <span className="text-6xl leading-none select-none font-serif flex-shrink-0" style={{ color: PRIMARY }}>&ldquo;</span>
            <p className="text-slate-700 italic leading-relaxed flex-1" style={{ fontSize: "18px" }}>{t.s01.quote}</p>
            <span className="text-6xl leading-none select-none font-serif flex-shrink-0 self-end" style={{ color: PRIMARY }}>&rdquo;</span>
          </blockquote>
        </div>

        <Divider />

        {/* 02 */}
        <div className="py-20">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <p className="font-light text-[#0F172A] mt-4 mb-12 pl-6 border-l-4" style={{ fontSize: "22px", lineHeight: 1.5, borderColor: PRIMARY }}>
            {t.s02.pullQuote}
          </p>

          <h3 className="text-lg font-semibold text-[#0F172A] mb-4">{t.s02.insightsH3}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Badge key={m.label} variant="secondary" className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium [&>svg]:text-[#6366F1]">
                  {m.icon}{m.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <Divider />

        {/* 03 */}
        <div className="py-20">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-6">{t.s03.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-14">{t.s03.intro}</p>

          <div className="flex flex-col gap-12">
            {t.s03.steps.map((step) => (
              <div key={step.n}>
                {step.visual === "pivot" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                      <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                    </div>
                    <img src="/raporty-user-stories.webp" alt="User stories" className="w-full rounded-2xl border border-slate-200 object-cover" />
                  </div>
                ) : (
                  <div>
                    <h3 className="text-lg font-semibold text-[#0F172A] mb-2">{step.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                )}

                {step.visual === "pivot" && (
                  <div className="flex gap-3 items-start rounded-lg px-6 py-5 mt-10" style={{ background: "#EEF2FF" }}>
                    <ArrowLeftRight className="flex-shrink-0" style={{ width: 18, height: 18, color: PRIMARY, marginTop: 2 }} />
                    <p className="leading-relaxed" style={{ color: PRIMARY }}>{t.s03.pivotText}</p>
                  </div>
                )}

                {step.visual === "profile" && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                      {t.s03.profileBoxes.map((box) => (
                        <div key={box.title} className="border border-slate-200 rounded-xl p-6">
                          <div className="flex items-center gap-2 mb-3">
                            {box.icon === "target" && <Target style={{ width: 20, height: 20, color: PRIMARY }} />}
                            {box.icon === "warning" && <AlertTriangle style={{ width: 20, height: 20, color: PRIMARY }} />}
                            {box.icon === "trending" && <TrendingUp style={{ width: 20, height: 20, color: PRIMARY }} />}
                            <p className="font-semibold text-slate-900">{box.title}</p>
                          </div>
                          <ul className="flex flex-col gap-1.5">
                            {box.tags.map((tag) => (
                              <li key={tag} className="text-slate-500 text-[14px] leading-relaxed">
                                · {tag}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {step.visual === "scope" && (
                  <img src="/raporty-scope.webp" alt="Zakres projektu" className="w-full rounded-2xl border border-slate-200 mt-10 object-cover" />
                )}

                {step.visual === "flow" && (
                  <div className="mt-10">
                    <ImageCarousel images={["/raporty-flow-1.webp", "/raporty-flow-2.webp", "/raporty-flow-3.webp"]} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <Divider />

        {/* 04 */}
        <div className="py-20">
          <Tag color={PRIMARY}>{t.s04.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-6">{t.s04.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s04.intro}</p>

          {t.s04.steps.map((feature, i) => (
            feature.stack ? (
              <div key={i} className="mb-16">
                <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">{feature.desc}</p>
                {feature.visual === "sidebarSwap" ? (
                  <SidebarSettingsSwap
                    base="/raporty-section.webp"
                    overlay="/raporty-settings.webp"
                    overlayRect={{ top: 6.91, left: 0, width: 17.78, height: 109.6 }}
                  />
                ) : feature.visual === "autoScrollReport" ? (
                  <AutoScrollImage src="/raporty-raport.webp" imageAspect={1440 / 3795} />
                ) : feature.img ? (
                  <img src={feature.img} alt={feature.imgAlt} className="w-full rounded-2xl border border-slate-200 object-cover" style={{ aspectRatio: "16/9", objectPosition: "top" }} />
                ) : (
                  <div className="w-full rounded-2xl border border-slate-200 bg-slate-50" style={{ aspectRatio: "16/9" }} />
                )}
              </div>
            ) : (
              <div key={i} className={`grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16 ${feature.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-3">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
                </div>
                {feature.img ? (
                  feature.imgFit === "cover" ? (
                    <img src={feature.img} alt={feature.imgAlt} className="w-full rounded-2xl border border-slate-200 object-cover" style={{ aspectRatio: "16/9", objectPosition: "top" }} />
                  ) : (
                    <div className="w-full rounded-2xl border border-slate-200 flex items-center justify-center" style={{ aspectRatio: "16/9", backgroundColor: "#F5F5F5" }}>
                      <img src={feature.img} alt={feature.imgAlt} className="object-contain" style={{ maxWidth: "100%", maxHeight: "100%" }} />
                    </div>
                  )
                ) : (
                  <div className="w-full rounded-2xl border border-slate-200 bg-slate-50" style={{ aspectRatio: "16/9" }} />
                )}
              </div>
            )
          ))}

          <div className="border-t border-slate-100 pt-10">
            <Tag color="#64748b">{t.s04.rejectedTag}</Tag>
            <div className="flex flex-col gap-3 mt-6">
              {t.s04.rejected.map((r) => (
                <div key={r.title} className="flex gap-3 items-start bg-red-50 rounded-lg px-6 py-5">
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

        {/* 05 */}
        <div className="py-20">
          <Tag color={PRIMARY}>{t.s05.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-4">{t.s05.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s05.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {t.s05.items.map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-6">
                <GraduationCap style={{ width: 24, height: 24, color: "#F97316" }} />
                <p className="font-semibold text-slate-900 mt-3 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <NextProject currentHref="/case-study/raporty" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}