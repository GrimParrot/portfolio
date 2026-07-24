import { ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLang } from "@/i18n/LanguageContext"
import { FlowBackground } from "./hero-v2/FlowBackground"

const tags = ["B2B", "B2C", "SaaS", "8+ years exp", "AI-powered"]

const copy = {
  pl: {
    name: "Edyta Suprun",
    headingLine1: "Product",
    headingLine2: "Designer",
    workBtn: "Zobacz moje projekty",
  },
  en: {
    name: "Edyta Suprun",
    headingLine1: "Product",
    headingLine2: "Designer",
    workBtn: "See my work",
  },
}

export function HeroV2() {
  const { lang } = useLang()
  const t = copy[lang]

  return (
    <section id="hero-dark" className="relative overflow-hidden min-h-screen flex items-center bg-[#0B1220]">
      <FlowBackground />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-left pointer-events-none">
        <p className="text-white/70 text-base md:text-lg font-medium mb-5">{t.name}</p>

        <h1 className="text-9xl md:text-[13rem] font-black text-white leading-[0.9] mb-12">
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h1>

        <div className="flex flex-wrap justify-start gap-2 mb-10">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm font-medium bg-white/10 text-white hover:bg-white/15">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap justify-start gap-3">
          <Button
            size="lg"
            className="pointer-events-auto bg-white text-[#0F172A] hover:bg-slate-200"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          >
            {t.workBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
          </Button>
        </div>
      </div>
    </section>
  )
}
