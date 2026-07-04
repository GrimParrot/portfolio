import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"

const PRIMARY = "#32685B"

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

const copy = {
  pl: {
    desc: "Projekt UI mobilnej wersji sklepu z naturalnymi kosmetykami i produktami do pielęgnacji.",
    meta: [
      { label: "Produkt", value: "Naturalnie.pl" },
      { label: "Skala", value: "Projekt koncepcyjny" },
      { label: "Branża", value: "E-commerce\nBeauty & Care" },
      { label: "Użytkownicy", value: "Kobiety 25–45, świadome konsumentki" },
    ],
    s01: { tag: "01 — Screens", h2: "Kluczowe ekrany" },
    s02: { tag: "02 — Design system", h2: "Kolory, typografia, komponenty" },
  },
  en: {
    desc: "UI project for the mobile version of a natural cosmetics and personal care online store.",
    meta: [
      { label: "Product", value: "Naturalnie.pl" },
      { label: "Scale", value: "Concept project" },
      { label: "Industry", value: "E-commerce\nBeauty & Care" },
      { label: "Users", value: "Women 25–45, conscious consumers" },
    ],
    s01: { tag: "01 — Screens", h2: "Key screens" },
    s02: { tag: "02 — Design system", h2: "Colors, typography, components" },
  },
}

export function NaturalniePage() {
  const { lang } = useLang()
  const t = copy[lang]


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/ui/naturalnie" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            Naturalnie.pl
          </h1>
          <span className="inline-block mb-6 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0F172A] text-white">UI</span>

          <p className="text-slate-500 leading-relaxed mb-10">{t.desc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {t.meta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1 whitespace-pre-line">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/naturalnie.png" alt="Naturalnie.pl — main view" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SCREENS ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s01.h2}</h2>

          <div className="flex flex-col gap-6">
            <img src="/naturalniepl1.png" alt="Naturalnie.pl — view 1" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/naturalniepl2.png" alt="Naturalnie.pl — view 2" className="w-full block rounded-2xl border border-slate-200" />
          </div>
        </div>

        <Divider />

        {/* ── DESIGN SYSTEM ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <div className="flex flex-col gap-6">
            <img src="/ui-summary-3.png" alt="UI Summary 3" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary.png" alt="UI Summary" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary-1.png" alt="UI Summary 1" className="w-full block rounded-2xl border border-slate-200" />
            <img src="/ui-summary-2.png" alt="UI Summary 2" className="w-full block rounded-2xl border border-slate-200" />
          </div>
        </div>

        <NextProject currentHref="/ui/naturalnie" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
