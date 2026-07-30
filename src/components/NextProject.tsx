import { useNavigate } from "react-router-dom"
import { projects, tagStyles } from "@/data/projects"
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
  const title = lang === "pl" && next.title_pl ? next.title_pl : next.title

  return (
    <div className={`mt-l rounded-2xl p-l flex flex-col md:flex-row items-center gap-xl ${dark ? "bg-primary-900" : "border border-primary-100"}`}>
      <div className="flex-1 min-w-0">
        <span className={`font-body text-overline uppercase ${dark ? "text-white/40" : "text-primary-500"}`}>{t.label}</span>
        <div className="mt-s">
          <span className={`inline-block font-body text-caption font-semibold px-s py-xs rounded-xl ${dark && next.tag === "UI" ? "bg-white text-primary-900" : tagStyles[next.tag]}`}>{next.tag}</span>
        </div>
        <h3
          onClick={goToNext}
          className={`font-heading text-h3 mt-s mb-s leading-snug cursor-pointer transition-colors ${dark ? "text-white hover:text-white/70" : "text-primary-900 hover:text-primary-700"}`}
        >
          {title}
        </h3>

        {/* Image — mobile only, between title and description */}
        <div
          onClick={goToNext}
          className="md:hidden w-full rounded-xl overflow-hidden border border-white/10 cursor-pointer group/img mb-m" style={{ height: 200 }}
        >
          {next.image ? (
            <img src={next.image} alt={next.title} className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105" />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${next.color} transition-transform duration-500 group-hover/img:scale-105`} />
          )}
        </div>

        {desc && (
          <p className={`font-body text-body leading-relaxed mb-l ${dark ? "text-white/50" : "text-primary-700"}`}>{desc}</p>
        )}
        {next.href ? (
          <button
            onClick={goToNext}
            className={`w-full md:w-auto font-semibold px-m py-s rounded-xl transition-colors ${dark ? "bg-white text-primary-900 hover:bg-primary-50" : "bg-primary-900 text-white hover:bg-primary-700"}`}
          >
            {t.cta}
          </button>
        ) : (
          <button disabled className={`font-semibold px-m py-s rounded-xl opacity-40 cursor-not-allowed ${dark ? "bg-white text-primary-900" : "bg-primary-900 text-white"}`}>
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
