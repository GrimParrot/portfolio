import { ArrowRight } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { projects, tagStyles } from "@/data/projects"
import { useLang } from "@/i18n/LanguageContext"

interface NextProjectProps {
  currentHref: string
  dark?: boolean
}

const copy = {
  pl: { label: "Następny projekt", cta: "Zobacz projekt" },
  en: { label: "Next project", cta: "View project" },
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
    <div className={`mt-8 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-10 ${dark ? "bg-pf-900" : "border border-pf-line"}`}>
      <div className="flex-1 min-w-0">
        <span className={`text-[13px] font-medium tracking-widest uppercase ${dark ? "text-white/40" : "text-pf-500"}`}>{t.label}</span>
        <div className="mt-3">
          <span className={`inline-block text-sm font-semibold px-3 py-1.5 rounded-xl ${dark && next.tag === "UI" ? "bg-white text-pf-ink" : tagStyles[next.tag]}`}>{next.tag}</span>
        </div>
        {/* A real link, not an onClick heading: it reaches the keyboard, and
            middle-click / open-in-new-tab work. The two images below keep
            their onClick as a mouse convenience — making them focusable too
            would add tab stops to a destination the title and the button
            already cover. */}
        <h3 className="text-xl md:text-3xl font-black mt-3 mb-4 leading-snug">
          {next.href ? (
            <Link
              to={next.href}
              className={`rounded-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${dark ? "text-white hover:text-white/70" : "text-pf-ink hover:text-pf-700"}`}
            >
              {title}
            </Link>
          ) : (
            <span className={dark ? "text-white" : "text-pf-ink"}>{title}</span>
          )}
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
          <p className={`leading-relaxed mb-8 ${dark ? "text-white/50" : "text-pf-subtle"}`}>{desc}</p>
        )}
        <Button
          size="lg"
          variant={dark ? "inverse" : "primary"}
          className="w-full md:w-auto"
          onClick={goToNext}
          disabled={!next.href}
        >
          {t.cta} <ArrowRight className="w-4 h-4 animate-bounce-right" />
        </Button>
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
