import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang } from "@/i18n/LanguageContext"

const tags = ["Lead product designer", "B2B", "B2C", "SaaS", "8+ years exp", "Discovery & Delivery", "AI-powered"]

const copy = {
  pl: {
    heading: <>Cześć, jestem <strong>Edyta</strong><span className="animate-wave">👋</span></>,
    tagline: "projektuję cyfrowe produkty B2B end to end. Pomagam zespołom zdecydować, co budować — i czego nie budować",
    cvBtn: "Zobacz CV",
  },
  en: {
    heading: <>Hi, I'm <strong>Edyta</strong><span className="animate-wave">👋</span></>,
    tagline: "I design digital B2B products end to end. I help teams decide what to build — and what not to build",
    cvBtn: "View CV",
  },
}

export function Hero() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-[1200px] mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-[#0F172A] leading-tight mb-12">
          {t.heading}
        </h1>

        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium">
              {tag}
            </Badge>
          ))}
        </div>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          {t.tagline}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="bg-[#0F172A] hover:bg-[#1E293B]">
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">
              {t.cvBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight className="w-4 h-4 animate-nudge-ur" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}