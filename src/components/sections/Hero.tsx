import { Badge } from "@/components/ui/badge"
import { ArrowDown } from "lucide-react"
import { useLang } from "@/i18n/LanguageContext"

const tags = ["Lead product designer", "B2B", "B2C", "SaaS", "8+ years exp", "AI-augmented"]

const copy = {
  pl: {
    h1line1: "Znajduję złoty środek",
    h1between: "między",
    h1users: "Użytkownikami",
    h1and: "a",
    h1business: "Biznesem",
    intro: <>Cześć, jestem <strong className="text-slate-700">Edyta</strong>👋— projektuję cyfrowe produkty B2B end to end. Pomagam zespołom zdecydować, co budować — i czego nie budować.</>,
  },
  en: {
    h1line1: "Finding the sweet spot",
    h1between: "between",
    h1users: "Users",
    h1and: "and",
    h1business: "Business",
    intro: <>Hi, I'm <strong className="text-slate-700">Edyta</strong>👋— I design digital B2B products end to end. I help teams decide what to build — and what not to build.</>,
  },
}

export function Hero() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-12 bg-gradient-to-b from-violet-50/60 to-white">
      <h1 className="text-5xl md:text-7xl font-light tracking-tight text-[#0F172A] mb-8" style={{ lineHeight: 1.35 }}>
        {t.h1line1}<br />
        {t.h1between}{" "}
        <span className="font-black">{t.h1users}</span><br />
        {t.h1and}{" "}
        <span className="font-black">{t.h1business}</span>
      </h1>

      <p className="text-lg md:text-xl text-slate-500 max-w-2xl mb-10 leading-relaxed">
        {t.intro}
      </p>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
            {tag}
          </Badge>
        ))}
      </div>

      <button
        onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "center" })}
        className="mt-8 text-slate-400 hover:text-violet-500 transition-colors animate-bounce cursor-pointer"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  )
}
