import { Lightbulb } from "lucide-react"
import { Footer } from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import { ProjectNav } from "@/components/ProjectNav"
import { NextProject } from "@/components/NextProject"
import { Contact } from "@/components/sections/Contact"
import { useLang } from "@/i18n/LanguageContext"
import { copy } from "@/copy/banneroza.copy"

const PRIMARY = "#DD8100"

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


  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <Navbar />

      <div className="max-w-[1100px] mx-auto px-6 pt-24 pb-16 md:pb-32">

        {/* ── HERO ── */}
        <div className="py-8 md:py-16">
          <ProjectNav currentHref="/case-study/banneroza" />

          <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mt-4 mb-4 tracking-tight" style={{ lineHeight: 1.4 }}>
            {t.h1}
          </h1>
          <span className="inline-block mb-10 text-sm font-semibold px-3 py-1.5 rounded-full bg-[#0ABA53] text-white">Case Study</span>

          <p className="text-slate-500 leading-relaxed mb-6">{t.body}</p>
          <div className="flex gap-3 items-start rounded-lg px-6 py-5 mb-10" style={{ background: "#FFF3E0" }}>
            <span className="font-medium flex-shrink-0 mt-0.5" style={{ color: PRIMARY }}>↗</span>
            <p style={{ color: "#6b3a00" }}>
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

          <img src="/banneroza/cover2.jpg" alt="Banneroza — cover" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROBLEM ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s01.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s01.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-6">{t.s01.p1}</p>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s01.p2}</p>
          <img src="/banneroza/1.jpg" alt="Problem — banners in cities" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── SOLUTION ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s02.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s02.h2}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p1}</p>
              <p className="text-slate-500 leading-relaxed mb-6">{t.s02.p2}</p>
              <p className="text-slate-500 leading-relaxed">{t.s02.p3}</p>
            </div>
            <img src="/banneroza/3.jpg" alt="Szyldowe Rewolucje — solution" className="w-full rounded-2xl border border-slate-200 object-cover" />
          </div>
        </div>

        <Divider />

        {/* ── DISCOVERY ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s03.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s03.h2}</h2>

          <p className="text-slate-500 leading-relaxed mb-6">{t.s03.p1}</p>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s03.p2}</p>

          <div className="rounded-xl px-6 py-5 mb-12" style={{ background: "#FFF3E0" }}>
            <p className="text-[13px] font-medium tracking-widest uppercase mb-4" style={{ color: PRIMARY }}>{t.s03.questionsLabel}</p>
            <ul className="flex flex-col gap-2">
              {t.s03.questions.map((q) => (
                <li key={q} className="flex gap-3 text-[15px]" style={{ color: "#6b3a00" }}>
                  <span style={{ color: PRIMARY }} className="flex-shrink-0 font-bold">→</span>
                  {q}
                </li>
              ))}
            </ul>
          </div>

          <img src="/banneroza/4.jpg" alt="Research — quantitative data" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.insightsH3}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {t.s03.insights.map((item) => (
              <div key={item.title} className="border border-slate-200 rounded-xl p-6">
                <Lightbulb style={{ width: 24, height: 24, color: PRIMARY }} className="mb-3" />
                <p className="font-semibold text-slate-900 mb-2">{item.title}</p>
                <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s03.personaH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s03.personaDesc}</p>
          <img src="/banneroza/5.jpg" alt="Persona" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── PROCES ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s04.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-8">{t.s04.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s04.p}</p>
          <img src="/banneroza/6.jpg" alt="Information architecture" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── DESIGN ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s05.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-12">{t.s05.h2}</h2>

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.lofiH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s05.lofiP}</p>
          <img src="/banneroza/7.jpg" alt="Low fidelity wireframes" className="w-full rounded-2xl border border-slate-200 object-cover mb-12" />

          <h3 className="text-lg font-bold text-[#0F172A] mb-4">{t.s05.hifiH3}</h3>
          <p className="text-slate-500 leading-relaxed mb-8">{t.s05.hifiP}</p>
          <img src="/banneroza/8.jpg" alt="High fidelity mockup" className="w-full rounded-2xl border border-slate-200 object-cover" />
        </div>

        <Divider />

        {/* ── WNIOSKI ── */}
        <div className="py-14">
          <Tag color={PRIMARY}>{t.s06.tag}</Tag>
          <h2 className="text-3xl font-bold text-[#0F172A] mt-4 mb-4">{t.s06.h2}</h2>
          <p className="text-slate-500 leading-relaxed mb-12">{t.s06.intro}</p>

          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 mb-12">
            {t.s06.items.map((item, i) => (
              <div key={i} className="flex gap-5 px-7 py-6">
                <span className="font-semibold text-slate-400 flex-shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-slate-500 leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NextProject currentHref="/case-study/banneroza" />

      </div>
      <Contact />
      <Footer />
    </div>
  )
}
