import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/kafejeto.copy"

const PRIMARY = "#8EBD3F"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
}

const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
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

export function KafejetoPage() {
  const { lang } = useLang()
  const t = copy[lang]

  const chapters = [
    { id: "hero", label: t.chapters.hero },
    { id: "s01", label: t.chapters.s01 },
    { id: "s02", label: t.chapters.s02 },
    { id: "s03", label: t.chapters.s03 },
  ]

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />
      <ProgressRail chapters={chapters} />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div id="hero" className="py-8 md:py-16">
          <ProjectNav currentHref="/ui/kafejeto" />
          <HeroStagger>
            <StaggerItem>
              <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
                Kafejeto.pl
              </h1>
            </StaggerItem>

            <StaggerItem>
              <span className="inline-block mb-6 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0F172A] text-white">UI</span>
            </StaggerItem>

            <StaggerItem>
              <p className="text-slate-500 leading-relaxed mb-10">{t.desc}</p>
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
              <img src="/kafejeto/okladka.jpg" alt="Kafejeto, cover" className="w-full rounded-2xl border border-slate-200 object-cover" />
            </StaggerItem>
          </HeroStagger>
        </div>

        <Divider />

        {/* ── SCREENS ── */}
        <div id="s01" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s01.h2}</h2>
          </Reveal>

          <Reveal className="flex flex-col gap-6">
            <img src="/kafejeto/page1.jpg" alt="Page 1" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page2.jpg" alt="Page 2" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page3.jpg" alt="Page 3" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page4.jpg" alt="Page 4" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── MOBILE ── */}
        <div id="s02" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s02.h2}</h2>
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="/kafejeto/mobile1.jpg" alt="Mobile 1" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/mobile2.jpg" alt="Mobile 2" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <Divider />

        {/* ── OVERVIEW ── */}
        <div id="s03" className="py-20 md:py-28">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0F172A] mb-12">{t.s03.h2}</h2>
          </Reveal>

          <Reveal>
            <img src="/kafejeto/overview.jpg" alt="Overview" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </Reveal>
        </div>

        <NextProject currentHref="/ui/kafejeto" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
