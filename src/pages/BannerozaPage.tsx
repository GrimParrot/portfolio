import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Lightbulb } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/banneroza.copy"

const PRIMARY = "#DD8100"

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

export function BannerozaPage() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "hero", label: t.chapters.hero },
    { id: "s01", label: t.chapters.s01 },
    { id: "s02", label: t.chapters.s02 },
    { id: "s03", label: t.chapters.s03 },
    { id: "s04", label: t.chapters.s04 },
    { id: "s05", label: t.chapters.s05 },
    { id: "s06", label: t.chapters.s06 },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />
      <ProgressRail chapters={chapters} />

      <div className="max-w-[1200px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div id="hero" className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/banneroza" />
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
              <p className="text-slate-500 leading-relaxed mb-10">{t.body}</p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#FFF3E0" }}>
                <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
                <p style={{ color: "#6b3a00" }}>
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
              <img src="/banneroza/cover2.jpg" alt="Banneroza, cover" className="w-full rounded-2xl border border-slate-200 object-cover" />
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s01.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s01.p1}</p>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s01.p2}</p>
          </Reveal>
          <Reveal>
            <img src="/banneroza/1.jpg" alt="Problem, banners in cities" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── SOLUTION ── */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p1}</p>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p2}</p>
              <p className="text-slate-500 leading-relaxed">{t.s02.p3}</p>
            </div>
            <img src="/banneroza/3.jpg" alt="Szyldowe Rewolucje, solution" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── DISCOVERY ── */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s03.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-6">{t.s03.p1}</p>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s03.p2}</p>
          </Reveal>

          <Reveal className="rounded-xl px-6 py-5 mb-12" style={{ background: "#FFF3E0" }}>
            <p className="text-[13px] font-medium tracking-widest uppercase mb-4" style={{ color: PRIMARY }}>{t.s03.questionsLabel}</p>
            <ul className="flex flex-col gap-2">
              {t.s03.questions.map((q) => (
                <li key={q} className="flex gap-3 text-[15px]" style={{ color: "#6b3a00" }}>
                  <span style={{ color: PRIMARY }} className="flex-shrink-0 font-bold">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal>
            <img src="/banneroza/4.jpg" alt="Research, quantitative data" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.insightsH3}</h3>
          </Reveal>
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.s03.insights.map((item) => (
              <StaggerItem key={item.title} className="border border-slate-200 rounded-xl p-6 transition-transform duration-300 hover:-translate-y-1">
                <Lightbulb style={{ width: 24, height: 24, color: PRIMARY }} className="mb-3" />
                <p className="font-semibold text-slate-900 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.personaH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s03.personaDesc}</p>
            <img src="/banneroza/5.jpg" alt="Persona" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── PROCES ── */}
        <div id="s04" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-8">{t.s04.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s04.p}</p>
          </Reveal>
          <Reveal>
            <img src="/banneroza/6.jpg" alt="Information architecture" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── DESIGN ── */}
        <div id="s05" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s05.h2}</h2>
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.lofiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s05.lofiP}</p>
            <img src="/banneroza/7.jpg" alt="Low fidelity wireframes" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />
          </Reveal>

          <Reveal>
            <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.hifiH3}</h3>
            <p className="text-slate-500 leading-relaxed mb-8">{t.s05.hifiP}</p>
            <img src="/banneroza/8.jpg" alt="High fidelity mockup" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── WNIOSKI ── */}
        <div id="s06" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-4">{t.s06.h2}</h2>
            <p className="text-slate-500 leading-relaxed mb-12">{t.s06.intro}</p>
          </Reveal>

          <Reveal className="border border-slate-200 rounded-xl divide-y divide-slate-100 mb-12">
            {t.s06.items.map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <NextProject currentHref="/case-study/banneroza" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
