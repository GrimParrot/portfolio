import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"

const PRIMARY = "#8EBD3F"

function Tag({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="text-[13px] font-medium tracking-widest uppercase text-slate-400" style={color ? { color } : undefined}>
      {children}
    </span>
  )
}

function Divider() {
  return <hr className="border-t border-slate-100 my-0" />
}

const copy = {
  pl: {
    desc: "Projekt UI sklepu internetowego dla polskiej palarni kawy specialty Kafejeto — świeżo palona kawa ziarnista, akcesoria baristyczne i szkolenia dla miłośników kawy.",
    meta: [
      { label: "Produkt", value: "Kafejeto.pl" },
      { label: "Branża", value: "E-commerce · Coffee" },
      { label: "Użytkownicy", value: "Miłośnicy kawy specialty" },
      { label: "Zakres", value: "Sklep internetowy" },
    ],
    s01: { tag: "01 — Screens", h2: "Kluczowe ekrany" },
    s02: { tag: "02 — Mobile", h2: "Wersja mobilna" },
    s03: { tag: "03 — Overview", h2: "Całość w jednym widoku" },
  },
  en: {
    desc: "UI project for the Polish specialty coffee roastery Kafejeto — freshly roasted whole bean coffee, barista accessories and training for coffee enthusiasts.",
    meta: [
      { label: "Product", value: "Kafejeto.pl" },
      { label: "Industry", value: "E-commerce · Coffee" },
      { label: "Users", value: "Specialty coffee enthusiasts" },
      { label: "Scope", value: "Online store" },
    ],
    s01: { tag: "01 — Screens", h2: "Key screens" },
    s02: { tag: "02 — Mobile", h2: "Mobile version" },
    s03: { tag: "03 — Overview", h2: "Everything in one view" },
  },
}

export function KafejetoPage() {
  const { lang } = useLang()
  const t = copy[lang]


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/ui/kafejeto" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            Kafejeto.pl
          </h1>
          <span className="inline-block mb-6 text-sm font-semibold px-3 py-1.5 rounded-full bg-violet-600 text-white">UI</span>

          <p className="text-slate-500 leading-relaxed mb-10">{t.desc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {t.meta.map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/kafejeto/okladka.jpg" alt="Kafejeto — cover" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SCREENS ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">{t.s01.h2}</h2>

          <div className="flex flex-col gap-6">
            <img src="/kafejeto/page1.jpg" alt="Page 1" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page2.jpg" alt="Page 2" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page3.jpg" alt="Page 3" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page4.jpg" alt="Page 4" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── MOBILE ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="/kafejeto/mobile1.jpg" alt="Mobile 1" className="w-full rounded-2xl border border-slate-200 object-cover" />
            <img src="/kafejeto/mobile2.jpg" alt="Mobile 2" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── OVERVIEW ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">{t.s03.h2}</h2>

          <img src="/kafejeto/overview.jpg" alt="Overview" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <NextProject currentHref="/ui/kafejeto" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
