import { ArrowDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Magnetic } from "@/components/Magnetic"
import { useLang } from "@/i18n/LanguageContext"
import { smoothScrollTo } from "@/lib/lenis"
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
    <section className="relative overflow-hidden min-h-screen flex items-center bg-primary-900">
      <FlowBackground />

      <div className="relative z-10 w-full max-w-container mx-auto px-m text-left pointer-events-none">
        <p className="font-body text-caption md:text-body text-white/70 font-medium mb-m">{t.name}</p>

        <h1 className="font-heading text-h1 text-white mb-xl">
          {t.headingLine1}
          <br />
          {t.headingLine2}
        </h1>

        <div className="flex flex-wrap justify-start gap-xs mb-xl">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-s py-xs font-body text-caption font-medium bg-white/10 text-white hover:bg-white/15">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex flex-wrap justify-start gap-s">
          <Magnetic strength={0.3} className="pointer-events-auto inline-block">
            <Button
              size="lg"
              className="bg-white text-primary-900 hover:bg-primary-50"
              onClick={() => smoothScrollTo("#projects")}
            >
              {t.workBtn} <ArrowDown className="w-s h-s animate-bounce" />
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
