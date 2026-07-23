import { ArrowDown, ChevronDown } from "lucide-react"
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
    <section className="relative overflow-hidden min-h-screen flex items-center bg-[#0B1220]">
      <style>{`
        @keyframes hero-flicker {
          0%, 92%, 100% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
          93% { opacity: 0.4; text-shadow: none; }
          94% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
          95% { opacity: 0.2; text-shadow: none; }
          96%, 99% { opacity: 1; text-shadow: 0 0 24px rgba(10,186,83,0.35); }
        }
        .hero-flicker {
          animation: hero-flicker 8s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-flicker {
            animation: none;
            text-shadow: 0 0 24px rgba(10,186,83,0.35);
          }
        }
      `}</style>
      <FlowBackground />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 text-center pointer-events-none">
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
          <Button asChild size="lg" className="pointer-events-auto bg-white text-[#0F172A] hover:bg-slate-200">
            <a href={lang === "pl" ? "/cv-pl.pdf" : "/cv-en.pdf"} target="_blank" rel="noreferrer">
              {t.cvBtn} <ArrowDown className="w-4 h-4 animate-bounce" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="pointer-events-auto border-white/40 bg-transparent text-white hover:bg-white/10 [&_svg]:size-5">
            <a href="https://linkedin.com/in/esuprun" target="_blank" rel="noreferrer">
              LinkedIn <ArrowDown className="w-5 h-5 animate-bounce" />
            </a>
          </Button>
        </div>
      </div>

      <ChevronDown className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-6 h-6 text-white/50 animate-bounce" />
    </section>
  )
}
