import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang } from "@/i18n/LanguageContext"
import { FlowBackground } from "./hero-v2/FlowBackground"

const tags = ["Lead product designer", "B2B", "B2C", "SaaS", "8+ years exp", "Discovery & Delivery", "AI-powered"]

const copy = {
  pl: {
    headingPre: "Projektuj z ",
    headingFlicker: "wyobraźnią",
    tagline: "projektuję cyfrowe produkty B2B end to end. Pomagam zespołom zdecydować, co budować — i czego nie budować",
    cvBtn: "Zobacz CV",
  },
  en: {
    headingPre: "Design with ",
    headingFlicker: "imagination",
    tagline: "I design digital B2B products end to end. I help teams decide what to build — and what not to build",
    cvBtn: "View CV",
  },
}

export function HeroV2() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="relative overflow-hidden pt-28 pb-16 bg-[#0B1220]">
      <FlowBackground />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-12">
          {t.headingPre}
          <span className="hero-flicker">{t.headingFlicker}</span>
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-white/10 text-white hover:bg-white/15">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-lg text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed">
          {t.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-white text-[#0F172A] hover:bg-slate-200">
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">
              {t.cvBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10">
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight className="w-4 h-4 animate-nudge-ur" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
