import { useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { ContactCTA } from "@/components/ContactCTA"

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

function ScreenPlaceholder({ label }: { label: string }) {
  return (
    <div className="bg-secondary border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 py-16 px-6 text-center">
      <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-slate-300">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
      <p className="font-medium text-slate-400">{label}</p>
    </div>
  )
}

export function KafejetoPage() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto"
    window.scrollTo(0, 0)
    setTimeout(() => { document.documentElement.style.scrollBehavior = "" }, 100)
  }, [])

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-32">

        {/* ── HERO ── */}
        <div className="py-16">
          <ProjectNav currentHref="/ui/kafejeto" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            Kafejeto.pl
          </h1>
          <span className="inline-block mb-6 text-sm font-semibold px-3 py-1.5 rounded-full bg-violet-600 text-white">UI</span>

          <p className="text-slate-500 leading-relaxed mb-10">
            Projekt UI sklepu internetowego dla polskiej palarni kawy specialty Kafejeto — świeżo palona kawa ziarnista, akcesoria baristyczne i szkolenia dla miłośników kawy.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-b border-slate-100 py-6 mb-10">
            {[
              { label: "Produkt", value: "Kafejeto.pl" },
              { label: "Branża", value: "E-commerce · Coffee" },
              { label: "Użytkownicy", value: "Miłośnicy kawy specialty" },
              { label: "Zakres", value: "Sklep internetowy" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <Tag>{item.label}</Tag>
                <p className="font-semibold text-slate-900 mt-1">{item.value}</p>
              </div>
            ))}
          </div>

          <img src="/kafejeto/okladka.jpg" alt="Kafejeto — okładka" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SCREENS ── */}
        <div className="py-14">
          <Tag color="#8EBD3F">01 — Screens</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Kluczowe ekrany</h2>

          <div className="flex flex-col gap-6">
            <img src="/kafejeto/page1.jpg" alt="Page 1" className="w-full rounded-xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page2.jpg" alt="Page 2" className="w-full rounded-xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page3.jpg" alt="Page 3" className="w-full rounded-xl border border-slate-200 object-cover" />
            <img src="/kafejeto/page4.jpg" alt="Page 4" className="w-full rounded-xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── MOBILE ── */}
        <div className="py-14">
          <Tag color="#8EBD3F">02 — Mobile</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Wersja mobilna</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img src="/kafejeto/mobile1.jpg" alt="Mobile 1" className="w-full rounded-xl border border-slate-200 object-cover" />
            <img src="/kafejeto/mobile2.jpg" alt="Mobile 2" className="w-full rounded-xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── OVERVIEW ── */}
        <div className="py-14">
          <Tag color="#8EBD3F">03 — Overview</Tag>
          <h2 className="text-2xl font-bold text-[#0F172A] mt-4 mb-12">Całość w jednym widoku</h2>

          <img src="/kafejeto/overview.jpg" alt="Overview" className="w-full rounded-xl border border-slate-200 object-cover" />
        </div>

        <NextProject currentHref="/ui/kafejeto" />
        <ContactCTA />

      </div>
    </div>
  )
}
