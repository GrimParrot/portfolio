import { useNavigate } from "react-router-dom"
import { projects } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"

interface NextProjectProps {
  currentHref: string
  dark?: boolean
}

const copy = {
  pl: { label: "Następny projekt", cta: "Zobacz projekt →" },
  en: { label: "Next project", cta: "View project →" },
}

export function NextProject({ currentHref, dark = true }: NextProjectProps) {
  const navigate = useNavigate()
  const { lang } = useLang()
  const t = copy[lang]
  const currentIndex = projects.findIndex((p) => p.href === currentHref)
  const next = projects[(currentIndex + 1) % projects.length]

  const goToNext = () => { if (next.href) navigate(next.href) }
  const desc = lang === "en" ? next.description_en : next.description

  return (
    <div className={`mt-8 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10 ${dark ? "bg-[#0F172A]" : "border border-slate-200"}`}>
      <div className="flex-1 min-w-0">
        <span className={`text-[13px] font-medium tracking-widest uppercase ${dark ? "text-white/40" : "text-slate-400"}`}>{t.label}</span>
        <h3
          onClick={goToNext}
          className={`text-xl md:text-3xl font-black mt-3 mb-4 leading-snug cursor-pointer transition-colors ${dark ? "text-white hover:text-white/70" : "text-[#0F172A] hover:text-slate-600"}`}
        >
          {next.title}
        </h3>

        {/* Image — mobile only, between title and description */}
        <div
          onClick={goToNext}
          className="md:hidden w-full rounded-xl overflow-hidden border border-white/10 cursor-pointer group/img mb-6" style={{ height: 200 }}
        >
          {next.image ? (
            <img src={next.image} alt={next.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${next.color} transition-transform duration-500 group-hover/img:scale-105`} />
          )}
        </div>

        {desc && (
          <p className={`leading-relaxed mb-8 ${dark ? "text-white/50" : "text-slate-500"}`}>{desc}</p>
        )}
        {next.href ? (
          <button
            onClick={goToNext}
            className={`w-full md:w-auto font-semibold px-6 py-3 rounded-xl transition-colors ${dark ? "bg-white text-[#0F172A] hover:bg-slate-100" : "bg-[#0F172A] text-white hover:bg-[#1E293B]"}`}
          >
            {t.cta}
          </button>
        ) : (
          <button disabled className={`font-semibold px-6 py-3 rounded-xl opacity-40 cursor-not-allowed ${dark ? "bg-white text-[#0F172A]" : "bg-[#0F172A] text-white"}`}>
            {t.cta}
          </button>
        )}
      </div>

      {/* Image — desktop only */}
      <div
        onClick={goToNext}
        className="hidden md:block md:w-[45%] rounded-xl overflow-hidden border border-white/10 cursor-pointer group/img" style={{ height: 240 }}
      >
        {next.image ? (
          <img src={next.image} alt={next.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${next.color} transition-transform duration-500 group-hover/img:scale-105`} />
        )}
      </div>
    </div>
  )
}
